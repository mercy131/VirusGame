// модули
let express = require('express');
const  read  = require('fs');
let app = express();
let server = require('http').createServer(app);
let io = require('socket.io')(server);
const fs = require('fs');



server.listen(3000);
console.log("port: 3000");

players =0;
app.get('/', function(request, respons) {
    if (players === 0) {
        respons.sendFile(__dirname + '/start.html');
    } else {
        respons.sendFile(__dirname + '/connect.html');
    }
    players++;
});
app.get('/main', function(request, respons) {
    respons.sendFile(__dirname + '/main.html');
});
app.get('/style.css', function(req, res) {
    res.sendFile(__dirname + "/" + "style.css");
});
app.get('/virus.js', function(req, res) {
    res.sendFile(__dirname + "/" + "virus.js");
});
app.get('/data.json', function(req, res) {
    res.sendFile(__dirname + "/" + "data.json");
});
let start_time;
let end_time;
let plays =1;
let firstname;
let secondname;
let currplay;
let cou1=0;
let last_id=0;
let gameready = 0;
function changeuser(name) {
    if(name==firstname) {
        currplay=secondname;
    }
    else {
        currplay=firstname;
    }
    return currplay;
}
io.sockets.on('connection', function(socket) {
    console.log("Успешное соединение");
    socket.on('START', function(data) {
        if(gameready==0) {
            firstname=data.name;
            console.log(firstname);
        }
        else {

            secondname=data.name;
            console.log(secondname);
        }
        gameready+=1;
        console.log('ready:'+gameready);
        if(gameready==2) {
            io.sockets.emit('lets',{try:gameready});
            console.log('отправка');
        }
    });
    socket.on('name', function(name) {
        if(plays==1) {
            plays+=1;
        }
        else {
            if(gameready==2) {
                currplay=firstname;
                console.log(secondname);
                io.sockets.emit('confirmplaers',{first: firstname,second: secondname,curr: currplay} );
                start_time = new Date();
            }
        }
    });
    socket.on('yornot', function(data) {
        console.log(data);
        console.log(currplay);
        console.log('cou1: '+cou1);
        if(data.user==currplay&&cou1!=3&&data.mes!=last_id) {
            last_id = data.mes;
            if(cou1==2) {
                last_id=0;
            }
            io.sockets.emit('yes', {user: currplay, id: data.mes});
            cou1+=1;
        }
        if(cou1==3) {
            currplay = changeuser(currplay);
            cou1=0;
            io.sockets.emit('makeshoot',{curr: currplay});
            console.log('now:'+currplay);
        }
    });
    socket.on('lose', function(data) {
        end_time=new Date();
        io.sockets.emit('loser',{loser:data.user});
        let winner = changeuser(data.user);
        game_info = {
            begin: start_time+3*60*60*1000,
            time: (end_time - start_time) / (1000 * 60) + ' min',
            player1: firstname,
            players2: secondname,
            win: winner,
        }
        console.log(game_info);
        let dbfile = fs.readFileSync("data.json", "utf8");
        let fb = JSON.parse(dbfile);
        fb.games.push(game_info);
        fs.writeFileSync("data.json", JSON.stringify(fb, null, '\t'));
    });
});