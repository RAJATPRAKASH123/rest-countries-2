'use client'
import { useState, useEffect, FormEvent, useCallback } from "react";
import CountryArticle from "./CountryArticle";
import Pagination from "./Pagination";

// Defined the types for Country, Region, and Attribute
interface Country {
    name: {
      common: string;
    };
    flags: {
        svg: string;
    }
    population:number;
    area:number;
    languages: Record<string, string>;
    
  }
  
  interface Region {
    name: string;
  }
  interface Attribute {
    name: string;
  }

export default function Countries(){
    // State hooks for managing data and user inputs
    const [countries, setCountries] = useState<Country[]>([]);
    const [searchText, setSearchText] = useState("");
    const [selectedRegion, setSelectedRegion] = useState<string | undefined>(undefined);
    const [selectedAttribute, setSelectedAttribute] = useState<string | undefined>(undefined);
    const [searchError, setSearchError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [recordsPerPage, setRecordsPerPage] = useState<number>(12);
    const [pageInput, setPageInput] = useState(1);
    
    // Calculate index of records for pagination
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

    // Region and sorting options
    const regions: Region[] = [
        {
            name:"All regions",
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
    const sortingAttributes: Attribute[] = [
        {
            name:"Sort By",
        },
        {
            name: "Population",
        },
        {
            name: "Area",
        },
        {
            name: "Languages",
        },
    ]

    // Fetch countries data on component mount
    useEffect(()=>{
        const getCountries = async() => {
            try {
                const res = await fetch("https://restcountries.com/v3.1/all", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                const data = await res.json();
                // setCountries(data.slice(0, 10));
                setCountries(data)
                setSearchError(null);
            } catch(error) {
                console.error(error);
            }
        }
        getCountries();
    }, [])

    // Function to search for countries by the name
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
            // Reset searchError after 3.5 seconds (adjust the duration as needed)
            setTimeout(() => {
                setSearchError(null);
            }, 3500);
        } catch(error) {
            console.error(error);
        } 
    }
    // Handle form submission for search
    function handleSearchCountry(e: FormEvent<HTMLFormElement>){
        e.preventDefault();
        searchCountry()
    }
    // Function to filter countries by region
    async function filterByRegion(region: string) {
        
        try {
            if (region !== "All regions") {
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
    // Function to sort countries by Name
    const sortCountriesByName = (order: 'asc' | 'desc') => {
        const sortedCountries = [...countries].sort((a, b) => {
          const nameA = a.name.common.toLowerCase();
          const nameB = b.name.common.toLowerCase();
    
          if (order === 'asc') {
            return nameA.localeCompare(nameB);
          } else {
            return nameB.localeCompare(nameA);
          }
        });
    
        setCountries(sortedCountries);
      };
    // Function to sort countries by Population
    const sortCountriesByPopulation = (order: 'asc' | 'desc') => {
        const sortedCountries = [...countries].sort((a, b) => {
          const populationA = a.population;
          const populationB = b.population;
      
          if (order === 'asc') {
            return populationA - populationB;
          } else {
            return populationB - populationA;
          }
        });
      
        setCountries(sortedCountries);
      };
    // Function to sort countries by Area
    const sortCountriesByArea = (order: 'asc' | 'desc') => {
        const sortedCountries = [...countries].sort((a, b) => {
            const areaA = a.area;
            const areaB = b.area;

            if (order === 'asc') {
            return areaA - areaB;
            } else {
            return areaB - areaA;
            }
        });

        setCountries(sortedCountries);
    };
    // Function to sort countries by Languages
    const sortCountriesByLanguages = (order: 'asc' | 'desc') => {
        const sortedCountries = [...countries].sort((a, b) => {
          
          const languagesA = Object.keys(a?.languages || []).length;
          const languagesB = Object.keys(b?.languages || []).length;
      
          if (order === 'asc') {
            return languagesA - languagesB;
          } else {
            return languagesB - languagesA;
          }
        });
      
        setCountries(sortedCountries);
      };
    
    async function filterByAttribute(attribute: string) {
        
        try {
            if (attribute !== "Sort By") {
                console.log(countries)
                switch (attribute) {
                    case "Population":
                        sortCountriesByPopulation("desc");
                        break;
                    case "Area":
                        sortCountriesByArea("desc");
                        break;
                    case "Languages":
                        sortCountriesByLanguages("desc");
                        break;
                    default:
                        break;
                }
                
            }else {
                sortCountriesByName("desc");
            }

            // setCountries(data)
        } catch(error) {
            console.error(error);
        } 
    }
    // Handle form submission for region filter
    function handleFilterByRegion(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        filterByRegion(selectedRegion || "");
    }
    // // Handle form submission for attribute filter
    function handleFilterByAttribute(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        filterByAttribute(selectedAttribute || "");
        // setCountries(countries)
    }
    // Calculate current records and number of pages for pagination
    let currentRecords = countries.slice(indexOfFirstRecord, indexOfLastRecord);
    let nPages = Math.ceil(countries.length / recordsPerPage);

    // Pagination functions
    const nextPage = useCallback(() => {
        if (currentPage !== nPages) {
          setCurrentPage(currentPage + 1);
          setPageInput(currentPage + 1);
        }
      }, [currentPage]);
    
      const prevPage = useCallback(() => {
        if (currentPage !== 1) {
          setCurrentPage(currentPage - 1);
          setPageInput(currentPage - 1);
        }
      }, [currentPage]);
    
      const handlePageInput = useCallback(
        (e: { target: { value: any; }; }) => {
          const val = e.target.value;
          if (parseInt(val) > nPages || parseInt(val) <= 0) {
            setPageInput(nPages);
            return;
          }
          setPageInput(val);
        },
        [pageInput]
      );
    
      const handleEnterKey = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter" || e.keyCode === 13) {
            if (e.currentTarget.value.length !== 0) {
              setCurrentPage(pageInput);
            }
          }
        },
        [pageInput]
      );
    // JSX structure for rendering UI
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
                            <form onSubmit={handleFilterByAttribute}>
                                <select 
                                    name="filter-by-attribute" 
                                    id="filter-by-attribute"
                                    className="w-52 py-3 px-5 outline-none shadow rounded appearance-none dark:bg-gray-800 dark:text-white dark:placeholder-gray-30 dark:focus:bg-gray-700"
                                    value={selectedAttribute}
                                    onChange={e => filterByAttribute(e.target.value)}
                                >
                                    {
                                        sortingAttributes.map((attribute, index) => (
                                            <option key={index} value={attribute.name}>{attribute.name}</option>
                                        ))
                                    }
                                </select>
                            </form>
                        </div>
                        
                        {searchError === null ? (
                            <>
                                <div className="py-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                                    {currentRecords?.map((country:any) => (
                                        <CountryArticle key={country.name.common} country={country}/>
                                    )                   
                                    )}
                                </div>
                                <Pagination
                                    nextPage={nextPage}
                                    prevPage={prevPage}
                                    nPages={nPages}
                                    currentPage={currentPage}
                                    handleEnterKey={handleEnterKey}
                                    handlePageInput={handlePageInput}
                                    pageInput={pageInput}
                                />
                                  </>
) : (
                                <h1 className="text-5xl">{searchError}</h1>
                                )
                        }
                    </section>
                    
                )
            }
        </>
    );
}