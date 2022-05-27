/**
 * 事件派发机制	EventListener.js        
 */

 const EventListener = {
    //事件表
    Regsiter: {},

    //注册事件
    on: function(name, method){
        if(!this.Regsiter.hasOwnProperty(name)){
            this.Regsiter[name] = [];
        }
        this.Regsiter[name].push(method);
    },

    //触发事件
    fire: function(name){
        if(this.Regsiter.hasOwnProperty(name)){
            let handlerList = this.Regsiter[name];
            //遍历回调函数列表(同一个事件，多个回调监听)
            for(let i = 0; i < handlerList.length; ++i){
                let handler = handlerList[i];
                let args = [];
                //参数处理
                for(let j = 1; j < arguments.length; ++j){
                    args.push(arguments[j]);
                }
                //调用事件回调
                handler.apply(this, args);
            }
        }
    },

    //注销事件
    off: function(name, method){
        if(this.Regsiter.hasOwnProperty(name)){
        	//同一个事件，可能会触发多个处理函数，所以，在注册时以数组的形式存储事件，销毁时，亦同。
            let handlerList = this.Regsiter[name];
            for(let i = 0; i < handlerList.length; ++i){
                console.log('循环查找某个事件进行注销', i, (handlerList[i]===method));
                if(handlerList[i] === method){
                    console.log('注销成功')
                    handlerList.splice(i , 1);
                }
            }
        }
    }
};

module.exports = EventListener;

//调用

void(async()=>{
    //注册监听事件
    //let EventListener = require('../event/EventListener');
    cc.Class({
        extends: cc.Component,
    
        properties: {
        },
    
        // LIFE-CYCLE CALLBACKS:
    
        // cocoscreator 自带的声明周期函数 onLoad() 我比较习惯于在这里做一些初始化工作以及事件监听
        onLoad () {
            //正确绑定
            this.test_event_callback = this.showPanelGameOver.bind(this);
            EventListener.on('test_event', this.test_event_callback);
            //错误绑定
            EventListener.on('test_event2', this.showPanelGameOver.bind(this));
        },
    
        //声明周期函数
        start() {
            //触发事件
            EventListener.fire('test_event', 'a', 'b', 10086);
        },
    
    
        eventOff(){
            //正确销毁
            EventListener.off('test_event', this.test_event_callback);
            //错误销毁
            EventListener.off('test_event2', this.test_event_callback.bind(this));
        },
    
        // update (dt) {},
    });
 
 

    //销毁监听事件
})();

