class Auth {
    logOut() {
        localStorage.removeItem("auth-token")
        localStorage.removeItem("username")
        history.pushState("/login")
    }
}

export default Auth;

