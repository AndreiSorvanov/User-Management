import React from "react";
import styles from "./Content.module.scss";

interface IContentProps {
  children?: React.ReactNode;
}

export function Content({ children }: IContentProps) {
  return <main className={styles.content}>{children}</main>;
}
