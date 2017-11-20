// 加载本地数据
(function () {
    window.LocalURL = Class.extend({
        init: function () {
            //加载的图片
            this.loadedImage = [];
        },
        //    加载图片dom对象,需要得到一个对象，保存转化的图片对象，加载好的图片数量和图片总数
        loadImage: function (jsonUrl, callback) {
            // var self = this;
            var xhr = new XMLHttpRequest();
            xhr.open('get', jsonUrl);
            xhr.send(null);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var imageCount = 0;
                    var res = JSON.parse(xhr.responseText).images;
                    var amount = res.length
                } else {
                    return false;
                }
                var resources = {};
                res.forEach(function (t) {
                    imageCount++;
                    var name = t['name'];
                    var src = t["src"];
                    var image = new Image();
                    image.src = src;
                    resources[name] = image;
                });

                callback(resources, imageCount, amount);
            }
        }
    })
})();