/**
 *
 * Install:
 *      npm install grunt grunt-browser-sync
 *
 * Run:
 *      grunt
 *
 * This example will serve HTML files from the `app` directory
 *
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
                },
                options: {
                    baseDir: "app"
                }
            }
        }

    });

    grunt.loadNpmTasks("grunt-browser-sync");

    grunt.registerTask("default", ["browserSync"]);
};