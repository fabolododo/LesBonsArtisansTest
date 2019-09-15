var ProductData = require('../Products');
var _id = 4;

function listProducts(req, res) {
    
    res.send(ProductData)
}

function productDetails(req, res) {
    let elem = ProductData.find((element) => element._id === parseInt(req.params.id));
        if(!elem) {
            res.status(400).json({
                text: "Invalid Request"
            });
        } else {
            res.send(elem);
        }
}

function addProduct(req, res) {
    
    const { name, type, price, rating, warranty_years, available } = req.body
    if ( !name || !type || !price || !rating || !warranty_years || !available){
        return res.status(400).json({
            text: "Invalid Request"
        });
    }
    _id += 1;

    const newProduct = { _id, name, price, type, rating, warranty_years, available };

    ProductData.push(newProduct);
    res.send(ProductData);
}

function updateProduct(req, res) {
    
    let elem = ProductData.find((element) => element._id === parseInt(req.params.id));
    
    if (elem) {
        for (let property in elem) {
            if (req.body[property] !== undefined){
                elem[property] = req.body[property];
            }
        }
        res.send(elem);
    } else {
        res.status(400).json({
            text: "Invalid Request"
        });
    } 

}

function deleteProduct(req, res) {

    // let elem = ProductData.filter((element) => element._id !== parseInt(req.params.id))

    let index = ProductData.findIndex((element) => element._id === parseInt(req.params.id));

    if (index !== -1){
        let result = ProductData.splice(index, 1);
        res.send(result);
    
    // console.log("elem", elem);
    
    // if (elem) {
        // ProductData.splice(0, elem);
        // res.send(elem);
    } else {
        res.status(400).json({
            text: "Invalid Request"
        });
    }
}



exports.listProducts = listProducts;
exports.productDetails = productDetails;
exports.addProduct = addProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct