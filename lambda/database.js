const mongoose = require("mongoose");

// US_Region : mongodb+srv://devuser:Ws0Si7fENElQ0ljJ@cluster0.cvyvxco.mongodb.net/watthub_dev
// Mumbai_Region : mongodb+srv://devuser:Watthub2023@cluster0.k0nvanc.mongodb.net/watthub_dev

function connect() {
    // mongoose.connect("",
    mongoose.connect("mongodb+srv://devuser:Watthub2023@cluster0.k0nvanc.mongodb.net/watthub_dev",
        {
            serverSelectionTimeoutMS: 5000,
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
        .then(() => {
            console.log('Success: Database connected');
        }).catch((err) => {
            console.log(err);
            console.log("Error: connecting to database")
        });
}

module.exports.connect = connect