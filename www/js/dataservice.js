// Data format
// {title, type, progress}

angular.module('manager.service',[]).factory('dataService',[],function(){
	function DataType(data){
		this.title = data.title;
		this.progress = data.progress;

	}
	var taskData = {
		data : [],
		load : function(){
			this.data = JSON.parse(window.localStorage['task'] || '[{title:"test",progress:75}]');
		},
		save : function(){
			window.localStorage['task'] = JSON.stringify(this.data);
		},
		alert : function(){ alert("abc"); },
		getData : function(index){
			return new DataType(this.data[index]);
		}
	};
	taskData.load();
	return taskData;
});