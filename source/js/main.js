/*global jQuery*/
(function ($) {
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
        $outputMsg: $('.js-output-msg'),
        br: 0,
        bw: 0,


        /* инициализация объекта*/
        init: function () {
            $(this.$borderRadius).empty().slider({
                range: 'min',
                value: 30
            });
            $(this.$borderWidth).empty().slider({
                range: 'min',
                value: 20
            });

            this.$borderRadius.trigger('slidechange');
            this.$borderWidth.trigger('slidechange');
            this.$btnText.trigger('keyup');

            $('input, textarea').placeholder();

            this.setUpListeners();

            this.$borderRadius.trigger('slidechange');
            this.$borderWidth.trigger('slidechange');
            this.$btnText.trigger('change');
        },


        /* обработчики событий */
        setUpListeners: function () {
            this.$form.on('submit', $.proxy(this.submitForm, this));
            this.$borderRadius.on('slidechange', $.proxy(this.changeBorderRadius, this));
            this.$borderWidth.on('slidechange', $.proxy(this.changeBorderWidth, this));
            this.$btnText.on('change keyup input', $.proxy(this.changeButtonText, this));
            this.$outputEmail.on('change keyup input', $.proxy(this.hideMsg, this));
        },


        /* методы */
        submitForm: function (event) {
            var $submitBtn = this.$form.find('button[type="submit"]'),
                str = this.$form.serialize();

            event.preventDefault();
            this.hideMsg();

            if (!/.+@.+\..+/.test(this.$outputEmail.val())) {
                this.showMsg('Адрес почты введён неверно.', true);
                return;
            }

            $submitBtn.attr('disabled', 'disabled');

            $.ajax({
                url: 'php/sendmail.php',
                type: 'POST',
                context: this,
                data: str
            })
                .done(function (data) {
                    this.showMsg('Сообщение отправлено.');
                })
                .fail(function (data) {
                    this.showMsg('Возникла ошибка! Сообщение не было отправлено.', true);
                })
                .always(function () {
                    $submitBtn.removeAttr('disabled');
                });
        },

        changeBorderRadius: function (event) {
            this.br = this.$borderRadius.find(':first-child').width() / this.$borderRadius.width() * this.MAX_BORDER_RADIUS ^ 0;
            this.$resultBtn.css('border-radius', this.br + 'px');
            this.generateCSS();
        },

        changeBorderWidth: function (event) {
            this.bw = this.$borderWidth.find(':first-child').width() / this.$borderWidth.width() * this.MAX_BORDER_WIDTH ^ 0;
            this.$resultBtn.css('border-width', this.bw + 'px');
            this.generateCSS();
        },

        changeButtonText: function (event) {
            this.$resultBtn.text(this.$btnText.val());
            this.generateHTML();
        },

        hideMsg: function () {
            this.$outputMsg.hide();
        },

        showMsg: function (msg, isError) {
            if (!isError) {
                this.$outputMsg.removeClass('output__msg--error');
            } else {
                this.$outputMsg.addClass('output__msg--error');
            }

            this.$outputMsg.text(msg).show();
        },

        generateHTML: function () {
            this.$outputHTML.text('<button type="button" class="btn">\n\t' + this.$btnText.val() + '\n</button>');
        },

        generateCSS: function () {
            this.$outputCSS.text(
                '.btn {' +
                '\n\tcolor: #fff;' +
                '\n\tbackground-color: #37a1e4;' +
                '\n\tbackground-image: -webkit-linear-gradient(top, #77bfed, #4baae6);' +
                '\n\tbackground-image: linear-gradient(to bottom, #77bfed, #4baae6);' +
                '\n\tborder: ' + this.bw + 'px solid #3181b4;' +
                '\n\tborder-radius: ' + this.br + 'px;' +
                '\n\tbox-shadow: 0 1px 2px #999,' +
                '\n\t\tinset 0 1px 2px #fff;' +
                '\n\tdisplay: block;' +
                '\n\tfont-size: .875em;' +
                '\n\tfont-weight: bold;' +
                '\n\tpadding: 12px 27px;' +
                '\n\ttext-shadow: 0 0px 1px #333;' +
                '\n}' +
                '\n.btn:hover {' +
                '\n\tbox-shadow: 0 1px 3px #333,' +
                '\n\t\tinset 0 1px 2px #fff;' +
                '\n}' +
                '\n.btn:active {' +
                '\n\tbox-shadow: 0 1px 2px #fff,' +
                '\n\tinset 0 1px 2px #999;' +
                '\n\tbackground-image: -webkit-linear-gradient(bottom, #77bfed, #4baae6);' +
                '\n\tbackground-image: linear-gradient(to top, #77bfed, #4baae6);' +
                '\n}');
        }
    };

    app.init();

})(jQuery);