
import mongoose from 'mongoose'; 
const { Schema, model } = mongoose; 

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
        imageProduit: {
            type: String,
          
        },
        typeProduit :{
            type: String,
        },
        
    },
    {
        timestamps: true 
    }
);


export default model("Produit", ProduitSchema);

