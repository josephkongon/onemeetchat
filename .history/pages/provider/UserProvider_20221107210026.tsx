import { createContext, FC, useState } from 'react';

const defaultValue: DataI = {
  country: {
    code: '',
    name: '',
  },
  gender: '',
  name: '',
};
const UserContext = createContext<UserContextType>([
  defaultValue,
  (data: DataI) => {},
]);

const UserProvider: FC = ({ children }: any) => {
  const [data, setData] = useState(defaultValue);

  return (
    <UserContext.Provider value={[data, setData]}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };

interface DataI {
  name: string;
  gender: string;
  country: {
    name: string;
    code: string;
  };
}

type UserContextType = [DataI, (data: DataI) => void];
