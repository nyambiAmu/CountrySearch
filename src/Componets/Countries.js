import { useState, useEffect } from "react";
import Article from "./Article";

export default function Countries() {
    const [countries, setCountries] = useState([]);
    const [searchText, setSearchText] = useState("");
    const regions = [
        {
            name: "All Regions",
        },
        {
            name: "Europe",
        },
        {
            name: "Asia",
        },
        {
            name: "Africa",
        },
        {
            name: "Oceania",
        },
        {
            name: "Americas",
        },
        {
            name: "Antarctic",
        },
    ];

    useEffect(() => {
        document.title = `Showing All Countries`;
    }, []);

    useEffect(() => {
        const getCountries = async () => {
            try {
                const res = await fetch("https://restcountries.com/v3.1/all");
                const data = await res.json();
                setCountries(data);
            } catch (error) {
                console.error(error);
            }
        };

        getCountries();
    }, []);

    async function searchCountry() {
        try {
            const res = await fetch(
                `https://restcountries.com/v3.1/name/${searchText}`
            );
            const data = await res.json();
            setCountries(data);
        } catch (error) {
            console.error(error);
        }
    }
    async function filterByRegion(region) {
        try {
            let data;
            if (region === "All Regions") {
                // Fetch all countries if "All Regions" is selected
                const res = await fetch("https://restcountries.com/v3.1/all");
                data = await res.json();
            } else {
                // Fetch countries by the selected region
                const res = await fetch(`https://restcountries.com/v3.1/region/${region}`);
                data = await res.json();
            }
            setCountries(data);
        } catch (error) {
            console.error(error);
        }
    }

    

    function handleSearchCountry(e) {
        e.preventDefault();
        searchCountry();
    }
    function handleFilterByRegion(e) {
        e.preventDefault();
        const selectedRegion = e.target.value;
        filterByRegion(selectedRegion);
    }



    return (
        <>
            {!countries ? (
                <h1 className="text-gray-900 font-bold uppercase tracking-wide flex items-center justify-center text-center h-screen text-4xl dark:text-white">
                    Loading...
                </h1>
            ) : (
                <section className="container mx-auto p-8">
                    {/* form */}
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
                        <form
                            onSubmit={handleSearchCountry}
                            autoComplete="off"
                            className="max-w-4xl md:flex-1"
                        >
                            <input
                                type="text"
                                name="search"
                                id="search"
                                placeholder="Search for a country by its name"
                                required
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                className="py-3 px-4 text-gray-600 placeholder-gray-600 w-full shadow rounded outline-none dark:text-gray-400 dark:placeholder-gray-400 dark:bg-gray-800 dark:focus:bg-gray-700 transition-all duration-200"
                            />
                        </form>

                        <form onSubmit={handleFilterByRegion}>
                                <select
                                    name="filter-by-region"
                                    id="filter-by-region"
                                    className="w-52 py-3 px-4 outline-none shadow rounded text-gray-600 dark:text-gray-400 dark:bg-gray-800 dark:focus:bg-gray-700"
                                    value={searchText}
                                    onChange={handleFilterByRegion} // Use handleFilterByRegion here
                                >
                                    {regions.map((region, index) => (
                                        <option key={index} value={region.name}>
                                            {region.name}
                                        </option>
                                    ))}
                                </select>

                        </form>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                        {countries.map((country) => (
                            <Article key={country.name.common} {...country} />
                        ))}
                    </div>
                </section>
            )}
        </>
    );
}