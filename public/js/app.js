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
  });

  $scope.propertyName = 'id';
  $scope.reverse = false;

  $scope.sortBy = function(propertyName) {
    $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
    $scope.propertyName = propertyName;
  };
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