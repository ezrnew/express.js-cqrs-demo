import Joi from "joi";

export const orderCreateSchema = Joi.object({
  customerId: Joi.string().length(24).hex().required().messages({
    "string.length": "Customer ID must be a 24-character hexadecimal string",
    "any.required": "Customer ID is required",
  }),
  products: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().length(24).hex().required().messages({
          "string.length":
            "Product ID must be a 24-character hexadecimal string",
          "any.required": "Product ID is required",
        }),
        quantity: Joi.number().integer().min(1).required().messages({
          "number.min": "Quantity must be at least 1",
          "any.required": "Quantity is required",
        }),
      })
    )
    .min(1)
    .required()
    .messages({
      "array.min": "At least one product is required",
      "any.required": "Products field is required",
    }),
});

export type OrderCreateDto = {
  customerId: string;
  products: { productId: string; quantity: number }[];
};
