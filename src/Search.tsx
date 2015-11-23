/// <reference path="GoogleVideoSearch.ts" />
/// <reference path="../typings/react/react-global.d.ts" />
/// <reference path="../typings/jquery/jquery.d.ts" />

class Search {
	private inputName:string;
	private data:VideoData[];
	
	constructor(private element:HTMLElement, private player:YouTubePlayer) {
		this.inputName = "#search-input";
		$(this.inputName).keyup((e) => this.searchVideo());
	}
	
	searchVideo() {
		var searchInput = $(this.inputName).val();
		var keyword = encodeURIComponent(searchInput);
		this.data = []
		GoogleVideoSearch.search(keyword);
	}
	
	fixTitle(title:string):string {
		return decodeURIComponent(title)
				.replace(/ - YouTube$/, "")
				.replace(/&quot/g, "'")
				;
	}
	
	onSearchComplete(searcher:google.search.VideoSearch) {
		//var data:VideoData[] = [];
		
		searcher.results.map((result) => {
			this.data.push({
				"id": result.tbUrl.split('/')[4],
				"duration": parseInt(result.duration, 10),
				"viewCount": 420,
				"title": this.fixTitle(result.titleNoFormatting),
			});
		});
		
		if (searcher.cursor) {
			if (searcher.cursor.currentPageIndex == 0) {
				GoogleVideoSearch.gotoPage(1);
			} else {
				ReactDOM.render(<VideoList data={this.data} player={this.player} />, this.element);	
			}
		}
	}
}