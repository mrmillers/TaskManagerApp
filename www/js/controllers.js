angular.module('manager.controllers', ['manager.service'])

.controller('AppCtrl', function($scope, $ionicModal, dataService) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.taskData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/edit.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.discard = function() {
    $scope.taskData = {};
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.edit = function(index) {
    console.log(index);
    $scope.taskid = index;
    if (index<0) {
      $scope.taskData = dataService.getEmptyData();
    }
    else {
      $scope.taskData = dataService.data[index];
    }
    console.log($scope.taskData);
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.save = function() {
    console.log($scope.taskData)
    if ($scope.taskid < 0)
      dataService.add($scope.taskData);
    else
      dataService.update($scope.taskid,$scope.taskData);
    $scope.discard();
  };
})


.controller('TaskCtrl', function($stateParams, $ionicPopup, $state, dataService) {
  this.data = dataService.data[$stateParams.taskid]
  this.id = $stateParams.taskid;
  this.delete = function (){
    var confirmPopup = $ionicPopup.confirm({
     title: 'Delete ' + this.data.title,
     template: 'Are you sure you want to delete this task?'
   });

   confirmPopup.then(function(res) {
     if(res) {
      dataService.delete($stateParams.taskid);
        $state.go('app.tasklist');
     }
   });
  }
})

.controller('TaskListCtrl', function($scope, dataService){
  $scope.tasklist = dataService.data;//[{title:"test",progress:75}];

})

.controller('TaskEditCtrl', function($state){

});
