/// <reference path="../typings/react/react-global.d.ts" />

interface VideoData {
  id: string;
  duration: number;
  viewCount?: number;
  title: string;
}

interface VideoListProps extends React.Props<any> {
  data: VideoData[];
  player: YouTubePlayer;
}

class VideoList extends React.Component<VideoListProps, {}> {
  render() {
    var player = this.props.player;
    var videos = this.props.data.map(function(video) {
      return (
        <Video key={video.id} video={video} player={player} />
      );
    });
    return (
      <div id="resultContainer">
        {videos}
      </div>
    );
  }
} 



interface VideoProps extends React.Props<any> {
  video: VideoData;
  player: YouTubePlayer;
}

class Video extends React.Component<VideoProps, {}> {
  render() {
    var thumbQuality:string = "mq"; 
    return (
      <div onClick={this.onClickHandler.bind(this)} className="videoThumb">
        <VideoImagePreview video={this.props.video} thumbQuality={thumbQuality} />
        <div className="videoTitle">{this.props.video.title}</div>
      </div>
    );
//        <span className="video-time">{this.printableTime(this.props.video.duration)}</span>
//        <span className="video-viewcount">{this.printableNumber(this.props.video.viewCount)} views</span>
  }
  
  onClickHandler(event:React.MouseEvent) {
    this.props.player.playVideoById(this.props.video.id);
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

interface VideoPreviewProps extends React.Props<any> {
  video: VideoData;
  thumbQuality: string;
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
