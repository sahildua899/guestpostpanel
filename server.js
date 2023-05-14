require('dotenv').config();
const path = require('path')
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8800;
require('./src/db/conn');
const hbs = require('hbs');
const Users = require('./src/models/user.model');
const Guests = require('./src/models/table.model')
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, "/public")))
const viewPath = path.join(__dirname, "./templates/views");
app.set("view engine", "hbs");
app.set('views', viewPath);

app.get('/', (req,res)=>{
    res.redirect('login')
})

app.get('/login', (req,res)=>{
    res.render('login')
})

app.post('/login', async(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const userEmail = await Users.findOne({username:username})
    if(userEmail){
        if(password === userEmail.password) {
            res.status(200).redirect('tabledata')
        }else {
            res.status(400).send('Invalid Login Details')
        }
    }else {
        res.status(400).send('User not found')
    }
   
})



app.post('/api/register',async(req,res) => {
    const UserData = {
        firstname:req.body.firstName,
        lastname:req.body.lastName,
        email:req.body.email,
        phone:req.body.email,
        username:req.body.username,
        password:req.body.password
    } 
    const registerUser = new Users(UserData);
        const registered = await registerUser.save();
        console.log(registered)
        res.redirect('../login')
    
})
app.get('/addnewuser', (req,res)=>{
    res.render('register')
})

app.get('/adddata', (req,res)=>{
    res.render('tablepost')
})

app.post('/api/tablepost', async(req,res)=>{
    const tableData = {
        name:req.body.name,
        clientemail:req.body.email,
        publishedlink:req.body.publink,
        publisheddate:req.body.pubdate,
        expirydate:req.body.expdate,
        price:req.body.price
    }
    const dataToAdd = new Guests(tableData);
    const addedData = await dataToAdd.save()
    res.redirect('../tabledata')
})

app.get('/tabledata', async(req,res)=>{
    const dataTable = await Guests.find();
    res.render('tablepage', {details:dataTable})
})

app.get('/tablepost', (req,res)=>{
    res.render('tablepost')
})

app.listen(PORT, ()=>{
    console.log(`listening to port ${PORT}`)
})