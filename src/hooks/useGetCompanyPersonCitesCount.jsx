import React from 'react';
import { useGetCustomersQuery } from '../services/FakeApi';

const useGetCompanyPersonCitesCount = () => {
  const { data: customersData, ...rest } = useGetCustomersQuery();
  const [companyPersonCitesCount, setCompanyPersonCitesCount] = React.useState(
    [],
  );

  React.useEffect(() => {
    if (customersData) {
      const citiesData = [];
      customersData.users.forEach((user) => {
        const companyCity = user.company.address.city;
        const personCity = user.address.city;
        const companyCityIndex = citiesData.findIndex(
          (data) => data.name === companyCity,
        );
        const personCityIndex = citiesData.findIndex(
          (data) => data.name === personCity,
        );
        if (companyCityIndex === -1 && personCityIndex === -1) {
          if (personCity === companyCity) {
            citiesData.push({
              name: personCity,
              personAddress: 0,
              companyAddress: 0,
            });
          }
          if (companyCity && personCity !== companyCity) {
            citiesData.push({
              name: companyCity,
              personAddress: 0,
              companyAddress: 0,
            });
          }
          if (personCity && personCity !== companyCity) {
            citiesData.push({
              name: personCity,
              personAddress: 0,
              companyAddress: 0,
            });
          }
        }
        citiesData.forEach((data) => {
          if (data.name && data.name === companyCity) {
            data.companyAddress += 1;
          }
          if (data.name && data.name === personCity) {
            data.personAddress += 1;
          }
        });
      });
      setCompanyPersonCitesCount(citiesData);
    }
  }, [customersData]);
  return { companyPersonCitesCount, ...rest };
};
export default useGetCompanyPersonCitesCount;
