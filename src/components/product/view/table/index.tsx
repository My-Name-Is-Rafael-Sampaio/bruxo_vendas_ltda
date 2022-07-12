import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

import { Product } from "app/models/products";

interface ProductsTableProps {
  products: Array<Product>;
  onEdit: (product: any) => void;
  onDelete: (product: any) => void;
}

export const ProductTable: React.FC<ProductsTableProps> = ({
  products,
  onEdit,
  onDelete,
}) => {
  return (
    <table className="table is-bordered is-hoverable">
      <thead>
        <tr>
          <th>Id</th>
          <th>Código de Barras</th>
          <th>Nome</th>
          <th>Preço</th>
          <th>Data de Cadastro</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <ProductRow
            key={product.id}
            product={product}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
};

interface ProductRowProps {
  product: Product;
  onEdit: (product: any) => void;
  onDelete: (product: any) => void;
}

const ProductRow: React.FC<ProductRowProps> = ({
  product,
  onEdit,
  onDelete,
}) => {
  const [deleteProduct, setDeleteProduct] = useState<boolean>(false);

  const moneyFormatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const onDeleteClick = (product: Product) => {
    if (deleteProduct) {
      onDelete(product);
      setDeleteProduct(false);
    } else {
      setDeleteProduct(true);
    }
  };

  const cancelDelete = () => setDeleteProduct(false);

  return (
    <tr>
      <th>{product.id}</th>
      <td>{product.barCode}</td>
      <td>{product.name}</td>
      <td>{moneyFormatter.format(product.price!)}</td>
      <td>{product.dateRegister}</td>
      <td>
        <div className="field is-grouped is-grouped-right">
          {!deleteProduct && (
            <div className="control">
              <button
                className="button is-warning is-rounded is-small"
                onClick={(e) => onEdit(product)}
              >
                <FontAwesomeIcon icon={["fas", "edit"]} className="icon" />
                <span className="label">Editar</span>
              </button>
            </div>
          )}
          <div className="control">
            {deleteProduct ? (
              <button
                className="button is-danger is-rounded is-small"
                onClick={(e) => onDeleteClick(product)}
              >
                <FontAwesomeIcon icon={["fas", "trash"]} className="icon" />
                <span className="label">Confirmar</span>
              </button>
            ) : (
              <button
                className="button is-danger is-rounded is-small"
                onClick={(e) => onDeleteClick(product)}
              >
                <FontAwesomeIcon icon={["fas", "trash"]} className="icon" />
                <span className="label">Deletar</span>
              </button>
            )}
          </div>
          {deleteProduct && (
            <div className="control">
              <button
                className="button is-success is-rounded is-small"
                onClick={cancelDelete}
              >
                <FontAwesomeIcon icon={["fas", "ban"]} className="icon" />
                <span className="label">Cancelar</span>
              </button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};
