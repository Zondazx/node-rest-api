const Product = require("../models/ProductModel");
const {
    getPostData
} = require("../utils");

/**
 * 
 * @param {*} request 
 * @param {*} response 
 * @desc Gets all products
 * @route GET /api/products
 */
async function getProducts(request, response) {
    try {
        const products = await Product.findAll();

        response.writeHead(200, {
            "Content-Type": "application/json"
        });
        response.end(JSON.stringify(products));
    } catch (error) {
        console.log(error);
    }
}

/**
 * 
 * @param {*} request 
 * @param {*} response 
 * @param {*} id of the requested product
 * @desc Gets the requested product
 * @route GET /api/products/:id
 */
async function getProduct(request, response, id) {
    try {
        const product = await Product.findById(id);

        if (!product) {
            response.writeHead(404, {
                "Content-Type": "application/json"
            });
            response.end(JSON.stringify({
                message: "Product Not Found"
            }));
        } else {
            response.writeHead(200, {
                "Content-Type": "application/json"
            });
            response.end(JSON.stringify(product));
        }
    } catch (error) {
        console.log(error);
    }
}

/**
 * 
 * @param {*} request 
 * @param {*} resolve
 * @desc Creates a Product
 * @route POST /api/products
 */
async function createProduct(request, response) {
    try {

        const body = await getPostData(request);

        const {
            name,
            description,
            price
        } = JSON.parse(body);

        const product = {
            name,
            description,
            price
        };

        const newProduct = await Product.create(product);

        response.writeHead(201, {
            "Content-Type": "application/json"
        });

        return response.end(JSON.stringify(newProduct));
    } catch (error) {
        console.log(error);
    }
}

/**
 * 
 * @param {*} request 
 * @param {*} response 
 * @desc Updates a Product
 * @route PUT /api/products/:id
 */
async function updateProduct(request, response, id) {
    try {

        const product = await Product.findById(id);

        if (!product) {
            response.writeHead(404, {
                "Content-Type": "application/json"
            });
            response.end(JSON.stringify({
                message: "Product Not Found"
            }));
        } else {
            const body = await getPostData(request);

            const {
                name,
                description,
                price
            } = JSON.parse(body);

            const productData = {
                name: name || product.name,
                description: description || product.description,
                price: price || product.price
            };

            const updatedProduct = await Product.update(id, productData);

            response.writeHead(200, {
                "Content-Type": "application/json"
            });

            return response.end(JSON.stringify(updatedProduct));
        }
    } catch (error) {
        console.log(error);
    }
}

/**
 * 
 * @param {*} request 
 * @param {*} response 
 * @param {*} id of the requested product
 * @desc Deletes the requested product
 * @route DELETE /api/products/:id
 */
async function deleteProduct(request, response, id) {
    try {
        const product = await Product.findById(id);

        if (!product) {
            response.writeHead(404, {
                "Content-Type": "application/json"
            });
            response.end(JSON.stringify({
                message: "Product Not Found"
            }));
        } else {
            
            await Product.remove(id);

            response.writeHead(200, {
                "Content-Type": "application/json"
            });
            response.end(JSON.stringify({ message: `Product ${id} removed.`}));
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};