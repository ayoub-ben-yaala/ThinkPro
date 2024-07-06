import mongoose from 'mongoose'; // Importer Mongoose
import user from './user.js';
import Class from './class.js';
const { Schema, model } = mongoose; // Utiliser Schema et model du module mongoose
// Créez votre schéma qui décrit à quoi ressemblera chaque document
const coursSchema = new Schema(
    {
        courName: {
            type: String,
             // Cet attribut est obligatoire
        },
        idteacher: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
          
        },
        duration: {
            type: Number,
            required: true
           
        },
        material: {
            type: String,
            required: true
            
        },
        class: {
            type: Schema.Types.ObjectId,
            ref: 'Class',
            required: true
           
        },

        coef: {
        type: Number,
        required: true
   
    }
        
    },
    {
        timestamps: true // Ajouter automatiquement createdAt et updatedAt
    }
);

    
export default model("Cours", coursSchema);
