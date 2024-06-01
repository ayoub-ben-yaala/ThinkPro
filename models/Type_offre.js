import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const type_offreSchema = new Schema(
    {
        id_type: {
            type: String,
            
        },
        libelle_type: {
            type: String,
        },
        
    },
    {
        timestamps: true
    }
);

export default model("Type_offre", type_offreSchema);