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

        var patterns;

        if (this.data && this.data.bsFiles && this.data.bsFiles.src) {
            patterns = this.data.bsFiles.src;
            if (typeof patterns === "string") {
                patterns = [patterns];
            }
        }

        if (!patterns) {
            if (this.data.src) {
                patterns = this.data.src;
                if (typeof this.data.src === "string") {
                    patterns = [this.data.src];
                }
            }
        }

        if (!patterns) {
            if (this.filesSrc.length) {
                patterns = this.filesSrc;
            }
        }

        var browserSync  = require("browser-sync");

        browserSync.setup.kickoff(patterns || [], options);

        //noinspection JSUnresolvedVariable
        if (options.watchTask || options.background) {
            done(); // Allow Watch task to run after
        }
    });
};