import Commande from '../models/commande.js';
import Produit from '../models/Produit.js'
import PDFDocument from 'pdfkit';
import fs from 'fs';

export function getAll(req, res) {
    Commande
    .find({})
    .then(docs => {
        res.status(200).json(docs);
    })
    .catch(err => {
        res.status(500).json({ error: err });
    });
}
export async function AddOnce(req, res) {
    const Commandee = new Commande(req.body);

    try {
        const newCommande = await Commande.create(Commandee);
        
        res.status(201).json({
            message: "Commande created successfully!",
            Commande: newCommande
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while creating the Commande" });
    }
}



export async function getOnce(req, res) {
    try {
        const Command = await Commande.findOne({ "_id": req.params.idCommande });
        
        if (!Command) {
            return res.status(404).json({ message: "Commande non trouvé" });
        }
        
        res.status(200).json(Command);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la recherche d'un Commande" });
    }
}




export async function commandePDF(req, res) {
    try {
        const Order = await Commande.findOne({ _id: req.params.id });
        const prod = await Produit.findOne({ _id: Order.produit })

        if (!Order) {
            return res.status(404).json({ message: "Commande non trouvé" });
        }

        // Create a new PDF document
        const doc = new PDFDocument();

        // Set response headers
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `inline; filename="commande_${Order._id}.pdf"`);

        // Pipe generated PDF into response
        doc.pipe(res);

        // Add content to PDF
        doc.fontSize(20).text(`num de la commande ${Order.numCommande}`, 100, 100);
        doc.fontSize(14).text(`qteCommande: ${Order.qteCommande}`, 100, 150);
        doc.fontSize(14).text(`produit: ${prod.nomProduit}`, 100, 170);
        // Add more data as needed

        // Finalize PDF and close the stream
        doc.end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la recherche d'un Commande" });
    }
}



export async function putOnce(req, res) {
    try {
        const updatedCommande = await Commande.findOneAndUpdate(
            { _id: req.params.idCommande }, 
            { numCommande: req.params.numCommande , qteCommande: req.body.qteCommande, }, 
            { new: true } 
        );

        if (!updatedCommande) {
            return res.status(404).json({ message: "Commande non trouvé" });
        }

        res.status(200).json({
            message: "Commande mis à jour avec succès !",
            Commande: updatedCommande
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la mise à jour d'un Commande" });
    }
}


export async function patchOnce(req, res) {
    try {
        const updatedCommande = await Commande.findOneAndUpdate(
            { Commande: req.params.Commande }, 
             { $set: req.body },
            { new: true } 
        );

        if (!updatedCommande) {
            return res.status(404).json({ message: "Commande non trouvé" });
        }

        res.status(200).json({
            message: "Commande  mis à jour avec succès !",
            Commande: updatedCommande
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la mise à jour d'un Commande" });
    }
}


export async function deleteOnce(req, res) {
    try {
        const deletedCommande = await Commande.findOneAndDelete({ Commande: req.params.Commande });

        if (!deletedCommande) {
            return res.status(404).json({ message: "Commande non trouvé" });
        }

        res.status(200).json({
            message: "Commande supprimé avec succès !",
            Commande: deletedCommande
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la suppression d'un Commande" });
    }
}
