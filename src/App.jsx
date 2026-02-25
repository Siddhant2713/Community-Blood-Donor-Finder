import { useState, useEffect } from 'react'
import Header from './components/Header'
import Spinner from './components/Spinner'
import Filters from './components/Filters'
import DonorList from './components/DonorList'

// Hardcoded array of possible blood groups for our mock data
const bloodGroups = ["A+", "B+", "O+", "O−", "AB+", "A−"]

/**
 * transformUsers - Utility function to shape raw API data into our required Donor format.
 * Since the JSONPlaceholder API doesn't provide blood groups or availability,
 * we dynamically generate (mock) these fields using Math.random().
 * 
 * @param {Array} users - Raw user data array from the API
 * @returns {Array} - Transformed array containing mapped 'donor' objects
 */
function transformUsers(users) {
  return users.map(user => ({
    id: user.id,
    name: user.name,
    city: user.address.city,
    bloodGroup: bloodGroups[Math.floor(Math.random() * bloodGroups.length)], // Assign random blood group
    available: Math.random() > 0.5 // Random 50/50 chance of being true (available) or false
  }))
}

function App() {
  // --- Core Data States ---
  const [donors, setDonors] = useState([]) // Stores the master list of all fetched donors
  const [loading, setLoading] = useState(true) // Tracks if the initial API fetch is still resolving

  // --- Filter & Interaction States ---
  // These states are passed DOWN via props to the `<Filters />` component and are used to build `filteredDonors`
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("All")
  const [searchCity, setSearchCity] = useState("")
  const [sortAvailableFirst, setSortAvailableFirst] = useState(false)

  // Object holding ID pairs simulating database writes e.g. { "2": true, "5": true }
  const [requestedDonors, setRequestedDonors] = useState({})

  /**
   * Initial Data Fetch (Runs EXACTLY once on mount due to the empty [] dependency array)
   */
  useEffect(() => {
    setLoading(true)

    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => {
        // Data comes back as standard Users. We format them into Donors.
        const transformedData = transformUsers(data)
        setDonors(transformedData) // Save master list to state
        setLoading(false) // Data is ready, remove loading screen
      })
      .catch(error => {
        console.error("Error fetching donors:", error)
        setLoading(false) // Even on error, we must stop loading to prevent infinite spinners
      })
  }, [])

  /**
   * --- Derived Data Computation ---
   * We do NOT store filtered results in a separate `useState`. 
   * Instead, we natively chain `.filter()` and `.sort()` on the master `donors` array 
   * exactly right before rendering. This keeps our code highly synchronized and bug-free.
   */
  const filteredDonors = donors
    .filter(donor => {
      // 1. Blood Group Filter
      if (selectedBloodGroup === "All") return true; // If "All", don't filter anything out here
      return donor.bloodGroup === selectedBloodGroup; // Only keep donors strictly mapping to selected dropdown bounds
    })
    .filter(donor =>
      // 2. City String Search Filter (Case Insensitive)
      donor.city.toLowerCase().includes(searchCity.toLowerCase())
    )
    .sort((a, b) => {
      // 3. Sorting logic
      if (!sortAvailableFirst) return 0; // If toggle is false, keep original API order
      // If true: Sort by boolean.
      // Math: (true = 1, false = 0). b(1) - a(0) = 1 (b goes first). 
      // This reliably bubbles "Available" donors to the top of the array!
      return b.available - a.available;
    })

  // We natively derive the length of ONLY the correctly filtered, currently available donors.
  const availableCount = filteredDonors.filter(d => d.available).length;

  return (
    <div className="app-container">
      {/* Stateless display component for the App Title */}
      <Header />

      <main className="main-content">
        {/* Pass ONLY the states needed to control the inputs downwards into Filters.jsx */}
        <Filters
          selectedBloodGroup={selectedBloodGroup}
          setSelectedBloodGroup={setSelectedBloodGroup}
          searchCity={searchCity}
          setSearchCity={setSearchCity}
          sortAvailableFirst={sortAvailableFirst}
          setSortAvailableFirst={setSortAvailableFirst}
        />

        {/* Ensure Loading is finished before rendering Meta counts to prevent visual popping */}
        {!loading && (
          <div className="meta-info">
            <p className="available-count">Available Donors: {availableCount}</p>
          </div>
        )}

        {/* Render Priority: 
            1. Display Spinner if API is still fetching.
            2. If done fetching, cascade the derived `filteredDonors` payload downwards to let DonorList handle the looping. */}
        {loading ? (
          <Spinner />
        ) : (
          <DonorList
            filteredDonors={filteredDonors} // Sends ONLY the strictly queried slice of our master logic
            requestedDonors={requestedDonors} // Sends tracked Interaction states DOWN
            setRequestedDonors={setRequestedDonors} // Sends target interaction setters DOWN
          />
        )}
      </main>
    </div>
  )
}

export default App
