import User from '../models/user.js';
import Class from '../models/class.js';
import Cours from '../models/cours.js';



export function getAllCours(req, res) {
    Cours
    .find({})
    .then(docs => {
        res.status(200).json(docs);
    })
    .catch(err => {
        res.status(500).json({ error: err });
    });
}
export async function addCours(req, res) {
    const cours = new Cours({
        courName: req.body.courName,
        idteacher: req.body.teacher,
        duration: req.body.duration,
        material: req.body.material,
        class: req.body.class,

        coef: req.body.coef,
    });
         


    try {
        const newCours = await Class.create(cours);
        
        res.status(201).json({
            message: "this cours is created",
            cours: newCours
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while creating the cours" });
    }
}

export async function getCours(req, res) {
    try {
        const cours = await Class.findOne({ courName: req.params.courName });
        
        if (!cours) {
            return res.status(404).json({ message: "cours not found" });
        }
        
        res.status(200).json(cours);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la recherche du cours" });
    }
}

export async function updateCours(req, res) {
    try {

        


        const updatedCours = await Cours.findOneAndUpdate(
            {  _id:req.params.coursId}, 
            { courName: req.body.courName,idteacher: req.body.idteacher,duration: req.body.duration,material: req.body.material,class: req.body.class,coef: req.body.coef }, // Données à mettre à jour
            { new: true } 
        );

        if (!updatedCours) {
            return res.status(404).json({ message: "Cours non trouvé" });
        }

        res.status(201).json({
            message: "Cours mis à jour avec succès !",
            cours: updatedCours
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la mise à jour du Cours" });
    }
}



export async function deleteCours(req, res) {
    try {
        const deletedCours = await Class.findOneAndDelete({ courName: req.params.courName });

        if (!deletedCours) {
            return res.status(404).json({ message: "Cours non trouvé" });
        }

        res.status(200).json({
            message: "Cours supprimé avec succès !",
            cours: deletedCours
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la suppression du cours" });
    }
}