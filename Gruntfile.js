module.exports = function (grunt) {
    grunt.initConfig({
        bowercopy: {
            options: {
                srcPrefix: 'bower_components'
            },
            folders: {
                options: {
                    destPrefix: 'web/assets/vendor/',
                    runBower: false
                },
                files: {
                    'bootstrap/': 'bootstrap/dist',
                    'jquery/': 'jquery/dist',
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-bowercopy');
};