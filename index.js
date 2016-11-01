/**
 * Created by liuqi453 on 10/24/16.
 */
var injector = require('inject-snippet')
var gutil = require('gulp-util')
var through = require('through2')
var fs = require('fs')
var beautify = require('js-beautify')

function smartInject(str, snippet, entry, mode) {
    entry = entry ? ':' + entry : ''
    var startTag = '/* inject' + entry + ' start */',
        endTag = '/* inject' + entry + ' end */'

    switch (mode) {
        case 'append':
            snippet = (snippet || '') + '\n' + startTag + '\n' + endTag
            break;
        case 'prepend':
            snippet = startTag + '\n' + endTag + '\n' + (snippet || '')
            break;
        default:
            snippet = startTag + '\n' + (snippet || '') + '\n' + endTag
    }

    var reg = new RegExp('\\/\\*\\s*inject' + entry + '\\s*start\\s*\\*\\/\\s*[\\s\\S]*\\s*\\/\\*\\s*inject' + entry + '\\s*end\\s*\\*\\/', 'mg')

    if(!reg.test(str)){
        console.log('Inject failed...')
    }

    str = str.replace(reg, function () {
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
    return through.obj(function (file, enc, cb) {
        if (file.isNull()) {
            cb(null, file)
            return
        }

        if (file.isStream()) {
            cb(new gutil.PluginError('gulp-snippet-injector', 'Streaming not supported'))
            return
        }

        var tempContents = file.contents.toString();

        if (Array.isArray(options)) {
            options.forEach(function (option) {
                tempContents = smartInject(tempContents, option.code || '', option.entry || '', options.mode)
            })
        } else {
            tempContents = smartInject(tempContents, options.code || '', options.entry || '', options.mode)
        }

        tempContents = beautify(tempContents, {indent_size: 2})

        file.contents = new Buffer(tempContents)
        cb(null, file)
    })
}

function inject(filePath, opts, distPath) {
    if (!filePath) {
        console.log('file path is required!!')
        return
    }

    var contents = fs.readFileSync(filePath, 'utf-8'),
        temp = contents;

    if (!Array.isArray(opts)) {
        temp = smartInject(temp, opts.code || '', opts.entry || '', opts.mode);
    } else {
        opts.forEach(function (opt) {
            temp = smartInject(temp, opt.code || '', opt.entry || '', opt.mode);
        })
    }

    temp = beautify(temp, {indent_size: 2})

    fs.writeFile(distPath || filePath, temp, 'utf-8', function (err) {
        if (err) {
            console.log(err)
        } else {
            console.info(filePath + ' done.')
        }
    })
}

module.exports.inject = inject
