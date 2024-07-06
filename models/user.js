import mongoose from 'mongoose'; 
const { Schema, model } = mongoose; 

const userSchema = new Schema(
    {
        userName: {
            type: String,
            required: true
        },
        passWord: {
            type: String,
            required: true
          
        },
        email: {
            type: String,
            required: true,
            unique:true
            },

          adress: {
            type: String,
            required: true
            
        },
          phone: {
            type: Number,
            required: true
           
        },
          role: {
            type: String,
            required: true
            
        },

        dateOfB:{
            type:String,
            required:true
            
        },
        avatar:{
            type:String,
            required:true
           

        },
        resetPasswordToken: {
            type:String
        },
        resetPasswordExpires:{
            type: Date
        },
    },
    {
        timestamps: true
    }
);


export default model("User", userSchema);

