$( ()=>{
    
    var timer = null;
    $('#keyword').on('input', ()=>{
        $('#result-list').empty();
        clearTimeout(timer);
        timer = setTimeout(()=>{
            youtubeAPICall();
        }, 1000);
    })
    
    $('#btn-search').on('click', ()=>{
        $('#result-list').empty();
        youtubeAPICall();
    })

    $('#token-next').on('click', ()=>{
        $('#page-token').val($('#token-next').val());
        youtubeAPICall();
    })

    $(document).ajaxStart(function(){
        $('#loading-gif').show();
    });

    $(document).ajaxStop(function(){
        $('#loading-gif').hide();
    })
})




function youtubeAPICall(){
    $.ajax({
        url: `https://www.googleapis.com/youtube/v3/search?`,
        type: 'GET',
        dataType : 'json',
        data: {
            part : 'snippet',
            maxResults : '25',
            q : $('#keyword').val(),
            key: 'AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw',
            pageToken : $('#page-token').val()
            //youtubeAPI accept pageToken="", returns firstPageToken
        }
    })
    .done( (data)=>{
        if(data.pageInfo.totalResults == 0){
            console.log('no items');
            let h2 = $('<h2>')
                    .addClass('text-center')
                    .html('No result found')
                    .appendTo('#result-list');
        } else{
            let items = data.items;
            for(index in items){
                let item = items[index];
                
                let img = $('<img>')
                    .addClass('col-4')
                    .attr('src',`${item.snippet.thumbnails.medium.url}`);
                let div = $('<div>')
                    .addClass('video_info col-8');
                let h2 = $('<h2>')
                    .addClass('title')
                    .html(`${item.snippet.title}`)
                    .appendTo(div);
                let p = $('<p>')
                    .addClass('description')
                    .html(`${item.snippet.description}`)
                    .appendTo(div);
                let span = $('<span>').html('View>>>')
                    .appendTo(div);
    
                let a = $('<a>')
                    .addClass('result row')
                    .attr('href', `https://www.youtube.com/watch?v=${item.id.videoId}?autoplay=true target="_blank`)
                    .append(img)
                    .append(div)
                    .appendTo('#result-list');
            }
        }
        
        if(data.nextPageToken){
            $('#token-next').val(data.nextPageToken);
            $('#token-next').show();
        } else {
            $('#token-next').hide();
        }
    })
}