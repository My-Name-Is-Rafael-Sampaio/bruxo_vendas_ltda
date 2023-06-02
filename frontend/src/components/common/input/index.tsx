import { InputHTMLAttributes, ReactNode } from "react";
import { FormatUtils } from "@4us-dev/utils";

import { formatReal } from "app/util/money";

const formatUtils = new FormatUtils();

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  colummnClasses?: string;
  id: string;
  label: string;
  fontAwesomeIcon: ReactNode;
  invalidInputMessage?: string;
  formatter?: (value: string) => string;
}

export const Input: React.FC<InputProps> = ({
  colummnClasses,
  id,
  label,
  fontAwesomeIcon,
  invalidInputMessage,
  formatter,
  onChange,
  ...props
}: InputProps) => {
  const onInputChange = (event: any) => {
    const fieldValue = event.target.value;
    const fieldName = event.target.name;

    const formattedValue =
      (formatter && formatter(fieldValue as string)) || fieldValue;

    onChange!({
      ...event,
      target: {
        name: fieldName,
        value: formattedValue,
      },
    });
  };

  return (
    <div className={`field ${colummnClasses}`}>
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <p className="control has-icons-left">
        <input className="input" id={id} {...props} onChange={onInputChange} />
        <span className="icon is-small is-left">{fontAwesomeIcon}</span>
        {invalidInputMessage && (
          <p className="help is-danger">{invalidInputMessage}</p>
        )}
      </p>
    </div>
  );
};

export const InputMoney: React.FC<InputProps> = (props: InputProps) => {
  return <Input {...props} formatter={formatReal} />;
};

export const InputCpf: React.FC<InputProps> = (props: InputProps) => {
  return <Input {...props} formatter={formatUtils.formatCPF} />;
};

export const InputPhone: React.FC<InputProps> = (props: InputProps) => {
  return <Input {...props} formatter={formatUtils.formatPhone} />;
};

export const InputDate: React.FC<InputProps> = (props: InputProps) => {
  const formatDate = (value: string): string => {
    if (!value) {
      return "";
    }

    const date = formatUtils.formatOnlyIntegers(value);
    const sizeValue = value.length;

    let formattedDate = "";

    if (sizeValue <= 2) {
      return (formattedDate = date);
    } else if (sizeValue <= 4) {
      return (formattedDate = `${date.substr(0, 2)}/${date.substr(2, 2)}`);
    } else if (sizeValue <= 6) {
      return (formattedDate = `${date.substr(0, 2)}/${date.substr(
        2,
        2
      )}/${date.substr(4, 2)}`);
    }

    return formattedDate;
  };

  return <Input {...props} maxLength={10} formatter={formatDate} />;
};
