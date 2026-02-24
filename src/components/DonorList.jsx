import PropTypes from 'prop-types';
import DonorCard from './DonorCard';

export default function DonorList({ filteredDonors, requestedDonors, setRequestedDonors }) {
    if (filteredDonors.length === 0) {
        return (
            <div className="empty-state">
                <p>No donors found.</p>
            </div>
        );
    }

    return (
        <div className="donor-grid">
            {filteredDonors.map(donor => (
                <DonorCard
                    key={donor.id}
                    donor={donor}
                    requestedDonors={requestedDonors}
                    setRequestedDonors={setRequestedDonors}
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
