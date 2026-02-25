import PropTypes from 'prop-types'

const BLOOD_GROUPS = ["All", "A+", "A−", "B+", "B−", "O+", "O−", "AB+", "AB−"]

/*
  IMPORTANT: "O−" and "A−" use Unicode minus U+2212, not a hyphen.
  Copy these exact strings. Do not retype them.
  They must match the bloodGroups array in App.jsx exactly.
*/

export default function Filters({
    selectedBloodGroup,
    setSelectedBloodGroup,
    searchCity,
    setSearchCity,
    sortAvailableFirst,
    setSortAvailableFirst,
    filteredCount,
    totalCount,
    hasActiveFilters,
    clearFilters,
}) {
    return (
        <>
            {/* ── Filter Bar ─────────────────────────────────── */}
            <div className="filter-bar">

                {/* Blood group pills */}
                <div className="bg-pills">
                    {BLOOD_GROUPS.map(group => (
                        <button
                            key={group}
                            className={`bg-pill ${selectedBloodGroup === group ? 'active' : ''}`}
                            onClick={() => setSelectedBloodGroup(group)}
                        >
                            {group === "All" ? "All" : group}
                        </button>
                    ))}
                </div>

                {/* City search */}
                <input
                    type="text"
                    className="city-search"
                    placeholder="Search by city..."
                    value={searchCity}
                    onChange={e => setSearchCity(e.target.value)}
                    aria-label="Search donors by city"
                />

                {/* Available only toggle */}
                <button
                    className={`avail-toggle ${sortAvailableFirst ? 'active' : ''}`}
                    onClick={() => setSortAvailableFirst(prev => !prev)}
                    aria-pressed={sortAvailableFirst}
                >
                    Available only
                </button>

            </div>

            {/* ── Meta Row ───────────────────────────────────── */}
            <div className="meta-row">
                <span className="donor-count">
                    {filteredCount} of {totalCount} donors
                </span>

                {hasActiveFilters && (
                    <button className="clear-btn" onClick={clearFilters}>
                        Clear filters
                    </button>
                )}
            </div>
        </>
    )
}

Filters.propTypes = {
    selectedBloodGroup: PropTypes.string.isRequired,
    setSelectedBloodGroup: PropTypes.func.isRequired,
    searchCity: PropTypes.string.isRequired,
    setSearchCity: PropTypes.func.isRequired,
    sortAvailableFirst: PropTypes.bool.isRequired,
    setSortAvailableFirst: PropTypes.func.isRequired,
    filteredCount: PropTypes.number.isRequired,
    totalCount: PropTypes.number.isRequired,
    hasActiveFilters: PropTypes.bool.isRequired,
    clearFilters: PropTypes.func.isRequired,
}
