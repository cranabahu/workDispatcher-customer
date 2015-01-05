Meteor.publish('TaskList', function () {
    return TaskList.find();
});


Meteor.methods({
   'login': function (custId,password) {
       var URL = "http://localhost:3000/api/findCustomer/"+custId;
       var result = HTTP.call("PUT", URL);

       if(result.statusCode==200) {
           var respJson = result.data;
           console.log("response received.");
           console.log(respJson);
           return respJson;
       } else {
           console.log("Response issue: ", result.statusCode);
           var errorJson = result.data;
           throw new Meteor.Error(result.statusCode, errorJson.error);
       }
   },

    'newTask':function(customerVar,custFullAddrVar,custAddrVar,custContactVar,repairPartVar,severityVar,taskDuedateVar,taskDescVar,custLat,custLng,createdByvar){
        var enteredDateVar = moment(new Date()).format('YYYY-MM-DD');
        var assigneeVar = "";
        var estimationVar = 0;
        var taskStatus = "New";
        var taskId   = 10001;
        if (TaskList.find().count() >  0) {
            var maxTaskCursor = TaskList.findOne({}, {sort: {taskId: -1}});
            taskId = maxTaskCursor.taskId + 1;
        }

        var taskData = {
            taskId: taskId,
            customer: customerVar,
            custFullAddr: custFullAddrVar,
            custAddr: custAddrVar,
            lat: custLat,
            lng: custLng,
            custContact: custContactVar,
            repairPart: repairPartVar,
            desc: taskDescVar,
            serverity: severityVar,
            status: taskStatus,
            assignee: assigneeVar,
            dueDate: taskDuedateVar,
            estimation: estimationVar,
            entryDate: enteredDateVar,
            createdBy: createdByvar
        };

        TaskList.insert(taskData);

        var body = {data:taskData};
        var URL = "http://localhost:3000/api/insert/task";
        var result = HTTP.call("PUT", URL,body);

        if(result.statusCode==200) {
            var respJson = result.data;
            console.log("response received.");
            console.log(respJson);
        } else {
            console.log("Response issue: ", result.statusCode);
            var errorJson = result.data;
            throw new Meteor.Error(result.statusCode, errorJson.error);
        }

        return "Task "+taskId+" Created.";
    }
});
