import { useFormik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import * as yup from "yup";

import { Client } from "app/models/clients";
import { Input, InputCpf, InputPhone, InputDate } from "components/common";

interface ClientFormProps {
  client: Client;
  onSubmit: (client: Client) => void;
}

const formSchema: Client = {
  id: "",
  cpf: "",
  name: "",
  birthDate: "",
  address: "",
  telephone: "",
  email: "",
  dateRegister: "",
};

const msgRequiredField = "Campo obrigatório!";

const validationSchema = yup.object().shape({
  cpf: yup
    .string()
    .trim()
    .required(msgRequiredField)
    .length(14, "CPF Inválido!"),
  name: yup.string().trim().required(msgRequiredField),
  birthDate: yup
    .string()
    .trim()
    .required(msgRequiredField)
    .length(10, "Data Inválida!"),
  address: yup.string().trim().required(msgRequiredField),
  telephone: yup.string().trim().required(msgRequiredField),
  email: yup
    .string()
    .trim()
    .required(msgRequiredField)
    .email("E-mail Inválido!"),
});

export const ClientForm: React.FC<ClientFormProps> = ({ client, onSubmit }) => {
  const formik = useFormik<Client>({
    initialValues: { ...formSchema, ...client },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit,
  });

  return (
    <form action="" onSubmit={formik.handleSubmit}>
      {formik.values.id && (
        <div className="field is-horizontal">
          <div className="field-body">
            <Input
              type="text"
              id="clientId"
              name="id"
              label="ID:"
              value={formik.values.id}
              disabled={true}
              colummnClasses="column is-6"
              fontAwesomeIcon={<FontAwesomeIcon icon={["fas", "list-ol"]} />}
            />

            <Input
              type="text"
              id="clientDateRegister"
              name="dateRegister"
              label="Data de Cadastro:"
              value={formik.values.dateRegister}
              disabled={true}
              colummnClasses="column is-6"
              fontAwesomeIcon={
                <FontAwesomeIcon icon={["fas", "calendar-alt"]} />
              }
            />
          </div>
        </div>
      )}
      <div className="field is-horizontal">
        <div className="field-body">
          <InputCpf
            type="text"
            id="clientCpf"
            name="cpf"
            label="CPF: *"
            value={formik.values.cpf}
            onChange={formik.handleChange}
            autoComplete="off"
            colummnClasses="column is-6"
            fontAwesomeIcon={<FontAwesomeIcon icon={["fas", "id-card"]} />}
            placeholder="Insira o CPF do cliente"
            invalidInputMessage={formik.errors.cpf}
          />

          <Input
            type="text"
            id="clientName"
            name="name"
            label="Nome: *"
            value={formik.values.name}
            onChange={formik.handleChange}
            autoComplete="off"
            colummnClasses="column is-6"
            fontAwesomeIcon={<FontAwesomeIcon icon={["fas", "user"]} />}
            placeholder="Insira o nome do cliente"
            invalidInputMessage={formik.errors.name}
          />
        </div>
      </div>
      <div className="field is-horizontal">
        <div className="field-body">
          <InputDate
            type="type"
            id="clientBirthDate"
            name="birthDate"
            label="Data de Aniversário: *"
            value={formik.values.birthDate}
            onChange={formik.handleChange}
            autoComplete="off"
            colummnClasses="column is-6"
            fontAwesomeIcon={<FontAwesomeIcon icon={["fas", "calendar-alt"]} />}
            placeholder="01/01/2000"
            invalidInputMessage={formik.errors.birthDate}
          />

          <Input
            type="text"
            id="clientAddress"
            name="address"
            label="Endereço: *"
            value={formik.values.address}
            onChange={formik.handleChange}
            autoComplete="off"
            colummnClasses="column is-6"
            fontAwesomeIcon={
              <FontAwesomeIcon icon={["fas", "map-marker-alt"]} />
            }
            placeholder="Insira o endereço do cliente"
            invalidInputMessage={formik.errors.address}
          />
        </div>
      </div>
      <div className="field is-horizontal">
        <div className="field-body">
          <InputPhone
            type="text"
            id="clientTelephone"
            name="telephone"
            label="Telefone: *"
            value={formik.values.telephone}
            onChange={formik.handleChange}
            autoComplete="off"
            colummnClasses="column is-6"
            fontAwesomeIcon={<FontAwesomeIcon icon={["fas", "mobile-alt"]} />}
            placeholder="Insira o número de telefone celular do cliente"
            invalidInputMessage={formik.errors.telephone}
          />

          <Input
            type="text"
            id="clientEmail"
            name="email"
            label="E-mail: *"
            value={formik.values.email}
            onChange={formik.handleChange}
            autoComplete="off"
            colummnClasses="column is-6"
            fontAwesomeIcon={<FontAwesomeIcon icon={["fas", "envelope"]} />}
            placeholder="Insira o e-mail do cliente"
            invalidInputMessage={formik.errors.email}
          />
        </div>
      </div>
      <div className="field is-horizontal">
        <div className="field-body">
          <div className="field column is-12">
            <div className="field is-grouped is-grouped-right">
              <div className="control">
                {formik.values.id ? (
                  <button className="button is-warning" type="submit">
                    <FontAwesomeIcon icon={["fas", "save"]} className="icon" />
                    <span className="label">Atualizar</span>
                  </button>
                ) : (
                  <button className="button is-primary" type="submit">
                    <FontAwesomeIcon icon={["fas", "save"]} className="icon" />
                    <span className="label">Salvar</span>
                  </button>
                )}
              </div>
              <div className="control">
                <Link href="/view/clients" passHref>
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
  );
};
