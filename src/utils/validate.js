export const validateData = (email,password) => {

//    const isNameValid = /^[a-zA-Z ]{2,30}$/.test(name);

    const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);

    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

    // if(!isNameValid) return "Oops!! Name is not valid"
    if(!isEmailValid) return "Oops!! Email ID is not valid"
    if(!isPasswordValid) return "Oops!! Password is not valid"

    return null;
};