
import mongoose from 'mongoose'; 
import pkg from 'pdfkit';
const { ref } = pkg;
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
        userid:{
            type : mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: false
        },
        
    },
    {
        timestamps: true 
    }
);


export default model("Produit", ProduitSchema);

