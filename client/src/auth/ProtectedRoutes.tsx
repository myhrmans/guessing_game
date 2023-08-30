import { Navigate, Outlet } from 'react-router-dom';
import { UserAuth } from '../contexts/UserContext';

export const ProtectedRoutes = () => {
    const { user } = UserAuth();

    return user ? <Outlet /> : <Navigate to="/signin" />;
};
