import { useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.scss";

interface IModal {
  children: React.ReactNode;
}

export function Modal({ children }: IModal) {
  const node = document.querySelector("#modal");

  useEffect(() => {
    const body = document.body;
    const root = document.querySelector("#root");

    if (node) {
      body.style.overflow = "hidden";
      root?.classList.add(styles.inactive);
    }

    return () => {
      body.style.removeProperty("overflow");
      root?.classList.remove(styles.inactive);
    };
  }, [node]);

  if (!node) return null;

  return ReactDOM.createPortal(
    <div className={styles.modal} role="dialog" aria-modal="true">
      <div className={styles.content}>{children}</div>
    </div>,
    node
  );
}
