(function () {
    window.Bird = Class.extend({
        init: function () {
            var self = this;
            self.width = 255 / 3;
            self.height = 60;
            self.y = 100;
            self.x = (game.canvas.width - self.width) / 2;
            self.sx = 0;

            //    扇翅膀频率
            self.wing = 5;
            //    重力加速度,像素与米的比例
            self.g = 10;
            self.rate = 10;
        //    当前时间戳
            self.time = 0;
        //    向上的加速度
            self.a = 0;
        //    越向上,a降低越快
            self.zuli = 0;
        //    判断是否死亡
            self.die = false;

            self.dieAnimationIndex = 1;

        },
        render: function () {
            var self = this;
            //    绘制游戏结束
            //    热血
            if (self.die){
                var sWidth = 1625 / 5,sHeight = 828 / 6;
                var col = this.dieAnimationIndex % 5;
                var row = parseInt(this.dieAnimationIndex / 5);

                game.context.drawImage(resources['blood'],col * sWidth,row * sHeight,sWidth,sHeight,this.x - 100,this.y,sWidth,sHeight);

                // 绘制游戏结束
                var gameOverX = (game.canvas.width - 626) * 0.5;
                var gameOverY = (game.canvas.height - 144) * 0.5;
                game.context.drawImage(resources['gameover'],gameOverX,gameOverY);
                game.end();
            }
           // 绘制小鸟
           else {
                game.context.drawImage(resources['bird'], self.sx, 0, self.width, 60, self.x, self.y, self.width, self.height);
            }
        },
        update: function () {
            var self = this;
            // 小鸟没死时
            if(!self.die){
                if(self.y<= 0){
                    self.y = 0;
                }
                // 扇翅膀
                if (game.frameUtil.currentFrames % (self.wing) === 0) {
                    self.sx += 255 / 3;
                    if (self.sx >= 255) {
                        self.sx = 0
                    }
                }
                //    当前时间/s
                var t = game.frameUtil.currentFrames/game.fps;
                //    速度,时间
                var h = 0.5 * (self.g+self.a) * Math.pow(t-self.time,2);
                self.y += h;
                if (self.a<0){
                    self.a+=self.zuli;
                    self.zuli+=0.1;
                }
                self.clickEvent();
                if (self.y>= game.canvas.height-100){
                    self.die = true;
                }
            }
            //小鸟死亡时
            else {
                self.dieAnimationIndex+=1;
            }
        },
        clickEvent:function () {
            var self = this;
            var add = function () {
                    self.time = game.frameUtil.currentFrames/game.fps;
                    self.a = -80;
                    self.zuli = 0;
            };
            game.canvas.addEventListener('mousedown',add);

        }
    })
})();