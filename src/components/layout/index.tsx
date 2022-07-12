import { ReactNode } from "react";

import { SideMenu } from "./sideMenu";
import { Message } from "components";
import { Alert } from "components/common/message";

interface LayoutProps {
  icon?: ReactNode;
  title?: string;
  children?: ReactNode;
  messages?: Array<Alert>;
}

export const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
  return (
    <div className="app">
      <section className="main-content columns is-fullheight">
        <SideMenu />
        <div className="container column is-10">
          <div className="section">
            <div className="card">
              <div className="card-header">
                <p className="card-header-title">
                  <span id="icon">{props.icon}</span>
                  <span id="title">{props.title}</span>
                </p>
              </div>
              <div className="card-content">
                <div className="content">
                  {props.messages &&
                    props.messages.map((msg) => (
                      <Message key={props.title} {...msg} />
                    ))}
                  {props.children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
