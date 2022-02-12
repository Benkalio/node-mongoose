const mongoose = require('mongoose');

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log("Connect correctly to server.");

    Dishes.create({
        name: "Cornrose",
        description: "Test"
    })
    .then((dish) => {
        console.log(dish);

        return Dishes.findByIdAndUpdate(dish._id, {
            $set: { description: "Update test"}
        }, {
            new: true
        }).exec();
    })
    .then((dish) => {
        console.log(dish);

        dish.comments.push({
            rating: 5,
            comment: 'I\'m getting a sinking feeling!',
            author: 'Toby Maguire'
        });

        return dish.save();
    })
    .then((dish) => {
        console.log(dish);
    
        return Dishes.deleteOne({});
    })
    .then(() => {
        console.log('Shutting connection');
        return mongoose.connection.close();
    })
    .catch((err) => console.log(err));
});