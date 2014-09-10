/*global jQuery*/
(function ($) {
    'use strict';

    var app = {

        /* константы */
        MAX_BORDER_RADIUS: 20,
        MAX_BORDER_WIDTH: 10,

        /* переменные */
        $borderRadius: $('#js-border-radius'),
        $borderWidth: $('#js-border-width'),
        $btnText: $('#js-btn-text'),
        $resultBtn: $('#js-result-btn'),
        $outputHTML: $('#js-output-html'),
        $outputCSS: $('#js-output-css'),
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

            $('input, textarea').placeholder();

            this.setUpListeners();

            this.$borderRadius.trigger('slidechange');
            this.$borderWidth.trigger('slidechange');
            this.$btnText.trigger('keyup');
        },

        /* обработчики событий */
        setUpListeners: function () {
            this.$borderRadius.on('slidechange', $.proxy(this.changeBorderRadius, this));
            this.$borderWidth.on('slidechange', $.proxy(this.changeBorderWidth, this));
            this.$btnText.on('keyup', $.proxy(this.changeButtonText, this));
        },

        /* методы */
        changeBorderRadius: function (event) {
            this.br = this.$borderRadius.find(':first-child').width() / this.$borderRadius.width() * this.MAX_BORDER_RADIUS ^ 0;
            event.preventDefault();
            this.$resultBtn.css('border-radius', this.br + 'px');
            this.generateCSS();
        },

        changeBorderWidth: function (event) {
            this.bw = this.$borderWidth.find(':first-child').width() / this.$borderWidth.width() * this.MAX_BORDER_WIDTH ^ 0;
            event.preventDefault();
            this.$resultBtn.css('border-width', this.bw + 'px');
            this.generateCSS();
        },

        changeButtonText: function (event) {
            event.preventDefault();
            this.$resultBtn.text(this.$btnText.val());
            this.generateHTML();
        },

        generateHTML: function () {
            this.$outputHTML.text('<button type="button" class="btn">\n\t' + this.$btnText.val() + '\n</button>');
        },

        generateCSS: function () {
            this.$outputCSS.text(
                '.btn {'+
                    '\n\tcolor: #fff;'+
                    '\n\tbackground-color: #37a1e4;'+
                    '\n\tbackground-image: -webkit-linear-gradient(top, #77bfed, #4baae6);'+
                    '\n\tbackground-image: linear-gradient(to bottom, #77bfed, #4baae6);'+
                    '\n\tborder: ' + this.bw + 'px solid #3181b4;'+
                    '\n\tborder-radius: ' + this.br + 'px;'+
                    '\n\tbox-shadow: 0 1px 2px #999,'+
                    '\n\t\tinset 0 1px 2px #fff;'+
                    '\n\tdisplay: block;'+
                    '\n\tfont-size: .875em;'+
                    '\n\tfont-weight: bold;'+
                    '\n\tpadding: 12px 27px;'+
                    '\n\ttext-shadow: 0 0px 1px #333;'+
                    '\n}'+
                    '\n.btn:hover {'+
                    '\n\tbox-shadow: 0 1px 3px #333,'+
                    '\n\t\tinset 0 1px 2px #fff;'+
                    '\n}'+
                    '\n.btn:active {'+
                    '\n\tbox-shadow: 0 1px 2px #fff,'+
                    '\n\tinset 0 1px 2px #999;'+
                    '\n\tbackground-image: -webkit-linear-gradient(bottom, #77bfed, #4baae6);'+
                    '\n\tbackground-image: linear-gradient(to top, #77bfed, #4baae6);'+
                    '\n}');
        }
    };

    app.init();

})(jQuery);