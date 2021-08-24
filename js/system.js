const fs = require('fs'),
const child_process = require('child_process'),
class system{
    //执行shell脚本
    async execShell(cmd) {
        return new Promise(function (resolve, reject) {
            child_process.exec(cmd, { maxBuffer: 10240 * 1024 }, function (e, stdout, stderr) {
                log(cmd);
                log('stdout:' + stdout);
                log('stderr:' + stderr);
                if (e) {
                    log('e' + e.stack || e);
                    return reject(e);
                }
                let result = stdout ? stdout : stderr;
                resolve(result);
            });
        });
    }

    //新起进程不等待
    async execSpawn(cmd, params, log_file) {
        return new Promise(function (resolve, reject) {
            out = fs.openSync(log_file, 'a'),
                err = fs.openSync(log_file, 'a');
            child_process.spawn(cmd, params, {
                stdio: ['ignore', out, err], // piping all stdio to /dev/null
                detached: true
            }).unref();
            resolve('true');
        });
    }

}
module.exports = system;