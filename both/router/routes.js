Router.route('/', {
  name: 'home',
  waitOn: function( ){
      Meteor.subscribe('indicators');
      Meteor.subscribe('countries');
      Session.set( "countries", [ {name_fr: "France", code: "FR", name_en: "France" } ] );
      Session.set( "indicators", [ "SP.POP.TOTL" ] );
      Session.set( "typeChoice", "evolution" );
      Session.set( "indicatorSelected", "SP.POP.TOTL" );
      Session.setDefault( "countriesClassement", [] );
      return [];
  },
  subscriptions: function(){
      this.subscribe('categories');
  }
});
Router.route( '/classement', {
    name: 'classement',
    controller: 'ManageClassementController',
    waitOn: function( ){
        Meteor.subscribe( 'indicators' );
        Meteor.subscribe( 'countries' );
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
