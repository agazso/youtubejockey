class Main {
    public static init(): void {
        YouTubePlayer.init(() => {
            var player = new YouTubePlayer('player');
            var listContainer = document.getElementById("listContainer");
            var search = new Search(listContainer, player);
            GoogleVideoSearch.init(search);
            
            $("#playlistButton").click((e) => {
                $("#listContainer").fadeOut(); 
            });
            
            $("#search-input").click((e) => {
                $("#listContainer").fadeIn();                
            });
            
            $(window).resize(() => {
                player.resize();
            });            
        });
    }
}
