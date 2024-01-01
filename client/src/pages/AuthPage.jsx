// Importing necessary dependencies and components
import { useRecoilValue } from 'recoil';
import LoginCard from '../components/LoginCard';
import SignupCard from '../components/SignupCard';
import authScreenAtom from '../atoms/authAtom';

// Component for handling authentication page
const AuthPage = () => {
  // Accessing the authentication screen state using Recoil
  const authScreenState = useRecoilValue(authScreenAtom);

  return (
    // Conditional rendering based on the authentication screen state
    <>{authScreenState === 'login' ? <LoginCard /> : <SignupCard />}</>
  );
};

// Exporting the AuthPage component as the default export
export default AuthPage;
