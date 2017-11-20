(function () {
    window.Pipe = Class.extend({
        init: function () {
            var self = this;
            self.dir = _.random(0, 1);
            self.width = 148;
            self.height = _.random(100, game.canvas.height * 0.5);
            self.dx = self.width + game.canvas.width;
            self.dy = self.dir === 0 ? (game.canvas.height - self.height - 48) : 0;

            //    速度
            self.speed = 4;
        },
        render: function () {
            var self = this;
            // 向上
            if (self.dir === 0) {
                game.context.drawImage(resources['pipe0'], 0, 0, self.width, self.height, self.dx, self.dy, self.width, self.height)
            }
            // // 向下
            else {
                game.context.drawImage(resources['pipe1'], 0, 1664 - self.height, self.width, self.height, self.dx, self.dy, self.width, self.height)
            }
        },
        update: function () {
            var self = this;
            self.dx -= self.speed;

            // 销毁离开画布的管道
            if (self.dx < -self.width) {
                game.pipeArr = _.without(game.pipeArr, self);
            }
            //碰撞判断
            if (game.bird.x >= self.dx-game.bird.width && game.bird.x <= self.dx+self.width) {
               // 撞到向上的管子
               if (self.dir === 0){
                   if(game.bird.y+game.bird.height >= self.dy)
                   game.bird.die = true;
                   // game.end();
               }
               //撞到向下的管子
               else {
                   if (game.bird.y <= self.height){
                       game.bird.die = true;
                       // game.end();
                   }
               }
            }

        },
        pause: function () {
            this.speed = 0;
        }
    })
})();