// const Product = require('../models/Product.js')
//
// module.exports = {
//   index: (req, res) => {
//     Product.find({}, '-description -documentationUrl', (err, products) => {
//       if(err) return handleError(res)
//       res.json({success: true, products})
//     })
//   },
//
//   show: (req, res) => {
//     Product.findById(req.params.id, (err, product) => {
//       if(err) return handleError(res)
//       res.json({success: true, product})
//     })
//   },
//
//   create: (req, res) => {
//     Product.create(req.body, (err, product) => {
//       if(err) return handleError(res)
//       res.json({success: true, message: "Product created.", product})
//     })
//   },
//
//   update: (req, res) => {
//     Product.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, product) => {
//       if(err) return handleError(res)
//       res.json({success: true, message: "Product updated.", product})
//     })
//   },
//
//   destroy: (req, res) => {
//     Product.findByIdAndRemove(req.params.id, (err, product) => {
//       if(err) return handleError(res)
//       res.json({success: true, message: "Product deleted.", product})
//     })
//   }
// }
//
// function handleError(res) {
//   return res.json({success: false, message: "There was a problem..."})
// }
