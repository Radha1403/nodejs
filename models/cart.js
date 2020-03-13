const fs = require("fs");
const path = require("path");
const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);
const getCartFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else if (fileContent.length > 0) {
      cb(JSON.parse(fileContent));
    } else {
      cb([]);
    }
  });
};
module.exports = class Cart {
  static addProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err && fileContent.length > 0) {
        cart = JSON.parse(fileContent);
      } else if (fileContent.length > 0) {
        cart = JSON.parse(fileContent);
      }
      const exisitingProductIndex = cart.products.findIndex(
        prod => prod.id === id
      );
      const exisitingProduct = cart.products[exisitingProductIndex];
      let updatedProduct;
      if (exisitingProduct) {
        updatedProduct = { ...exisitingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[exisitingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = parseFloat(cart.totalPrice) + parseFloat(productPrice);
      fs.writeFile(p, JSON.stringify(cart), err => {
        if (err) console.log(err);
      });
    });
  }

  static getProducts(cb) {
    getCartFromFile(cb);
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return;
      }
      const cart = JSON.parse(fileContent);
      const updatedCart = { ...cart };
      const product = updatedCart.products.find(prod => prod.id === id);
      const productQnty = product.qty;
      updatedCart.products = updatedCart.products.filter(prod => prod.id != id);
      updatedCart.totalPrice =
        updatedCart.totalPrice - productPrice * productQnty;
      fs.writeFile(p, JSON.stringify(updatedCart), err => {
        if (err) console.log(err);
      });
    });
  }
};
