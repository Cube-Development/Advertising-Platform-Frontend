import styles from "./styles.module.scss";

export const SuspenseLoader = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.loader}></div>
      <div className={styles.text}>Blogix</div>
    </div>
  );
};
