
// 表格格式化函数，将空白格式化为'--'
// fes 的 cellValue 类型为 any
export const formatterEmptyValue = ({ cellValue }: { cellValue: any }): any => {
    if (cellValue === 0) return 0;
    return cellValue || '--';
};
