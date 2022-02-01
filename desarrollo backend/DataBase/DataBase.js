<<<<<<< HEAD

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://elias:elias@cluster0.zrvrq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', 
    {useNewUrlParser: true, useUnifiedTopology: true}).then(console.log("MongoDb connected"));
=======
const mongoose = require('mongoose');
let password = 'admin';
let databaseName = 'db';
if (process.env.NODE_ENV === 'test') {
    databaseName = 'testdb';
}

mongoose.connect(``, 
    {useNewUrlParser: true, useUnifiedTopology: true});
>>>>>>> 392c301d7cf1955a5d5151839bdf18269bb81178

