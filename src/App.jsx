import { useState, useEffect } from 'react'
import Filters from './components/Filters'
import DonorList from './components/DonorList'

const bloodGroups = ["A+", "B+", "O+", "O−", "AB+", "A−"]

function transformUsers(users) {
  return users.map(user => ({
    id: user.id,
    name: user.name,
    city: user.address.city,
    phone: user.phone,                    // ← ADD THIS — used in card meta strip
    bloodGroup: bloodGroups[Math.floor(Math.random() * bloodGroups.length)],
    available: Math.random() > 0.5
  }))
}

function App() {
  const [donors, setDonors] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("All")
  const [searchCity, setSearchCity] = useState("")
  const [sortAvailableFirst, setSortAvailableFirst] = useState(false)
  const [requestedDonors, setRequestedDonors] = useState({})

  // ── Theme ─────────────────────────────────────────────────
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const apply = (dark) => {
      setIsDark(dark)
      document.documentElement.classList.toggle('dark', dark)
    }
    apply(mq.matches)
    mq.addEventListener('change', e => apply(e.matches))
    return () => mq.removeEventListener('change', e => apply(e.matches))
  }, [])

  const toggleTheme = () => {
    const next = !isDark
    setIsDark(next)
    document.documentElement.classList.toggle('dark', next)
  }

  // ── Data Fetch ────────────────────────────────────────────
  useEffect(() => {
    setLoading(true)
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => {
        setDonors(transformUsers(data))
        setLoading(false)
      })
      .catch(err => {
        console.error("Error fetching donors:", err)
        setLoading(false)
      })
  }, [])

  // ── Derived Filtered List ─────────────────────────────────
  const filteredDonors = donors
    .filter(donor => {
      if (selectedBloodGroup === "All") return true
      return donor.bloodGroup === selectedBloodGroup
    })
    .filter(donor =>
      donor.city.toLowerCase().includes(searchCity.toLowerCase())
    )
    .filter(donor => {
      if (!sortAvailableFirst) return true
      return donor.available
    })
    .sort((a, b) => {
      if (!sortAvailableFirst) return 0
      return b.available - a.available
    })

  // ── Helpers ───────────────────────────────────────────────
  const clearFilters = () => {
    setSelectedBloodGroup("All")
    setSearchCity("")
    setSortAvailableFirst(false)
  }

  const hasActiveFilters =
    selectedBloodGroup !== "All" || searchCity !== "" || sortAvailableFirst

  return (
    <div className="page">

      {/* ── Nav ─────────────────────────────────────────── */}
      <nav className="nav">
        <div className="nav-title">
          <span>Blood</span>Finder
        </div>
        <button className="theme-btn" onClick={toggleTheme}>
          {isDark ? 'Light' : 'Dark'}
        </button>
      </nav>

      {/* ── Filter Bar + Meta Row ────────────────────────── */}
      <Filters
        selectedBloodGroup={selectedBloodGroup}
        setSelectedBloodGroup={setSelectedBloodGroup}
        searchCity={searchCity}
        setSearchCity={setSearchCity}
        sortAvailableFirst={sortAvailableFirst}
        setSortAvailableFirst={setSortAvailableFirst}
        filteredCount={filteredDonors.length}
        totalCount={donors.length}
        hasActiveFilters={hasActiveFilters}
        clearFilters={clearFilters}
      />

      {/* ── Donor Grid ───────────────────────────────────── */}
      <div className="grid-area">
        <DonorList
          filteredDonors={filteredDonors}
          requestedDonors={requestedDonors}
          setRequestedDonors={setRequestedDonors}
          loading={loading}
          clearFilters={clearFilters}
        />
      </div>

    </div>
  )
}

export default App
