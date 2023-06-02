import Image from "next/image";

import logo from "../../../assets/logo.png";

export const Logo: React.FC = () => {
  return (
    <div className="logo">
      <figure className="image is-128x128">
        <Image className="is-rounded" src={logo} />
      </figure>
    </div>
  );
};
