import mongoose from 'mongoose'; // Importer Mongoose
import user from './user.js';
import Class from './class.js';
const { Schema, model } = mongoose; // Utiliser Schema et model du module mongoose
// Créez votre schéma qui décrit à quoi ressemblera chaque document
const examenSchema = new Schema(
    {
 
        idTeacher: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
          
        },
        examen: {
            type: String,
            required: true
           
        },
        pdfPath: {
            type: String,
            required: true
           
        },
       
        
        
    },
    {
        timestamps: true // Ajouter automatiquement createdAt et updatedAt
    }
);

    
export default model("Examen", examenSchema);
