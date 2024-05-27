import mongoose from 'mongoose'; // Importer Mongoose
import user from './user';
import Class from './class';
import examen from './examen';
const { Schema, model } = mongoose; // Utiliser Schema et model du module mongoose
// Créez votre schéma qui décrit à quoi ressemblera chaque document
const noteSchema = new Schema(
    {
       
        idNote: {
            type: Number,
          
        },
        idUser: {
            type: user,
          
        },
        idExamen: {
            type: examen,
          
        },
        note: {
            type: String,
           
        },
       
        
        
    },
    {
        timestamps: true // Ajouter automatiquement createdAt et updatedAt
    }
);

    
export default model("Note", examenSchema);
