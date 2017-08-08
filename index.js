const
  // dotenv tries to load a .env file's variables and adds them to process.env
  // with {silent: true}, no error will be thrown if .env does not exist:
  dotenv = require('dotenv').load({silent: true}),
  express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/ecommerce',
  port = process.env.PORT || 3001,
  jwt = require('jsonwebtoken'),
  cors = require('cors'),

  User = require('./models/User.js'),
  Product = require('./models/Product.js'),
  Order = require('./models/Order.js'),
  productsRoutes = require('./routes/products')

  mongoose.connect(mongoUrl, (err) => {
  console.log(err || "Connected to MongoDB.")
})

app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json())


app.get('/', (req, res) => {
  res.json({message: "API root."})
})

app.route('/api/users')
  .get((req, res) => {
    User.find({}, (err, users) => {
      res.json(users)
    })
  })
  .post((req, res) => {
    User.create(req.body, (err, user) => {
      res.json({success: true, message: "User created.", user})
    })
  })

app.route('/api/users/:id')
  .get((req, res) => {
    User.findById(req.params.id, (err, user) => {
      res.json(user)
    })
  })
  .patch((req, res) => {
    // Instead of using User.findByIdAndUpdate(), we'll use User.findById()
    User.findById(req.params.id, (err, user) => {
      // and update manually here by merging the request body ({name, email, and/or password}) into the user we found by ID.
      Object.assign(user, req.body)

      // then we save here, which triggers the mongoose middleware in our User model
      // so that in case the user is changing their password, the new password gets hashed before
      // saving to the database (see User model, in userSchema.pre('save')...):
      user.save((err, updatedUser) => {
        res.json({success: true, message: "User updated.", user: updatedUser})
      })
    })
  })

// the Log In route:
app.post('/api/authenticate', (req, res) => {
  // first, find user by the email in the request body.
  // When retrieving the user from database, include the password for authentication:
  User.findOne({email: req.body.email}, '+password', (err, user) => {
    // if there's no user found, or they put a wrong password:
    if(!user || (user && !user.validPassword(req.body.password))) {
      // stop here and let the client know that the info is incorrect:
      return res.json({success: false, message: "Incorrect email or password."})
    }
    // otherwise, use mongoose document's toObject() method to get a stripped down version of
    // just the user's data (name, email etc) as a simple object:
    const userData = user.toObject()

    // remove the password from this object before creating the token:
    delete userData.password

    // create the token, embedding the user's info in the payload of the token:
    const token = jwt.sign(userData, process.env.SECRET)

    // send the token back to the client in our response:
    res.json({success: true, message: "Logged in successfully.", token})
  })
})

// any routes declared after this middleware must include a valid token in order access:
app.use(verifyToken) // (see the verifyToken() function below...)

app.get('/protected', (req, res) => {
  console.log("Current user:")
  console.log(req.user)
  res.json({message: "You are in the VIP."})
})

// this function is used as middleware to restrict access.
// client must include a token in their request(s) to proceed
function verifyToken(req, res, next) {
  // try to find a token in the request's headers:
  const token = req.headers['token']
  // if the token exists
  if(token) {
    // verify the token's authenticity:
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      // if there's a problem verifying:
      if(err) return res.json({success: false, message: "Token could not be verified."})
      // otherwise, we can get the user's info from the decoded token
      // and make it available from the req object:
      req.user = decoded

      // proceed to the originally requested route:
      next()
    })
  } else { // if token is NOT provided in the request headers:
    res.json({success: false, message: "No token provided. Access denied."})
  }
}

///// PRODUCTS //////
// get all products
  app.get('/api/products', (req, res) => {
    Product.find({}, (err, products) => {
      if (err) return console.log(err)
      res.json(products)
    })
  })

  // post a new products
app.post('/api/products', (req, res) => {
	Product.create(req.body, (err, product) => {
		if(err) return console.log(err)
		res.json(product)
	})
})

  // get a specific product
  app.get('/api/products/:id', (req, res) => {
    Product.findById(req.params.id, (err, specificProduct) => {
      if (err) return console.log(err)
      res.json(specificProduct)
    })
  })

  // destroy a product
app.delete('/api/products/:id', function(req,res){
  Product.findByIdAndRemove(req.params.id, function(err, deletedProduct){
    if(err) return console.log(err)
    res.json({message: "Product deleted...", product: deletedProduct})

  })
})


//// ORDERS /////
// index all orders
app.get('/api/orders', (req, res) => {
  Order.find({}, (err, orders) => {
    if (err) return console.log(err) //if
    res.json(orders) //else
  })
})

// create an order
app.post('/api/orders', (req, res) => {
	Order.create(req.body, (err, order) => {
		if(err) return console.log(err)
		res.json(order)
	})
})

// get a specific order
app.post('/api/orders/:id/products', (req, res) => {
  Order.findById(req.params.id, (err, order) => {
    var newProduct = new Product(req.body)
    newProduct._by = order._id

    newProduct.save((err) => {
      if (err) return console.log(err)
      order.products.push(newProduct)
      order.save((err, order) => { //order got saved
        res.json(newProduct)
      })
    })
  })
})



/////

app.listen(port, (err) => {
  console.log(err || `Server running on ${port}.`)
})
