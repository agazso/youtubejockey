var Startup = (function () {
    function Startup() {
    }
    Startup.main = function () {
        YoutubeAPI.init();
    };
    return Startup;
})();
/// <reference path="../typings/youtube/youtube.d.ts" />
function onYouTubeIframeAPIReady() {
    new YoutubeAPI('player');
}
var YoutubeAPI = (function () {
    function YoutubeAPI(elementId) {
        var self = this;
        new YT.Player(elementId, {
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
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    };
    YoutubeAPI.prototype.onPlayerReady = function (event) {
        console.log("player ready");
        this.player = event.target;
        this.player.playVideo();
    };
    YoutubeAPI.prototype.onStateChange = function (event) {
        console.log("state changed " + event.data);
    };
    YoutubeAPI.defaultVideoId = "3Me4oLpXlH4";
    return YoutubeAPI;
})();
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../typings/react/react.d.ts" />
var React = __React;
var Video = (function (_super) {
    __extends(Video, _super);
    function Video() {
        _super.apply(this, arguments);
    }
    Video.prototype.render = function () {
        return (React.createElement("li", {"id": this.props.video.id, "onClick": this.onClickHandler}, React.createElement(VideoPreview, {"thumbQuality": "mq", "video": this.props.video})));
    };
    Video.prototype.onClickHandler = function (event) {
        this.props.player.playVideoById(this.props.video.id);
    };
    return Video;
})(React.Component);
var VideoPreview = (function (_super) {
    __extends(VideoPreview, _super);
    function VideoPreview() {
        _super.apply(this, arguments);
    }
    VideoPreview.prototype.render = function () {
        var thumbQualityClassName = "video-thumb-wrap" + this.props.thumbQuality;
        return (React.createElement("span", {"className": "video-result-wrap"}, React.createElement("span", {"className": thumbQualityClassName}, React.createElement(VideoImagePreview, {"video": this.props.video, "thumbQuality": this.props.thumbQuality}), React.createElement("span", {"className": "video-time"}, this.printableTime(this.props.video.duration))), React.createElement("span", {"className": "video-title"}, this.props.video.title), React.createElement("span", {"className": "video-uploader"}, "by ", this.props.video.uploader), React.createElement("span", {"className": "video-viewcount"}, this.printableNumber(this.props.video.viewCount), " views")));
        // (hasRemoveButton ? '<button className="remove-button btn btn-mini" onClick="return Playlist.removePlaylistItem($(this).parent().parent());">Remove</button>' : '') +
    };
    VideoPreview.prototype.printableNumber = function (num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    VideoPreview.prototype.makeTwoDigitString = function (n) {
        if (n < 10) {
            return "0" + n.toString();
        }
        else {
            return n.toString();
        }
    };
    VideoPreview.prototype.printableTime = function (timeInSecs) {
        var secs = timeInSecs % 60;
        var mins = Math.floor(timeInSecs / 60);
        if (mins >= 60) {
            var hours = Math.floor(mins / 60);
            mins = mins % 60;
            return hours.toString() + ":" + this.makeTwoDigitString(mins) + ":" + this.makeTwoDigitString(secs);
        }
        return this.makeTwoDigitString(mins) + ":" + this.makeTwoDigitString(secs);
    };
    return VideoPreview;
})(React.Component);
var VideoImagePreview = (function (_super) {
    __extends(VideoImagePreview, _super);
    function VideoImagePreview() {
        _super.apply(this, arguments);
    }
    VideoImagePreview.prototype.render = function () {
        var imageSource = "http://i.ytimg.com/vi/" + this.props.video.id + "/" + this.props.thumbQuality + "default.jpg";
        var width = "120";
        if (this.props.thumbQuality === "mq") {
            width = "185";
        }
        return React.createElement("img", {"src": imageSource, "className": "video-thumb", "width": "{width}"});
    };
    return VideoImagePreview;
})(React.Component);
// function imgPreview(videoId, thumbQuality) {
//   if (thumbQuality === undefined) {
//     thumbQuality = "";
//   }
//   var width = "120";
//   if (thumbQuality === "mq") {
//     width = "185";
//   }
//   if (width === "120") {
//     return youtubeSmallThumbnail(videoId, 3) + youtubeSmallThumbnail(videoId, 1) + youtubeSmallThumbnail(videoId, 2);
//   }
//   return '<img src="http://i.ytimg.com/vi/' + videoId + '/' + thumbQuality + 'default.jpg" class="video-thumb" width="' + width + '">';
// }
// function youtubeSmallThumbnail(videoId, frame) {
//   return '<img src="http://img.youtube.com/vi/' + videoId + '/' + frame + '.jpg" class="video-thumb" width="120" id="thumb-' + videoId + '-' + frame +
//     '" onmouseover="animateThumbnail(this)" style="visibility:' + (frame === 2 ? "visible" : "hidden") + ';">';
// }
/// <reference path="../typings/youtube/youtube.d.ts" />
var Player = (function (_super) {
    __extends(Player, _super);
    function Player() {
        _super.apply(this, arguments);
    }
    Player.prototype.playVideoById = function (videoId) {
    };
    return Player;
})(YT.Player);
