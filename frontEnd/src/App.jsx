import { Container } from '@chakra-ui/react';
import { Routes, Route, Navigate } from 'react-router-dom';
import UserPage from './pages/UserPage';
import PostPage from './pages/PostPage';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import { useRecoilValue } from 'recoil';
import userAtom from './Atoms/userAtom';
import LogOutButton from './components/LogOutButton';

function App() {
  // Get the user from Recoil state
  const user = useRecoilValue(userAtom);
  console.log(user);

  return (
    <Container maxW="620px">
      <Header /> {/* Render the Header component at the top of the page */}
      <Routes>
        {/* Define application routes */}
        <Route
          path="/"
          element={user ? <HomePage /> : <Navigate to="/auth" />}
          // If a user is logged in, show the HomePage, otherwise navigate to the AuthPage
        />
        <Route
          path="/auth"
          element={!user ? <AuthPage /> : <Navigate to="/" />}
          // If no user is logged in, show the AuthPage, otherwise navigate to the homepage
        />
        <Route path="/:username" element={<UserPage />} />
        {/* Display UserPage for a specific username */}
        <Route path="/:username/post/:pid" element={<PostPage />} />
        {/* Display PostPage for a specific username and post ID */}
      </Routes>
      {user && <LogOutButton />}
      {/* If a user is logged in, display the LogOutButton */}
    </Container>
  );
}

export default App;
