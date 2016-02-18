Router.route('/', {
  name: 'home'
});

Router.route('/importCsv', {
    name: 'importCsv',
    controller: 'ImportCsvController',
    waitOn:function(){
        Meteor.subscribe('country');
        return [];
    }
});

Router.route('/dashboard', {
  name: 'dashboard',
  controller: 'DashboardController'
});

Router.plugin('ensureSignedIn', {
  only: ['dashboard']
});
