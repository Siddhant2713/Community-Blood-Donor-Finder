import PropTypes from 'prop-types';

export default function Filters({
    selectedBloodGroup,
    setSelectedBloodGroup,
    searchCity,
    setSearchCity,
    sortAvailableFirst,
    setSortAvailableFirst
}) {
    return (
        <div className="filters-section">
            <div className="filter-controls">
                <select
                    value={selectedBloodGroup}
                    onChange={(e) => setSelectedBloodGroup(e.target.value)}
                    className="filter-select"
                >
                    <option value="All">All Blood Groups</option>
                    <option value="A+">A+</option>
                    <option value="B+">B+</option>
                    <option value="O+">O+</option>
                    <option value="O−">O−</option>
                    <option value="AB+">AB+</option>
                    <option value="A−">A−</option>
                </select>

                <input
                    type="text"
                    placeholder="Search by city..."
                    value={searchCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                    className="filter-input"
                />

                <button
                    onClick={() => setSortAvailableFirst(prev => !prev)}
                    className={`toggle-button ${sortAvailableFirst ? 'active' : ''}`}
                >
                    {sortAvailableFirst ? "Showing Available First" : "Sort Available First"}
                </button>
            </div>

            <div className="clear-filters">
                {(selectedBloodGroup !== "All" || searchCity !== "" || sortAvailableFirst) && (
                    <button
                        className="clear-button"
                        onClick={() => {
                            setSelectedBloodGroup("All");
                            setSearchCity("");
                            setSortAvailableFirst(false);
                        }}
                    >
                        Clear Filters ✕
                    </button>
                )}
            </div>
        </div>
    );
}

Filters.propTypes = {
    selectedBloodGroup: PropTypes.string.isRequired,
    setSelectedBloodGroup: PropTypes.func.isRequired,
    searchCity: PropTypes.string.isRequired,
    setSearchCity: PropTypes.func.isRequired,
    sortAvailableFirst: PropTypes.bool.isRequired,
    setSortAvailableFirst: PropTypes.func.isRequired
};
