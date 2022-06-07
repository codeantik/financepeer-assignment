const express = require('express');
const cors = require('cors');
const yup = require('yup');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Auth = require('./models/auth.model');
const User = require('./models/user.model');
const { v4: uuidv4 } = require('uuid');
const { json } = require('express');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 5000;

// mongoose connection

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

    }).then(() => {
        console.log('MongoDB connected');
    }
    ).catch(err => {
        console.log(err);
    });


// middlewares

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));


app.get('/', (req, res) => {
    res.send('server is running');
});


// routes


// @register

app.post('/register', async (req, res) => {

    const schema = yup.object().shape({
        username: yup.string().min(3).required(),
        email: yup.string().email().required(),
        password: yup.string().min(6).required(),
    });

    console.log(await schema.isValid(req.body));

    if (!(await schema.isValid(req.body))) {
        return res.status(400).send('invalid data');
    }

    const { username, email, password: plainTextPassword } = req.body;

    if(await Auth.findOne({ email })) {
        return res.status(400).json({
            message: 'Email already exists'
        });
    }

    const password = await bcrypt.hash(plainTextPassword, 10);

    try {
        const response = Auth.create({
            username,
            email,
            password
        });

        res.status(201).send({ message: 'User created', user: response });
        
    }
    catch (error) {
        res.status(500).send(error);
    }
});


// @login

app.post('/login', async (req, res) => {

    const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(6).required(),
    });

    if (!(await schema.isValid(req.body))) {
        return res.status(400).send('invalid data');
    }

    const { email, password } = req.body;
    const user = await Auth.findOne({ email }).lean();

    if (!user) {
        return res.status(400).send('Invalid username/password');
    }

    if (!(await bcrypt.compare(password, user.password))) {
        return res.status(400).send('Invalid username/password');
    }

    const token = jwt.sign(
        {
            id: user._id,
            email: user.email,
        },
        process.env.JWT_SECRET,
    )

    res.status(200).json({ message: 'Logged in successfully', token });

});

// @logout

// @uploadJSON

app.post('/upload', async (req, res) => {
    // const schema = yup.object().shape({
    //    parsedData: yup.array().required()
    // });

    const { jsonData } = req.body;
    const parsedData = JSON.parse(jsonData);

    console.log(parsedData);
    
    if (!parsedData || parsedData.length === 0) {
        return res.status(400).send('Invalid data');
    }
    // if(await User.findOne({ _id })) {
    //     return res.status(400).send('Data already exists');
    // }


    try {
        const response = User.create({
            jsonData: parsedData
        });

        res.status(201).send({ message: 'JSON uploaded', user: response });

    }
    catch (error) {
        if(error.code === 11000) {
            return res.status(400).send('Data already exists');
        }
        res.status(500).send(error)
    }
});

// @getJSON

app.get('/json', async (req, res) => {
    try {
        const response = await User.find({});

        res.status(200).send({ message: 'JSON retrieved', user: response });

    }
    catch (error) {
        res.status(500).json({
            message: 'Error retrieving JSON',
            error: error.message
        })
    }
});

// @getUser

app.get('/user', async (req, res) => {
    try {
        const response = await Auth.findOne({});

        res.status(200).send({ message: 'User retrieved', user: response });

    }
    catch (error) {
        res.status(500).json({
            message: 'Error retrieving user',
            error: error.message
        })
    }
});




app.listen(PORT, () => {
    console.log(`server is running on port http://localhost:${PORT}`);
});