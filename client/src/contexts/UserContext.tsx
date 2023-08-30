import { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    User,
} from 'firebase/auth';
import { auth } from '../auth/authConfig';
import { useNavigate } from 'react-router-dom';

export type UserContextType = {
    user: User | null;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    token: string | undefined;
};

export const UserContext = createContext<UserContextType>({} as UserContextType);

interface UserContextProviderProps {
    children?: ReactNode;
}

export const AuthContextProvider: FC<UserContextProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [token, setToken] = useState<string | undefined>();
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            currentUser?.getIdToken().then((idToken) => {
                setToken(idToken);
            });
            setLoading(false);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    const signIn = async (email: string, password: string) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const idToken = await user.getIdToken();
            setToken(idToken);
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    const signUp = async (email: string, password: string) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const idToken = await user.getIdToken();
            setToken(idToken);
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    const logout = () => {
        return signOut(auth);
    };

    const contextValue = {
        user,
        signIn,
        signUp,
        logout,
        token,
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        );
    }

    return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

export const UserAuth = () => {
    return useContext(UserContext);
};
