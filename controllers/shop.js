const Product = require("../models/product");
const Cart = require("../models/cart");
exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render("shop/product-list", {
        prods: products,
        docTitle: "All Products",
        path: req.path
      });
    })
    .catch(err => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findByPk(prodId)
    .then(p => {
      res.render("shop/product-detail", {
        product: p,
        docTitle: p.title,
        path: "/products"
      });
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then(data => {
      res.render("shop/index", {
        prods: data,
        docTitle: "Shop",
        path: req.path
      });
    })
    .catch(err => console.log(err));
};

exports.getCart = (req, res, next) => {
  Cart.getProducts(cart => {
    Product.findAll()
      .then(products => {
        const cartProducts = [];
        for (product of products) {
          const cartProductData = cart.products.find(
            prod => prod.id === product.id
          );
          if (cartProductData) {
            cartProducts.push({
              productData: product,
              qty: cartProductData.qty
            });
          }
        }
        res.render("shop/cart", {
          docTitle: "Your Cart",
          path: req.path,
          products: cartProducts
        });
      })
      .catch(err => console.log(err));
  });
};

exports.postCart = (req, res, next) => {
  const prodtId = req.body.productId;
  const prodPrice = req.body.price;
  Cart.addProduct(prodtId, prodPrice);
  res.redirect("/cart");
};

exports.getOrders = (req, res, next) => {
  res.render("shop/Orders", {
    docTitle: "Orders",
    path: req.path
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    docTitle: "Checkout",
    path: req.path
  });
};

exports.postDeleteProduct = (req, res, next) => {
  const id = req.body.productId;
  const productPrice = req.body.productPrice;
  Cart.deleteProduct(id, productPrice);
  res.redirect("/cart");
};
