// importing necessary components and utilities
import { Box, Container } from '@chakra-ui/react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import UserPage from './pages/UserPage';
import PostPage from './pages/PostPage';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import { useRecoilValue } from 'recoil';
import userAtom from './atoms/userAtom';
import UpdateProfilePage from './pages/UpdateProfilePage';
import CreatePost from './components/CreatePost';
import ChatPage from './pages/ChatPage';
import MobileApp from './pages/MobileApp';
import { SettingsPage } from './pages/SettingsPage';

// defining the main App component
function App() {
  // accessing the user state using Recoil
  const user = useRecoilValue(userAtom);
  // getting the current pathname using react-router-dom's useLocation
  const { pathname } = useLocation();

  return (
    // main container for the entire app
    <Box position={'relative'} w="full">
      {/* container for the main content with a maximum width based on the current pathname */}
      <Container
        maxW={pathname === '/' ? { base: '620px', md: '900px' } : '620px'}
      >
        {/* rendering the Header component */}
        <Header />
        {/* defining the routes for the app */}
        <Routes>
          {/* home route - shows HomePage if user is authenticated, otherwise redirects to AuthPage */}
          <Route
            path="/"
            element={user ? <HomePage /> : <Navigate to="/auth" />}
          />
          {/* authentication route - shows AuthPage if user is not authenticated, otherwise redirects to Home */}
          <Route
            path="/auth"
            element={!user ? <AuthPage /> : <Navigate to="/" />}
          />
          {/* update profile route - shows UpdateProfilePage if user is authenticated, otherwise redirects to AuthPage */}
          <Route
            path="/update"
            element={user ? <UpdateProfilePage /> : <Navigate to="/auth" />}
          />

          {/* user profile route - shows UserPage and CreatePost components if user is authenticated, otherwise only UserPage */}
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
          {/* individual post route - shows PostPage component */}
          <Route path="/:username/post/:pid" element={<PostPage />} />
          {/* chat route - shows ChatPage if user is authenticated, otherwise redirects to AuthPage */}
          <Route
            path="/chat"
            element={user ? <ChatPage /> : <Navigate to={'/auth'} />}
          />
          {/* settings route - shows SettingsPage if user is authenticated, otherwise redirects to AuthPage */}
          <Route
            path="/settings"
            element={user ? <SettingsPage /> : <Navigate to={'/auth'} />}
          />
          <Route path="/MobileApp" element={<MobileApp />} />
        </Routes>
      </Container>
    </Box>
  );
}

// exporting the App component as the default export
export default App;
