// 帧数计算工具
(function () {
    window.FrameUtil = Class.extend({
        init:function () {
        //    当前的帧数
            this.currentFrames = 0;
            this.sFrames = 0;
            this.sTime = new Date();
            this.realFrames = 0;
        },
        countFPS:function () {
            if (!game.bird.die){
                this.currentFrames++;
                var currentTime = new Date();
                if (currentTime-this.sTime>=1000){
                    this.realFrames = this.currentFrames-this.sFrames;
                    //更新开始时间和帧数
                    this.sTime = currentTime;
                    this.sFrames = this.currentFrames;
                }
            }
        }
    })
})();