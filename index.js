/**
 * Created by liuqi453 on 10/24/16.
 */
var injector = require('inject-snippet')
var gutil = require('gulp-util')
var through = require('through2')
var fs = require('fs')
var beautify = require('js-beautify')

function smartInject(str, snippet, type) {
    type = type ? ':' + type : ''
    var startTag = '/* inject' + type + ' start */',
        endTag = '/* inject' + type + ' end */'

    snippet = startTag + '\n' + (snippet || '') + '\n' + endTag

    var reg = new RegExp('\\/\\*\\s*inject'+ type +'\\s*start\\s*\\*\\/\\s*[\\s\\S]*\\s*\\/\\*\\s*inject'+ type +'\\s*end\\s*\\*\\/', 'mg')

    console.log(type + ' ' + reg.test(str))

    str = str.replace(reg, function (word) {
        return `${startTag}
      snippet
    ${endTag}
    `
    })

    return injector(str, snippet, {
        stripTags: true,
        delimiters: [startTag, endTag]
    })

}


module.exports = function (options) {

    var code = options.code || '',
        type = options.type || ''

    return through.obj(function (file, enc, cb) {
        if (file.isNull()) {
            cb(null, file)
            return
        }

        if (file.isStream()) {
            cb(new gutil.PluginError('gulp-inject-snippet', 'Streaming not supported'))
            return
        }

        var newContents = beautify(smartInject(file.contents.toString(), code, type), {})
        file.contents = new Buffer(newContents)
        cb(null, file)
    })
}

function inject (filePath, opts) {
    var contents = fs.readFileSync(filePath, 'utf-8'),
        temp = contents;

    if(!Array.isArray(opts)){
        console.log('Second argument should be an array!!')
        return
    }

    opts.forEach(function (opt) {
        temp = smartInject(temp, opt.code || '', opt.type || '');
    })

    temp = beautify(temp, {indent_size: 2})

    fs.writeFile(filePath, temp, 'utf-8', function (err) {
        if (err) {
            console.log(err)
        }else {
            console.info(filePath + ' successfully proceeded')
        }
    })

}

module.exports.inject = inject
