import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext({
    setUserId: () => null,
    userId: null,
    session: null,
    setSession: () => null,
    year: null,
    setYear: null
});

export const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);
    const [session, setSession] = useState(null);
    const [year, setYear] = useState(null);
    const value = { userId, setUserId, session, setSession, year, setYear };
    useEffect(() => {
        if (localStorage.getItem('userId') != null) {
            setUserId(localStorage.getItem('userId'));
            setSession(localStorage.getItem('session'));
            setYear(localStorage.getItem('year'));
        }
    }, [])
    // useEffect(() => {
    //     const unsubscribe = onAuthStateChangedListener(async (user) => {
    //         if (user) {
    //             const name = await createUserDocumentFromAuth(user);
    //             setSession(name);
    //         } else {
    //             setSession(null);
    //         }
    //         user(user);
    //     });
    //     return unsubscribe;
    // }, []);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};