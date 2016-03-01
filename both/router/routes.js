Router.route('/', {
  name: 'home'
});

Router.route('/importIndicator', {
    name: 'importIndicator',
    controller: 'ImportIndicatorController',
    waitOn:function(){
        Meteor.subscribe('indicators');
        return [];
    }
});

Router.route('/dashboard', {
  name: 'dashboard',
  controller: 'DashboardController'
});
