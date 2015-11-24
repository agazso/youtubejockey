class Main {
    public static init(): void {
        YouTubePlayer.init(() => {
            var player = new YouTubePlayer('player');
            var listContainer = document.getElementById("listContainer");
            var search = new Search(listContainer, player);
            var mouseMoveCatcher = new MouseMoveCatcher(0, 0);
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
            
            $("#player").mousemove((e) => {
                if (mouseMoveCatcher.isMousePositionChanged(e.pageX, e.pageY)) {
                    showPlayerControls();
                }
                mouseMoveCatcher.updatePosition(e.pageX, e.pageY);
            });            
        });

        function showPlayerControls() {
            $("#playerContainer").fadeIn();
        }        
        
    }
}
