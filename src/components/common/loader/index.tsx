import React from "react";

interface LoaderProps {
  show: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ show }) => {
  if (!show) return <React.Fragment></React.Fragment>;
  return (
    <div className="external-loader field is-grouped is-grouped-centered">
      <div className="control">
        <div className="internal-loader">
          <div className="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};
