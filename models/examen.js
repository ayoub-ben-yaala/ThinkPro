import mongoose from 'mongoose'; // Importer Mongoose
import user from './user';
import Class from './class';
const { Schema, model } = mongoose; // Utiliser Schema et model du module mongoose
// Créez votre schéma qui décrit à quoi ressemblera chaque document
const examenSchema = new Schema(
    {
       
        idExamen: {
            type: Number,
          
        },
        idTeacher: {
            type: user,
          
        },
        examen: {
            type: String,
           
        },
       
        
        
    },
    {
        timestamps: true // Ajouter automatiquement createdAt et updatedAt
    }
);

    
export default model("Examen", examenSchema);
