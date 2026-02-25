import PropTypes from 'prop-types';

/**
 * DonorCard Component
 * Renders an isolated React tile mapped to a single JSONPlaceholder mock user. 
 * 
 * @param {Object} donor - The raw object representing the Donor's specific data points.
 * @param {Object} requestedDonors - Dict checking `[donor.id]: true` preventing multiple requests.
 * @param {Function} setRequestedDonors - Hook writing true interaction values back up to App.jsx.
 */
export default function DonorCard({ donor, requestedDonors, setRequestedDonors }) {
    // Determine boolean state upfront to apply CSS cleanly.
    const isRequested = requestedDonors[donor.id];

    return (
        // Dynamically applies `.unavailable` CSS class (greying out the border) if boolean drops to false natively.
        <div className={`donor-card ${!donor.available ? 'unavailable' : ''}`}>
            <div className="donor-info">
                <h3>{donor.name}</h3>
                <p className="blood-group">
                    <strong>Blood Group:</strong> <span>{donor.bloodGroup}</span>
                </p>
                <p className="city">
                    <strong>City:</strong> <span>{donor.city}</span>
                </p>
                <p className={`status ${donor.available ? 'status-available' : 'status-unavailable'}`}>
                    {donor.available ? "Available" : "Not Available"}
                </p>
            </div>

            <button
                className={`request-btn ${isRequested ? 'requested' : ''}`}
                // Secures UI from impossible states: Button disables if Donor is explicitly false, OR if the User has already confirmed a request mapped inside `requestedDonors[donor.id]`.
                disabled={!donor.available || isRequested}
                onClick={() =>
                    // Object Spreading -> `{...prev}` preserves all OTHER requested donors gracefully while injecting exact Target User modifications on-click. 
                    setRequestedDonors(prev => ({
                        ...prev,
                        [donor.id]: true
                    }))
                }
            >
                {/* Dynamically toggles text layout depending strictly upon mapped App.jsx derived global variables. */}
                {isRequested ? "Request Sent ✅" : "Request Help"}
            </button>
        </div>
    );
}

DonorCard.propTypes = {
    donor: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        bloodGroup: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        available: PropTypes.bool.isRequired,
    }).isRequired,
    requestedDonors: PropTypes.object.isRequired,
    setRequestedDonors: PropTypes.func.isRequired
};
