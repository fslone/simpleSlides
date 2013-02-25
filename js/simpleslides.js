/*

Simple Slides 1.1
A very simple jQuery plugin for slideshows

Written by Sethen Maleno

*/

( function($) {

	var methods = {

		init: function(obj) {

			this.imageContainer = obj;
			this.images = $(obj).find("img");
			this.imagesLength = this.images.length;

			//run a for loop for all images
			for(var i = 0, z = 9999; i < this.imagesLength; i++, z--) {

				$(this.images[i]).css({ "z-index" : z });

			}

		},

		startSlideShow: function(images, current, slideShowSpeed) {

			var self = this;
			var firstImage = images[0];
			var next = $(current).next();
			var currentIndex = $(current).index();
			var slideButtons = $(self.imageContainer).find(".slideButtons ul li a");

			$(slideButtons).removeClass("activeSlide");
			$(slideButtons[currentIndex]).addClass("activeSlide");

			runSlideshow = setTimeout( function() {

				if(next.length == 0 || next.hasClass("slideButtons")) {

					current = firstImage;
					
					$(current).fadeIn("slow", function() {
						
						$(images).show();
					
					});

				} else {

					$(current).fadeOut("slow");
					current = next;

				}

				self.startSlideShow(images, current, slideShowSpeed);

			}, slideShowSpeed);

		},

		stopSlideshow: function(slideShowSpeed) {

			var self = this;

			$(this.imageContainer).on({

				mouseenter: function() {

					clearTimeout(runSlideshow);

				},

				mouseleave: function() {

					var shownImage = $(self.imageContainer).find("img:visible")[0];
					methods.startSlideShow(self.images, shownImage, slideShowSpeed);

				}

			});

		},

		generateButtons: function() {

			$("<div class='slideButtons'><ul></ul></div>").appendTo(this.imageContainer);

			for(var i = 0; i < this.imagesLength; i++) {

				if( i == 0) {

					$(".slideButtons ul").append("<li><a class='activeSlide' href='javascript:;'></a></li>")
			
				} else {
				
					$(".slideButtons ul").append("<li><a href='javascript:;'></a></li>")
				
				}
			}

		}

	}

	$.fn.simpleSlides = function(options) {

		var settings = $.extend({
			"generateButtons" : true,
			"stop" : true,
			"slideShowSpeed" : 1000,
		}, options);

		methods.init(this);


		if(settings["slideShowSpeed"]) {
		
			if(settings["slideShowSpeed"] < 1000) {

				settings["slideShowSpeed"] = 1000;

			}

			methods.startSlideShow(methods.images, methods.images[0], settings["slideShowSpeed"]);
		
		}

		if(settings["stop"]) {

			methods.stopSlideshow(settings["slideShowSpeed"]);
			
		}

		if(settings["generateButtons"]) {

			methods.generateButtons();
		}
	}

}(jQuery));
