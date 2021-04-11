import {fileUpload} from "../../helpers/fileUpload";

describe("Testing fileUpload", () => {
    test("should upload a file and return the url", async () => {
        const resp = await fetch(
            "https://19yw4b240vb03ws8qm25h366-wpengine.netdna-ssl.com/wp-content/uploads/10-Free-To-Use-CORS-Proxies-1024x768.png"
        );
        const blob = await resp.blob();

        const file = new File([blob], "foto.jpg");
        const url = await fileUpload(file);

        expect(typeof url).toBe("string");
    });

    test("should return an error", async () => {
        const file = new File([], "foto.jpg");
        const url = await fileUpload(file);

        expect(url).toBe(null);
    });
});
