//import dependencies
//instead of importing the entire mongoose library, 
//only import schema constructor and model function
const { Schema, model } = require('mongoose');

//import function to format date
const dateFormat = require('../utils/dateFormat')


//schema for model
const PizzaSchema = new Schema(
    {
        pizzaName: {
            type: String
        },
        createdBy: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal) //dateFormat is the function connected with a getter
        },
        size: {
            type: String,
            default: 'Large'
        },
        toppings: [], //indicates an array as data type
        comments: [
            {
                //tell mongoose to expect ObjectId and that the data comes from Comment Model.
                type: Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ]
    },
    {
        //inform model it can use virtuals(true)
        //inform model it can use getters(true)
        // id to false as this is a virtual and we don't need it
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

//virtual property
//care only about comment count in respect to pizzas
// get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function() {
    return this.comments.length;
  });

// create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

//export the Pizza model
module.exports = Pizza;