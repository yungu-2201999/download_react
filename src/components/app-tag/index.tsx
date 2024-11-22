import styles from "./appTag.module.css";

type AppTagProps = {
  content: string;
};
const AppTag = (params: AppTagProps) => {
  if (params.content === "") return null;
  return <div className={styles["app-tag"]}>{params.content}</div>;
};

export default AppTag;
