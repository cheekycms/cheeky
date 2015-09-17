'use strict';

module.exports = {
    
    // source file paths
    src: {
        
        // application less files
        less: 'src/cheeky-ui/content/**/index.less',

        // html content
        content: [
            'src/cheeky-ui/content/**/*.html',
        ],
        
        // fonts
        fonts: [
            'bower_components/bootstrap/dist/fonts/*'
        ],

        // images
        img: 'src/cheeky-ui/content/**/*.*(png|jpg|gif)',
        imgBasePath: 'src/cheeky-ui/content',

        // javascript files
        js: {

            vendor: [
                'bower_components/jquery/dist/jquery.js',
                'bower_components/angular/angular.js',
                'bower_components/angular-resource/angular-resource.js',
                'bower_components/angular-animate/angular-animate.js',
                'bower_components/angular-sanitize/angular-sanitize.js',
                'bower_components/angular-ui-router/release/angular-ui-router.js',
                'bower_components/bootstrap/dist/js/bootstrap.js',
                'bower_components/lodash/lodash.js'
            ],
            
            // application files are separate, because they get linted
            app: [
                'src/cheeky-ui/app/**/*.module.js',
                'src/cheeky-ui/app/**/*.js'
            ]
        },

        // angular templates
        templates: [
            'src/cheeky-ui/app/**/*.view.html',
            'src/cheeky-ui/app/**/*.directive.html'   
        ],
        templateModuleName: 'app.common'
    },

    // build paths
    build: {

        output: {
            content: 'public',
            fonts: 'public/fonts',
            js: 'public/js',
            css: 'public/css'
        }
        
    },
    
};