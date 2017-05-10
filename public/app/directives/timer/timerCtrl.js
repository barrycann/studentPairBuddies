// APP
// ============================================================
angular.module("app")

// TIMER CONTROLLER
// ============================================================
.controller("timerCtrl", function($scope, $interval, timeService) {

  // VARIABLES
  // ============================================================
  $scope.selectedMin = 3;
  $scope.selectedSec = 0;
  var minutes = 3;
  var seconds = 0;
  $scope.time = '03:00';

  // FUNCTIONS
  // ============================================================
  var alarm = function() {
    $interval.cancel($scope.interval);
    $scope.interval = $interval(function() {
      beep();
      setTimeout(function() {
        beep();
      }, 250);
    }, 1000);
  };

  $scope.start = function() {
    if (!$scope.interval)
      $scope.interval = $interval(function() {

        if (!minutes && !seconds)
          return alarm();

        var time = timeService.calculateTime(minutes, seconds);

        minutes = time.minutes;
        seconds = time.seconds;
        $scope.time = time.time;

      }, 1000);
  };

  $scope.stop = function() {
    if ($scope.interval)
      $interval.cancel($scope.interval);
      $scope.interval = null;
  };

  $scope.reset = function() {
    $scope.stop();
    minutes = $scope.selectedMin;
    seconds = $scope.selectedSec;
    $scope.time = timeService.getDisplay(minutes, seconds);
  };

  $scope.setTime = function() {
    $scope.reset();
    $scope.change = false;
  };

  $scope.$watch('flag', function() {
    $scope.reset();
  })

})

// TIME SERVICE
// ============================================================
.service("timeService", function($http) {

  // VARIABLES
  // ============================================================
  var service = this;

  // FUNCTIONS
  // ============================================================
  this.calculateTime = function(minutes, seconds) {
    if (seconds > 0)
      seconds--;
    else
      seconds = 59;

    if (seconds === 59)
      minutes--;

    return {
      minutes: minutes,
      seconds: seconds,
      time: service.getDisplay(minutes, seconds)
    }
  };

  this.getDisplay = function(minutes, seconds) {
    var time = "";

    if (minutes < 10)
      time += '0';

    time += minutes + ":";

    if (seconds < 10)
      time += '0';

    time += seconds;

    return time;
  };


});
