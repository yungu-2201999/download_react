export const getQueryVariable = (param: string) => {
    const params = new URLSearchParams(window.location.search);
    return params.has(param) ? params.get(param) : false;
};

// original code
// const getQueryVariable = (t: any) => {
//     let e = window.location.search.substring(1),
//         i = e.split("&");
//     for (let n = 0; n < i.length; n++) {
//         const _e = i[n].split("=");
//         if (_e[0] === t) {
//             return _e[1];
//         }
//     }
//     return !1;
// };