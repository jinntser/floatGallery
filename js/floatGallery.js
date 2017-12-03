/*************************************
 ***  Created by JZ on 2016/12/09  ***
 ***  floatGallery ver.0.4.12.09   ***
 ************************************/

(function ($) {
    function floatGallery(target, opt) {
        var $gallery = target,
            settings = {
                rows: 1,
                padding: 25,
                animation: {
                    type: 'fade',
                    time: 800,
                    delay: 20
                },
                elements: '',
                itemHeight: 100,
                itemWidth: 100,
                theme: 'dark'
            }, galleryH, galleryW, boxH, boxW, wrapH, wrapW, itemLength;
        $.extend(settings, opt);
        itemLength = $gallery.find(settings.elements).addClass('g-animate').length;
        // add wraps & theme
        $gallery.addClass('floatGallery theme-' + settings.theme).find(settings.elements).wrapAll('<div class="cnt-box"><div class="cnt-wrap"></div></div>');

        // layout adjust
        boxH = wrapH = settings.itemHeight * settings.rows;
        wrapW = settings.itemWidth * Math.round(itemLength / settings.rows) + parseInt($gallery.find('.cnt-wrap').css('padding-left')) + parseInt($gallery.find('.cnt-wrap').css('padding-right'));
        galleryW = parseInt($gallery.width());

        if (typeof settings.padding == typeof []) {
            galleryH = boxH + settings.padding[0] + settings.padding[2];
            $gallery.css({
                height: galleryH,
                paddingTop: settings.padding[0],
                paddingRight: settings.padding[1],
                paddingBottom: settings.padding[2],
                paddingLeft: settings.padding[3]
            })
        } else {
            galleryH = boxH + (settings.padding * 2);
            $gallery.css({
                height: galleryH,
                padding: settings.padding
            })
        }

        $gallery.find('.cnt-box').css('height', boxH)
            .find('.cnt-wrap').css({
            height: wrapH,
            width: wrapW
        });
        boxW = parseInt($gallery.find('.cnt-box').width());

        // bind events
        $gallery.on('mousemove', function (e) {
            var gOffset = $gallery.offset().left,
                movingRatio = (wrapW - boxW) / galleryW,
                movingOffset = (e.pageX - gOffset) * movingRatio;
            $gallery.find('.cnt-wrap').css('transform', 'translateX(-' + movingOffset + 'px)');
        });

        // reveal gallery
        $gallery.fadeTo(300, 1);
        $gallery.find('.g-animate').each(function () {
            var $this = $(this),
                $index = $this.index();
            $this.css({'transition-duration': (settings.animation.time / 1000) + 's'});
            setTimeout(function () {
                $this.addClass('g-' + settings.animation.type);
            }, settings.animation.delay * $index);
        })
    }

    $.fn.extend({
        floatGallery: function (opt) {
            return this.each(function () {
                floatGallery($(this), opt);
            });
        }
    })
})(jQuery);
