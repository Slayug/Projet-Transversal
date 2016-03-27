FunctionClassement = new Mongo.Collection( 'functionClassement' );

FunctionClassement.helpers({});

FunctionClassement.allow({
    insert:function(){
        return true;
    },
    update:function(){
        return true;
    },
    remove:function(){
        return true;
    }
});
