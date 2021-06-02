// Class definition

var KTBootstrapDatepicker = function () {
    var arrows;
    if (KTUtil.isRTL()) {
        arrows = {
            leftArrow: '<i class="la la-angle-right"></i>',
            rightArrow: '<i class="la la-angle-left"></i>'
        }
    } else {
        arrows = {
            leftArrow: '<i class="la la-angle-left"></i>',
            rightArrow: '<i class="la la-angle-right"></i>'
        }
    }
    var datepicker = function () {
        $('.input-daterange').datepicker({
            format: 'dd.mm.yyyy',
            rtl: KTUtil.isRTL(),
            todayHighlight: true,
            templates: arrows,
            language: 'ru'
        });
    }
    return {
        init: function() {
            datepicker();
        }
    };
}();

jQuery(document).ready(function() {    
    KTBootstrapDatepicker.init();
});
//# sourceMappingURL=bootstrap-datepicker.js.map
