import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NextPage } from "next";

import { SaleForm } from "./form";
import { Sale } from "app/models/sales";
import { Layout } from "components";

export const RegisterSale: NextPage = () => {
  const handleSubmit = (sale: Sale) => {
    console.log(sale);
  };

  return (
    <Layout
      icon={<FontAwesomeIcon icon={["fas", "plus-square"]} />}
      title="Cadastrar Venda"
    >
      <SaleForm onSubmit={handleSubmit} />
    </Layout>
  );
};
