import { ref } from 'vue';
import zhCN from '../locales/lang/zhCN.ts';
import enUS from '../locales/lang/enUS.ts';

// 定义 locale 类型
type Locale = Record<string, any>;

export function useLocale (): Locale {
    const locale = ref<Locale>({});
    const storedLocale = localStorage.getItem('fes_locale');
    if (storedLocale === 'en-US') {
        locale.value = enUS;
    } else {
        locale.value = zhCN;
    }
    return locale.value;
}
