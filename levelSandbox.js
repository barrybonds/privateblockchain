let level = require('level');
let chainDB = './chaindata';
let db = level(chainDB);

//Add data to levelDb with key/value pair
function addLevelDBData(key,value){
db.put(key, value, function(err){
    if (err) return console.log('Block ' +key + ' submission failed', err);
})
}

//Get data from levelDB with key
function getLevelDBData(key){
db.get(key, function(err){
  if(err) return console.log('Block' + key + 'submission failed', err);
})
}

function addDataToLevelDB(value)
{
    let i = 0;
    db.createReadStream().on('data', function(data){
        i++;
    }).on('error', function(err){
        return console.log('Unable to read data stream', err)
    }).on('close', function(){
        console.log('Block #' + i);
        addLevelDBData(i, value);
    });
}

//Some self invoking func to test
(function theLoop (i) {
 setTimeout(function(){
    addDataToLevelDB('Testing data');
if (--i) theLoop(i);
 }, 100);
})(10);
