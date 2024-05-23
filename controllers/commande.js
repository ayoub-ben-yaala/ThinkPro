import Commande from '../models/commande.js';

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
    const Commandee = new Commande({
        numCommande: req.body.numCommande,
        qteCommande: req.body.qteCommande

    });

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
        const Commande = await Commande.findOne({ _id: req.params.idCommande });
        
        if (!Commande) {
            return res.status(404).json({ message: "Commande non trouvé" });
        }
        
        res.status(200).json(Commande);
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
