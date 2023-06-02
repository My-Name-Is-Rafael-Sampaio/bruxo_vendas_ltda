import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NextPage } from "next";
import Router, { useRouter } from "next/router";
import { useState, useEffect } from "react";

import { ClientForm } from "./form";
import { Client } from "app/models/clients";
import { useClientService } from "app/services";
import { Alert } from "components/common/message";
import { Layout } from "components/layout";

export const RegisterClient: NextPage = () => {
  const service = useClientService();

  const router = useRouter();
  const { clientId } = router.query;

  const [client, setClient] = useState<Client>({});
  const [messages, setMessages] = useState<Array<Alert>>([]);

  const handleSubmit = (client: Client) => {
    if (client.id) {
      service.update(client).then((response) => {
        setMessages([
          {
            type: "success",
            text: "Cliente atualizado com sucesso!",
          },
        ]);
        setTimeout(() => {
          const url = `/view/clients`;
          Router.push(url);
        }, 3000);
      });
    } else {
      service.save(client).then((response) => {
        setMessages([
          {
            type: "success",
            text: "Cliente cadastrado com sucesso!",
          },
        ]);
        setTimeout(() => {
          const url = `/view/clients`;
          Router.push(url);
        }, 3000);
      });
    }
  };

  useEffect(() => {
    if (clientId) {
      service
        .getClientById(clientId)
        .then((clientFound) => setClient(clientFound));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientId]);

  return (
    <Layout
      icon={
        client.id ? (
          <FontAwesomeIcon icon={["fas", "edit"]} />
        ) : (
          <FontAwesomeIcon icon={["fas", "plus-square"]} />
        )
      }
      title={client.id ? "Atualizar Cliente" : "Cadastro de Cliente"}
      messages={messages}
    >
      <ClientForm client={client} onSubmit={handleSubmit} />
    </Layout>
  );
};
