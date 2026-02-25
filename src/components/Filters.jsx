import PropTypes from 'prop-types';

/**
 * Filters Component
 * Renders the top-level inputs (Dropdown, Search Input, and Toggles).
 * It receives Hooks directly from App.jsx so data remains a "Single Source of Truth".
 * 
 * @param {string} selectedBloodGroup - The exact string (e.g., "A+", "All") active in Dropdown.
 * @param {Function} setSelectedBloodGroup - Setter hook for Blood Group logic.
 * @param {string} searchCity - Active input text querying the City.
 * @param {Function} setSearchCity - Setter hook for City String inputs.
 * @param {boolean} sortAvailableFirst - Hook controlling Array Ordering behaviors natively. 
 * @param {Function} setSortAvailableFirst - Setter hook mapping to Toggle Sorting behavior.
 */
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
                {/* 1. Select Object. 
                    `value` tracks exactly the React state natively.
                    `onChange` maps exact `.target.value` DOM strings up to App.jsx flawlessly. */}
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
                    value={searchCity} // Controlled string values ensuring inputs mirror App.jsx
                    onChange={(e) => setSearchCity(e.target.value)}
                    className="filter-input"
                />

                {/* 3. Sort Array Order Toggle 
                    Fires a specific Callback hook pulling the `prev` (prior) boolean snapshot from React, 
                    and explicitly flipping it `(!prev)`. */}
                <button
                    onClick={() => setSortAvailableFirst(prev => !prev)}
                    className={`toggle-button ${sortAvailableFirst ? 'active' : ''}`}
                >
                    {sortAvailableFirst ? "Showing Available First" : "Sort Available First"}
                </button>
            </div>

            <div className="clear-filters">
                {/* 4. Reset Conditional Wrapper
                    ONLY displays if at least ONE Hook is out of its "Default" initialization array. */}
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
