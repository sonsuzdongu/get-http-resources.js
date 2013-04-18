get-http-resources.js
=====================

A [phantomjs](http://phantomjs.org/) script which checks secure web pages for insecure resources. In other words, checks 'https' web page, and search for 'http' content in it

Example usage:
<pre>
phantomjs get-http-resources.js --url=http://google.com
</pre>

<pre>
phantomjs get-http-resources.js --url=http://google.com --verbose=true
</pre>
