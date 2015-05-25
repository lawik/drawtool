var play = true;

var frame = 0;
var stuff = {};

var canvas = document.getElementById("pixels");
var pixel_context = canvas.getContext("2d");
var pixel_id = pixel_context.createImageData(1,1); // only do this once per page
var pixel_data  = pixel_id.data;                     // only do this once per page



function a(frame, callback, context, args) {
    if(args === undefined) {
        args = [];
    }
    var thing = {
        callback: callback,
        context: context,
        args: args
    };

    if(stuff[frame] === undefined) {
        stuff[frame] = [];
    }
    stuff[frame].push(thing);
}

function runstuff(frame) {
    var stuffs = stuff[frame];
    var context = {frame: frame};
    for(var i in stuffs) {
        var thing = stuffs[i];
        thing.callback.apply(thing.context, thing.args);
    }
}

function run() {
    if(play) {
        runstuff(frame);
        window.requestAnimationFrame(run);
    }
    frame++;
}

function p(rgba, position) {
    console.log(rgba, position);
    pixel_data[0] = rgba[0];
    pixel_data[1] = rgba[1];
    pixel_data[2] = rgba[2];
    pixel_data[3] = rgba[3];
    pixel_context.putImageData( pixel_id, position[0], position[1]);
}

a(0, console.log, console, ['zero']);
a(500, console.log, console, ['fuck yeah!']);
var current_limit = 128;
var current_count = 0;
var direction = 0;
var x = 0;
var y = 0;
for(i = 0; i < 2048; i++) {
    switch(direction) {
        case 0:
            x++;
        break;
        case 1:
            y++;
        break;
        case 2:
            x--;
        break;
        case 3:
            y--;
        break;
        default:
            x++;
    }
    if(current_count > current_limit) {
        current_count = 0;
        current_limit -= 8;
        if(direction < 3) {
            direction++;
        } else {
            direction = 0;
        }
    }
    current_count++;

    a(i, p, window, [[0,0,0,255], [x,y]]);
}

window.requestAnimationFrame(run);

