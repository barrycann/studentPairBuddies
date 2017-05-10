// INITILIZE CONTROLLER
// ============================================================
angular.module("app")
  .controller("studentsCtrl", function($scope, pairs, cohortService, userService, $state) {

  	// VARIABLES
  	// ============================================================
  	$scope.cohort = pairs.data;
    $scope.pairs = $scope.cohort.pairs
    $scope.users = [];
    $scope.expand = false;

  	// FUNCTIONS
  	// ============================================================
  	$scope.getUsers = function() {
  		userService.getUsers($state.params.cohort_id)
  			.then(function(response) {
  				$scope.users = response.data;
  			})
        .catch(function(err) {
          console.log(err);
        });
  	};
    $scope.getUsers();

    $scope.getPairs = function() {
      cohortService.getPairs($scope.cohort._id)
        .then(function(response) {
          $scope.pairs = response.data.pairs;
        });
    };

  	$scope.addUser = function(name) {
  		userService.createUser({name: name, cohort: $state.params.cohort_id})
  			.then(function(response) {
  				$scope.getUsers();
  				$scope.newUser = "";
  			})
        .catch(function(err) {
  			  console.log(err);
  			});
  	};

    $scope.updateUser = function(user) {
      userService.editUser(user._id, user)
        .then(function(response) {
          $scope.getUsers();
        });
    };

    $scope.deleteUser = function(id) {
      userService.deleteUser(id)
        .then(function(response) {
          $scope.getUsers();
        });
    };

  	$scope.pair = function() {
  		cohortService.setPairs($scope.cohort._id)
  			.then(function(response) {
          $scope.getPairs();
  			})
        .catch(function(err) {
          console.log(err);
        });
  	};

    $scope.randomize = function() {
      $scope.users = userService.randomize($scope.users);
      $scope.randomized = true;
    };

    $scope.expandPairs = function() {
      $scope.expand = !$scope.expand;
    };

    $scope.resetStudents = function() {
      $scope.randomized = false;
      $scope.getUsers();
    };
  });
