var HumixSense = require('humix-sense');

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

    // command1 is a sync command. 
    // When finished, the result is passed back to humix-think via 
    // the 'done' callback. 

    hsm.on("command1", function (data, done) { 
     
        console.log('do something with command1. data:'+data);
        done('i am done');
               
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
