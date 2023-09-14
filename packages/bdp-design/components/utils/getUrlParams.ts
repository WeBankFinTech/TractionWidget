
interface SearchOptions {
    type?: 'str' | 'param'
    keys?: string[]
};

type ResultType = Record<string, any>;

/*
* 查询字符串格式化函数
*/
export function getUrlParams (opts?: SearchOptions): ResultType | string {
    const { type = 'param', keys } = opts || {};
    const search = window.location.search || window.location.hash.split('?')[1] || '';
    const searchParams = (search.match(/[^?&]+/g) || []);
    let result: ResultType | string = type === 'param' ? {} : '';
    searchParams.forEach((item) => {
        const [key, val] = (item || '').split('=');
        if (!key) return;
        const isSet = !keys || !Array.isArray(keys) || keys.includes(key);
        if (!isSet) return;
        if (type === 'param') {
            (result as ResultType)[key] = val;
        } else {
            result += result ? `&${item}` : item;
        }
    });
    return result;
}
