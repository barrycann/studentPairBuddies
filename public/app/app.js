// INITILIZE APP
// ============================================================
angular.module("app", ["ui.router"])

  // CONFIG
  // ============================================================
  .config(function($stateProvider, $urlRouterProvider) {

    // INITILIZE STATES
    // ============================================================
    $stateProvider

      // HOME STATE
      .state('home', {
        url: '/',
        templateUrl: './app/routes/home/homeTmpl.html',
        controller: 'homeCtrl'
      })

      // COHORTS STATE
      .state('cohorts', {
        url: '/cohorts',
        templateUrl: './app/routes/cohorts/cohortsTmpl.html',
        controller: 'cohortsCtrl',
        resolve: {
          cohorts: function(cohortService) {
            return cohortService.getCohorts();
          }
        }
      })

      // STUDENTS STATE
      .state('students', {
        url: '/students/:cohort_id',
        templateUrl: './app/routes/students/studentsTmpl.html',
        controller: 'studentsCtrl',
        resolve: {
          pairs: function(cohortService, $stateParams) {
            return cohortService.getPairs($stateParams.cohort_id);
          }
        }
      });




    // ASSIGN OTHERWISE
    // ============================================================
    $urlRouterProvider.otherwise('/cohorts');
  });
