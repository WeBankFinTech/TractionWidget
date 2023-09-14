// 是否为IE浏览器, 如果为IE则弹窗
export const isIE = (): boolean => {
    if (!!((window as any).ActiveXObject) || 'ActiveXObject' in window) {
        alert('请使用Chrome或其他高级浏览器，IE可能会无法正常显示');
        return true;
    }

    return false;
};
