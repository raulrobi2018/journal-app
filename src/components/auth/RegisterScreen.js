import React from "react";
import {Link} from "react-router-dom";
import {useForm} from "../../hooks/useForm";
import validator from "validator";

export const RegisterScreen = () => {
    const data = {
        name: "Raul",
        email: "raulrobi@gmail.com",
        password: "123456",
        confirm: "123456"
    };

    const [formValues, {handleInputChange}] = useForm(data);

    const {name, email, password, confirm} = formValues;

    const handleRegister = (e) => {
        e.preventDefault();

        if (isFormValid()) {
            console.log("Correct form");
        }
        console.log(name, email, password, confirm);
    };

    const isFormValid = () => {
        if (name.trim().length === 0) {
            console.log("Name is required");
        } else if (!validator.isEmail(email)) {
            console.log("Email is not valid");
            return false;
        } else if (password !== confirm || password.length < 5) {
            console.log(
                "Password should be at least 6 characters and match each other"
            );
            return false;
        }

        return true;
    };

    return (
        <>
            <h3 className="auth__title">Login</h3>

            <form onSubmit={handleRegister}>
                <div className="auth__alert-error">Error</div>

                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    onChange={handleInputChange}
                    value={name}
                />

                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    onChange={handleInputChange}
                    value={email}
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    onChange={handleInputChange}
                    value={password}
                />
                <input
                    type="password"
                    placeholder="Confirm password"
                    name="confirm"
                    className="auth__input"
                    onChange={handleInputChange}
                    value={confirm}
                />
                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                    disabled={false}
                >
                    Register
                </button>

                <Link to="/auth/login" className="link">
                    Already registered?
                </Link>
            </form>
        </>
    );
};
