import React, { useState, ReactNode } from 'react'
import * as auth from '../auth-provider'
interface User {
    id: string;
    name: string;
    organization: string;
    token: string;
}
const AuthContext = React.createContext<{
    user: User | null,
    register: (form: AuthForm) => Promise<void>
    login: (form: AuthForm) => Promise<void>
    logout: () => Promise<void>
} | undefined>(undefined)

interface AuthForm {
    username: string;
    password: string;
}

AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({children}: {children: ReactNode}) => {
    const [user, setuser] = useState<User | null>(null)
    const login = (form: AuthForm) => auth.login(form).then(setuser)
    const register = (form: AuthForm) => auth.register(form).then(setuser)
    const logout = () => auth.logout().then(() => setuser(null))
    return (<AuthContext.Provider children={ children } value ={{user, login, register, logout}} />)
}

export const useAuth = () => {
    const context = React.useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth必须在AuthProvider中使用')
    }
    return context
}