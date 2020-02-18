"use strict";
module.exports = function(grunt) {

    grunt.initConfig({
        watch: {
            html: {
                files: ['WebContent/**/*.html']
                // tasks: ['copy:main']
            }
        },
        // copy: {
        //     main: {
        //         files: [{
        //             cwd: 'WebContent/',
        //             src: ['WebContent/js/font-awesome/fonts/**'],
        //             dest: 'WebContent/dist/fonts',
        //             expand: true,
        //             flatten:true,
        //             options: {
        //                 processContent: false
        //             }
        //         }]
        //     }
        // },
        cssmin: {
            options: {
                mergeIntoShorthands: false,
                roundingPrecision: -1,
                keepSpecialComments: 0
            },
            app: {
                files: {
                    'WebContent/dist/style/concat.min.css': ['WebContent/css/bootstrap.min.css', 'WebContent/css/*.css']
                }
            }
        },
        uglify: {
            app: {
                files: {
                    'WebContent/dist/concat.js': ['WebContent/app.js', 'WebContent/*.js', 'WebContent/plugins/*.js', 'WebContent/controllers/*.js']
                }
            }
        },
        concat: {
            common: {
                src: ['WebContent/js/jquery-2.1.1.min.js', 'WebContent/js/bootstrap.min.js', 'WebContent/js/angular.min.js', 'WebContent/js/angular-route.min.js', 'WebContent/js/angular-resource.min.js', 'WebContent/js/angular-animate.min.js', 'WebContent/js/angular-messages.min.js', 'WebContent/js/angular-cookies.min.js', 'WebContent/js/angular-datepicker.js', 'WebContent/js/app.min.js', 'WebContent/js/common.js', 'WebContent/js/moment.js', 'WebContent/js/moment-with-locales.min.js', 'WebContent/js/ngDatepicker.js', 'WebContent/js/ui-bootstrap-tpls-0.13.0.min.js', 'WebContent/js/angular-ui-switch.min.js', 'WebContent/js/angularjs-dropdown-multiselect.min.js', 'WebContent/js/ng-img-crop.js', 'WebContent/js/select.js', 'WebContent/js/tree-grid-directive.js', 'WebContent/js/angular-bootstrap-calendar-tpls.js', 'WebContent/module/home/plugins/BarChart.min.js', 'WebContent/module/home/plugins/angular-chart.js', 'WebContent/module/home/plugins/chart.js', 'WebContent/js/pdfmake.min.js', 'WebContent/js/vfs_fonts.js', 'WebContent/js/ag-grid.min.js', 'WebContent/js/ui-grid.min.js', 'WebContent/js/ng-file-upload.min.js'],
                dest: 'WebContent/dist/concat-common.js'
            },
            app: {
                src: ['WebContent/app.js', 'WebContent/*.js', 'WebContent/plugins/*.js', 'WebContent/controllers/*.js'],
                dest: 'WebContent/dist/concat.js'
            }
        },
        connect: {
            server: {
                options: {
                    hostname: 'localhost',
                    port: 5050,
                    base: ['WebContent'],
                    livereload: true,
                    open: {
                        target: 'http://localhost:5050/'
                    }
                }
            }
        }
    });

    // grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('serve', '', function() {
        grunt.task.run(['connect:server', 'watch']);
    });

    grunt.registerTask('concatapp', 'concat app', ['cssmin:app', 'uglify:app', 'concat:common' /*,'copy:main'*/ ]);
}
