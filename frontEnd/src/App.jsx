import { Box, Container } from '@chakra-ui/react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import UserPage from './pages/UserPage';
import PostPage from './pages/PostPage';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import { useRecoilValue } from 'recoil';
import UpdateProfilePage from './pages/UpdateProfilePage';
import CreatePost from './components/CreatePost';
import userAtom from './atoms/userAtom';
import ChatPage from './pages/ChatPage';

function App() {
  // Get the user from Recoil state
  const user = useRecoilValue(userAtom);
  const { pathname } = useLocation();

  return (
    <Box position={'relative'} w={'full'}>
      <Container
        maxW={
          pathname === '/'
            ? {
                base: '620px',
                md: '900px',
              }
            : '620px'
        }
      >
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
          <Route path="/update" element={user ? <UpdateProfilePage /> : <Navigate to="/auth" />} />
          <Route
            path="/:username"
            element={
              user ? (
                <>
                  <UserPage />
                  <CreatePost />
                </>
              ) : (
                <UserPage />
              )
            }
          />
          {/* Display UserPage for a specific username */}
          <Route path="/:username/post/:pid" element={<PostPage />} />
          <Route path="/chat" element={user ? <ChatPage /> : <Navigate to="/auth" />} />
        </Routes>
      </Container>
    </Box>
  );
}

export default App;
