import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NextPage } from "next";
import { useState } from "react";

import { SaleForm } from "./form";
import { Sale } from "app/models/sales";
import { useSaleService } from "app/services";
import { Layout } from "components";
import { Alert } from "components/common/message";

export const RegisterSale: NextPage = () => {
  const service = useSaleService();

  const [messages, setMessages] = useState<Array<Alert>>([]);

  const handleSubmit = (sale: Sale) => {
    service
      .save(sale)
      .then((response) => {
        setMessages([
          {
            type: "success",
            text: "Venda realizada com sucesso!",
          },
        ]);
      })
      .catch((error) => {
        setMessages([
          {
            type: "danger",
            text: "Ocorreu um erro! Tente novamente, caso o erro persista entre em contato com a administração.",
          },
        ]);
      });
  };

  return (
    <Layout
      icon={<FontAwesomeIcon icon={["fas", "plus-square"]} />}
      title="Cadastrar Venda"
      messages={messages}
    >
      <SaleForm onSubmit={handleSubmit} />
    </Layout>
  );
};
