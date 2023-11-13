// useAuth.jsx
import { useContext } from 'react';
import AuthContext from './AuthContext';

const useAuth = (changeUser) => {
  const { authUser, setAuthUser } = useContext(AuthContext);
  console.log ('authUser = ', authUser)
  changeUser = 1;
  return { authUser, setAuthUser,changeUser };
};

export default useAuth;
