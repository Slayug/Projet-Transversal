Meteor.publishComposite("categories", function() {
  return {
    find: function() {
      return Categories.find({});
    }
  }
});
