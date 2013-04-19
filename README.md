get-http-resources.js
=====================

A [phantomjs](http://phantomjs.org/) script which checks secure web pages for insecure resources. In other words, checks 'https' web page, and search for 'http' content in it

Example usage:
<pre>
phantomjs get-http-resources.js --url=https://google.com
</pre>

<pre>
phantomjs get-http-resources.js --url=https://google.com --verbose=true
</pre>

Troubleshooting
===============

If you got such an error
<pre>
undefined:0 Unknown module system for require()
</pre>
check that if you have latest (1.9) phantomjs. You can download it from [http://phantomjs.org](http://phantomjs.org/) 

