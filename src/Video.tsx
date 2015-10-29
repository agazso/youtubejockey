/// <reference path="../typings/react/react.d.ts" />
import React = __React;
declare var mountNode: any;

interface VideoData {
  id: string;
  duration: number;
  viewCount: number;
  title: string;
  uploader: string;
}

interface VideoProps extends React.Props<any> {
  video: VideoData;
  player: Player;
}

class Video extends React.Component<VideoProps, {}> {
  render() {
    return (
      <li id={this.props.video.id} onClick={this.onClickHandler}>
        <VideoPreview thumbQuality="mq" video={this.props.video} />
      </li>
    );
  }
  
  onClickHandler(event:React.MouseEvent) {
    this.props.player.playVideoById(this.props.video.id);
  }
}

interface VideoPreviewProps extends React.Props<any> {
  video: VideoData;
  thumbQuality: string;
  hasRemoveButton?: boolean;
}

class VideoPreview extends React.Component<VideoPreviewProps, {}> {
  render() {
    var thumbQualityClassName:string = "video-thumb-wrap" + this.props.thumbQuality; 
    return (
      <span className="video-result-wrap">
        <span className={thumbQualityClassName}>
          <VideoImagePreview video={this.props.video} thumbQuality={this.props.thumbQuality} />
          <span className="video-time">{this.printableTime(this.props.video.duration)}</span>
        </span>
        <span className="video-title">{this.props.video.title}</span>
        <span className="video-uploader">by {this.props.video.uploader}</span>
        <span className="video-viewcount">{this.printableNumber(this.props.video.viewCount)} views</span>
      </span>
    );
    // (hasRemoveButton ? '<button className="remove-button btn btn-mini" onClick="return Playlist.removePlaylistItem($(this).parent().parent());">Remove</button>' : '') +
  }
  
  printableNumber(num:number):string {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  makeTwoDigitString(n:number) {
    if (n < 10) {
      return "0" + n.toString();
    } else {
      return n.toString();    
    }
  }

  printableTime(timeInSecs:number) {
    var secs = timeInSecs % 60;
    var mins = Math.floor(timeInSecs / 60);
    if (mins >= 60) {
      var hours = Math.floor(mins / 60);
      mins = mins % 60;
      return hours.toString() + ":" + this.makeTwoDigitString(mins) + ":" + this.makeTwoDigitString(secs);
    }
  
    return this.makeTwoDigitString(mins) + ":" + this.makeTwoDigitString(secs);
  }
  
}

class VideoImagePreview extends React.Component<VideoPreviewProps, {}> {
  render() {
    var imageSource:string = "http://i.ytimg.com/vi/" + this.props.video.id + "/" + this.props.thumbQuality + "default.jpg"; 
    var width = "120";
    if (this.props.thumbQuality === "mq") {
      width = "185";
    }
    return <img src={imageSource} className="video-thumb" width="{width}" />; 
  }
}

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
