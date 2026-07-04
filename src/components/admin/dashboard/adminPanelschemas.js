import * as z from "zod";

export const brandSchema = z.object({
  name: z.string().min(2, "La marca debe tener al menos 2 caracteres"),
  description: z.string().min(10, "La marca debe tener al menos 10 caracteres"),
});

export const categorySchema = z.object({
  name: z.string().min(3, "La categoría debe tener al menos 3 caracteres"),
  slug: z.string().min(3, "El slug debe tener al menos 3 caracteres"),
});

export const productSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres"),
  imageUrl: z.string().url("Debe ser una URL válida").or(z.string().length(0)),
  categoryId: z.string().min(1, "Debe seleccionar una categoría"),
  brandId: z.string().min(1, "Debe seleccionar una marca"),
});

export const skuSchema = z.object({
  productId: z.string().min(1, "Debe seleccionar un producto"),
  skuCode: z.string().min(4, "El SkuCode debe tener al menos 4 digitos"),
  price: z.coerce.number().positive("El precio debe ser un número positivo"),
  stock: z.coerce.number().int().nonnegative("El stock no puede ser negativo"),
  sizeMl: z.coerce
    .number()
    .positive("Los mililitros deben ser un número positivo"),
});

export const updateBrandSchema = brandSchema.partial();

export const updateCategorySchema = categorySchema.partial();

export const updateProductSchema = productSchema.partial();

export const updateSkuSchema = skuSchema.partial();
