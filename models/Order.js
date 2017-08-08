const
mongoose = require('mongoose'),
orderSchema = new mongoose.Schema({
  // totalPrice: {type: Number},
  // purchaseDate: {type: Number},
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product' //name of Product model
  }]
}, {timestamps: true}) //add created at and updated at to every order

orderSchema.virtual('totalPrice').get(function() {
  var total = 0
  this.products.forEach(function(product) {
    total += product.price
  })

  return total
})



const Order = mongoose.model('Order', orderSchema)
module.exports = Order

// Order.findById('5988bd1d60bde8913f752959').populate('products').exec((err, order) => {
//   console.log(order.totalPrice)
// })

console.log();
