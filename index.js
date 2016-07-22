var HumixSense = require('node-humix-sense');

var config = {
    "moduleName" : "sample",
    "commands" : ["command1", "command2"],
    "events" : ["event1", "event2"],
    "log" : [
      {
        file : './humix-sample-module.log',
        level : 'info'
      }
    ],
    "debug" : true
};

var humix = new HumixSense(config);
var hsm;

humix.on('connection', function(humixSensorModule){
    hsm = humixSensorModule;
    var log = hsm.getLogger();

    log.info('Communication with humix-sense is now ready.');

    hsm.on("command1", function (data) {
        log.info('do something with command1. data:'+data);
    })

    hsm.on("command2", function (data) {
        log.info('do something with command2. data:'+data);
    })

});

// publish a dummy data in every 5 seconds.
setInterval(function () {

    if (hsm) {
        var data = {'a':'b'}
        hsm.event('event1', data);
    }

}, 5000);
