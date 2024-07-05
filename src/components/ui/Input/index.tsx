import styles from "./Input.module.scss";

type PropsType = {
  label?: string;
  name: string;
  type: string;
  placeholder?: string;
  defaultValue?: string | number;
  className?: string;
  disable?: boolean;
};

const Input = (props: PropsType) => {
  const { label, name, type, placeholder, defaultValue, className, disable } =
    props;

  return (
    <div className={`${styles.container} ${className}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        name={name}
        id={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        disabled={disable}
        className={styles.container__input}
      ></input>
    </div>
  );
};

export default Input;
