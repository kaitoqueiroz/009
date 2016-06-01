/*!
 * 
 * Angle - Bootstrap Admin App + AngularJS
 * 
 * Version: 3.3.1
 * Author: @themicon_co
 * Website: http://themicon.co
 * License: https://wrapbootstrap.com/help/licenses
 * 
 */

// APP START
// ----------------------------------- 

(function() {
    'use strict';

    angular
        .module('angle', [
            'app.core',
            'app.routes',
            'app.sidebar',
            'app.navsearch',
            'app.preloader',
            'app.loadingbar',
            'app.translate',
            'app.settings',
            'app.utils',
            'app.pages',
            'app.modulos',
            'app.perfis',
            'app.departamentos',
            'app.filiais',
            'app.funcionarios',
            'app.dashboard'
        ]);
})();


(function() {
    'use strict';

    angular
        .module('app.colors', []);
})();
(function() {
    'use strict';

    angular
        .module('app.core', [
            'ngRoute',
            'ngAnimate',
            'ngStorage',
            'ngCookies',
            'pascalprecht.translate',
            'ui.bootstrap',
            'ui.router',
            'oc.lazyLoad',
            'cfp.loadingBar',
            'ngSanitize',
            'ngResource',
            'ui.utils',
            'ui.checkbox'
        ]);
})();
(function() {
    'use strict';

    angular
        .module('app.lazyload', []);
})();
(function() {
    'use strict';

    angular
        .module('app.loadingbar', []);
})();
(function() {
    'use strict';

    angular
        .module('app.pages', []);
})();
(function() {
    'use strict';

    angular
        .module('app.navsearch', []);
})();
(function() {
    'use strict';

    angular
        .module('app.preloader', []);
})();


(function() {
    'use strict';

    angular
        .module('app.routes', [
            'app.lazyload'
        ]);
})();
(function() {
    'use strict';

    angular
        .module('app.settings', []);
})();
(function() {
    'use strict';

    angular
        .module('app.sidebar', []);
})();
(function() {
    'use strict';

    angular
        .module('app.translate', []);
})();
(function() {
    'use strict';

    angular
        .module('app.utils', [
          'app.colors'
          ]);
})();

(function() {
    'use strict';

    angular
        .module('app.colors')
        .constant('APP_COLORS', {
          'primary':                '#5d9cec',
          'success':                '#27c24c',
          'info':                   '#23b7e5',
          'warning':                '#ff902b',
          'danger':                 '#f05050',
          'inverse':                '#131e26',
          'green':                  '#37bc9b',
          'pink':                   '#f532e5',
          'purple':                 '#7266ba',
          'dark':                   '#3a3f51',
          'yellow':                 '#fad732',
          'gray-darker':            '#232735',
          'gray-dark':              '#3a3f51',
          'gray':                   '#dde6e9',
          'gray-light':             '#e4eaec',
          'gray-lighter':           '#edf1f2'
        })
        ;
})();
/**=========================================================
 * Module: colors.js
 * Services to retrieve global colors
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.colors')
        .service('Colors', Colors);

    Colors.$inject = ['APP_COLORS'];
    function Colors(APP_COLORS) {
        this.byName = byName;

        ////////////////

        function byName(name) {
          return (APP_COLORS[name] || '#fff');
        }
    }

})();

(function() {
    'use strict';

    angular
        .module('app.core')
        .config(coreConfig);

    coreConfig.$inject = ['$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$animateProvider'];
    function coreConfig($controllerProvider, $compileProvider, $filterProvider, $provide, $animateProvider){

      var core = angular.module('app.core');
      // registering components after bootstrap
      core.controller = $controllerProvider.register;
      core.directive  = $compileProvider.directive;
      core.filter     = $filterProvider.register;
      core.factory    = $provide.factory;
      core.service    = $provide.service;
      core.constant   = $provide.constant;
      core.value      = $provide.value;

      // Disables animation on items with class .ng-no-animation
      $animateProvider.classNameFilter(/^((?!(ng-no-animation)).)*$/);

    }

})();
/**=========================================================
 * Module: constants.js
 * Define constants to inject across the application
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.core')
        .constant('APP_MEDIAQUERY', {
          'desktopLG':             1200,
          'desktop':                992,
          'tablet':                 768,
          'mobile':                 480
        })
      ;

})();
(function() {
    'use strict';

    angular
        .module('app.core')
        .run(appRun);

    appRun.$inject = ['$rootScope', '$state', '$stateParams',  '$window', '$templateCache', 'Colors'];
    
    function appRun($rootScope, $state, $stateParams, $window, $templateCache, Colors) {
      
      // Set reference to access them from any scope
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
      $rootScope.$storage = $window.localStorage;

      // Uncomment this to disable template cache
      /*$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
          if (typeof(toState) !== 'undefined'){
            $templateCache.remove(toState.templateUrl);
          }
      });*/

      // Allows to use branding color with interpolation
      // {{ colorByName('primary') }}
      $rootScope.colorByName = Colors.byName;

      // cancel click event easily
      $rootScope.cancel = function($event) {
        $event.stopPropagation();
      };

      // Hooks Example
      // ----------------------------------- 

      // Hook not found
      $rootScope.$on('$stateNotFound',
        function(event, unfoundState/*, fromState, fromParams*/) {
            console.log(unfoundState.to); // "lazy.state"
            console.log(unfoundState.toParams); // {a:1, b:2}
            console.log(unfoundState.options); // {inherit:false} + default options
        });
      // Hook error
      $rootScope.$on('$stateChangeError',
        function(event, toState, toParams, fromState, fromParams, error){
          console.log(error);
        });
      // Hook success
      $rootScope.$on('$stateChangeSuccess',
        function(/*event, toState, toParams, fromState, fromParams*/) {
          // display new view from top
          $window.scrollTo(0, 0);
          // Save the route title
          $rootScope.currTitle = $state.current.title;
        });

      // Load a title dynamically
      $rootScope.currTitle = $state.current.title;
      $rootScope.pageTitle = function() {
        var title = $rootScope.app.name + ' - ' + ($rootScope.currTitle || $rootScope.app.description);
        document.title = title;
        return title;
      };      

    }

})();


(function() {
    'use strict';

    angular
        .module('app.lazyload')
        .config(lazyloadConfig);

    lazyloadConfig.$inject = ['$ocLazyLoadProvider', 'APP_REQUIRES'];
    function lazyloadConfig($ocLazyLoadProvider, APP_REQUIRES){

      // Lazy Load modules configuration
      $ocLazyLoadProvider.config({
        debug: false,
        events: true,
        modules: APP_REQUIRES.modules
      });

    }
})();
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

(function() {
    'use strict';

    angular
        .module('app.loadingbar')
        .config(loadingbarConfig)
        ;
    loadingbarConfig.$inject = ['cfpLoadingBarProvider'];
    function loadingbarConfig(cfpLoadingBarProvider){
      cfpLoadingBarProvider.includeBar = true;
      cfpLoadingBarProvider.includeSpinner = false;
      cfpLoadingBarProvider.latencyThreshold = 500;
      cfpLoadingBarProvider.parentSelector = '.wrapper > section';
    }
})();
(function() {
    'use strict';

    angular
        .module('app.loadingbar')
        .run(loadingbarRun)
        ;
    loadingbarRun.$inject = ['$rootScope', '$timeout', 'cfpLoadingBar'];
    function loadingbarRun($rootScope, $timeout, cfpLoadingBar){

      // Loading bar transition
      // ----------------------------------- 
      var thBar;
      $rootScope.$on('$stateChangeStart', function() {
          if($('.wrapper > section').length) // check if bar container exists
            thBar = $timeout(function() {
              cfpLoadingBar.start();
            }, 0); // sets a latency Threshold
      });
      $rootScope.$on('$stateChangeSuccess', function(event) {
          event.targetScope.$watch('$viewContentLoaded', function () {
            $timeout.cancel(thBar);
            cfpLoadingBar.complete();
          });
      });

    }

})();
/**=========================================================
 * Module: access-login.js
 * Demo for login api
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.pages')
        .controller('LoginFormController', LoginFormController);

    LoginFormController.$inject = ['$http', '$state'];
    function LoginFormController($http, $state) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
          // bind here all data from the form
          vm.account = {};
          // place the message if something goes wrong
          vm.authMsg = '';

          vm.login = function() {
            vm.authMsg = '';

            if(vm.loginForm.$valid) {
              $http
                .post('api/login', {username: vm.account.username, password: vm.account.password})
                .then(function(response) {
                  // assumes if ok, response is an object with some data, if not, a string with error
                  // customize according to your api
                  if ( !response.data ) {
                    vm.authMsg = 'Login incorreto.';
                  }else{
                    $state.go('app.singleview');
                  }
                }, function(response) {
                  console.log(response);
                  if(response.data.error == 401){
                    vm.authMsg = response.data.message;
                  }else{
                    vm.authMsg = 'Erro de conexão com o servidor.';
                  }
                });
            }
            else {
              // set as dirty if the user click directly to login so we show the validation messages
              /*jshint -W106*/
              vm.loginForm.account_email.$dirty = true;
              vm.loginForm.account_password.$dirty = true;
            }
          };

          vm.logout = function() {
            $http.get('sessions/logout').then(function(response) {
              $state.go('login');
            });
          }
        }
    }
})();

/**=========================================================
 * Module: navbar-search.js
 * Navbar search toggler * Auto dismiss on ESC key
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.navsearch')
        .directive('searchOpen', searchOpen)
        .directive('searchDismiss', searchDismiss);

    //
    // directives definition
    // 
    
    function searchOpen () {
        var directive = {
            controller: searchOpenController,
            restrict: 'A'
        };
        return directive;

    }

    function searchDismiss () {
        var directive = {
            controller: searchDismissController,
            restrict: 'A'
        };
        return directive;
        
    }

    //
    // Contrller definition
    // 
    
    searchOpenController.$inject = ['$scope', '$element', 'NavSearch'];
    function searchOpenController ($scope, $element, NavSearch) {
      $element
        .on('click', function (e) { e.stopPropagation(); })
        .on('click', NavSearch.toggle);
    }

    searchDismissController.$inject = ['$scope', '$element', 'NavSearch'];
    function searchDismissController ($scope, $element, NavSearch) {
      
      var inputSelector = '.navbar-form input[type="text"]';

      $(inputSelector)
        .on('click', function (e) { e.stopPropagation(); })
        .on('keyup', function(e) {
          if (e.keyCode === 27) // ESC
            NavSearch.dismiss();
        });
        
      // click anywhere closes the search
      $(document).on('click', NavSearch.dismiss);
      // dismissable options
      $element
        .on('click', function (e) { e.stopPropagation(); })
        .on('click', NavSearch.dismiss);
    }

})();


/**=========================================================
 * Module: nav-search.js
 * Services to share navbar search functions
 =========================================================*/
 
