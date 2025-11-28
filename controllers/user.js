import {User} from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const signUp = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then((hashedPassword) => {
            const user = new User({
                email: req.body.email,
                password: hashedPassword,
            })
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé' }))
                .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
}

export const signIn = (req, res, next) => {
    User.findOne({email: req.body.email})
        .then((user) => {
            if(user === null) {
                res.status(401).json({ error: "Paire identifiant / mot de passe incorrecte." });
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then((valid) => {
                        if (!valid) {
                            res.status(401).json({ error: "Paire identifiant / mot de passe incorrecte." });
                        } else {
                            res.status(200).json({
                                userId: user._id,
                                token: jwt.sign(
                                    { userId: user._id },
                                    'RANDOM_TOKEN_SECRET',
                                    { expiresIn: '24h'}
                                )
                            })
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        res.status(500).json({ error })
                    });
            }
        })
        .catch((error) => res.status(500).json({ error }));
}