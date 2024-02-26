
import React, {useState, useEffect} from 'react';


const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogin: (email, password) => { },
    onLogout: () => { }
});

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const userIsLoggedIn = localStorage.getItem("userIsLoggedIn");
        if(userIsLoggedIn === '1')
          setIsLoggedIn(true);
      }, []);

    const loginHandler = (email, password) => {
        localStorage.setItem("userIsLoggedIn",'1');
        setIsLoggedIn(true);
    }

    const logoutHandler = () => {
        localStorage.removeItem("userIsLoggedIn");
        setIsLoggedIn(false);
    }
    return (
        <AuthContext.Provider value={{isLoggedIn: isLoggedIn, onLogin: loginHandler, onLogout: logoutHandler}}>
            {props.children}
        </AuthContext.Provider>
    )
}


export default AuthContext;