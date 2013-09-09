// Generated on 2013-09-08 using generator-angular 0.4.0
'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({ port: LIVERELOAD_PORT });
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  // configurable paths
  var yeomanConfig = {
    app: 'app',
    dist: 'dist'
  };

  try {
    yeomanConfig.app = require('./bower.json').appPath || yeomanConfig.app;
  } catch (e) {}

  grunt.initConfig({
    yeoman: yeomanConfig,
    watch: {
      concat: {
        files: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
        tasks: ['concat:dist']
      }, 
      recess: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.less'],
        tasks: ['recess:dist']
      },
      livereload: {
        options: {
          livereload: LIVERELOAD_PORT
        },
        files: [
          '<%= yeoman.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '.tmp/scripts/{,*/}*.js',
        ]
      }
    },
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, yeomanConfig.app)
            ];
          }
        }
      },
      dist: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, yeomanConfig.dist)
            ];
          }
        }
      }
    },
    open: {
      server: {
        url: 'http://localhost:<%= connect.options.port %>'
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },
    jshint: {
      options: {
        globals: {
          jQuery: false,
          $: false,
          _: false,
          scApp: false,
          angular: false,
          require: false
        }
      },
      all: [
        '<%= yeoman.app %>/scripts/{,*/}*.js'
      ]
    },
    recess: {
      options: {
        compile: true
      },
      dist: {
        files: {
          '.tmp/styles/styles.css' : '<%= yeoman.app %>/styles/styles.less'
        }
      }
    },
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['<%= yeoman.app %>/scripts/**/*.js'],
        dest: '.tmp/scripts/scripts.js'
      }
    },
    // Put files not handled in other tasks here
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'index.html',
            'bower_components/**/*',
            'images/{,*/}*.{gif,webp}',
            'styles/fonts/*',
            'world-pop.csv'
          ]
        },{
          '<%= yeoman.dist %>/styles/styles.css' : '.tmp/styles/styles.css'
        }]
      },
    },
    concurrent: {
      server: [
        'concat',
        'recess',
      ],
      dist: [ 
        'concat',
        'recess',
      ]
    },
    uglify: {
      dist: {
        files: {
          '<%= yeoman.dist %>/scripts/scripts.js' : '.tmp/scripts/scripts.js'
        }
      }
    }
  });

  grunt.registerTask('server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'connect:livereload',
      'open',
      'watch'
    ]);
  });

  grunt.registerTask('build', [
    'clean:dist',
    'concurrent:dist',
    'uglify',
    'copy:dist',
  ]);

  grunt.registerTask('default', [
    'jshint',
    'build'
  ]);
};
