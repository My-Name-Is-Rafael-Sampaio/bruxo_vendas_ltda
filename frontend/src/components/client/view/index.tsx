import { useFormik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "primereact/button";
import { confirmDialog } from "primereact/confirmdialog";
import { Column } from "primereact/column";
import { DataTable, DataTablePageParams } from "primereact/datatable";
import type { NextPage } from "next";
import Link from "next/link";
import Router from "next/router";
import { useState } from "react";
import * as yup from "yup";

import { Client } from "app/models/clients";
import { Page } from "app/models/common/page";
import { useClientService } from "app/services";
import { Layout, Input, InputCpf } from "components";
import { Alert } from "components/common/message";

interface ConsultClientsForm {
  cpf?: string;
  name?: string;
}

const formSchema: Client = {
  cpf: "",
  name: "",
};

const validationSchema = yup.object().shape({
  cpf: yup.string().trim().length(14, "CPF Inválido!"),
  name: yup.string().trim(),
});

export const ViewClients: NextPage = () => {
  const service = useClientService();
  const [messages, setMessages] = useState<Array<Alert>>([]);

  const handleSubmit = (filter: ConsultClientsForm) => {
    handlePage(null);
  };

  const formik = useFormik<ConsultClientsForm>({
    initialValues: { ...formSchema },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [clients, setClients] = useState<Page<Client>>({
    content: [],
    size: 10,
    number: 0,
    totalElements: 0,
    first: 0,
  });

  const handlePage = (event: DataTablePageParams | null) => {
    setLoading(true);
    service
      .getClients(
        formik.values.cpf,
        formik.values.name,
        event?.page,
        event?.rows
      )
      .then((response) => {
        setClients({ ...response, first: event?.first! });
      })
      .finally(() => setLoading(false));
  };

  const deleteClient = (client: Client) => {
    service.deleteClientById(client.id).then((response) => {
      setMessages([
        {
          type: "success",
          text: "Cliente excluido com sucesso!",
        },
      ]);
      handlePage(null);
      setTimeout(() => {
        setMessages([]);
      }, 3000);
    });
  };

  const actionTemplate = (register: Client) => {
    const url = `/register/client?clientId=${register.id}`;

    return (
      <div className="p-fluid p-formgrid p-grid">
        <div className="p-field p-col-12 p-md-6">
          <Button
            icon="pi pi-pencil"
            className="p-button-rounded p-button-warning"
            onClick={(e) => Router.push(url)}
          />
        </div>
        <div className="p-field p-col-12 p-md-6">
          <Button
            icon="pi pi-trash"
            className="p-button-rounded p-button-danger"
            onClick={(e) => {
              confirmDialog({
                icon: "pi pi-exclamation-triangle",
                header: "Excluir",
                message: "Confirma a exclusão desse registro?",
                acceptLabel: "Sim",
                rejectLabel: "Não",
                accept: () => deleteClient(register),
              });
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <Layout
      icon={<FontAwesomeIcon icon={["fas", "list"]} />}
      title="Lista de Clientes"
      messages={messages}
    >
      <form action="" id="client-survey-form" onSubmit={formik.handleSubmit}>
        <div className="field is-grouped is-grouped-right">
          <div className="control">
            <Link href="/register/client" passHref>
              <button className="button is-success">
                <FontAwesomeIcon
                  icon={["fas", "plus-square"]}
                  className="icon"
                />
                <span className="label">Cadastrar</span>
              </button>
            </Link>
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field-body">
            <InputCpf
              type="text"
              id="clientCpf"
              name="cpf"
              label="CPF:"
              value={formik.values.cpf}
              onChange={formik.handleChange}
              autoComplete="off"
              colummnClasses="column is-6"
              fontAwesomeIcon={<FontAwesomeIcon icon={["fas", "id-card"]} />}
              placeholder="Insira o CPF do cliente para realizar a pesquisa"
              invalidInputMessage={formik.errors.cpf}
            />

            <Input
              type="text"
              id="clientName"
              name="name"
              label="Nome:"
              value={formik.values.name}
              onChange={formik.handleChange}
              autoComplete="off"
              colummnClasses="column is-6"
              fontAwesomeIcon={<FontAwesomeIcon icon={["fas", "user"]} />}
              placeholder="Insira o nome do cliente para realizar a pesquisa"
              invalidInputMessage={formik.errors.name}
            />
          </div>
        </div>
        <div className="field is-grouped is-grouped-right">
          <div className="control">
            <button className="button is-info" type="submit">
              <FontAwesomeIcon icon={["fas", "search"]} className="icon" />
              <span className="label">Pesquisar</span>
            </button>
          </div>
        </div>
      </form>
      <div className="datatable-clients">
        <div className="card">
          <DataTable
            header
            rowHover
            loading={loading}
            value={clients.content}
            emptyMessage="Nenhum Registro!"
            totalRecords={clients.totalElements}
            lazy
            paginator
            first={clients.first}
            rows={clients.size}
            onPage={handlePage}
            footer
          >
            <Column field="id" header="Id" />
            <Column field="cpf" header="Cpf" />
            <Column field="name" header="Nome" />
            <Column field="telephone" header="Telefone" />
            <Column field="email" header="E-mail" />
            <Column body={actionTemplate} />
          </DataTable>
        </div>
      </div>
    </Layout>
  );
};
