Router.route('/', {
  name: 'home'
});

Router.route('/importIndicator', {
    name: 'importIndicator',
    controller: 'ImportIndicatorController'
});

Router.route('/dashboard', {
  name: 'dashboard',
  controller: 'DashboardController'
});

Router.plugin('ensureSignedIn', {
  only: ['dashboard']
});
