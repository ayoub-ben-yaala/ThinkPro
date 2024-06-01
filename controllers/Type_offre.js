import Type_offre from '../models/Type_offre.js'; 
const type_offre=[];
export function getAll(req, res) {
    Type_offre
    .find({})
    .then(docs => {
        res.status(200).json(docs);
    })
    .catch(err => {
        res.status(500).json({ error: err });
    });
}

export async function AddOnce(req, res) {
    const type_offre = new Type_offre({
       id_type : req.body.id_type,
        libelle_type: req.body.libelle_type,
        
    });

    try {
        const newType_offre = await Type_offre.create(type_offre);
        res.status(201).json({
            message: "Libelle offre créée avec succès!",
            //type_offre: newType_offre
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Une erreur s'est produite lors de la création de libelle" });
    }
}

export async function getOnce(req, res) {
    try {
         const type_offre = await Type_offre.findById({_id:req.params.id});

        if (!type_offre) {
            return res.status(404).json({ message: "Libelle non trouvée" });
        }
        res.status(200).json(type_offre);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la recherche de libelle" });
    }
}

export async function patchOnce(req, res) {
    try {
        const updatedType_offre = await Type_offre.findOneAndUpdate(
            {_id:req.params.id}, 
            {$set:req.body}, 
            { new: true }
        );
        if (!updatedType_offre) {
            return res.status(404).json({ message: "Libelle non trouvée" });
        }
        res.status(200).json({
            message: "Libelle mise à jour avec succès!",
            //inscription: updatedInscription
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la mise à jour de la libelle" });
    }
}

export async function deleteOnce(req, res) {
    try {
        const deletedType_offre = await Type_offre.findOneAndDelete(req.params.id);
        if (!deletedType_offre) {
            return res.status(404).json({ message: "Libelle non trouvée" });
        }
        res.status(200).json({
            message: "Libelle supprimée avec succès!",
            //inscription: deletedInscription
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la suppression de la libelle" });
    }
}
