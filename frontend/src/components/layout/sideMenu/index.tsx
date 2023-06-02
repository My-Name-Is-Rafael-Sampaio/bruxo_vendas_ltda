import Link from "next/link";

import { Logo } from "../logo";

export const SideMenu: React.FC = () => {
  return (
    <aside className="column is-2 is-narrow-mobile is-fullheight section is-hidden-mobile">
      <Logo />
      <p className="menu-label is-hidden-touch">Bruxo Vendas</p>
      <ul className="menu-list">
        <SideMenuItens href="/" label="Home" />
        <SideMenuItens href="/view/clients" label="Clientes" />
        <SideMenuItens href="/view/products" label="Produtos" />
        <SideMenuItens href="/register/sale" label="Loja" />
        <SideMenuItens href="/" label="Sair" />
      </ul>
    </aside>
  );
};

interface SideMenuItensProps {
  href: string;
  label: string;
}

const SideMenuItens: React.FC<SideMenuItensProps> = (
  props: SideMenuItensProps
) => {
  return (
    <li>
      <Link href={props.href}>
        <a>
          <span className="icon"></span> {props.label}
        </a>
      </Link>
    </li>
  );
};
