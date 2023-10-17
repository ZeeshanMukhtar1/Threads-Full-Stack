import { useRecoilValue, useSetRecoilState } from 'recoil';
import LoginCard from '../components/LoginCard';
import SignupCard from '../components/SignUpCard';
import authScreenAtom from '../Atoms/authAtom';

const AuthPage = () => {
  const authScreenState = useRecoilValue(authScreenAtom);
  //   const [value, setValue] = authScreenState('login');
  console.log(authScreenState);
  useSetRecoilState(authScreenAtom);
  return <>{authScreenState === 'login' ? <LoginCard /> : <SignupCard />}</>;
};

export default AuthPage;
