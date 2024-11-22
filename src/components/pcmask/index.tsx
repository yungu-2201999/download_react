import { useState } from "react";
import QRCode from "react-qr-code";
import { Loading } from "react-vant";
import { useTranslation } from "react-i18next";

const PcMask = ({ info }: any) => {
  const [logoSrc, setLogoSrc] = useState("");
  const { t } = useTranslation();

  if (!info) {
    return (
      <div className="pageLoading">
        <Loading size="large" style={{ color: "#1989fa" }} />
      </div>
    );
  }

  return (
    <div className="pcmask">
      <div
        className="pc-box"
        style={{
          background: "#fff center center no-repeat",
          backgroundSize: "100% auto",
        }}
      >
        <div className="info fy57">{/*  */}</div>
        <div className="pc-logo">
          <img src={info.img} className="icon" alt="logo" />
          <p className="appname" style={{ marginBottom: "1rem" }}>
            {info.name}
          </p>
        </div>

        <QRCode value={location.href} size={220} bgColor="#fff" fgColor="#000" />

        <div className="tipss fy58">{t("fy58")}</div>
      </div>
    </div>
  );
};

export default PcMask;
