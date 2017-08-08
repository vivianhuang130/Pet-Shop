const
mongoose = require('mongoose'),
carSchema = new mongoose.Schema({
  make: {type: String, required: true},
  model: {type: String, required: true},
  year: Number,
  new: {type: Boolean, default: true}
}, {timestamps: true})

const Car = mongoose.model('Car', carSchema)

// Car.create({make: 'Honda', model:'Civic', year: 2016}, function(err, car){
//   if(err) return console.log(err) //if problem stop right there console log err
//   console.log(car);
// })



module.exports = Car
