import mongoose from 'mongoose'; // Importer Mongoose
import user from './user';
import classe from './class';
import cours from './cours';
const { Schema, model } = mongoose; // Utiliser Schema et model du module mongoose
// Créez votre schéma qui décrit à quoi ressemblera chaque document
const levelSchema = new Schema(
    {
        levelName: {
            type: String,
             // Cet attribut est obligatoire
        },
        
        programme: {
            type: String,
          
        },

        class: {
            type: classe,
            
        },

        cours: {
            type: cours
        },
    },
    {
        timestamps: true // Ajouter automatiquement createdAt et updatedAt
    }
);


export default model("Level", levelSchema);
