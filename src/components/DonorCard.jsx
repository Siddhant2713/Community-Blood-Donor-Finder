import PropTypes from 'prop-types'

export default function DonorCard({ donor, requestedDonors, setRequestedDonors }) {
    const isRequested = !!requestedDonors[donor.id]

    // Phone: first segment only, strip non-numeric except + - ( ) .
    const phoneShort = donor.phone
        ? donor.phone.split(' ')[0]
        : ''

    return (
        <div className="donor-card">

            {/* ── Top: Name + Blood Badge ─────────────────── */}
            <div className="card-top">
                <div>
                    <div className="donor-name">{donor.name}</div>
                    <div className="donor-city">{donor.city}</div>
                </div>
                <span className="blood-badge">{donor.bloodGroup}</span>
            </div>

            {/* ── Meta: Status dot + phone ────────────────── */}
            <div className="card-meta">
                <span
                    className={`status-dot ${donor.available ? 'available' : 'unavailable'}`}
                />
                <span className="status-text">
                    {donor.available ? 'Available' : 'Unavailable'}
                </span>
                {phoneShort && (
                    <>
                        <span className="meta-sep">·</span>
                        <span className="phone-text">{phoneShort}</span>
                    </>
                )}
            </div>

            {/* ── Action Button — three separate renders ───── */}
            {!donor.available ? (
                <button className="card-btn card-btn-unavailable" disabled>
                    Not available
                </button>
            ) : isRequested ? (
                <button className="card-btn card-btn-sent" disabled>
                    Request sent
                </button>
            ) : (
                <button
                    className="card-btn card-btn-request"
                    onClick={() =>
                        setRequestedDonors(prev => ({ ...prev, [donor.id]: true }))
                    }
                >
                    Request donor
                </button>
            )}

        </div>
    )
}

DonorCard.propTypes = {
    donor: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        bloodGroup: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        phone: PropTypes.string,
        available: PropTypes.bool.isRequired,
    }).isRequired,
    requestedDonors: PropTypes.object.isRequired,
    setRequestedDonors: PropTypes.func.isRequired,
}
