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
      if (filename.match(/(.*).md$/)) {
        project.id = filename.match(/(.*).md$/)[1];
      }
      else {
        return;
      }
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
  $scope.min = 0;
  $scope.max = 100;

  $scope.generate = function() {
    $scope.graphUrl = "/graph/generate?min=" + $scope.min + "&max=" + $scope.max;
  }
  $scope.generate();
}]);

app.directive('embedSrc', function () {
  return {
    restrict: 'A',
    scope: {
      embedSrc: "@"
    },
    link: function (scope, element, attrs) {
      var current = element;
      scope.$watch("embedSrc", function () {
        var clone = element
                      .clone()
                      .attr('src', scope.embedSrc);
        current.replaceWith(clone);
        current = clone;
        current[0].addEventListener('load', function(){
          var panZoom = svgPanZoom(current[0], {
            zoomEnabled: true,
            controlIconsEnabled: true,
            fit: 1,
            center: 1
          });

          $(window).resize(function(){
            panZoom.resize();
            panZoom.fit();
            panZoom.center();
          });
        });
      });
    }
  };
});
