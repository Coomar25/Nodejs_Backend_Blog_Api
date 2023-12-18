import joi from 'joi';

const createPostValidateSchema = joi.object({
  title: joi.string().required(),
  content: joi.string().required(),
  author: joi.string().required(),
  publicationDate: joi.date().iso().required(),
  imagesOrMedia: joi.string().required(),
  status: joi.string().valid('published', 'draft', 'archived').required(),
});

export default createPostValidateSchema;
