Meteor.subscribe('TaskList');

Session.setDefault('customer',null);

Template.login.events({
   'submit .frmLogin': function (event) {
       event.preventDefault();
       var userName = event.target.custId.value;
       var passWord = event.target.passWord.value;
       Meteor.call('login',userName, passWord, function(error,result){
           if (!error){
               if (result !== null){
                   Session.set("customer",result);
                   console.log(result);
                   Router.go("/newTask");
               }
               else{
                   console.log("Login failed");
               }
           }
           else{
               console.log(error);
           }
       });

   }
});

//##############################################################

Template.newTask.rendered = function () {
    $('#frmNewTask').parsley({trigger: 'change'});
};

Template.newTask.helpers({
    'taskInfo':function(){
        return Session.get('taskInfo');
    }
});

Template.newTask.events({
    'submit .frmNewTask':function(event){

        event.preventDefault();
        var customer = Session.get("customer");

        var customerVar = customer["name"];
        var custFullAddrVar = customer["address"];
        var custAddrVar = customer["branch"];
        var custContactVar = customer["contact"];
        var createdByvar = customer["custId"];
        var repairPartVar = event.target.repairPart.value;
        var severityVar = event.target.severity.value;
        var taskDuedateVar = event.target.taskDuedate.value;
        var taskDescVar = event.target.taskDesc.value;
        var custLat     = customer["lat"];
        var custLng     = customer["lng"];

        Meteor.call('newTask',customerVar,custFullAddrVar,custAddrVar,custContactVar,repairPartVar,severityVar,taskDuedateVar,taskDescVar,custLat,custLng,createdByvar,function(error,result){
            if (error){
                console.log(error.result);
            }
            else{
                Session.set('taskInfo',result);
                event.target.repairPart.value = null;
                event.target.serverity.value = null;
                event.target.taskDuedate.value = null;
                event.target.taskDesc.value = null;
            }
        });
    },

    'click .repairPart': function () {
        Session.set('taskInfo',"");
    }
});