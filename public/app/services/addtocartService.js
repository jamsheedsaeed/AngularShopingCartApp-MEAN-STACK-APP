angular.module('addtocartService', [])

.factory('AddCart', function($http){

	var AddCartFactory = {};

	AddCartFactory.AddCartData = function(cartData){
		return $http.post('/api/AddtoCart', cartData)
	}

	// storyFactory.all = function(){
	// 	return $http.get('/api/story');
	// }

	// storyFactory.allStories = function(){
	// 	return $http.get('/api/story/all');
	// }

	return AddCartFactory;
})

.factory('socketio', function($rootScope){

	var socket = io.connect();

	return {
		on: function(eventName, callback){
			socket.on(eventName, function(){
				var args = arguments;
				$rootScope.$apply(function(){
					callback.apply(socket, args);
				});
			});
		},

		emit: function(eventName, data, callback){
			socket.emit(eventName, data, function(){
				var args = arguments;
				$rootScope.$apply(function(){
					if(callback){
						callback.apply(socket, args);
					}
				});
			});
		}
	}

})