var play = true;

var frame = 0;
var stuff = {};

var canvas_width = 640;
var canvas_height = 480;
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

function rgba_style(rgba) {
    return "rgba("+Math.floor(rgba[0])+","+Math.floor(rgba[1])+","+Math.floor(rgba[2])+","+Math.floor(rgba[3])+")";
}

function p(rgba, position) {
    // pixel_id.data[0] = rgba[0];
    // pixel_id.data[1] = rgba[1];
    // pixel_id.data[2] = rgba[2];
    // pixel_id.data[3] = rgba[3];
    console.log(rgba);
    pixel_context.fillStyle = rgba_style(rgba);
    console.log(pixel_context.fillStyle);
    pixel_context.fillRect(position[0], position[1], 1, 1);
    // pixel_context.putImageData(pixel_id, position[0], position[1]);
}

function cir(radius, rgba, position) {
    pixel_context.fillStyle = rgba_style(rgba);
    pixel_context.beginPath();
    pixel_context.arc(position[0],position[1],radius,0, Math.PI*2, true);
    pixel_context.fill();
}

function copy_array(array) {
    var copied = [];
    for(var i in array) {
        copied[i] = array[i];
    }
    return copied;
}

var latest_bg_color = [0,0,0];
function bg(rgb) {
    if(rgb !== undefined) {
        latest_bg_color = rgb;
    } else {
        rgb = latest_bg_color;
    }
    pixel_context.fillStyle = "rgb("+rgb[0]+","+rgb[1]+","+rgb[2]+")";
    pixel_context.fillRect(0, 0, canvas_width, canvas_height);
}

a(0, bg, window, [[0,0,0]]);
a(0, cir, window, [32, [100,200,100,200], [128,128]]);
a(0, cir, window, [24, [50,150,50,200], [100,136]]);

window.requestAnimationFrame(run);

