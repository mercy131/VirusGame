let usernname = prompt('Введите имя');
console.log(usernname);
document.querySelector('#yourname').textContent = 'Ваше имя: ' + usernname;
let socket = io.connect();
let own_field = document.getElementById('own_field');
let td_own = own_field.querySelectorAll('td');
function confirm_place() {
        socket.emit('START', {mess: 'confirm', name: usernname});
        document.getElementById('confirmbt').disabled = true;
}
function checklose1() {
    let lose1=0;
    for (let i =0 ; i < td_own.length; i++) {
        let td_id = td_own[i].getAttribute('id');
        if (td_own[i].getAttribute('class')=='hit'||td_own[i].getAttribute('class')=='kill1') {
            if (td_own[clamp(1,109,i-1)].getAttribute('class')==='none'||td_own[clamp(1,109,i+1)].getAttribute('class')==='none'
                ||td_own[clamp(1,109,i-12)].getAttribute('class')==='none'||td_own[clamp(1,109,i+12)].getAttribute('class')==='none'
                ||td_own[clamp(1,109,i-11)].getAttribute('class')==='none'||td_own[clamp(1,109,i+11)].getAttribute('class')==='none'
                ||td_own[clamp(1,109,i+11)].getAttribute('class')==='hit1'||td_own[clamp(1,109,i-11)].getAttribute('class')==='hit1'
                ||td_own[clamp(1,109,i+12)].getAttribute('class')==='hit1'||td_own[clamp(1,109,i-12)].getAttribute('class')==='hit1'
                ||td_own[clamp(1,109,i+10)].getAttribute('class')==='hit1'||td_own[clamp(1,109,i-10)].getAttribute('class')==='hit1'
                ||td_own[clamp(1,109,i-10)].getAttribute('class')==='none'||td_own[clamp(1,109,i+10)].getAttribute('class')==='none'
                ||td_own[clamp(1,109,i+1)].getAttribute('class')==='hit1'||td_own[clamp(1,109,i-1)].getAttribute('class')==='hit1'){
                lose1=1;
            }
        }
    }
    if(lose1==0) {
        alert('gg');
        if(usernname==firstname) {
            socket.emit('lose',{mes:'lose',user: usernname});
        }
    }
}
function checklose() {
    let lose=0;
    for (let i = td_own.length-1; i >= 0; i--) {
        let td_id = td_own[i].getAttribute('id');
        if (td_own[i].getAttribute('class')=='hit1'||td_own[i].getAttribute('class')=='kill2') {
                if (td_own[clamp(1,109,i-1)].getAttribute('class')==='none'||td_own[clamp(1,109,i+1)].getAttribute('class')==='none'
                    ||td_own[clamp(1,109,i-12)].getAttribute('class')==='none'||td_own[clamp(1,109,i+12)].getAttribute('class')==='none'
                    ||td_own[clamp(1,109,i-11)].getAttribute('class')==='none'||td_own[clamp(1,109,i+11)].getAttribute('class')==='none'
                    ||td_own[clamp(1,109,i+11)].getAttribute('class')==='hit'||td_own[clamp(1,109,i-11)].getAttribute('class')==='hit'
                    ||td_own[clamp(1,109,i+12)].getAttribute('class')==='hit'||td_own[clamp(1,109,i-12)].getAttribute('class')==='hit'
                    ||td_own[clamp(1,109,i+10)].getAttribute('class')==='hit'||td_own[clamp(1,109,i-10)].getAttribute('class')==='hit'
                    ||td_own[clamp(1,109,i-10)].getAttribute('class')==='none'||td_own[clamp(1,109,i+10)].getAttribute('class')==='none'
                    ||td_own[clamp(1,109,i+1)].getAttribute('class')==='hit'||td_own[clamp(1,109,i-1)].getAttribute('class')==='hit'){
                    lose=1;
                }
        }
    }
    if(lose==0) {
        alert('gg');
        if(usernname==secondname) {
            socket.emit('lose',{mes:'lose',user: usernname});
        }

    }
}
function clamp (min,max,number) {

    if(number<0||number==0) {
        return 0;
    }
    if(number>max) {
        return 99;
    }
    return number;
}
let firstname;
let secondname;
let currname;
function emitnames() {
    socket.emit('name',usernname);
}

