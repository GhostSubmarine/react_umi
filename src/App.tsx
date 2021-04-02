import React from 'react'
import './App.css'
import { AuthenticatedApp } from './authenticated-app'
import { UnathenticatedApp } from './unauthenticated-app'
import { useAuth } from './context/auth-context'

const App = () => {
    const { user } = useAuth()
    return (
        <div className="App">
            { user ? <AuthenticatedApp /> : <UnathenticatedApp /> }
        </div>
    )
}

export default App;
