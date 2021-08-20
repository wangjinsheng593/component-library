// 校验手机号码
/**
 * 正则：手机号（精确）
 * 移动：134(0-8)、135、136、137、138、139、147、150、151、152、157、158、159、178、182、183、184、187、188、198
 * 联通：130、131、132、145、155、156、175、176、185、186、166
 * 电信：133、153、173、177、180、181、189、199
 * 全球星：1349
 * 虚拟运营商：170
 **/
const checkPhone = (rule, value, callback) => {
    if (!value) {
        callback(new Error('请输入手机号码'))
    } else {
        if ((!(/^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/.test(value)))) {
            callback(new Error('手机号码格式不正确'))
        } else {
            callback()
        }
    }
}
// 校验数量
const isvalidNumber = (rule, value, callback) => {
    const reg = /^(?!^-+$)(?!^_+$)(?!^\d+$)[\d|a-zA-Z|\-|_]{6,16}$/
    if (value) {
        if (!reg.test(value)) {
            return callback(new Error('请输入数字、字母、下划线或者中划线的编号'))
        } else {
            callback()
        }
    }
}

// 判断输入框是否为空
const isEmpty = (obj) => {
    if (typeof obj === 'undefined' || obj == null || obj === '') {
        return true
    } else {
        return false
    }
}
// 验证码长度
const imgcodeLen = (rule, value, callback) => {
    if (value.length !== 4) {
        callback(new Error('验证码长度不正确'))
    } else {
        callback()
    }
}
// 校验身份证号码
const checkIdCard = (rule, value, callback) => {
    if (!value) {
        callback(new Error('请输入身份证号码'))
    } else {
        if ((!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)))) {
            callback(new Error('身份证号码格式不正确'))
        } else {
            callback()
        }
    }
}

// 校验金额
const checkMoney = (rule, value, callback) => {
    var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
    if (value) {
        if (!reg.test(value)) {
            return callback(new Error('请输入正整数或者两位小数的价格'))
        } else {
            callback()
        }
    }
}

// 汇率管理的新增校验
const validateExchangeRate = (rule, value, callback) => {
    const myreg = /^\d+(\.{0,1}\d+){0,1}$/
    if (value && !myreg.test(value)) {
        callback(new Error('仅限数字并且大于0'))
    } else {
        callback()
    }
}

export default {
    checkPhone,
    isvalidNumber,
    isEmpty,
    imgcodeLen,
    checkIdCard,
    checkMoney,
    validateExchangeRate

}
