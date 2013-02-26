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

		},

		startSlideShow: function(images, current, slideShowSpeed, generateButtons) {

			var self = this;
			var firstImage = images[0];
			var lastImage = images[this.imagesLength - 1];
			var next = $(current).next();
			var currentIndex = $(current).index();
			var slideButtons = $(self.imageContainer).find(".slideButtons ul li a");

			if(generateButtons) {

				this.generateButtons();

			}

			$(slideButtons).removeClass("activeSlide");
			$(slideButtons[currentIndex]).addClass("activeSlide");

			runSlideshow = setTimeout( function() {

				if(next.length == 0 || next.hasClass("slideButtons")) {

					$(current).css({ "z-index" : 0 });
					$(firstImage).css({ "z-index" : 1 }).fadeIn("slow", function() {

						$(lastImage).hide();

					})

					current = firstImage;


				} else {

					$(current).css({ "z-index" : 0 });

					next.fadeIn("slow", function() {

						$(current).prev().hide();

					});

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

					var shownImage = $(self.imageContainer).find("img:visible");

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
			"slideShowSpeed" : 2000,
		}, options);

		methods.init(this);


		if(settings["slideShowSpeed"]) {
		
			if(settings["slideShowSpeed"] < 1000) {

				settings["slideShowSpeed"] = 1000;

			}

			methods.startSlideShow(methods.images, methods.images[0], settings["slideShowSpeed"], settings["generateButtons"]);
		
		}


		if(settings["stop"]) {

			methods.stopSlideshow(settings["slideShowSpeed"]);
			
		}



	}

}(jQuery));
