/*
 * Download--Excel
 * @param {blob} data
 * @param {文件名} fileName
 */
export const forceDownload = (blobUrl: string, fileName: string = 'file.xlsx', callback: () => void): void => {
    const elink: HTMLAnchorElement = document.createElement('a');
    elink.style.display = 'none';
    elink.download = fileName;
    elink.href = blobUrl;
    elink.click();
    if (callback) {
        callback();
    }
};
