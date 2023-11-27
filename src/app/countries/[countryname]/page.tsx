'use client'
import React, { useEffect, useState } from 'react'
import { options } from "../../api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next"
import { count } from 'console';
import { getCountryInfo } from '@/app/utils/getcountry';

interface CountryInfo {
  // Adjust the type according to your country data structure
  name: {
    common: string;
  };
  flags: {
    svg: string;
  }
  capital: string;
  subregion: string;
  region: string;
  population: string;
  languages: Record<string, string>;
  // Other properties of the country object
}


export default function Country({
  params,
}: {
  params: { countryname: string };
})  {
  // const session = await getServerSession(options);
  const [countryInfo, setCountryInfo] = useState<CountryInfo[]>();
  const [error, setError] = useState<string | null>(null);
  // useEffect(()=>{
  //     const getCountryInfo = async() => {
  //         try {
  //             const res = await fetch(`https://restcountries.com/v3.1/name/${params.countryname}`);
  //             if (res.status === 404) {
  //               setError(`No country with the name ${params.countryname}`);
  //             } else if (!res.ok) {
  //                 setError(`Error fetching data for ${params.countryname}`);
  //             } else {
  //               const data = await res.json();
  //               setCountryInfo(data);
  //             }
  //         } catch(error) {
  //             console.error(error);
  //         }
  //     }
  //     getCountryInfo();
  // }, [params.countryname])

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const {data, error} = await getCountryInfo(params.countryname);
        setCountryInfo(data);
      } catch (error) {
        setError(error as string);
      }
    };

    fetchData();
  }, [params.countryname]);

  // Display error message if there's an error
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className='p-8 md:py-0 max-w-7xl mx-auto'>
      
      {countryInfo ? 
      (countryInfo?.map((item)=> (
        <div key={item.name.common} className='grid grid-cols-1 gap-8 md:grid-cols-2 md:place-items-center'>
          <article>
            <img src={item.flags.svg} alt={item.name.common} />
          </article>
          <article>
          <div className="p-4 dark:text-white">
              <h1 className='font-bold text-lg-900 text-gray-900 text-6xl mb-2 dark:text-white'>{item.name.common}</h1>
              <ul className='flex flex-col items-start justify-start gap-2 dark:text-gray-400'>
                <li>Capital: {item.capital}</li>
                <li>Population: {item.population.toLocaleString()} </li>
                <li>Region: {item.region} </li>
                <li>Sub Region: {item.subregion} </li>
                <b><h2>Languages : </h2> </b>
                <ul className="p-2 mb-12 whitespace-nowrap no-scrollbar overflow-x-scroll overflow-y-hidden grid grid-cols-3 gap-4">
                {item?.languages && Object.entries(item.languages).map(([code, language], index) => (
                  <li className='border-gray-200 border rounded py-2 px-4 bg-gray-200 dark:bg-gray-900' key={index}>
                    {`${language}`}
                  </li>
                ))}
              </ul>
              </ul>
            </div>
          </article>
        </div>
      ))) : (null)}
    </section>
  )
}


