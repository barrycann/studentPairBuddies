// INITILIZE SERVICE
// ============================================================
angular.module("app").service("cohortService", function($http) {

  // CRUD FUNCTIONS
  // ============================================================
  this.getCohorts = function() {
    return $http({
      method: 'GET',
      url: '/api/cohort'
    });
  };
  this.getCohort = function(id) {
    return $http({
      method: 'GET',
      url: '/api/cohort/?_id='+id
    });
  };
  this.createCohort = function(cohort) {
    return $http({
      method: 'POST',
      url: '/api/cohort',
      data: cohort
    });
  };
  this.editCohort = function(id, cohort) {    
    return $http({
      method: 'PUT',
      url: "/api/cohort/" + id,
      data: cohort
    });
  };
  this.deleteCohort = function(id) {
    return $http({
      method: 'DELETE',
      url: '/api/cohort/' + id
    });
  };

  // OTHER FUNCTIONS
  // ============================================================
  this.getPairs = function(id) {
    return $http({
      method: 'GET',
      url: `/api/cohort/pairs/?_id=${id}`
    });
  };

  this.setPairs = function(id) {
    return $http({
      method: 'PUT',
      url: `/api/cohort/pair/?_id=${id}`
    });
  };

  ////////////////////////////////////////
  this.updateSlackNotifications = function(id, value){
    console.log(id)
    console.log(value);
    return $http({
      method: "PUT",
      url: "/api/cohort/" + id,
      data: {
        notify: value
      }
    })
  }

});
