var HumixSense = require('humix-sense');

var config = {
    "moduleName" : "temporature",
    "commands" : [ "start"],
    "events" : ["temporature"],
    "moduleEvents":["higher"],
    "log" : [

      {
        file : './humix-sample-module.log',
        level : 'info'
      }
    ],
    "debug" : true,
    "natsIp": ""//If empty, means your humix-sense is in the localhost, if not you can fill this p
};

var humix = new HumixSense(config);
var hsm;
var basedTemporature=20;
var tempBroadCast;
humix.on('connection', function(humixSensorModule){
    hsm = humixSensorModule;
    var log = hsm.getLogger();

    // command1 is a sync command. 
    // When finished, the result is passed back to humix-think via 
    // the 'done' callback. 

  


    hsm.onModuleEvent("higher", function (data) {

       
        if(data){

       
        basedTemporature+=parseInt(data);
       
        }
        else 
        basedTemporature+=1;
    });

  
    hsm.on("start",function(data){
   
        tempBroadCast=setInterval(function () {

            

            if (hsm) {          
                var temp = Math.floor(Math.random() * 5 + basedTemporature);
                var data = { "d": { "name": "temporature", "temperature": temp } };

                console.log('send data : ' + JSON.stringify(data));
                hsm.event('temporature', data);
            }

        }, 1000);
    });

    hsm.moduleCommand('another module name','command','data');
    hsm.moduleEvent('moduleEvent name','data');


});

