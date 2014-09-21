/*global jQuery, window*/
(function ($, window) {
    'use strict';

    var app = {


        /* константы */
        MAX_BORDER_RADIUS: 20,
        MAX_BORDER_WIDTH: 10,


        /* переменные */
        $borderRadius: $('.js-border-radius'),
        $borderWidth: $('.js-border-width'),
        $btnText: $('.js-btn-text'),
        $resultBtn: $('.js-result-btn'),
        $form: $('.js-form'),
        $outputHTML: $('.js-output-html'),
        $outputCSS: $('.js-output-css'),
        $outputEmail: $('.js-email'),
        br: 0,
        bw: 0,


        /* инициализация объекта*/
        init: function () {
            var that = this;

            $(that.$borderRadius).empty().slider({
                range: 'min',
                value: 30
            });
            $(that.$borderWidth).empty().slider({
                range: 'min',
                value: 20
            });
            that.$outputEmail.tooltip({
                position: {
                    my: 'center bottom',
                    at: 'center top-10'
                },
                items: 'input',
                show: false,
                hide: false,

                /*событие для закрытия тултипа по нажатию*/
                open: function () {
                    $('.ui-tooltip').on('click', function () {
                        that.hideTooltip();
                    });
                }
            });

            that.$borderRadius.trigger('slidechange');
            that.$borderWidth.trigger('slidechange');
            that.$btnText.trigger('keyup');

            $('input, textarea').placeholder();

            that.setUpListeners();

            that.$borderRadius.trigger('slidechange');
            that.$borderWidth.trigger('slidechange');
            that.$btnText.trigger('change');
        },


        /* обработчики событий */
        setUpListeners: function () {
            var that = this;

            that.$form.on('submit', $.proxy(that.submitForm, that));
            that.$borderRadius.on('slidechange', $.proxy(that.changeBorderRadius, that));
            that.$borderWidth.on('slidechange', $.proxy(that.changeBorderWidth, that));

            /* fix для мобильных ловим change, keyup, input */
            that.$btnText.on('change keyup input', $.proxy(that.changeButtonText, that));
            that.$outputEmail.on('change keyup input', $.proxy(that.hideTooltip, that));

            /* fix при изменении размеров окна тултип слетал */
            $(window).on('resize', $.proxy(that.refreshTooltip, that));

//            on('click', function () {
//                //this.hideTooltip();
//                console.log('asd');
//            });
        },


        /* методы */
        submitForm: function (event) {
            var that = this,
                $submitBtn = that.$form.find('button[type="submit"]'),
                str = that.$form.serialize();

            event.preventDefault();
            that.hideTooltip();

            if (!/.+@.+\..+/.test(that.$outputEmail.val())) {
                that.showTooltip('E -mail address you entered is invalid!', true);
                return;
            }

            $submitBtn.attr('disabled', 'disabled');

            $.ajax({
                url: 'php/sendmail.php',
                type: 'POST',
                context: that,
                data: str
            })
                .done(function (data) {
                    this.showTooltip('Message sent.');
                })
                .fail(function (data) {
                    this.showTooltip('An error has occurred ! Message was not sent.', true);
                })
                .always(function () {
                    $submitBtn.removeAttr('disabled');
                });
        },

        changeBorderRadius: function (event) {
            var that = this;

            that.br = that.$borderRadius.find(':first-child').width() / that.$borderRadius.width() * that.MAX_BORDER_RADIUS ^ 0;
            that.$resultBtn.css('border-radius', that.br + 'px');
            that.generateCSS();
        },

        changeBorderWidth: function (event) {
            var that = this;

            that.bw = that.$borderWidth.find(':first-child').width() / that.$borderWidth.width() * that.MAX_BORDER_WIDTH ^ 0;
            that.$resultBtn.css('border-width', that.bw + 'px');
            that.generateCSS();
        },

        changeButtonText: function (event) {
            var that = this;

            that.$resultBtn.text(that.getBtnText());
            that.generateHTML();
        },

        getBtnText: function () {
            return this.$btnText.val() || 'Button text';
        },


        /* генерирование HTML, CSS */
        generateHTML: function () {
            var that = this;

            that.$outputHTML.text('<button type="button" class="btn">\r\n\t' + that.getBtnText() + '\r\n</button> ');
        },

        generateCSS: function () {
            var that = this;

            that.$outputCSS.text(
                '.btn {' +
                '\r\n\tcolor: #fff;' +
                '\r\n\tbackground-color: #37a1e4;' +
                '\r\n\tbackground-image: -webkit-linear-gradient(top, #77bfed, #4baae6);' +
                '\r\n\tbackground-image: linear-gradient(to bottom, #77bfed, #4baae6);' +
                '\r\n\tborder: ' + that.bw + 'px solid #3181b4;' +
                '\r\n\tborder-radius: ' + that.br + 'px;' +
                '\r\n\tbox-shadow: 0 1px 2px #999,' +
                '\r\n\t\tinset 0 1px 2px #fff;' +
                '\r\n\tdisplay: block;' +
                '\r\n\tfont-size: .875em;' +
                '\r\n\tfont-weight: bold;' +
                '\r\n\tpadding: 12px 27px;' +
                '\r\n\ttext-shadow: 0 0px 1px #333;' +
                '\r\n}' +
                '\r\n.btn:hover {' +
                '\r\n\tbox-shadow: 0 1px 3px #333,' +
                '\r\n\t\tinset 0 1px 2px #fff;' +
                '\r\n}' +
                '\r\n.btn:active {' +
                '\r\n\tbox-shadow: 0 1px 2px #fff,' +
                '\r\n\tinset 0 1px 2px #999;' +
                '\r\n\tbackground-image: -webkit-linear-gradient(bottom, #77bfed, #4baae6);' +
                '\r\n\tbackground-image: linear-gradient(to top, #77bfed, #4baae6);' +
                '\r\n}');
        },

        /* тултип */
        hideTooltip: function () {
            this.$outputEmail.tooltip('disable');
        },

        showTooltip: function (msg, isError) {
            var that = this,
                tooltipClass = isError ? 'error' : 'success';

            that.$outputEmail.tooltip('option', 'content', msg);
            that.$outputEmail.tooltip('option', 'tooltipClass', tooltipClass);
            that.$outputEmail.tooltip('open');
        },

        refreshTooltip: function () {
            var that = this;

            if ($('.ui-tooltip').length) {
                that.$outputEmail.tooltip('close');
                that.$outputEmail.tooltip('open');
            }
        }

    };

    app.init();

})(jQuery, window);