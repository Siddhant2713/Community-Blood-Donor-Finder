import PropTypes from 'prop-types'
import { motion, AnimatePresence } from 'framer-motion'
import DonorCard from './DonorCard'

// ── Skeleton Card ─────────────────────────────────────────
function SkeletonCard() {
    return (
        <div className="skeleton-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div className="skel" style={{ height: '14px', width: '130px' }} />
                    <div className="skel" style={{ height: '11px', width: '80px' }} />
                </div>
                <div className="skel" style={{ height: '22px', width: '32px' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div className="skel" style={{ height: '8px', width: '8px', borderRadius: '50%' }} />
                <div className="skel" style={{ height: '11px', width: '160px' }} />
            </div>
            <div className="skel" style={{ height: '36px', width: '100%' }} />
        </div>
    )
}

// ── DonorList ─────────────────────────────────────────────
export default function DonorList({
    filteredDonors,
    requestedDonors,
    setRequestedDonors,
    loading,
    clearFilters,
}) {

    // Loading: 9 skeleton cards matching the grid
    if (loading) {
        return (
            <div className="donor-grid">
                {Array.from({ length: 9 }).map((_, i) => (
                    <SkeletonCard key={i} />
                ))}
            </div>
        )
    }

    // Empty state
    if (filteredDonors.length === 0) {
        return (
            <div className="donor-grid">
                <div className="empty-state">
                    <p className="empty-text">No donors match the current filters.</p>
                    <button className="empty-clear" onClick={clearFilters}>
                        Clear all filters
                    </button>
                </div>
            </div>
        )
    }

    // Donor grid
    return (
        <div className="donor-grid">
            <AnimatePresence mode="popLayout">
                {filteredDonors.map((donor, index) => (
                    <motion.div
                        key={donor.id}
                        layout
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{
                            duration: 0.2,
                            ease: "easeOut",
                            delay: index * 0.03,
                        }}
                    >
                        <DonorCard
                            donor={donor}
                            requestedDonors={requestedDonors}
                            setRequestedDonors={setRequestedDonors}
                        />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    )
}

DonorList.propTypes = {
    filteredDonors: PropTypes.array.isRequired,
    requestedDonors: PropTypes.object.isRequired,
    setRequestedDonors: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    clearFilters: PropTypes.func.isRequired,
}
