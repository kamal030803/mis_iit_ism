import { createContext, useState, useEffect } from 'react';

export const TransactionContext = createContext({
    setTransactions: () => null,
    transactions: null,
});

export const TransactionProvider = ({ children }) => {
    const [transactions,setTransactions]= useState(null);
    const value = { transactions, setTransactions};
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

    return <TransactionContext.Provider value={value}>{children}</TransactionContext.Provider>;
};