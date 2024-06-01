import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const offreSchema = new Schema(
    {
        id_offre: {
            type: String,
        },
        nom_offre: {
            type: String,    
        },
        id_type: {
            type: Schema.Types.ObjectId,
            ref:'Type_offre',
            },   
        prix_offre: {
            type: Number,
            
        },
        
        mode_de_paiement: {
            type: String,
        },
        image: {
            type: String,
        },  
             
    },
    {
        timestamps: true
    }
);

export default model("Offre", offreSchema);