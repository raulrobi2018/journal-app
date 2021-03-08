import React from "react";
import {Link} from "react-router-dom";
import {useForm} from "../../hooks/useForm";

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
        console.log(name, email, password, confirm);
    };

    return (
        <>
            <h3 className="auth__title">Login</h3>

            <form onSubmit={handleRegister}>
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
