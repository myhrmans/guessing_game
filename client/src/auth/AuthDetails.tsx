import { useEffect, useState } from 'react';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './authConfig';

const AuthDetails = () => {
    const [authUser, setAuthUser] = useState< User | null>();

    useEffect(() => {
        const listen = onAuthStateChanged(auth, user => {
            if (user) {
                setAuthUser(user)
            }
            else {
                setAuthUser(null)
            }
            return (() => listen())
                
            
        })
    }, [])
    const userSignOut = () => {
        signOut(auth).then(() => console.log("signout successful"));
    }
}
export default AuthDetails