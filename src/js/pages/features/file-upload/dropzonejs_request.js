"use strict";
// Class definition

var KTDropzone = function () {
	var dropzoneNewFile = function () {
		$('#newFile').dropzone({
			url: "https://example.com/scripts/example.php",
			maxFiles: 1,
			maxFilesize: 10,
			addRemoveLinks: true,
			acceptedFiles: "application/pdf,.docx",
		});
	}
	var dropzoneClientPassport = function () {
		var id = '#dropzone_client_passport';
		if ($(id).length > 0) {

			var previewNode = $(id + " .dropzone-item");
			previewNode.id = "";
			var previewTemplate = previewNode.parent('.dropzone-items').html();
			previewNode.remove();

			var dropzoneUstav = new Dropzone(id, {
				url: "https://example.com/scripts/example.php",
				parallelUploads: 20,
				maxFilesize: 1,
				previewTemplate: previewTemplate,
				previewsContainer: id + " .dropzone-items",
				clickable: id + " .dropzone-select"
			});
			dropzoneUstav.on("addedfile", function (file) {
				$(document).find(id + ' .dropzone-item').css('display', '');
			});
			dropzoneUstav.on("totaluploadprogress", function (progress) {
				$(id + " .progress-bar").css('width', progress + "%");
			});

			dropzoneUstav.on("sending", function (file) {
				$(id + " .progress-bar").css('opacity', "1");
			});
			dropzoneUstav.on("complete", function (progress) {
				var thisProgressBar = id + " .dz-complete";
				setTimeout(function () {
					$(thisProgressBar + " .progress-bar, " + thisProgressBar + " .progress").css('opacity', '0');
				}, 300)
			});
		}
	}
	
	return {
		init: function() {
			dropzoneNewFile()
			dropzoneClientPassport()
		}
	};
}();

KTUtil.ready(function() {
	KTDropzone.init();
});

//# sourceMappingURL=dropzonejs_request.js.map
