import joi from 'joi';

const createPostValidateSchema = joi.object({
  user: joi.string().required(),
  title: joi.string().trim().min(1).required(),
  content: joi.string().trim().min(6).required(),
  author: joi.string().required(),
  category: joi.string().required(),
  imagesOrMedia: joi.string().required(),
  status: joi.string().valid('published', 'draft', 'archived').required(),
});

export default createPostValidateSchema;