(function() {
    'use strict';

    angular
        .module('app.navsearch')
        .service('NavSearch', NavSearch);

    function NavSearch() {
        this.toggle = toggle;
        this.dismiss = dismiss;

        ////////////////

        var navbarFormSelector = 'form.navbar-form';

        function toggle() {
          var navbarForm = $(navbarFormSelector);

          navbarForm.toggleClass('open');
          
          var isOpen = navbarForm.hasClass('open');
          
          navbarForm.find('input')[isOpen ? 'focus' : 'blur']();
        }

        function dismiss() {
          $(navbarFormSelector)
            .removeClass('open') // Close control
            .find('input[type="text"]').blur() // remove focus
            .val('') // Empty input
            ;
        }        
    }
})();

(function() {
    'use strict';

    angular
        .module('app.preloader')
        .directive('preloader', preloader);

    preloader.$inject = ['$animate', '$timeout', '$q'];
    function preloader ($animate, $timeout, $q) {

        var directive = {
            restrict: 'EAC',
            template: 
              '<div class="preloader-progress">' +
                  '<div class="preloader-progress-bar" ' +
                       'ng-style="{width: loadCounter + \'%\'}"></div>' +
              '</div>'
            ,
            link: link
        };
        return directive;

        ///////

        function link(scope, el) {

          scope.loadCounter = 0;

          var counter  = 0,
              timeout;

          // disables scrollbar
          angular.element('body').css('overflow', 'hidden');
          // ensure class is present for styling
          el.addClass('preloader');

          appReady().then(endCounter);

          timeout = $timeout(startCounter);

          ///////

          function startCounter() {

            var remaining = 100 - counter;
            counter = counter + (0.015 * Math.pow(1 - Math.sqrt(remaining), 2));

            scope.loadCounter = parseInt(counter, 10);

            timeout = $timeout(startCounter, 20);
          }

          function endCounter() {

            $timeout.cancel(timeout);

            scope.loadCounter = 100;

            $timeout(function(){
              // animate preloader hiding
              $animate.addClass(el, 'preloader-hidden');
              // retore scrollbar
              angular.element('body').css('overflow', '');
            }, 300);
          }

          function appReady() {
            var deferred = $q.defer();
            var viewsLoaded = 0;
            // if this doesn't sync with the real app ready
            // a custom event must be used instead
            var off = scope.$on('$viewContentLoaded', function () {
              viewsLoaded ++;
              // we know there are at least two views to be loaded 
              // before the app is ready (1-index.html 2-app*.html)
              if ( viewsLoaded === 2) {
                // with resolve this fires only once
                $timeout(function(){
                  deferred.resolve();
                }, 3000);

                off();
              }

            });

            return deferred.promise;
          }

        } //link
    }

})();
/**=========================================================
 * Module: helpers.js
 * Provides helper functions for routes definition
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.routes')
        .provider('RouteHelpers', RouteHelpersProvider)
        ;

    RouteHelpersProvider.$inject = ['APP_REQUIRES'];
    function RouteHelpersProvider(APP_REQUIRES) {

      /* jshint validthis:true */
      return {
        // provider access level
        basepath: basepath,
        resolveFor: resolveFor,
        // controller access level
        $get: function() {
          return {
            basepath: basepath,
            resolveFor: resolveFor
          };
        }
      };

      // Set here the base of the relative path
      // for all app views
      function basepath(uri) {
        return 'app/views/' + uri;
      }

      // Generates a resolve object by passing script names
      // previously configured in constant.APP_REQUIRES
      function resolveFor() {
        var _args = arguments;
        return {
          deps: ['$ocLazyLoad','$q', function ($ocLL, $q) {
            // Creates a promise chain for each argument
            var promise = $q.when(1); // empty promise
            for(var i=0, len=_args.length; i < len; i ++){
              promise = andThen(_args[i]);
            }
            return promise;

            // creates promise to chain dynamically
            function andThen(_arg) {
              // also support a function that returns a promise
              if(typeof _arg === 'function')
                  return promise.then(_arg);
              else
                  return promise.then(function() {
                    // if is a module, pass the name. If not, pass the array
                    var whatToLoad = getRequired(_arg);
                    // simple error check
                    if(!whatToLoad) return $.error('Route resolve: Bad resource name [' + _arg + ']');
                    // finally, return a promise
                    return $ocLL.load( whatToLoad );
                  });
            }
            // check and returns required data
            // analyze module items with the form [name: '', files: []]
            // and also simple array of script files (for not angular js)
            function getRequired(name) {
              if (APP_REQUIRES.modules)
                  for(var m in APP_REQUIRES.modules)
                      if(APP_REQUIRES.modules[m].name && APP_REQUIRES.modules[m].name === name)
                          return APP_REQUIRES.modules[m];
              return APP_REQUIRES.scripts && APP_REQUIRES.scripts[name];
            }

          }]};
      } // resolveFor

    }


})();


/**=========================================================
 * Module: config.js
 * App routes and resources configuration
 =========================================================*/


(function() {
    'use strict';

    angular
        .module('app.routes')
        .config(routesConfig);

    routesConfig.$inject = ['$stateProvider', '$routeProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider'];
    function routesConfig($stateProvider, $routeProvider, $locationProvider, $urlRouterProvider, helper){
        // Set the following to true to enable the HTML5 Mode
        // You may have to set <base> tag in index and a routing configuration in your server
        $locationProvider.html5Mode(false);

        // defaults to dashboard
        $urlRouterProvider.otherwise('/login');

        // 
        // Application Routes
        // -----------------------------------   
        $stateProvider
            .state('login', {
                url: '/login',
                title: 'Login',
                controller: 'LoginFormController',
                templateUrl: 'app/pages/login.html'
            })
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: helper.basepath('app.html'),
                resolve: helper.resolveFor('modernizr', 'icons', 'xeditable', 'ngTable', 'sweetalert','ngTagsInput','colorpicker')
            })
            .state('app.singleview', {
                url: '/singleview',
                title: 'Single View',
                templateUrl: helper.basepath('singleview.html'),
                resolve: {
                    auth: ["auth", function(auth) {
                        return auth.isAuth();
                    }]
                }
            })
          // 
          // CUSTOM RESOLVES
          //   Add your own resolves properties
          //   following this object extend
          //   method
          // ----------------------------------- 
          // .state('app.someroute', {
          //   url: '/some_url',
          //   templateUrl: 'path_to_template.html',
          //   controller: 'someController',
          //   resolve: angular.extend(
          //     helper.resolveFor(), {
          //     // YOUR RESOLVES GO HERE
          //     }
          //   )
          // })
          ;

    } // routesConfig

})();


(function() {
    'use strict';

    angular
        .module('app.routes')
        .factory('auth', ['$http', '$state', function($http, $state) {
          var sdo = {
            isAuth: function() {
              var promise = $http({
                  method: 'GET', 
                  url: 'sessions' 
              });
              promise.success(function(data, status, headers, conf) {
                return data;
              });
              promise.error(function(data, status, headers, conf){
                $state.go('login');
              });
              return promise;
            }
          }
          return sdo;
        }]);
})();
(function() {
    'use strict';

    angular
        .module('app.settings')
        .run(settingsRun);

    settingsRun.$inject = ['$rootScope', '$localStorage'];

    function settingsRun($rootScope, $localStorage){

      // Global Settings
      // -----------------------------------
      $rootScope.app = {
        name: 'Angle',
        description: 'Angular Bootstrap Admin Template',
        year: ((new Date()).getFullYear()),
        layout: {
          isFixed: true,
          isCollapsed: false,
          isBoxed: false,
          isRTL: false,
          horizontal: false,
          isFloat: false,
          asideHover: false,
          theme: 'app/css/theme-e.css',
          asideScrollbar: false
        },
        useFullLayout: false,
        hiddenFooter: false,
        offsidebarOpen: false,
        asideToggled: false,
        viewAnimation: 'ng-fadeInUp'
      };

      // Setup the layout mode
      $rootScope.app.layout.horizontal = ( $rootScope.$stateParams.layout === 'app-h') ;

      // Restore layout settings [*** UNCOMMENT TO ENABLE ***]
      // if( angular.isDefined($localStorage.layout) )
      //   $rootScope.app.layout = $localStorage.layout;
      // else
      //   $localStorage.layout = $rootScope.app.layout;
      //
      // $rootScope.$watch('app.layout', function () {
      //   $localStorage.layout = $rootScope.app.layout;
      // }, true);

      // Close submenu when sidebar change from collapsed to normal
      $rootScope.$watch('app.layout.isCollapsed', function(newValue) {
        if( newValue === false )
          $rootScope.$broadcast('closeSidebarMenu');
      });

    }

})();

/**=========================================================
 * Module: sidebar-menu.js
 * Handle sidebar collapsible elements
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .controller('SidebarController', SidebarController);

    SidebarController.$inject = ['$rootScope', '$scope', '$state', 'SidebarLoader', 'Utils'];
    function SidebarController($rootScope, $scope, $state, SidebarLoader,  Utils) {

        activate();

        ////////////////

        function activate() {
          var collapseList = [];

          // demo: when switch from collapse to hover, close all items
          $rootScope.$watch('app.layout.asideHover', function(oldVal, newVal){
            if ( newVal === false && oldVal === true) {
              closeAllBut(-1);
            }
          });


          // Load menu from json file
          // ----------------------------------- 

          SidebarLoader.getMenu(sidebarReady);
          
          function sidebarReady(items) {
            $scope.menuItems = items;
          }

          // Handle sidebar and collapse items
          // ----------------------------------
          
          $scope.getMenuItemPropClasses = function(item) {
            return (item.heading ? 'nav-heading' : '') +
                   (isActive(item) ? ' active' : '') ;
          };

          $scope.addCollapse = function($index, item) {
            collapseList[$index] = $rootScope.app.layout.asideHover ? true : !isActive(item);
          };

          $scope.isCollapse = function($index) {
            return (collapseList[$index]);
          };

          $scope.toggleCollapse = function($index, isParentItem) {

            // collapsed sidebar doesn't toggle drodopwn
            if( Utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover ) return true;

            // make sure the item index exists
            if( angular.isDefined( collapseList[$index] ) ) {
              if ( ! $scope.lastEventFromChild ) {
                collapseList[$index] = !collapseList[$index];
                closeAllBut($index);
              }
            }
            else if ( isParentItem ) {
              closeAllBut(-1);
            }
            
            $scope.lastEventFromChild = isChild($index);

            return true;
          
          };

          // Controller helpers
          // ----------------------------------- 

            // Check item and children active state
            function isActive(item) {

              if(!item) return;

              if( !item.sref || item.sref === '#') {
                var foundActive = false;
                angular.forEach(item.submenu, function(value) {
                  if(isActive(value)) foundActive = true;
                });
                return foundActive;
              }
              else
                return $state.is(item.sref) || $state.includes(item.sref);
            }

            function closeAllBut(index) {
              index += '';
              for(var i in collapseList) {
                if(index < 0 || index.indexOf(i) < 0)
                  collapseList[i] = true;
              }
            }

            function isChild($index) {
              /*jshint -W018*/
              return (typeof $index === 'string') && !($index.indexOf('-') < 0);
            }
        
        } // activate
    }

})();

