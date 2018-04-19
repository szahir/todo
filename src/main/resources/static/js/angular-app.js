
var todoApp = angular.module('todo', []);
todoApp.constant("CONSTANTS", {
    getAllTasks: "/api/tasks/all",
    insertTask: "/api/task/save",
    deleteTask: "/api/task/delete",
    updateTask: "/api/task/update"
});
todoApp.service('TodoService', ["$http", "CONSTANTS", function($http, CONSTANTS) {
    var service = {};
    service.getAllTasks = function() {
        var url = CONSTANTS.getAllTasks;
        return $http.get(url);
    }
    service.saveTask = function(task) {
        return $http.post(CONSTANTS.insertTask,task);
    }
    service.updateTask = function(task) {
        return $http.post(CONSTANTS.updateTask, task);
    }
    service.deleteTask = function(task) {
        return $http.post(CONSTANTS.deleteTask, task);
    }
    return service;
}]);
todoApp.controller("TodoController", [ "$scope", "TodoService",
		function($scope, TodoService) {
			TodoService.getAllTasks().then(function(value) {
				console.log(value.data);
				$scope.allTasks = value.data;
				
				$scope.completedTasks = [];
				$scope.pendingTasks = [];
				
				for(var i=0;i<$scope.allTasks.length; i++){
					var val=$scope.allTasks[i];
					if(val.status ==1){
						$scope.completedTasks.push(val);
					}else{
						$scope.pendingTasks.push(val);
					}
					
				}
			}, function(reason) {
				console.log("error occured");
			}, function(value) {
				console.log("no callback");
			});
			
			$scope.saveTask = function(taskName) {
				console.log("save task : "+taskName);
				var taskModel={
						taskName: null,
						status: 0
				};
				taskModel.taskName = taskName;
				TodoService.saveTask(taskModel).then(function(value) {
					$scope.pendingTasks.push(taskModel);
					$scope.newTask="";
					
				}, function(reason) {
					console.log("error occured : "+reason);
				}, function(value) {
					console.log("no callback");
				});
			};
			
			$scope.updateTaskStatus = function(taskName, statusValue){
				console.log("save task : "+taskName+"  , status: "+statusValue);
				var taskModel={
						taskName: null,
						status: 0
				};
				taskModel.taskName = taskName;
				taskModel.status = statusValue;
				TodoService.updateTask(taskModel).then(function(value) {
					if(statusValue == 1){
						for(var i = $scope.pendingTasks.length - 1; i >= 0; i--) {
							if($scope.pendingTasks[i].taskName === taskModel.taskName) {
								$scope.pendingTasks.splice(i, 1);
							}
						}
						$scope.completedTasks.push(taskModel);
					}else{
						if(statusValue == 0){
							for(var i = $scope.completedTasks.length - 1; i >= 0; i--) {
								if($scope.completedTasks[i].taskName === taskModel.taskName) {
									$scope.completedTasks.splice(i, 1);
								}
							}
							$scope.pendingTasks.push(taskModel);
						}
					}
				}, function(reason) {
					console.log("error occured : "+reason);
				}, function(value) {
					console.log("no callback");
				});
			};
			
			$scope.deleteTask = function(task) {
				console.log("delete task : "+task.taskName);
				
				TodoService.deleteTask(task).then(function(value) {
					if(task.status == 0){
						for(var i = $scope.pendingTasks.length - 1; i >= 0; i--) {
							if($scope.pendingTasks[i].taskName === task.taskName) {
								$scope.pendingTasks.splice(i, 1);
							}
						}
						
					}else{
						if(task.status == 1){
							for(var i = $scope.completedTasks.length - 1; i >= 0; i--) {
								if($scope.completedTasks[i].taskName === task.taskName) {
									$scope.completedTasks.splice(i, 1);
								}
							}
							
						}
					}
					
				}, function(reason) {
					console.log("error occured : "+reason);
				}, function(value) {
					console.log("no callback");
				});
			};
			
		}
]);