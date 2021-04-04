import {useState} from "react";

export const useForm = (initialState = {}) => {
    const [values, setvalues] = useState(initialState);

    // Si no se envía el newFormState lo establece en initialState
    const reset = (newFormState = initialState) => {
        setvalues(initialState);
    };

    // Desestructuro target del event
    const handleInputChange = ({target}) => {
        setvalues({
            ...values,
            // Le pone el nombre del input recibido (atributo name) y le asigna el valor cargado
            [target.name]: target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values);
    };

    const functions = {
        handleInputChange,
        handleSubmit,
        reset
    };

    // Retorna el estado y las funciones para manejarlas en otros componentes
    return [values, functions];
};
