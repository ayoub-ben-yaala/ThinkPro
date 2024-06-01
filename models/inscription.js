import mongoose from 'mongoose'; // Importer Mongoose
const { Schema, model } = mongoose; 


const inscriptionSchema = new Schema(
    {
        eleveId: {
            type: Schema.Types.ObjectId, 
        },
        
        anneeScolaire: {
            type: String,
        
        },
        classeNiveau: {
            type: String,
            
        },
        statutInscription: {
            type: String,
            
        },
        reçuInscription: {
            type: Number,
            
        },
        datePaiement: {
            type: Date,
            
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
