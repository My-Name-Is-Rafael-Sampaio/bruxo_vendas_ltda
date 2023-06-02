import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { NextPage } from "next";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { useState, useEffect } from "react";
import * as yup from "yup";

import { Product } from "app/models/products";
import { useProductService } from "app/services";
import { convertToBigDecimal, formatReal } from "app/util/money";
import { Layout, Input, InputMoney } from "components";
import { Alert } from "components/common/message";

const msgRequiredField = "Campo obrigatório!";

const validationSchema = yup.object().shape({
  barCode: yup
    .string()
    .trim()
    .required(msgRequiredField)
    .length(20, "Deve conter extamente 20 caracteres!"),
  name: yup
    .string()
    .trim()
    .required(msgRequiredField)
    .min(5, "Informações insuficientes! Mínimo de 5 caracteres.")
    .max(100, "Informações excessivas! Máximo de 100 caracteres."),
  price: yup
    .number()
    .required(msgRequiredField)
    .moreThan(0, "O valor precisa ser superior à R$ 0,00 ."),
  description: yup
    .string()
    .trim()
    .required(msgRequiredField)
    .min(20, "Informações insuficientes! Mínimo de 20 caracteres.")
    .max(255, "Informações excessivas! Máximo de 255 caracteres."),
});

interface FormFieldsErrors {
  barCode?: string;
  name?: string;
  price?: string;
  description?: string;
}

export const RegisterProduct: NextPage = () => {
  const service = useProductService();

  const router = useRouter();
  const { productId: queryProductId } = router.query;

  const [productId, setProductId] = useState<string>("");
  const [productBarCode, setProductBarCode] = useState<string>("");
  const [productName, setProductName] = useState<string>("");
  const [productPrice, setProductPrice] = useState<string>("");
  const [productDescription, setProductDescription] = useState<string>("");
  const [productDateRegister, setProductDateRegister] = useState<string>("");

  const [messages, setMessages] = useState<Array<Alert>>([]);
  const [errorMessages, setErrorMessages] = useState<FormFieldsErrors>({});

  const submit = (event: any) => {
    event.preventDefault();

    const product: Product = {
      id: productId,
      barCode: productBarCode,
      name: productName,
      price: convertToBigDecimal(productPrice),
      description: productDescription,
    };

    validationSchema
      .validate(product)
      .then((obj) => {
        setErrorMessages({});
        if (productId) {
          service.update(product).then((response) => {
            setMessages([
              {
                type: "success",
                text: "Produto atualizado com sucesso!",
              },
            ]);
            setTimeout(() => {
              const url = `/view/products`;
              Router.push(url);
            }, 3000);
          });
        } else {
          service.save(product).then((response) => {
            setMessages([
              {
                type: "success",
                text: "Produto cadastrado com sucesso!",
              },
            ]);
            setTimeout(() => {
              const url = `/view/products`;
              Router.push(url);
            }, 3000);
          });
        }
      })
      .catch((err) => {
        const invalidField = err.path;
        const errorMessage = err.message;

        setErrorMessages({
          [invalidField]: errorMessage,
        });
      });
  };

  useEffect(() => {
    if (queryProductId) {
      service.getProductById(queryProductId).then((productFound) => {
        setProductId(productFound.id!);
        setProductBarCode(productFound.barCode!);
        setProductName(productFound.name!);
        const formattedPrice = formatReal(`${productFound.price!}`);
        setProductPrice(formattedPrice);

        setProductDescription(productFound.description!);
        setProductDateRegister(productFound.dateRegister!);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryProductId]);

  return (
    <Layout
      icon={
        productId ? (
          <FontAwesomeIcon icon={["fas", "edit"]} />
        ) : (
          <FontAwesomeIcon icon={["fas", "plus-square"]} />
        )
      }
      title={productId ? "Atualizar Produto" : "Cadastro de Produto"}
      messages={messages}
    >
      <form action="">
        {productId && (
          <div className="field is-horizontal">
            <div className="field-body">
              <Input
                colummnClasses="column is-6"
                type="text"
                id="inputProductId"
                label="Id:"
                value={productId}
                disabled={true}
                fontAwesomeIcon={<FontAwesomeIcon icon={["fas", "list-ol"]} />}
              />

              <Input
                colummnClasses="column is-6"
                type="text"
                id="inputProductDateRegister"
                label="Data de Cadastro:"
                value={productDateRegister}
                disabled={true}
                fontAwesomeIcon={
                  <FontAwesomeIcon icon={["fas", "calendar-alt"]} />
                }
              />
            </div>
          </div>
        )}
        <div className="field is-horizontal">
          <div className="field-body">
            <Input
              colummnClasses="column is-6"
              type="text"
              id="inputBarCode"
              label="Código de Barras: *"
              value={productBarCode}
              onChange={(e) => setProductBarCode(e.target.value)}
              placeholder="Insira o código do produto"
              fontAwesomeIcon={<FontAwesomeIcon icon={["fas", "barcode"]} />}
              invalidInputMessage={errorMessages.barCode}
            />

            <Input
              colummnClasses="column is-6"
              type="text"
              id="inputProductName"
              label="Nome: *"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Insira o nome do produto"
              fontAwesomeIcon={
                <FontAwesomeIcon icon={["fas", "file-signature"]} />
              }
              invalidInputMessage={errorMessages.name}
            />
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field-body">
            <InputMoney
              colummnClasses="column is-6"
              type="text"
              id="inputPrice"
              label="Preço: *"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              placeholder="Insira o preço do produto"
              fontAwesomeIcon={<FontAwesomeIcon icon={["fas", "tag"]} />}
              maxLength={16}
              invalidInputMessage={errorMessages.price}
            />

            <div className="field column is-6">
              <label className="label" htmlFor="inputDescription">
                Descrição: *
              </label>
              <div className="control">
                <textarea
                  className="textarea"
                  id="inputDescription"
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  placeholder="Digite aqui as informações do produto"
                />
                {errorMessages.description && (
                  <p className="help is-danger">
                    {errorMessages.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field-body">
            <div className="field column is-12">
              <div className="field is-grouped is-grouped-right">
                <div className="control">
                  {productId ? (
                    <button className="button is-warning" onClick={submit}>
                      <FontAwesomeIcon
                        icon={["fas", "save"]}
                        className="icon"
                      />
                      <span className="label">Atualizar</span>
                    </button>
                  ) : (
                    <button className="button is-primary" onClick={submit}>
                      <FontAwesomeIcon
                        icon={["fas", "save"]}
                        className="icon"
                      />
                      <span className="label">Salvar</span>
                    </button>
                  )}
                </div>
                <div className="control">
                  <Link href="/view/products" passHref>
                    <button className="button is-link is-light">
                      <FontAwesomeIcon
                        icon={["fas", "long-arrow-alt-left"]}
                        className="icon"
                      />
                      <span className="label">Voltar</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Layout>
  );
};
