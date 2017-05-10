// INITILIZE DIRECTIVE
// ============================================================
angular.module("app").directive('timerDir', function() {
  return {
    restrict: 'EA',
    templateUrl: './app/directives/timer/timerTmpl.html',
    controller: 'timerCtrl',
    scope: {
      flag: '=reset'
    }
  };
});
