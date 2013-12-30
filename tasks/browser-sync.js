/*
 * grunt-browser-sync
 * https://github.com/shakyshane/grunt-browser-sync
 *
 * Copyright (c) 2013 Shane Osbourne
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    grunt.registerMultiTask("browser_sync", "Keep your browsers in sync", function () {

        var done = this.async();

        // fail straight away if there are no files to watch!
        //noinspection JSUnresolvedVariable
        if (!this.filesSrc.length) {
            grunt.fail.fatal("Browser Sync could not find any files to watch! (check your config!)");
        }

        var options = this.options({
            debugInfo: true,
            background: false,
            reloadFileTypes: ["php", "html", "js", "erb"],
            injectFileTypes: ["css", "png", "jpg", "svg", "gif"],
            host: null,
            ghostMode: {
                clickedLinks: false,
                clicks: true,
                links: true,
                forms: true,
                scroll: true
            },
            server: false,
            proxy: false,
            open: true,
            notify: true
        });

        var browserSync  = require("browser-sync");
        var filePatterns = [];

        if (this.data.files && this.data.files.src) {
            filePatterns = this.data.files.src;
        }

        browserSync.setup.kickoff(filePatterns, options);

        //noinspection JSUnresolvedVariable
        if (options.watchTask || options.background) {
            done(); // Allow Watch task to run after
        }
    });
};