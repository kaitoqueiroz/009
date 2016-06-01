(function() {
    'use strict';

    angular
        .module('app.lazyload')
        .constant('APP_REQUIRES', {
          // jQuery based and standalone scripts
          scripts: {
            'modernizr':          ['vendor/modernizr/modernizr.custom.js'],
            'icons':              ['vendor/fontawesome/css/font-awesome.min.css',
                                   'vendor/simple-line-icons/css/simple-line-icons.css']
          },
          // Angular based script (use the right module name)
          modules: [
            {
              name: 'xeditable',
              files: [
                'vendor/angular-xeditable/dist/js/xeditable.min.js',
                'vendor/angular-xeditable/dist/css/xeditable.min.css'
              ]
            },{
              name: 'ngTable',
              files: [
                'vendor/ng-table/dist/ng-table.min.js',
                'vendor/ng-table/dist/ng-table.min.css'
              ]
            },{
              name: 'sweetalert',
              files: [
                'vendor/ngSweetAlert/SweetAlert.min.js',
                'vendor/sweetalert/dist/sweetalert.min.js',
                'vendor/sweetalert/dist/sweetalert.css'
              ]
            },{
              name: 'ngTagsInput',
              files: [
                'vendor/ng-tags-input/ng-tags-input.min.css',
                'vendor/ng-tags-input/ng-tags-input.bootstrap.min.css',
                'vendor/ng-tags-input/ng-tags-input.min.js'
              ]
            },{
              name: 'colorpicker',
              files: [
                'vendor/angular-bootstrap-colorpicker/js/bootstrap-colorpicker-module.min.js',
                'vendor/angular-bootstrap-colorpicker/css/colorpicker.min.css'
              ]
            },
          ]
        })
        ;

})();
