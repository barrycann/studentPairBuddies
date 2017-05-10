// INITILIZE SERVICE
// ============================================================
angular.module("app")
	.service("userService", function($http) {

		// PROCESSES
		// ============================================================
		function shuffle(a) {
			var j, x, i;
			for (i = a.length; i; i--) {
				j = Math.floor(Math.random() * i);
				x = a[i - 1];
				a[i - 1] = a[j];
				a[j] = x;
			}
			return a;
		}

	  // CRUD FUNCTIONS
	  // ============================================================
	  this.getUsers = function(cohort_id) {
	    return $http({
	      method: 'GET',
	      url: '/api/user?cohort=' + cohort_id
	    });
	  };
	  this.getUser = function(id) {
	    return $http({
	      method: 'GET',
	      url: '/api/user?_id='+id
	    });
	  };
	  this.createUser = function(user) {
	    return $http({
	      method: 'POST',
	      url: '/api/user',
	      data: user
	    });
	  };
	  this.editUser = function(id, user) {
	    return $http({
	      method: 'PUT',
	      url: "/api/user/" + id,
	      data: user
	    });
	  };
	  this.deleteUser = function(id) {
	    return $http({
	      method: 'DELETE',
	      url: '/api/user/' + id
	    });
	  };

	  // OTHER FUNCTIONS
	  // ============================================================
		this.randomize = function(arr) {
			return shuffle(arr);
		}

	});
