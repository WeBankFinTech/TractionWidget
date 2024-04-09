export const format = {
    // 表格格式化函数
    TABLE: {
        // 将空白格式化为'--'
        textValue: ({ cellValue }: { cellValue: any }): any => {
            if (cellValue === 0) return 0;
            return cellValue || '--';
        },
        // 数字格式化函数，小数点前每3位打一个逗号
        stdNumber: ({ cellValue }: { cellValue: any }): any => {
            if (cellValue === 0) return 0;
            if (isNaN(cellValue) || cellValue === null || cellValue === '') {
                return '--';
            }
            const num = Number(cellValue);
            const parts = num.toString().split('.');
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            return parts.join('.');
        },
        // 数字格式化函数，小数点前每3位打一个逗号,严格保留两位小数
        stdNumberFix2: ({ cellValue }: { cellValue: any }): any => {
            if (cellValue === 0) return 0.00;
            if (isNaN(cellValue) || cellValue === null || cellValue === '') {
                return '--';
            }
            const num = Number(cellValue).toFixed(2);
            const parts = num.toString().split('.');
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            return parts.join('.');
        },
        // 布尔量格式化函数，转是否
        bool2string: ({ cellValue }: { cellValue: any }): any => {
            if (['', null, undefined].includes(cellValue)) {
                return '--';
            }
            return (([true, 'true', '是', '1', 1].includes(cellValue)) ? '是' : '否');
        }
    },
    NORMAL: {
        // 将字符串中大写字母转为下划线加小写
        convertToSnakeCase: (str: string) => str.replace(/[A-Z]/g, match => `_${match.toLowerCase()}`),
        // 数值标准化，可指定保留几位小数，每隔3位打逗号
        formatterStdNumberByString: (number: any, isFixed = false, fixNumber: number | undefined) => {
            let num: number = Number(number);
            if (isFixed) {
                num = Number(number).toFixed(fixNumber);
            }
            // eslint-disable-next-line no-restricted-globals
            if (isNaN(num)) {
                return '--';
            }
            const parts = num.toString().split('.');
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            return parts.join('.');
        }
    }
};
