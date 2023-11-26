'use client'
import { useState, useEffect, FormEvent } from "react";
import CountryArticle from "./CountryArticle";

interface Country {
    // Adjust the type according to your country data structure
    name: {
      common: string;
    };
    flags: {
        svg: string;
    }
    // Other properties of the country object
  }
  
  interface Region {
    name: string;
  }

export default function Countries(){
    const [countries, setCountries] = useState<Country[]>([]);
    const [searchText, setSearchText] = useState("");
    const [selectedRegion, setSelectedRegion] = useState<string | undefined>(undefined);
    const [searchError, setSearchError] = useState<string | null>(null);
    const regions: Region[] = [
        {
            name:"All",
        },
        {
            name: "Africa",
        },
        {
            name: "America",
        },
        {
            name: "Antarctic",
        },
        {
            name: "Asia",
        },
        {
            name: "Europe",
        },
        {
            name: "Oceania",
        },
    ];
    useEffect(()=>{
        const getCountries = async() => {
            try {
                const res = await fetch("https://restcountries.com/v3.1/all");
                const data = await res.json();
                setCountries(data.slice(0, 10));
                // setCountries(data)
                setSearchError(null);
            } catch(error) {
                console.error(error);
            }
        }
        getCountries();
    }, [])

    async function searchCountry() {
        
        try {
            const res = await fetch(`https://restcountries.com/v3.1/name/${searchText}`);
            if (res.status === 404) {
                setSearchError(`No country with the name ${searchText}`);
              } else if (!res.ok) {
                  setSearchError(`Error fetching data for ${searchText}`);
              } else {
                const data = await res.json();
                setCountries(data);
                setSearchError(null);
                // setCountries(data)   
              }
            // Reset searchError after 5 seconds (adjust the duration as needed)
            setTimeout(() => {
                setSearchError(null);
            }, 3500);
        } catch(error) {
            console.error(error);
        } 
    }
    function handleSearchCountry(e: FormEvent<HTMLFormElement>){
        e.preventDefault();
        searchCountry()
    }
    async function filterByRegion(region: string) {
        
        try {
            if (region !== "All") {
                const res = await fetch(`https://restcountries.com/v3.1/region/${region}`);
                const data = await res.json();
                setCountries(data);
            }else {
                const res = await fetch(`https://restcountries.com/v3.1/all`);
                const data = await res.json();
                setCountries(data);
            }

            // setCountries(data)
        } catch(error) {
            console.error(error);
        } 
    }
    function handleFilterByRegion(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        filterByRegion(selectedRegion || "");
    }

    return(
        <>  
            {!countries ? ( 
            <h1 className="text-gray-900 font-bold uppercase tracking-wide flex items-center justify-center text-center h-screen text-4xl dark:text-white">Loading...</h1>
                ) : (
                    
                    <section className="container mx-auto p-8">
                        
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <form onSubmit={e => handleSearchCountry(e)} autoComplete="off" className="max-w-4xl md:flex-1">
                                <input 
                                    type="text" 
                                    name="search" 
                                    id="search"
                                    placeholder="Search for a Country by its name"
                                    required
                                    className="py-3 px-4 bg-gray-100 text-gray-900 placeholder-gray-600 w-full shadow rounded outline-none dark:bg-gray-800 dark:text-white dark:placeholder-gray-300 dark:focus:bg-gray-700 transition-all duration-200"
                                    value={searchText}
                                    onChange={(e)=>setSearchText(e.target.value)}
                                />
                            </form>
                            <form onSubmit={handleFilterByRegion}>
                                <select 
                                    name="filter-by-region" 
                                    id="filter-by-region"
                                    className="w-52 py-3 px-5 outline-none shadow rounded appearance-none dark:bg-gray-800 dark:text-white dark:placeholder-gray-30 dark:focus:bg-gray-700"
                                    value={selectedRegion}
                                    onChange={e => filterByRegion(e.target.value)}
                                >
                                    {
                                        regions.map((region, index) => (
                                            <option key={index} value={region.name}>{region.name}</option>
                                        ))
                                    }
                                </select>
                            </form>
                        </div>
                        
                        {searchError === null ? (
                            <div className="py-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                                
                                {countries?.map((country:any) => (
                                    <CountryArticle key={country.name.common} country={country}/>
                                    // console.log(country)
                                )                   
                                )}
                            
                            </div>) : (
                                <h1 className="text-5xl">{searchError}</h1>
                                )
                        }
                    </section>
                    
                )
            }
        </>
    );
}