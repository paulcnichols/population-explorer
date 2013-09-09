This is a dummy project to learn grunt.  It creates a simple two page explorer for population growth.

Steps to reproduce are the following:
- Install the node dependencies: `npm install` 
- Install the bower dependencies: `bower install`
- Build the sparkline library manually (need to incorporate into grunt): `cd app/bower_modeles/sparkline && make`
- Run grunt: `grunt build`
- Run a server: `grunt server` or `python -m SimpleHTTPServer`
