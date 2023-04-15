'use strict';
const moment = require('moment-timezone');

class dateFormat {
    /**
     * 获取开始时间到结束时间之间的所有日期
     * @param {number} start 毫秒时间
     * @param {number} end  毫秒时间
     * @return {Array} dateArr
     */
    async getAllDate(start, end) {
        let startTime = new Date(start);

        let dateArr = [];
        while (end - start > 0) {
            let year = startTime.getFullYear();
            let month =
                startTime.getMonth().toString().length === 1
                    ? '0' + (parseInt(startTime.getMonth().toString(), 10) + 1)
                    : startTime.getMonth() + 1;
            let day =
                startTime.getDate().toString().length === 1
                    ? '0' + startTime.getDate()
                    : startTime.getDate();
            dateArr.push(year + '-' + month + '-' + day);
            startTime.setDate(startTime.getDate() + 1);
            start = startTime.getTime();
        }
        return dateArr;
    }

    /**
     * 根据对应的选项，计算相应的开始毫秒时和结束毫秒时
     * @param {string} dateType
     * @return {Array} dateArr
     */
    async getDuration(dateType) {
        let startTime = 0,
            endTime = Date.now();
        let date = new Date();
        let dateArr = [];
        switch (dateType) {
            case 'today':
                date.setHours(0, 0, 0, 0);
                startTime = date.getTime();
                break;
            case 'yesterday':
                date.setHours(0, 0, 0, 0);
                endTime = date.getTime() - 1;
                startTime = endTime + 1 - 24 * 60 * 60 * 1000;
                break;
            case 'week':
                let day = date.getDay() - 1;
                date.setHours(0, 0, 0, 0);
                startTime = date.getTime() - day * 24 * 60 * 60 * 1000;
                break;
            case 'month':
                date.setDate(1);
                date.setHours(0, 0, 0, 0);
                startTime = date.getTime();
                break;
        }
        dateArr.push(startTime);
        dateArr.push(endTime);
        return dateArr;
    }
    /**
     * 通过出生年月日计算年龄
     * @param {Number} birthYear 1990
     * @param {Number} birthMonth 10
     * @param {Number} birthDay 10
     */
    async getAge(birthYear, birthMonth, birthDay) {
        const nowDate = new Date();
        const nowYear = nowDate.getFullYear(),
            nowMonth = nowDate.getMonth() + 1,
            nowDay = nowDate.getDate();
        let age = nowYear - birthYear;
        if (nowMonth < birthMonth) {
            age -= 1;
        } else if (nowMonth == birthMonth && nowDay < birthDay) {
            age -= 1;
        }
        return age;
    }

    /**
     * 计算现在的年龄
     * @param {String} birthday 2019-06-18
     * @returns {Object}{ years: 25, months: 2 }
     */
    async getAgeByMoment(birthday) {
        let diff_months = moment().diff(moment(birthday), 'months');
        return { years: parseInt(diff_months / 12), months: diff_months % 12 };
    }

    /**
     * 计算两个日期之间相差的天数
     * @param {String} date1
     * @param {String} date2
     * date1和date2是2019-06-18格式
     * @returns {Number} 5226
     */
    async getDaysDistance(date1, date2) {
        //parse() 是 Date 的一个静态方法 , 所以应该使用 Date.parse() 来调用，而不是作为 Date 的实例方法。返回该日期距离 1970/1/1 午夜时间的毫秒数
        date1 = Date.parse(date1);
        date2 = Date.parse(date2);
        //计算两个日期之间相差的毫秒数的绝对值
        var ms = Math.abs(date2 - date1);
        //毫秒数除以一天的毫秒数,就得到了天数
        var days = Math.floor(ms / (24 * 3600 * 1000));
        return days;
    }

    async getDaysByMoment(date1, date2) {
        return moment(date1).diff(moment(date2), 'days');
    }

    /**
     * only changed the timezone tags, for empale,"Asia/Shanghai" to "Asia/Bangkok"， but the time value part is not changed
     * @param {String} time - time to convert
     * @param {String} timezone - timezone to convert to
     * @param {String} format - output format, default is "YYYY-MM-DD HH:mm:ss"
     */
    async setDateByTZ(time, timezone = 'Asia/Kuala_Lumpur', format = '') {
        const date = moment(time);
        return date.tz(timezone, true).format(format);
    }
}
module.exports = dateFormat;
