import PropTypes from 'prop-types';
import DonorCard from './DonorCard';

/**
 * DonorList Component
 * 
 * @param {Array} filteredDonors - The active subset of donors to display
 * @param {Object} requestedDonors - The dictionary tracking which donors have been requested
 * @param {Function} setRequestedDonors - Setter function to update request states
 */
export default function DonorList({ filteredDonors, requestedDonors, setRequestedDonors }) {
    // Escaping rendering if no queries match the filter arrays. 
    // This allows `App.jsx` to natively display Empty States without breaking React.
    if (filteredDonors.length === 0) {
        return (
            <div className="empty-state">
                <p>No donors found.</p>
            </div>
        );
    }

    return (
        <div className="donor-grid">
            {/* Map over our data payload and return a generic UI Component for EVERY match securely */}
            {filteredDonors.map(donor => (
                <DonorCard
                    key={donor.id} // Essential for React DOM tracking
                    donor={donor} // Send the literal User data mapped out
                    requestedDonors={requestedDonors} // Send global tracking history 
                    setRequestedDonors={setRequestedDonors} // Send UI trigger callback hook 
                />
            ))}
        </div>
    );
}

DonorList.propTypes = {
    filteredDonors: PropTypes.array.isRequired,
    requestedDonors: PropTypes.object.isRequired,
    setRequestedDonors: PropTypes.func.isRequired
};
