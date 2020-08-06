
class dateFormat{
    /**
     * 获取开始时间到结束时间之间的所有日期
     * @param {number} start 毫秒时间
     * @param {number} end  毫秒时间
     * @return {Array} dateArr
     */
    async getAllDate(start,end){

        let startTime=new Date(start);
        
        let dateArr=[];
        while( (end - start) >0){
            let  year = startTime.getFullYear();
            let month= startTime.getMonth().toString().length===1?"0" + (parseInt(startTime.getMonth().toString(),10) + 1) : (startTime.getMonth() + 1);
            let day = startTime.getDate().toString().length === 1 ? "0" + startTime.getDate() : startTime.getDate();
            dateArr.push(year + "-" + month + "-" + day);
            startTime.setDate(startTime.getDate()+1);
            start = startTime.getTime();
        }
        return dateArr;
    }

     /**
     * 根据对应的选项，计算相应的开始毫秒时和结束毫秒时
     * @param {string} dateType
     * @return {Array} dateArr 
     */
    async getDuration(dateType)
    {
        let startTime=0,endTime=Date.now();
        let date = new Date();
        let dateArr = [];
        switch(dateType){
            case 'today':
                date.setHours(0,0,0,0);
                startTime=date.getTime();
                break;
            case 'yesterday':
                date.setHours(0,0,0,0);
                endTime=date.getTime()-1;
                startTime=endTime+1-24*60*60*1000;
                break;
            case 'week':
                let day = date.getDay()-1;
                date.setHours(0,0,0,0);
                startTime=date.getTime()-day*24*60*60*1000;
                break;
            case 'month':
                date.setDate(1);
                date.setHours(0,0,0,0);
                startTime=date.getTime();
                break;
        }
        dateArr.push(startTime);
        dateArr.push(endTime);
        return dateArr;
    }
}
module.exports = dateFormat;