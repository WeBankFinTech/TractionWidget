const prefixCls = 'T';

export default function getPrefixCls (suffixCls: string): string {
    return suffixCls ? `${prefixCls}-${suffixCls}` : prefixCls;
}
