// INITILIZE CONTROLLER
// ============================================================
angular.module("app").controller("cohortsCtrl", function($scope, $state, cohorts, cohortService, loginService) {

  // VARIABLES
  // ============================================================
  $scope.cohorts = cohorts.data || [];

  // FUNCTIONS
  // ============================================================
  $scope.getCohorts = function() {
    cohortService.getCohorts()
      .then(function(response) {
        $scope.cohorts = response.data;
      });
  };

  $scope.addCohort = function(newCohort) {
    cohortService.createCohort(newCohort)
      .then(function(response) {
        $scope.newCohort = {
          title: '',
          slack_channel: ''
        };
        $scope.getCohorts();
      });
  };

  $scope.updateCohort = function(cohort) {
    cohortService.editCohort(cohort._id, cohort)
      .then(function(response) {
        $scope.getCohorts();
      });
  };

  $scope.deleteCohort = function(id) {
    cohortService.deleteCohort(id)
      .then(function(response) {
        $scope.getCohorts();
      });
  };

  $scope.logout = function(){
    loginService.logout()
    .then(function(response){
      $state.go('home')
    })
  }

});
