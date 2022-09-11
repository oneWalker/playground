import Excel, { CellValue } from 'exceljs';
import path from 'path';
import fs from 'fs';

//define json in ts
interface CellJSON {
    [key: string]: CellValue;
}
/**
 *
 * @param {string} filePath
 * @return string
 * @description check that the path is valid, by absolute path and relative path
 */
const pathValidator = (filePath: string): string => {
    //current path is src/scripts/test.csv
    if (!path.isAbsolute(filePath)) {
        filePath = path.resolve(__dirname, filePath);
    }
    if (!fs.existsSync(filePath)) {
        console.error(`Input file${filePath} doesn't exist`);
    }
    return filePath;
};

/**
 *
 * @param {string} column
 * @param {string} type
 * @param {[key:string]:string} typeOptions target type that we need
 * @description check if the column is the target type
 */
const formatedChecker = (column: string, type: Excel.ValueType, typeOptions: CellJSON): boolean => {
    return type === typeOptions[column];
};

/**
 *
 * @param {string} outputPath the directory path we want to put the final file
 * @param {Array} data  the data we want to get
 * @param {Array} options the header we want to save in csv, like { `${prevKey}:${curHeader}`}
 * @descrition save the data to csv file
 */
async function saveCSV(
    outputPath: string,
    data: CellJSON[],
    options: CellJSON[] = [],
): Promise<string> {
    if (!Array(data) || data.length === 0) {
        console.error('data is empty');
        return null;
    }
    if (options.length === 0) {
        const dataJson = data[0];
        for (const title in dataJson) {
            options.push({
                header: title,
                key: title,
            });
        }
    }
    outputPath = path.resolve(pathValidator(path.dirname(outputPath)), path.basename(outputPath));
    const workbook = new Excel.Workbook();
    const newSheet = workbook.addWorksheet();
    newSheet.columns = options;
    newSheet.addRows(data);
    await workbook.csv.writeFile(outputPath);
    return outputPath;
}

/**
 *
 * @param {string} csvPath
 * @param {string} outputPath
 * @param {[key:string]:string} typeOptions the original type in every column that we require
 * @param {[key:string]:string} transformOptions transform the original CSV's header to a general headers
 * @description transform the csv file to the target type,
 */
async function generateGeneralCSV(
    csvPath: string,
    outputPath: string,
    startRow: number = 1,
    typeOptions: CellJSON,
    transformOptions: CellJSON,
    checkFunc: (value: CellValue, type: string) => Promise<CellValue>,
): Promise<string> {
    const inputPath = pathValidator(csvPath);
    let outputDir = outputPath;
    let baseName = path.basename(inputPath);
    //全路径校验dirname，否则校验本身
    if (path.extname(outputDir).length !== 0) {
        outputDir = path.dirname(outputPath);
        baseName = path.basename(outputPath);
    }
    outputDir = pathValidator(outputDir);
    outputPath = path.resolve(outputDir, baseName);

    //file read,check,transform and output
    const workbook = new Excel.Workbook();
    await workbook.csv.readFile(inputPath);
    const worksheet = workbook.getWorksheet(1);

    //read headers
    const titles: string[] = <string[]>worksheet.getRow(1).values;
    const errors: string[] = [],
        data: CellJSON[] = [];
    let rowData: CellJSON = {};
    let error: string;
    worksheet.eachRow(async (row, rowNum) => {
        if (rowNum > startRow) {
            rowData = {};
            row.eachCell(async (cell, colNum) => {
                const key = titles[colNum];
                rowData[key] = cell.value;
                if (formatedChecker(key, cell.type, typeOptions)) {
                    rowData[key] = await checkFunc(cell.value, key);
                    //console.log('content',key, rowData[key]);
                } else {
                    error = `The ${rowNum} ${key} is not ${cell.type}`;
                    console.log(error);
                    errors.push(error);
                }
            });
            console.log('rowData', rowData);
            data.push(rowData);
        }
    });
    //console.log('data', data);

    //console.log('readData', data);
    //return;
    const options = [];
    for (const key in transformOptions) {
        options.push({
            header: transformOptions[key],
            key: key,
        });
    }
    //console.log('options', options);
    //console.log(path.extname.length, path.basename(csvPath));
    if (path.extname(outputPath).length === 0) {
        outputPath = path.resolve(outputDir, path.basename(csvPath));
    }
    return await saveCSV(outputPath, data, options);
}

/**
 *
 * @param {string} csvPath the file's path we want to get
 * @param {number} startRow the index we want to start to read
 * @description read the data from csv and get array results
 */
async function getJSONArrFromCSV(csvPath: string, startRow: number): Promise<CellJSON[]> {
    const inputPath = pathValidator(csvPath);
    // console.log('inputPath', inputPath);
    //file read,check,transform and output
    const workbook = new Excel.Workbook();
    await workbook.csv.readFile(inputPath);
    const worksheet = workbook.getWorksheet(1);
    const titles: string[] = <string[]>worksheet.getRow(1).values;
    const data: CellJSON[] = [];
    let rowData: CellJSON = {};
    worksheet.eachRow((row, rowNum) => {
        if (rowNum > startRow) {
            rowData = {};
            row.eachCell((cell, colNum) => {
                const key: string = titles[colNum];
                rowData[key] = cell.value;
            });
            data.push(rowData);
            // console.log('rowData', rowData);
        }
    });

    return data;
}

export { CellJSON, saveCSV, generateGeneralCSV, pathValidator, formatedChecker, getJSONArrFromCSV };
