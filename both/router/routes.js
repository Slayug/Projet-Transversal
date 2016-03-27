Router.route('/', {
  name: 'home',
  waitOn: function( ){
      Meteor.subscribe('indicators');
      Meteor.subscribe('countries');
      return [];
  },
  subscriptions: function(){
      this.subscribe('categories');
  }
});

Router.route('/manageIndicator', {
    name: 'manageIndicator',
    controller: 'ManageIndicatorController',
    waitOn:function(){
        Meteor.subscribe('indicators');
        Meteor.subscribe( 'functionClassement' );
        return [];
    },
    subscriptions:function(){
        this.subscribe('categories');
    }
});
Router.route('/showIndicator', {
    name: 'showIndicator',
    controller: 'showIndicatorController',
    waitOn: function( ){
        Meteor.subscribe('indicators');
        return[];
    }
});

Router.route('/dashboard', {
  name: 'dashboard',
  controller: 'DashboardController'
});
Router.route('/manageCountries', {
    name: 'manageCountries',
    controller: 'ManageCountriesController',
    waitOn:function(){
        Meteor.subscribe('countries');
        return [];
    }
});
