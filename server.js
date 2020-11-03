const http = require("http");
const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
} = require("./controllers/ProductController");
 
const PORT = process.env.PORT || 3000;

const server = http.createServer((request, response) => {
    if (request.url === "/api/products" && request.method === "GET") {
        
        getProducts(request, response);
    } else if (request.url.match(/\/api\/products\/([0-9]+)/) && request.method === "GET") {
        const id = Number(request.url.split("/")[3]);

        getProduct(request, response, id);
    } else if (request.url === "/api/products" && request.method === "POST") {

        createProduct(request, response);
    } else if (request.url.match(/\/api\/products\/([0-9]+)/) && request.method === "PUT") {
        const id = Number(request.url.split("/")[3]);

        updateProduct(request, response, id);
    } else if (request.url.match(/\/api\/products\/([0-9]+)/) && request.method === "DELETE") {
        const id = Number(request.url.split("/")[3]);

        deleteProduct(request, response, id);
    }else {
        response.writeHead(404, {
            "Content-Type": "application/json"
        });
        response.end(JSON.stringify({
            message: "Not Found"
        }));
    }
});

server.listen(PORT, () => console.log(`Server runnin' on ${PORT}`));