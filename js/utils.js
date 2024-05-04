class utils{
    /**
     * 生成指定长度的随机字符串
     * @param {array} optArray [n,l,m]
     * @param {number} len 8
     */
    async RandomStr(optArray,len){
        const numbers='0123456789';
        const lowerLetters='abcdefgijklmnopqrstuvwxy';
        const upperLetters=lowerLetters.toUpperCase();
        let data='';
        optArray.forEach(element=>{
            if(element==='n'){
                data += numbers;
            }
            if (element==='l'){
                data += lowerLetters;
            }
            if (element==='u')
            {
                data += upperLetters;
            }
        });
        let  res='';
        const datalen=data.length;
        for (let i = 0; i < len; i++) {
            let random=Math.floor(Math.random()*datalen);
            res += data[random];
        }
        return res;
    }
    /**
     * sleep函数的实现方式
     * @param {number} ms 毫秒
     */
    async sleep(ms){
        return new Promise(resolve => setTimeout(resolve, ms))
    }
    /**
     * @description 计算两个经纬度相差的距离,只精确到米
     * @param {Number} lng1 第一个经度
     * @param {Number} lat1 第一个维度
     * @param {Number} lng2 第二个经度
     * @param {Number} lat2 第二个维度
     */
    async distanceByLnglat(lng1, lat1, lng2, lat2){
        let radLat1 = lat1 * Math.PI / 180.0;
	    let radLat2 = lat2 * Math.PI / 180.0;
        let a = radLat1 - radLat2;
        let b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
        let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
		s = s * 6378137.0; // 取WGS84标准参考椭球中的地球长半径(单位:m)
		s = Math.round(s);
		return s;
    }

    /**
     * @description 判断字符串中是否存在unicode
     * @param {string} str 字符串
     */
    async isContainUnicode(str){
        return message.length !== Buffer.byteLength(message, 'utf8');
    }
    
    /**
     * @description 判断字符串中是否存在unicode
     * @param {string} str 字符串
     */
    async isContainUnicodeWithReg(str){
        return /[^\x00-\xff]/g.test(str);
    }
}
module.exports = utils;