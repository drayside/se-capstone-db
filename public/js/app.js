app = angular.module('app', ["ui.router"]);

app.config([
  "$stateProvider", '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $stateProvider.state('overview', {
      url: "/",
      templateUrl: "/templates/overview.html",
      controller: "overviewController"
    }).state('project', {
      url: "/project/:id",
      templateUrl: "/templates/project.html",
      controller: "projectController"
    }).state('graph', {
      url: "/graph",
      templateUrl: "/templates/graph.html",
      controller: "graphController"
    });
  }
]);

app.controller("appController", [function() {
}]);

app.controller("overviewController", ["$scope", "$http", function($scope, $http) {
  $scope.projects = [];
  $http.get("/project/all").then(function(response) {
    _.each(response.data.projects, function(project, filename) {
      project.id = filename.match(/(.*).md/)[1];
      project.interested_students_count = project.interested_students.length || 0;
      $scope.projects.push(project);
    });
    $scope.tags = _.uniq(_.flatten(_.pluck($scope.projects, "tags")));
  });

  $scope.propertyName = 'id';
  $scope.reverse = false;

  $scope.sortBy = function(propertyName) {
    $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : (propertyName === "interested_students_count");
    $scope.propertyName = propertyName;
  };

  $scope.tag = null;
  $scope.setTag = function(tag) {
    $scope.tag = tag;
  };
  $scope.tagFilter = function(project, index) {
    return !$scope.tag || _.indexOf(project.tags, $scope.tag) >= 0;
  }
}]);

app.controller("projectController", ["$scope", "$stateParams", function($scope, $stateParams) {
  $scope.htmlUrl = "/project/html/" + $stateParams.id + ".md";
}]);

app.controller("graphController", ["$scope", function($scope) {
}]);

app.directive('viewer', function() {
  return function(scope, element, attrs) {
    element.hide();
    var viewer = new Viewer(element[0], {
      inline: true,
      minHeight: 700,
      zoomRatio: 0.1,
      navbar: false
    });
  };
});