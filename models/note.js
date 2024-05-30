import mongoose from 'mongoose'; // Importer Mongoose
import user from './user.js';
import Class from './class.js';
import examen from './examen.js';
const { Schema, model } = mongoose; // Utiliser Schema et model du module mongoose
// Créez votre schéma qui décrit à quoi ressemblera chaque document
const noteSchema = new Schema(
    {
       
        idUser: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
          
        },
        idExamen: {
            type: Schema.Types.ObjectId,
            ref: 'Examen',
            required: true
          
        },
        note: {
            type: String,
            required: true
           
        },
       
        
        
    },
    {
        timestamps: true // Ajouter automatiquement createdAt et updatedAt
    }
);

    
export default model("Note", noteSchema);
