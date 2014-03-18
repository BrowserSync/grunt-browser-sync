/**
 *
 * First run:
 *
 *      npm install grunt grunt-browser-sync
 *
 * This example will wrap your existing vhost in a proxy URL
 * Use the proxy URL to view your site.
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
                proxy: "localphpsite.dev"
            }
        }

    });

    grunt.loadNpmTasks("grunt-browser-sync");

    // Launch BrowserSync + watch task
    grunt.registerTask("default", ["browserSync"]);
};