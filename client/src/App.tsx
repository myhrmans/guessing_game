import 'firebase/compat/auth';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import GamePage from './pages/GamePage';
import { Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './contexts/UserContext';
import { ProtectedRoutes } from './auth/ProtectedRoutes';
import GameBar from './components/GameBar';
import './App.css';
import Footer from './components/Footer';

function App() {
    return (
        <div className="app-component">
            <AuthContextProvider>
                <GameBar />
                <Routes>
                    <Route element={<ProtectedRoutes />}>
                        <Route element={<GamePage />} index />
                    </Route>
                    <Route element={<SignIn />} path="/signin" />
                    <Route element={<SignUp />} path="/signup" />
                </Routes>
                <Footer />
            </AuthContextProvider>
        </div>
    );
}

export default App;
