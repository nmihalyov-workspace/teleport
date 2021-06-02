"use strict";
// Class definition

var KTDropzone = function () {
    var dropzoneUstav = function () {
        var id = '#dropzone_ustav';
        
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
        dropzoneUstav.on("addedfile", function(file) {
            $(document).find( id + ' .dropzone-item').css('display', '');
        });
        dropzoneUstav.on("totaluploadprogress", function(progress) {
            $( id + " .progress-bar").css('width', progress + "%");
        });
        
        dropzoneUstav.on("sending", function(file) {
            $( id + " .progress-bar").css('opacity', "1");
        });
        dropzoneUstav.on("complete", function(progress) {
            var thisProgressBar = id + " .dz-complete";
            setTimeout(function(){
                $( thisProgressBar + " .progress-bar, " + thisProgressBar + " .progress").css('opacity', '0');
            }, 300)
        });
    }
    var dropzoneDirPassport = function () {
        var id = '#dropzone_dir-passport';
        
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
        dropzoneUstav.on("addedfile", function(file) {
            $(document).find( id + ' .dropzone-item').css('display', '');
        });
        dropzoneUstav.on("totaluploadprogress", function(progress) {
            $( id + " .progress-bar").css('width', progress + "%");
        });
        
        dropzoneUstav.on("sending", function(file) {
            $( id + " .progress-bar").css('opacity', "1");
        });
        dropzoneUstav.on("complete", function(progress) {
            var thisProgressBar = id + " .dz-complete";
            setTimeout(function(){
                $( thisProgressBar + " .progress-bar, " + thisProgressBar + " .progress").css('opacity', '0');
            }, 300)
        });
    }
    var dropzoneProtocol = function () {
        var id = '#dropzone_protocol';
        
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
        dropzoneUstav.on("addedfile", function(file) {
            $(document).find( id + ' .dropzone-item').css('display', '');
        });
        dropzoneUstav.on("totaluploadprogress", function(progress) {
            $( id + " .progress-bar").css('width', progress + "%");
        });
        
        dropzoneUstav.on("sending", function(file) {
            $( id + " .progress-bar").css('opacity', "1");
        });
        dropzoneUstav.on("complete", function(progress) {
            var thisProgressBar = id + " .dz-complete";
            setTimeout(function(){
                $( thisProgressBar + " .progress-bar, " + thisProgressBar + " .progress").css('opacity', '0');
            }, 300)
        });
    }
    var dropzoneUchredPassport = function () {
        var id = '#dropzone_uchred-passport';
        
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
        dropzoneUstav.on("addedfile", function(file) {
            $(document).find( id + ' .dropzone-item').css('display', '');
        });
        dropzoneUstav.on("totaluploadprogress", function(progress) {
            $( id + " .progress-bar").css('width', progress + "%");
        });
        
        dropzoneUstav.on("sending", function(file) {
            $( id + " .progress-bar").css('opacity', "1");
        });
        dropzoneUstav.on("complete", function(progress) {
            var thisProgressBar = id + " .dz-complete";
            setTimeout(function(){
                $( thisProgressBar + " .progress-bar, " + thisProgressBar + " .progress").css('opacity', '0');
            }, 300)
        });
    }
    var dropzoneUchredPassport2 = function () {
        var id = '#dropzone_uchred-passport2';
        
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
        dropzoneUstav.on("addedfile", function(file) {
            $(document).find( id + ' .dropzone-item').css('display', '');
        });
        dropzoneUstav.on("totaluploadprogress", function(progress) {
            $( id + " .progress-bar").css('width', progress + "%");
        });
        
        dropzoneUstav.on("sending", function(file) {
            $( id + " .progress-bar").css('opacity', "1");
        });
        dropzoneUstav.on("complete", function(progress) {
            var thisProgressBar = id + " .dz-complete";
            setTimeout(function(){
                $( thisProgressBar + " .progress-bar, " + thisProgressBar + " .progress").css('opacity', '0');
            }, 300)
        });
    }
    var dropzoneAgreement = function () {
        var id = '#dropzone_agreement';
        
        var previewNode = $(id + " .dropzone-item");
        previewNode.id = "";
        var previewTemplate = previewNode.parent('.dropzone-items').html();
        previewNode.remove();
        
        var dropzoneAgreement = new Dropzone(id, {
            url: "https://example.com/scripts/example.php",
            maxFiles: 1,
            maxFilesize: 1,
            previewTemplate: previewTemplate,
            previewsContainer: id + " .dropzone-items",
            clickable: id + " .dropzone-select"
        });
        dropzoneAgreement.on("addedfile", function(file) {
            $(document).find( id + ' .dropzone-item').css('display', '');
        });
        dropzoneAgreement.on("totaluploadprogress", function(progress) {
            $( id + " .progress-bar").css('width', progress + "%");
        });
    
        dropzoneAgreement.on("sending", function(file) {
            $( id + " .progress-bar").css('opacity', "1");
        });
        dropzoneAgreement.on("complete", function(progress) {
            var thisProgressBar = id + " .dz-complete";
            setTimeout(function(){
                $( thisProgressBar + " .progress-bar, " + thisProgressBar + " .progress").css('opacity', '0');
            }, 300)
        });
    }
    
    var dropzoneNewFile = function () {
        $('#newFile').dropzone({
            url: "https://example.com/scripts/example.php",
            maxFiles: 1,
            maxFilesize: 10,
            addRemoveLinks: true,
            acceptedFiles: "application/pdf,.docx",
        });
    }
    
    return {
        init: function() {
            dropzoneUstav();
            dropzoneDirPassport();
            dropzoneProtocol();
            dropzoneUchredPassport();
            dropzoneUchredPassport2();
            dropzoneAgreement();
            dropzoneNewFile()
        }
    };
}();

KTUtil.ready(function() {
    KTDropzone.init();
});

//# sourceMappingURL=dropzonejs.js.map
