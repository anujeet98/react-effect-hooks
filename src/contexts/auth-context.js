
import React from 'react';


const AuthContext = React.createContext({
    isLoggedIn: false,
    // login: () => { },
    onLogout: () => { }
});


export default AuthContext;