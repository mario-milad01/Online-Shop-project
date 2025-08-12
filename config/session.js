const expressSession = require('express-session');
const mongodbStore= require ('connect-mongodb-session');
const database = require('../data/database');

function createSessionStore(){
  const MongoDBStore =  mongodbStore(expressSession);

  const store= new MongoDBStore({
    secret: process.env.SESSION_SECRET,
    uri:'mongodb://localhost:27017',
    databaseName:'online-shop',
    collection:'sessions'
  });

  return store;
}
function createSessionConfig(){
    return{
        secret:'super-secret',
        resave:false,
        saveUninitialized:false,
        store: createSessionStore(),
        cookie:{
            maxAge: 2*24*60*60*1000
        }
    };
}

module.exports = createSessionConfig;