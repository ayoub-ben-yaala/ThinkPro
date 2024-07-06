
import mongoose from 'mongoose'; 
const { Schema, model } = mongoose; 

// Créez votre schéma qui décrit à quoi ressemblera chaque document
const typeProduitSchema = new Schema(
    {
        nomType: {
            type: String,
            
        },
        descType: {
            type: String,
          
        },
        
    },
    {
        timestamps: true 
    }
);


export default model("TypeProduit", typeProduitSchema);
