//通过sleep函数进对各个版本的语法进行比较

//1.ES5下通过时间（禁止，会导致CPU阻塞）
function sleep(delay) {
    var start = (new Date()).getTime();
    while ((new Date()).getTime() - start < delay) {
      continue;
    }
}
function test() {
    console.log('111');
    sleep(2000);
    console.log('222');
}
test()

//2.ES5下通过setTimeout，callback
function sleep1(ms, callback) {
    setTimeout(callback, ms)
}
//sleep 1s
sleep1(1000, () => {
    console.log(1000)
})


//3.ES6下通过Promise,不用then也可以使用await进行调用
const sleep = time => {
    return new Promise(resolve => setTimeout(resolve,time));
} 
sleep(1000).then(()=>{ console.log(1) })

//4.ES6:yield后面是一个生成器 generator
function sleepGenerator(time) {
	yield new Promise(function(resolve,reject){
		setTimeout(resolve,time);
	}) 
} 


//5.ES7下通过async/await
function sleep(time) {
	return new Promise(resolve =>
 	 setTimeout(resolve,time)
 ) } 
 
async function output() {
	let out = await sleep(1000); 
	console.log(1); 
	return out;
} 
output();