import { AxiosResponse } from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { NextPage } from "next";
import Link from "next/link";
import Router from "next/router";
import { useState, useEffect } from "react";
import useSWR from "swr";

import { ProductTable } from "./table";
import { httpClient } from "app/http";
import { Product } from "app/models/products";
import { useProductService } from "app/services";
import { Layout, Loader } from "components";
import { Alert } from "components/common/message";

export const ViewProducts: NextPage = () => {
  const service = useProductService();

  const [productList, setProductList] = useState<Product[]>([]);
  const [messages, setMessages] = useState<Array<Alert>>([]);

  const { data: response, error } = useSWR<AxiosResponse<Product[]>>(
    "/api/products",
    (url) => httpClient.get(url)
  );

  const editProduct = (product: Product) => {
    const url = `/register/product?productId=${product.id}`;
    Router.push(url);
  };

  const deleteProduct = (product: Product) => {
    service.deleteProductById(product.id).then((response) => {
      setMessages([
        {
          type: "success",
          text: "Produto excluido com sucesso!",
        },
      ]);
      const productListChanged: Product[] = productList?.filter(
        (p) => p.id != product.id
      );
      setProductList(productListChanged);
      setTimeout(() => {
        setMessages([]);
      }, 3000);
    });
  };

  useEffect(() => {
    setProductList(response?.data || []);
  }, [response]);

  return (
    <Layout
      icon={<FontAwesomeIcon icon={["fas", "list"]} />}
      title="Lista de Produtos"
      messages={messages}
    >
      {error ? (
        <article className="message is-danger">
          <div className="message-body">
            Falha ao carregar os dados! Tente novamente.
          </div>
        </article>
      ) : !response ? (
        <Loader show={true} />
      ) : (
        <div className="layout-information">
          <div className="field is-grouped is-grouped-right">
            <div className="control">
              <Link href="/register/product" passHref>
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
          <ProductTable
            products={productList}
            onEdit={editProduct}
            onDelete={deleteProduct}
          />
        </div>
      )}
    </Layout>
  );
};
