import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactCountryFlag from 'react-country-flag';

const Country = (x: any) => {
  const [country, setCountry] = useState<string | null>(null);
  const [countryName, setCountryName] = useState<string>('');
  const [countryCode, setCountryCode] = useState<string>('');

  useEffect(() => {
    axios
      .get('https://ipapi.co/json/')
      .then((response: any) => {
        let data = response.data;
        console.log(data);
        setCountry(data.country);
        setCountryName(data.country_name);
        setCountryCode(data.country_code);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      {country ? (
        <>
          <div>{country}</div>
          <div>{countryName}</div>
          <div>{countryCode}</div>
          <ReactCountryFlag
            countryCode={countryCode}
            svg
            style={{
              width: '2em',
              height: '2em',
            }}
            title={countryName}
          />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export { Country };
