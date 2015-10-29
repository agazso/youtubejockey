/// <reference path="../typings/youtube/youtube.d.ts" />
var YoutubeAPI = (function () {
    function YoutubeAPI(elementId) {
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        var self = this;
        this.player = new YT.Player(elementId, {
            width: 640,
            height: 480,
            videoId: YoutubeAPI.defaultVideoId,
            events: {
                'onReady': self.onPlayerReady,
                'onStateChange': self.onStateChange
            }
        });
    }
    YoutubeAPI.init = function () {
        new YoutubeAPI('player');
    };
    YoutubeAPI.prototype.onPlayerReady = function (event) {
    };
    YoutubeAPI.prototype.onStateChange = function (event) {
    };
    YoutubeAPI.defaultVideoId = "3Me4oLpXlH4";
    return YoutubeAPI;
})();
exports["default"] = YoutubeAPI;
