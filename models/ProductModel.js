const products = require("../data/products");
const { writeDataToFile } = require("../utils");

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(products);
    });
}

function findById(id) {
    return new Promise((resolve, reject) => {
        const product = products.find(p => p.id === id);

        resolve(product);
    });
}

function create(product) {
    return new Promise((resolve, reject) => {
        const lastID = products[products.length - 1].id;
        const newProductID = lastID + 1;

        // uuidv4() can be used instead of newProductID
        const newProduct = {
            id: newProductID,
            ...product
        };

        products.push(newProduct);
        writeDataToFile("./data/products.json", products);

        resolve(newProduct);
    });
}

module.exports = {
    findAll,
    findById,
    create
};