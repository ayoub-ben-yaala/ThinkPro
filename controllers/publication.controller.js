import Publication from "../models/publication.js";

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
