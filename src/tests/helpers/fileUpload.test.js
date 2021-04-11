import cloudinary from "cloudinary";

import {fileUpload} from "../../helpers/fileUpload";

cloudinary.config({
    cloud_name: "raulrobi",
    api_key: "792327923169299",
    api_secret: "ojYLsgNz3dTsbQd8TnRfZ-UCWGM"
});

describe("Testing fileUpload", () => {
    // Al pasarle el done estamos diciendo que no se ejecute el test hasta que se llame
    // al done, el cual es llamado al borrar la imagen
    test("should upload a file and return the url", async () => {
        const resp = await fetch(
            "https://19yw4b240vb03ws8qm25h366-wpengine.netdna-ssl.com/wp-content/uploads/10-Free-To-Use-CORS-Proxies-1024x768.png"
        );
        const blob = await resp.blob();

        const file = new File([blob], "foto.jpg");
        const url = await fileUpload(file);

        expect(typeof url).toBe("string");

        //Extrae el id de la imgen asignado por cloudinary para borrar la imagen
        const segments = url.split("/");
        const imageId = segments[segments.length - 1].replace(".png", "");

        await cloudinary.v2.api.delete_resources(imageId, {}, () => {
            // done();
        });
    });

    test("should return an error", async () => {
        const file = new File([], "foto.jpg");
        const url = await fileUpload(file);

        expect(url).toBe(null);
    });
});
