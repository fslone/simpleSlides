/**
 * 
 * @fileOverview A very simple jQuery plugin for slideshows
 * @author Sethen Maleno (Original)
 * @author Fleming Slone
 * @requires jQuery 1.9+
 * @see http://www.jquery.com/
 * @version 1.0.1
 * @since 4.1.13
 *
 */

(function ($) {

    "use strict";

    /** @namespace methods */
    var methods = {
        /**
        * @public
        * @function methods.init
        * @param {object} obj
        * 
        *
        */

        init: function (obj) {
            this.imageContainer = obj;
            this.images = $(obj).find("img");
            this.imagesLength = this.images.length;
            this.runSlideshow = '';
            this.imgCont = $(this.imageContainer);
            this.timeDelay = '';
        },

        /**
        *
        * Accepts an array of images, which image to begin the slideshow with, 
        * what interval the autorate transitions should take place at, and creates 
        * navigation buttons for the slideshow as needed
        * @public
        * @function methods.startSlideShow
        * @param {array} images
        * @param {string} current
        * @param {number} slideShowSpeed
        * @param {boolean} generateButtons
        * 
        *
        */

        startSlideShow: function (images, current, slideShowSpeed, generateButtons) {
            var self = this,
                firstImage = this.images[0],
                lastImage = this.images[this.imagesLength - 1],
                next = $(current).next(),
                currentIndex = $(current).index(),
                slideButtons = self.imgCont.find(".slideButtons ul li a");
            if (generateButtons) { this.generateButtons(); }
            $(slideButtons)
                .removeClass("activeSlide")
                .slice(currentIndex, currentIndex + 1)
                .addClass("activeSlide");
            this.runSlideshow = setTimeout(function () {
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

        /**
        * 
        * Stops the slide transitions on mouseenter, resumes in the same 
        * gallery picture location on mouseleave
        * @public
        * @function methods.stopSlideshow
        * @param {number} slideShowSpeed
        * 
        *
        */

        stopSlideshow: function (slideShowSpeed) {
            var self = this,
                shownImage;
            this.imgCont
                .hover(function () {clearTimeout(self.runSlideshow); },
                       function () {shownImage = self.imgCont.find("img:visible"); methods.startSlideShow(self.images, shownImage, slideShowSpeed); });
        },

        /**
        *
        * Creates buttons to navigate the slideshow if 
        * specified
        * @public
        * @function methods.generateButtons
        *
        */

        generateButtons: function () {
            var i,
                ulAppend;
            this.imgCont
                .append("<div class='slideButtons'><ul></ul></div>");
            for (i = 0; i < this.imagesLength; i += 1) {
                ulAppend = (i === 0) ? "<li><a class='activeSlide'></a></li>" : "<li><a></a></li>";
                $(".slideButtons ul")
                    .append(ulAppend);
            }
            
        },

        /**
        *
        * Swaps out the buttons being selected/unselected based on click events
        * @public
        * @function methods.slideLinks
        *
        */

        slideLinks: function () {
            var self = this,
                fadeMenu = setTimeout
            $(".slideButtons ul")
                .on("click", "li", function () {
                    var slideButtons = self.imgCont.find(".slideButtons ul li a"),
                        slideButtonIndex = $(this).index(),
                        shownImage = self.imgCont.find("img:visible"),
                        targetImage = self.images[slideButtonIndex],
                        shownImageSRC = $(shownImage).attr("src"),
                        targetImageSRC = $(targetImage).attr("src");
                    if (shownImageSRC !== targetImageSRC && !$(targetImage).is(":animated")) {
                        $(targetImage)
                            .fadeIn("slow", function () {
                                $(shownImage)
                                    .fadeOut("fast");
                                $(slideButtons)
                                    .removeClass("activeSlide")
                                    .slice(slideButtonIndex, slideButtonIndex + 1)
                                    .addClass("activeSlide");

                            });
                    }
                });

        },

        /** 
        *
        * Experimental method 
        * for minimizing the nav menu.
        * Not fully tested.
        * @public
        * @function methods.minLinkMenu
        *
        */
        minLinkMenu: function () {
                var self = this;
                this.timeDelay = setTimeout(
                    function(){
                        $(".slideButtons ul").slideUp(3000);
                    }, 
                6000
                );
                $(".slideButtons").hover(
                    function() {
                        clearTimeout(this.timeDelay);
                        $(".slideButtons ul")
                            .stop()
                            .slideDown(); 
                    },
                    function() {
                        methods.minLinkMenu(); 
                    }
                );
        }
    };

    /**
    *
    * @see http://www.jquery.com/
    * @name $
    * @class
    *
    */

    /**
    *
    * @see http://www.jquery.com/
    * @name fn
    * @class
    * @memberOf $
    *
    */

    /**
    *
    * simpleSlides plugin
    * @class
    * @memberOf $.fn
    *
    */

    $.fn.simpleSlides = function (options) {
        
        /** @namespace settings */
        var settings = $.extend({
                "autoPlay": true,
                "generateButtons": true,
                "stop": true,
                "slideLinks": true,
                "slideShowSpeed": 3000,
                "minimizeButtons": false
            }, options);
            
        methods.init(this);
        
        //this ensures a minimum of 1000 milliseconds on slide changes
        settings.slideShowSpeed = (settings.slideShowSpeed < 1000) ? settings.slideShowSpeed += 1000 : settings.slideShowSpeed;
        
        //this is causing problems because buttons cant be created on slideshows 
        //not set to autoPlay. Split into two conditionals
        methods.startSlideshow = (settings.autoPlay && settings.generateButtons) ? methods.startSlideShow(methods.images, methods.images[0], settings.slideShowSpeed, methods.generateButtons) : methods.startSlideShow(methods.images, methods.images[0], settings.slideShowSpeed);
        
        if (settings.stop) {methods.stopSlideshow(settings.slideShowSpeed); }
        
        if (settings.slideLinks) {methods.slideLinks(); }

        /** Experimental for menu slide down animation */
        if (settings.minimizeButtons) {methods.minLinkMenu(); }
    };
    $("#simpleslides").simpleSlides();
}(jQuery));