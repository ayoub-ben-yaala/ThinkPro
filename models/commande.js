import mongoose from 'mongoose'; 
const { Schema, model } = mongoose; 


const   CommandeSchema = new Schema(
    {
        numCommande: {
            type: Number,
            
        },
        qteCommande: {
            type: Number,
        },
        produit: {
            type: String,
        }
    },
    {
        timestamps: true 
    }
);


export default model("Commande", CommandeSchema);

