angular.module('mainCtrl', ['authService','cartService'])

.controller('MainController', function($rootScope, $location, Auth,Cart,$mdSidenav,$mdTheming){

	var vm = this;

	vm.user = {};

	var products = [];

	vm.total = 0;
	//$rootScope.count = Cart.getCountproduct();
	//Get Login status
	
	vm.loggedIn = Auth.isLoggedIn();

	$rootScope.toggleLeft = buildToggler('left');

    function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      };
    }
	//$rootScope.count = Cart.getCountproduct();

	$rootScope.$watch(function () {
		 return Cart.getQuantity();
		 }, function (value) {
        $rootScope.count = value;
    });
	
	// Listener to check if loggrd in when route changed
	$rootScope.$on('$routeChangeStart', function(){
		
	//	removeFunction(); // COMPLETELY removes the browser color
		
	    vm.loggedIn = Auth.isLoggedIn();
		$rootScope.count = Cart.getCountproduct();
		Auth.getUser()
			.then(function(data){
				// console.log("User raw data: " + data.toString() );
				vm.user = data.data;
			});


		
	});
    // $rootScope.toggleSidenav = buildToggler('closeEventsDisabled');

    // function buildToggler(componentId) {
    //   return function() {
	// 	$mdSidenav(componentId).toggle();
    //   };
    // }
	// Use AUth service to login
	vm.doLogin = function(){
		console.log("Trying to login");

		vm.processing = true;
		vm.error = '';

		Auth.login(vm.loginData.username, vm.loginData.password)
			.success(function(data){
				vm.processing = false;

				Auth.getUser()
					.then(function(data){
						vm.user = data.data;
					});

				if(data.success)
					$location.path('/shop');
				else
					vm.error = data.message;
			});
	};

	// Use AUth service to logout
	vm.doLogout = function(){
		Auth.logout();
		$location.path('/');
	};

})