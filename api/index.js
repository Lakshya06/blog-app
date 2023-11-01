const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const User = require('./Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();

const secretKey = '$2b$10$oJ7sla9U5vUp.AXxNyOmHu';
const salt = bcrypt.genSaltSync(10);
// console.log("Salt: ", salt);

app.use(cors({credentials:true, origin: 'http://localhost:3000'}));
app.use(express.json())
app.use(cookieParser());

// mongoose.connect('mongodb+srv://etcetera:Lakshya3120@cluster0.g3uuv0x.mongodb.net/?retryWrites=true&w=majority').then(  () => console.log("DB connected!")).catch(err => console.log(err));

mongoose.connect('mongodb://0.0.0.0:27017/blog-app');

app.post('/register', async (req, res) => {
    const {username, password} = req.body;
    // const hashedPass = bcrypt.hashSync(password, salt);
    // console.log(hashedPass);
    try{
        const UserDoc = await User.create({
            username,
            password:bcrypt.hashSync(password, salt)});
            // hashedPass});
            // password
        res.json(UserDoc);
    }
    catch(e){
        console.log(e);
        res.status(400).json(e);
    }
}
);

app.post('/login', async (req, res) => {
    const{username, password} = req.body;
    const userData = await User.findOne({username});
    const login = bcrypt.compareSync(password, userData.password);
    // res.json(login);
    if(login){
        // logged In
        jwt.sign({username, id: userData._id}, secretKey, {}, (err, token) => {
            if(err){
                throw err;
            }
            // console.log("Logged In");
            res.cookie('token', token).json('ok');
        })
    }
    else{
        res.status(400).json("Wrong Credentials");
    }
})

app.get('/profile', (req, res) => {
    const {token} = req.cookies;
    jwt.verify(token, secretKey, {}, (err, info) => {
        if(err) throw err;
        res.json(info);
    })
    // res.json(req.cookies);
})

app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok');
})

app.listen(4000);

// mongodb+srv://etcetera:Lakshya3120@cluster0.g3uuv0x.mongodb.net/?retryWrites=true&w=majority