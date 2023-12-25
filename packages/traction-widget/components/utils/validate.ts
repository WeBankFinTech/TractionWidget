
const MAX_INT_W8 = 99999999; // 数据库标识宽度为8
const MIN_INT_W8 = -9999999;
const MAX_INT32 = 2147483647; // int32 最大值
const MIN_INT32 = -2147483648;
export const validate = {
    REG: {
        EN_NAME: /^[a-zA-Z0-9_]*$/, // 英文、数字、下划线
        EN_NAME2: /^[a-zA-Z0-9_-]*$/, // 英文、数字、下划线、-
        CN_NAME: /^[\u4e00-\u9fa5a-z0-9_]*$/, // 可输入中英文、数字、下划线
        ONLY_EN_NUM: /^[a-zA-Z0-9]*$/, // 英文数字
        EN_NAME3: /^[a-z0-9][a-z0-9_&]*$/, // 开头只能是英文、数字，中间可输入英文、数字、下划线和&
        EN_NAME4: /^[a-z][a-z0-9_]*$/, // 开头只能是小写英文，中间可输入小写英文、数字、下划线
        EN_NAME5: /^[a-z0-9]*$/, // 需填写小写英文或数字
        CN_NAME2: /^[\u4e00-\u9fa5a-z0-9][\u4e00-\u9fa5a-z0-9_&()]*$/, // 开头只能是中英文数字，中间可输入中英文、数字、下划线、&和英文括号
        EN_NAME6: /^[a-z0-9][a-zA-Z0-9_&]*$/, // 开头只能是小写英文，中间可输入英文、数字、下划线
        NUMBER_CONTAIN_FLOAT: /^-?(?:\d+)(?:.\d+)?$/, // 包含小数的数字正则
        NUMBER_CONTAIN_FLOAT_PLUS: /^(?:\d+)(?:.\d+)?$/, // 包含小数的数字正则,只允许正数
        INTEGER: /^(0|[1-9]\d*)$/, // 正整数
        IPV4: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,// IPv4 地址
        RARE_CHARACTER: /^(\u3007|[\u3400-\u9FFF]|[\uE000-\uF8FF]|[\uD840-\uD87F][\uDC00-\uDFFD]|[\uD880-\uD8BF]|[\uDC00-\uDFFD]|[a-zA-Z0-9])+(\u00B7(\u3007|[\u3400—\u9FFF]|[\uE000-\uF8FF]|[\uD840-\uD87F][\uDC00-\uDFFD]|[\uD880-\uD8BF][\uDC00-\uDFFD]|[a-zA-Z0-9])+)*$/,// 可输入中文（包括生僻字）、英文、数字、下划线
    },
    // 直接放到fesform的rule对应字段里使用
    VALIDATOR: {
        INTW8: (rule: any, value: any, cb: any) => ((Number(value) <= MAX_INT_W8 && Number(value) >= MIN_INT_W8) ? cb() : cb(new Error('Error Number'))), // 判断数字大小
        INT32: (rule: any, value: any, cb: any) => ((Number(value) <= MAX_INT32 && Number(value) >= MIN_INT32) ? cb() : cb(new Error('Error Number'))), // 判断数字大小
        SAFEINT: (rule: any, value: any, cb: any) => ((Number(value) <= Number.MAX_SAFE_INTEGER && Number(value) >= Number.MIN_SAFE_INTEGER) ? cb() : cb(new Error('Error Number'))) // JS Number 所能表示的最大整数范围，超出会导致精度丢失
    }
};
