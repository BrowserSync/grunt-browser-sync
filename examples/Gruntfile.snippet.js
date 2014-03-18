/**
 *
 * Install:
 *      npm install grunt grunt-browser-sync
 *
 * Run:
 *      grunt
 *
 * This example will output a snippet into the console,
 * Paste it into the body of your website.
 */

module.exports = function (grunt) {

    grunt.initConfig({

        // BrowserSync Task
        browserSync: {
            default_options: {
                bsFiles: {
                    src: [
                        "css/*.css",
                        "*.html"
                    ]
                }
            }
        }

    });

    grunt.loadNpmTasks("grunt-browser-sync");

    grunt.registerTask("default", ["browserSync"]);
};