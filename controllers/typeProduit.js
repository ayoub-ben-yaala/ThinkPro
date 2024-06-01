import typeProduit from '../models/typeProduit.js';

export function getAll(req, res) {
    typeProduit
    .find({})
    .then(docs => {
        res.status(200).json(docs);
    })
    .catch(err => {
        res.status(500).json({ error: err });
    });
}
export async function AddOnce(req, res) {
    const typeProduitt = new typeProduit({

        nomType: req.body.nomType,
        descType: req.body.descType
    });

    try {
        const newtypeProduit = await typeProduit.create(typeProduitt);
        
        res.status(201).json({
            message: "typeProduit created successfully!",
            typeProduit: newtypeProduit 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while creating the typeProduit" });
    }
}



export async function getOnce(req, res) {
    try {
        const typeProduit = await typeProduit.findOne({ _id: req.params.idType });
        
        if (!typeProduit) {
            return res.status(404).json({ message: "typeProduit non trouvé" });
        }
        
        res.status(200).json(typeProduit);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la recherche d'un typeProduit" });
    }
}



export async function putOnce(req, res) {
    try {
        const updatedtypeProduit = await typeProduit.findOneAndUpdate(
            { idType: req.params.idType}, 
            { nomType: req.params.nomType ,descType: req.body.descType }, // Données à mettre à jour
            { new: true } 
        );

        if (!updatedtypeProduit) {
            return res.status(404).json({ message: "typeProduit non trouvé" });
        }

        res.status(200).json({
            message: "typeProduit mis à jour avec succès !",
            typeProduit: updatedtypeProduit
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la mise à jour d'un typeProduit" });
    }
}


export async function patchOnce(req, res) {
    try {
        const updatedtypeProduit = await typeProduit.findOneAndUpdate(
            { typeProduit: req.params.typeProduit }, 
             { $set: req.body },
            { new: true } 
        );

        if (!updatedtypeProduit) {
            return res.status(404).json({ message: "typeProduit non trouvé" });
        }

        res.status(200).json({
            message: "typeProduit  mis à jour avec succès !",
            typeProduit: updatedtypeProduit
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la mise à jour d'un typeProduit" });
    }
}


export async function deleteOnce(req, res) {
    try {
        const deletedtypeProduit = await typeProduit.findOneAndDelete({ typeProduit: req.params.typeProduit });

        if (!deletedtypeProduit) {
            return res.status(404).json({ message: "typeProduit non trouvé" });
        }

        res.status(200).json({
            message: "typeProduit supprimé avec succès !",
            typeProduit: deletedtypeProduit
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la suppression d'un typeProduit" });
    }
}
