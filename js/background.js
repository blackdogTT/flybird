(function () {
    window.Background = Class.extend({
        init:function (option) {
            var self = this;
            self.type = option.type;
            self.sx = option.sx;
            self.sy = option.sy;
            self.sw = option.sw;
            self.sh = option.sh;
            self.dx = option.dx;
            self.dy = option.dy;
            self.dw = option.dw;
            self.dh = option.dh;
            self.speed = option.speed || 1;
            self.amount = game.canvas.width/self.dw;
        },
        update:function () {
            var self = this;
            self.dx -= self.speed;
            if(self.dx <= -self.amount * self.dw) {
                self.dx = 0;
            }

        },
        render:function () {
            var self = this;
            for (var i = 0; i < 2*self.amount; i++){
                game.context.drawImage(self.type,self.sx,self.sy,self.sw,self.sh,self.dx+i*self.dw,self.dy,self.dw,self.dh);
            }
        },
        pause:function () {
            this.speed = 0;
        }
    })
})();

