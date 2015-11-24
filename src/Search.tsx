/// <reference path="GoogleVideoSearch.ts" />
/// <reference path="../typings/react/react-global.d.ts" />
/// <reference path="../typings/jquery/jquery.d.ts" />

class Search {
	private inputName:string;
	private data:VideoData[];
	static MAX_RESULT_LENGTH = 12;
	
	constructor(private element:HTMLElement, private player:YouTubePlayer) {
		this.inputName = "#search-input";
		$(this.inputName).keyup((e) => this.searchVideo());
	}
	
	searchVideo() {
		var searchInput = $(this.inputName).val();
		var keyword = this.sanitizeInput(searchInput);
		this.data = []
		GoogleVideoSearch.search(keyword);
	}
	
	sanitizeInput(input:string):string {
		return input
				.replace(/ /g, "+")
				.replace(/&/, "&amp;")
				;
	}
	
	fixTitle(title:string):string {
		return decodeURIComponent(title)
				.replace(/ - YouTube$/, "")
				.replace(/&quot;/g, "'")
				.replace(/&#39;/g, "'")
				.replace(/&amp;/g, "&")
				;
	}
	
	onSearchComplete(searcher:google.search.VideoSearch) {
		searcher.results.map((result) => {
			if (this.data.length < Search.MAX_RESULT_LENGTH) {
				this.data.push({
					"id": result.tbUrl.split('/')[4],
					"duration": parseInt(result.duration, 10),
					"viewCount": 420,
					"title": this.fixTitle(result.titleNoFormatting),
				});
			}
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