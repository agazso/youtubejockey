/// <reference path="../typings/youtube/youtube.d.ts" />

function onYouTubeIframeAPIReady() {
	new YoutubeAPI('player');
}

class YoutubeAPI {
	player:YT.Player;
	static defaultVideoId:string = "3Me4oLpXlH4"; 
	
	public static init(): void {
		var tag = document.createElement('script');
		tag.src = "https://www.youtube.com/iframe_api";
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	}
	
	constructor(elementId:string) {
		var self = this;
		new YT.Player(elementId, {
			width: 640,
			height: 480,
			videoId: YoutubeAPI.defaultVideoId,
			events: {
				'onReady': self.onPlayerReady,
				'onStateChange': self.onStateChange,
			}
		});
	}
	
	onPlayerReady(event:YT.EventArgs):void {
		console.log("player ready");
		this.player = event.target;
		this.player.playVideo();
	}
	
	onStateChange(event:YT.EventArgs):void {
		console.log("state changed " + event.data);
	}
}	

