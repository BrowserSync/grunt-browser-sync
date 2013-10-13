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
        // Before generating any new files, remove any previously-created files.
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
            }
        },
        browsersync: {
            default_options: {
                files: {
                    src : [
                        'test/**'
                    ]
                },
                options: {
                    watchTask: false,
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
        karma: {
            unit: {
                configFile: 'test/karma.conf.js',
                singleRun: true
            }
        },
        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        },
        jasmine_node: {
//            specNameMatcher: "Spec", // load only specs containing specNameMatcher
            specNameMatcher: "Spec", // load only specs containing specNameMatcher
            projectRoot: "test/new-server",
            requirejs: false,
            forceExit: true,
            jUnit: {
                report: false,
                savePath : "./build/reports/jasmine/",
                useDotNotation: true,
                consolidate: true
            }
        }
    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['karma', 'jasmine_node']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ["browser-sync"]);

};
