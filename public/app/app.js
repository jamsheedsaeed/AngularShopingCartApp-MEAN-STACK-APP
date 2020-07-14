
var app = angular.module('MyApp', ['ngMaterial', 'ngMessages','appRoutes', 'mainCtrl', 'userCtrl', 'storyCtrl','cartCtrl','checkoutCtrl','cartdetailCtrl',
									'authService', 'userService', 'storyService','cartService','addtocartService',
									'reverseDirective']).config(function($mdThemingProvider) {
										$mdThemingProvider.theme('default')
										  .primaryPalette('indigo')
										  .accentPalette('orange');						
									  });
  

