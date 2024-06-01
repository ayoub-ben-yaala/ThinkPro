/*import inscription from '../models/inscription.js';
import Offre from '../models/offre.js'; 
import Type_offre from '../models/Type_offre.js'; 
import SendEmail from '../middlewares/mailer.js';

const offres=[];
export function getAll(req, res) {
    Offre
    .find({})
    .then(docs => {
        res.status(200).json(docs);
        
    })
    .catch(err => {
        res.status(500).json({ error: err });
    });
}


export async function AddOnce(req, res) {
    try {
        // Récupérer l'offre par son ID
        const offre = await Offre.findById(offreId).populate('id_type');
    
        if (!offre) {
          throw new Error('Offre non trouvée');
        }

    Offre.create({
        nom_offre: req.body.nom_offre,
        prix_offre: req.body.prix_offre,
        mode_de_paiement: req.body.mode_de_paiement,
        libelle_type: offre.id_type.libelle_type // Utiliser le champ libelle_type de Type_offre
        //image: `${req.protocol}://${req.get("host")}/img/${req.file.filename}`,
    })
    .then(o=>{
        console.log(o);
        SendEmail(o)
        res.status(200).json({ message: "ajout avec success !" })
    }).catch(err=>{
        res.status(500).json(err)                    
    })
    }
};

export const getOnce = async (req, res) => {
    try {
        const offre = await Offre.findOne({ _id: req.params.id });
        if (!offre) {
            return res.status(404).json({ message: "Offre non trouvée" });
        }
        res.status(200).json(offre);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la recherche de l'offre" });
    }
};

export const patchOnce = async (req, res) => {
    try {
        const offreModifiee = await Offre.findOneAndUpdate(
            {_id:req.params.id}, 
            {$set:req.body}, 
              { new: true });
        if (!offreModifiee) {
            return res.status(404).json({ message: "Offre non trouvée" });
        }
        res.status(200).json({
            message: "Offre mise à jour avec succès!",
            //offre: offreModifiee
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la mise à jour de l'offre" });
    }
};

export const deleteOnce = async (req, res) => {
    try {
        const offreSupprimee = await Offre.findOneAndDelete({_id:req.params.id});
        if (!offreSupprimee) {
            return res.status(404).json({ message: "Offre non trouvée" });
        }
        res.status(200).json({
            message: "Offre supprimée avec succès!",
            //offre: offreSupprimee
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la suppression de l'offre" });
    }
}*/



import Inscription from '../models/inscription.js';
import Offre from '../models/offre.js';
import Type_offre from '../models/Type_offre.js';
import SendEmail from '../middlewares/mailer.js';

const offres = [];

export function getAll(req, res) {
    Offre
        .find({})
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
}

export async function AddOnce(req, res) {
    try {
        // // Récupérer le type d'offre par son ID
        const typeOffre = await Type_offre.findById(req.body.id_type);

        if (!typeOffre) {
            return res.status(404).json({ message: "Type d'offre non trouvé" });
         }

        // Créer l'offre avec les données reçues
        const newOffre = await Offre.create({
            nom_offre: req.body.nom_offre,
            id_type: req.body.id_type,
            prix_offre: req.body.prix_offre,
            mode_de_paiement: req.body.mode_de_paiement,
            image:`${req.protocol}://${req.get("host")}/img/${req.file.filename}`
        });

        // Inclure le libelle du type d'offre dans l'objet à envoyer par e-mail
        const emailData = {
            ...newOffre.toObject(), // Convertir le document Mongoose en objet plain
            libelle_type: typeOffre.libelle_type
        };

        // Envoyer l'email avec les informations de l'offre
        await SendEmail(emailData);

        res.status(200).json({ message: "Ajout avec succès !" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur lors de l'ajout de l'offre" });
    }
}

export const getOnce = async (req, res) => {
    try {
        const offre = await Offre.findOne({ _id: req.params.id });
        if (!offre) {
            return res.status(404).json({ message: "Offre non trouvée" });
        }
        res.status(200).json(offre);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la recherche de l'offre" });
    }
};

export const patchOnce = async (req, res) => {
    try {
        const offreModifiee = await Offre.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { new: true }
        );
        if (!offreModifiee) {
            return res.status(404).json({ message: "Offre non trouvée" });
        }
        res.status(200).json({
            message: "Offre mise à jour avec succès!"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la mise à jour de l'offre" });
    }
};

export const deleteOnce = async (req, res) => {
    try {
        const offreSupprimee = await Offre.findOneAndDelete({ _id: req.params.id });
        if (!offreSupprimee) {
            return res.status(404).json({ message: "Offre non trouvée" });
        }
        res.status(200).json({
            message: "Offre supprimée avec succès!"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la suppression de l'offre" });
    }
}























/*import Inscription from '../models/inscription.js';
import Offre from '../models/offre.js';
import Type_offre from '../models/Type_offre.js';
import SendEmail from '../middlewares/mailer.js';
import multerConfig from '../middlewares/multer-config.js';

export function getAll(req, res) {
    Offre.find({})
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
}

export async function AddOnce(req, res) {
    multerConfig('image')(req, res, async function (err) {
        if (err) {
            console.error('Error during image upload:', err);
            return res.status(500).json({ error: "Erreur lors du téléchargement de l'image" });
        }
        console.log('File uploaded:', req.file);

        try {
            const typeOffre = await Type_offre.findById(req.body.id_type);

            if (!typeOffre) {
                return res.status(404).json({ message: "Type d'offre non trouvé" });
            }
            const imageUrl = req.file ? `${req.protocol}://${req.get("host")}/public/images/${req.file.filename}` : null;
            console.log('Image URL:', imageUrl);

            const newOffre = await Offre.create({
                nom_offre: req.body.nom_offre,
                id_type: req.body.id_type,
                prix_offre: req.body.prix_offre,
                mode_de_paiement: req.body.mode_de_paiement,
                image: imageUrl
            });

            const emailData = {
                ...newOffre.toObject(),
                libelle_type: typeOffre.libelle_type
            };

            await SendEmail(emailData);

            res.status(200).json({ message: "Ajout avec succès !" });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Erreur lors de l'ajout de l'offre" });
        }
    });
}

export const getOnce = async (req, res) => {
    try {
        const offre = await Offre.findOne({ _id: req.params.id });
        if (!offre) {
            return res.status(404).json({ message: "Offre non trouvée" });
        }
        res.status(200).json(offre);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la recherche de l'offre" });
    }
};

export const patchOnce = async (req, res) => {
    try {
        const offreModifiee = await Offre.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { new: true }
        );
        if (!offreModifiee) {
            return res.status(404).json({ message: "Offre non trouvée" });
        }
        res.status(200).json({
            message: "Offre mise à jour avec succès!"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la mise à jour de l'offre" });
    }
};

export const deleteOnce = async (req, res) => {
    try {
        const offreSupprimee = await Offre.findOneAndDelete({ _id: req.params.id });
        if (!offreSupprimee) {
            return res.status(404).json({ message: "Offre non trouvée" });
        }
        res.status(200).json({
            message: "Offre supprimée avec succès!"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la suppression de l'offre" });
    }
}*/
