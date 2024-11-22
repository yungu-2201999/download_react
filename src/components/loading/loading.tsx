import React from "react";
import { Loading } from "react-vant";

const LoadingComponent = ({ isShow }: any) => {
  React.useEffect(() => {
    if (isShow) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isShow]);

  return (
    <>
      {isShow && (
        <div className="loading">
          <Loading
            size="2rem"
            color="#000"
            vertical
            text-size="1.2rem"
            vertical-text="loading..."
            type="spinner"
          />
          <p>Loading</p>
        </div>
      )}
    </>
  );
};

export default LoadingComponent;
