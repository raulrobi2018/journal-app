import React from "react";
import {Link} from "react-router-dom";
import {useForm} from "../../hooks/useForm";
import validator from "validator";
import {useDispatch, useSelector} from "react-redux";
import {removeError, setError} from "../../actions/ui";
import {startRegisterWithEmailPasswordName} from "../../actions/auth";

export const RegisterScreen = () => {
    const data = {
        name: "Raul",
        email: "raulrodriguez@gmail.com",
        password: "123456",
        confirm: "123456"
    };

    //Hook de Redux
    const dispatch = useDispatch();
    //Hook de Redux que retorna el state actual
    //En este caso tomo el atributo ui del state y luego desestructuro el mensaje
    const {msgError} = useSelector((state) => state.ui);

    const [formValues, {handleInputChange}] = useForm(data);

    const {name, email, password, confirm} = formValues;

    const handleRegister = (e) => {
        e.preventDefault();

        if (isFormValid()) {
            dispatch(startRegisterWithEmailPasswordName(email, password, name));
        }

        console.log(name, email, password, confirm);
    };

    const isFormValid = () => {
        if (name.trim().length === 0) {
            dispatch(setError("Name is required"));
            return false;
        } else if (!validator.isEmail(email)) {
            dispatch(setError("Email is not valid"));
            return false;
        } else if (password !== confirm || password.length < 5) {
            dispatch(
                setError(
                    "Password should be at least 6 characters and match each other"
                )
            );
            return false;
        }

        dispatch(removeError());
        return true;
    };

    return (
        <>
            <h3 className="auth__title">Login</h3>

            <form
                onSubmit={handleRegister}
                className="animate__animated animate__fadeIn animate__faster"
            >
                {/* Solo muestra el error si msgError no es null */}
                {msgError && (
                    <div className="auth__alert-error">{msgError}</div>
                )}

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
