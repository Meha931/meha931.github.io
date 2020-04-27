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

/// Final drawing [wip]
visor();