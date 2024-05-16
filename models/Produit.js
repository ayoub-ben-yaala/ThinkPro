
import mongoose from 'mongoose'; 
const { Schema, model } = mongoose; 

// Créez votre schéma qui décrit à quoi ressemblera chaque document
const ProduitSchema = new Schema(
    {
        nomProduit: {
            type: String,
            
        },
        descProduit: {
            type: String,
          
        },
        prix: {
            type: Number,
          
        },
        qteProduit: {
            type: Number,
          
        },
        
    },
    {
        timestamps: true 
    }
);


export default model("Produit", ProduitSchema);

