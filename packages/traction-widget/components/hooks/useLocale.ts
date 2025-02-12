import zhCN from '../locales/lang/zhCN.ts';
import enUS from '../locales/lang/enUS.ts';

// 定义 locale 类型
type Locale = Record<string, any>;

export function useLocale (): Locale {
    let storedLocale = 'zh-CN';
    if (typeof window !== 'undefined') {
        storedLocale = localStorage.getItem('fes_locale') || 'zh-CN';
    }

    return storedLocale === 'en-US' ? enUS : zhCN;
}
