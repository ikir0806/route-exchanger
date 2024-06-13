import { createContext, ReactNode, useEffect, useState } from 'react';
import { UserFormDto } from '../api/dto/user.dto';
import { checkAuth } from './checkAuth';

type Props = {
  children?: ReactNode;
};

type IAuthContext = {
  user: UserFormDto | null;
  setUser: (newState: UserFormDto | null) => void;
};

const initialValue = {
  user: null,
  setUser: () => {},
};

const AuthContext = createContext<IAuthContext>(initialValue);

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<UserFormDto | null>(null);

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
