import { httpClient } from "app/http";
import { Sale } from "app/models/sales";

const resourceURL: string = "/api/sales";

export const useSaleService = () => {
  const save = async (sale: Sale): Promise<void> => {
    await httpClient.post<Sale>(resourceURL, sale);
  };

  return {
    save,
  };
};
