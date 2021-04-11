export const fileUpload = async (file) => {
    const cloudUrl = "https://api.cloudinary.com/v1_1/raulrobi/upload";

    //Creamos el objeto javascript con la información requerida por la api de cloudinary
    const formData = new FormData();
    formData.append("upload_preset", "react-journal-app");
    formData.append("file", file);

    try {
        //La api requiere una petición post
        const resp = await fetch(cloudUrl, {
            method: "POST",
            body: formData
        });

        if (resp.ok) {
            const cloudResp = await resp.json();
            return cloudResp.secure_url;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
};
