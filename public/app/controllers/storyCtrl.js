angular.module('storyCtrl', ['storyService'])

.controller('StoryController', function(Story, socketio){

	vm = this;

	vm.stories=[];

	

	vm.getStories = function(){
		Story.all()
		.success(function(data){
			vm.stories = data;
		});
	};

	vm.createStory = function(){

		vm.message = '';
		
		Story.create(vm.storyData)
			.success(function(data){
				vm.storyData.content = '';
				vm.message = data.message;

				// vm.getStories(); // Refresh

				// vm.stories.push(vm.storyData);
			});

	};

	vm.getStories();

	socketio.on('story', function(data){
		vm.stories.push(data);
	});
})

.controller('allStoriesController', function(stories, socketio){

	var vm = this;

	vm.stories = stories.data;


	socketio.on('story', function(data){
		vm.stories.push(data);
	});

})