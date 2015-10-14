$(function(){
	//search function that searches from the parameter 'term'
	//added param 'el' to lessen the html elements in js code
	var search = function(term, el){
	//.get to retrieve API keys	
		$.get('https://www.googleapis.com/youtube/v3/search', {
			part: 'snippet',
			key: 'AIzaSyA8Dm-N-QCxPgkvkwiI0LkY0aK4ZPGfP3c',
			q: term,
			maxResults: 25
		}, function(data){
			display(data.items, el);
		});		
	};

	var display = function(videos, el){
		//need to empty out search results in order to do a new search
		el.empty();
		//
		$.each(videos, function(index, video){
			//variable to display thumbnail; should use default thumbail because sometimes thumbnails can be too small or big
			var thumbnail = video.snippet.thumbnails.default.url;
			//for video title to display
			var vidTitle = video.snippet.title;
			//vidID is needed to concatenate the id to the youtube url
			var vidID = video.id.videoId;
			var container = $('<div/>', {'class': 'video-container'});
			var thumbContainer = $('<div/>', {'class': 'thumbnail'});
			var thumbnailElement = $('<a/>', { 'src': thumbnail});

			//this is done to append all the thumbnails after each other
			thumbContainer.append(thumbnailElement);

			var titleContainer = $('<div/>', { 'class': 'title' });
			var titleElement = $('<a/>', {
				//put the '' around the key property so that they don't read them as variables
				'href': 'https://www.youtube.com/watch?v='+vidID,
				'target': '_blank',
				'html': vidTitle,				
			});

			titleContainer.append(titleElement);

			//this displays the thumbnail and title 
			container.append(thumbContainer).append(titleContainer);

			el.append(container);
		});
	};

	//jQuery event listeners
	$('.search-btn').on('click', function(event){
		event.preventDefault();
		var searchInput = $('.search-field').val();
		search(searchInput, $('#search-results'));
	});
});