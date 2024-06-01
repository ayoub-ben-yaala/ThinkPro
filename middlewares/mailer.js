//import nodemailer from 'nodemailer'
//import Type_offre from '../models/Type_offre'
 /*async function SendEmail(newOffre) {

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", //
    port: 465, //
    service: 'gmail',
    secure: true,
    auth: {
      user: process.env.EMAIL_USER, //
      pass: process.env.EMAIL_PASS //
    },
    tls: {
      rejectUnauthorized: false,
    },
  }
  );
  try {
    // Récupérer le type d'offre par son ID
    let typeOffre = await Type_offre.findById(newOffre.id_type);
// Préparer le libelle de typeOffre si trouvé
let typeOffreLibelle = typeOffre ? typeOffre.libelle : 'Type inconnu';

  let info = await transporter.sendMail({
    from:  process.env.EMAIL_USER,
    to: "nbayoudh488@gmail.com",
    subject: "Nouvelle Offre Créée",
    text: `Une nouvelle offre a été créée avec les détails suivants:\n\nNom: ${newOffre.nom_offre}\nPrix: ${newOffre.prix_offre}\nMode de paiement: ${newOffre.mode_de_paiement} \nType d'offre: ${typeOffreLibelle} ` 
   
  });

  console.log(info.messageId);
}
 
export default SendEmail;*/





import nodemailer from 'nodemailer';
async function SendEmail(newOffre) {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        service: 'gmail',
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    try {
        // Envoyer l'email
        let info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: "nbayoudh488@gmail.com",
            subject: "Nouvelle Offre Créée",
            html: ` <p> Une nouvelle offre a été créée avec les détails suivants: <br> \n\nNom: ${newOffre.nom_offre}\n <br> Prix: ${newOffre.prix_offre}\n <br> Mode de paiement: ${newOffre.mode_de_paiement}\n <br> Type d'offre: ${newOffre.libelle_type}</p>
            <a href="${newOffre.image}">Image</a>
 
            `,
        });

        console.log('Email sent: ' + info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

export default SendEmail;



/*import nodemailer from 'nodemailer';

async function SendEmail(newOffre) {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        service: 'gmail',
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    try {
        let mailOptions = {
            from: process.env.EMAIL_USER,
            to: "nbayoudh488@gmail.com",
            subject: "Nouvelle Offre Créée",
            text: `Une nouvelle offre a été créée avec les détails suivants:\n\nNom: ${newOffre.nom_offre}\nPrix: ${newOffre.prix_offre}\nMode de paiement: ${newOffre.mode_de_paiement}\nType d'offre: ${newOffre.libelle_type}`,
            attachments: newOffre.image ? [{
                filename: newOffre.image.split('/').pop(),
                path: newOffre.image
            }] : []
        };

        let info = await transporter.sendMail(mailOptions);

        console.log('Email sent: ' + info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

export default SendEmail;*/