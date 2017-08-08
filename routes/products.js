const
  express = require('express'),
  productsRouter = new express.Router()
  productsCtrl = require('../controllers/products.js')

// productsRouter.route('/')
//   .get(productsCtrl.index)
//   .post(productsCtrl.create)
//
// productsRouter.route('/:id')
//   .get(productsCtrl.show)
//   .patch(productsCtrl.update)
//   .delete(productsCtrl.destroy)

module.exports = productsRouter
