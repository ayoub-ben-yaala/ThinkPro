import mongoose from 'mongoose'; // Importer Mongoose
import user from './user.js';
import classe from './class.js';
import cours from './cours.js';
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
            required: true
          
        },

        class: {
            type: Schema.Types.ObjectId,
            ref: 'Class',
            required: true
            
        },

        cours: {
            type: Schema.Types.ObjectId,
            ref: 'Cours',
            required: true
        },
    },
    {
        timestamps: true // Ajouter automatiquement createdAt et updatedAt
    }
);


export default model("Level", levelSchema);
