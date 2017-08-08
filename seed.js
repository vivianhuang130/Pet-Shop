// const
//   mongoose = require('mongoose'),
//   Product = require('./models/Product'),
//   mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/ecommerce'
//
// mongoose.Promise = global.Promise
//
// const products = [
//   {
//     name: "Peonies",
//     description: "A herbaceous or shrubby plant of north temperate regions, which has long been cultivated for its showy flowers.",
//     logoUrl: "http://img1.sunset.timeinc.net/sites/default/files/image/2016/06/main/lady-orchid-peony-0410.jpg",
//     price: 15
//   },
//   {
//     name: "",
//     description: "",
//     logoUrl: "",
//     price: ""
//   },  {
//       name: "",
//       description: "",
//       logoUrl: "",
//       price: ""
//     }
// ]
//
// mongoose.connect(mongoUrl, (err) => {
//   if(err) return console.log(err)
//   console.log("Connected MongoDB.")
//   console.log("Clearing products from database...")
//   Product.remove({}, (err) => {
//     if(err) return console.log(err)
//     console.log("Products cleared from database...")
//     console.log("Seeding database...")
//     Product.insertMany(products, (err, result) => {
//       if(err) return console.log(err)
//       console.log("Database seeded...")
//       console.log("Disconnecting...")
//       mongoose.disconnect()
//     })
//   })
// })
