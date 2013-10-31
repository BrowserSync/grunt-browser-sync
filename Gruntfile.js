/*
 * grunt-browser-sync
 * https://github.com/shakyshane/grunt-browser-sync
 *
 * Copyright (c) 2013 Shane Osbourne
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        uglify: {
            files: {
                src: "tasks/lib/style-injector-client.js",
                dest: "tasks/lib/style-injector-client.min.js"
            }
        },
        clean: {
            tests: ['tmp']
        },
        watch: {
            server_tests: {
                files: [
                    "test/new-server/**/*.js",
                    "tasks/lib/**/*.js"
                ],
                tasks: ["jasmine_node"]
            },
            sass: {
                files: "test/fixtures/sass/*.scss",
                tasks: ['sass']
            }
        },
        browser_sync: {
            default_options: {
                files: {
                    src : [
                        'test/**'
                    ]
                },
                options: {
                    watchTask: true,
                    debugInfo: true,
                    ghostMode: {
                        scroll: true,
                        links: true,
                        forms: true
                    },
                    server: {
                        baseDir: "test/fixtures"
                    }
                }
            }
        },
        sass: {
            test: {
                files: {
                    "test/fixtures/css/style.css" : "test/fixtures/sass/style.scss"
                }
            }
        },
        karma: {
            unit: {
                configFile: 'test/karma.conf.js',
                singleRun: true
            }
        },
        nodeunit: {
            tests: ['test/*_test.js']
        }
    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['karma', 'jasmine_node']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ["browser_sync"]);


    grunt.registerTask('dev-watch', ["browser_sync", "watch:sass"]);

};
