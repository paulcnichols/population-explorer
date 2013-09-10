This is a dummy project to learn try out yeomen/bower/grunt workflow instead of using a seed project.  It creates a simple two page explorer for population growth.

This project was created from the following yeoman command:
- `yo angular`

Steps to build from this source tree are the following:
- Install the node dependencies: `npm install` 
- Install the bower dependencies: `bower install`
- Build the sparkline library manually (need to incorporate into grunt): `cd app/bower_modeles/sparkline && make`
- Run grunt: `grunt build`
- Run a server: `grunt server` or `python -m SimpleHTTPServer`
