import styles from "./Header.module.scss";

interface IHeaderProps {
  title: string;
}

export function Header({ title }: IHeaderProps) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
    </header>
  );
}
