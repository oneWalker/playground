const xml2js = require('xml2js')
const parser = new xml2js.Parser({ explicitArray: false });
const builder = new xml2js.Builder({ headless: true, xmldec: { version: "1.0", encoding: "UTF-8" }, renderOpts: { 'pretty': false } });
class xml{
    /**
     * json to XML data
     * @param {Object} data Object/json
     * @returns 
     */
    async buildXml(data){ 
        return builder.buildObject(data);
    }
    
    /**
     * XML string to json
     * @param {String} str XML string
     * @returns 
     */
    async parseXml(str){
        return new Promise((resolve, reject) => {
            parser.parseString(str, function (err, result) {
                if(err){
                    reject(err);
                }else{
                    resolve(result)
                }
            });
        })
    }
}
module.exports = xml