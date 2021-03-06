const express=require('express');
const app=express();
const mongoose=require('mongoose')
const config=require('./config')

const bodyParser=require('body-parser')

const cors=require('cors')

app.use(
    bodyParser.urlencoded({
      extended: false,
    })
  );
  app.use(bodyParser.json());
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});
  // app.use(cors())
  
app.use('/route',require('./controllers/userController'))

mongoose.connect(config.DB_URI,{ useNewUrlParser: true , useUnifiedTopology: true });
mongoose.connection.on('error',function(err){
    console.log("Database connection Error");
    console.log(err);
})
mongoose.connection.on('open',function(){
        console.log("Database connection open success");
})

app.listen(5000,function(){
    console.log("App is listening on port 5000")
})
