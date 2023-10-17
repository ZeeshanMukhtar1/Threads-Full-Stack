import { useRecoilValue } from 'recoil';
import LoginCard from '../components/LoginCard';
import SignupCard from '../components/SignUpCard';
import authScreenAtom from '../Atoms/authAtom';

const AuthPage = () => {
  const authScreenState = useRecoilValue(authScreenAtom);

  return <>{authScreenState === 'login' ? <LoginCard /> : <SignupCard />}</>;
};

export default AuthPage;
