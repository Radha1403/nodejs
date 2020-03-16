const Product = require("../models/product");
const Cart = require("../models/cart");
const CartItem = require("../models/cart-item");
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
  req.user.getCart().then(cart => {
    cart
      .getProducts()
      .then(products => {
        console.log(products);
        res.render("shop/cart", {
          docTitle: "Your Cart",
          path: req.path,
          products: products
        });
      })
      .catch(err => console.log(err));
  });
};

exports.postCart = (req, res, next) => {
  const prodtId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then(cart => {
      if (cart) return cart;
      else {
        return req.user.createCart();
      }
    })
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodtId } });
    })
    .then(products => {
      let product;
      if (products.length > 0) product = products[0];

      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(prodtId);
    })
    .then(data => {
      return fetchedCart.addProduct(data, {
        through: { quantity: newQuantity }
      });
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  req.user
    .getCart()
    .then(cart => {
      return cart.getProducts({ where: { id: productId } });
    })
    .then(products => {
      const product = products[0];
      return product.cartItem.destroy();
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch(err => console.log(err));
};

exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user
    .getCart()
    .then(cart => {
      if (cart) return cart;
      else return req.user.createCart();
    })
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then(products => {
      return req.user
        .createOrder()
        .then(order => {
          return order.addProducts(
            products.map(product => {
              product.orderItem = { quantity: product.cartItem.quantity };
              return product;
            })
          );
        })
        .then(() => {
          fetchedCart.setProducts(null);
        })
        .then(() => {
          res.redirect("/orders");
        });
    });
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders({ include: ["products"] })
    .then(orders => {
      res.render("shop/Orders", {
        docTitle: "Orders",
        path: req.path,
        orders: orders
      });
    })
    .catch(err => console.log(err));
};
