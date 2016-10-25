/**
 * Created by liuqi453 on 10/25/16.
 */
var inject = require('../index').inject

inject(__dirname + '/sample.js', [{
    code: 'console.log("Default Code here")\n'
},{
    code: 'console.log("Sample Code here")\n',
    type: 'sample'
},{
    code: 'console.log("Append Code here")\n',
    type: 'append',
    mode: 'append'
}])


inject(__dirname + '/sample-with-dist.js', [{
    code: 'console.log("Default Code here")\n'
},{
    code: 'var a = "ss"; if(a == "ss"){console.log("Sample Code here")}',
    type: 'sample'
},{
    code: 'var a = "ss"; if(a == "ss"){console.log("Append Code here")}',
    type: 'append',
    mode: 'append'
}], __dirname + '/sample-dist.js')