function makehod(name) {
    alert('ход: '+name);
    if(usernname==name) {
        if(name==firstname) {
            shoot();
        }
        else {
            shoot2();
        }
    }
}
function shoot2()  {
    for (let i = td_own.length-1; i >= 0; i--) {
        let td_id = td_own[i].getAttribute('id');
        if (td_id != null) {
            td_own[i].addEventListener('click', function(){
                if (td_own[clamp(1,109,i-1)].getAttribute('class')==='hit1'||td_own[clamp(1,109,i-11)].getAttribute('class')==='hit1'
                    ||td_own[clamp(1,109,i-12)].getAttribute('class')==='hit1' ||i==109||td_own[clamp(1,109,i+10)].getAttribute('class')==='hit1'
                    ||td_own[clamp(1,109,i+11)].getAttribute('class')==='hit1'||td_own[clamp(1,109,i+1)].getAttribute('class')==='hit1'
                    ||td_own[clamp(1,109,i+11)].getAttribute('class')==='kill2'||td_own[clamp(1,109,i+1)].getAttribute('class')==='kill2'
                    ||td_own[clamp(1,109,i-11)].getAttribute('class')==='kill2'||td_own[clamp(1,109,i-1)].getAttribute('class')==='kill2'
                    ||td_own[clamp(1,109,i+10)].getAttribute('class')==='kill2'||td_own[clamp(1,109,i+12)].getAttribute('class')==='kill2'
                    ||td_own[clamp(1,109,i-10)].getAttribute('class')==='hit1'||td_own[clamp(1,109,i-10)].getAttribute('class')==='kill2'
                    ||td_own[clamp(1,109,i+12)].getAttribute('class')==='hit1'||td_own[clamp(1,109,i-12)].getAttribute('class')==='kill2'
                    ||td_own[clamp(1,109,i+10)].getAttribute('class')==='hit1'||td_own[clamp(1,109,i+10)].getAttribute('class')==='kill2'
                    ||td_own[clamp(1,109,i-10)].getAttribute('class')==='hit1'||td_own[clamp(1,109,i-10)].getAttribute('class')==='kill2'){
                    if(td_own[i].getAttribute('class')==='none'||td_own[i].getAttribute('class')==='hit') {
                        if(currname==secondname) {
                            socket.emit('yornot',{mes:td_id,user: usernname})
                        }
                    }
                }
            })
        }
    }
}

function shoot()  {
        for (let i = 0; i < td_own.length; i++) {
            let td_id = td_own[i].getAttribute('id');
            if (td_id != null) {
                td_own[i].addEventListener('click', function(){
                    if (td_own[clamp(1,109,i-1)].getAttribute('class')==='hit'||td_own[clamp(1,109,i-11)].getAttribute('class')==='hit'
                        ||td_own[clamp(1,109,i-12)].getAttribute('class')==='hit' ||i==1||td_own[clamp(1,109,i+10)].getAttribute('class')==='hit'
                        ||td_own[clamp(1,109,i+11)].getAttribute('class')==='hit'||td_own[clamp(1,109,i+1)].getAttribute('class')==='hit'
                        ||td_own[clamp(1,109,i+11)].getAttribute('class')==='kill1'||td_own[clamp(1,109,i+1)].getAttribute('class')==='kill1'
                        ||td_own[clamp(1,109,i-11)].getAttribute('class')==='kill1'||td_own[clamp(1,109,i-1)].getAttribute('class')==='kill1'
                        ||td_own[clamp(1,109,i+10)].getAttribute('class')==='kill1'||td_own[clamp(1,109,i+12)].getAttribute('class')==='kill1'
                        ||td_own[clamp(1,109,i-10)].getAttribute('class')==='hit'||td_own[clamp(1,109,i-10)].getAttribute('class')==='kill1'
                        ||td_own[clamp(1,109,i+12)].getAttribute('class')==='hit'||td_own[clamp(1,109,i-12)].getAttribute('class')==='kill1'
                        ||td_own[clamp(1,109,i+10)].getAttribute('class')==='hit'||td_own[clamp(1,109,i+10)].getAttribute('class')==='kill1'
                        ||td_own[clamp(1,109,i-10)].getAttribute('class')==='hit'||td_own[clamp(1,109,i-10)].getAttribute('class')==='kill1'){
                        if(td_own[i].getAttribute('class')==='none'||td_own[i].getAttribute('class')==='hit1') {
                            if(currname==firstname) {
                                socket.emit('yornot',{mes:td_id,user: usernname})
                            }

                        }
                    }
                })
            }
    }
}

socket.on('yes',function(data){
    if(data.user==firstname) {
        if(document.getElementById((data.id)).getAttribute('class')==='none') {
            document.getElementById(data.id).setAttribute('class','hit');
        }
        else {
            document.getElementById(data.id).setAttribute('class','kill1');
        }
        checklose1();
    }
    else {
        if(document.getElementById((data.id)).getAttribute('class')==='none') {
            document.getElementById(data.id).setAttribute('class','hit1');
        }
        else {
            document.getElementById(data.id).setAttribute('class','kill2');
        }
        checklose();
    }
});
socket.on('confirmplaers',function(data){
        firstname=data.first;
        secondname=data.second;
        currname = data.curr;
        alert(firstname+'ходит первый');
        alert(secondname+'ходит второй');
        makehod(currname);
});
socket.on('makeshoot',function (data){
   makehod(data.curr);
   currname=data.curr;
});
socket.on('loser',function (data){
   alert(data.loser+'Проиграл!');
});
socket.on('lets',function (data){
    emitnames();
});