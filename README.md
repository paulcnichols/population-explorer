This is a dummy project to try out the yeomen/bower/grunt workflow instead of using a seed project.  It creates a simple two page explorer app for world population growth by country.

This project was created from the following yeoman command:
- `yo angular`

Steps to build from this source tree are the following:
- Install the node dependencies: `npm install` 
- Install the bower dependencies: `bower install`
- Build the sparkline library manually (need to incorporate into grunt): `(cd app/bower_modeles/sparkline && make)`
- Run grunt: `grunt`
- Run a server: `grunt server` or `(cd dist && python -m SimpleHTTPServer)`
