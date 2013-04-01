/**
 * A very simple jQuery plugin for slideshows
 *
 * @author Sethen Maleno (Original)
 * @author Fleming Slone (edited 3.31.13)
 * @version Simple Slides 1.1.0
 * @requires jQuery 1.4+
 *
 */
(function ($) {
    "use strict";
    var methods = {
        runSlideshow: '',
        init: function (obj) {
            this.imageContainer = obj;
            this.images = $(obj).find("img");
            this.imagesLength = this.images.length;
        },
        startSlideShow: function (images, current, slideShowSpeed, generateButtons) {
            var self = this,
                firstImage = images[0],
                lastImage = images[this.imagesLength - 1],
                next = $(current).next(),
                currentIndex = $(current).index(),
                slideButtons = $(self.imageContainer).find(".slideButtons ul li a");
            if (generateButtons) 
                this.generateButtons(); 
            $(slideButtons)
                .removeClass("activeSlide")
                .slice(currentIndex, currentIndex + 1)
                .addClass("activeSlide");
            methods.runSlideshow = setTimeout(function () {
                if (next.length === 0 || next.hasClass("slideButtons")) {
                    $(current)
                        .css("zIndex", "0");
                    $(firstImage)
                        .css("zIndex", "1")
                        .fadeIn("slow", function () {
                            $(lastImage)
                                .hide();
                        });
                    current = firstImage;
                } else {
                    $(current)
                        .css("zIndex", "0");
                    next.fadeIn("slow", function () {
                       $(current)
                           .prev()
                           .hide();
                    });
                    current = next;
                }
                self.startSlideShow(images, current, slideShowSpeed);
            }, slideShowSpeed);

        },
        stopSlideshow: function (slideShowSpeed) {
            var self = this,
                shownImage;
            $(this.imageContainer)
                .hover(function () {clearTimeout(methods.runSlideshow); },
                       function () {shownImage = $(self.imageContainer).find("img:visible");methods.startSlideShow(self.images, shownImage, slideShowSpeed); });
        },
        generateButtons: function () {
            var i,
                ulAppend;
            $(this.imageContainer).append("<div class='slideButtons'><ul></ul></div>");
            for (i = 0; i < this.imagesLength; i += 1) {
                ulAppend = (i === 0) ? "<li><a class='activeSlide' href='javascript:;'></a></li>" : "<li><a href='javascript:;'></a></li>";
                $(".slideButtons ul")
                    .append(ulAppend);
            }
        },
        slideLinks: function () {
            var self = this;   
            $(".slideButtons ul")
                .on("click", "li", function () {
                    var slideButtons = $(self.imageContainer).find(".slideButtons ul li a"),
                        slideButtonIndex = $(this).index(),
                        shownImage = $(self.imageContainer).find("img:visible"),
                        targetImage = self.images[slideButtonIndex],
                        shownImageSRC = $(shownImage).attr("src"),
                        targetImageSRC = $(targetImage).attr("src");
                    if (shownImageSRC !== targetImageSRC || !$(targetImage).is(":animated")) {
                        $(targetImage)
                            .css("zIndex", "1")
                            .fadeIn("fast", function () {
                                $(shownImage)
                                    .css("zIndex", "0")
                                    .hide();
                                $(slideButtons)
                                    .removeClass("activeSlide")
                                    .slice(slideButtonIndex, slideButtonIndex + 1)
                                    .addClass("activeSlide");
                            });
                    }
                });
        }
    };
    $.fn.simpleSlides = function (options) {
        var settings = $.extend({
                "autoPlay": true,
                "generateButtons": true,
                "stop": true,
                "slideLinks": true,
                "slideShowSpeed": 2000
            }, options),
            autoPlay = settings.autoPlay,
            generateButtons = settings.generateButtons,
            slideShowSpeed = settings.slideShowSpeed,
            stop = settings.stop,
            slideLinks = settings.slideLinks,
            startSlideshow;
        methods.init(this);
        slideShowSpeed = (slideShowSpeed < 1000) ? 1000 : slideShowSpeed;
        startSlideshow = (autoPlay && generateButtons) ? methods.startSlideShow(methods.images, methods.images[0], slideShowSpeed, generateButtons) : methods.startSlideShow(methods.images, methods.images[0], slideShowSpeed);
        if (stop)
            methods.stopSlideshow(slideShowSpeed);
        if (slideLinks) 
            methods.slideLinks();
    };
    //Call the plugin
    $("#simpleslides").simpleSlides();
}(jQuery));