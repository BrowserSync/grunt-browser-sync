/*
 * grunt-browser-sync
 * https://github.com/shakyshane/grunt-browser-sync
 *
 * Copyright (c) 2013 Shane Osbourne
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    grunt.registerMultiTask("browserSync", "Keep your browsers in sync", function () {

        var done = this.async();

        var options = this.options();

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

        browserSync.init(patterns, options);

        //noinspection JSUnresolvedVariable
        if (options.watchTask || options.watchtask || options.background) {
            done(); // Allow Watch task to run after
        }
    });
};
