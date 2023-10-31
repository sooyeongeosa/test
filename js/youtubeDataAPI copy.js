const apiKey='AIzaSyDl-opWoJfvhjbBQD4tFJCq2_EwscB0qlI'
const channelId ='UCUq9bZmYNPq1AisfsXPLqPw'
const videoContainer = document.querySelector('#video-container')
const mainScreen = document.querySelector('.window-content')

const channelEndpoint = `https://www.googleapis.com/youtube/v3/channels?key=${apiKey}&id=${channelId}&part=snippet,contentDetails,statistics`;

// const ytPromise = fetch(channelEndpoint)
// console.log(ytPromise)
fetch(channelEndpoint)
    .then(res=>res.json())
    .then(data=>{
        const playlistId = data.items[0].contentDetails.relatedPlaylists.uploads;
        requestPlaylist(playlistId);
        
    }) 

    function requestPlaylist(playlistId) {
        const maxResult = 12;
        const playlistURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${apiKey}&playlistId=${playlistId}&part=snippet&maxResults=${maxResult}`;
        fetch(playlistURL)
            .then(res => res.json())
            // .then(data => console.log(data))
            .then(data => loadVideo(data));

    }

    
    function loadVideo(data) {
        const playListItems = data.items;
        const firstVideoId = data.items[0].snippet.resourceId.videoId;
        
        let display='';
        display =`
        <iframe src="https://www.youtube.com/embed/${firstVideoId}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        `        
        mainScreen.innerHTML = display;

        if(playListItems) {
            let output ='';            
            playListItems.map(item => {
                const videoId = item.snippet.resourceId.videoId;
                
                output +=`    
                <div class="collection">    
                    <div class="clip">
                        <div class="clip-frame">
                        <iframe height="250" src="https://www.youtube.com/embed/${videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

                        </div>
                    </div>            
                    <div class="description">
                        <h2>${item.snippet.title}</h2>
                        <p>“Moonlight” is the first 1 of 1 dual state NFT art part of the Nostalgia collection, which fuses digital art with storytelling and technology.</p>
                        
                        <p>
                            ${item.snippet.description}
                        </p>
                        <p>
                            ${item.snippet.publishedAt}
                        </p>
                        <button class="view-btn" data-video="WbGhAzerTpU">View</button>                
                    </div>
            </div>                
        `
            });
            videoContainer.innerHTML =output;    
            
            
            
            
        } else {
            videoContainer.innerHTML = 'Sorry, No videos uploaded!'
        }
        
    }
   
    $(document).ready(function(){   
        let clickSrc;
        let clips = $('.collection clip')          
        // $(document).off()
        $(document).on("click",".collection",function(index, item){
            console.log(index)
            clickSrc=$(this).find('iframe').attr("src")
            console.log(clickSrc)
            $('.window-content').find('iframe').attr("src",clickSrc)
            $('.window-content, .window').fadeIn(500)
        })
            
            
        // 팝업종료
        $('.window, .close').click(function(e){
            e.preventDefault();
            $('.window, .window-content').fadeOut(500)
            $('.window-content').find('iframe').attr("src",`${clickSrc}?muted=1`);
        })
    
        clips.mouseover(function(){
            $(this).find('img').attr('src',$(this).find('img').data("animated"))
            
        })
        clips.mouseout(function(){
            $(this).find('img').attr('src',$(this).find('img').data("static"))
        })
    
        // contact form show
        const contactEmail = $('.contact-left > h3')
        contactEmail.click(function(e){
            e.stopPropagation();
            $('.contact-popup').fadeIn();
            $('.contact-popup-mask').show();
        })
        $('.contact .contact-popup-mask').click(function(e){        
            $('.contact-popup').fadeOut();
            $('.contact-popup-mask').hide();
            $('.reset').trigger("click")
        })
    })

   