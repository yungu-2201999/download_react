import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import useHook from "./hook";
import PcMask from "../../components/pcmask";
import { NoAppMask } from "../../components/noAppMask";
import Loading from "../../components/loading/loading";
import { Popup, Swiper } from "react-vant";
import { Loading as VanLoading } from "react-vant";
import "../../locales/i18next";
import { useParams } from "react-router-dom";
import AppTag from "../../components/app-tag";
import star from "@/assets/img/star.png";
import left from "@/assets/img/left.png";
import right from "@/assets/img/right.png";
import blueStar from "@/assets/img/blueStar.png";
import starGroup from "@/assets/img/starGroup.png";

import connectCustomer from "@/assets/img/connect_customer.png";

import "react-toastify/dist/ReactToastify.css";
import CustomToast from "../../components/custom-toast/CustomToast";
import { toast } from "react-toastify";
import { CustomModal } from "../../components/custom-modal/CustomModal";
import { ApprovalMask } from "../../components/approvalMask";

export default function DynamicPage() {
  const { t, i18n } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const currentAppId = id;

  const mockImageList = [
    "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjU0NmJhdGNoMy1teW50LTM0LWJhZGdld2F0ZXJjb2xvcl8xLmpwZw.jpg",
    "https://static.vecteezy.com/system/resources/thumbnails/037/814/719/small_2x/ai-generated-autumn-leaves-in-the-forest-nature-background-photo.jpg",
    "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjU0NmJhdGNoMy1teW50LTM0LWJhZGdld2F0ZXJjb2xvcl8xLmpwZw.jpg",
  ];

  // imageType 0 == 直屏 , 1 == 橫屏

  const {
    state,
    setState,
    loading,
    setLoading,
    swipeRef,
    showToast,
    updateToast,
    showCaptcha,
    f_check_IP,
    isIpad,
    doCopy,
    timeinit,
    getQueryVariable,
    gocurrent,
    onChange,
    istutorialshow,
    istutorialclosed,
    issolveshow,
    issolveclosed,
    download,
    submit,
    getfilesize,
    getInfo,
    getgoodUrl,
    twoinit,
    handleConnectCustomerServices,
    goxinren,
    clickXinRen,
    gobeiyong,
    handleImageLoad,
    getinstall,
    getmdmDownload,
    newcheckStatus,
    randomString,
    isUdidJumpDownLoad,
    getPlistPath,
    modalIsOpen,
    modalContent,
    openModal,
    closeModal,
    debugMessage,
    randomDate,
    retry,
    setRetry,
  } = useHook();

  useEffect(() => {
    const browserLang = navigator.language;
    i18n.changeLanguage(browserLang);
    const currentTheme = document.documentElement.getAttribute("theme");
  }, []);

  const notify = () => toast(t("validation_success"));

  // return <div> what the fuck...</div>;
  return (
    <>
      <Loading
        className="pageLoading"
        isShow={state.pageLoading}
        // isShow={true}
      ></Loading>
      {/* <button
        onClick={() =>
          openModal(
            <Flex justify="center" align="center" style={{ height: "100%" }}>
              <Flex.Item>
                <VanLoading
                  color="#99e2d5"
                  type="spinner"
                  style={{ textAlign: "center" }}
                />
                <p>智能檢測中</p>
              </Flex.Item>
            </Flex>
          )
        }
      >
        Open Modal with Second Content
      </button>

      <button
        onClick={() =>
          openModal(
            <Flex
              justify="center"
              align="center"
              style={{ height: "100%", backgroundColor: "#eaf8f2" }}
            >
              <Flex.Item
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FaCheckCircle size={30} color="#78cfa1" />
                <p>檢測成功</p>
              </Flex.Item>
            </Flex>
          )
        }
      >
        Open Modal with Second Content
      </button>
      <button onClick={notify}>Notify!</button> */}
      <CustomToast />
      <CustomModal isOpen={modalIsOpen} closeModal={closeModal}>
        {modalContent}
      </CustomModal>
      {/* comment for debug */}
      {/* <div
        style={{
          fontSize: "16px",
          color: "#333",
          fontWeight: "bold",
        }}
      >
        debugMessage : {debugMessage}
      </div> */}

      <div
        className="slideVerify"
        style={{ display: state.isshowslideVerify ? "flex" : "none" }}
      >
        <div id="captcha-div" />
      </div>
      {state.isShowNoAppMask && <NoAppMask appId={currentAppId} />}
      {state.isshowPcmask && <PcMask info={state.info} />}
      {state.iswechat && (
        <div className="wechat">
          {state.wechatimgList.map((item: any, key: any) => (
            <img key={key} src={item} alt="" />
          ))}
        </div>
      )}

      <div className="emptyDiv">
        {!state.isshowPcmask &&
          !state.isShowNoAppMask &&
          state.info.chatLink !== "" && (
            <div className="connect_customer">
              <img src={connectCustomer} width={20} height={20} alt="" />
              <div className="text" onClick={handleConnectCustomerServices}>
                {t("fy41")}
              </div>
            </div>
          )}
      </div>
      {/* {!state.isshowPcmask && !state.isShowNoAppMask && (
        <div className="fixed-bottom">
          <div className="fixed-bottom-row" onClick={handleOpenTutorial}>
            <img
              width="20"
              height="20"
              style={{ color: "blue" }}
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAADpElEQVRoge3ZW4hVZRjG8d+3Zpw0ydKxxDCLojOC1IUVGlEWSmIHETpAQdHcBIYROQeLqdE9KpVXUXZjEKTSEGKCUUanCdJKQrCTUkKjUUxoiZaj7q+LvZ3Zs+awnW22Cdb/aq13fet532et/a2LZ5ORkZFRTULZFUviVIm5mIXpEvWiCcjjAHaLtquxRa2PtIb8sHqN8RKJBUW9qzEJ5+IguvGTqBMfatdJiJUZaIqzBE/hTtSUNVrgR7TI2TCg8dJ4pbyVmD9s3/58j5fVWaM19Ay2YKBQYxwv8RIeHkGjNJ9LPGRZ2K0hjjJROxZhVIV63woaLA+d6Qv9Byy83i24KrVuPzZim2CPvIMKr30SrhDchRtTegdEcyVaRXNSevvQgS8lupzwm8TZmCy6DrfjppTeMTTIhdcHN9AU6wU7MLW3Fu2SaPGDzd4KJwZ7NL20xItFjWhAUqzmS44JvhI1qfNB2b2yNF4uekb0YIlGFNxvedgw0EBz7MCCEonVui3xWjg2bKM0jXGORAfGpq68otsTFejdIfEm6ouVPx13rVWhi9Knw90lxy/KhSdH3AxWhHdFD6B0E3fIebxCvffkzcWRYmWcWreevFxqoO9Lk1gz4kaltIdN6CqpvFruczgsK8IX2NF7HvtmTQZb/y9R+cAj4Ewa+E/IDFSbzEC1yQxUm8xAtckMVJvMQLXJDFSbzEC1yQxUm9qK7mqN4/zhmNXhr9OeYGGscZlxRjukNRwf6e1lDMSgxSzRHNEMwTTU65EYg+Z4GN+IPsUm7T4pmz48HaeotVAwWzQdF4IeNMdDor0S2+V97ISNVoVDw8mVBlt9jRPXiG4TLcalw5vsx3dok7NOs736Ur7ZEvvlPY97nHpYfATrBc+K1mMmiB7RHtYObYCfcdEIBu9PtFUwHROLlbcxD3UVKh7GUUwo6vcaGOonlB5+G7agU6JLrQOOmiCYrBDCzsMNvauD2an7702d78NmwfuO2yPvVzVG43w1rpd3i2A+xhTXjzUwqiy2Oklz7NaXPxZ8sg4r5cLOIYz20RRnCNoUkuWh2Cdqc5a1Q+X9vbTG8/R4FC0Yn5p6vuXhnbSBFrQVaztEi7SHz8oOnqY5LsYq6bcbbcV92sPvI9IrpObL8JjC3vlaj5leCIf7G+BkRH6OnF2nlWW2xJtFbyhs4hPI2e25shH9cLTGC/SYos7O0s9tpf/AnErD0f42TaJLLvxyxvpkZGT8v/kHYM0PkIlkT2kAAAAASUVORK5CYII="
            />
            <div style={{ width: "5px" }} />
            <p className="fy1">{t("fy1")}</p>
          </div>
          {state.info.chatLink && state.info.chatLink.indexOf("http") > -1 ? (
            <a
              href={state.info.chatLink}
              target="_blank"
              onClick={handleConnectCustomerServices}
              rel="noopener noreferrer"
              className="fixed-bottom-row-2"
            >
              <img
                width="23"
                height="23"
                style={{ color: "blue" }}
                src="data:image/png;base64,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"
                alt="icon"
              />
              <div style={{ width: "5px" }} />
              <p
                style={{
                  margin: 0,
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              >
                {t("fy41")}
              </p>
            </a>
          ) : null}
        </div>
      )} */}

      <div className="home">
        {/* {loading && <Loading className="pageLoading"></Loading>} */}

        {state.noSafari && (
          <div className="noSafari">
            <div className="mask-pop">
              <img className="copy-url-img" src={state.noSafariurl} alt="" />
              <div
                className="text"
                style={{ color: "#fff" }}
                dangerouslySetInnerHTML={{
                  __html: t("fy94"),
                }}
              />
              <div className="copy-url">
                <div className="input">
                  {state.ipt_url}
                  <button onClick={doCopy}>{t("fy71")}</button>
                </div>
              </div>
            </div>
          </div>
        )}

        <img id="logoIcon" src={state.info.img} alt="" className="appIcon" />
        <div className="title_box">
          <div className="app_title"> {state.info.name}</div>
          <div className="app_star_box">
            <img src={star} className="star" alt="star" />
            <img src={star} className="star" alt="star" />
            <img src={star} className="star" alt="star" />
            <img src={star} className="star" alt="star" />
            <img src={star} className="star" alt="star" />
            <div className="app_star_text">{t("fy96")}</div>
          </div>
        </div>

        <div className="btnListV3">
          <div className="state-normal a-top" style={{ border: "none" }}>
            <div
              // ref="install-btn"
              // type="button"
              className="install-btn btndown"
              style={{
                display: "flex",
                alignItems: "center",
                background: "#0195E9#",
                border: "none",
                fontWeight: "bold",
              }}
              // disabled={!state.btnbgc || state.showbtnload}
              onClick={() => {
                console.log("click download button");

                if (state.showbtnload&&state.info.signType ===1) {
                  console.log(state.itmsUrl);
                  if (state.itmsUrl!=="") {
                    window.location.href=state.itmsUrl;
                  }

                  return;
                }
                if (!state.isFristStart &&state.btnstatus) {
                  // alert(t("fy63"));
                  if (retry > 3) {
                    window.location.reload();
                  }
                  if (!state.showbtnload) {

                    setRetry((prev) => prev + 1);
                    return;
                  }
                }
                if (state.isFristStart){
                  setState((prev) => ({ ...prev, isFristStart: false,showbtnload:false,btnbgc:true, }));
                }

                if (!state.btnbgc || state.showbtnload) {
                  return;
                }
                console.log(1);
                if (!state.isAndroid) {
                  setState((prev) => ({
                    ...prev,
                    showbtnload: true,
                    btntext: t("fy64"),
                    btnagain: true,
                  }));
                }
                console.log(2);
                download(true);
              }}
            >
              {state.showbtnload && (
                <VanLoading
                  style={{ marginRight: "2px" }}
                  color="#fff"
                  size="1rem"
                />
              )}

              {" " + (state.btntext ? state.btntext : t("fy2")) + " "}
            </div>
          </div>

          {!state.isAndroid && (
            <>
              <button
                className="xinren-btn"
                onClick={state.info.signType === 1 ? goxinren : istutorialshow}
              >
                {t("fy114")}
              </button>
            </>
          )}

          {state.V2countDown && (
            <>
              <span
                style={{
                  color: "var(--colorgray)",
                  position: "absolute",
                  bottom: "-1.2rem",
                  fontSize: "0.8rem",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {t("fy83")}
              </span>
              <span
                style={{
                  color: "var(--blue)",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {state.counttime + "s"}
              </span>
            </>
          )}
        </div>

        <div className="rate-info">
          <div className="rate-box">
            <div className="label">
              4.5{" "}
              <div className="unit" style={{ paddingLeft: 2 }}>
                {t("feature_total_score", { num: "100" })}{" "}
              </div>
            </div>
            <div className="star-position">
              <img src={star} className="star" alt="star" />
              <img src={star} className="star" alt="star" />
              <img src={star} className="star" alt="star" />
              <img src={star} className="star" alt="star" />
              <img src={star} className="star" alt="star" />
            </div>
          </div>

          <div className="with-divider" />

          <div className="rate-box ">
            <div className="label label-number">
              {t("thousand", { num: "100" })}
            </div>
            <div className="unit">{t("total_download")}</div>
          </div>

          <div className="with-divider" />

          <div className="rate-box">
            <div className="featured">
              <img src={left} alt="" />
              <div className="text">
                {t("feature_title1")} <br />
                {t("feature_title2")}
              </div>
              <img src={right} alt="" />
            </div>
            <div className="unit">{t("feature_desc")}</div>
          </div>
        </div>
        {/* <div className="rate-info">
          <div>
            <div
              style={{
                paddingLeft: "2px",
              }}
              className="line1 aft-line"
            >
              <div className="label">4.5</div>
              <div className="unit">
                {t("feature_total_score", { num: "100" })}
              </div>
            </div>
            <div className="line2">
              <div className="star-position">
                <img src={star} className="star" alt="star" />
                <img src={star} className="star" alt="star" />
                <img src={star} className="star" alt="star" />
                <img src={star} className="star" alt="star" />
                <img src={star} className="star" alt="star" />
              </div>
            </div>
          </div>

          <div
            style={{
              width: "auto",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            <div className="line1 aft-line">
              <div className="label label-number">
                {t("thousand", { num: "100" })}
              </div>
            </div>
            <div className="line2">
              <div className="description">{t("total_download")}</div>
            </div>
          </div>

          <div>
            <div className="line1">
              <div className="featured">
                <img src={left} alt="" />
                <div className="text">{t("feature_title")}</div>
                <img src={right} alt="" />
              </div>
            </div>
            <div className="line2">
              <div className="app">{t("feature_desc")}</div>
            </div>
          </div>
        </div> */}

        <div className="app-info">
          【{state.info.name}】{" "}
          {state.info.introduce ||
            (state.isAndroid
              ? t("fy19").replace(/Apple|蘋果|苹果/g, "Android")
              : t("fy19"))}
        </div>

        {/* imageList */}

        {state.imagesList.length > 0 && "0" === state.info.imageType && (
          <div className="image-session">
            <Swiper
              autoplay={state.imagesList.length === 1 ? false : 3000} // 自動播放間隔（可選）
              slideSize={80}
              indicator={false}
              style={{
                height: "485px",
                marginRight: "10px",
              }}
              loop={true} // 是否循環播放
            >
              {state.imagesList.map((url, index) => (
                <Swiper.Item key={index} style={{}}>
                  <img
                    src={url}
                    alt={`Image ${index + 1}`}
                    style={{
                      width: "95%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                </Swiper.Item>
              ))}
            </Swiper>
          </div>
        )}

        {state.imagesList.length > 0 && "1" === state.info.imageType && (
          <div
            className="image-session"
            style={{
              minWidth: "95%",
            }}
          >
            <Swiper
              autoplay={state.imagesList.length === 1 ? false : 3000}
              indicator={false}
              style={{
                height: "260px",
              }}
              loop={true}
            >
              {state.imagesList.map((url, index) => (
                <Swiper.Item key={index} style={{}}>
                  <img
                    src={url}
                    alt={`Image ${index + 1}`}
                    style={{
                      width: "95%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                </Swiper.Item>
              ))}
            </Swiper>
          </div>
        )}
        <div className="label-tag">
          <AppTag
            content={
              state.isAndroid
                ? t("fy19").replace(/Apple|蘋果|苹果/g, "Android")
                : t("fy19")
            }
          />
          <AppTag content={"v" + state.info.version} />
        </div>
        {/* app score session */}
        <div className="app-score-session">
          <div style={{ height: 21 }}></div>

          <div className="title">{t("app_score")}</div>

          <div className="score-container">
            <div className="num">4.7</div>
            <div className="star">
              <img alt="" src={starGroup} style={{ height: "3vh" }} />
              <div>9.8万次评分</div>
            </div>
          </div>

          <div className="t93nT4">
            <div className="QDAPHZ">
              <div className="_--9A95">
                <img alt="" src={blueStar} />
                <img alt="" src={blueStar} />
                <img alt="" src={blueStar} />
                <img alt="" src={blueStar} />
                <img alt="" src={blueStar} />
              </div>
              <div className="agAYJY">
                <div
                  style={{
                    backgroundColor: "#0195E9",
                    height: "100%",
                    width: "90%",
                  }}
                ></div>
              </div>
            </div>
            <div className="QDAPHZ">
              <div className="_--9A95">
                <img alt="" src={blueStar} />
                <img alt="" src={blueStar} />
                <img alt="" src={blueStar} />
                <img alt="" src={blueStar} />
              </div>
              <div className="agAYJY">
                <div
                  style={{
                    backgroundColor: "#0195E9",
                    height: "100%",
                    width: "7%",
                  }}
                ></div>
              </div>
            </div>
            <div className="QDAPHZ">
              <div className="_--9A95">
                <img alt="" src={blueStar} />
                <img alt="" src={blueStar} />
                <img alt="" src={blueStar} />
              </div>
              <div className="agAYJY">
                <div
                  style={{
                    backgroundColor: "#0195E9",
                    height: "100%",
                    width: "0px",
                  }}
                ></div>
              </div>
            </div>
            <div className="QDAPHZ">
              <div className="_--9A95">
                <img alt="" src={blueStar} />
                <img alt="" src={blueStar} />
              </div>
              <div className="agAYJY">
                <div
                  style={{
                    backgroundColor: "#0195E9",
                    height: "100%",
                    width: "0px",
                  }}
                ></div>
              </div>
            </div>
            <div className="QDAPHZ">
              <div className="_--9A95">
                <img alt="" src={blueStar} />
              </div>
              <div className="agAYJY" />
              <div
                style={{
                  backgroundColor: "#0195E9",
                  height: "100%",
                  width: "0%",
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* app comment session */}
        <div className="app-comment-session">
          <div style={{ height: "21px" }}></div>
          <div className="title">{t("app_comment")}</div>
          <div style={{ height: "16px" }}></div>
          <div className="comment-box">
            <div className="comment-box-header">
              <img
                src="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='36'%20height='36'%20viewBox='0%200%2036%2036'%20fill='none'%3e%3cg%20clip-path='url(%23clip0_347_327)'%3e%3cpath%20d='M32.2596%2028.4346C32.8014%2028.3061%2032.9762%2027.7924%2033.2093%2027.4072C36.67%2021.6222%2036.9322%2015.6095%2033.8734%209.67276C31.7881%205.65615%2028.268%202.57498%2024.0154%201.04402C19.7628%20-0.486953%2015.0904%20-0.355157%2010.9306%201.41312C6.77069%203.18139%203.42916%206.45614%201.57267%2010.5839C-0.283827%2014.7118%20-0.518772%2019.3891%200.914712%2023.6828C1.49733%2025.4341%202.05082%2027.2554%203.64719%2028.4463C3.72811%2028.974%204.00226%2029.4526%204.41624%2029.7889C6.09482%2031.7398%208.17354%2033.3052%2010.5107%2034.3782C12.8478%2035.4512%2015.3884%2036.0066%2017.9592%2036.0066C20.53%2036.0066%2023.0706%2035.4512%2025.4078%2034.3782C27.7449%2033.3052%2029.8236%2031.7398%2031.5022%2029.7889C31.9212%2029.4536%2032.193%2028.9677%2032.2596%2028.4346Z'%20fill='white'/%3e%3cpath%20d='M3.64719%2028.4346C2.05082%2027.2671%201.49733%2025.4049%200.914712%2023.6711C-0.518772%2019.3774%20-0.283827%2014.7001%201.57267%2010.5723C3.42916%206.44446%206.77069%203.16974%2010.9306%201.40147C15.0904%20-0.366804%2019.7628%20-0.498619%2024.0154%201.03235C28.268%202.56332%2031.7881%205.64447%2033.8734%209.66108C36.9322%2015.5978%2036.67%2021.6105%2033.2093%2027.3955C32.9762%2027.7808%2032.8014%2028.2945%2032.2596%2028.4229C31.8634%2028.0026%2031.473%2027.5706%2031.0943%2027.162C26.6839%2022.6496%2021.3821%2020.7757%2015.1073%2021.7039C10.359%2022.4161%206.69429%2024.8854%203.64719%2028.4346ZM18.0029%205.22458C16.6326%205.21671%2015.2907%205.61518%2014.146%206.36981C13.0012%207.12444%2012.1049%208.20151%2011.5697%209.46544C11.0346%2010.7294%2010.8846%2012.1236%2011.1387%2013.4728C11.3927%2014.8219%2012.0394%2016.0656%2012.9974%2017.0473C13.9553%2018.029%2015.1818%2018.7049%2016.5222%2018.9897C17.8627%2019.2746%2019.2573%2019.1557%2020.5305%2018.6482C21.8037%2018.1406%2022.8986%2017.267%2023.6774%2016.1373C24.4561%2015.0077%2024.8839%2013.6724%2024.9069%2012.2997C24.9256%2010.4448%2024.2092%208.65823%2022.9149%207.33188C21.6206%206.00553%2019.8541%205.24767%2018.0029%205.22458Z'%20fill='%23ECE5FF'/%3e%3cpath%20d='M3.64722%2028.4346C6.69431%2024.8854%2010.359%2022.4161%2015.084%2021.7156C21.3588%2020.7874%2026.6606%2022.6613%2031.0711%2027.1737C31.4731%2027.5823%2031.8634%2028.0143%2032.2363%2028.4346C32.1682%2028.9656%2031.8966%2029.4492%2031.4789%2029.7831C29.8003%2031.734%2027.7216%2033.2994%2025.3845%2034.3724C23.0473%2035.4454%2020.5067%2036.0008%2017.9359%2036.0008C15.3651%2036.0008%2012.8245%2035.4454%2010.4874%2034.3724C8.15027%2033.2994%206.07155%2031.734%204.39297%2029.7831C3.98643%2029.4415%203.72072%2028.961%203.64722%2028.4346Z'%20fill='%238544FB'/%3e%3cpath%20d='M18.0029%205.22458C19.3791%205.23401%2020.7215%205.6529%2021.8597%206.4281C22.9978%207.20331%2023.8805%208.29986%2024.3955%209.57856C24.9106%2010.8573%2025.0349%2012.2605%2024.7526%2013.6101C24.4703%2014.9597%2023.7941%2016.1948%2022.81%2017.1587C21.8258%2018.1226%2020.578%2018.7717%2019.225%2019.0238C17.8719%2019.2759%2016.4746%2019.1195%2015.2105%2018.5745C13.9463%2018.0294%2012.8722%2017.1204%2012.1246%2015.9626C11.377%2014.8049%2010.9896%2013.4507%2011.0115%2012.072C11.0526%2010.2416%2011.8073%208.50005%2013.114%207.22025C14.4207%205.94045%2016.1756%205.22412%2018.0029%205.22458Z'%20fill='%238544FB'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_347_327'%3e%3crect%20width='36'%20height='36'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e"
                alt=""
                className="DY-RQJ"
              />
              <div style={{ paddingLeft: 5 }}>
                <div className="comment-content-title">
                  {state.info.commentTitle}
                  {/* {t("comment_title")} */}
                </div>
                <div className="comment-person">Kevin</div>
              </div>
            </div>
            <div className="comment-content-desc">
              {/* {t("comment_content")} */}
              {state.info.comment}
            </div>
            <div className="random-date">{randomDate()}</div>
          </div>
        </div>

        {/* app detail */}
        <div
          className="app-detail-container"
          style={{ backgroundColor: "rgb(255, 255, 255)" }}
        >
          <div style={{ height: 27 }}></div>
          <div className="title">{t("app_detail.title")}</div>
          <div style={{ height: 16 }}></div>
          <div className="eG1TBE">
            <div className="ClVtfs">{t("app_detail.seller")}</div>
            <div className="_6d-N2m">{state.info.name}</div>
          </div>
          <div className="eG1TBE">
            <div className="ClVtfs">{t("app_detail.size")}</div>
            <div className="_6d-N2m">{state.info.big}</div>
          </div>
          <div className="eG1TBE">
            <div className="ClVtfs">{t("app_detail.compatibility")}</div>
            <div className="_6d-N2m">
              {state.isAndroid
                ? t("app_detail.compatibilityValue_android")
                : t("app_detail.compatibilityValue")}
            </div>
          </div>
          <div className="eG1TBE">
            <div className="ClVtfs">{t("app_detail.language")}</div>
            <div className="_6d-N2m">{t("app_detail.languageValue")}</div>
          </div>
          <div className="eG1TBE">
            <div className="ClVtfs">{t("app_detail.price")}</div>
            <div className="_6d-N2m">{t("app_detail.priceValue")}</div>
          </div>
          <div className="eG1TBE">
            <div className="ClVtfs">{t("app_detail.ageRating")}</div>
            <div className="_6d-N2m">{t("app_detail.ageRatingValue")}</div>
          </div>
        </div>

        <div className="mianzhe">
          {t("fy38")}
          {t("fy39")}
          {state.currentLocale}
        </div>

        <div
          id="shenmingsty"
          className="disclaimer"
          style={{ padding: 20, fontSize: 14 }}
        >
          <span className="fy38"></span>
        </div>

        {1 !== state.info.signType && state.id && (
          <div className="disclaimer2">
            <span>{t("fy40")}</span>
            <br />
            <span className="udid">{state.id}</span>
          </div>
        )}

        {/* approval state showup */}
        {state.isShowApprovalMask ? (
          // approvalStatus 1 == not approved
          // status 1 == not online
          <ApprovalMask
            isNotOnline={state.info.status === 0||state.info.status===2}
            isNotApproved={state.info.approvalStatus === 0}
          />
        ) : null}

        <Popup
          visible={state.tutorialshow}
          className="tutorial_mask"
          onClose={() =>
            setState((prevState) => ({ ...prevState, tutorialshow: false }))
          }
        >
          <div className="tutorial">
            <span
              className="colsed"
              style={{
                width: "1.2rem",
                height: "1.2rem",
                background: "var(--closeimg)",
              }}
              onClick={istutorialclosed}
            />
            <div className="top">{t("fy87")}</div>
            <div className="content">
              <div className="text">
                <h3>{t("fy108")}</h3>
                <p>{t("fy109")}</p>
              </div>
              <div
                className="ok"
                onClick={() =>
                  setState((prevState) => ({
                    ...prevState,
                    tutorialshow: false,
                  }))
                }
              >
                {t("fy110")}
              </div>
            </div>
            <div
              className="bottom"
              onClick={(e) => {
                return e.stopPropagation(), issolveshow();
              }}
            >
              {t("fy88")}
            </div>
          </div>
        </Popup>

        {/* xin ren popup */}
        <Popup
          visible={state.showxinren}
          onClose={() =>
            setState((prevState) => ({ ...prevState, showxinren: false }))
          }
          className="van-popup-xinren"
        >
          <div className="flex">
            <div className="xinren" style={{ color: "#000" }}>
              {state.isTutorial && (
                <div>
                  <p>{t("fy128")}</p>
                  <br />
                </div>
              )}
              {t("fy122")}
              <br />
              <br />
              <ul>
                <li>
                  {t("fy123")}
                  <img src={state.iosSettingIcon} width={20} alt="" />
                </li>
                <li>
                  <span className="remark">{t("fy124")}</span>
                  <span style={{ fontWeight: "bold" }}>{t("fy125")}</span>
                </li>
              </ul>
            </div>
            {state.isver17 < 17 && (
              <div className="open-setting" onClick={clickXinRen}>
                {t("fy126")}
              </div>
            )}
          </div>
        </Popup>

        {/* bei yong popup */}
        <Popup
          className="van-popup-beiyong"
          visible={state.showbeiyong || state.show_ver18}
          onClose={() =>
            setState((prevState) => ({ ...prevState, showbeiyong: false }))
          }
        >
          <div className="beiyong" dangerouslySetInnerHTML={{ __html:t("fy115") }} />
          <p>
            <span
              style={{ color: "var(--blue)" }}
              onClick={() =>
                setState((prevState) => ({ ...prevState, showbeiyong: false }))
              }
            >
              {t("fy113")}
            </span>
            <span style={{ color: "var(--blue)" }} onClick={gobeiyong}>
              {t("fy116")}
            </span>
          </p>
        </Popup>

        <Popup
          visible={false}
          onClose={() =>setState((prevState) => ({
              ...prevState,
              show_ver18: false,
              btntext:state.isFristStart? t("fy2"):t("fy65"),
              showbtnload: false,
            }))
          }
          className="van-popup-beiyong"
        >
          {/*state.btnstatus? t("fy65") :*/}
          <div className="beiyong" style={{ color: "#000" }}>
            {t("18+hints")}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "end",
            }}
          >
            <p>
              <span
                style={{ color: "var(--blue)" }}
                onClick={() =>
                  setState((prevState) => ({
                    ...prevState,
                    show_ver18: false,
                    btntext: t("fy2"),
                    showbtnload: false,
                  }))
                }
              >
                {t("fy113")}
              </span>
            </p>
            <p>
              <span
                style={{ color: "var(--blue)" }}
                onClick={() =>
                  setState((prevState) => ({
                    ...prevState,
                    show_ver18: false,
                    btntext: t("fy2"),
                    showbtnload: false,
                  }))
                }
              >
                {t("fy119")}
              </span>
            </p>
          </div>
        </Popup>

        <Popup
          visible={state.showver17_v2}
          onClose={() =>
            setState((prevState) => ({ ...prevState, showver17_v2: false }))
          }
          className="van-popup-beiyong"
        >
          <div className="beiyong">
            <span dangerouslySetInnerHTML={{__html:t("fy117")}} />
            <span style={{ color: "red" }}>《{state.info.name}》</span>
            <span dangerouslySetInnerHTML={{__html:t("fy118")}}/>
          </div>
          <p>
            <span
              style={{ color: "var(--blue)" }}
              onClick={() =>
                setState((prevState) => ({ ...prevState, showver17_v2: false }))
              }
            >
              {t("fy119")}
            </span>
          </p>
        </Popup>

        <Popup
          visible={state.showver17_v3}
          onClose={() =>
            setState((prevState) => ({ ...prevState, showver17_v3: false }))
          }
          className="van-popup-beiyong"
        >
          <div className="beiyong">
            <span dangerouslySetInnerHTML={{ __html:t("fy117") }} />
            <span style={{ color: "red" }}>
              《{ `${state.info.antiCustomTitle}`.trim() || state.info.name + "闪退助手" }》
            </span>
            <span>{t("fy121")}</span>
          </div>
          <p>
            <span
              style={{ color: "var(--blue)" }}
              onClick={() =>
                setState((prevState) => ({ ...prevState, showver17_v3: false }))
              }
            >
              {t("fy119")}
            </span>
          </p>
        </Popup>
      </div>
      {state.solveshow && (
        <div
          className="solve_mask"
          onClick={(e) => {
            return e.stopPropagation(), issolveclosed(e);
          }}
        >
          <div className="solve">
            <span className="colsed" onClick={issolveclosed}>
              <img
                alt=""
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDcuMi1jMDAwIDc5LjU2NmViYzViNCwgMjAyMi8wNS8wOS0wODoyNTo1NSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIzLjQgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjExQzcxNzkwRTgzMTFFRTg3NTE5RjlGNEU3ODZDQkUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjExQzcxN0EwRTgzMTFFRTg3NTE5RjlGNEU3ODZDQkUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCMTFDNzE3NzBFODMxMUVFODc1MTlGOUY0RTc4NkNCRSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCMTFDNzE3ODBFODMxMUVFODc1MTlGOUY0RTc4NkNCRSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqfSEC8AAAQaSURBVHja7J09bhRBEIXHIxuTECNhAULABcCZRWrEASDjFrsh6rEEkR055AhwAIRDZCAwPgGW+LO4AAmYYKgR7QQhe7d7Zrar6nvSk4P1rrfrfe6ZnZ2uXmrbtkJ+VVMCAEAAgAAAAQACAAQACAAQACAAQACAAGB2XRXfEa9Q1sF0QbwuXisJgGfiT+Kv4kPxD/Fb8SZ59aaulu9ibQ/Ex+Ij8W7uCy9lfhu4L9444/GpeIf8sjQRb5/xeAfC7UXMAB/PCb+Kb7whw2Q154Tf6Vb8RxwVgN34h2dRAILk8MOMv7sRD8WjHQK6aefmnM/ZAoRBwj/VZ/GNMQBYiychKQKCYcI/1TXxt6EPAZczBsfhYLjwk7JJmQFW4seR1Yw3ykzQf/gn4kvx56AzwO/4eb9iJigm/CpmcjLvk+qM/+AKCIoJv0qtZSoAe9XfizxAUEb405jJ/OrOATLctP2oyXwfGl1E7cwMhPAXBwAQKK6V2YER/vgAAIHC2rgZKOGPBwAQKKqF24ET/vAAeIdAxdgphPMxUxDnY9VYmED4OgGwDoHKWU5zoQLh6wTAGgSqz28sFC4Qvk4AtENg4pONpeNnIHydAGiDwNQ1DYsfowLh6wSgdAhMXs20fDUtEL5OAEqDwPT3GB6+VAmErxOARUPg4htMT9+tB8LXCcDYELi6gcXjLVaB8HUCMDQELu9f9HynbfAefudlpUuqqx6WVXevs9TTa6ntepLbKNLC2vrKa/g5DSJKAWCL8P0CUAIE6ptdWWgXvygITHQ6s7JfwNgQmGlzZ2nDiLEgMNXj0NqOIUNDYK7BpcUtY4aCwGR3U6t7BvUNgdnWtmwa5VyWZ4A+rxIGZgC/4ZuGoCZ83xDUhO8bgprwfUNQE75vCGrC9w1BTfi+Iaidh79VOd/+Ztl5+M0/IeZCUKkDwekdwQ23hftdGNKwMMTv0rCmZWmY28WhTcviULfLw5uW5eFuG0Q0yt8DLWIWXHhaxDgOnyZRhE+bOMKnUSThW4WA8GkWTfieISB8NoygcJ7HQsHYNIpCeR4bBWLjSArjeawUhM2jKYTnsRO+cwgI3zkEhO8cAsJ3DgHhO4eA8J1DQPjOISB85xDkDGBC+MVAMEl9D6k7hmyKXw+wRNuj+lrufl+8N++TUgF4I75H+EVBsJ+SSWqHkCuE3zsAuZ1KkjJJnQF+ilcJv6iZ4Jf44lgzwBHhFzcTfBmzSdQB4RcHweGYALwn/OIgeDXmOUCnD+K7hF/EOcFL8aOxAej0QvzwjMen4h1yzNJEvH3O1L+e+uJ9bB37WPwgzgbXxcfi7+KnKRcm0H/VXXh7Ej/qrcWT8IN4KH6e88Ka9w5GPYg9gwAAAQACAAQACAAQACAAQACAAAABAAIAZFt/BBgAQMvB82haGJEAAAAASUVORK5CYII="
              />
            </span>

            <div
              style={{
                width: "100%",
                height: "fit-content",
                overflow: "hidden",
                margin: 0,
                padding: 0,
              }}
            >
              <div className="indicator">
                <div className="tips">
                  <p>{t("fy111")}</p>
                  <p>
                    {state.current === 0
                      ? t("fy43")
                      : state.current === 1
                      ? t("fy44")
                      : state.current === 2
                      ? t("fy45")
                      : t("fy46")}
                  </p>
                </div>
                {/* <div className="custom-indicator">
                  <ul>
                    {state.list.map((item: any, index: any) => (
                      <li
                        key={index}
                        className={index === state.current ? "pink" : ""}
                        onClick={() => gocurrent(index)}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div> */}
              </div>
              <Swiper
                loop={false}
                duration={3}
                onChange={onChange}
                indicator={false}
              >
                {state.list.map((item: any, key: any) => (
                  <Swiper.Item
                    style={{ padding: 0, margin: 0, height: "100%" }}
                    key={key}
                  >
                    <img src={item} alt="" />
                  </Swiper.Item>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
