import joi from "joi";


const createuserValidateSchema = joi.object({
    username: joi.string().required().min(3).max(20),
    email: joi
      .string()
      .email()
      .required()
      .custom((value, helpers) => {
        if (!value.includes("@gmail.com")) {
          return helpers.message("Email domain must be gmail.com");
        }
        return value;
      }),
    password: joi.string().required().min(8),
    confirmpassword: joi
      .string()
      .required()
      .valid(joi.ref("password"))
      .messages({ "any.only": "Passwords must match" }),
    image: joi.string().optional(),
  });

  export default createuserValidateSchema;