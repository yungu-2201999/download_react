import "./CustomToast.css";
import { ToastContainer, Slide } from "react-toastify";

const CustomToast = () => {
  // ✅ 验证成功
  return (
    <ToastContainer
      position="top-center"
      autoClose={2000}
      hideProgressBar
      closeButton={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Slide}
      className={"on toastify-center"}
    />
  );
};

export default CustomToast;
