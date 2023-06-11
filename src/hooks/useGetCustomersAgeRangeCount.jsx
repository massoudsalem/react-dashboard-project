import React from 'react';
import { useGetCustomersQuery } from '../services/FakeApi';

const useGetCustomersAgeRangeCount = () => {
  const { data: customersData, ...rest } = useGetCustomersQuery();
  const [customersAgeRangeCount, setCustomersAgeRangeCount] = React.useState(
    [],
  );

  React.useEffect(() => {
    if (customersData) {
      const customersAgeRange = [
        { name: '0-20', value: 0 },
        { name: '21-30', value: 0 },
        { name: '31-40', value: 0 },
        { name: '41-60', value: 0 },
      ];
      customersData.users.forEach((user) => {
        if (user.age <= 20) {
          customersAgeRange[0].value += 1;
        } else if (user.age <= 30) {
          customersAgeRange[1].value += 1;
        } else if (user.age <= 40) {
          customersAgeRange[2].value += 1;
        } else {
          customersAgeRange[3].value += 1;
        }
      });
      setCustomersAgeRangeCount(customersAgeRange);
    }
  }, [customersData]);
  return { customersAgeRangeCount, ...rest };
};

export default useGetCustomersAgeRangeCount;
