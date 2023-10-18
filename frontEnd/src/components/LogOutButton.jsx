import { Button } from '@chakra-ui/react';
import { useSetRecoilState } from 'recoil';
import userAtom from '../Atoms/userAtom';
// caling function from hooks folder insted of writing it manaully again ana dagain like const toast = useToast()
import useShowToast from '../Hooks/useShowToast';

const LogOutButton = () => {
  const setUser = useSetRecoilState(userAtom);
  const showToast = useShowToast();

  const handleLogout = async () => {
    try {
      // Fetch request to logout
      const res = await fetch('/api/users/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      console.log(data);
      if (data.error) {
        showToast('Error', data.error, 'error');
        return;
      }
      localStorage.removeItem('user-threads');
      setUser(null);
    } catch (error) {
      showToast('Error', error, 'error');
    }
  };

  return (
    <Button position={'fixed'} top={'30px'} right={'30px'} size={'sm'} onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogOutButton;
