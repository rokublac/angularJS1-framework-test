var myDonuts = angular.module('myDonuts', ['ngRoute', 'ngAnimate']); // add dependencies in array

// routes
myDonuts.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){

	$locationProvider.html5Mode(true);

	$routeProvider
		.when('/home', {
			templateUrl: '../views/home.html',
			controller: 'DonutController'
		})
		.when('/contact', {
			templateUrl: '../views/contact.html',
			controller: 'ContactController'
		})
		.when('/contact-success', {
			templateUrl: '../views/contact-success.html',
			controller: 'ContactController'
		})
		.when('/directory', {
			templateUrl: '../views/directory.html',
			controller: 'DonutController'
		}).otherwise({
			redirectTo: '/home'
		});

}]);

// make a directive to display a random donut.
myDonuts.directive('randomDonut', [function(){

	return {
		// restrict to only use directive as an element ( 'A' for attribute form)
		restrict: 'E',
		scope: {
			// in the scope, the donuts property equals the variable declared in the home.html directive attribute
			donuts: '=',
			title: '='
		},
		templateUrl: '../views/random.html',
		// include html tags or stuff that is nested in the directive HTML tag
		transclude: true,
		// replace the directive name tag with a compliant html tag rather than <random-donut></random-donut>. Replace with parent compliant tag
		replace: true,
		controller: function($scope){
			// bad idea to hardcode the JSON data length but I'm having trouble with accessing the donut JSON variable length
			$scope.random = Math.floor(Math.random() * 4);
		}
	};
}]);

// DONUT CONTROLLER
myDonuts.controller('DonutController', ['$scope', '$http', function($scope, $http){ // put dependencies in function param and square brackets

	// x button to remove donut from list
	$scope.removeDonut =  function(donut){
		var removeDonut = $scope.donuts.indexOf(donut);
		$scope.donuts.splice(removeDonut, 1);
	};

	// adding new donuts from input with ng-submit
	$scope.addDonut = function(){
		$scope.donuts.push({
			name: $scope.newDonut.name,
			size: $scope.newDonut.size,
			price: parseInt($scope.newDonut.price),
			colour: '#bd2634',
			available: true
		});
		// clear input fields after submission
		$scope.newDonut = "";
	};

	//remove all donuts buttons
	$scope.removeAll = function(){
		$scope.donuts = [];
	};

	// http request to grab donuts array JSON from local file
	$http.get('../data/donuts.json').success(function(data){
		$scope.donuts = data;
	});

}]);

// CONTACT CONTROLLER
myDonuts.controller('ContactController', ['$scope', '$location', function($scope, $location){
	$scope.sendMessage = function(){
		$location.path('/contact-success');
	};

}]);
