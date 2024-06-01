import mongoose from 'mongoose'; // Importer Mongoose
import user from './user.js';
const { Schema, model } = mongoose; // Utiliser Schema et model du module mongoose
// Créez votre schéma qui décrit à quoi ressemblera chaque document
const classSchema = new Schema(
    {
        className: {
            type: String,
            required: true
        },
        idteacher: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
          
        },
        idstudents: {
            type: [Schema.Types.ObjectId],
            ref: 'User',
            required: true
           
        },
        capacity: {
            type: Number,
            required: true
            
        },
    },
    {
        timestamps: true // Ajouter automatiquement createdAt et updatedAt
    }
);


export default model("Class", classSchema);
