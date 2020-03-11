const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render("shop/product-list", {
      prods: products,
      docTitle: "All Products",
      path: req.path,
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render("shop/index", {
      prods: products,
      docTitle: "Shop",
      path: req.path
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render("shop/cart", {
    docTitle: "Your Cart",
    path: req.path
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    docTitle: "Checkout",
    path: req.path
  });
};
