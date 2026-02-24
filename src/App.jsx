import { useState, useEffect } from 'react'

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

  if (loading) {
    return <p>Loading donors...</p>
  }

  if (!loading && donors.length === 0) {
    return <p>No donors found.</p>
  }

  const availableCount = donors.filter(d => d.available).length;

  return (
    <div>
      <header>
        <h1>Community Blood Donor Finder</h1>
      </header>

      <div className="info-section">
        <p>Available Donors: {availableCount}</p>
      </div>

      <div className="list-section">
        {donors.map(donor => (
          <div key={donor.id} className="donor-card">
            <h3>{donor.name}</h3>
            <p>Blood Group: {donor.bloodGroup}</p>
            <p>City: {donor.city}</p>
            <p>{donor.available ? "Available" : "Not Available"}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
