import Joi from "joi";

export const productGetByIdDto = Joi.object({
  id: Joi.string().length(24).hex().required().messages({
    "string.length": "Product ID must be a 24 character hexadecimal string",
    "string.hex": "Product ID must be a valid hexadecimal string",
    "any.required": "Product ID is required",
  }),
});
