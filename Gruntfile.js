'use strict';
module.exports = function (grunt) {
    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);
    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);
    // Configurable paths for the application
    var appConfig = {
        src:  'src',
        dist: 'build'
    };

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        config: appConfig,

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files:   [
                    '<%= config.src %>/{,*/}*.*',
                    'tests/{,*/}*.*'
                ]
            }
        },

        // The actual grunt server settings
        connect: {
            options:    {
                port:       9000,
                hostname:   'localhost',
                livereload: 35729
            },
            livereload: {
                options: {
                    open:       true,

                    middleware: function (connect) {
                        return [
                            connect.static(appConfig.src),
                            connect.static('vendor/'),
                            connect.static('tests/')
                        ];
                    }
                }
            },
            build: {
                options: {
                    open:       true,
                    keepalive:  true,
                    middleware: function (connect) {
                        return [
                            connect.static(appConfig.dist),
                        ];
                    }
                }
            }
        }

    });

    grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }
        grunt.task.run([
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve:' + target]);
    });


    grunt.registerTask('default', [
        'serve'
    ]);
};
