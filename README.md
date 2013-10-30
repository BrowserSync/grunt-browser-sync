# grunt-browser-sync

> A grunt task for the [browser-sync](https://github.com/shakyShane/browser-sync) module.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins.

##About
**Live CSS-injecting & Browser Syncing**

This plugin can watch your files and inject CSS when they change.
It can also keep the following in sync:

**links**  - When you click a link in one browser (say, Chrome on desktop), all of the other browsers you have open will navigate to the same link.

**scroll** - When you scroll a website in one browser, all the others will follow suit. (very useful when developing with multiple monitors/devices )

**forms**  - When you fill out a form, all connected browsers will populate their forms with what you type in real-time. (currently working for
text-inputs, text areas, selects, radios & checkboxes)

##Install

```shell
npm install grunt-browser-sync --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-browser-sync');
```
##Config
Here's an example of the simplest configuration possible. This will give you a HTML snippet to paste into your website & will you allow you to work with any server setup (such as MAMP,  WAMP or anything else). So if you are working on a Wordpress website, for example, this is the option for you.

```
browser_sync: {
    files: {
        src : 'assets/css/style.css'
    }
}
```
##Important: Using browser-sync + grunt watch
If you are using both of these, scroll down to the **watchTask** option below to see how to config them to be used together!

## with a server
You can use this plugin as a server too (for static HTML, JS & CSS)! This is the easiest option because the plugin will automatically insert the html snippet into your pages for you.

```
browser_sync: {
    files: {
        src : 'assets/css/style.css'
    },
    options: {
    	server: {
    		baseDir: "app"
    	}
    }
},
```


##Run

`grunt browser_sync`

When you've used one of the configs from above, run this command from the terminal and you'll be good to go (if you are using the built-in server). If you are not using the built in server, (because your site is on PHP or something else), just grab the HTML snippet from the command line and paste it into your site just before the closing `</body` tag

##Options

Here's another example config with options, each will be explained after.

```js
browser_sync: {
    files: {
        src : 'assets/css/style.css'
    },
    options: {
        watchTask: false,
        debugInfo: true,
        host: "192.168.0.7",
        server: {
        	baseDir: "app"
        }
    },
},
```
###watchTask (default: *false*)
Browser Sync is not a replacement for regular `watch` tasks (such as compiling SASS, LESS etc), they are designed to be used together. If you intend to do this, set this option to true and be sure to call the `watch` task AFTER `browser_sync`. For example, to compile SASS and then inject the CSS into all open browsers (without a page refresh), your config for all three tasks might look something like this:


```js
// This shows a full config file!
module.exports = function (grunt) {
    grunt.initConfig({
        watch: {
            files: "assets/scss/**/*.scss",
            tasks: ['compass'],
        },
        compass: {
            dist: {
                options: {
                    sassDir: 'assets/scss',
                    cssDir: 'assets/css',
                    outputStyle: 'compressed',
                },
            },
        },
        browser_sync: {
            files: {
                src : 'assets/css/*.css',
            },
            options: {
                watchTask: true,
            },
        },
    });

    // load npm tasks
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');

    // create custom task-list
    grunt.registerTask('default', ["browser_sync", "watch"]);
};
```

###debugInfo (default: *true*)
By default, the task will inform you when a file has been changed & when browsers are connected. This can sometimes cause a lot of output to the console and if you don't want that, set this option to false.

```js
grunt.initConfig({
    browser_sync: {
        files: {
            src : 'app/assets/css/*.css',
        },
    },
});
```

###host (default: *null*)
Browser Sync will attempt to figure out the correct external IP to use on your network. Occasionally though, it may select
one that cannot be accessed on any other devices (just the machine you are developing on). If this happens, and you know exactly
which IP to use on your network, you can plug it in here.

For example:

```js
grunt.initConfig({
    browser_sync: {
        files: {
            src : 'app/assets/css/*.css',
        },
        options: {
            host : "192.168.0.1"
        },
    },
});
```
> A quick word on hosts...
The power of Browser Sync comes when you have multiple devices/browsers connected. To do this, you use your networks IP instead of `localhost`. For example, you may have a php/node/mamp server running at `localhost:8000`. Swap out the localhost part for something like `192.168.0.1` (find yours by running `ifconfig` on Mac, `ipconfig` on Windows) and you can connect to **192.168.0.1:8000**. Now, with Browser Sync running, you can have as many browsers/devices connected and they will all live-update when you change a file.

###ghostMode (default: *false*) **Experimental**
There are currently three options for **ghostMode** `scroll`, `links` & `forms`

- Scroll. Enable this and your connected browsers will attempt to keep in sync
- Links. Enable this and your connected browsers will follow each other around. (note: this could be problematic if you already have click events
on `<a>` elements. It's designed to just make it easy to view multiple pages in the same site and have all browsers keep in sync while in development.
- Forms Enable this and your connected browsers will keep all form inputs in sync

```js
grunt.initConfig({
    browser_sync: {
        files: {
            src : 'app/assets/css/*.css',
        },
        options: {
            host : "192.168.0.1",
            ghostMode: {
                scroll: true,
                links: true,
                forms: true
            }
        },
    },
});
```
###server (default: *false*)
Using the `server` option negates the need for the HTML snippet as it will be injected automatically (no browser plugins needed!). Just provide the base directory where you want to serve your files from and you'll be good to go!.

```js
grunt.initConfig({
    browser_sync: {
        files: {
            src : 'app/assets/css/*.css',
        },
        options: {
            host : "192.168.0.1",
			server: {
        		baseDir: "app"
        	}
        },
    },
});

```
###server.index (default: *false*)
If you are using the server feature & for some reason your index page is NOT 'index.html', you can specify which file to load instead.
```js
grunt.initConfig({
    browser_sync: {
        files: {
            src : 'app/assets/css/*.css',
        },
        options: {
            host : "192.168.0.1",
			server: {
        		baseDir: "app",
        		index: "index.htm" - Notice the use of htm
        	}
        },
    },
});
```

##Live Reload
Browser Sync injects CSS into all connected browsers without reloading the page & it even works on VMs running IE 7 & 8! But that's not all it does. It can also live-inject jpg & png files too, as well as perform a hard refresh for JS, PHP, HTML files etc. For example:

```js
grunt.initConfig({
    browser_sync: {
        files: {
            src : [
                'assets/css/*.css',
                'assets/img/**/*.jpg',
                'assets/img/**/*.png',
                'assets/js/**/*.js',
                '**/*.php',
                '**/*.html',
            ],
        },
    },
});
```

###Support
Please contact me (raise an issue) if you have any problems getting up and running with this. I'll be happy to help :)

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
0.2.0 - rename project to grunt-browser-sync
0.1.7 - Added 'open' for automatically opening browser when 'server' option is used.
0.1.6 - Added Built-in server with middleware for injecting snippet
0.1.4 - refined ghost-mode and added scroll
0.1.3 - Added initial implentation of Ghost-mode (link)
0.1.1 - Bug fixes release
0.1.0 - initial release
