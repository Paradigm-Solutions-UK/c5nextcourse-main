// useAuth.jsx
import { useContext } from 'react';
import AuthContext from './AuthContext';

const useAuth = () => {
  const { authUser, setAuthUser } = useContext(AuthContext);
  console.log ('authUser = ', authUser)
  return { authUser, setAuthUser };
};

export default useAuth;
