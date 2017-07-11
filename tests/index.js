

const AddStaticCachePlugin = require('../index')
const assert = require('assert')

const _AddStaticCachePlugin = new AddStaticCachePlugin({
    cacheName: "test.appcache"
})
describe('Test', function () {
    let _testArray_ = {}
    beforeEach(() => {
        _testArray_ = {
            'js': ['a.js', 'b.js', 'c.js'],
            'css': ['a.css', 'b.css', 'c.css'],
            'images': ['a.jpg', 'b.png', 'c.gif']
        }
        describe('replaceFileData()',()=>{
            it('replaceFileData',()=>{
                assert(
                    _AddStaticCachePlugin.replaceFileData(_AddStaticCachePlugin.tpl)
                    (Date.now())
                    (_testArray_['css'])
                    ()
                    (_testArray_['images'])
                    (_testArray_['js'])
                    ('test comments')
                )

            })
        })
    })
})