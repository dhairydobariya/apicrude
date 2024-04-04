const joi = require('joi');

// const userSchema = Joi.object({
//     name: Joi.string().required(),
//     email: Joi.string().email().required(),
//     phone: Joi.string().required(),
//     image: Joi.string(),
//     status: Joi.boolean().required(),
//     created_date: Joi.string(),
//     updated_date: Joi.string()
// });



const userSchema  = joi.object({


        name : joi.string(),
        email : joi.string(),
        phone : joi.string(),
        image : joi.string(),
        status : joi.boolean(),
        created_date : joi.string(),
        updated_date : joi.string()
})


 module.exports = userSchema;