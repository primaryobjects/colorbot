$(document).ready(function () {
	$('.icon-refresh').click(function () {
		$('#data').html("<img src='/images/ajax-loader.gif' /> Thinking ..");
		refresh();
	});
	
	$('#uploadDiv').filedrop({
		fallback_id: 'imageUpload',
		url: '/',
		allowedfiletypes: ['image/png'],
		maxfiles: 1,
		maxfilesize: 1,
		uploadStarted: function(i, file, len){
			// Record event in Google Analytics.
			ga('send', 'event', 'Upload', 'Started', file.name);
			$('#status').html('Uploading');
		},
		uploadFinished: function(i, file, response, time) {
			// response is the data you got back from server in JSON format.
			var key = file.name + ', ' + response.message;

			if (response.message == 'OK') {
				var html = "<div>" + file.name + "</div><div style='color: " + response.results[0].color + ";'><h3>" + response.results[0].color + "</h3></div>\n";
				html += "<h3>" + (response.results[0].value * 100).toFixed(2) + "%</h3>";
				$('#status').html(html);
				key += ', ' + response.results[0].color + ', ' + (response.results[0].value * 100).toFixed(2);
			}
			else {
				$('#status').html('<span class="text-error">' + response.message + '</span>');
			}

			// Record event in Google Analytics.
			ga('send', 'event', 'Upload', 'Finished', key);
		},
		error: function(err, file) {
			switch(err) {
				case 'BrowserNotSupported':
					$('#status').html('<span class="text-error">Sorry, your browser does not support html5 drag and drop. Please use Firefox or Chrome.</span>');
					break;
				case 'TooManyFiles':
					$('#status').html('<span class="text-error">Please upload just 1 image.</span>');
					break;
				case 'FileTooLarge':
					// program encountered a file whose size is greater than 'maxfilesize'
					// FileTooLarge also has access to the file which was too large
					// use file.name to reference the filename of the culprit file
					$('#status').html('<span class="text-error">The file ' + file.name + ' is too large. Keep it < 1MB.</span>');
					break;
				case 'FileTypeNotAllowed':
					$('#status').html('<span class="text-error">Please only upload a PNG image.</span>');
				default:
					break;
			}

			// Record event in Google Analytics.
			var key = err + ', ' + file.name;
			ga('send', 'event', 'Upload', 'Error', key);
		}
	});
	
	setActiveTab();
});

function setActiveTab() {
	var url = document.location.href;
	
	$('#topNavigation li').each(function () {
		$(this).removeClass('active');
	});
	
	if (url.indexOf('/about') != -1) {
		$('#topNavigation #about').addClass('active');
	}
	else if (url.indexOf('/contact') != -1) {
		$('#topNavigation #contact').addClass('active');
	}
	else {
		$('#topNavigation #home').addClass('active');
	}
}

function refresh() {
	$.ajax({
		url: '/data',
		success: loadImages
	});
}

function loadImages(data) {
	var dataDiv = $('#data');
	var html = '';
	
	for (var i in data) {
		var iconHtml = "<div style='text-ali'><img src='/images/thumbs-up.png' title='Correct!'/></div><div style='color: #66aa66;'>";
		if (!data[i].correct) {
			iconHtml = "<div><img src='/images/thumbs-down.png' title='Wrong :('/></div>";
			iconHtml += "<div style='color: #aa6666;'>";
		}

		iconHtml += (data[i].value * 100).toFixed(2) + "%</div>";
		
		html += "<span class='span4'><div><img src='/images/pics/" + data[i].file + "' class='img-polaroid' title='" + data[i].color + " (Correct? " + data[i].correct + ", Precision: " + data[i].value + ")' width='64px' height='64px' /></div><div style='color: " + data[i].color + ";'><h3>" + data[i].color + iconHtml + "</h3></div></span>\n";
	}
	
	dataDiv.html(html);
}