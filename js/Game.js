(function () {
    window.Game = Class.extend({
        init: function (option) {
            var self = this;
            option = option || {};
            self.fps = option.fps || 60;
            //    创建帧工具
            self.frameUtil = new FrameUtil();
            //    获取画布ID
            self.canvas = document.getElementById('canvas');
            self.context = self.canvas.getContext('2d');

            //    加载本地数据
            self.allImages = new LocalURL();
            //执行函数，此时改变localURL的值
            self.allImages.loadImage('r.json', function (a, b, c) {
                 resources=a;
                // self.resources = a;
                self.run();
            });
        },
        //    开始游戏
        run: function () {
            var self = this;

            //    房子
            self.house = new Background({
                type:resources['fangzi'],
                sx:0,
                sy:0,
                sw:300,
                sh:256,
                dx:0,
                dy:self.canvas.height-256-100,
                dw:300,
                dh:256
            });
            // self.house.update();
        //    树木
            self.tree = new Background({
                type:resources['shu'],
                sx:0,
                sy:0,
                sw:300,
                sh:216,
                dx:0,
                dy:self.canvas.height-216-48,
                dw:300,
                dh:216
            });
            // self.tree.update();
        //    地板
            self.floor = new Background({
                type:resources['diban'],
                sx:0,
                sy:0,
                sw:48,
                sh:48,
                dx:0,
                dy:self.canvas.height-48,
                dw:48,
                dh:48
            });
            // self.floor.update();
        //    鸟
            self.bird = new Bird();

            // 管道
            self.pipeArr = [];

            // 游戏帧循环
            self.timer = setInterval(function () {
                self.runLoop();

            }, 1000/self.fps);

        },
        //    游戏的运行循环,每一帧执行一次FPS
        runLoop: function () {
            var self = this;
            self.context.clearRect(0,0,this.canvas.width,this.canvas.height);

            //绘制背景
            self.house.render();
            self.house.update();
            self.tree.render();
            self.tree.update();
            self.floor.render();
            self.floor.update();

            //    绘制管道
            for (var i = 0; i < self.pipeArr.length; i++){
                self.pipeArr[i].render();
                self.pipeArr[i].update();
            }
            if (self.frameUtil.currentFrames%100 ===0){
                self.pipeArr.push(new Pipe());
            }


            // 真实帧数和总共帧数
            self.frameUtil.countFPS();
            //绘制帧数
            game.context.fillText('总帧数：'+self.frameUtil.currentFrames,0,10);
            game.context.fillText('FPS：'+self.frameUtil.realFrames,0,30);
            //绘制小鸟
            self.bird.render();
            self.bird.update();
        },
        //    暂停游戏
        pulse: function () {


        },
        //    结束游戏
        end: function () {
            var self = this;
            self.frameUtil.countFPS();
            //绘制热血
            clearInterval(self.timer);
            self.timer=setInterval(function () {
                self.context.clearRect(0,0,this.canvas.width,this.canvas.height);
                //绘制背景
                self.house.render();
                self.tree.render();
                self.floor.render();
                //    绘制管道
                for (var i = 0; i < self.pipeArr.length; i++){
                    self.pipeArr[i].render();
                }
                //绘制帧数
                game.context.fillText('总帧数：'+self.frameUtil.currentFrames,0,10);
                game.context.fillText('FPS：'+self.frameUtil.realFrames,0,30);
                //绘制小鸟
                self.bird.render();
                self.bird.update();
                console.log(self.bird.die);
            },1000/self.fps);
            //热血完成后清除定时器
            setTimeout(function () {
                clearInterval(self.timer)
            },4000);
        }
    });
})();