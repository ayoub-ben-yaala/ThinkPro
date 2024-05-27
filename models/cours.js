import mongoose from 'mongoose'; // Importer Mongoose
import user from './user';
import Class from './class';
const { Schema, model } = mongoose; // Utiliser Schema et model du module mongoose
// Créez votre schéma qui décrit à quoi ressemblera chaque document
const coursSchema = new Schema(
    {
        courName: {
            type: String,
             // Cet attribut est obligatoire
        },
        idcours: {
            type: Number,
          
        },
        idteacher: {
            type: user,
          
        },
        duration: {
            type: Number,
           
        },
        material: {
            type: String,
            
        },
        class: {
            type: Class,
           
        },

        coef: {
        type: Number,
   
    }
        
    },
    {
        timestamps: true // Ajouter automatiquement createdAt et updatedAt
    }
);

    
export default model("Cours", coursSchema);
