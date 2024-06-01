import Inscription from '../models/inscription.js'; 
const inscriptions=[];
export function getAll(req, res) {
    Inscription
    .find({})
    .then(docs => {
        res.status(200).json(docs);
    })
    .catch(err => {
        res.status(500).json({ error: err });
    });
}

export async function AddOnce(req, res) {
    const inscription = new Inscription({
        eleveId: req.body.eleveId,
        anneeScolaire: req.body.anneeScolaire,
        classeNiveau: req.body.classeNiveau,
        statutInscription: req.body.statutInscription,
        reçuInscription: req.body.reçuInscription,
        datePaiement: req.body.datePaiement
    });

    try {
        const newInscription = await Inscription.create(inscription);
        res.status(201).json({
            message: "Inscription créée avec succès!",
            //inscription: newInscription
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Une erreur s'est produite lors de la création de l'inscription" });
    }
}

export async function getOnce(req, res) {
    try {
         const inscription = await Inscription.findById({_id:req.params.id});

        if (!inscription) {
            return res.status(404).json({ message: "Inscription non trouvée" });
        }
        res.status(200).json(inscription);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la recherche de l'inscription" });
    }
}

export async function patchOnce(req, res) {
    try {
        const updatedInscription = await Inscription.findOneAndUpdate(
            {_id:req.params.id}, 
            {$set:req.body}, 
            { new: true }
        );
        if (!updatedInscription) {
            return res.status(404).json({ message: "Inscription non trouvée" });
        }
        res.status(200).json({
            message: "Inscription mise à jour avec succès!",
            //inscription: updatedInscription
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la mise à jour de l'inscription" });
    }
}

export async function deleteOnce(req, res) {
    try {
        const deletedInscription = await Inscription.findOneAndDelete(req.params.id);
        if (!deletedInscription) {
            return res.status(404).json({ message: "Inscription non trouvée" });
        }
        res.status(200).json({
            message: "Inscription supprimée avec succès!",
            //inscription: deletedInscription
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la suppression de l'inscription" });
    }
}
