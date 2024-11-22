import { useTranslation } from "react-i18next";
import { Loading } from "react-vant";

import "./styles.css";

type ApprovalMaskProps = {
  isNotOnline: boolean;
  isNotApproved: boolean;
};

export const ApprovalMask = ({
  isNotOnline,
  isNotApproved,
}: ApprovalMaskProps) => {
  const { t } = useTranslation();

  // If the app is not approved, show the approval message
  if (isNotApproved) {
    return (
      <div className="noAppMask info">
        <div className="info2">
          <Loading
            size="40px"
            color="#1989fa"
            className="spinner"
            type="spinner"
          />
          <span className="mt-3 page_text">loading...</span>
          <span className="m-3 page_text">{t("app_approval_message")}</span>
        </div>
      </div>
    );
  } else if (isNotOnline) {
    return (
      <div className="noAppMask info">
        <div className="info2">
          <Loading
            size="40px"
            color="#1989fa"
            className="spinner"
            type="spinner"
          />
          <span className="mt-3 page_text">loading...</span>
          <span className="m-3 page_text">{t("app_notOnline_message")}</span>
        </div>
      </div>
    );
  }

  return <></>;
};
