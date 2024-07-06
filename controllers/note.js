import User from '../models/user.js';
import Class from '../models/class.js';
import Level from '../models/Level.js';
import Examen from '../models/examen.js';
import Note from '../models/note.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
export function getAllnotes(req, res) {
    Note
    .find({})
    .then(docs => {
        res.status(200).json(docs);
    })
    .catch(err => {
        res.status(500).json({ error: err });
    });
}
export async function addNote(req, res) {
    const note = new Note({
        idUser: req.body.idUser,
        idExamen: req.body.idExamen,
        note: req.body.note,
    });
    
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
      const user = await User.findById(req.body.idUser);
      const matiere = await Examen.findById(req.body.idExamen);
      //console.log(matiere.get)
      var mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: `La matière ${matiere.examen}` ,
        text: `Vous avez obtenu la note : ${note.note}`
      };
         


    try {
        const newNote = await Note.create(note);
        
        res.status(201).json({
            message: "Note created successfully!",
            note: newNote
        });
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while creating the note" });
    }
}

export async function getNote(req, res) {
    try {
        const note = await Note.findOne({ _id: req.params.idNote });
        
        if (!note) {
            return res.status(404).json({ message: "note not found" });
        }
        
        res.status(200).json(note);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la recherche de note" });
    }
}

export async function updateNote(req, res) {
    try {

        


        const updatedNote = await Note.findOneAndUpdate(
            {  _id:req.params.idNote}, 
            { idUser: req.body.idUser,idExamen: req.body.idExamen,note: req.body.note }, // Données à mettre à jour
            { new: true } 
        );

        if (!updatedNote) {
            return res.status(404).json({ message: "Note non trouvé" });
        }

        res.status(201).json({
            message: "Note mis à jour avec succès !",
            note: updatedNote
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur on the update of the note" });
    }
}



export async function deleteNote(req, res) {
    try {
        const deletedNote = await Note.findOneAndDelete({ _id: req.params.idNote });

        if (!deletedNote) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.status(200).json({
            message: "Note is deleted !",
            note: deletedNote
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur in deleting Note" });
    }
}