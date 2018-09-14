
module.exports = {
    thousandth (num, point=null){
        num = num * 1
        let [sInt, sFloat] = (Number.isInteger(num) && point ? `${num}` : num.toFixed(point)).split('.')
        sInt = sInt.replace(/\d(?=(\d{3})+$)/g, '$&,')
        return sFloat ? `${sInt}.${sFloat}` : `${sInt}`
    }
}
