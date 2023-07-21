import React from 'react';

const ToggleSwitch = ({ isDarkMode, toggleDarkMode }) => {
    return (
        <button
            className="text-white p-2 rounded-md"
            onClick={toggleDarkMode}
            aria-label="Toggle Dark Mode"
        >
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
    );
};

export default ToggleSwitch;
