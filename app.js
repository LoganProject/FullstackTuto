import express from 'express';
import mongoose from "mongoose";
import { router as stuffRoutes } from "./routes/stuff.js";

export const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
})

app.use(express.json());
app.use('/api/stuff', stuffRoutes);

mongoose.connect('mongodb+srv://DevUser:FullstackTutoDevPassword@fullstacktuto.otilmtu.mongodb.net/?appName=FullstackTuto')
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));