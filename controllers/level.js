import User from '../models/user.js';
import Class from '../models/class.js';
import Level from '../models/Level.js';



export function getAlllevel(req, res) {
    Level
    .find({})
    .then(docs => {
        res.status(200).json(docs);
    })
    .catch(err => {
        res.status(500).json({ error: err });
    });
}
export async function addLevel(req, res) {
    const level = new Level({
        levelName: req.body.levelName,
        programme: req.body.programme,
        class: req.body.class,
        cours: req.body.cours,
    }); 
    try {
        const newLevel= await Level.create(level);
        
        res.status(201).json({
            message: "level created successfully!",
            level: newLevel
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while creating the level" });
    }
}

export async function getLevel(req, res) {
    try {
        const level = await Level.findOne({ levelName: req.params.levelName });
        
        if (!level) {
            return res.status(404).json({ message: "level not found" });
        }
        
        res.status(200).json(level);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la recherche de level" });
    }
}

export async function updateLevel(req, res) {
    try {

        


        const updatedLevel = await Level.findOneAndUpdate(
            {  _id:req.params.classId}, 
            { LevelName: req.body.LevelName,programme: req.body.programme,class: req.body.class,cours: req.body.cours }, // Données à mettre à jour
            { new: true } 
        );

        if (!updatedLevel) {
            return res.status(404).json({ message: "level non trouvé" });
        }

        res.status(201).json({
            message: "level mis à jour avec succès !",
            level: updatedLevel
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur on the update of the level" });
    }
}



export async function deleteLevel(req, res) {
    try {
        const deletedLevel = await Level.findOneAndDelete({ levelName: req.params.levelName });

        if (!deletedLevel) {
            return res.status(404).json({ message: "level not found" });
        }

        res.status(200).json({
            message: "Level is deleted !",
            level: deletedLevel
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur in deleting Level" });
    }
}