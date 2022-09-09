import { AcGameObject } from "./AcGameObject";
import { Wall } from "./Wall";
import { Snake } from "./Snake";

/*
有时候 import 要用到 {} ，有时候不用；它们的区别是：
如果是 export 的话，就需要用 {} 括起来
如果是 export default 或者全部导入的话，就不用{}
每一个文件只能有一个 default，类似于 java 中的 public class
总结：导入部分，引入非 default 时，使用花括号
*/

export class GameMap extends AcGameObject {
    constructor(ctx, parent) {
        super();

        this.ctx = ctx; // 画布，前端游戏都在画布标签里画
        this.parent = parent; // 父元素，动态的修改画布的长宽，因为地图的大小是会动态变化的
        this.L = 0; // 每个格子的绝对距离

        this.rows = 13;
        this.cols = 14;

        this.inner_walls_count = 20;
        this.walls = [];

        this.snakes = [
            new Snake({id : 0, color : "#4876ec", r : this.rows - 2, c : 1}, this),
            new Snake({id : 1, color : "#f94848", r : 1, c : this.cols - 2}, this),
        ];
    }

    // flood fill算法
    check_connectivity(g, sx, sy, tx, ty) {
        if (sx == tx && sy == ty) return true;
        g[sx][sy] = true;

        let dx = [-1, 0, 1, 0], dy = [0, 1, 0, -1];
        for (let i = 0; i < 4; i ++ ) {
            let x = sx + dx[i], y = sy + dy[i];
            if (!g[x][y] && this.check_connectivity(g, x, y, tx, ty)) 
                return true;
        }

        return false;
    }

    create_walls() {
        const g = []; //二维数组标记该位置是否有障碍
        for (let r = 0; r < this.cols; r ++) {
            g[r] = [];
            for (let c = 0; c < this.cols; c ++){
                g[r][c] = false;
            }
        }

        for (let r = 0; r < this.rows; r ++ ) {
            g[r][0] = g[r][this.cols - 1] = true;
        }

        for (let c = 0; c < this.cols; c ++ ) {
            g[0][c] = g[this.rows - 1][c] = true;
        }

        for (let i = 0; i < this.inner_walls_count / 2; i ++ ) {
            for (let j = 0; j < 1000; j ++ ) {
                // 随机一个数
                let r = parseInt(Math.random() * this.rows);
                let c = parseInt(Math.random() * this.cols);
                if (g[r][c] || g[this.rows - 1 - r][this.cols - 1 - c]) continue;

                // 排除左下角和右上角
                if (r == this.rows - 2  && c == 1|| r == 1 && c == this.cols - 2)
                    continue;
                // 对称
                g[r][c] = g[this.rows - 1 - r][this.cols - 1 - c] = true;
                break;
            }
        }

        const copy_g = JSON.parse(JSON.stringify(g)); // 深拷贝
        if(!this.check_connectivity(copy_g, this.rows - 2, 1, 1, this.cols - 2)) return false;

        for (let r = 0; r < this.rows; r ++ ) {
            for (let c = 0; c < this.cols; c ++ ) {
                if (g[r][c]) {
                    this.walls.push(new Wall(r, c, this));
                }
            }
        }

        return true;
    }

    add_listening_events() {
        this.ctx.canvas.focus(); // Canvas 无法直接获得键盘焦点，但可以通过设置tabindex属性的方式获得焦点

        const [snake0, snake1] = this.snakes;
        this.ctx.canvas.addEventListener("keydown", e => {
            if (e.key === 'w') snake0.set_direction(0);
            else if (e.key === 'd') snake0.set_direction(1);
            else if (e.key === 's') snake0.set_direction(2);
            else if (e.key === 'a') snake0.set_direction(3);
            else if (e.key === 'ArrowUp') snake1.set_direction(0);
            else if (e.key === 'ArrowRight') snake1.set_direction(1);
            else if (e.key === 'ArrowDown') snake1.set_direction(2);
            else if (e.key === 'ArrowLeft') snake1.set_direction(3);
        });
    }

    start() { // 第1帧
        for (let i = 0; i < 1000; i ++ ) // 跑1000次，总有一次连通的
            if (this.create_walls())
                break;
        
        this.add_listening_events();
    }

    update_size() {
        this.L =  parseInt(Math.min(this.parent.clientWidth / this.cols, this.parent.clientHeight / this.rows));
        // 绝对距离=地图长宽除以列数行数后的最小值
        this.ctx.canvas.width = this.L * this.cols; //把对应的正方形补出来
        this.ctx.canvas.height = this.L * this.rows;
    }

    check_ready() { 
        for (const snake of this.snakes) {
            if (snake.status !== "idle") return false; // 移动或死亡 -> 未准备好
            if (snake.direction === -1) return false; // 未按下方向 -> 未准备好
        }
        return true;
    }

    next_step() {
        for (const snake of this.snakes) {
            snake.next_step();
        }
    }

    check_valid(cell) {
        for (const wall of this.walls) {
            if (wall.r === cell.r && wall.c === cell.c) 
                return false;
        }
        for (const snake of this.snakes) {
            let k = snake.cells.length;
            if (!snake.check_tail_increasing()) {// 当蛇尾会前进的时候，蛇尾不要判断
                k --;
            }
            for (let i = 0; i < k; i ++) {
                if (snake.cells[i].r === cell.r && snake.cells[i].c === cell.c)
                    return false;
            }
        }

        return true;
    }

    update() { // 后面的帧数
        this.update_size(); // 确定大小
        if (this.check_ready()) {
            this.next_step();
            //snake.nextstep: 确定新蛇头，后移所有cell实现前进状态，修改成move，检查valid(die?)
            //snake.update: 确定新蛇头与现蛇距离，判断到达没有
            // 事实上，所有object都按被创建的先后顺序加入列表。因此先加入gamemap，再加入其成员snake
            // 因此，也是先更新ganmemap.update，再更新snake.update
        }
        this.render();
    }

    render() { //渲染函数
        const color_eve = "#AAD751", color_odd = "#A2D149";
        // 染色
        for (let r = 0; r < this.rows; r ++ )
            for (let c = 0; c < this.cols; c ++ ) {
                if ((r + c) % 2 == 0) {
                    this.ctx.fillStyle = color_eve;
                } else {
                    this.ctx.fillStyle = color_odd;
                }
                //左上角左边，明确canvas坐标系
                this.ctx.fillRect(c * this.L, r * this.L, this.L, this.L);

            }
    }
}