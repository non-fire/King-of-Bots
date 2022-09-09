export class Cell {
    constructor(r, c) {
        this.r = r;
        this.c = c;
        // 转换为 canvas 坐标
        /*
        1. canvas画矩形：fillRect(x, y, width, height)
        x 与 y 指定了在 canvas 画布上所绘制的矩形的左上角（相对于原点）的坐标。width 和 height 设置矩形的尺寸。
        2. canvas画路径：
            beginPath()：新建一条路径，生成之后，图形绘制命令被指向到路径上生成路径。
            moveTo(x, y)：将笔触移动到指定的坐标 x 以及 y 上。
            lineTo(x, y)：绘制一条从当前位置到指定 x 以及 y 位置的直线。
            arc(x, y, radius, startAngle, endAngle, anticlockwise)：画一个以（x,y）为圆心的以 radius 为半径的圆弧（圆），
                    从 startAngle 开始到 endAngle 结束，按照 anticlockwise 给定的方向（默认为顺时针）来生成。
            closePath()：闭合路径之后图形绘制命令又重新指向到上下文中。
                    不是必需的。这个方法会通过绘制一条从当前点到开始点的直线来闭合图形。
                    如果图形是已经闭合了的，即当前点为开始点，该函数什么也不做。
            stroke()：通过线条来绘制图形轮廓。
            fill()：通过填充路径的内容区域生成实心的图形。
        */
        this.x = c + 0.5; 
        this.y = r + 0.5;
        // 找到圆心
    }
}