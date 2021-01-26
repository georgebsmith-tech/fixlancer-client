export const initialState = {
    otherUser: {},
    userSummary: { username: "demouser" },
    user: { username: "demouser" },
    userFixes: [],
    isLoggedIn: false,
    fixes: [],
    isLoading: true

}


const reducer = (state, action) => {
    console.log(state)
    switch (action.type) {
        case "SAVE_LOGGED_USER_SUMMARY":
            return { ...state, userSummary: action.userSummary }
            break
        case "SAVE_LOGGED_USER":
            return { ...state, user: action.user }
            break
        case "LOGIN_USER":
            return { ...state, isLoggedIn: action.isLoggedIn }

        case "SET_USER_FIXES":
            return { ...state, userFixes: action.userFixes }
            break

        case "CHANGE_LOADING":
            return { ...state, isLoading: action.isLoading }
            break
        case "SET_FIXES":
            return { ...state, fixes: action.fixes }
            break


        default:
            return state

    }
}

export default reducer;