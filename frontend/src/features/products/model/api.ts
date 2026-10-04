import z from "zod";
import { baseApi } from "@/shared/api";
import type { Product, ProductList, AddProductData } from "../types";

const ProductDtoSchema = z.object({
  _id: z.string(),
  name: z.string(),
  image: z.string(),
  description: z.string(),
  brand: z.string(),
  category: z.string(),
  price: z.number(),
  countInStock: z.number(),
  rating: z.number(),
  numReviews: z.number(),
});

export const productsApi = baseApi.injectEndpoints({
  endpoints: (create) => ({
    getProducts: create.query<ProductList, void>({
      query: () => "/products",
      providesTags: ["Products"],
      transformResponse: (res: unknown) => ProductDtoSchema.array().parse(res),
    }),
    getProduct: create.query<Product, string>({
      query: (id) => `/products/${id}`,
      providesTags: ["Products"],
      transformResponse: (res: unknown) => ProductDtoSchema.parse(res),
    }),
    addProduct: create.mutation({
      query: (product: AddProductData) => ({
        url: "/products/add",
        method: "POST",
        body: { ...product },
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductQuery,
  useGetProductsQuery,
  useAddProductMutation,
} = productsApi;
