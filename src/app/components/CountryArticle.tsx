import Link from 'next/link';
import react from 'react';

interface CountryArticleProps {
    country: {
      // We can Adjust the type according country data structure
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
      area:number;
      languages: Record<string, string>;
      // Other properties of the country object
    };
  }
  

const CountryArticle: React.FC<CountryArticleProps> = ({ country }) => {
  return (
    <>
      <Link href={`/countries/${country.name.common}`}>
        <article className='bg-white hover:bg-gray-100 rounded-lg shadow overflow-hidden dark:bg-gray-800 dark:hover:bg-gray-900 '>
          <img src={country.flags.svg} className='md:h-75 w-full object-cover'/>
          <div className="p-4 dark:text-white">
            <h2 className='font-bold text-lg-900 text-gray-900 mb-2 dark:text-white'>{country.name.common}</h2>
            <ul className='flex flex-col items-start justify-start gap-2 dark:text-gray-400'>
              <li>Capital: {country.capital}</li>
              <li>Population: {country.population.toLocaleString()} </li>
              <li>Area: {country.area} </li>
              <li>Region: {country.region} </li>
              <li>Sub Region: {country.subregion} </li>
              
              <b><h2>Languages : </h2> </b>
                <ul className="p-2 mb-12 whitespace-nowrap no-scrollbar overflow-x-scroll overflow-y-hidden grid grid-cols-3 gap-4">
                {country?.languages && Object.entries(country.languages).map(([code, language], index) => (
                  <li className='border-gray-200 border rounded py-2 px-4 bg-gray-200 dark:bg-gray-900' key={index}>
                    {`${language}`}
                  </li>
                ))}
                </ul>
            </ul>
          </div>
        </article>
      </Link>
    </>

  )
}
export default CountryArticle;
