const {Schema,model} = require('mongoose')

const contactFormSchema = new Schema({
    name:{
        type:String,
        required:true,
        minLength:3
    },
    email:{
        type:String,
        required:true,
      match:/[@]/
    },
    password:{
        type:String,
        required:true,
        minLength:3
    },
    phone:{
        type:String,
        required:true,
        minLength:10,
        maxLength:11

    },
    message:{
        type:String
    }
})

const contactFormModel = model('form',contactFormSchema)
module.exports = contactFormModel
