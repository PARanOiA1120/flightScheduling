'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [])



.controller('geoLocController', function($scope){
  $scope.currentLoc = {
    lat : '',
    lon : ''
  };

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position){
      $scope.$apply(function(){
        $scope.position = position;
        $scope.currentLoc.lat = $scope.position.coords.latitude;
        $scope.currentLoc.lon = $scope.position.coords.longitude;
      });
    });

    $scope.airports = [
      {id:0, code: "LAX", lat: 33.9425, lon: -118.4081, level: 2},
      {id:1, code: "SFO", lat: 37.6189, lon: -122.3750, level: 2},
      {id:2, code: "SJN", lat: 34.5186, lon: -109.3789, level: 2},
      {id:3, code: "OAK", lat: 37.7214, lon: -122.2208, level: 2},
      {id:4, code: "PAO", lat: 37.4611, lon: -122.1150, level: 1},
      {id:5, code: "SJC", lat: 37.3639, lon: -121.9289, level: 1},
      {id:6, code: "JFK", lat: 40.6397, lon: -73.7789, level: 2}
    ];

    $scope.level = '';
    $scope.result = 0;

    $scope.getAirport = function(){
      if($scope.level > 2 || $scope.level < 0){
        alert("Please enter 1 or 2 only.")
      }
      else {
        $scope.minDis = 99999;

        var targetAirport = -1;
        var radius = 3959; //radius of earth in miles

        for (var i = 0; i < $scope.airports.length; i++) {
          var dLat = ($scope.airports[i].lat - $scope.currentLoc.lat) * Math.PI / 180;
          var dLon = ($scope.airports[i].lon - $scope.currentLoc.lon) * Math.PI / 180;

          var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos($scope.airports[i].lat * Math.PI / 180) * Math.cos($scope.currentLoc.lat * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
          var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          var distance = radius * c;

          if (distance < $scope.minDis && $scope.airports[i].level >= $scope.level) {
            $scope.minDis = distance;
            targetAirport = i;
          }
        }

        $scope.airportCode = $scope.airports[targetAirport].code;
        $scope.result = 1;
      }
    }
  }
})
