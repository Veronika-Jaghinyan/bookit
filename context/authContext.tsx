import { createContext, useContext, useState, useEffect } from 'react';
import checkAuth from '@/app/actions/checkAuth';

const AuthContext = createContext<
  | {
      isAuthenticated: boolean;
      currentUser: any;
      setIsAuthenticated: any;
      setCurrentUser: any;
    }
  | undefined
>(undefined);

export const AuthProvider = ({ children }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      const checkAuthResp = await checkAuth();
      const isAuthenticated = !!checkAuthResp?.isAuthenticated;
      const user = checkAuthResp?.user;
      setIsAuthenticated(isAuthenticated);
      setCurrentUser(user);
    };
    checkAuthentication();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
