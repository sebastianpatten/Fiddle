var fileSystem = require("fs");
var winston = require("winston");
var chokidar = require('chokidar');

var FileWatcher = function(path) {
    if(!path) throw new Error("The path to the file was null or undefined.");

    var self = this;
    this.path = path;

    var watcher = chokidar.watch(this.path, {ignored: /^\./, persistent: true});

    watcher.on("change", function() {
        winston.info("Rules file changed.")
        self.readFile();
    });
};

FileWatcher.prototype.readFile = function() {
    var self = this;
    fileSystem.readFile(self.path, 'utf8', function(error, data) {
        winston.info("Successfully read rules file.");
        self.callback(error, data);
    });
};

FileWatcher.prototype.onFileRead = function(callback) {
    var self = this;
    self.callback = callback;
};

module.exports = FileWatcher;