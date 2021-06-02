// Class definition

var KTIONRangeSlider = function () {

    // Private functions
    var ionSlider = function () {
        var $wishPercent = $('[data-name="wish-percent"]');
        var $wishCommission = $('[data-name="wish-commission"]');
        var $commission = $('[data-name="commission"]');
        var $percent = $('[data-name="percent"]');
        var $comissionSlider = $('#comission_slider');
        var $btnSetTariff = $('[data-name="set-tariff"]');

        $comissionSlider.ionRangeSlider({
            skin: "round",
            grid: true,
            hide_min_max: true,
            min: 0,
            max: 70,
            from: 30,
            prettify: my_prettify,
            onStart: calculate,
            onFinish: calculate,
            onUpdate: calculate,
            onChange: calculate
        });


        // TODO заглушка
        function f(n) { // прямая
            return (Math.PI + n) * (100 + n * n / 6);
        }

        function f2(result) { // обратная
            for (var idx = 0; idx <= 70; idx++) {
                if (f(idx) < result && result <= f(idx + 1)) {
                    return idx;
                }
            }
            return 0;
        }

        function my_prettify (n) {
            var num = f(n + 1);
            return n + "%, " + (n ? (num).toFixed(2) : '0') + " ₽";
        }

        function calculate(n) {
            var num = f(n.from + 1);

            $commission.text((n.from ? (num).toFixed(2) : '0'));
            $percent.val(n.from);

            $wishCommission.val((11587 + (n.from ? +num : 0)).toFixed(2));
            $wishPercent.text((2.73 + (n.from / 10)).toFixed(2));
        }

        function sync() {
            var val = $(this).val();
            var myRange = $comissionSlider.data("ionRangeSlider");
            myRange.update({
                from: parseInt(val)
            });
        }

        function sync2() {
            var val = parseInt($(this).cleanVal() / 100) - 11587;
            var myRange = $comissionSlider.data("ionRangeSlider");
            myRange.update({
                from: f2(parseInt(val))
            });
        }

        $percent.on('keyup', sync).on('keydown', sync);
        $wishCommission.on('change', sync2)/*.on('keydown', sync2)*/;

        $btnSetTariff.on('click', function () {
            var myRange = $comissionSlider.data("ionRangeSlider");
            myRange.update({
                from: 0
            });
        });
    }

    return {
        // public functions
        init: function() {
            ionSlider();
        }
    };
}();

jQuery(document).ready(function() {
    KTIONRangeSlider.init();
});

//# sourceMappingURL=ion-range-slider.js.map

//# sourceMappingURL=ion-range-slider.js.map
