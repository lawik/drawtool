// var current_limit = 128;
// var current_count = 0;
// var direction = 0;
// var x = 0;
// var y = 0;
// for(var i = 0; i < 5000; i++) {
//     switch(direction) {
//         case 0:
//             x++;
//         break;
//         case 1:
//             y++;
//         break;
//         case 2:
//             x--;
//         break;
//         case 3:
//             y--;
//         break;
//         default:
//             x++;
//     }
//     if(current_count > current_limit) {
//         current_count = 0;
//         current_limit -= 2;
//         if(direction < 3) {
//             direction++;
//         } else {
//             direction = 0;
//         }
//     }
//     current_count++;

//     a(i, p, window, [[0,0,255,255], [x+2,y+2]]);
//     // a(i, memp, [[255,255,255,255],])
// }

// var current_limit = 128;
// var current_count = 0;
// var direction = 0;
// var x = 0;
// var y = 0;
// for(i = 0; i < 6072; i++) {
//     switch(direction) {
//         case 0:
//             x++;
//         break;
//         case 1:
//             y++;
//         break;
//         case 2:
//             x--;
//         break;
//         case 3:
//             y--;
//         break;
//         default:
//             x++;
//     }
//     if(current_count > current_limit) {
//         current_count = 0;
//         current_limit -= 2;
//         if(direction < 3) {
//             direction++;
//         } else {
//             direction = 0;
//         }
//     }
//     current_count++;

//     a(i, p, window, [[0,0,0,255], [x,y]]);
// }

// OldRange = (OldMax - OldMin)
// NewRange = (NewMax - NewMin)
// NewValue = (((OldValue - OldMin) * NewRange) / OldRange) + NewMin

function x_to_color(x) {
    var val = ((x * 255) / canvas_width);
    return Math.floor(val);
}

function y_to_color(x) {
    var val = ((x * 255) / canvas_height);
    return Math.floor(val);
}

var i = 0;
var f = 0;
var current_rgba = [0,0,0,255];
// for(var j = 0; j < canvas_width * canvas_height; j++) {
//     if(i > 2) {
//         i = 0;
//     }
//     current_rgba[i] = x_to_color(x);

//     i++;
//     a(j, p, window, [current_rgba, [x,y]]);
//     f++;
// }

var x = 0;
var y = 0;
var moved_x = 0;
var moved_y = 0;
var go_x = true;
while(true) {
    if(x >= canvas_width && y >= canvas_height) {
        break;
    }

    if(i > 2) {
        i = 0;
    }
    current_rgba[i] = x_to_color(x);

    if(go_x) {
        if(x < canvas_width) {
            x++;
        }
        go_x = false;
    } else {
        if(y < canvas_height) {
            y++;
        }
        go_x = true;
        f++;
    }

    i++;

    a(f, p, window, [current_rgba, [x,y]]);


}

// var mem_trail = [];
// var mem_length = 15;
// function memp(rgba, position) {
//     bg();
//     if(mem_trail.length == mem_length) {
//         mem_trail.shift();
//     }

//     var intensity = 0;
//     var intensity_step = 0;
//     if(mem_trail.length > 0) {
//         intensity_step = rgba[3] / mem_trail.length;
//     } else {
//         intensity = 255;
//     }

//     for(var i in mem_trail) {
//         var mem_rgba = copy_array(rgba);
//         intensity += intensity_step;
//         var x = mem_trail[i][0];
//         var y = mem_trail[i][1];
//         mem_rgba[3] = intensity;
//         console.log(i, rgba_style(mem_rgba));
//         pixel_context.fillStyle = rgba_style(mem_rgba);
//         pixel_context.fillRect(x, y, 1, 1);
//     }

//     pixel_context.fillStyle = rgba_style(rgba);
//     pixel_context.fillRect(position[0], position[1], 1, 1);

//     mem_trail.push(position);
// }
