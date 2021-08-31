const { Pizza } = require('../models');

const pizzaController = {
  //get all pizzas
  getAllPizza(req,res){
    Pizza.find({})
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
  },

  //get one pizza by id
  getPizzaById({params}, res) {
    Pizza.findOne({ _id: params.id })
        .then(dbPizzaData => {
            // If no pizza is found, send 404
            if(!dbPizzaData){
                res.status(404).json({message: 'No pizza found with this id!'})
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
  },

  //createPizza
  //destructure the body out of the Express.js req object as the other data isn't needed
  createPizza({ body }, res){
    Pizza.create(body)
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => res.status(400).json(err));
  },

  //update pizza by id
  //findOneandUpdate:finds a single document to be updated,
  //updates it and returns the updated document
  //new:false will return origin document
  //new:true will return new version of document
  updatePizza({ params, body }, res){
    Pizza.findOneAndUpdate({ _id: params.id }, body, {new: true })
        .then(dbPizzaData => {
            if(!dbPizzaData){
                res.status(404).json({message: 'No pizza found with this id!' });
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.status(400).json(err));
  },

  //delete Pizza
  //findOneAndDelet finds the document to be returned and delete it from the database
  deletePizza({ params }, res) {
    Pizza.findOneAndDelete({ _id: params.id })
        .then(dbPizzaData => {
            if(!dbPizzaData) {
                res.status(404).json({ message: 'No pizza found with this id!' });
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.status(400).json(err));
  }

};

module.exports = pizzaController;