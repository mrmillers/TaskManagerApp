// Data format
// {title, type, progress}

angular.module('manager.service',[]).factory('dataService',['$window',function($window){
	$window.localStorage['task'] = JSON.stringify([{title: "task",progress:75,type: 1,total:1000}]);
	var taskData = {
		data : [],
		load : function(){
			this.data = JSON.parse($window.localStorage['task'] || '[]');
		},
		save : function(){
			$window.localStorage['task'] = JSON.stringify(this.data);
		},
		delete : function(index) {
			this.data.splice(index,1);
			this.save();
		},
		add : function(task){
			this.data.push(task);
			this.save();
		},
		update : function(index,task) {
			this.data[index] = task;
			this.save();
		},
		getEmptyData : function(){
			return {
				title: "",
				progress: 0,
				marks: [],
				total: 1,
				type: 1
			}
		}
	};
	
	taskData.load();

	return taskData;
}]);