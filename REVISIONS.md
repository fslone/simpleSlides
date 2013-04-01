HTML

1.) Changed the jquery-min source call to the Google CDN source to be protocol agnostic rather than leaving it hard coded as "http://". Hard coding the non-secure http protocol would cause insecure page warnings on secured pages that would still be trying to pull sources, in this case the jquery library, from an unsecured source protocol.

2.) Added image alt tags to reduce errors in W3C validation, to aid in SEO purposes, and to improve Section 503 / U.S. Rehab Act compliance for disabled users who may be accessing the content through screen readers, such as Jaws Reader, etc.

3.) Normalize.css was being called from index.html but the target file was not found in the directory structure. Removed the call.

4.) css/main.css was being called as a stylesheet but did not initially exist. I split all the embedded CSS out of index.html and into a new file I created at the css/main.css location. One additional server call is needed to use an external stylesheet versus embedded CSS declarations via style tags but the code is more semantically correct by separating the CSS styling information from the markup.

5.) Ran completed HTML through JS Beautifier (http://jsbeautifier.org/) to correct alignment issues and replace tab indents with two space indents to reduce filesize

6.) Although I am leaving the problem meta tag in, note that the markup will still not pass W3C validation as HTML5 because of a "bad value for attribute" error concerning this line: <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
This is because the attribute is not standard HTML, "The following proposed extensions do not yet conform to all the registration requirements in the HTML spec and are therefore not yet allowed in valid documents." The feature is still in "proposed" status: http://wiki.whatwg.org/wiki/PragmaExtensions

7.) The modernizr.js call was to a non-existent target file so removed that script call altogether



CSS

8.) Border-radius property definitions in main.css will not be supported in IE8-. The border-radius property is also not supported by Opera and Opera Mobile in older versions, as well as the latest version of Opera Mini. Source: http://caniuse.com/border-radius

9.) Ran CSS through JS Beautifier (http://jsbeautifier.org/) to reduce spaces/tabs being used for code spacing

10.) CSS property definitions were out of alphabetical order so corrected this. A browser renders property definitions in alphabetical order, so doing so pre-emptively provides for marginal savings on browser overhead. Also makes CSS much easier to locate and maintain for future contributors.



JS

11.) Ran through JS Beautifier (http://jsbeautifier.org/) to format, remove blank lines, convert tab indents to four space indents to reduce filesize and adhere to standard JS whitespacing conventions

12.) Added in JSDoc so comments are in a format that can now be used to generate automatic JS documentation when run through a compiler such as jsdoc-toolkit. Although more comments are being added to the JS than previously, and thus a larger filesize, these comments will be stripped during the build/minification process and will not affect the final JS build. JSDoc tutorial - http://www.2ality.com/2011/08/jsdoc-intro.html

13.) Added "use strict"; statement to the function expression being used to namespace the JS. "use strict"; allows a programmer to  indicate sections of strict code vs. sloppy code, as sloppy syntactical code may eventually be used in the same JS file and should be treated differently than strict syntactical code. Strict mode is less forgiving of common JS errors, prevents unsafe behaviors like gaining access to the global object (especially accidental assignment of global variables), and strict mode provides much more detailed descriptions of run time defects that may arise. Note that using try/catch/throw error handling will obfuscate the much better "use strict"; error messages, but suppressing the extra error information from being logged to the console may be desirable in production builds of the the JS. 

"use strict" tutorial - http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/

14.) Combined variable declarations at the top of all functions to reduce unnecessary var statements and avoid hoisting issues. Declaring variables in this way avoids the conflicts associated with variable hoisting, in which a variable declaration lower in the function is still hoisted to the top of the function for initialization, but then is assigned a value of "undefined" until the variable assignment is reached lower in the function.       

Hoisting Tutorial - http://net.tutsplus.com/tutorials/javascript-ajax/quick-tip-javascript-hoisting-explained/

15.) Removed object declaration format from jQuery.css() methods where it was not required. Rather than setting $(this).css({"z-index":1}); filesize can be reduced by using .css('z-index',1) if only one CSS property is being changed. Object notation is only necessary when setting multiple css properties at once, like so: $(this).css({"z-index":1,"background":"#fff"});

16.) Added proper version numbering in the @version tag at the top of the file in the JSDoc comments. Versioning should be in the following format: 1.0.0 - The first number indicates the major release version and only increases when substantial changes are made, usually those that will break backwards compatibility with older versions. The second number is the minor release version number, indicating a set of incremental upgrades/improvements in between major releases. The third number is incremented to indicate bug fixes, etc. Not that when increasing a major or minor version number that all numbers to the right of the number being changed will return to zero. If I had a first release version like this - 1.3.45 - and incremented the minor release version number, the version becomes 1.4.0 to indicate no bug/defect fixes have been applied to this minor release version yet. I have numbered the plugin 1.1.0 to indicate that I have made a minor version update with this pull request.

Versioning Tutorial: http://semver.org/

17.) Refined chaining of jQuery events. Rather than having multiple selectors and the associated drain on performance when looking up selectors repeatedly, jQuery handlers have been chained to avoid unnecessary DOM traversal operations.

18.) Replaced equality operators with identity operators in function evaluations. Helps to speed performance by avoiding type conversions and value coercion if the values are of different types.

19.) Removing auto-increment and auto-decrement operators, as they may be prone to errors

Douglas Crockford Explains: http://www.youtube.com/watch?v=47Ceot8yqeI&t=69m0s

20.) JS now passes JSLint scrutiny, note that you must predefine "jQuery" as a global variable and set "Assume a browser" to "true". 

Site: http://www.jslint.com/

