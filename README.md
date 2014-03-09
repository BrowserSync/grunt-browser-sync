# grunt-browser-sync [![NPM version](https://badge.fury.io/js/grunt-browser-sync.png)](http://badge.fury.io/js/grunt-browser-sync)

> A grunt task for the [browser-sync](https://github.com/shakyShane/browser-sync) module.

Follow [@browserSync](http://www.twitter.com/browserSync) for news & updates.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins.

##About

For a full list of features, please visit [https://github.com/shakyShane/browser-sync](https://github.com/shakyShane/browser-sync)


##Install

```shell
npm install grunt-browser-sync --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-browser-sync');
```

##Config
Here's an example of the simplest configuration possible. This will give you a HTML snippet to paste into the footer of your website to enable browser-sync.

```
browserSync: {
    files: {
        src : 'assets/css/style.css'
    }
}
```

Here's a [full list of available options.](https://github.com/shakyShane/browser-sync/wiki/options)

###Screencasts ( < 3 min each )


Browser-sync + Jekyll + Sass

1. [Browser-Sync + Jekyll + SASS Part: 1 - Example](http://quick.as/3v0sop3)
2. [Browser-Sync + Jekyll + SASS Part: 2 - Configuration](http://quick.as/5g9c1jx)
3. [Browser-Sync + Jekyll + SASS Part: 3 - Alternative Workflow](http://quick.as/ogrclvd)

Browser-sync + CabinJS

1. [Browser-Sync + CabinJS](http://quick.as/qq9cnl1)


Want any more? Something specific? ask me nicely [@shaneOsbourne](http://www.twitter.com/shaneOsbourne)

##Important: Using browser-sync + grunt watch
If you are using both of these, scroll down to the **watchTask** option below to see how to config them to be used together!

## + static file server
You can use this plugin as a server too (for static HTML, JS & CSS). When using the Server option, the snippets are automatically injected for you.

```
browserSync: {
    dev: {
        bsFiles: {
            src : 'assets/css/style.css'
        },
        options: {
            server: {
                baseDir: "app"
            }
        }
    }
},
```

## + your own php/mamp/wamp/rails server (proxy) (version 0.7.0 required)
If you already have a local server setup (with your vhosts etc), just tell browser-sync all about it & it will do the rest for you.

```
browserSync: {
    dev: {
        bsFiles: {
            src : 'assets/css/style.css'
        },
        options: {
            proxy: "local.dev"
        }
    }
},
```
Using the **proxy** option will give you an IP address that you can access from any device/computer on your network automagically.


##bsFiles - explained (version > 0.4.3 required)

You may be wondering why browser-sync accepts a `bsFiles` property (see the examples below)… It's because browser-sync has it's own file-watching functionality built in & you can skip grunt doing file look-ups by changing the regular **files** property to **bsFiles**. (this also allows browser-sync to respond to newly added files, like grunt-contrib-watch does)

##Run

`grunt browserSync`

When you've used one of the configs from above, run this command from the terminal and you'll be good to go (if you are using the built-in server). If you are not using the built in server or the proxy, (because your site is on PHP or something else), just grab the HTML snippet from the command line and paste it into your site just before the closing `</body` tag


##Options

Here's another example config with options, each will be explained after.

```js
browserSync: {
    dev: {
        bsFiles: {
            src : 'assets/css/style.css'
        },
        options: {
            watchTask: false,
            debugInfo: true,
            host: "192.168.0.7",
            server: {
                baseDir: "app"
            }
        }
    }
},
```
###watchTask (default: *false*)
Browser Sync is not a replacement for regular `watch` tasks (such as compiling SASS, LESS etc), they are designed to be used together. If you intend to do this, set this option to true and be sure to call the `watch` task AFTER `browserSync`. For example, to compile SASS and then inject the CSS into all open browsers (without a page refresh), your config for all three tasks might look something like this:


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
                    outputStyle: 'compressed'
                }
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src : 'assets/css/*.css'
                },
                options: {
                    watchTask: true
                }
            }
        }
    });

    // load npm tasks
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');

    // create custom task-list
    grunt.registerTask('default', ["browserSync", "watch"]);
};
```

###host (default: *null*)
Browser Sync will attempt to figure out the correct external IP to use on your network. Occasionally though, it may select
one that cannot be accessed on any other devices (just the machine you are developing on). If this happens, and you know exactly
which IP to use on your network, you can plug it in here.

For example:

```js
grunt.initConfig({
    browserSync: {
        dev: {
            bsFiles: {
                src : 'app/assets/css/*.css'
            },
            options: {
                host : "192.168.0.1"
            }
        }
    }
});
```
> A quick word on hosts...
The power of Browser Sync comes when you have multiple devices/browsers connected. To do this, you use your networks IP instead of `localhost`. For example, you may have a php/node/mamp server running at `localhost:8000`. Swap out the localhost part for something like `192.168.0.1` (find yours by running `ifconfig` on Mac, `ipconfig` on Windows) and you can connect to **192.168.0.1:8000**. Now, with Browser Sync running, you can have as many browsers/devices connected and they will all live-update when you change a file.

###ports (default: null)
Browser-sync will detect up to 3 available ports to use within a fixed range. You can override this if you need to by supplying min & max values.

```js
grunt.initConfig({
    browserSync: {
        dev: {
            bsFiles: {
                src : 'app/assets/css/*.css'
            },
            options: {
                ports: {
                    min: 6000,
                    max: 6100
                }
            }
        }
    }
});
```

###ghostMode (default: *true*)
There are currently 4 options for **ghostMode** `clicks`, `scroll`, `links` & `forms`
- Clicks. *alpha* All clicks will be mirrored across devices.
- Scroll. Enable this and your connected browsers will attempt to keep in sync
- Links. Enable this and your connected browsers will follow each other around. (note: this could be problematic if you already have click events
on `<a>` elements. It's designed to just make it easy to view multiple pages in the same site and have all browsers keep in sync while in development.
- Forms Enable this and your connected browsers will keep all form inputs in sync

```js
grunt.initConfig({
    browserSync: {
        dev: {
            bsFiles: {
                src : 'app/assets/css/*.css'
            },
            options: {
                host : "192.168.0.1",
                ghostMode: {
                    clicks: true,
                    scroll: true,
                    links: true,
                    forms: true
                }
            }
        }
    }
});

```
###server (default: *false*)
Using the `server` option negates the need for the HTML snippet as it will be injected automatically (no browser plugins needed!). Just provide the base directory where you want to serve your files from and you'll be good to go!.

```js
grunt.initConfig({
    browserSync: {
        dev: {
            bsFiles: {
                src : 'app/assets/css/*.css'
            },
            options: {
                host : "192.168.0.1",
                server: {
                    baseDir: "app"
                }
            }
        }
    }
});

```
###server.index (default: *false*)
If you are using the server feature & for some reason your index page is NOT 'index.html', you can specify which file to load instead.
```js
grunt.initConfig({
    browserSync: {
        dev: {
            bsFiles: {
                src : 'app/assets/css/*.css'
            },
            options: {
                host : "192.168.0.1",
                server: {
                    baseDir: "app",
                    index: "index.htm"
                }
            }
        }
    }
});
```

##Live Reload
Browser Sync injects CSS into all connected browsers without reloading the page & it even works on VMs running IE 7 & 8! But that's not all it does. It can also live-inject jpg & png files too, as well as perform a hard refresh for JS, PHP, HTML files etc. For example:

```js
grunt.initConfig({
    browserSync: {
        dev: {
            bsFiles: {
                src : [
                    'assets/css/*.css',
                    'assets/img/**/*.jpg',
                    'assets/img/**/*.png',
                    'assets/js/**/*.js',
                    '**/*.php',
                    '**/*.html'
                ]
            }
        }
    }
});
```


##Support
If you've found Browser-sync useful and would like to contribute to its continued development & support, please feel free to send a donation of any size - it would be greatly appreciated!

[![Support via Gittip](https://rawgithub.com/chris---/Donation-Badges/master/gittip.jpeg)](https://www.gittip.com/shakyshane)
[![Support via PayPal](https://rawgithub.com/chris---/Donation-Badges/master/paypal.jpeg)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=shakyshane%40gmail%2ecom&lc=US&item_name=browser%2dsync)

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).