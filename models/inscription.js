//models/inscri.js
import mongoose from 'mongoose'; // Importer Mongoose
const { Schema, model } = mongoose; 


const inscriptionSchema = new Schema(
    {
        // eleveId: {
        //     type: Schema.Types.ObjectId, 
        // },
        NomEleve: {
            type: String,
        
        },
        anneeScolaire: {
            type: String,
        
        },
        classeNiveau: {
            type: String,
            
        },
        
        id_offre: {
            type: Schema.Types.ObjectId,
            ref:'Offre',
        },
        id_user: {
            type: Schema.Types.ObjectId,
            ref:'User',
        },
    },
    {
        timestamps: true 
    }
);

export default model("Inscription", inscriptionSchema);
