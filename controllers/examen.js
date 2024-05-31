import User from '../models/user.js';
import Class from '../models/class.js';
import Level from '../models/Level.js';
import Examen from '../models/examen.js';
import multer from 'multer';
import path from 'path';


export function getAllexamens(req, res) {
    Examen
    .find({})
    .then(docs => {
        res.status(200).json(docs);
    })
    .catch(err => {
        res.status(500).json({ error: err });
    });
}

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Save files to the "uploads" directory
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Append the file extension
    }
});

const upload = multer({ storage: storage }).single('pdfPath');

// Add Examen function
export async function addExamen(req, res) {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ error: "File upload failed" });
        }

        const { idTeacher, examen } = req.body;
        const pdfPath = req.file.path; // Path to the uploaded file

        try {
            const newExamen = new Examen({
                idTeacher,
                examen,
                pdfPath
            });

            await newExamen.save();

            res.status(201).json({
                message: "Exam created successfully!",
                examen: newExamen
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "An error occurred while creating the exam" });
        }
    });
}

// export async function addExamen(req, res) {
      
      
    
//     const examen = new Examen({
//         idTeacher: req.idTeacher,
//         examen: req.examen,
//         pdfPath: req.pdfPath
//     });
         


//     try {
//         const newExamen= await Examen.create(examen);
        
//         res.status(201).json({
//             message: "exam created successfully!",
//             examen: newExamen
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: "An error occurred while creating the exam" });
//     }
// }

export async function getExamen(req, res) {
    try {
        const examen = await Examen.findOne({ idExamen: req.params.idExamen });
        
        if (!examen) {
            return res.status(404).json({ message: "exam not found" });
        }
        
        res.status(200).json(examen);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la recherche de exam" });
    }
}

export async function updateExamen(req, res) {
    try {

        


        const updatedExamen = await Examen.findOneAndUpdate(
            {  _id:req.params.idExamen}, 
            { idTeacher: req.body.idTeacher,examen: req.body.examen, }, // Données à mettre à jour
            { new: true } 
        );

        if (!updatedExamen) {
            return res.status(404).json({ message: "exam non trouvé" });
        }

        res.status(201).json({
            message: "exam mis à jour avec succès !",
            examen: updatedExamen
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur on the update of the exam" });
    }
}



export async function deleteExamen(req, res) {
    try {
        const deletedExamen = await Examen.findOneAndDelete({ _id: req.params.idExamen });

        if (!deletedExamen) {
            return res.status(404).json({ message: "exam not found" });
        }

        res.status(200).json({
            message: "Exam is deleted !",
            examen: deletedExamen
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur in deleting Exam" });
    }
}