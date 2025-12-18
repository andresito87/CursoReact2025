import { createContext, useEffect, useState, type PropsWithChildren } from "react";
import { users, type User } from "../data/user-mock.data";

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';

interface UserContextProps {
    // State
    authStatus: AuthStatus,
    user: User | null,
    isAuthenticated: boolean;

    // Methods
    login: (userId: number) => boolean,
    logout: () => void;
}

export const UserContext = createContext({} as UserContextProps); // Objeto usado como almacén de datos, nuestro contexto

// HOC(Higher Order Component): Componente que recibe hijos, Proveedor del contexto
export const UserContextProvider = ({ children }: PropsWithChildren) => {

    const [authStatus, setAuthStatus] = useState<AuthStatus>('checking');
    const [user, setUser] = useState<User | null>(null);

    const handleLogin = (userId: number) => {
        const user = users.find((user) => user.id === userId);

        if (!user) {
            console.log(`User not found ${userId}`);
            setUser(null);
            setAuthStatus('not-authenticated');
            return false;
        }

        setUser(user);
        setAuthStatus('authenticated');
        localStorage.setItem('userId', userId.toString());
        return true;
    };

    const handleLogout = () => {
        console.log('logout');
        setUser(null);
        setAuthStatus('not-authenticated');
        localStorage.removeItem('userId');
    };

    useEffect(() => { // detonamos el efecto cada vez que el componente se monte para comprobar si hay un usuario autenticado

        const storedUserId = localStorage.getItem("userId");
        if (!storedUserId) {
            setAuthStatus("not-authenticated");
            return;
        }

        handleLogin(Number(storedUserId));
    }, []);

    return <UserContext value={{
        authStatus: authStatus,
        isAuthenticated: authStatus === 'authenticated',

        user: user,
        login: handleLogin,
        logout: handleLogout
    }}>
        {children}
    </ UserContext>;
};