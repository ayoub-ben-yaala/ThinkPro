import mongoose from 'mongoose'; // Importer Mongoose
import User from './user';
const { Schema, model } = mongoose; // Utiliser Schema et model du module mongoose
// Créez votre schéma qui décrit à quoi ressemblera chaque document
const classSchema = new Schema(
    {
        className: {
            type: String,
             // Cet attribut est obligatoire
        },
        idteacher: {
            type: User,
          
        },
        idstudents: {
            type: User,
           
        },
        capacity: {
            type: Number,
            
        },
    },
    {
        timestamps: true // Ajouter automatiquement createdAt et updatedAt
    }
);


export default model("Class", classSchema);