/**=========================================================
 * Module: sidebar.js
 * Wraps the sidebar and handles collapsed state
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .directive('sidebar', sidebar);

    sidebar.$inject = ['$rootScope', '$timeout', '$window', 'Utils'];
    function sidebar ($rootScope, $timeout, $window, Utils) {
        var $win = angular.element($window);
        var directive = {
            // bindToController: true,
            // controller: Controller,
            // controllerAs: 'vm',
            link: link,
            restrict: 'EA',
            template: '<nav class="sidebar" ng-transclude></nav>',
            transclude: true,
            replace: true
            // scope: {}
        };
        return directive;

        function link(scope, element, attrs) {

          var currentState = $rootScope.$state.current.name;
          var $sidebar = element;

          var eventName = Utils.isTouch() ? 'click' : 'mouseenter' ;
          var subNav = $();

          $sidebar.on( eventName, '.nav > li', function() {

            if( Utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover ) {

              subNav.trigger('mouseleave');
              subNav = toggleMenuItem( $(this), $sidebar);

              // Used to detect click and touch events outside the sidebar          
              sidebarAddBackdrop();

            }

          });

          scope.$on('closeSidebarMenu', function() {
            removeFloatingNav();
          });

          // Normalize state when resize to mobile
          $win.on('resize', function() {
            if( ! Utils.isMobile() )
          	asideToggleOff();
          });

          // Adjustment on route changes
          $rootScope.$on('$stateChangeStart', function(event, toState) {
            currentState = toState.name;
            // Hide sidebar automatically on mobile
            asideToggleOff();

            $rootScope.$broadcast('closeSidebarMenu');
          });

      	  // Autoclose when click outside the sidebar
          if ( angular.isDefined(attrs.sidebarAnyclickClose) ) {
            
            var wrapper = $('.wrapper');
            var sbclickEvent = 'click.sidebar';
            
            $rootScope.$watch('app.asideToggled', watchExternalClicks);

          }

          //////

          function watchExternalClicks(newVal) {
            // if sidebar becomes visible
            if ( newVal === true ) {
              $timeout(function(){ // render after current digest cycle
                wrapper.on(sbclickEvent, function(e){
                  // if not child of sidebar
                  if( ! $(e.target).parents('.aside').length ) {
                    asideToggleOff();
                  }
                });
              });
            }
            else {
              // dettach event
              wrapper.off(sbclickEvent);
            }
          }

          function asideToggleOff() {
            $rootScope.app.asideToggled = false;
            if(!scope.$$phase) scope.$apply(); // anti-pattern but sometimes necessary
      	  }
        }
        
        ///////

        function sidebarAddBackdrop() {
          var $backdrop = $('<div/>', { 'class': 'dropdown-backdrop'} );
          $backdrop.insertAfter('.aside-inner').on('click mouseenter', function () {
            removeFloatingNav();
          });
        }

        // Open the collapse sidebar submenu items when on touch devices 
        // - desktop only opens on hover
        function toggleTouchItem($element){
          $element
            .siblings('li')
            .removeClass('open')
            .end()
            .toggleClass('open');
        }

        // Handles hover to open items under collapsed menu
        // ----------------------------------- 
        function toggleMenuItem($listItem, $sidebar) {

          removeFloatingNav();

          var ul = $listItem.children('ul');
          
          if( !ul.length ) return $();
          if( $listItem.hasClass('open') ) {
            toggleTouchItem($listItem);
            return $();
          }

          var $aside = $('.aside');
          var $asideInner = $('.aside-inner'); // for top offset calculation
          // float aside uses extra padding on aside
          var mar = parseInt( $asideInner.css('padding-top'), 0) + parseInt( $aside.css('padding-top'), 0);
          var subNav = ul.clone().appendTo( $aside );
          
          toggleTouchItem($listItem);

          var itemTop = ($listItem.position().top + mar) - $sidebar.scrollTop();
          var vwHeight = $win.height();

          subNav
            .addClass('nav-floating')
            .css({
              position: $rootScope.app.layout.isFixed ? 'fixed' : 'absolute',
              top:      itemTop,
              bottom:   (subNav.outerHeight(true) + itemTop > vwHeight) ? 0 : 'auto'
            });

          subNav.on('mouseleave', function() {
            toggleTouchItem($listItem);
            subNav.remove();
          });

          return subNav;
        }

        function removeFloatingNav() {
          $('.dropdown-backdrop').remove();
          $('.sidebar-subnav.nav-floating').remove();
          $('.sidebar li.open').removeClass('open');
        }
    }


})();


(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .service('SidebarLoader', SidebarLoader);

    SidebarLoader.$inject = ['$http'];
    function SidebarLoader($http) {
        this.getMenu = getMenu;

        ////////////////

        function getMenu(onReady, onError) {
          var menuJson = 'server/sidebar-menu.json',
              menuURL  = menuJson + '?v=' + (new Date().getTime()); // jumps cache
            
          onError = onError || function() { alert('Failure loading menu'); };

          $http
            .get(menuURL)
            .success(onReady)
            .error(onError);
        }
    }
})();
(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .controller('UserBlockController', UserBlockController);

    UserBlockController.$inject = ['$rootScope', '$scope'];
    function UserBlockController($rootScope, $scope) {

        activate();

        ////////////////

        function activate() {
          $rootScope.user = {
            name:     'John',
            job:      'ng-developer',
            picture:  'app/img/user/02.jpg'
          };

          // Hides/show user avatar on sidebar
          $rootScope.toggleUserBlock = function(){
            $rootScope.$broadcast('toggleUserBlock');
          };

          $rootScope.userBlockVisible = true;

          var detach = $rootScope.$on('toggleUserBlock', function(/*event, args*/) {

            $rootScope.userBlockVisible = ! $rootScope.userBlockVisible;

          });

          $scope.$on('$destroy', detach);
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('app.translate')
        .config(translateConfig)
        ;
    translateConfig.$inject = ['$translateProvider'];
    function translateConfig($translateProvider){

      $translateProvider.useStaticFilesLoader({
          prefix : 'app/i18n/',
          suffix : '.json'
      });

      $translateProvider.preferredLanguage('pt_BR');
      $translateProvider.useLocalStorage();
      $translateProvider.usePostCompiling(true);
      $translateProvider.useSanitizeValueStrategy('sanitizeParameters');

    }
})();
(function() {
    'use strict';

    angular
        .module('app.translate')
        .run(translateRun)
        ;
    translateRun.$inject = ['$rootScope', '$translate'];
    
    function translateRun($rootScope, $translate){

      // Internationalization
      // ----------------------

      $rootScope.language = {
        // Handles language dropdown
        listIsOpen: false,
        // list of available languages
        available: {
          'en':       'English',
          'es_AR':    'Español',
          'pt_BR':    'Portugues Brasileiro'
        },
        // display always the current ui language
        init: function () {
          var proposedLanguage = $translate.proposedLanguage() || $translate.use();
          var preferredLanguage = $translate.preferredLanguage(); // we know we have set a preferred one in app.config
          $rootScope.language.selected = $rootScope.language.available[ (proposedLanguage || preferredLanguage) ];
        },
        set: function (localeId) {
          // Set the new idiom
          $translate.use(localeId);
          // save a reference for the current language
          $rootScope.language.selected = $rootScope.language.available[localeId];
          // finally toggle dropdown
          $rootScope.language.listIsOpen = ! $rootScope.language.listIsOpen;
        }
      };

      $rootScope.language.init();

    }
})();
/**=========================================================
 * Module: animate-enabled.js
 * Enable or disables ngAnimate for element with directive
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('animateEnabled', animateEnabled);

    animateEnabled.$inject = ['$animate'];
    function animateEnabled ($animate) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
          scope.$watch(function () {
            return scope.$eval(attrs.animateEnabled, scope);
          }, function (newValue) {
            $animate.enabled(!!newValue, element);
          });
        }
    }

})();

/**=========================================================
 * Module: browser.js
 * Browser detection
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .service('Browser', Browser);

    Browser.$inject = ['$window'];
    function Browser($window) {
      return $window.jQBrowser;
    }

})();

/**=========================================================
 * Module: clear-storage.js
 * Removes a key from the browser storage via element click
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('resetKey', resetKey);

    resetKey.$inject = ['$state', '$localStorage'];
    function resetKey ($state, $localStorage) {
        var directive = {
            link: link,
            restrict: 'A',
            scope: {
              resetKey: '@'
            }
        };
        return directive;

        function link(scope, element) {
          element.on('click', function (e) {
              e.preventDefault();

              if(scope.resetKey) {
                delete $localStorage[scope.resetKey];
                $state.go($state.current, {}, {reload: true});
              }
              else {
                $.error('No storage key specified for reset.');
              }
          });
        }
    }

})();

/**=========================================================
 * Module: fullscreen.js
 * Toggle the fullscreen mode on/off
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('toggleFullscreen', toggleFullscreen);

    toggleFullscreen.$inject = ['Browser'];
    function toggleFullscreen (Browser) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element) {
          // Not supported under IE
          if( Browser.msie ) {
            element.addClass('hide');
          }
          else {
            element.on('click', function (e) {
                e.preventDefault();

                if (screenfull.enabled) {
                  
                  screenfull.toggle();
                  
                  // Switch icon indicator
                  if(screenfull.isFullscreen)
                    $(this).children('em').removeClass('fa-expand').addClass('fa-compress');
                  else
                    $(this).children('em').removeClass('fa-compress').addClass('fa-expand');

                } else {
                  $.error('Fullscreen not enabled');
                }

            });
          }
        }
    }


})();

/**=========================================================
 * Module: load-css.js
 * Request and load into the current page a css file
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('loadCss', loadCss);

    function loadCss () {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
          element.on('click', function (e) {
              if(element.is('a')) e.preventDefault();
              var uri = attrs.loadCss,
                  link;

              if(uri) {
                link = createLink(uri);
                if ( !link ) {
                  $.error('Error creating stylesheet link element.');
                }
              }
              else {
                $.error('No stylesheet location defined.');
              }

          });
        }
        
        function createLink(uri) {
          var linkId = 'autoloaded-stylesheet',
              oldLink = $('#'+linkId).attr('id', linkId + '-old');

          $('head').append($('<link/>').attr({
            'id':   linkId,
            'rel':  'stylesheet',
            'href': uri
          }));

          if( oldLink.length ) {
            oldLink.remove();
          }

          return $('#'+linkId);
        }
    }

})();

/**=========================================================
 * Module: now.js
 * Provides a simple way to display the current time formatted
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('now', now);

    now.$inject = ['dateFilter', '$interval'];
    function now (dateFilter, $interval) {
        var directive = {
            link: link,
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {
          var format = attrs.format;

          function updateTime() {
            var dt = dateFilter(new Date(), format);
            element.text(dt);
          }

          updateTime();
          var intervalPromise = $interval(updateTime, 1000);

          scope.$on('$destroy', function(){
            $interval.cancel(intervalPromise);
          });

        }
    }

})();

/**=========================================================
 * Module: table-checkall.js
 * Tables check all checkbox
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('checkAll', checkAll);

    function checkAll () {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element) {
          element.on('change', function() {
            var $this = $(this),
                index= $this.index() + 1,
                checkbox = $this.find('input[type="checkbox"]'),
                table = $this.parents('table');
            // Make sure to affect only the correct checkbox column
            table.find('tbody > tr > td:nth-child('+index+') input[type="checkbox"]')
              .prop('checked', checkbox[0].checked);

          });
        }
    }

})();

/**=========================================================
 * Module: trigger-resize.js
 * Triggers a window resize event from any element
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('triggerResize', triggerResize);

    triggerResize.$inject = ['$window', '$timeout'];
    function triggerResize ($window, $timeout) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attributes) {
          element.on('click', function(){
            $timeout(function(){
              // all IE friendly dispatchEvent
              var evt = document.createEvent('UIEvents');
              evt.initUIEvent('resize', true, false, $window, 0);
              $window.dispatchEvent(evt);
              // modern dispatchEvent way
              // $window.dispatchEvent(new Event('resize'));
            }, attributes.triggerResize || 300);
          });
        }
    }

})();

/**=========================================================
 * Module: utils.js
 * Utility library to use across the theme
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .service('Utils', Utils);

    Utils.$inject = ['$window', 'APP_MEDIAQUERY'];
    function Utils($window, APP_MEDIAQUERY) {

        var $html = angular.element('html'),
            $win  = angular.element($window),
            $body = angular.element('body');

        return {
          // DETECTION
          support: {
            transition: (function() {
                    var transitionEnd = (function() {

                        var element = document.body || document.documentElement,
                            transEndEventNames = {
                                WebkitTransition: 'webkitTransitionEnd',
                                MozTransition: 'transitionend',
                                OTransition: 'oTransitionEnd otransitionend',
                                transition: 'transitionend'
                            }, name;

                        for (name in transEndEventNames) {
                            if (element.style[name] !== undefined) return transEndEventNames[name];
                        }
                    }());

                    return transitionEnd && { end: transitionEnd };
                })(),
            animation: (function() {

                var animationEnd = (function() {

                    var element = document.body || document.documentElement,
                        animEndEventNames = {
                            WebkitAnimation: 'webkitAnimationEnd',
                            MozAnimation: 'animationend',
                            OAnimation: 'oAnimationEnd oanimationend',
                            animation: 'animationend'
                        }, name;

                    for (name in animEndEventNames) {
                        if (element.style[name] !== undefined) return animEndEventNames[name];
                    }
                }());

                return animationEnd && { end: animationEnd };
            })(),
            requestAnimationFrame: window.requestAnimationFrame ||
                                   window.webkitRequestAnimationFrame ||
                                   window.mozRequestAnimationFrame ||
                                   window.msRequestAnimationFrame ||
                                   window.oRequestAnimationFrame ||
                                   function(callback){ window.setTimeout(callback, 1000/60); },
            /*jshint -W069*/
            touch: (
                ('ontouchstart' in window && navigator.userAgent.toLowerCase().match(/mobile|tablet/)) ||
                (window.DocumentTouch && document instanceof window.DocumentTouch)  ||
                (window.navigator['msPointerEnabled'] && window.navigator['msMaxTouchPoints'] > 0) || //IE 10
                (window.navigator['pointerEnabled'] && window.navigator['maxTouchPoints'] > 0) || //IE >=11
                false
            ),
            mutationobserver: (window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver || null)
          },
          // UTILITIES
          isInView: function(element, options) {
              /*jshint -W106*/
              var $element = $(element);

              if (!$element.is(':visible')) {
                  return false;
              }

              var window_left = $win.scrollLeft(),
                  window_top  = $win.scrollTop(),
                  offset      = $element.offset(),
                  left        = offset.left,
                  top         = offset.top;

              options = $.extend({topoffset:0, leftoffset:0}, options);

              if (top + $element.height() >= window_top && top - options.topoffset <= window_top + $win.height() &&
                  left + $element.width() >= window_left && left - options.leftoffset <= window_left + $win.width()) {
                return true;
              } else {
                return false;
              }
          },
          
          langdirection: $html.attr('dir') === 'rtl' ? 'right' : 'left',

          isTouch: function () {
            return $html.hasClass('touch');
          },

          isSidebarCollapsed: function () {
            return $body.hasClass('aside-collapsed');
          },

          isSidebarToggled: function () {
            return $body.hasClass('aside-toggled');
          },

          isMobile: function () {
            return $win.width() < APP_MEDIAQUERY.tablet;
          }

        };
    }
})();

