import { useFormik } from "formik";
import {
  AutoComplete,
  AutoCompleteCompleteMethodParams,
  AutoCompleteChangeParams,
} from "primereact/autocomplete";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import * as yup from "yup";

import { Client } from "app/models/clients";
import { Product } from "app/models/products";
import { Page } from "app/models/common/page";
import { Sale, SaleItem } from "app/models/sales";
import { useClientService, useProductService } from "app/services";

interface SaleFormProps {
  onSubmit: (sale: Sale) => void;
}

const formSchema: Sale = {
  client: null,
  items: [],
  paymentType: "",
  amount: 0,
};

export const SaleForm: React.FC<SaleFormProps> = ({ onSubmit }) => {
  const clientService = useClientService();
  const productService = useProductService();

  const [clientList, setClientList] = useState<Page<Client>>({
    content: [],
    size: 0,
    number: 0,
    totalElements: 0,
    first: 0,
  });
  const [productList, setProductList] = useState<Product[]>([]);
  const [filteredProductList, setFilteredProductList] = useState<Product[]>([]);
  const [productId, setProductId] = useState<number>(0);
  const [product, setProduct] = useState<Product | null>(null);
  const [productQuantity, setProductQuantity] = useState<number>(0);
  const [productNotFoundErrorMessage, setProductNotFoundErrorMessage] =
    useState<string>("");

  const paymentType: String[] = ["BOLETO", "CARTAO", "PIX"];

  const validationSchema = yup.object().shape({
    client: yup.object().nullable(true).required("Campo obrigatório!"),
    items: yup.array().min(1, "É necessário adicionar 1 item!"),
    paymentType: yup.string().trim().required("Campo obrigatório!"),
  });

  const formik = useFormik<Sale>({
    initialValues: formSchema,
    enableReinitialize: true,
    onSubmit,
    validationSchema: validationSchema,
  });

  const handleAutoCompleteClient = (
    event: AutoCompleteCompleteMethodParams
  ) => {
    const clientName = event.query;

    clientService
      .getClients("", clientName, 0, 20)
      .then((response) => setClientList(response));
  };

  const handleOnChangeClient = (event: AutoCompleteChangeParams) => {
    const selectedClient: Client = event.value;

    formik.setFieldValue("client", selectedClient);
  };

  const handleAutoCompleteProduct = async (
    event: AutoCompleteCompleteMethodParams
  ) => {
    const productName = event.query;

    if (!productList.length) {
      const response = await productService.getProducts();

      setProductList(response);
    }

    const foundProducts = productList.filter((product: Product) => {
      return product.name?.includes(productName);
    });

    setFilteredProductList(foundProducts);
  };

  const handleProductIdSelect = () => {
    if (productId) {
      productService
        .getProductById(productId)
        .then((response) => setProduct(response))
        .catch((error) => {
          setProductNotFoundErrorMessage(
            "ID incorreto! Esse produto não existe."
          );
        });
    }
  };

  const disableAddProductButton = () => {
    return !product || !productQuantity;
  };

  const handleAddProduct = () => {
    const addedItems = formik.values.items;

    const itemAlreadyOnSale = addedItems?.some((saleItem: SaleItem) => {
      return saleItem.product.id === product?.id;
    });

    if (itemAlreadyOnSale) {
      addedItems?.forEach((saleItem: SaleItem) => {
        if (saleItem.product.id === product?.id) {
          saleItem.quantity = saleItem.quantity + productQuantity;
        }
      });
    } else {
      addedItems?.push({
        product: product!,
        quantity: productQuantity,
      });
    }

    setProductId(0);
    setProduct(null);
    setProductQuantity(0);

    const unformattedSaleTotal = totalSaleValue();
    const totalSaleFormatted = moneyFormatter.format(unformattedSaleTotal);
    formik.setFieldValue("amount", totalSaleFormatted);
  };

  const handleCloseDialogProductNotFound = () => {
    setProductId(0);
    setProduct(null);
    setProductNotFoundErrorMessage("");
  };

  const dialogMessageFooter = () => {
    return (
      <div className="p-grid p-justify-end">
        <Button
          label="Fechar"
          icon="pi pi-times"
          onClick={handleCloseDialogProductNotFound}
        />
      </div>
    );
  };

  const deleteItemButton = (item: SaleItem) => {
    const handleRemoveItem = () => {
      const newProductList = formik.values.items?.filter(
        (saleItem) => saleItem.product.id !== item.product.id
      );

      formik.setFieldValue("items", newProductList);
    };

    return (
      <Button
        icon="pi pi-trash"
        type="button"
        className="p-button-rounded p-button-danger"
        onClick={handleRemoveItem}
      />
    );
  };

  const moneyFormatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const unitPrice = (saleItem: SaleItem) => {
    const unformattedPrice = saleItem.product.price;
    const formattedPrice = moneyFormatter.format(unformattedPrice!);

    return <div className="unit-price">{formattedPrice}</div>;
  };

  const calculatingProductPrice = (saleItem: SaleItem) => {
    const unformattedPrice = saleItem.product.price! * saleItem.quantity;
    const formattedPrice = moneyFormatter.format(unformattedPrice);

    return <div className="calculating-product-price">{formattedPrice}</div>;
  };

  const totalSaleValue = () => {
    const amount: number[] | undefined = formik.values.items?.map(
      (saleItem) => saleItem.quantity * saleItem.product.price!
    );

    if (amount?.length) {
      return amount.reduce(
        (currentSum = 0, currentItemValue) => currentSum + currentItemValue
      );
    } else {
      return 0;
    }
  };

  return (
    <form action="" onSubmit={formik.handleSubmit}>
      <div className="clientInformation">
        <div className="labelClientInformation">
          <label id="clientLabel" htmlFor="clientLabel">
            <strong>Cliente: *</strong>
          </label>
        </div>
        <div className="p-fluid">
          <div className="p-field">
            <AutoComplete
              id="autoCompleteClient"
              name="autoCompleteClient"
              field="name"
              suggestions={clientList.content}
              completeMethod={handleAutoCompleteClient}
              value={formik.values.client}
              onChange={handleOnChangeClient}
              placeholder="Digite o nome do cliente"
            />
            <small id="autoCompleteClientErro" className="p-error p-d-block">
              {formik.touched && formik.errors.client}
            </small>
          </div>
        </div>
      </div>
      <div className="productInformation">
        <div className="labelProductInformation">
          <label id="productLabel" htmlFor="productLabel">
            <strong>Produto: *</strong>
          </label>
        </div>
        <div className="p-fluid p-formgrid p-grid">
          <div className="p-field p-col-12 p-md-2">
            <span className="p-float-label">
              <InputNumber
                id="productId"
                value={productId}
                onBlur={handleProductIdSelect}
                onValueChange={(e) => setProductId(e.value)}
                mode="decimal"
                showButtons
                useGrouping={false}
              />
              <label htmlFor="productId">ID</label>
            </span>
          </div>
          <div className="p-field p-col-12 p-md-6">
            <AutoComplete
              id="productName"
              name="productName"
              field="name"
              suggestions={filteredProductList}
              completeMethod={handleAutoCompleteProduct}
              value={product}
              onChange={(e) => setProduct(e.value)}
              placeholder="Nome do produto"
            />
          </div>
          <div className="p-field p-col-12 p-md-2">
            <span className="p-float-label">
              <InputNumber
                id="productQuantity"
                value={productQuantity}
                onValueChange={(e) => setProductQuantity(e.value)}
                mode="decimal"
                showButtons
                min={0}
                max={100}
              />
              <label htmlFor="productQuantity">QTD</label>
            </span>
          </div>
          <Dialog
            header="Alerta!"
            position="top"
            modal
            style={{ width: "50vw" }}
            draggable={false}
            resizable={false}
            visible={!!productNotFoundErrorMessage}
            onHide={handleCloseDialogProductNotFound}
            footer={dialogMessageFooter}
          >
            {productNotFoundErrorMessage}
          </Dialog>
          <div className="p-field p-col-12 p-md-2">
            <Button
              type="button"
              label="Adicionar"
              onClick={handleAddProduct}
              disabled={disableAddProductButton()}
            />
          </div>
        </div>
        <div className="p-fluid">
          <div className="p-field">
            <DataTable
              header
              rowHover
              emptyMessage="Nenhum produto foi adicionado!"
              value={formik.values.items}
              footer
            >
              <Column header="Ação" body={deleteItemButton} />
              <Column field="product.id" header="ID" />
              <Column
                field="product.barCode"
                header="Código de Barras"
              />
              <Column field="product.name" header="Produto" />
              <Column header="Preço Unitário" body={unitPrice} />
              <Column field="quantity" header="Quantidade" />
              <Column header="Total" body={calculatingProductPrice} />
            </DataTable>
            <small id="dataTableErro" className="p-error p-d-block">
              {formik.touched && formik.errors.items}
            </small>
          </div>
        </div>
        <div className="p-fluid p-formgrid p-grid">
          <div className="p-field p-col-12 p-md-2"></div>
        </div>
      </div>
      <div className="saleInformation">
        <div className="p-fluid p-formgrid p-grid">
          <div className="p-field p-col-12 p-md-4">
            <div className="labelpaymentType">
              <label id="paymentTypeLabel" htmlFor="paymentTypeLabel">
                <strong>Forma de Pagamento: *</strong>
              </label>
            </div>
            <Dropdown
              id="formPayment"
              options={paymentType}
              value={formik.values.paymentType}
              onChange={(e) => formik.setFieldValue("paymentType", e.value)}
              placeholder="Selecione..."
            />
            <small id="dataTableErro" className="p-error p-d-block">
              {formik.touched && formik.errors.paymentType}
            </small>
          </div>
          <div className="p-field p-col-12 p-md-4">
            <div className="labelQuantityItems">
              <label id="quantityItemsLabel" htmlFor="quantityItemsLabel">
                <strong>Itens:</strong>
              </label>
            </div>
            <InputNumber
              id="quantityItems"
              value={formik.values.items?.length}
              mode="decimal"
              useGrouping={false}
              disabled
            />
          </div>
          <div className="p-field p-col-12 p-md-4">
            <div className="labelTotalValue">
              <label id="totalValueLabel" htmlFor="totalValueLabel">
                <strong>Valor Total:</strong>
              </label>
            </div>
            <InputText id="totalValue" value={formik.values.amount} disabled />
          </div>
        </div>
      </div>
      <div className="p-fluid">
        <div className="p-field">
          <Button type="submit" label="Finalizar" />
        </div>
      </div>
    </form>
  );
};
