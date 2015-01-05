/**
 * Created by cranabahu on 1/4/15.
 */



Router.route('/', function () {
    this.render('login');
});
Router.route('/newTask', function () {
    if (!Session.get("customer")){
        Router.go('/');
    }else{
        this.render('newTask');
    }

});