#Revisions, 1.0.1#

##HTML##
========================

1.) `Normalize.css` was being called from `index.html` but the target file was not found in the directory. Removed the call.

2.) `css/main.css` was being called but didn't initially exist. Split all the embedded CSS out of index.html and into a new file at css/main.css . 

3.) Ran completed HTML through JS Beautifier to correct alignment issues and replace tab indents with two space indents to reduce filesize

    Site: http://jsbeautifier.org/

4.) The `modernizr.js` was another 404 so took that out for now



##CSS##
========================

5.) `border-radius` property definitions like for the buttons in `main.css` will not be supported in IE8- and Firefox3-. The `border-radius` property is also not supported by Opera and Opera Mobile in older versions, as well as the latest version of Opera Mini. 

    Source: http://caniuse.com/border-radius

6.) Ran CSS through JS Beautifier to reduce spaces/tabs being used for code spacing

    Site: http://jsbeautifier.org/

7.) CSS property definitions were out of alphabetical order so alphabetized that. A browser renders property definitions in alphabetical order, so doing so pre-emptively provides for a slight savings on browser overhead. Also makes CSS much easier to locate and maintain for future contributors.



##JS##
========================

8.) Ran through JS Beautifier to format, remove blank lines, convert tab indents to four space indents to reduce filesize

    Site: http://jsbeautifier.org/

9.) Added in JSDoc so comments are in a format that can now be used to generate automatic JS documentation when run through a compiler such as jsdoc-toolkit. Although more comments are being added to the JS than previously, and thus a larger filesize, these comments will be stripped during the build/minification process and will not affect the final JS build. 

    JSDoc Tutorial: http://www.2ality.com/2011/08/jsdoc-intro.html

10.) Added `"use strict";` statement to the function expression being used to namespace the JS. `"use strict";` allows for sections of strict code vs. sloppy code, as sloppy syntax may eventually be used in the same JS file and should be treated differently than strict syntactical code. Strict mode is less forgiving of common JS errors, prevents unsafe behaviors like gaining access to the global object (especially accidental assignment of global variables), and strict mode provides much more detailed descriptions of run time defects that may arise. Note that using try/catch/throw error handling will obfuscate the much better "use strict"; error messages, but suppressing the extra error information from being logged to the console may be desirable in production builds of the the JS. 

    "use strict"; Tutorial: http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/

11.) Combined variable declarations at the top of all functions to reduce unnecessary var statements and avoid hoisting issues. Declaring variables up top avoids the conflicts associated with variable hoisting, where a variable declaration lower in the function is still hoisted to the top of the function for initialization, but is assigned a value of "undefined" until the variable assignment is reached lower in the function.       

    Hoisting Tutorial: http://net.tutsplus.com/tutorials/javascript-ajax/quick-tip-javascript-hoisting-explained/

12.) Added proper version numbering in the @version tag at the top of the file in the JSDoc comments. Versioning should be in the following format: 1.0.0 - The first number indicates the major release version and only increases when substantial changes are made, usually those that will break backwards compatibility with older versions. The second number is the minor release version number, indicating a set of incremental upgrades/improvements in between major releases. The third number is incremented to indicate bug fixes, etc. Not that when increasing a major or minor version number that all numbers to the right of the number being changed will return to zero. If I had a first release version like this - 1.3.45 - and incremented the minor release version number, the version becomes 1.4.0 to indicate no bug/defect fixes have been applied to this minor release version yet. I have numbered the plugin 1.0.1 to indicate that I have made a minor bug fix with this pull request.

    Versioning Tutorial: http://semver.org/

13.) Redid chaining and selector caching on some of the jQuery to see if it will give a performance boost.

14.) Replaced equality operators with identity operators in function evaluations. Helps to speed performance by avoiding type conversions and value coercion if the values are different types.

15.) Removing auto-increment and auto-decrement operators, as these may be prone to unforeseen errors.

    Douglas Crockford Explains: http://www.youtube.com/watch?v=47Ceot8yqeI&t=69m0s

26.) JS now passes JSLint scrutiny, you have to define "jQuery" as a global variable and set "Assume a browser" to "true" for this to clear. 

    Site: http://www.jslint.com/

