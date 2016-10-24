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
        type: 'helloType'
    })
    .pipe(gulp.dest('build/file.js'));
});
```
### file.js
```javascript
// ..... some code

/* inject:helloType start */

// your snippet will be injected into this field 

/* inject:helloType end */

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

Description: `The code snippet you want to inject into the target js file`

#### options.type

Type: `String`

Default: `''`

Description: `A string you can use to distinguish the entry your snippet inject into `


### inject(filePath, [options])

You can use a exported function named ***inject*** via:

```javascript

var inject = require('gulp-snippet-inject').inject

inject('path/to/file.js', {
    code: 'console.log("Hello world!")',
    type: 'helloType'
})

```