import { AxiosResponse } from "axios";

import { httpClient } from "app/http";
import { Client } from "app/models/clients";
import { Page } from "app/models/common/page";

const resourceURL: string = "/api/clients";

export const useClientService = () => {
  const save = async (client: Client): Promise<Client> => {
    const response: AxiosResponse<Client> = await httpClient.post<Client>(
      resourceURL,
      client
    );
    return response.data;
  };

  const getClients = async (
    clientCpf: string = "",
    clientName: string = "",
    page: number = 0,
    size: number = 10
  ): Promise<Page<Client>> => {
    const url: string = `${resourceURL}?clientCpf=${clientCpf}&clientName=${clientName}&page=${page}&size=${size}`;
    const response: AxiosResponse<Page<Client>> = await httpClient.get(url);
    return response.data;
  };

  const getClientById = async (clientId: any): Promise<Client> => {
    const url: string = `${resourceURL}/${clientId}`;
    const response: AxiosResponse<Client> = await httpClient.get(url);
    return response.data;
  };

  const update = async (client: Client): Promise<void> => {
    const url: string = `${resourceURL}/${client.id}`;
    await httpClient.put<Client>(url, client);
  };

  const deleteClientById = async (clientId: any): Promise<void> => {
    const url: string = `${resourceURL}/${clientId}`;
    await httpClient.delete(url);
  };

  return {
    save,
    getClients,
    getClientById,
    update,
    deleteClientById,
  };
};
