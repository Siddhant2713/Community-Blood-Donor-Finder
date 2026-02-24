import PropTypes from 'prop-types';

export default function DonorCard({ donor, requestedDonors, setRequestedDonors }) {
    const isRequested = requestedDonors[donor.id];

    return (
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
                disabled={!donor.available || isRequested}
                onClick={() =>
                    setRequestedDonors(prev => ({
                        ...prev,
                        [donor.id]: true
                    }))
                }
            >
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
