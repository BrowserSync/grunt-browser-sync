var exec   = require("child_process").spawn;
var http   = require("http");
var assert = require("chai").assert;

describe("Running server", function () {
    it("running server from grunt", function (done) {
        var instance = exec("grunt", ["browserSync:server"]);
        instance.stdout.on("data", function (data) {
            var string = data.toString().split(" ");
            var url;

            if (string[1] === "Local") {
                url = string[3];
                var opts = require("url").parse(url);
                opts.headers = {
                    accept: "text/html"
                };
                http.get(opts, function (res) {
                    var chunks = [];
                    res.on("data", function (chunk) {
                        chunks.push(chunk.toString());
                    });
                    res.on("end", function () {
                        instance.kill();
                        assert.include(chunks.join(""), "/browser-sync/browser-sync-client");
                        done();
                    })
                })
            }
        });
    });
});