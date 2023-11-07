const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const User = require('./Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({dest: 'uploads/'})
const fs = require('fs');
const Post = require('./Models/Post');
require('dotenv').config();

const port = process.env.PORT || 4000;
const app = express();

const secretKey = '$2b$10$oJ7sla9U5vUp.AXxNyOmHu';
const salt = bcrypt.genSaltSync(10);
// console.log("Salt: ", salt);

app.use(cors({credentials:true, origin: 'https://6549e0b71882d05769054c83--fastidious-granita-7fe395.netlify.app'}));
app.use(express.json())
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
    next();
});

// mongoose.connect('mongodb+srv://etcetera:Lakshya3120@cluster0.g3uuv0x.mongodb.net/?retryWrites=true&w=majority').then(  () => console.log("DB connected!")).catch(err => console.log(err));

mongoose.connect(process.env.DATABASE);

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
            res.cookie('token', token).json({
                id: userData._id,
                username,
            });
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

app.post('/post', uploadMiddleware.single('file') ,async (req, res) => {
    // res.json(req.body)
    const {originalname, path} = req.file;
    // res.json(req.body);
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);

    const {token} = req.cookies;

    jwt.verify(token, secretKey, {}, async (err, info) => {
        if(err) throw err;

        const {title, summary, content}= req.body;
        const postRes = await Post.create({
            title,
            summary,
            content,
            cover:newPath,
            author: info.id,
        });

        res.json(postRes);
        // res.json(info);
    })
})

app.put('/post', uploadMiddleware.single('file'),async(req, res) => {
    // if(req.file){
        // res.json(req.file);
    // }

    let newPath = null;

    if(req.file){
        const {originalname, path} = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length-1];
        newPath = path+'.'+ext;
        fs.renameSync(path, newPath);
    }

    const {token} = req.cookies;

    jwt.verify(token, secretKey, {}, async (err, info) => {
        if(err) throw err;

        const {id, title, summary, content}= req.body;
        const postData = await Post.findById(id);
        const isAuthor = JSON.stringify(postData.author) === JSON.stringify(info.id);
        // res.json(isAuthor);

        if(!isAuthor){
            return res.status(400).json("You can not update this post!");
        }

        await postData.updateOne({
            title,
            summary,
            content,
            cover: newPath ? newPath : postData.cover,
        })

        res.json(postData);
    })
    
})

app.get('/posts', async (req, res) => {

    const posts = await Post.find().populate('author', ['username']).sort({createdAt: -1}).limit(5);
    res.json(posts);
});

app.get('/posts/:id', async (req, res) => {
    const {id} = req.params;
    const postInfo = await Post.findById(id).populate('author', ['username']);
    res.json(postInfo);
})

app.delete('/posts/:id', async (req, res) => {

    // res.json("DELETE CALLED");

    const {token} = req.cookies;

    jwt.verify(token, secretKey, {}, async (err, info) => {
        if(err) throw err;

        const {id}= req.params;
        const postData = await Post.findById(id);
        // console.log(id);
        // res.json(postData);
        const isAuthor = JSON.stringify(postData.author) === JSON.stringify(info.id);
        // res.json(isAuthor);

        if(!isAuthor){
            return res.status(400).json("You can not update this post!");
        }

        await postData.deleteOne({});

        res.json('ok');
    })

    // const {id} = req.params;
    // const postData = await Post.findById(id);

    // const isAuthor = JSON.stringify(req.body.is) === JSON.stringify(postData.author);

    // if(isAuthor){
    //     res.json("SAME AUTHOR");
    // }
    // res.json("DIFFERENT AUTHOR");

    // res.json(req.body);

})

app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok');
})

app.listen(port);

// mongodb+srv://etcetera:Lakshya3120@cluster0.g3uuv0x.mongodb.net/?retryWrites=true&w=majority