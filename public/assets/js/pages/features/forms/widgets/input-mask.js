// Class definition

var KTMask = function () {
    var inputMask = function () {
        $('.input-sum').mask('000 000 000 000 000,00', {
            reverse: true
        });
        $('.input-percent').mask('00,00', {
            reverse: false
        });
    }

    return {
        init: function() {
            inputMask();
        }
    };
}();

jQuery(document).ready(function() {
    KTMask.init();
});
//# sourceMappingURL=input-mask.js.map
