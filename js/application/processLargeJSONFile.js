
const fs = require('fs');
const JSONStream = require('JSONStream');

let i = 0; // 用于计数已处理的数据
let batch = []; // 用于存储批量数据
const batchSize = 500; // 将批次大小设置为 500，减少 JSON 大小
function processLargeJSONFile(filePath) {
    const stream = fs.createReadStream(filePath, { encoding: 'utf8' });
    const parser = JSONStream.parse('*'); // 解析 JSON 数组中的每个元素

    // 处理任务队列，确保任务按顺序执行
    let processingQueue = Promise.resolve();

    stream.pipe(parser);

    parser.on('data', (data) => {
        processingQueue = processingQueue.then(async () => {
            data._id = data._id['$oid'];
            batch.push(data);
            i++;

            // 如果 batch 中的数据达到了批量大小，进行写入
            if (batch.length >= batchSize) {
                console.log(`Writing batch at count: ${i}`);
                try {
                    //...process the batch here
                } catch (err) {
                    console.error('Error during batch upload:', err);
                }
                batch = []; // 清空 batch

                // 每处理 500 条数据后等待 5 秒
                console.log(`Processed ${i} documents, waiting for 1 seconds...`);
                await sleep(1000); // 等待 5 秒
            }
        });
    });

    parser.on('end', async () => {
        // 处理完所有的数据后，执行队列中的最后一个任务
        await processingQueue;
        // 在处理完成时，写入剩余的批次
        if (batch.length > 0) {
            console.log(`Writing remaining batch at end, total count: ${i}`);
            try {
                //.... process the last batch here
                console.log('response', response);
            } catch (err) {
                console.error('Error during final batch upload:', err);
            }
        }
        console.log('Finished processing the file.');
    });

    parser.on('error', (err) => {
        console.error('Error parsing the file:', err);
    });
}