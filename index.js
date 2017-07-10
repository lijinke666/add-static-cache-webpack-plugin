function AddStaticCachePlugin (options){

}
AddStaticCachePlugin.prototype.apply = function(compiler){
    compiler.plugin('done',()=>{
        console.log('===== test =====');
    })
}

module.exports = AddStaticCachePlugin