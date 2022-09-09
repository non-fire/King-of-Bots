const AC_GAME_OBJECTS = [];
 export class AcGameObject {
    constructor() {
        AC_GAME_OBJECTS.push(this); //在被new出来的那一刻就加入列表，先来后到，后面的可以覆盖前面的
        this.timedelta = 0; // 此一时间与上一时间的时间间隔
        this.has_called_start = false; // 标记start()执行过没
        /*
        属性：
            一般让物体移动都会有速度的概念，移动速度一般都是以秒为单位，一秒钟移动几个像素或者距离。
            每两帧之间的时间间隔不一定是均匀的，距离由速度*时间间隔得来的，因此要记录一下时间间隔     
        */
    }

    start() { // 只执行一次

    }

    update() { //除第一帧以外，每一帧执行一次

    }

    on_destroy() { // 删除前执行

    }

    destory() { // 删除当前对象
        this.on_destroy();

        for(let i in AC_GAME_OBJECTS) {
            const obj = AC_GAME_OBJECTS[i];
            if (obj === this) {
                AC_GAME_OBJECTS.splice(i);
                break;
            }
        }
    }
 }

 let last_timestamp; // 上一次执行的时刻
 const step = timestamp => {
    for(let obj of AC_GAME_OBJECTS) {
        if(!obj.has_called_start){ // 该AcGameObject是否执行过start
            obj.has_called_start = true;
            obj.start();
        }else{
            obj.timedelta = timestamp - last_timestamp; // 记录过了多久
            obj.update();
        }
    }

    last_timestamp = timestamp;
    requestAnimationFrame(step)
 }

 requestAnimationFrame(step)
 //前端浏览器中有一个函数叫作 requestAnimationFrame，这个函数可以传一个回调函数，
 //会在下一帧渲染之前执行一下这个回调函数（只执行一次），那么如何让它一直执行呢；
 //可以将该回调函数写成一个迭代函数就行了。

 /*
  const step = () => {
    requestAnimationFrame(step)
 }
 requestAnimationFrame(step)
 */