
'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const promisify = require('promisify');
const Excel = require('exceljs');
const path= require('path');
const moment= require('moment')

class excel{

    //此函数以eggjs为相应的例子，使用其他时可换成相应函数
    async download(req,res){
        //res可替换对应框架中的response
        //不显示进度条
        const { filePath } =req.body;
        const fileSize = (await promisify(stat))(filepath).size.toString();
        this.ctx.attachment(filePath);
        this.ctx.set('Content-Type', 'application/octet-stream');
        this.ctx.set('Content-Length', fileSize);
        this.ctx.body = fs.createReadStream(filePath);
    }

    async genAndSave(){
        //mocking data
        let shareMap={
            "openid":'分享用户ID',
            "nickname":'微信昵称',
            "shareTime":'分享时间',
            "pv":'链接被打开的用户数量',
            "tradenum":'成功交易的数量'
        };
        let preData = [{
            "openid":'wx_xxxxx',
            "nickname":'微信昵称',
            "shareTime":'2021-01-11',
            "pv":10,
            "tradenum":5
        }];
        let workbook,filename,filepath;
        workbook = new Excel.Workbook();
        workbook.creator='creator_name';
        workbook.lastModifiedBy = 'creator_name';
        workbook.created = new Date();
        workbook.modified = new Date();

        sharesheet=workbook.addWorksheet('sharesheet');
        sharesheet.columns = await this.columnsDefine(shareMap);

        if(preData.length){
            sharesheet.addRows(preData);
        }
        filename=`${filename}.xlsx`;
        filepath=path.join(__dirname,`../public/${filename}`);
        await workbook.xlsx.writeFile(filepath);
        return  {
            code:200,
            filePath:filepath
        }
    }
 
    /**
     * 物理删除实际存放的文件地址
     * @param {string} filePath 
     */
    async delete(filePath){
        fs.unlink(filePath,(err)=>{
            if (!err) {
                return {
                    code:200, data:null,msg:"删除成功"
                }
            }else{
                return {
                    code:200,data:err,msg:"删除失败"
                }
            }
        });
    }

    /**
     * 定义excel的cloumn列表和顶部标题栏
     * @param {Object} map {element:key} 顶部第一排，key为第一排的值
     * @return {Array} res
     */
    async columnsDefine(map){
        let res=[];
        for (const key in map) {
            if (map.hasOwnProperty(key)) {
                const element = map[key];
                res.push({
                        header:element,
                        key:key,
                        width:15 //默认15个字符
                    });
                
            }
        }
        return res;
    }
}
module.exports =excel;