import joi from "joi"
import path from "path"

const postSchema = joi.object({
    title: joi.string().required().trim(),
    description: joi.string().required().trim(),
    content: joi.string().required().trim(),
    category_id: joi.number().integer().required(),
    image: joi.string()
        .required()
        .custom((value, context) => {
            const ext = path.extname(value); // Get the file extension
            if (!ext.match(/\.(jpg|jpeg|png)$/i)) {
                throw new joi.ValidationError(
                    "Invalid image format. Only .jpg, .jpeg, and .png are allowed."
                );
            }
            return value;
        }),
    uid: joi.number().integer().required()
});


  
  const validatePostData = (data) => {
    const { error, value } = postSchema.validate(data, { abortEarly: false });
  
    if (error) {
      throw new Error(error.details[0].message); 
    }
    return value; 
  };
  
  export default validatePostData;




//  const validatePostData = (data) => {
//     const { title, description, content, image } = data;
//     if (!title || !description || !content || !image) {
//       throw new Error("Please provide all fields");
//     }
//   };

// export default validatePostData;