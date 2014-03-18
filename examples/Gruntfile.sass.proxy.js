/**
 *
 * Install:
 *      npm install grunt grunt-contrib-watch grunt-contrib-sass grunt-browser-sync
 *
 * Run:
 *      grunt
 *
 * This example will watch SCSS files & compile them.
 * BrowserSync will then inject the changes.
 */
module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        watch: {
            sass: {
                files: "app/scss/*.scss",
                tasks: "sass:dev"
            }
        },
        sass: {
            dev: {
                files: {
                    "app/css/styles.css": "app/scss/styles.scss"
                }
            }
        },
        browserSync: {
            default_options: {
                bsFiles: {
                    src: [
                        "css/*.css",
                        "*.html"
                    ]
                },
                options: {
                    watchTask: true,
                    proxy: "yourvhost.dev"
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-browser-sync');

    grunt.registerTask('default', ['browserSync', 'watch']);
};