function validName(thisName) {
    let name = thisName.trim();
    if (name === "") return false;
    return true;
}

function validEmail(thisEmail) {
    let email = thisEmail.replace(" ", "");
    if (email === "") return false;
    let at_index = email.indexOf("@");
    if (at_index <= 0) return false;
    let domain = email.indexOf(".", at_index);
    if (domain == -1) return false;
    if (domain == at_index + 1) return false;
    if (domain == email.length - 1) return false;
    return true;
}

function validPassword(thisPassword) {
    let password = thisPassword.trim();
    if (password === "") return false;
    if (password.length < 8) return false;
    return true;
}

export { validName, validEmail, validPassword };