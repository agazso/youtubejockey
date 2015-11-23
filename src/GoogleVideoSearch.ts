declare module google {
	interface Options {
		callback: () => void;
	}
	
	export function load(api:string, version:string, options:Options):void;
	export function setOnLoadCallback(callback:() => void):void;
}

declare module google.search {
	interface Page {
		start:string;
		label:string;
	}

	interface Cursor {
		pages:Page[];
		estimatedResultCount:number;
		currentPageIndex:number;
		moreResultsUrl:string;
	}
	
	interface Result {
		videoType:string;
		tbUrl:string;
		title:string;
		titleNoFormatting:string;
		duration:string;
	}


	export class VideoSearch extends Search {
		setResultSetSize(size:number|string):void;
		setSearchCompleteCallback(object:any, method:() => void):void;
		execute(searchQuery:string):void;
		gotoPage(page:number):void;

		results:Result[];
		cursor:Cursor;
	}
	
	export class Search {
		static LARGE_RESULTSET:string;
	}
}

interface GoogleVideoSearchCallback {
	onSearchComplete: (searcher:google.search.VideoSearch) => void;
}

class GoogleVideoSearch {
	static searcher:google.search.VideoSearch;
	
	static init(object:GoogleVideoSearchCallback) {
		google.load("search", "1", {"callback": function() {}});
		google.setOnLoadCallback(() => {
			GoogleVideoSearch.searcher = new google.search.VideoSearch();
			GoogleVideoSearch.searcher.setResultSetSize(google.search.Search.LARGE_RESULTSET);
			GoogleVideoSearch.searcher.setSearchCompleteCallback(object, () => {
				object.onSearchComplete(GoogleVideoSearch.searcher);	
			});			
		});
	}
	
	static search(s:string): void {
		if (GoogleVideoSearch.searcher != undefined) {
			GoogleVideoSearch.searcher.execute(s);
		}
	}

	static gotoPage(page:number): void {
		if (GoogleVideoSearch.searcher != undefined) {
			GoogleVideoSearch.searcher.gotoPage(page);
		}
	}
}
