import { ref } from 'vue';
import zhCN from '../locales/lang/zhCN.ts';
import enUS from '../locales/lang/enUS.ts';

// 定义 locale 类型
type Locale = Record<string, any>;

export function useLocale (): Locale {
    const locale = ref<Locale>({});
    let storedLocale = 'zh-CN';  // 默认使用中文
    
    // 只在浏览器环境下读取 localStorage
    if (typeof window !== 'undefined') {
        storedLocale = localStorage.getItem('fes_locale') || 'zh-CN';
    }

    if (storedLocale === 'en-US') {
        locale.value = enUS;
    } else {
        locale.value = zhCN;
    }
    return locale.value;
}
