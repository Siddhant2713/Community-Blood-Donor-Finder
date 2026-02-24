import { useState, useEffect } from 'react'
import Header from './components/Header'
import Spinner from './components/Spinner'
import Filters from './components/Filters'
import DonorList from './components/DonorList'

const bloodGroups = ["A+", "B+", "O+", "O−", "AB+", "A−"]

function transformUsers(users) {
  return users.map(user => ({
    id: user.id,
    name: user.name,
    city: user.address.city,
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

  useEffect(() => {
    setLoading(true)

    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => {
        const transformedData = transformUsers(data)
        setDonors(transformedData)
        setLoading(false)
      })
      .catch(error => {
        console.error("Error fetching donors:", error)
        setLoading(false)
      })
  }, [])

  const filteredDonors = donors
    .filter(donor => {
      if (selectedBloodGroup === "All") return true;
      return donor.bloodGroup === selectedBloodGroup;
    })
    .filter(donor =>
      donor.city.toLowerCase().includes(searchCity.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortAvailableFirst) return 0;
      return b.available - a.available;
    })

  const availableCount = filteredDonors.filter(d => d.available).length;

  return (
    <div className="app-container">
      <Header />

      <main className="main-content">
        <Filters
          selectedBloodGroup={selectedBloodGroup}
          setSelectedBloodGroup={setSelectedBloodGroup}
          searchCity={searchCity}
          setSearchCity={setSearchCity}
          sortAvailableFirst={sortAvailableFirst}
          setSortAvailableFirst={setSortAvailableFirst}
        />

        {!loading && (
          <div className="meta-info">
            <p className="available-count">Available Donors: {availableCount}</p>
          </div>
        )}

        {loading ? (
          <Spinner />
        ) : (
          <DonorList
            filteredDonors={filteredDonors}
            requestedDonors={requestedDonors}
            setRequestedDonors={setRequestedDonors}
          />
        )}
      </main>
    </div>
  )
}

export default App