(function() {
    'use strict';

    angular
        .module('custom', [
            // request the the entire framework
            'angle',
            // or just modules
            'app.core',
            'app.sidebar'
            /*...*/
        ]);
})();
(function() {
    'use strict';

    angular
        .module('app.dashboard', [
            // request the the entire framework
            'angle',
            // or just modules
            'app.routes',
            'app.core',
            'app.sidebar'
        ])
        .config(routesConfig);

        routesConfig.$inject = ['$stateProvider', 'RouteHelpersProvider'];

        function routesConfig($stateProvider, helper){
            $stateProvider
            .state('app.dashboard', {
                url: '/dashboard',
                templateUrl: helper.basepath('pages/dashboard/index.html'),
                resolve: {
                    auth: ["auth", function(auth) {
                        return auth.isAuth();
                    }]
                }
            })
    }
})();
(function() {
    'use strict';

    angular
        .module('app.departamentos', [
            // request the the entire framework
            'angle',
            // or just modules
            'app.routes',
            'app.core',
            'app.sidebar'
            /*...*/
        ])
        .config(routesConfig);

        routesConfig.$inject = ['$stateProvider', 'RouteHelpersProvider'];

        function routesConfig($stateProvider, helper){
            $stateProvider
            .state('app.departamentos', {
                url: '/departamentos/list',
                templateUrl: helper.basepath('pages/departamentos/list.html'),
                resolve: {
                    auth: ["auth", function(auth) {
                        return auth.isAuth();
                    }]
                }
            })
            .state('app.departamentos_create', {
                url: '/departamentos/create',
                controller: 'departamentoFormController',
                templateUrl: helper.basepath('pages/departamentos/form.html'),
                resolve: {
                    auth: ["auth", function(auth) {
                        return auth.isAuth();
                    }]
                }
            })
            .state('app.departamentos_edit', {
                url: '/departamentos/edit/:id',
                controller: 'departamentoFormController',
                templateUrl: helper.basepath('pages/departamentos/form.html'),
                resolve: {
                    auth: ["auth", function(auth) {
                        return auth.isAuth();
                    }]
                }
            })
    }
})();
(function() {
    'use strict';

    angular
        .module('app.filiais', [
            // request the the entire framework
            'angle',
            // or just modules
            'app.routes',
            'app.core',
            'app.sidebar'
            /*...*/
        ])
        .config(routesConfig);

        routesConfig.$inject = ['$stateProvider', 'RouteHelpersProvider'];

        function routesConfig($stateProvider, helper){
            $stateProvider
            .state('app.filiais', {
                url: '/filiais/list',
                templateUrl: helper.basepath('pages/filiais/list.html'),
                resolve: {
                    auth: ["auth", function(auth) {
                        return auth.isAuth();
                    }]
                }
            })
            .state('app.filiais_create', {
                url: '/filiais/create',
                controller: 'filialFormController',
                templateUrl: helper.basepath('pages/filiais/form.html'),
                resolve: {
                    auth: ["auth", function(auth) {
                        return auth.isAuth();
                    }]
                }
            })
            .state('app.filiais_edit', {
                url: '/filiais/edit/:id',
                controller: 'filialFormController',
                templateUrl: helper.basepath('pages/filiais/form.html'),
                resolve: {
                    auth: ["auth", function(auth) {
                        return auth.isAuth();
                    }]
                }
            })
    }
})();
(function() {
    'use strict';

    angular
        .module('app.funcionarios', [
            // request the the entire framework
            'angle',
            // or just modules
            'app.routes',
            'app.core',
            'app.sidebar'
            /*...*/
        ])
        .config(routesConfig);

        routesConfig.$inject = ['$stateProvider', 'RouteHelpersProvider'];

        function routesConfig($stateProvider, helper){
            $stateProvider
            .state('app.funcionarios', {
                url: '/funcionarios/list',
                templateUrl: helper.basepath('pages/funcionarios/list.html'),
                resolve: {
                    auth: ["auth", function(auth) {
                        return auth.isAuth();
                    }]
                }
            })
            .state('app.funcionarios_create', {
                url: '/funcionarios/create',
                controller: 'funcionarioFormController',
                templateUrl: helper.basepath('pages/funcionarios/form.html'),
                resolve: {
                    auth: ["auth", function(auth) {
                        return auth.isAuth();
                    }]
                }
            })
            .state('app.funcionarios_edit', {
                url: '/funcionarios/edit/:id',
                controller: 'funcionarioFormController',
                templateUrl: helper.basepath('pages/funcionarios/form.html'),
                resolve: {
                    auth: ["auth", function(auth) {
                        return auth.isAuth();
                    }]
                }
            })
    }
})();
(function() {
    'use strict';

    angular
        .module('app.modulos', [
            // request the the entire framework
            'angle',
            // or just modules
            'app.routes',
            'app.core',
            'app.sidebar'
            /*...*/
        ])
        .config(routesConfig);

        routesConfig.$inject = ['$stateProvider', 'RouteHelpersProvider'];

        function routesConfig($stateProvider, helper){
            $stateProvider
            .state('app.modulos', {
                url: '/modulos/list',
                templateUrl: helper.basepath('pages/modulos/list.html'),
                resolve: {
                    auth: ["auth", function(auth) {
                        return auth.isAuth();
                    }]
                }
            })
            .state('app.modulos_create', {
                url: '/modulos/create',
                controller: 'moduloFormController',
                templateUrl: helper.basepath('pages/modulos/form.html'),
                resolve: {
                    auth: ["auth", function(auth) {
                        return auth.isAuth();
                    }]
                }
            })
            .state('app.modulos_edit', {
                url: '/modulos/edit/:id',
                controller: 'moduloFormController',
                templateUrl: helper.basepath('pages/modulos/form.html'),
                resolve: {
                    auth: ["auth", function(auth) {
                        return auth.isAuth();
                    }]
                }
            })
    }
})();
(function() {
    'use strict';

    angular
        .module('app.perfis', [
            // request the the entire framework
            'angle',
            // or just modules
            'app.routes',
            'app.core',
            'app.sidebar'
            /*...*/
        ])
        .config(routesConfig);

        routesConfig.$inject = ['$stateProvider', 'RouteHelpersProvider'];

        function routesConfig($stateProvider, helper){
            $stateProvider
            .state('app.perfis', {
                url: '/perfis/list',
                templateUrl: helper.basepath('pages/perfis/list.html'),
                resolve: {
                    auth: ["auth", function(auth) {
                        return auth.isAuth();
                    }]
                }
            })
            .state('app.perfis_create', {
                url: '/perfis/create',
                controller: 'perfilFormController',
                templateUrl: helper.basepath('pages/perfis/form.html'),
                resolve: {
                    auth: ["auth", function(auth) {
                        return auth.isAuth();
                    }]
                }
            })
            .state('app.perfis_edit', {
                url: '/perfis/edit/:id',
                controller: 'perfilFormController',
                templateUrl: helper.basepath('pages/perfis/form.html'),
                resolve: {
                    auth: ["auth", function(auth) {
                        return auth.isAuth();
                    }]
                }
            })
    }
})();

