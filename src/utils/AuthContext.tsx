import { createContext, ReactNode, useState } from 'react';

type Props = {
  children?: ReactNode;
};

type User = {
  email: string;
  login: string;
};

type IAuthContext = {
  user: User | null;
  setUser: (newState: User | null) => void;
};

const initialValue = {
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : null,
  setUser: () => {},
};

const AuthContext = createContext<IAuthContext>(initialValue);

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(initialValue.user);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
