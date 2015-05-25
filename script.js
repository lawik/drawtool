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

function p() {
    pixel_data[0] = 0;
    pixel_data[1] = 0;
    pixel_data[2] = 0;
    pixel_data[3] = 255;
    pixel_context.putImageData( pixel_id, frame, frame );
}

a(0, console.log, console, ['zero']);
a(500, console.log, console, ['fuck yeah!']);
for(i = 0; i < 640; i++) {
    a(i, p, window);
}

window.requestAnimationFrame(run);

