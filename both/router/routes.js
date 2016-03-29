Router.route('/', {
  name: 'home',
  waitOn: function( ){
      Meteor.subscribe('indicators');
      Meteor.subscribe('countries');
      Session.set( "countries", [ {name_fr: "France", code: "FR", name_en: "France" } ] );
      Session.set( "indicators", [ "SP.POP.TOTL" ] );
      Session.set( "typeChoice", "evolution" );
      Session.set( "indicatorSelected", "SP.POP.TOTL" );
      Session.set( "yearSelected", "2010" );
      Session.setDefault( "countriesClassement", [] );
      return [];
  },
  subscriptions: function(){
      this.subscribe('categories');
  }
});
