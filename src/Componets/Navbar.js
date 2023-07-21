import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiSun, HiMoon } from 'react-icons/hi';

const Navbar = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode((prevMode) => !prevMode);
        document.documentElement.classList.toggle('dark');
    };

    return (
        <nav className="bg-blue-900 p-4">
            <div className="flex items-center justify-between">
                <Link to="/" className="text-white text-xl">
                    Where in the world?
                </Link>
                <button
                    className="text-white p-2 rounded-md"
                    onClick={toggleDarkMode}
                    aria-label="Toggle Dark Mode"
                >
                    {isDarkMode ? <HiMoon size={36} /> : <HiSun size={36} />}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
