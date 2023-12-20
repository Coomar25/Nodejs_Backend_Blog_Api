import joi from 'joi';

export const createPostValidateSchema = joi.object({
  user: joi.string().required(),
  title: joi.string().trim().min(1).required(),
  content: joi.string().trim().min(6).required(),
  author: joi.string().required(),
  category: joi.string().required(),
  imagesOrMedia: joi.string().required(),
  // status: joi.string().valid('published', 'draft', 'archived').required(),
});

export const updatePostValidateSchema = joi.object({
  title: joi.string().trim().min(1),
  content: joi.string().trim().min(6),
  category: joi.string(),
  imagesOrMedia: joi.string(),
  status: joi.string().valid('published', 'draft', 'archived'),
})
