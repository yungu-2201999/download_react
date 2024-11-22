import { useTranslation } from "react-i18next";
import { Loading } from "react-vant";

import "./styles.css";

export const NoAppMask = ({ appId }: any) => {
  const { t } = useTranslation();

  return (
    <div className="noAppMask info">
      <div className="info2">
        <Loading size="40px" color="#1989fa" className="spinner" type="spinner" />
        <span className="mt-3 page_text">loading...</span>
        <span className="m-3 page_text">{t("noAppId_message", { appId })}</span>
      </div>
    </div>
  );
};