// To run this code, edit file index.html or index.jade and change
// html data-ng-app attribute from angle to myAppName
// ----------------------------------------------------------------------

(function() {
    'use strict';

    angular
        .module('custom')
        .controller('singleviewController', Controller);

    Controller.$inject = ['$log','$scope', 'auth'];
    function Controller($log,$scope,auth) {
        $scope.auth = auth.data; 
        // for controllerAs syntax
        // var vm = this;

        setTimeout(activate, 3000);

        function activate() {
          $log.log('I\'m a line from custom.js');
        }
    }
})();


// To run this code, edit file index.html or index.jade and change
// html data-ng-app attribute from angle to myAppName
// ----------------------------------------------------------------------

(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('dashboardController', Controller);

    Controller.$inject = ['$filter', 'ngTableParams', 'dashboardService','filialService', 'SweetAlert'];
    function Controller($filter, ngTableParams, dashboardService, filialService, SweetAlert) {
        var vm = this;

        vm.loadFiliais = function($query){
            return filialService.paginate(1,$query)
                .then(function (result) {
                    return result.data.data.data;
                });
        }
        vm.loadItens = function($query){
            return filialService.paginate(1,$query)
                .then(function (result) {
                    return result.data.data.data;
                });
        }
        vm.loadReferencias = function($query){
            return filialService.paginate(1,$query)
                .then(function (result) {
                    return result.data.data.data;
                });
        }
        vm.loadGrupos = function($query){
            return filialService.paginate(1,$query)
                .then(function (result) {
                    return result.data.data.data;
                });
        }
        vm.loadSubgrupos = function($query){
            return filialService.paginate(1,$query)
                .then(function (result) {
                    return result.data.data.data;
                });
        }
        vm.loadPrefixos = function($query){
            return filialService.paginate(1,$query)
                .then(function (result) {
                    return result.data.data.data;
                });
        }
        vm.loadClientes = function($query){
            return filialService.paginate(1,$query)
                .then(function (result) {
                    return result.data.data.data;
                });
        }
        vm.loadVendedores = function($query){
            return filialService.paginate(1,$query)
                .then(function (result) {
                    return result.data.data.data;
                });
        }
        vm.loadAtividades = function($query){
            return filialService.paginate(1,$query)
                .then(function (result) {
                    return result.data.data.data;
                });
        }
        vm.loadFornecedores = function($query){
            return filialService.paginate(1,$query)
                .then(function (result) {
                    return result.data.data.data;
                });
        }
        vm.loadAplicadores = function($query){
            return filialService.paginate(1,$query)
                .then(function (result) {
                    return result.data.data.data;
                });
        }
        vm.loadCidades = function($query){
            return filialService.paginate(1,$query)
                .then(function (result) {
                    return result.data.data.data;
                });
        }
        vm.loadEstados = function($query){
            return filialService.paginate(1,$query)
                .then(function (result) {
                    return result.data.data.data;
                });
        }
        vm.loadRiscos = function($query){
            return filialService.paginate(1,$query)
                .then(function (result) {
                    return result.data.data.data;
                });
        }
        vm.loadTabelas = function($query){
            return filialService.paginate(1,$query)
                .then(function (result) {
                    return result.data.data.data;
                });
        }

        vm.toggleFilters = function(){
            $("#filters").slideToggle();
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .service('dashboardService', ['$http','$q', function ($http,$q) {

            var urlBase = 'api/dashboard';

            
        }]);
})();


// To run this code, edit file index.html or index.jade and change
// html data-ng-app attribute from angle to myAppName
// ----------------------------------------------------------------------

(function() {
    'use strict';

    angular
        .module('app.departamentos')
        .controller('departamentoController', Controller);

    Controller.$inject = ['$filter', 'ngTableParams', 'departamentoService', 'SweetAlert'];
    function Controller($filter, ngTableParams, departamentoService, SweetAlert) {
        var vm = this;
        var sweetAlertConfig = {
               //text: "Your will not be able to recover this imaginary file!",
               type: "warning",
               showCancelButton: true,
               confirmButtonColor: "#DD6B55",
               confirmButtonText: "Sim",
               cancelButtonText: "Não",
               closeOnConfirm: false,
               closeOnCancel: false };
        vm.pesquisa = '';

        vm.tableParams = new ngTableParams([
                {
                    page: 1, 
                    count: 15
                }],
            {
                counts: [],
                getData: function ($defer, params) {
                    var filter = params.filter();
                    var sorting = params.sorting();
                    var count = params.count();
                    var page = params.page();

                    departamentoService.paginate(page,vm.pesquisa)
                        .then(function (result) {
                            vm.tableParams.total(result.data.data.total/result.data.data.per_page);
                            $defer.resolve(result.data.data.data);
                        });
                }
            }
        );

        vm.search = function(){
            vm.tableParams.page(1);
            vm.tableParams.reload();
        }

        vm.delete = function(obj){
            sweetAlertConfig.title = "Tem certeja que deseja excluir este departamento?";

            SweetAlert.swal(sweetAlertConfig, function(isConfirm){
                if (isConfirm) {
                    departamentoService.delete(obj.id).then(function(){
                        vm.tableParams.reload();
                        SweetAlert.swal("excluído!", "Departamento excluído com sucesso.", "success");
                    }, function(){
                        SweetAlert.swal("ERRO!", "Ocorreu um problema ao excluir", "error");
                    });
                } else {
                    SweetAlert.swal("Cancelado", "O departamento não foi excluído", "error");
                }
            });
        }
        vm.updateAtivo = function(obj){
            var acao = '';
            if(!obj.ativo){
                acao = 'des';
            }
            sweetAlertConfig.title = "Tem certeja que deseja "+acao+"ativar este departamento?";

            SweetAlert.swal(sweetAlertConfig, function(isConfirm){
                if (isConfirm) {
                    departamentoService.update(obj).then(function(){
                        SweetAlert.swal(""+acao+"ativado!", "Departamento "+acao+"ativado com sucesso.", "success");
                    }, function(){
                        SweetAlert.swal("ERRO!", "Ocorreu um problema ao atualizar", "error");
                        obj.ativo = !obj.ativo;
                    });
                } else {
                    SweetAlert.swal("Cancelado", "O departamento não foi "+acao+"ativado", "error");
                    obj.ativo = !obj.ativo;
                }
            });
        }
    }
})();


// To run this code, edit file index.html or index.jade and change
// html data-ng-app attribute from angle to myAppName
// ----------------------------------------------------------------------

(function() {
    'use strict';

    angular
        .module('app.departamentos')
        .controller('departamentoFormController', Controller);

    Controller.$inject = ['$scope', '$state', '$stateParams', 'departamentoService','SweetAlert'];
    function Controller($scope, $state, $stateParams, departamentoService, SweetAlert) {
        if (!$stateParams.id) {
            $scope.descricao = null;
        }else{
            departamentoService.get($stateParams.id).then(function(result){
                $scope.id = result.data.data.data.id;
                $scope.descricao = result.data.data.data.descricao;
            }),
            function(){
                SweetAlert.swal("ERRO!", "Ocorreu um problema ao consultar dados", "error");
            };
        }

        $scope.submit = function(){
            if(!$scope.descricao){
                SweetAlert.swal("ERRO!", "Preencha o campo 'Descrição do Departamento'", "error");
                angular.element('#descricao').trigger('focus');
                return;
            }
            var obj = {
                id: $scope.id,
                descricao: $scope.descricao
            }
                
            if($stateParams.id){
                var request = departamentoService.update(obj);
                var title = "Editado!";
            }else{
                var request = departamentoService.insert(obj);
                var title = "Cadastrado!";
            }
            request.then(function(){
                SweetAlert.swal({
                   title: title,
                   type: "success",
                   showCancelButton: false,
                   confirmButtonText: "OK",
                   closeOnConfirm: true},
                function(isConfirm){ 
                    if (isConfirm) {
                        $state.go('app.departamentos');
                    }
                });
            }, function(){
                SweetAlert.swal("ERRO!", "Ocorreu um problema ao cadastrar", "error");
            });
        }

        $scope.cancelar = function(){
            SweetAlert.swal({
               title: "Deseja descartar todas as alterações?",
               type: "warning",
               showCancelButton: true,
               cancelButtonText: "Não",
               confirmButtonColor: "#DD6B55",
               confirmButtonText: "Sim",
               closeOnConfirm: true}, 
            function(onConfirm){ 
                if(onConfirm){
                    $state.go('app.departamentos');
                }
            });
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('app.departamentos')
        .service('departamentoService', ['$http','$q', function ($http,$q) {

            var urlBase = 'api/departamentos';

            this.getAll = function () {
                return $q(function(resolve, reject) {
                    resolve($http.get(urlBase));
                });
            };
            
            this.paginate = function (page,search) {

                return $q(function(resolve, reject) {
                    if(search){
                        resolve($http.get(urlBase + '?page=' + page +'&search=descricao:' + search));
                    }
                    resolve($http.get(urlBase + '?page=' + page));
                });
            };

            this.search = function (query) {
                return $q(function(resolve, reject) {
                    resolve($http.get(urlBase + '?search=' + query));
                });
            };

            this.get = function (id) {
                return $q(function(resolve, reject) {
                    resolve($http.get(urlBase + '/' + id));
                });
            };

            this.insert = function (cust) {
                return $q(function(resolve, reject) {
                    resolve($http.post(urlBase, cust));
                });
            };

            this.update = function (cust) {
                return $q(function(resolve, reject) {
                    resolve($http.put(urlBase + '/' + cust.id, cust));
                });
            };

            this.delete = function (id) {
                return $q(function(resolve, reject) {
                    resolve($http.delete(urlBase + '/' + id));
                });
            };
        }]);
})();


// To run this code, edit file index.html or index.jade and change
// html data-ng-app attribute from angle to myAppName
// ----------------------------------------------------------------------

(function() {
    'use strict';

    angular
        .module('app.filiais')
        .controller('filialController', Controller);

    Controller.$inject = ['$filter', 'ngTableParams', 'filialService', 'SweetAlert'];
    function Controller($filter, ngTableParams, filialService, SweetAlert) {
        var vm = this;
        var sweetAlertConfig = {
               //text: "Your will not be able to recover this imaginary file!",
               type: "warning",
               showCancelButton: true,
               confirmButtonColor: "#DD6B55",
               confirmButtonText: "Sim",
               cancelButtonText: "Não",
               closeOnConfirm: false,
               closeOnCancel: false };
        vm.pesquisa = '';

        vm.tableParams = new ngTableParams([
                {
                    page: 1, 
                    count: 15
                }],
            {
                counts: [],
                getData: function ($defer, params) {
                    var filter = params.filter();
                    var sorting = params.sorting();
                    var count = params.count();
                    var page = params.page();

                    filialService.paginate(page,vm.pesquisa)
                        .then(function (result) {
                            vm.tableParams.total(result.data.data.total/result.data.data.per_page);
                            $defer.resolve(result.data.data.data);
                        });
                }
            }
        );

        vm.search = function(){
            vm.tableParams.page(1);
            vm.tableParams.reload();
        }

        vm.delete = function(obj){
            sweetAlertConfig.title = "Tem certeja que deseja excluir este filial?";

            SweetAlert.swal(sweetAlertConfig, function(isConfirm){
                if (isConfirm) {
                    filialService.delete(obj.id).then(function(){
                        vm.tableParams.reload();
                        SweetAlert.swal("excluído!", "Filial excluído com sucesso.", "success");
                    }, function(){
                        SweetAlert.swal("ERRO!", "Ocorreu um problema ao excluir", "error");
                    });
                } else {
                    SweetAlert.swal("Cancelado", "O filial não foi excluído", "error");
                }
            });
        }
        vm.updateAtivo = function(obj){
            var acao = '';
            if(!obj.ativo){
                acao = 'des';
            }
            sweetAlertConfig.title = "Tem certeja que deseja "+acao+"ativar este filial?";

            SweetAlert.swal(sweetAlertConfig, function(isConfirm){
                if (isConfirm) {
                    filialService.update(obj).then(function(){
                        SweetAlert.swal(""+acao+"ativado!", "Filial "+acao+"ativado com sucesso.", "success");
                    }, function(){
                        SweetAlert.swal("ERRO!", "Ocorreu um problema ao atualizar", "error");
                        obj.ativo = !obj.ativo;
                    });
                } else {
                    SweetAlert.swal("Cancelado", "O filial não foi "+acao+"ativado", "error");
                    obj.ativo = !obj.ativo;
                }
            });
        }
    }
})();


// To run this code, edit file index.html or index.jade and change
// html data-ng-app attribute from angle to myAppName
// ----------------------------------------------------------------------

(function() {
    'use strict';

    angular
        .module('app.filiais')
        .controller('filialFormController', Controller);

    Controller.$inject = ['$scope', '$state', '$stateParams', 'filialService','SweetAlert'];
    function Controller($scope, $state, $stateParams, filialService, SweetAlert) {
        if (!$stateParams.id) {
            $scope.descricao = null;
        }else{
            filialService.get($stateParams.id).then(function(result){
                $scope.id = result.data.data.data.id;
                $scope.descricao = result.data.data.data.descricao;
            }),
            function(){
                SweetAlert.swal("ERRO!", "Ocorreu um problema ao consultar dados", "error");
            };
        }

        $scope.submit = function(){
            if(!$scope.descricao){
                SweetAlert.swal("ERRO!", "Preencha o campo 'Descrição do Filial'", "error");
                angular.element('#descricao').trigger('focus');
                return;
            }
            var obj = {
                id: $scope.id,
                descricao: $scope.descricao
            }
                
            if($stateParams.id){
                var request = filialService.update(obj);
                var title = "Editado!";
            }else{
                var request = filialService.insert(obj);
                var title = "Cadastrado!";
            }
            request.then(function(){
                SweetAlert.swal({
                   title: title,
                   type: "success",
                   showCancelButton: false,
                   confirmButtonText: "OK",
                   closeOnConfirm: true},
                function(isConfirm){ 
                    if (isConfirm) {
                        $state.go('app.filiais');
                    }
                });
            }, function(){
                SweetAlert.swal("ERRO!", "Ocorreu um problema ao cadastrar", "error");
            });
        }

        $scope.cancelar = function(){
            SweetAlert.swal({
               title: "Deseja descartar todas as alterações?",
               type: "warning",
               showCancelButton: true,
               cancelButtonText: "Não",
               confirmButtonColor: "#DD6B55",
               confirmButtonText: "Sim",
               closeOnConfirm: true}, 
            function(onConfirm){ 
                if(onConfirm){
                    $state.go('app.filiais');
                }
            });
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('app.filiais')
        .service('filialService', ['$http','$q', function ($http,$q) {

            var urlBase = 'api/filiais';

            this.getAll = function () {
                return $q(function(resolve, reject) {
                    resolve($http.get(urlBase));
                });
            };
            
            this.paginate = function (page,search) {

                return $q(function(resolve, reject) {
                    if(search){
                        resolve($http.get(urlBase + '?page=' + page +'&search=descricao:' + search));
                    }
                    resolve($http.get(urlBase + '?page=' + page));
                });
            };

            this.search = function (query) {
                return $q(function(resolve, reject) {
                    resolve($http.get(urlBase + '?search=' + query));
                });
            };

            this.get = function (id) {
                return $q(function(resolve, reject) {
                    resolve($http.get(urlBase + '/' + id));
                });
            };

            this.insert = function (cust) {
                return $q(function(resolve, reject) {
                    resolve($http.post(urlBase, cust));
                });
            };

            this.update = function (cust) {
                return $q(function(resolve, reject) {
                    resolve($http.put(urlBase + '/' + cust.id, cust));
                });
            };

            this.delete = function (id) {
                return $q(function(resolve, reject) {
                    resolve($http.delete(urlBase + '/' + id));
                });
            };
        }]);
})();


// To run this code, edit file index.html or index.jade and change
// html data-ng-app attribute from angle to myAppName
// ----------------------------------------------------------------------

(function() {
    'use strict';

    angular
        .module('app.funcionarios')
        .controller('funcionarioController', Controller);

    Controller.$inject = ['$filter', 'ngTableParams', 'funcionarioService', 'SweetAlert'];
    function Controller($filter, ngTableParams, funcionarioService, SweetAlert) {
        var vm = this;
        var sweetAlertConfig = {
               //text: "Your will not be able to recover this imaginary file!",
               type: "warning",
               showCancelButton: true,
               confirmButtonColor: "#DD6B55",
               confirmButtonText: "Sim",
               cancelButtonText: "Não",
               closeOnConfirm: false,
               closeOnCancel: false };
        vm.pesquisa = '';

        vm.tableParams = new ngTableParams([
                {
                    page: 1, 
                    count: 15
                }],
            {
                counts: [],
                getData: function ($defer, params) {
                    var filter = params.filter();
                    var sorting = params.sorting();
                    var count = params.count();
                    var page = params.page();

                    funcionarioService.paginate(page,vm.pesquisa)
                        .then(function (result) {
                            vm.tableParams.total(result.data.data.total/result.data.data.per_page);
                            $defer.resolve(result.data.data.data);
                        });
                }
            }
        );

        vm.search = function(){
            vm.tableParams.page(1);
            vm.tableParams.reload();
        }

        vm.delete = function(obj){
            sweetAlertConfig.title = "Tem certeja que deseja excluir este funcionário?";

            SweetAlert.swal(sweetAlertConfig, function(isConfirm){
                if (isConfirm) {
                    funcionarioService.delete(obj.id).then(function(){
                        vm.tableParams.reload();
                        SweetAlert.swal("excluído!", "Funcionario excluído com sucesso.", "success");
                    }, function(){
                        SweetAlert.swal("ERRO!", "Ocorreu um problema ao excluir", "error");
                    });
                } else {
                    SweetAlert.swal("Cancelado", "O funcionário não foi excluído", "error");
                }
            });
        }
        vm.updateAtivo = function(obj){
            var acao = '';
            if(!obj.ativo){
                acao = 'des';
            }
            sweetAlertConfig.title = "Tem certeja que deseja "+acao+"ativar este funcionario?";

            SweetAlert.swal(sweetAlertConfig, function(isConfirm){
                if (isConfirm) {
                    funcionarioService.update(obj).then(function(){
                        SweetAlert.swal(""+acao+"ativado!", "Funcionario "+acao+"ativado com sucesso.", "success");
                    }, function(){
                        SweetAlert.swal("ERRO!", "Ocorreu um problema ao atualizar", "error");
                        obj.ativo = !obj.ativo;
                    });
                } else {
                    SweetAlert.swal("Cancelado", "O funcionario não foi "+acao+"ativado", "error");
                    obj.ativo = !obj.ativo;
                }
            });
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('app.funcionarios')
        .controller('funcionarioFormController', Controller)
        .controller('PerfilTableCtrl', PerfilTableCtrl)
        .controller('DepartamentoTableCtrl', DepartamentoTableCtrl)
        .controller('FilialTableCtrl', FilialTableCtrl);

    PerfilTableCtrl.$inject=['$scope','$filter', '$http','SweetAlert'];
    DepartamentoTableCtrl.$inject=['$scope','$filter', '$http','SweetAlert'];
    FilialTableCtrl.$inject=['$scope','$filter', '$http','SweetAlert'];

    Controller.$inject=['$scope', 
                        '$state', 
                        '$stateParams', 
                        'funcionarioService',
                        'perfilService',
                        'departamentoService',
                        'filialService',
                        'SweetAlert'];
    function Controller($scope, 
                        $state, 
                        $stateParams, 
                        funcionarioService, 
                        perfilService, 
                        departamentoService, 
                        filialService, 
                        SweetAlert) 
    {        
        perfilService.paginate(1)
            .then(function (result) {
                $scope.perfis = result.data.data.data;
            });
        departamentoService.paginate(1)
            .then(function (result) {
                $scope.departamentos = result.data.data.data;
            });
        filialService.paginate(1)
            .then(function (result) {
                $scope.filiais = result.data.data.data;
            });

        if (!$stateParams.id) {

            $scope.entity = [];
            $scope.entity.ativo = true;
            $scope.entity.login = null;
            $scope.entity.nome = null;
            $scope.entity.cod_vendedor = null;
            $scope.entity.perfis = [];
            $scope.entity.departamentos = [];
            $scope.entity.filiais = [];
        }else{
            funcionarioService.get($stateParams.id).then(function(result){
                $scope.entity = [];
                $scope.entity.id = result.data.data.id;
                $scope.entity.ativo = (result.data.data.ativo)?true:false;
                $scope.entity.login = result.data.data.login;
                $scope.entity.nome = result.data.data.nome;
                $scope.entity.cod_vendedor = result.data.data.cod_vendedor;
                $scope.entity.perfis = result.data.data.perfis;
                $scope.entity.departamentos = result.data.data.departamentos;
                $scope.entity.filiais = result.data.data.filiais;
            }),
            function(){
                SweetAlert.swal("ERRO!", "Ocorreu um problema ao consultar dados", "error");
            };
        }

        $scope.submit = function(){
            if(!$scope.entity.login){
                SweetAlert.swal("ERRO!", "Preencha o campo 'Login do Funcionário'", "error");
                angular.element('#login').trigger('focus');
                return;
            }
            if(!$scope.entity.nome){
                SweetAlert.swal("ERRO!", "Preencha o campo 'Nome do Funcionário'", "error");
                angular.element('#nome').trigger('focus');
                return;
            }
            if(!$scope.entity.cod_vendedor){
                SweetAlert.swal("ERRO!", "Preencha o campo 'Código do Vendedor'", "error");
                angular.element('#cod_vendedor').trigger('focus');
                return;
            }

            var perfis = [];
            var departamentos = [];
            var filiais = [];

            $scope.entity.perfis.forEach(function(perfil){
                perfis.push(perfil.id);
            });
            $scope.entity.departamentos.forEach(function(departamento){
                departamentos.push(departamento.id);
            });
            $scope.entity.filiais.forEach(function(filial){
                filiais.push(filial.id);
            });

            var save_obj = {
                id: $scope.entity.id,
                login: $scope.entity.login,
                ativo: $scope.entity.ativo,
                nome: $scope.entity.nome,
                cod_vendedor: $scope.entity.cod_vendedor,
                perfis: perfis,
                departamentos: departamentos,
                filiais: filiais
            }
                
            if($stateParams.id){
                var request = funcionarioService.update(save_obj);
                var title = "Editado!";
            }else{
                var request = funcionarioService.insert(save_obj);
                var title = "Cadastrado!";
            }
            request.then(function(){
                SweetAlert.swal({
                   title: title,
                   type: "success",
                   showCancelButton: false,
                   confirmButtonText: "OK",
                   closeOnConfirm: true},
                function(isConfirm){ 
                    if (isConfirm) {
                        $state.go('app.funcionarios');
                    }
                });
            }, function(){
                SweetAlert.swal("ERRO!", "Ocorreu um problema ao cadastrar", "error");
            });
        }

        $scope.cancelar = function(){
            SweetAlert.swal({
               title: "Deseja descartar todas as alterações?",
               type: "warning",
               showCancelButton: true,
               cancelButtonText: "Não",
               confirmButtonColor: "#DD6B55",
               confirmButtonText: "Sim",
               closeOnConfirm: true}, 
            function(onConfirm){ 
                if(onConfirm){
                    $state.go('app.funcionarios');
                }
            });
        }
    }
    function PerfilTableCtrl($scope, $filter, $http, SweetAlert) {
        
        $scope.remove = function(index) {
            $scope.entity.perfis.splice(index, 1);
        };
        $scope.add = function() {
            var obj = $scope.entity.perfis.filter(function(obj){
                return $scope.perfil_search.id == obj.id;
            });
            if(!obj.length){
                $scope.entity.perfis.push($scope.perfil_search);
            }else{
                SweetAlert.swal("ERRO!", "O item selecionado já foi adicionado.", "error");
            }
            $scope.perfil_search = undefined;
        };
    }
    function DepartamentoTableCtrl($scope, $filter, $http, SweetAlert) {
        
        $scope.remove = function(index) {
            $scope.entity.departamentos.splice(index, 1);
        };
        $scope.add = function() {
            var obj = $scope.entity.departamentos.filter(function(obj){
                return $scope.departamento_search.id == obj.id;
            });
            if(!obj.length){
                $scope.entity.departamentos.push($scope.departamento_search);
            }else{
                SweetAlert.swal("ERRO!", "O item selecionado já foi adicionado.", "error");
            }
            $scope.departamento_search = undefined;
        };
    }
    function FilialTableCtrl($scope, $filter, $http, SweetAlert) {
        
        $scope.remove = function(index) {
            $scope.entity.filiais.splice(index, 1);
        };
        $scope.add = function() {
            var obj = $scope.entity.filiais.filter(function(obj){
                return $scope.filial_search.id == obj.id;
            });
            if(!obj.length){
                $scope.entity.filiais.push($scope.filial_search);
            }else{
                SweetAlert.swal("ERRO!", "O item selecionado já foi adicionado.", "error");
            }
            $scope.filial_search = undefined;
        };
    }
})();

(function() {
    'use strict';

    angular
        .module('app.funcionarios')
        .service('funcionarioService', ['$http','$q', function ($http,$q) {

            var urlBase = 'api/funcionarios';

            this.getAll = function () {
                return $q(function(resolve, reject) {
                    resolve($http.get(urlBase));
                });
            };
            
            this.paginate = function (page,search) {

                return $q(function(resolve, reject) {
                    if(search){
                        resolve($http.get(urlBase + '?page=' + page +'&search=descricao:' + search));
                    }
                    resolve($http.get(urlBase + '?page=' + page));
                });
            };

            this.search = function (query) {
                return $q(function(resolve, reject) {
                    resolve($http.get(urlBase + '?search=' + query));
                });
            };

            this.get = function (id) {
                return $q(function(resolve, reject) {
                    resolve($http.get(urlBase + '/' + id));
                });
            };

            this.insert = function (cust) {
                return $q(function(resolve, reject) {
                    resolve($http.post(urlBase, cust));
                });
            };

            this.update = function (cust) {
                return $q(function(resolve, reject) {
                    resolve($http.put(urlBase + '/' + cust.id, cust));
                });
            };

            this.delete = function (id) {
                return $q(function(resolve, reject) {
                    resolve($http.delete(urlBase + '/' + id));
                });
            };
        }]);
})();


// To run this code, edit file index.html or index.jade and change
// html data-ng-app attribute from angle to myAppName
// ----------------------------------------------------------------------

(function() {
    'use strict';

    angular
        .module('app.modulos')
        .controller('moduloController', Controller);

    Controller.$inject = ['$filter', 'ngTableParams', 'moduloService', 'SweetAlert'];
    function Controller($filter, ngTableParams, moduloService, SweetAlert) {
        var vm = this;
        var sweetAlertConfig = {
               //text: "Your will not be able to recover this imaginary file!",
               type: "warning",
               showCancelButton: true,
               confirmButtonColor: "#DD6B55",
               confirmButtonText: "Sim",
               cancelButtonText: "Não",
               closeOnConfirm: false,
               closeOnCancel: false };
        vm.pesquisa = '';

        vm.tableParams = new ngTableParams([
                {
                    page: 1, 
                    count: 15
                }],
            {
                counts: [],
                getData: function ($defer, params) {
                    var filter = params.filter();
                    var sorting = params.sorting();
                    var count = params.count();
                    var page = params.page();

                    moduloService.paginate(page,vm.pesquisa)
                        .then(function (result) {
                            vm.tableParams.total(result.data.data.meta.pagination.total/result.data.data.meta.pagination.per_page);
                            $defer.resolve(result.data.data.data);
                        });
                }
            }
        );

        vm.search = function(){
            vm.tableParams.page(1);
            vm.tableParams.reload();
        }

        vm.delete = function(obj){
            sweetAlertConfig.title = "Tem certeja que deseja excluir este módulo?";

            SweetAlert.swal(sweetAlertConfig, function(isConfirm){
                if (isConfirm) {
                    moduloService.delete(obj.id).then(function(){
                        vm.tableParams.reload();
                        SweetAlert.swal("excluído!", "Módulo excluído com sucesso.", "success");
                    }, function(){
                        SweetAlert.swal("ERRO!", "Ocorreu um problema ao excluir", "error");
                    });
                } else {
                    SweetAlert.swal("Cancelado", "O módulo não foi excluído", "error");
                }
            });
        }
        vm.updateAtivo = function(obj){
            var acao = '';
            if(!obj.ativo){
                acao = 'des';
            }
            sweetAlertConfig.title = "Tem certeja que deseja "+acao+"ativar este módulo?";

            SweetAlert.swal(sweetAlertConfig, function(isConfirm){
                if (isConfirm) {
                    moduloService.update(obj).then(function(){
                        SweetAlert.swal(""+acao+"ativado!", "Módulo "+acao+"ativado com sucesso.", "success");
                    }, function(){
                        SweetAlert.swal("ERRO!", "Ocorreu um problema ao atualizar", "error");
                        obj.ativo = !obj.ativo;
                    });
                } else {
                    SweetAlert.swal("Cancelado", "O módulo não foi "+acao+"ativado", "error");
                    obj.ativo = !obj.ativo;
                }
            });
        }
    }
})();


// To run this code, edit file index.html or index.jade and change
// html data-ng-app attribute from angle to myAppName
// ----------------------------------------------------------------------

(function() {
    'use strict';

    angular
        .module('app.modulos')
        .controller('moduloFormController', Controller)
        .controller('EditableRowCtrl', EditableRowCtrl);

    Controller.$inject = ['$scope', '$state', '$stateParams', 'moduloService', 'SweetAlert'];
    EditableRowCtrl.$inject = ['$scope','$filter', '$http'];
    function Controller($scope, $state, $stateParams, moduloService, SweetAlert) {
        if (!$stateParams.id) {
            $scope.descricao = null;
            $scope.ativo = true;
            $scope.funcionalidades = [];
        }else{
            moduloService.get($stateParams.id).then(function(result){
                $scope.id = result.data.id;
                $scope.descricao = result.data.descricao;
                $scope.ativo = (result.data.ativo) ? true : false;
                $scope.funcionalidades = result.data.funcionalidades;
            }),
            function(){
                SweetAlert.swal("ERRO!", "Ocorreu um problema ao consultar dados", "error");
            };
        }

        $scope.submit = function(){
            if(!$scope.descricao){
                SweetAlert.swal("ERRO!", "Preencha o campo 'Descrição do Módulo'", "error");
                angular.element('#descricao').trigger('focus');
                return;
            }
            var obj = {
                id: $scope.id,
                descricao: $scope.descricao,
                ativo: $scope.ativo,
                funcionalidades: $scope.funcionalidades
            }
                
            if($stateParams.id){
                var request = moduloService.update(obj);
                var title = "Editado!";
            }else{
                var request = moduloService.insert(obj);
                var title = "Cadastrado!";
            }
            request.then(function(){
                SweetAlert.swal({
                   title: title,
                   type: "success",
                   showCancelButton: false,
                   confirmButtonText: "OK",
                   closeOnConfirm: true},
                function(isConfirm){ 
                    if (isConfirm) {
                        $state.go('app.modulos');
                    }
                });
            }, function(){
                SweetAlert.swal("ERRO!", "Ocorreu um problema ao cadastrar", "error");
            });
        }

        $scope.cancelar = function(){
            SweetAlert.swal({
               title: "Deseja descartar todas as alterações?",
               type: "warning",
               showCancelButton: true,
               cancelButtonText: "Não",
               confirmButtonColor: "#DD6B55",
               confirmButtonText: "Sim",
               closeOnConfirm: true}, 
            function(onConfirm){ 
                if(onConfirm){
                    $state.go('app.modulos');
                }
            });
        }
    }
    function EditableRowCtrl($scope, $filter, $http) {
          
        $scope.groups = [];

        $scope.saveUser = function(data, id) {
            //$scope.funcionalidade not updated yet
            //angular.extend(data, {id: id});
                // return $http.post('/saveUser', data);
        };

            // remove funcionalidade
        $scope.removeUser = function(index) {
            $scope.funcionalidades.splice(index, 1);
        };

        // add funcionalidade
        $scope.addUser = function() {
            $scope.funcionalidades.push(
                {
                    nome: $scope.nome,
                    rota: $scope.rota
                }
            );

            $scope.nome ='';
            $scope.rota ='';
        };
    }
})();

(function() {
    'use strict';

    angular
        .module('app.modulos')
        .service('moduloService', ['$http','$q', function ($http,$q) {

            var urlBase = 'api/modulos';

            this.getAll = function () {
                return $q(function(resolve, reject) {
                    resolve($http.get(urlBase));
                });
            };
            
            this.paginate = function (page,search) {

                return $q(function(resolve, reject) {
                    if(search){
                        resolve($http.get(urlBase + '?page=' + page +'&search=descricao:' + search));
                    }
                    resolve($http.get(urlBase + '?page=' + page));
                });
            };

            this.search = function (query) {
                return $q(function(resolve, reject) {
                    resolve($http.get(urlBase + '?search=' + query));
                });
            };

            this.get = function (id) {
                return $q(function(resolve, reject) {
                    resolve($http.get(urlBase + '/' + id));
                });
            };

            this.insert = function (cust) {
                return $q(function(resolve, reject) {
                    resolve($http.post(urlBase, cust));
                });
            };

            this.update = function (cust) {
                return $q(function(resolve, reject) {
                    resolve($http.put(urlBase + '/' + cust.id, cust));
                });
            };

            this.delete = function (id) {
                return $q(function(resolve, reject) {
                    resolve($http.delete(urlBase + '/' + id));
                });
            };
        }]);
})();


// To run this code, edit file index.html or index.jade and change
// html data-ng-app attribute from angle to myAppName
// ----------------------------------------------------------------------

(function() {
    'use strict';

    angular
        .module('app.perfis')
        .controller('perfilController', Controller);

    Controller.$inject = ['$filter', 'ngTableParams', 'perfilService', 'SweetAlert'];
    function Controller($filter, ngTableParams, perfilService, SweetAlert) {
        var vm = this;
        var sweetAlertConfig = {
               //text: "Your will not be able to recover this imaginary file!",
               type: "warning",
               showCancelButton: true,
               confirmButtonColor: "#DD6B55",
               confirmButtonText: "Sim",
               cancelButtonText: "Não",
               closeOnConfirm: false,
               closeOnCancel: false };
        vm.pesquisa = '';

        vm.tableParams = new ngTableParams([
                {
                    page: 1, 
                    count: 15
                }],
            {
                counts: [],
                getData: function ($defer, params) {
                    var filter = params.filter();
                    var sorting = params.sorting();
                    var count = params.count();
                    var page = params.page();

                    perfilService.paginate(page,vm.pesquisa)
                        .then(function (result) {
                            vm.tableParams.total(result.data.data.meta.pagination.total/result.data.data.meta.pagination.per_page);
                            $defer.resolve(result.data.data.data);
                        });
                }
            }
        );

        vm.search = function(){
            vm.tableParams.page(1);
            vm.tableParams.reload();
        }

        vm.delete = function(obj){
            sweetAlertConfig.title = "Tem certeja que deseja excluir este perfil?";

            SweetAlert.swal(sweetAlertConfig, function(isConfirm){
                if (isConfirm) {
                    perfilService.delete(obj.id).then(function(){
                        vm.tableParams.reload();
                        SweetAlert.swal("excluído!", "Perfil excluído com sucesso.", "success");
                    }, function(){
                        SweetAlert.swal("ERRO!", "Ocorreu um problema ao excluir", "error");
                    });
                } else {
                    SweetAlert.swal("Cancelado", "O perfil não foi excluído", "error");
                }
            });
        }
        vm.updateAtivo = function(obj){
            var acao = '';
            if(!obj.ativo){
                acao = 'des';
            }
            sweetAlertConfig.title = "Tem certeja que deseja "+acao+"ativar este perfil?";

            SweetAlert.swal(sweetAlertConfig, function(isConfirm){
                if (isConfirm) {
                    perfilService.update(obj).then(function(){
                        SweetAlert.swal(""+acao+"ativado!", "Perfil "+acao+"ativado com sucesso.", "success");
                    }, function(){
                        SweetAlert.swal("ERRO!", "Ocorreu um problema ao atualizar", "error");
                        obj.ativo = !obj.ativo;
                    });
                } else {
                    SweetAlert.swal("Cancelado", "O perfil não foi "+acao+"ativado", "error");
                    obj.ativo = !obj.ativo;
                }
            });
        }
    }
})();


// To run this code, edit file index.html or index.jade and change
// html data-ng-app attribute from angle to myAppName
// ----------------------------------------------------------------------

(function() {
    'use strict';

    angular
        .module('app.perfis')
        .controller('perfilFormController', Controller);

    Controller.$inject = ['$scope', '$state', '$stateParams', 'perfilService', 'SweetAlert'];
    function Controller($scope, $state, $stateParams, perfilService, SweetAlert) {
        $scope.modulos_funcionalidades = [];
        var promiseModulosFuncionalidades = perfilService.getModulosFuncionalidades().
            then(function(result){
                return result.data.data;
        },function(){
            SweetAlert.swal("ERRO!", "Ocorreu um problema ao consultar dados", "error");
        });

        if (!$stateParams.id) {
            $scope.descricao = null;
            $scope.nivel_privilegio = null;
            $scope.ativo = true;
            $scope.funcionalidades = [];
            promiseModulosFuncionalidades.then(function(result){
                $scope.modulos_funcionalidades = result;
            });
        }else{
            perfilService.get($stateParams.id).then(function(result){
                $scope.id = result.data.id;
                $scope.descricao = result.data.descricao;
                $scope.nivel_privilegio = result.data.nivel_privilegio;
                $scope.ativo = (result.data.ativo) ? true : false;
                $scope.funcionalidades = result.data.funcionalidades;


                promiseModulosFuncionalidades.then(function(resultPromise){
                    
                    resultPromise = resultPromise.forEach(function(modulo){
                        var count_checked = 0;
                        modulo.funcionalidades.forEach(function(element,index){
                            var res = $scope.funcionalidades.filter(function(fill){
                                return fill.id == element.id;
                            });
                            element.checked = (res.length>0);
                            if(res.length>0){
                                count_checked++;
                            }
                        });
                        modulo.checked = (modulo.funcionalidades.length == count_checked);
                        $scope.modulos_funcionalidades.push(modulo);
                    });
                    return resultPromise;
                });
            }),
            function(){
                SweetAlert.swal("ERRO!", "Ocorreu um problema ao consultar dados", "error");
            };
        }

        $scope.submit = function(){
            if(!$scope.descricao){
                SweetAlert.swal("ERRO!", "Preencha o campo 'Descrição do Perfil'", "error");
                angular.element('#descricao').trigger('focus');
                return;
            }
            if(!$scope.nivel_privilegio){
                SweetAlert.swal("ERRO!", "Preencha o campo 'Nível de Privilégio'", "error");
                angular.element('#nivel_privilegio').trigger('focus');
                return;
            }
            $scope.funcionalidades = [];
            $scope.modulos_funcionalidades.forEach(function(modulo){
                modulo.funcionalidades.forEach(function(funcionalidade){
                    if(funcionalidade.checked){
                        $scope.funcionalidades.push(funcionalidade.id);
                    }
                });
            });

            var obj = {
                id: $scope.id,
                descricao: $scope.descricao,
                nivel_privilegio: $scope.nivel_privilegio,
                ativo: $scope.ativo,
                funcionalidades: $scope.funcionalidades
            }
                
            if($stateParams.id){
                var request = perfilService.update(obj);
                var title = "Editado!";
            }else{
                var request = perfilService.insert(obj);
                var title = "Cadastrado!";
            }
            request.then(function(){
                SweetAlert.swal({
                   title: title,
                   type: "success",
                   showCancelButton: false,
                   confirmButtonText: "OK",
                   closeOnConfirm: true},
                function(isConfirm){ 
                    if (isConfirm) {
                        $state.go('app.perfis');
                    }
                });
            }, function(){
                SweetAlert.swal("ERRO!", "Ocorreu um problema ao cadastrar", "error");
            });
        }

        $scope.cancelar = function(){
            SweetAlert.swal({
               title: "Deseja descartar todas as alterações?",
               type: "warning",
               showCancelButton: true,
               cancelButtonText: "Não",
               confirmButtonColor: "#DD6B55",
               confirmButtonText: "Sim",
               closeOnConfirm: true}, 
            function(onConfirm){ 
                if(onConfirm){
                    $state.go('app.perfis');
                }
            });
        }
        $scope.checkModulo = function(modulo){
            modulo.funcionalidades.forEach(function(obj){
                obj.checked = modulo.checked;
            });
        };
        $scope.checkFuncionalidade = function(modulo){
            var count_checked = 0;
            modulo.funcionalidades.forEach(function(obj){
                if(obj.checked) count_checked++;
            });

            modulo.checked = (count_checked == modulo.funcionalidades.length);
        };
    }
})();

(function() {
    'use strict';

    angular
        .module('app.perfis')
        .service('perfilService', ['$http','$q', function ($http, $q) {

            this.getModulosFuncionalidades = function(){
                return $q(function(resolve, reject) {
                    resolve($http.get('api/modulos_funcionalidades'));
                });
            }

            var urlBase = 'api/perfis';

            this.getAll = function () {
                return $q(function(resolve, reject) {
                    resolve($http.get(urlBase));
                });
            };
            
            this.paginate = function (page,search) {

                return $q(function(resolve, reject) {
                    if(search){
                        resolve($http.get(urlBase + '?page=' + page +'&search=descricao:' + search));
                    }
                    resolve($http.get(urlBase + '?page=' + page));
                });
            };

            this.search = function (query) {
                return $q(function(resolve, reject) {
                    resolve($http.get(urlBase + '?search=' + query));
                });
            };

            this.get = function (id) {
                return $q(function(resolve, reject) {
                    resolve($http.get(urlBase + '/' + id));
                });
            };

            this.insert = function (cust) {
                return $q(function(resolve, reject) {
                    resolve($http.post(urlBase, cust));
                });
            };

            this.update = function (cust) {
                return $q(function(resolve, reject) {
                    resolve($http.put(urlBase + '/' + cust.id, cust));
                });
            };

            this.delete = function (id) {
                return $q(function(resolve, reject) {
                    resolve($http.delete(urlBase + '/' + id));
                });
            };
        }]);
})();
