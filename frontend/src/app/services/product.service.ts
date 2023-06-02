import { AxiosResponse } from "axios";

import { httpClient } from "app/http";
import { Product } from "app/models/products";

const resourceURL: string = "/api/products";

export const useProductService = () => {
  const save = async (product: Product): Promise<Product> => {
    const response: AxiosResponse<Product> = await httpClient.post<Product>(
      resourceURL,
      product
    );

    return response.data;
  };

  const getProducts = async (): Promise<Product[]> => {
    const response: AxiosResponse<Product[]> = await httpClient.get(
      resourceURL
    );

    return response.data;
  };

  const getProductById = async (productId: any): Promise<Product> => {
    const url: string = `${resourceURL}/${productId}`;
    const response: AxiosResponse<Product> = await httpClient.get(url);

    return response.data;
  };

  const update = async (product: Product): Promise<void> => {
    const url: string = `${resourceURL}/${product.id}`;
    await httpClient.put<Product>(url, product);
  };

  const deleteProductById = async (productId: any): Promise<void> => {
    const url: string = `${resourceURL}/${productId}`;
    await httpClient.delete(url);
  };

  return {
    save,
    getProducts,
    getProductById,
    update,
    deleteProductById,
  };
};
