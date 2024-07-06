import Publication from "../models/publication.js";
import multer from "multer";

//add publication using async function and export it
export async function createPublication(req, res) {
    const publication = new Publication(req.body);

    try {
        const newPublication = await Publication.create(publication);

        res.status(201).json(newPublication);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while creating the publication" });
    }
}

//get all publications using async function and export it
export async function getAllPublications(req, res) {
    Publication
        .find({})
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
}  

//get publication by id 
export async function getPublicationById(req, res) {
    try {
        const publication = await Publication.findById(req.params.id);
        
        if (!publication) {
            return res.status(404).json({ message: "Publication not found" });
        }
        
        res.status(200).json(publication);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while searching for the publication" });
    }
}

//update publication by id
// export async function updatePublication(req, res) {
//     try {
//         const publication = await Publication.findByIdAndUpdate(req.params.id   , req.body  , { new: true });
//         if (!publication) {
//             return res.status(404).json({ message: "Publication not found" });
//         }
//         res.status(200).json(publication);
//     }
//     catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "An error occurred while updating the publication" });
//     }
// }
// Update publication by id
export async function updatePublication(req, res) {
    try {
        const updatedData = req.body;
        
        // If a file is uploaded, update the attachment field
        if (req.file) {
            updatedData.attachment = `/public/uploads/${req.file.filename}`;
        }

        const publication = await Publication.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        if (!publication) {
            return res.status(404).json({ message: "Publication not found" });
        }
        res.status(200).json(publication);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while updating the publication" });
    }
}

//delete publication by id
export async function deletePublication(req, res) {
    try {
        const publication = await Publication.findByIdAndDelete(req.params.id);
        
        if (!publication) {
            return res.status(404).json({ message: "Publication not found" });
        }
        
        res.status(200).json({ message: "Publication deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while deleting the publication" });
    }
}