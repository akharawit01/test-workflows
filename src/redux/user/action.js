const Action = {
  USER_LOGIN: "USER_LOGIN",
  USER_REQUEST_LOGIN: "USER_REQUEST_LOGIN",
  USER_LOGIN_SUCCESS: "USER_LOGIN_SUCCESS",
  USER_LOGIN_ERROR: "USER_LOGIN_ERROR",
  CLEAR_USER: "CLEAR_USER",
  userLogin: user => {
    localStorage.setItem("username", user.username);
    localStorage.setItem("email", user.email);
    return {
      type: Action.USER_LOGIN,
      ...user
    };
  },
  userRequestLogin: value => ({
    type: Action.USER_REQUEST_LOGIN,
    body: value
  }),

  clearUser: () => {
    localStorage.clear();
    return {
      type: Action.CLEAR_USER
    };
  }
};

export default Action;
