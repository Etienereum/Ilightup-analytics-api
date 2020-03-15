const Joi = require('@hapi/joi')

const registerValidation = (data) => {
    const schema = {
        name: 
        Joi.string()
            .min(6)
            .required(),

        emial: 
        Joi.string()
            .min(6)
            .email(),

        password: 
        Joi.string()
            .min(6)
            .required()
    };
    return  new Joi.ValidationError(data, schema);
};

const loginValidation = (data) => {
    
    const schema = {
        emial: 
            Joi.string()
                .min(6)
                .email(),

        password: 
            Joi.string()
                .min(6)
                .required()
    };
    return  new Joi.ValidationError(data, schema);
};

module.exports.loginValidation = loginValidation;
module.exports.registerValidation = registerValidation;