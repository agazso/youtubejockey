/// <reference path="../typings/youtube/youtube.d.ts" />

class YouTubePlayer {
	ytPlayer:YT.Player;
	static defaultVideoId:string = "3Me4oLpXlH4"; 
	
	public static init(onInit:() => void): void {
		(window as any)["onYouTubeIframeAPIReady"] = onInit;
		
		var tag = document.createElement('script');
		tag.src = "https://www.youtube.com/iframe_api";
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	}
	
	constructor(private elementId:string) {
		var self = this;
		new YT.Player(elementId, {
			width: window.innerWidth,
			height: window.innerHeight - document.getElementById(elementId).offsetTop,
			videoId: YouTubePlayer.defaultVideoId,
			events: {
				'onReady': self.onPlayerReady.bind(this),
				'onStateChange': self.onStateChange.bind(this),
				'onError': self.onError.bind(this)
			}
		});
	}
	
	onPlayerReady(event:YT.EventArgs):void {
		console.log("player ready");
		this.ytPlayer = event.target;
		//this.player.playVideo();
	}
	
	onStateChange(event:YT.EventArgs):void {
		console.log("state changed " + event.data);
	}
	
	onError(event:YT.EventArgs):void {
		console.log("error " + event.data);
	}

	public playVideoById(videoId:string):void {
		this.ytPlayer.loadVideoById(videoId);
		$("#listContainer").fadeOut(); // HACK
	}
	
	public resize():void {
		this.ytPlayer.setSize(window.innerWidth, window.innerHeight - document.getElementById(this.elementId).offsetTop);
	}
}
