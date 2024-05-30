import { createContext, ReactNode, useEffect, useState } from 'react';
import { User } from '../api/dto/auth.dto';
import { checkAuth } from './checkAuth';

type Props = {
  children?: ReactNode;
};

type IAuthContext = {
  user: User | null;
  setUser: (newState: User | null) => void;
};

const initialValue = {
  user: null,
  setUser: () => {},
};

const AuthContext = createContext<IAuthContext>(initialValue);

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      checkAuth()
        .then((data) => data && setUser(data))
        .catch((e) => console.error(e));
    }
  }, []);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
