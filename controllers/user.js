import User from '../models/user.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../jwt.js';
import nodemailer from 'nodemailer';
import crypto from 'crypto';




export async function signup(req, res) {
    try {
        const { userName,passWord,email,adress,phone,role,dateOfB } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "L'utilisateur existe déjà" });
        }
        const hashedPassword = await bcrypt.hash(passWord, 10);
        const newUser = await User.create({ userName, passWord: hashedPassword ,email,adress,phone,role,dateOfB });
        res.status(201).json({ message: "Inscription réussie", user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Une erreur s'est produite lors de l'inscription" });
    }
}
export async function signin(req, res) {
    try {
        const { email, passWord } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "L'utilisateur n'existe pas" });
        }
        const passwordMatch = await bcrypt.compare(passWord, user.passWord);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Mot de passe incorrect" });
        }
        
                const authToken = generateToken({ userId: user._id, email: user.email });
                const expireToken = Date.now() + 3600000;

        res.status(200).json({ message: "Connexion réussie", authToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Une erreur s'est produite lors de la connexion" });
    }
}
export function getAllUsers(req, res) {
    User
    .find({})
    .then(docs => {
        res.status(200).json(docs);
    })
    .catch(err => {
        res.status(500).json({ error: err });
    });
}
export async function AddUser(req, res) {
    const user = new User({
        userName: req.body.userName,
        passWord: req.body.passWord = await bcrypt.hash(req.body.passWord, 10),
        email: req.body.email,
        adress: req.body.adress,
        phone: req.body.phone,
        role: req.body.role,
        dateOfB:req.body.dateOfB
    });
         


    try {
        const newUser = await User.create(user);
        
        res.status(201).json({
            message: "User created successfully!",
            user: newUser 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while creating the user" });
    }
}

// export async function getUserByEmail(req, res) {
//     try {
//         const user = await User.findOne({ email: req.params.email });
        
//         if (!user) {
//             return res.status(404).json({ message: "Utilisateur non trouvé" });
//         }
        
//         res.status(200).json(user);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Erreur lors de la recherche de l'utilisateur" });
//     }
// }
export async function getUserByName(req, res) {
    try {
        const user = await User.findOne({ userName: req.params.userName });
        
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la recherche de l'utilisateur" });
    }
}

export async function putUser(req, res) {
    try {

        if (req.body.passWord) {
            req.body.passWord = await bcrypt.hash(req.body.passWord, 10);
        }


        const updatedUser = await User.findOneAndUpdate(
            {  _id:req.params.userId}, 
            { userName: req.body.userName,passWord: req.body.passWord, email: req.body.email, adress: req.body.adress , phone: req.body.phone, role: req.body.role,dateOfB:req.body.dateOfB }, // Données à mettre à jour
            { new: true } 
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        res.status(201).json({
            message: "Utilisateur mis à jour avec succès !",
            user: updatedUser
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la mise à jour de l'utilisateur" });
    }
}

export async function patchUser(req, res) {
    try {

        if (req.body.passWord) {
            req.body.passWord = await bcrypt.hash(req.body.passWord, 10);
        }

        const updatedUser = await User.findOneAndUpdate(
            { _id: req.params.userId }, 
             { $set: req.body },
            { new: true } 
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        res.status(200).json({
            message: "Utilisateur mis à jour avec succès !",
            user: updatedUser
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la mise à jour de l'utilisateur" });
    }
}

export async function deleteUser(req, res) {
    try {
        const deletedUser = await User.findOneAndDelete({ email: req.params.email });

        if (!deletedUser) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        res.status(200).json({
            message: "Utilisateur supprimé avec succès !",
            user: deletedUser
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la suppression de l'utilisateur" });
    }
}

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ error: 'Utilisateur non trouvé' });
        }

        const token = crypto.randomBytes(20).toString('hex');
        const tokenExpiry = Date.now() + 3600000;
        console.log(token);
        user.resetPasswordToken = token;
        user.resetPasswordExpires = tokenExpiry;
        await user.save();

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            to: user.email,
            from: process.env.EMAIL_USER,
            subject: 'Réinitialisation de mot de passe',
            text: `Vous recevez cet email parce que vous (ou quelqu'un d'autre) avez demandé la réinitialisation du mot de passe de votre compte.\n\n
                   Veuillez cliquer sur le lien suivant, ou le copier dans votre navigateur pour compléter le processus dans l'heure suivant la réception de cet email:\n\n
                   http://${req.headers.host}/reset-password/${token}\n\n
                   Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet email et votre mot de passe restera inchangé.\n`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).send({ message: 'Email de réinitialisation envoyé' });
    } catch (error) {
        res.status(500).send({ error: error.message });
        
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).send({ error: 'Token de réinitialisation invalide ou expiré' });
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(user.passWord, saltRounds);

        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).send({ message: 'Mot de passe réinitialisé avec succès' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};