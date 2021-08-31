//import dependencies
//instead of importing the entire mongoose library, 
//only import schema constructor and model function
const { Schema, model } = require('mongoose');


//schema for model
const PizzaSchema = new Schema({
    pizzaName: {
        type: String
    },
    createdBy: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    size: {
        type: String,
        default: 'Large'
    },
    toppings: [] //indicates an array as data type
});

// create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

//export the Pizza model
module.exports = Pizza;