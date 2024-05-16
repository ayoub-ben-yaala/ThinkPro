import Produit from '../models/Produit.js';

export function getAll(req, res) {
    Produit
    .find({})
    .then(docs => {
        res.status(200).json(docs);
    })
    .catch(err => {
        res.status(500).json({ error: err });
    });
}
export async function AddOnce(req, res) {
    const Produit = new Produit({
        nomProduit: req.body.nomProduit,
        descProduit: req.body.descProduit,
        prix: req.body.prix,
        qteProduit: req.body.qteProduit

    });

    try {
        const newProduit = await Produit.create(Produit);
        
        res.status(201).json({
            message: "Produit created successfully!",
            Produit: newProduit 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while creating the Produit" });
    }
}



export async function getOnce(req, res) {
    try {
        const Produit = await Produit.findOne({ nomProduit: req.params.nomProduit });
        
        if (!Produit) {
            return res.status(404).json({ message: "Produit non trouvé" });
        }
        
        res.status(200).json(Produit);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la recherche d'un Produit" });
    }
}



export async function putOnce(req, res) {
    try {
        const updatedProduit = await Produit.findOneAndUpdate(
            { nomProduit: req.params.nomProduit }, 
            { descProduit: req.body.descProduit, }, // Données à mettre à jour
            { new: true } 
        );

        if (!updatedProduit) {
            return res.status(404).json({ message: "Produit non trouvé" });
        }

        res.status(200).json({
            message: "Produit mis à jour avec succès !",
            Produit: updatedProduit
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la mise à jour d'un Produit" });
    }
}


export async function patchOnce(req, res) {
    try {
        const updatedProduit = await Produit.findOneAndUpdate(
            { Produit: req.params.Produit }, 
             { $set: req.body },
            { new: true } 
        );

        if (!updatedProduit) {
            return res.status(404).json({ message: "Produit non trouvé" });
        }

        res.status(200).json({
            message: "Produit  mis à jour avec succès !",
            Produit: updatedProduit
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la mise à jour d'un Produit" });
    }
}


export async function deleteOnce(req, res) {
    try {
        const deletedProduit = await Produit.findOneAndDelete({ Produit: req.params.Produit });

        if (!deletedProduit) {
            return res.status(404).json({ message: "Produit non trouvé" });
        }

        res.status(200).json({
            message: "Produit supprimé avec succès !",
            Produit: deletedProduit
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la suppression d'un Produit" });
    }
}
