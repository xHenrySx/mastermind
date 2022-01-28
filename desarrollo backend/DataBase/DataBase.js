
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://elias:elias@cluster0.zrvrq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', 
    {useNewUrlParser: true, useUnifiedTopology: true}).then(console.log("MongoDb connected"));

