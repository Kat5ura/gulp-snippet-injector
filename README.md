# gulp-replace

> A js snippet injector plugin for gulp

## Usage

First, install `gulp-snippet-injector` as a development dependency:

```shell
npm install --save-dev gulp-snippet-injector
```

Then, add it to your `gulpfile.js`:

### gulp task code
```javascript
var injector = require('gulp-snippet-injector');

gulp.task('injectSnippet', function(){
  gulp.src(['file.js'])
    .pipe(injector({
        code: 'console.log("Hello world");',
        entry: 'helloType'
    })
    .pipe(gulp.dest('build/file.js'));
});

gulp.task('injectAppend', function(){
  gulp.src(['file.js'])
    .pipe(injector({
        code: 'console.log("Hello world");',
        entry: 'appendEntry',
        mode: 'append'
    })
    .pipe(gulp.dest('build/file.js'));
});

```
### file.js
```javascript
// ..... some code

/* inject:helloEntry start */

// your snippet will be injected into this field 

/* inject:helloEntry end */

/* inject:appendEntry start */

/* inject:appendEntry end */

// your snippet will be injected into this field 

// ..... some code
```


## API

gulp-snippet-injector need one argument, which is an ***Object*** telling the gulp the snippet you want to inject and the type of your snippet.

### injector([options])

#### options
Type: `Object or [Object]`

##### options.code

Type: `String`  

Default: `''`

Description: `The code snippet you want to inject into the target js file.`

#### options.entry

Type: `String`

Default: `''`

Description: `A string you can use to distinguish the entry where your snippet inject into. `

#### options.mode

Type: `String` | `inside / append / prepend`

Default: `''`

Description: `A string you can use to specify a mode, code can be appended or prepended to the entry, default is inside the entry`

### inject(filePath, [options], disPath)

You can use a exported function named ***inject*** via:

```javascript

var inject = require('gulp-snippet-inject').inject

inject('path/to/file.js', {
    code: 'console.log("Hello world!")',
    entry: 'helloEntry'
})

```

## License

MIT