import { UserFormDto } from '@entities';
import { AuthChecker } from '@shared/lib/index';
import { createContext, ReactNode, useEffect, useState } from 'react';

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
      AuthChecker.checkAuth()
        .then((data) => data && setUser(data))
        .catch((e) => console.error(e));
    }
  }, []);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
