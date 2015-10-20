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
		//hides loading message
		el.empty();
		//
		$.each(videos, function(index, video){
			//variable to display thumbnail; should use default thumbail because sometimes thumbnails can be too small or big
			var thumbnail = video.snippet.thumbnails.default.url;
			//for video title to display
			var vidTitle = video.snippet.title;
			//vidID is needed to concatenate the id to the youtube url
			var vidID = video.id.videoId;
			var vidDesc = video.snippet.description;

			/*var container = $('<div/>', { 'class': 'video-container' });
			var thumbContainer = $('<div/>', { 'class': 'thumbnail' });
			var thumbnailElement = $('<img/>', { 'src': thumbnail, 
				'href': 'https://www.youtube.com/watch?v='+vidID
				 
			});
			var thumbnailLink = $('<a/>', {'img': thumbnail});

			//this is done to append all the thumbnails after each other
			thumbContainer.append(thumbnailElement).append(thumbnailLink);

			var titleContainer = $('<div/>', { 'class': 'title' });	
			var titleElement = $('<a/>', {
				//put the '' around the key property so that they don't read them as variables
				'href': 'https://www.youtube.com/watch?v='+vidID,
				//did this so that when we click on the link it will open up another browser
				//do it mainly for plunker because you don't want to lose your place
				'target': '_blank',
				'html': vidTitle,				
			});

			titleContainer.append(titleElement);

			var descContainer = $('<div/>', {'class': 'description'});
			var descElement = $('<p/>', {'html': vidDesc});

			descContainer.append(descElement);
	
			//this displays the thumbnail and title 
			container.append(thumbContainer).append(titleContainer).append(descContainer);*/

			var vidContent = 
				'<span class="video-container">'+
					'<span class="thumbnail">'+
						'<a href="https://www.youtube.com/watch?v='+vidID+'" target="_blank">'+
							'<img src="'+thumbnail+'">'+
						'</a>'+
					'</span>'+
					'<span class="title">'+
						'<div>'+
							'<a href="https://www.youtube.com/watch?v='+vidID+'"target="_blank">'+
								vidTitle+
							'</a>'+
						'</div>'+								
						'<div class="description">'+
							vidDesc+
						'</div>'+
					'</span>'+
				'</span>';	

			el.append(vidContent);
		});
	};

	//jQuery event listeners
	$('.search-btn').on('click', function(event){
		event.preventDefault();
		var searchInput = $('.search-field').val();
		search(searchInput, $('#search-results'));
	});
});