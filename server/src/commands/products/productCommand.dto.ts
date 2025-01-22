import Joi from "joi";

export const productCreateSchema = Joi.object({
  name: Joi.string().max(50).required().messages({
    "string.max": "Name must be at most 50 characters long",
    "any.required": "Name is required",
  }),
  description: Joi.string().max(50).required().messages({
    "string.max": "Description must be at most 50 characters long",
    "any.required": "Description is required",
  }),
  price: Joi.number().positive().required().messages({
    "number.base": "Price must be a valid number",
    "number.positive": "Price must be greater than zero",
    "any.required": "Price is required",
  }),
  stock: Joi.number().integer().min(0).required().messages({
    "number.base": "Stock must be a valid number",
    "number.integer": "Stock must be an integer",
    "number.min": "Stock cannot be negative",
    "any.required": "Stock is required",
  }),
});

export type ProductCreateDto = {
  name: string;
  description: string;
  price: number;
  stock: number;
};

export const restockProductSchema = Joi.object({
  quantity: Joi.number().integer().min(1).required().messages({
    "number.base": "Quantity must be a valid number",
    "number.integer": "Quantity must be an integer",
    "number.min": "Quantity must be at least 1",
    "any.required": "Quantity is required",
  }),
});

export type RestockProductDto = {
  quantity: number;
};
