/**
 *
 * First run:
 *
 *      npm install grunt grunt-browser-sync
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

    // Launch BrowserSync + watch task
    grunt.registerTask("default", ["browserSync"]);
};