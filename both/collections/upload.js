Uploads = new FS.Collection('Uploads',
	{stores:[new FS.Store.FileSystem('Uploads',
	{path:'/imports'})]
});
Uploads.allow({
	insert:function(){
		return true;
	},
	update:function(){
		return true;
	},
	remove:function(){
		return true;
	},
	download:function(){
		return true;
	}
})
