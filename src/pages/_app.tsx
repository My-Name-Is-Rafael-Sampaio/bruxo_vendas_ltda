import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import type { AppProps } from "next/app";

import "./styles.css";
import "bulma/css/bulma.css";
import "components/common/loader/styles.css";
import "components/client/view/styles.css";
import "components/sale/register/styles.css";
import "primeicons/primeicons.css";
import 'primeflex/primeflex.css';
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/md-light-indigo/theme.css";

library.add(fab, far, fas);

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
