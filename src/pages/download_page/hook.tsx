import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import { Loading as VanLoading } from "react-vant";

// icon
import StarIcon from "@/assets/img/star.png";
// import PeopleIcon from '@/assets/img/people.png';
// import TotalIcon from '@/assets/img/total.png';
import IosSettingIcon from "@/assets/img/ios_setting_logo.png";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { Flex, SwipeCellInstance } from "react-vant";
import { FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import "@/assets/captcha/css/tac.css";
import "@/assets/captcha/js/tac.js";
import { getQueryVariable } from "./utils";

declare global {
  interface Window {
    TAC: any;
  }
}

//  "approvalStatus": 0 審核中 ， 1 通過 ， 2 拒絕

const useHook = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const currentAppId = id;

  const [cookies, setCookie] = useCookies([
    "UDID",
    "UDIDV3",
    "url",
    "isGoodUrl",
    "info",
    "downloadType",
    "openone",
    "UDIDv3jump0",
    "isValidate",
  ]);

  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [retry, setRetry] = useState(0);
  const [debugMessage, setDebugMessage] = useState("");
  const [state, setState] = useState({
    isTutorial: false,
    isShowApprovalMask: false,
    ip: "",
    domain: "",
    validation_pass: false,
    replacedStr2: "",
    uuidBytes: ["z90c", "d87c", "591c", "au34", "91v4", "81zt"],
    newSubStr: "",
    btnagain: false,
    showbeiyong: false,
    showxinren: false,
    ipt_url: "",
    noSafariurl: "",
    noSafari: false,
    iswechat: false,
    wechatimgList: [] as any,
    btnbgc: true,
    btnstatus: false,
    itmsUrl: "",
    showbtnload: false,
    detail: false,
    counttime: 3,
    V2countDown: false,
    btntext: "",
    current: 0,
    solveshow: false,
    list: [] as any,
    tutorialshow: false,
    imagesList: [] as string[],
    imagesListV3: [] as string[],
    isshowslideVerify: false,
    moreheight: "100%",
    showmore: false,
    isIos: /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent),
    isAndroid: /(Android)/i.test(navigator.userAgent),
    isipad: "",
    isshowPcmask: false,
    fy83: false,
    info: {} as any,
    time: "",
    userId: "",
    identity: "",
    show_ver18: false,
    // id: cookies.UDID || "",
    id: "",
    checkTimer: null as null | NodeJS.Timeout,
    queryTimes: 0,
    installStatus: 1,
    udidone: false,
    udidtwo: !1,
    timeIosFlag: "",
    showver17_v2: false,
    showver17_v3: false,
    isver17: 0,
    UDIDV3: "8ee1d17e32eef3e74d03e66daed4eea5",
    q: "",
    isGoodUrl: 0,
    openone: false,
    isProhibitCookie: false,
    cid: "",
    cd: "",
    starIcon: StarIcon,
    iosSettingIcon: IosSettingIcon,
    pageLoading: true,
    isFristStart: true,
    isShowNoAppMask: false,
    isShowToast: false,
    toastMessage: "",
    isUdidJump: null,
    udidProflie: null,
    currentLocale: i18n.language,
  });

  const [udidProfile, setUdidProfile] = useState<string>("");
  const [isUdidJump, setIsUdidJump] = useState();

  const swipeRef = useRef<SwipeCellInstance>(null);

  // 检测 瀏覽器是否支持 Cookies
  const checkCookiesEnabled = () => {
    if (!navigator.cookieEnabled) {
      setState((prevState) => ({ ...prevState, isProhibitCookie: true }));
    }
  };

  // 檢測 iOS 版本
  const detectIOSVersion = () => {
    // const osMatch = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
    // const isMac = navigator.userAgent.includes("Macintosh");

    // if (osMatch) {
    //   const version = parseInt(osMatch[1], 10);
    //
    // } else if (isMac) {
    //
    // }

    if (navigator.cookieEnabled || (this.isProhibitCookie = !0),
        navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
      const t =navigator.userAgent.match(/OS (\d+)_(\d+)_?(\d+)?/)[1] ;
      setState((prevState) => ({ ...prevState, isver17:  parseInt(t) || 0 }));

    }
    //兼容ipad
    if(navigator.userAgent.match(/Macintosh/i)) {
      setState((prevState) => ({ ...prevState, isver17: 17 }));
    }
  };

  // 設置域名 ， dev 環境下使用 localhost ，否則使用二級域名
  const handleDomainSetting = () => {
    const currentDomain = document.domain.includes("localhost")
      ? document.domain
      : document.domain.split(".").slice(-2).join(".");
    setState((prevState) => ({ ...prevState, domain: currentDomain }));
    return currentDomain;
  };

  // base on domain setting up UDID logic
  const handleUDIDSetting = (currentDomain: string) => {
    const udid = getQueryVariable("UDID");
    const detailQueryExists = getQueryVariable("detail");

    if (udid) {
      document.cookie = `UDID=${JSON.stringify(
        udid
      )}; domain=${currentDomain}; path=/`;
      setState((prevState) => ({ ...prevState, id: udid, udidone: true }));
    } else if (
      (cookies.UDID && detailQueryExists && !udid) ||
      (cookies.UDIDV3 && detailQueryExists && !udid)
    ) {
      setState((prevState) => ({
        ...prevState,
        udidtwo: true,
        udidone: false,
      }));
    } else if (!cookies.UDID && detailQueryExists) {
      const url = window.location.href.split("?")[0];
      window.history.pushState({}, "", url);
    }

    if (detailQueryExists) {
      setState((prevState) => ({ ...prevState, detail: true }));
    }
  };

  // set time
  const setTimeThreeDaysAgo = () => {
    const pastDate = new Date(Date.now() - 259200000); // 3天的毫秒数
    const formattedTime = `${String(pastDate.getMonth() + 1).padStart(
      2,
      "0"
    )}-${pastDate.getDate()}`;
    setState((prevState) => ({ ...prevState, time: formattedTime }));
  };

  // --------------- start init page ---------------
  useEffect(() => {
    checkCookiesEnabled();
    detectIOSVersion();
    const currentDomain = handleDomainSetting();
    handleUDIDSetting(currentDomain);
    setTimeThreeDaysAgo();

    setState((prevState) => ({
      ...prevState,
      ipt_url: window.location.href,
    }));
    const elements = document.getElementsByClassName("_bg");
    (elements[0] as HTMLElement).style.background =
      "linear-gradient(180deg, #0195E9 -10.66%, #EDF8FD 48.91%, #FFFFFF 100%)";
  }, []);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setState((prevState) => ({ ...prevState, pageLoading: false }));
    }, 10000);

    return () => clearTimeout(timer1);
  }, []);

  useEffect(() => {
    setReady(true);
    startCheckModal("start");
  }, []);

  useEffect(() => {
    if (state.validation_pass) {
      const { isIphone, iosVersion } = detectIphoneAndVersion();
      if (isIphone) {
        if (iosVersion && iosVersion >= 18) {
          console.log("iosVersion >= 18.1");
          setTimeout(() => {
            setState((prevState) => ({
              ...prevState,
              show_ver18: false,
            }));
          }, 8000);
          setDebugMessage(`iosVersion >= 18.1 ,${iosVersion}`);
          return;
        }
      }
    }
  }, [state.validation_pass]);

  // --------------- finish init page ---------------

  useEffect(() => {
    if (ready) {
      getInfo(false);
    }
  }, [ready]);

  useEffect(() => {
    if (!state.isshowPcmask && ready && !state.isShowApprovalMask) {
      console.log("running download function", state);
      setState((prev) => ({ ...prev, isFristStart: true }));
      download(false);
      closeModal();
    }
  }, [state.info.signType, ready]);

  // 语言映射
  const langMap = {
    0: "zh-CN",
    1: "en-US",
    2: "th-TH",
    3: "vi-VN",
    4: "hi-IN",
    5: "id-ID",
    6: "zh-TW",
    8: "ja-JP",
    9: "pt-PT",
    10: "ko-KR",
    11: "ru-RU",
    12: "it-IT",
  };

  // 辅助函数
  const setTheme = (downloadType: number) => {
    const theme =
      downloadType === 3
        ? "night"
        : downloadType === 2
        ? "light"
        : window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "night"
        : "light";
    document.documentElement.setAttribute("theme", theme);
    setCookie("downloadType", theme, { path: "/" });
  };

  const setLanguage = (lang: number) => {
    let locale = langMap[lang as keyof typeof langMap];
    // const locale = "pt-PT";

    if (lang === 7) {
      // get the browser language
      locale = navigator.language;
    }

    if (locale) {
      i18n.changeLanguage(locale);
      setState((prev) => ({ ...prev, currentLocale: locale }));
    }
  };

  const updateImages = (data: any) => {
    const images = data.images ? JSON.parse(data.images) : [];
    let locale = langMap[data.lang as keyof typeof langMap];
    if (data.lang === 7) {
      locale = navigator.language;
    }
    // const langCode =
    //   data.lang === 0 || data.lang === 6
    //     ? "cn"
    //     : data.lang === 3
    //     ? "vi"
    //     : "eng";
    const guideImagesV3 = Array(4)
      .fill(null)
      .map((_, i) => `/img/guide-v3/${locale}-${i + 1}.jpg`);
    const guideImagesV2 = Array(4)
      .fill(null)
      .map((_, i) => `/img/guide-v2/${locale}-${i + 1}.png`);

    setState((prev) => ({
      ...prev,
      imagesList: Array(30).fill(images).flat(),
      imagesListV3: data.signType === 1 ? guideImagesV3 : [],
      list: guideImagesV2,
    }));
  };

  const getInfo = async (isGetAgain: boolean) => {
    setLoading(true);
    setState((prev) => ({ ...prev, pageLoading: true }));

    // const appId = state.isProhibitCookie
    //   ? window.location.pathname.replace(/\//g, "")
    //   : cookies.url || window.location.pathname.replace(/\//g, "");
    // setCookie("url", appId, { path: "/" });

    const appId = window.location.pathname.replace(/\//g, "");

    const payload = {
      appId,
      isReload: isGetAgain ? 1 : 0,
      udid: state.id,
      origin: window.location.origin,
      ...(state.isver17 >= 17 && { downloadType: 2 }),
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_API}/api/iosApps/download_app_info`,
        payload
      );
      const data = res.data.data;

      setState((prev) => ({
        ...prev,
        info: data,
        id:
          data.signType === 1
            ? isUdidJump
              ? cookies.UDIDV3
              : ""
            : cookies.UDID || "",
      }));
      setCookie("info", JSON.stringify(data), { path: "/",expires: new Date(Date.now()+2592000) });

      // 更新 `id` 并设置 URL
      const id =
        data.signType === 1
          ? isUdidJump
            ? cookies.UDIDV3 || state.id
            : ""
          : cookies.UDID || "";
      if (id)
        window.history.pushState({}, "", window.location.href.split("&")[0]);

      // 更新 UI
      if (res.data.udidProflie) setUdidProfile(res.data.udidProflie);
      if (res.data.isUdidJump) setIsUdidJump(res.data.isUdidJump);
      setTheme(data.downloadType);
      setLanguage(data.lang);
      updateImages(data);

      if (navigator.userAgent.match(/micromessenger/i)) {
        setState((prev) => ({
          ...prev,
          wechatimgList: Array(2)
            .fill(null)
            .map((_, i) => `/img/WeChat-tips${i + 1}.jpg`),
          iswechat: true,
        }));
        // document.body.style.overflow = "hidden";
        return;
      }

      // check 應用審核狀態
      if (data.approvalStatus === 0 || data.status === 0 ||data.status===2) {
        setState((prev) => ({ ...prev, isShowApprovalMask: true }));
        // approval status 優先於 status

        if (data.approvalStatus === 0) {
          showToast("❌ " + t("app_approval_message"));
        } else if (data.status === 0||data.status ===2) {
          showToast("❌ " + t("app_notOnline_message"));
        }
        document.title = "\u200E";
        return;
      }

      const  n = navigator.platform;

      if ((n.indexOf('Win') == 0 || n.indexOf('Mac')== 0|| n == 'X11'|| n.indexOf('Linux') == 0) && !(navigator.userAgent.match(/(iPad)/) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {

        setState((prev) => ({
          ...prev,
          isshowPcmask: state.isAndroid?false:true,
          pageLoading: false,
        }));
        document.title = `${data.name}`;
        return;
      }
      // 檢查平台，如果是 PC，則顯示 PC Mask
      // const isPcPlatform = !/Mobi|Android|iPhone/i.test(navigator.userAgent);
      // if (isPcPlatform && !navigator.userAgent.match(/(iPad)/)) {
      //   console.log("catch pc platform");
      //   // Uncomment if necessary or debug
      //
      //
      // }
      if (state.info.way !== 1) {
        updateModalContent("success", data);
      }
      document.title = `${data.name}`;
    } catch (error) {
      console.error("Error fetching data", error);
      setState((prev) => ({ ...prev, isShowNoAppMask: true }));
      showToast("❌ " + t("noAppId_message", { appId: currentAppId }));
    } finally {
      setLoading(false);
      setState((prev) => ({ ...prev, pageLoading: false }));
    }
  };

  // Toast Message Box related functions
  const showToast = (msg: string) => {
    toast(msg, {
      autoClose: 500,
    });
  };

  const updateToast = () => {
    setState((prevState) => ({ ...prevState, isShowToast: false }));
  };

  // Captcha related functions
  const closeCaptcha = () => {
    const elements: any = document.querySelectorAll(".slideVerify");

    // Loop through each element and set display to "none"
    elements.forEach((element: any) => {
      element.style.display = "none";
    });
    // document.body.style.overflow = "auto";
  };
  const showCaptcha = () => {
    console.log("showCaptcha");
    // 样式配置
    const config = {
      requestCaptchaDataUrl: `${import.meta.env.VITE_APP_API}/captcha/random2`,
      validCaptchaUrl: `${import.meta.env.VITE_APP_API}/captcha/ac2`,
      bindEl: "#captcha-div",
      // 验证成功回调函数
      validSuccess: (res: any, c: any, tac: any) => {
        console.log("验证成功", res);
        tac.destroyWindow();
        setState((prevState) => ({
          ...prevState,
          cid: res.cid,
          cd: res.cd,
          validation_pass: true,
        }));
        // showToast(t("validation_success"));

          console.log("signType 1");
          submit(res.cid, res.cd);
        // }
        closeCaptcha();
      },
      btnCloseFun: (el: any, tac: any) => {
        tac.destroyWindow();
        closeCaptcha();
        if (state.validation_pass === true) {
          setState((prevState) => ({
            ...prevState,
            btntext: t("fy63"),
            isshowslideVerify: false,
            validation_pass: false,
          }));
        }
        setState((prevState) => ({
          ...prevState,
          btntext: t("fy2"),
          showbtnload: false,
          isshowslideVerify: false,
          validation_pass: false,
        }));
      },

      // set classname slideVerify display none
    };

    setState((prevState) => ({
      ...prevState,
      isshowslideVerify: false,
    }));
    new window.TAC(config).init(); // 初始化 captcha
  };

  const f_check_IP = () => {
    var t = document.domain,
      e = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/;
    return !!(
      e.test(t) &&
      Number(RegExp.$1) < 256 &&
      Number(RegExp.$2) < 256 &&
      Number(RegExp.$3) < 256 &&
      Number(RegExp.$4) < 256
    );
  };

  const isIpad = () => {
    if (
      navigator.userAgent.match(/(iPad)/) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
    ) {
      setState((prevState) => ({ ...prevState, isIpad: true }));
    } else {
      setState((prevState) => ({ ...prevState, isIpad: false }));
    }
  };

  const doCopy = async () => {
    const textToCopy = state.ipt_url;
    // Navigator clipboard api needs a secure context (https)
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(textToCopy);
      alert(t("fy72"));
    } else {
      // Use the 'out of viewport hidden text area' trick
      const textArea = document.createElement("textarea");
      textArea.value = textToCopy;

      // Move textarea out of the viewport so it's not visible
      textArea.style.position = "absolute";
      textArea.style.left = "-999999px";

      document.body.prepend(textArea);
      textArea.select();

      try {
        document.execCommand("copy");
        alert(t("fy72"));
      } catch (error) {
        console.error(error);
      } finally {
        textArea.remove();
      }
    }
  };

  const timeinit = () => {
    // 设置倒计时开始
    setState((prevState) => ({
      ...prevState,
      V2countDown: true,
      counttime: 3,
    }));

    const intervalId = setInterval(() => {
      setState((prevState) => {
        const newCountTime = prevState.counttime - 1;

        if (newCountTime < 0) {
          clearInterval(intervalId);
          // 停止倒计时
          return {
            ...prevState,
            V2countDown: false,
            showxinren: prevState.isver17 >= 17,
            udidtwo: true,
          };
        }

        return { ...prevState, counttime: newCountTime };
      });
    }, 1000);

    // 清理定时器
    return () => clearInterval(intervalId);
  };

  const gocurrent = (t: any) => {
    // this.$refs.swipe.swipeTo(t);
  };
  const onChange = (t: any) => {
    setState((prevState) => ({ ...prevState, current: t }));
  };

  const istutorialshow = () => {
    setState((prevState) => ({ ...prevState, tutorialshow: true }));
    // document.body.style.overflow = "hidden";
  };
  const istutorialclosed = (t: any) => {
    t.stopPropagation();
    setState((prevState) => ({ ...prevState, tutorialshow: !1 }));
    document.body.style.overflow = "auto";
  };

  const issolveshow = () => {
    setState((prevState) => ({
      ...prevState,
      tutorialshow: false,
      solveshow: true,
    }));
    // document.body.style.overflow = "hidden";
  };

  const issolveclosed = (event: any) => {
    event.stopPropagation();
    setState((prevState) => ({
      ...prevState,
      solveshow: false,
    }));
    document.body.style.overflow = "auto";
  };

  const download = (isClickDownloadAgain: boolean) => {
    console.log("download function", state.btnstatus);

    if (!state.isFristStart && state.btnstatus) {
      console.log("set btn status ");
      alert(t("fy63"));
      return;
    }
    if (state.info.way === 1) {
      showCaptcha();
      closeModal();
      setState((prevState) => ({
        ...prevState,
        isshowslideVerify: true,
      }));
      // document.body.style.overflow = "hidden";
      return;
    }

    const isXiaomi = navigator.userAgent.toLowerCase().indexOf("xiaomi") !== -1;
    // setDebugMessage(
    //   "isXiaomi: " + isXiaomi + ", isAndroid: " + state.isAndroid
    // );
    if (state.isAndroid || isXiaomi) {
      if (state.info.andriodUrl === undefined) {
        if (isClickDownloadAgain) {
          const noAndroidSupport = t("fy69");
          alert(noAndroidSupport);
        }
        return;
      } else {
        // showToast(t("request_success"));
        window.location.href = `${state.info.andriodUrl}&isGoodUrl=${cookies.isGoodUrl}`;
        return;
      }
    }

    // 16 以下 彈2次 彈窗
    // 17 以上 不彈
    // 18 新的 彈窗

    if (state.info.signType === 0 || state.info.signType === 2) {
      console.log("signType 0 or 2");
      // if (isClickDownloadAgain) {
      //   getInfo(true);
      //   return;
      // }

      if (state.info.way == 1) {
        showCaptcha();
        setState((prevState) => ({
          ...prevState,
          isshowslideVerify: true,
        }));
        return;
      }

      if (state.detail || state.udidtwo) {
        getinstall(state.info, undefined);
      } else {
        console.log("showxinren ??? ");
        window.location.href = udidProfile;

        if (state.isver17 >= 17) {
          console.log(
            "is over ios 17 version , we need to popup the xinren box"
          );
          setState((prevState) => ({
            ...prevState,
            showxinren: true,
            btntext: t("fy65"),
          }));
        } else {
          console.log("setTimeout to get mobileprovision download");
          setState((prevState) => ({
            ...prevState,
            btntext: t("fy64"),
            showbtnload: true,
          }));
          setTimeout(() => {
            showToast(t("request_success"));
            window.location.href = "/storage/jump/embedded.mobileprovision";
            console.log("set btn status ");
            setState((prevState) => ({
              ...prevState,
              btntext: t("fy63"),
              btnstatus: true,
              showbtnload: false,
            }));
          }, 3000);
        }
      }
    } else {
      if (state.info.signType === 1) {
        console.log("run get plist path with signType 1");
        getPlistPath(state.info, true, undefined, isClickDownloadAgain);
        if (state.info.webclip !== 0) {
          setTimeout(() => {
            setState((prevState) => ({
              ...prevState,
              showbeiyong: true,
            }));
          }, 6000);
        }
      } else {
        getinstall(state.info, undefined);
      }
    }
  };

  const submit = (cid: string, cd: string) => {
    if (state.isAndroid) {
      if (state.info.andriodUrl === undefined) {
        const noAndroidSupport = t("fy69");
        alert(noAndroidSupport);
        return;
      } else {
        closeModal();
        window.location.href = state.info.andriodUrl;
        return;
      }
    }

    document.body.style.overflow = "auto";

    if (state.info.signType === 1) {
      if (state.info.webclip !== 0) {
        setState((prevState) => ({
          ...prevState,
          showbeiyong: true,
        }));
      }

      getPlistPath(state.info, true, undefined, false, cid, cd);
    } else if (state.udidtwo) {
      getinstall(state.info, undefined);
    } else {
      twoinit(null);
    }

    setState((prevState) => ({
      ...prevState,
      isshowslideVerify: false,
    }));
  };

  const getfilesize = (size: any) => {
    if (!size) {
      return "";
    }
    const e = 1024;
    return size < e
      ? size + "B"
      : size < Math.pow(e, 2)
      ? (size / e).toFixed(2) + "KB"
      : size < Math.pow(e, 3)
      ? (size / Math.pow(e, 2)).toFixed(2) + "M"
      : size < Math.pow(e, 4)
      ? (size / Math.pow(e, 3)).toFixed(2) + "G"
      : (size / Math.pow(e, 4)).toFixed(2) + "T";
  };

  const getgoodUrl = () => {
    axios
      .get(import.meta.env.VITE_APP_API + "/data/info")
      .then(() => {
        if (state.isProhibitCookie) {
          setState((prevState) => ({
            ...prevState,
            isGoodUrl: 1,
          }));
        } else {
          setCookie("isGoodUrl", 1);
        }
      })
      .catch(() => {});
  };
  const twoinit = (t: any) => {
    let n = true; // 标记操作为已完成
    console.log("twoinit | t: ", t);
    // 检查是否传入了参数 `t`
    if (t) {
      // 如果 state.detail 为真，或 downloadType 是 2
      // 则执行 getinstall 函数，否则执行 handleImageLoad
      const shouldInstall = state.detail || state.info.downloadType === 2;
      shouldInstall ? getinstall(state.info, t) : handleImageLoad();
    } else {
      // 如果没有传入 `t`，则开始加载图片序列
      n = false; // 标记操作是否完成
      let r = false; // 标记是否超时

      // 加载主图片
      const mainImage = new Image();
      mainImage.src = state.info.img;
      mainImage.onload = () => {
        // 当主图片加载完成后，检查是否有额外图片需要加载
        if (state.imagesList.length > 0) {
          // 如果存在额外图片，加载第一个额外图片
          const firstImage = new Image();
          firstImage.src = state.imagesList[0];
          firstImage.onload = () => {
            // 当第一个额外图片加载完成后，加载第二个额外图片
            const secondImage = new Image();
            secondImage.src = state.imagesList[1];
            secondImage.onload = () => {
              // 当第二个额外图片加载完成后，进行判断
              if (!r) {
                // 如果超时未触发
                n = true;
                // 根据条件决定是执行 getinstall 还是 handleImageLoad
                const shouldInstall =
                  state.info.downloadType === 2 || state.detail;
                shouldInstall
                  ? getinstall(state.info, null)
                  : handleImageLoad();
              }
            };
          };
        } else {
          // 如果没有额外图片，直接根据条件执行操作
          if (!r) {
            // 如果超时未触发
            n = true;
            const shouldInstall = state.info.downloadType === 2 || state.detail;
            shouldInstall ? getinstall(state.info, null) : handleImageLoad();
          }
        }
      };

      // 设置超时处理：如果在2秒后还未完成操作，强制执行
      setTimeout(() => {
        if (!n) {
          // 如果操作未完成
          r = true;
          const shouldInstall = state.info.downloadType === 2 || state.detail;
          shouldInstall ? getinstall(state.info, null) : handleImageLoad();
        }
      }, 2000);
    }
  };

  const handleConnectCustomerServices = () => {
    window.location.href = state.info.chatLink;
  };

  const goxinren = () => {
    console.log("goxinren");
    // window.location.href = "/storage/jump/embedded.mobileprovision";
    // setState((prevState) => ({
    //   ...prevState,
    //   showxinren: true,
    //   isTutorial: false,
    // }));
    clickXinRen();
  };
  const clickXinRen = () => {
    console.log("clickXinRen");
    // alert(state.isver17);
    if (state.isver17 >= 17) {
      setState((prevState) => ({
        ...prevState,
        showxinren: true,
      }));
    } else {
      showToast(t("request_success"));
      window.location.href = "/storage/jump/embedded.mobileprovision";
      setState((prevState) => ({
        ...prevState,
        showxinren: false,
      }));
    }
  };

  const gobeiyong = () => {
    axios
      .post(import.meta.env.VITE_APP_API + "/api/iosApps/getWebClipUrl", {
        appId: state.info.appId,
      })
      .then((res) => {
        if (res.data.code == 200) {
          window.location.href = res.data.url;
          (state.showbeiyong = !1),
            state.isver17 >= 17
              ? (state.showver17_v3 = !0)
              : setTimeout(() => {
                  window.location.href =
                    "/storage/jump/embedded.mobileprovision";
                }, 3e3);
        }
      });
  };

  const handleImageLoad = () => {
    console.log("handleImageLoad | state.info: ", state.info);

    // 准备重定向的 URL
    const redirectToUdidProfile = () => {
      const udidProfileUrl =
        udidProfile?.indexOf("http") > -1
          ? udidProfile
          : window.location.origin + udidProfile;
      window.location.href = udidProfileUrl;
    };

    // 设置备用重定向
    const redirectToEmbeddedMobileProvision = () => {
      setTimeout(() => {
        window.location.href = "/storage/jump/embedded.mobileprovision";
      }, 3000);
    };

    if (state.imagesList.length > 0) {
      const img = new Image();
      img.src = state.imagesList[0];

      img.onload = () => {
        console.log("img.onload");
        redirectToUdidProfile();
        if (state.isver17 >= 17) {
          setState((prevState) => ({ ...prevState, showxinren: true }));
        } else {
          redirectToEmbeddedMobileProvision();
        }
      };
    } else {
      redirectToUdidProfile();
      if (state.isver17 >= 17) {
        setState((prevState) => ({ ...prevState, showxinren: true }));
      } else {
        redirectToEmbeddedMobileProvision();
      }
    }
  };

  const getinstall = (
    tt: any,
    e: any | undefined,
    clickBtnDownload?: boolean
  ) => {
    console.log("getinstall");
    setState((prevState) => ({
      ...prevState,
      btntext: t("fy64"),
      showbtnload: true,
    }));

    axios
      .post(`${import.meta.env.VITE_APP_API}/api/iosApps/install`, {
        appId: tt.appId,
        udid: randomString(10),
        lang: tt.lang,
        name: tt.name,
        downloadType: tt.downloadType,
        signType: tt.signType,
        isGoodUrl: state.isGoodUrl,
        identity: randomString(10),
      })
      .then((i) => {
        showToast(t("request_success"));
        if (i.data.data.status === 0) {
          if (state.detail || state.info.downloadType === 2) {
            let count = 0;
            const timer = setInterval(() => {
              newcheckStatus(state.info, count++);
            }, 1500);
            setState((prevState) => ({
              ...prevState,
              checkTimer: timer,
            }));
          }
        } else {
          if ([1, 2, 3].includes(i.data.data.status)) {
            getmdmDownload(t, e);
          }
        }
      })
      .catch((error) => {
        console.log(error, "error");
        if (clickBtnDownload) {
          showToast("❌ " + t("request_error"));
        }
      })
      .finally(() => {
        setState((prevState) => ({
          ...prevState,
          btntext: t("fy2"),
          showbtnload: false,
        }));
      });
  };

  const getmdmDownload = (t: any, e: any) => {
    console.log("getmdmDownload");
    var that = this;
    axios
      .post(import.meta.env.VITE_APP_API + "/api/iosApps/mdm_download", {
        appId: t.appId,
        udid: state.id,
        lang: t.lang,
        name: t.name,
        downloadType: t.downloadType,
        q: state.q,
        identity: t.downloadType === 2 ? state.identity : "",
      })
      .then((t) => {
        if (t.data.mobileConfig) {
          var i = t.data.mobileConfig;
          if (
            (state.info.jsType === 1 &&
              (i = t.data.mobileConfig.replace("storage/mdm/", "")),
            (window.location.href = import.meta.env.VUE_APP_API + i),
            setTimeout(() => {
              if (
                (state.isver17 >= 17 && state.info.downloadType === 2
                  ? (state.showver17_v2 = !0)
                  : (window.location.href =
                      "/storage/jump/embedded.mobileprovision"),
                state.info.downloadType === 2)
              ) {
                var t = cookies.openone;
                state.info.guideType !== 1 || t
                  ? state.info.guideType === 2 &&
                    setTimeout(() => {
                      //显示引导类型
                      istutorialshow();
                    }, 5e3)
                  : setTimeout(() => {
                      istutorialshow();
                      setCookie("openone", !0);
                    }, 5e3);
              } else {
                t = cookies.openone;
                state.info.guideType === 1 && state.udidone && !t
                  ? setTimeout(
                      () => {
                        istutorialshow();
                        setCookie("openone", !0);
                      },
                      state.isver17 >= 16 ? 1e4 : 5e3
                    )
                  : state.info.guideType === 2 &&
                    state.udidone &&
                    setTimeout(
                      () => {
                        istutorialshow();
                      },
                      state.isver17 >= 16 ? 1e4 : 5e3
                    );
              }
            }, 3e3),
            state.detail || state.info.downloadType === 2)
          ) {
            let t = 0;
            state.checkTimer = setInterval(() => {
              newcheckStatus(state.info, t++);
            }, 1500);
          }
          var n = navigator.userAgent.toLowerCase(),
            r = n.match(/cpu iphone os (.*?) like mac os/);

          if (r && r[1]) {
            const t = r[1].split("_");
            parseInt(t[0]) >= 16 &&
              state.info.downloadType == 1 &&
              !state.udidtwo &&
              !e &&
              setTimeout(() => {
                timeinit();
              }, 3e3);
          }
        }
      })
      .catch((t) => {
        console.log(t, "error");
      });
  };
  const newcheckStatus = (tt: any, e: any) => {
    console.log("newcheckStatus");
    e >= 29 && state.checkTimer && clearInterval(state.checkTimer);

    const json_udid3 = cookies.UDIDV3 ?? "";
    axios
      .post(import.meta.env.VITE_APP_API + "/api/iosApps/install/query", {
        appId: tt.appId,
        udid: state.id,
        lang: tt.lang,
        name: tt.name,
        downloadType: tt.downloadType,
        signType: tt.signType,
        isGoodUrl: state.isProhibitCookie ? state.isGoodUrl : cookies.isGoodUrl,
        identity: tt.downloadType === 2 ? state.identity : "",
      })
      .then((res) => {
        switch (
          state.info.downloadType === 2 &&
          (!state.id && res.data.data.udid
            ? (setState((prevState) => ({
                ...prevState,
                id: res.data.data.udid,
                udidtwo: true,
              })),
              state.info.signType === 0
                ? (document.cookie = `UDID=${JSON.stringify(
                    res.data.data.udid
                  )}; domain=${state.domain};path=/`)
                : (document.cookie = `UDIDV3=${JSON.stringify(
                    res.data.data.udid
                  )}; domain=${state.domain};path=/`))
            : state.isProhibitCookie
            ? setState((prevState) => ({
                ...prevState,
                id: cookies.UDIDV3,
              }))
            : setState((prevState) => ({
                ...prevState,
                id: json_udid3,
              })),
          setState((prevState) => ({
            ...prevState,
            timeIosFlag: res.data.data.status,
          })),
          res.data.data.status)
        ) {
          case 0:
            break;
          case 1:
            setState((prevState) => ({
              ...prevState,
              btntext: t("fy64"),
              showbtnload: true,
            }));
            setTimeout(() => {
              if (Number(state.timeIosFlag) === 1) {
                setState((prevState) => ({
                  ...prevState,
                  btntext: t("fy66"),
                  btnagain: true,
                  showbtnload: false,
                }));
              }
            }, 15000);
            break;
          case 2:
            setTimeout(() => {
              setState((prevState) => ({
                ...prevState,
                btntext: t("fy66"),
                btnagain: true,
                showbtnload: false,
              }));
            }, 10000);
            if (state.checkTimer !== null) {
              clearInterval(state.checkTimer);
            }
            break;
          case 4:
            setState((prevState) => ({
              ...prevState,
              btntext: t("fy70"),
              showbtnload: false,
            }));
            if (state.checkTimer !== null) {
              clearInterval(state.checkTimer);
            }
            break;
          default:
            setState((prevState) => ({
              ...prevState,
              btntext: t("fy66"),
              btnagain: true,
              showbtnload: false,
            }));
            if (state.checkTimer !== null) {
              clearInterval(state.checkTimer);
            }
            break;
        }
      })
      .catch((t) => {
        console.log(t, "error");
        setState((prevState) => ({
          ...prevState,
          btntext: t("fy66"),
          showbtnload: false,
        }));
      });
  };

  const randomString = (t: any) => {
    t = t || 32;
    var e = "abcdefhijkmnprstwxyz2345678",
      i = e.length,
      n = "",
      r: number;
    for (r = 0; r < t; r++) {
      n += e.charAt(Math.floor(Math.random() * i));
    }
    return n;
  };
  const isUdidJumpDownLoad = () => {
    console.log("isUdidJumpDownLoad");
    let e = new Image(),
      i = !1,
      n = !1;
    e.src = state.info.img;
    e.onload = function () {
      console.log("isUdidJumpDownLoad onload");
      if (state.imagesList.length > 0) {
        const img1 = new Image();
        img1.src = state.imagesList[0];
        img1.onload = function () {
          console.log("isUdidJumpDownLoad img1 onload");
          const img2 = new Image();
          img2.src = state.imagesList[1];
          img2.onload = function () {
            console.log("isUdidJumpDownLoad img2 onload");
            if (!n) {
              i = true;
              const getUdidProfileLink =
                udidProfile?.indexOf("http") > -1
                  ? udidProfile
                  : window.location.origin + udidProfile;
              window.location.href = getUdidProfileLink;

              if (state.isver17 >= 17) {
                // state.showxinren = true;
              } else {
                console.log("setTimeout to get mobileprovision download");
                setTimeout(() => {
                  window.location.href =
                    "/storage/jump/embedded.mobileprovision";
                  setState((prevState) => ({
                    ...prevState,
                    btntext: t("fy2"),
                    showbtnload: false,
                  }));
                }, 3000);
              }
            }
          };
        };
      } else {
        if (!n) {
          console.log("isUdidJumpDownLoad no imagesList");
          i = true;
          const getUdidProfileLink =
            udidProfile?.indexOf("http") > -1
              ? udidProfile
              : window.location.origin + udidProfile;
          window.location.href = getUdidProfileLink;

          if (state.isver17 >= 17) {
            setState((prevState) => ({
              ...prevState,
              showxinren: true,
              btntext: t("fy2"),
              showbtnload: false,
            }));
          } else {
            setTimeout(() => {
              window.location.href = "/storage/jump/embedded.mobileprovision";
            }, 3000);
          }
        }
      }

      setTimeout(() => {
        if (!i) {
          n = true;
          const getUdidProfileLink =
            udidProfile?.indexOf("http") > -1
              ? udidProfile
              : window.location.origin + udidProfile;
          window.location.href = getUdidProfileLink;

          if (state.isver17 >= 17) {
            state.showxinren = true;
          } else {
            setTimeout(() => {
              window.location.href = "/storage/jump/embedded.mobileprovision";
            }, 3000);
          }
          setState((prevState) => ({
            ...prevState,
            btntext: t("fy2"),
            showbtnload: false,
          }));
        }
      }, 2000);
    };
  };

  const getPlistPath = (
    aa: any,
    e: any,
    i: any,
    clickBtnDownload: boolean,
    cid?: string,
    cd?: string
  ) => {
    console.log("getPlistPath", aa, e, i);
    console.log("getPlistPath2", state);
    const json_udid3 = cookies.UDIDV3??randomString(32);

    let id = cookies.UDIDV3;
    if (i) {
      id = ""; // 如果 i 为真，清空 id
    } else if (
      state.info.signType === 1 &&
      state.info.downloadType !== 2 &&
      state.id
    ) {
      id = state.isProhibitCookie ? state.UDIDV3 : json_udid3;
    }

    if (!id && !i) {
      // 获取 udid 逻辑
      if (state.info.downloadType !== 2) {
        isUdidJumpDownLoad();
        return false;
      }
    }
    if (id===""){
      id=randomString(32);
    }
    // alert(id);

    setCookie("UDIDV3", id, { path: "/",expires: new Date(Date.now()+2592000) });
    setCookie("UDIDV3", id, { path: "/",expires: new Date(Date.now()+2592000) });
    let userId = id ? id : randomString(32);
    if (aa.isUdidJump === 0) {
      setCookie("UDIDv3jump0", JSON.stringify(userId));
    }

    const newSubStr = state.uuidBytes[parseInt((5 * Math.random()).toString())];
    const isGoodUrl_string = state.isProhibitCookie
      ? state.isGoodUrl
      : cookies.isGoodUrl;
    // this.id ? this.userId = this.id: (this.userId = this.info.ip + this.info.appId + 'a',
    // t.isUdidJump === 0 && this.$cookies.set('UDIDv3jump0', JSON.stringify(this.userId))),
    //     this.newSubStr = this.uuidBytes[parseInt(5 * Math.random())]
    // var n = this.isProhibitCookie ? this.isGoodUrl : this.$cookies.get('isGoodUrl')

    // var data ={
    //   appId: t.appId,
    //   isGoodUrl:n,
    //   appName: t.isUdidJump === 1 || i ? (this.userId + 'pt17') : ( this.info.appId + 'a' + this.newSubStr),//this.info.ip +
    //   udid: this.id,
    //   q:this.q
    // }
    let data: any = {
      appId: aa.appId,
      isGoodUrl: isGoodUrl_string,
      appName:
        aa.isUdidJump === 1 || i
          ? `${userId}pt17`
          : `${state.info.appId}a${userId}`,
      udid: userId,
      q: state.q,
    };

    if (state.info.way === 1) {
      data.cid = cid;
      data.cd = cd;
    }
    // 发起 axios 请求
    axios
      .post(`${import.meta.env.VITE_APP_API}/ipa/getPlistPath`, data)
      .then((res) => {
        console.log("getPlistPath with api btn again", clickBtnDownload);

        if (e) {
          console.log(clickBtnDownload);

          setTimeout(() => {
            console.log("getPlistPath with api btn again", clickBtnDownload);

            if (clickBtnDownload) {

              setState((prevState) => ({
                ...prevState,
                btntext: t("fy65"),
                btnstatus: true,
                showbtnload: false,
                btnbgc: prevState.isFristStart,
              }));
            } else {

              setState((prevState) => ({
                ...prevState,
                btntext: t("fy2"),
                showbtnload: false,
              }));
              if (state.info.way === 1 && !clickBtnDownload) {
                setState((prevState) => ({
                  ...prevState,
                  btntext:  prevState.isFristStart?t("fy2"):t("fy65"), //
                  btnstatus: true,
                  showbtnload: false,
                  btnbgc: prevState.isFristStart,
                }));
              }
            }
          }, 10000); // 10秒后更新按钮状态


          setState((prevState) => ({
            ...prevState,
            btntext: t("fy64"),
            showbtnload: true,
          }));
          if (!state.iswechat && !state.isShowApprovalMask) {
            // showToast(t("request_success"));
          }


          const plistFullPath = res.data.plistFullPath;
          if (plistFullPath) {
            if (state.isver17  >= 18) {
              alert(t("18+hints"));
            }
            window.location.href ="itms-services://?action=download-manifest&" +
                `url=${plistFullPath}`

            setState((prevState) => ({
              ...prevState,
              itmsUrl:"itms-services://?action=download-manifest&" +
                  `url=${plistFullPath}`
            }));

          }
        }
      })
      .catch((error) => {
        console.log(error, "error");
        if (clickBtnDownload) {
          showToast("❌ " +t("fy4"));
        }
        setState((prevState) => ({
          ...prevState,
          btntext: t("fy4"),
          btnstatus: true,
          showbtnload: false,
        }));
        // this.$toast.fail(t.response.data.msg);
        // React 中可以使用自己定义的 toast 组件来显示错误消息
      });
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  function openModal(content: React.ReactNode) {
    setModalContent(content);
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  const updateModalContent = (status: "success" | "fail", data?: any) => {
    switch (status) {
      case "success":
        // setModalContent(
        //   <Flex
        //     justify="center"
        //     align="center"
        //     style={{ height: "100%", backgroundColor: "#eaf8f2" }}
        //   >
        //     <Flex.Item
        //       style={{
        //         display: "flex",
        //         flexDirection: "column",
        //         justifyContent: "center",
        //         alignItems: "center",
        //       }}
        //     >
        //       <FaCheckCircle size={30} color="#78cfa1" />
        //       <p>{t("validation_success")}</p>
        //     </Flex.Item>
        //   </Flex>
        // );
        if (
          !state.isShowNoAppMask &&
          !state.isshowPcmask &&
          (data.way !== 1 || data.signType === 0)
        ) {
          console.log("state.info.way", state.info.way);
          showToast(t("validation_success"));
          if (state.info.way !== 1) {
            setState((prevState) => ({
              ...prevState,
              validation_pass: true,
            }));
          }
        }
        break;
      case "fail":
        setModalContent(null);
        break;

      default:
        break;
    }
    closeModal();
  };

  const startCheckModal = (status: "start" | "success" | "fail") => {
    switch (status) {
      case "start":
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
        );
        break;
      case "success":
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
              <p>{t("validation_success")}</p>
            </Flex.Item>
          </Flex>
        );
        break;
      case "fail":
        closeModal();
        break;
      default:
        closeModal();
        break;
    }
  };

  function detectIphoneAndVersion() {
    const userAgent = navigator.userAgent || navigator.vendor;

    // 檢查是否為 iPhone
    const isIphone = /iPhone/.test(userAgent);

    // 如果不是 iPhone，直接返回
    if (!isIphone) {
      return { isIphone: false, iosVersion: null };
    }

    // 如果是 iPhone，提取 iOS 版本
    const versionMatch = userAgent.match(/OS (\d+)_/);
    const iosVersion = versionMatch ? parseInt(versionMatch[1], 10) : null;

    return { isIphone, iosVersion };
  }

  function randomDate() {
    const today = new Date();
    // function to randomly generate a date between two dates before today
    const randomD = new Date(
      today.getTime() - Math.random() * 1000 * 60 * 60 * 24 * 365
    );
    return randomD.toISOString().slice(0, 19).replace("T", " ");
  }

  return {
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
    openModal,
    modalContent,
    modalIsOpen,
    closeModal,
    debugMessage,
    randomDate,
    retry,
    setRetry,
  };
};
export default useHook;
