function isEmpty(value){
    return !value || value.trim() ==='';
}
function userDetailssAreValid(email,password,name,postal,address,city){
    return (
        email && 
        password && 
        password.trim().length >=6 && 
        !isEmpty(name) &&
        !isEmpty(address) &&
        !isEmpty(city) &&
        !isEmpty(postal)
    );
}
function emailIsConfirmed(email,confirmEmail){
    return email===confirmEmail;
}

module.exports = {
    userDetailssAreValid: userDetailssAreValid,
    emailIsConfirmed:emailIsConfirmed
};