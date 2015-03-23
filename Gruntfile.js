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
        // The actual grunt server settings
        connect: {
            server: {
                options: {
                    hostname: "127.0.0.1",
                    port: 9001,
                    base: "test/fixtures"
                }
            }
        },
        watch: {
            options: {
                spawn: false
            },
            server_tests: {
                files: [
                    "test/new-server/**/*.js",
                    "tasks/lib/**/*.js"
                ],
                tasks: ["jasmine_node"]
            },
            sass: {
                files: "test/fixtures/sass/*.scss",
                tasks: ['bsNotify:sassStart', 'sass', 'autoprefixer', 'bsReload:css']
            }
        },
        concurrent: {
            dev: {
                tasks: [
                    'watch',
                    'browserSync'
                ],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        autoprefixer: {
            sass: {
                files: {
                    "test/fixtures/css/style.css": "test/fixtures/css/style.css"
                }
            }
        },
        browserSync: {
            server: {
                bsFiles: {
                    src : [
                        //'test/fixtures/css/*.css',
                        'test/fixtures/*.html'
                    ]
                },
                options: {
                    open: false,
                    online: false,
                    background: true,
                    server: {
                        baseDir: ["test/fixtures", "test/fixtures2"],
                        middleware: [
                            function (req, res, next) {
                                console.log("from middleware 1");
                                next();
                            },
                            function (req, res, next) {
                                console.log("from middleware 2");
                                next();
                            }
                        ]
                    }
                }
            },
            proxy: {
                files: {
                    src : [
                        'test/fixtures/css/style.css'
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
                    proxy: {
                        host: "127.0.0.1",
                        port: 9001
                    }
                }
            }
        },
        "bsReload": {
            css: {
                reload: "style.css"
            },
            all: {
                reload: true
            }
        },
        "bsNotify": {
            sassStart: {
                notify: "Please wait, compiling sass!"
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
    //grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-concurrent');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['karma', 'jasmine_node']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ["browserSync"]);

    grunt.registerTask('dev-watch', ["browserSync:server", "watch:sass"]);
    grunt.registerTask('server',    ["browserSync:server", "watch:sass"]);
    grunt.registerTask('proxy',     ["browserSync:proxy",  "watch:sass"]);

    grunt.registerTask('server-proxy', ["connect", "browserSync:proxy"]);
};
