import express from "express";
import mongoose from "mongoose";
import {Product} from "./models/Product.js";

export const quizzApp = express();
quizzApp.use(express.json());

mongoose.connect('mongodb+srv://DevUser:FullstackTutoDevPassword@fullstacktuto.otilmtu.mongodb.net/?appName=FullstackTuto')
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

quizzApp.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
})

quizzApp.get('/api/products', (req, res, next) => {
    Product.find()
        .then((products) => res.status(200).json({products}))
        .catch((error) => res.status(400).json({error}));
})

quizzApp.get('/api/products/:id', (req, res, next) => {
    Product.findOne({ _id: req.params.id })
        .then((product) => res.status(200).json({product}))
        .catch((error) => res.status(400).json({error}));
})

quizzApp.post('/api/products', (req, res, next) => {
    delete req.params.id;
    const product = new Product({...req.body});
    product.save()
        .then((product) => res.status(201).json({product}))
        .catch((error) => res.status(400).json({error}));
})

quizzApp.put('/api/products/:id', (req, res, next) => {
    Product.updateOne({ _id: req.params.id }, {...req.body, _id: req.params.id})
        .then(() => res.status(200).json({ message: 'Modified!'}))
        .catch((error) => res.status(400).json({error}));
})

quizzApp.delete('/api/products/:id', (req, res, next) => {
    Product.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Deleted!'}))
        .catch((error) => res.status(400).json({error}));
})