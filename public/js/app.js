app = angular.module('app', ["ui.router", "tableSort"]);

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
      console.log(project.id);
      project.interested_students_count = project.interested_students.length || 0;
      $scope.projects.push(project);
    });
  });
}]);

app.controller("projectController", ["$scope", "$stateParams", function($scope, $stateParams) {
  $scope.htmlUrl = "/project/html/" + $stateParams.id + ".md";
}]);