/// The proto code! Do copy this one to draw it
/// (note it's just 'c', not 'ctx')
c.clearRect(0,0,canvas.width,canvas.height); // clear stuff, just for redrawing and debugging

function visor(fill) { // Visor!
c.beginPath(); // a new starter point, ...for redrawing too, yeah
c.arc( // so uh, a roundy curve,..
    50, 50, // at 50;50,..
    20, // with a small radius
    3*Math.PI/2, Math.PI/2, true // what is this? supposed to draw from top to down, by the left side
); // ...and that was the back of the head
//c.lineTo(50+30, 50+20); -- obsolete, too sharp at start
//c.arcTo(50+60, 50+20, 50, 50-20, 10); c.lineTo(50, 50-20); -- obsolete, too sharp at end
c.bezierCurveTo( // here goes mess, don't read further it's too weird... (also i don't really know what a bezier curve is)
    50+80, 50+20+5, // control point one: x+offset (way far to the right for the muzzle); y+radius+offset (a liiitle bit lower than needed),
    50+20, 50-20, // control point two: x+offset (somewhere between arc center and cp1); y-offset (above center),
    50, 50-20 // finish this all where it all started: x of center; y of center and [radius] pixels above... nevermind, just where the arc was started
); // kinda fine, already too bored to change, or maybe it's just a bit difficult
if (fill) c.fill(); else c.stroke(); // to select the drawing style
}
function headband(fill) { // idk how it's called
    let points = { // to copy the lines with offset... uh, to "dupe" the line correctly... ahh, just some data
        x1: 50+5, y1: 50-20+1, // start
        cpx: 50-15, cpy: 50-8, // quad line
        x: 50-10, y: 50+18, // ..same quad line
        offx: -5, offy: -1,
        radius: 20 // just why ?
    };
    c.beginPath();
    c.moveTo(points["x1"], points["y1"]);
    c.quadraticCurveTo( // uhh..? this should work, i guess... um?
        points["cpx"], points["cpy"],
        points["x"], points["y"],
        20 // nah, not points["radius"]
    );
    c.lineTo(points["x"]+points["offx"], points["y"]+points["offy"]);
    c.quadraticCurveTo(
        points["cpx"]+points["offx"], points["cpy"]+points["offy"],
        points["x1"]+points["offx"], points["y1"]+points["offy"],
        20
    ); // (yes!! it works!)
    c.closePath(); // easier than c.lineTo(points["x1"], points["y1"]); hehe
    if (fill) c.fill(); else c.stroke();
}
function ear(x,y,fill) {
    let points = { // now there are offsets only, fyi.. uh?
        cp1x: -25-2.5, cp1y: -25-5,
        cp2x: -50-7.5, cp2y: -5-5+2.5,
        x: -15, y: 35
    };
    c.beginPath();
    c.moveTo(x-2.5+2, y+2.5+2);
    c.bezierCurveTo(
        x+points["cp1x"], y+points["cp1y"],
        x+points["cp2x"], y+points["cp2y"],
        x+points["x"], y+points["y"]
    );
    if (fill) c.fill(); else c.stroke();
}

/// Final drawing [wip]
ear(50+5, 50-20-1);
visor();
ear(50, 50-20);
headband();