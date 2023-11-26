import react from 'react';

interface CountryArticleProps {
    country: {
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
      // flags: string;
      // Other properties of the country object
    };
  }
  

const CountryArticle: React.FC<CountryArticleProps> = ({ country }) => {
// export default function CountryArticle({flags}){
  console.log(country);
  return (
    <>
    <article>
      <img src={country.flags.svg}/>
      <h2 className='font-bold text-lg-900 text-gray-900 mb-2 dark:text-white'>{country.name.common}</h2>
      <ul className='flex flex-col items-start justify-start gap-2'>
        <li>Capital: {country.capital}</li>
        <li>Population: {country.population.toLocaleString()} </li>
        <li>Region: {country.region} </li>
        <li>Sub Region: {country.subregion} </li>
      </ul>
    </article>
    </>

  )
}
export default CountryArticle;
