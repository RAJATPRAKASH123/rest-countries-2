'use client'
import { useState, useEffect } from "react";
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
  

export default function Countries(){
    const [countries, setCountries] = useState<Country[]>([]);
    useEffect(()=>{
        const getCountries = async() => {
            try {
                const res = await fetch("https://restcountries.com/v3.1/all");
                const data = await res.json();
                setCountries(data.slice(0, 10));
                // setCountries(data)
            } catch(error) {
                console.error(error);
            }
        }
        getCountries();
    }, [])
    return(
        <>  
            {!countries ? ( 
            <h1 className="text-gray-900 font-bold uppercase tracking-wide flex items-center justify-center text-center h-screen text-4xl dark:text-white">Loading...</h1>
                ) : (
                    <section>
                        {countries.map((country:any) => (
                            <CountryArticle key={country.name.common} country={country}/>
                            // console.log(country)
                        )                   
                        )}
                    </section>
                )
            }
        </>
    );
}