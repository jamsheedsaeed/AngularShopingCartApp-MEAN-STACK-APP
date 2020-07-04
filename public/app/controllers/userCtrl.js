angular.module('userCtrl', ['userService'])

.controller('userController', function(User){

	var vm = this;
	vm.processing = true;

	User.all()
		.success(function(data){
			vm.users = data;
		});


})


.controller('userCreateController', function(User, $location, $window) {

	var vm = this;
	vm.userData = {
		name: "",
		username: "",
		password: "",
		password_confirm: ""

	}

	vm.signupUser = function(){

		console.log("Trying to create user!");

		if( vm.userData.password != vm.userData.password_confirm ){
			alert("Passwords do not match!");
		} else {

			vm.message = "";

			User.create(vm.userData)
				.then(function(res){
					vm.userData = {};
					vm.message = res.data.message;

					console.log(vm.message);

					$window.localStorage.setItem('token', res.data.token);
					$location.path('/');
				});
		}
	}
});