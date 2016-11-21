'use strict';
//The "wrapper" function
module.exports = function (grunt) {

      // Time how long tasks take. Can help when optimizing build times
      require('time-grunt')(grunt);

      // Automatically load required Grunt tasks
      require('jit-grunt')(grunt);

      //inform jit
      require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin'
      });

    //Project and task configuration
      // Define the configuration for all the tasks
      grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Project and task configuration
        jshint: {
          options: {
            jshintrc: '.jshintrc',
            reporter: require('jshint-stylish')
          },

          all: {
            src: [
              'Gruntfile.js',
              'js/{,*/}*.js'
            ]
          }
        },
        copy: {
          dist: {
            cwd: 'app',
            src: [ '**','!css/**/*.css','!scripts/**/*.js' ],
            dest: 'dist',
            expand: true
          },

          fonts: {
            files: [
              {
                // bootstrap fonts
                expand: true,
                dot: true,
                cwd: 'css/',
                src: ['**/*.css'],
                dest: 'dist'
              }, {
                // font-awesome
                expand: true,
                dot: true,
                cwd: 'js/',
                src: ['**/*.js'],
                dest: 'dist'
              }
            ]
          }
        },

        clean: {
          build: {
            src: [ 'dist/']
          }
        },
        useminPrepare: {
            html: '/menu.htm},

          useminPrepare: {
            html: '/menu.html',
            options: {
              dest: 'dist'
            }
           }
          },

          // Concat
          concat: {
            options: {
              separator: ';'
            },

            // dist configuration is provided by useminPrepare
            dist: {}
          },

          // Uglify
          uglify: {
            // dist configuration is provided by useminPrepare
            dist: {}
          },

          cssmin: {
            dist: {}
          },

          // Filerev
          filerev: {
            options: {
              encoding: 'utf8',
              algorithm: 'md5',
              length: 20
            },

            release: {
              // filerev:release hashes(md5) all assets (images, js and css )
              // in dist directory
              files: [{
                src: [
                  'dist/scripts/*.js',
                  'dist/styles/*.css',
                ]
              }]
            }
          },

          // Usemin
          // Replaces all assets with their revved version in html and css files.
          // options.assetDirs contains the directories for finding the assets
          // according to their relative paths
          usemin: {
            html: ['dist/*.html'],
            css: ['dist/styles/*.css'],
            options: {
              assetsDirs: ['dist', 'dist/styles']
            }
          },
                });


      //Loading Grunt plugins and tasks
      grunt.registerTask('build',[
        'clean',
        'jshint',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'copy',
        'filerev',
        'usemin'
      ]);

      grunt.registerTask('default',['build']);
};
