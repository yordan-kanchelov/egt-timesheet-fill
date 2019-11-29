const loginPageSelectors = {
    usernameInput: "#id_username",
    passwordInput: "#id_password",
    submitButton: "body > div:nth-child(2) > form > input[type=submit]:nth-child(4)",
};

Object.freeze(loginPageSelectors);

export default loginPageSelectors;
