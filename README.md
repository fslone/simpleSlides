Simple Slides 1.0.0
================

A very simple jQuery plugin for slideshows.  This is a plugin that will be actively supported and have new features added from time to time.

For now, this plugin will loop through all of your pictures and fade them out one by one until it reaches the end and then start over.  Easy and reliable.

Initiate the process at the bottom of your HTML like this:

    $("div").simpleSlides();

## Simple Slides options ##


Simple Slides now supports a few different options -- `autoPlay`, `generateButtons`, `stop`, `slideLinks` & `slideShowSpeed`.

The `autoPlay` option is set to `true` by default and plays through all of the slides in sequence at the `slidShowSpeed` set.  You can turn this off by setting `autoPlay` to `false`:

    $("div").simpleSlides({
        "autoPlay" : false
    });

The `generateButtons` option is set to `true` by default and generates buttons that show the current progress of the slideshow.  You can turn this off by setting `generateButtons` to `false`:

    $("div").simpleSlides({
		"generateButtons" : false
    });

The `slideLinks` option is set to `true` by default and enables clicking of the slide buttons at the bottom of the slideshow to fade to a certain slide.  You can turn this off by setting `generateButtons` to `false`:

    $("div").simpleSlides({
        "slideLinks" : false
    });

The `stop` option is set to `true` by default and stops the slideshow on mouse overs.  You can turn this off by setting `stop` to `false`:

    $("div").simpleSlides({
		"stop" : false
    });

The `slideShowSpeed` option is set to `2000` by default and controls the speed of the actual slideshow itself.  However, Simple Slides will wait until the actual fade is completed.  You can change this by setting `slideShowSpeed` to a value or expression of your choice:

    $("div").simpleSlides({
	    "slideShowSpeed" : 1500
	});

