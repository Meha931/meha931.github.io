/*
    A protogen renderer.
    ...um, I think I'm supposed to say something more about it?
    Well, it took quite a while to write that down... The first steps were difficult, then it went easier.
    Anyway, here's the code.
    
    Use following functions with parameters to draw each part:
    
    head({
        x,
        y,
        color: {
            visor,
            headband,
            ear,
            cheekplate,
            cheekcircle,
            display
        },
        parentTilt,
        localTilt,
        style,
        scale
    });
    
    body({
        x,
        y,
        color: {
            torso,
            chestplate
        },
        parentTilt,
        localTilt,
        style,
        scale
    });
    
    armUpper({
        x,
        y,
        color: {
            arm,
            armplate
        },
        parentTilt,
        localTilt,
        style,
        scale,
        right
    });
    
    armLower({
        x,
        y,
        color: {
            arm
        },
        parentTilt,
        localTilt,
        style,
        scale
    });
    
    legUpper({
        x,
        y,
        color: {
            leg,
            legplate
        },
        parentTilt,
        localTilt,
        style,
        scale,
        right
    });
    
    legLower({
        x,
        y,
        color: {
            leg
        },
        parentTilt,
        localTilt,
        style,
        scale
    });
*/

var vectorToAngle = (x=0, y=0) => Math.atan(y/x)+Math.PI*(x < 0);
var rotatePoint = (xh=0, yh=0, x1=0, y1=0, tilt=0) => {
    if ((+xh === +x1)&&(+yh === +y1)) return [xh,yh];
    let distance = Math.sqrt((x1-xh)**2+(y1-yh)**2);
    let finalAngle = vectorToAngle(x1-xh, y1-yh)+tilt;
    return [xh+Math.cos(finalAngle)*distance, yh+Math.sin(finalAngle)*distance];
};

function head(params={x:50, y:50, color:{visor: "#40AA00", headband: "AliceBlue", ear: "#4080FF", cheekplate: "cyan", cheekcircle: "gold", display: "blue"}, parentTilt:0, localTilt:0, style:1, scale:1}) { // Head
    
    let tilt = params.parentTilt+params.localTilt;
    params.scale*=1; // manual rescaling
    
    if (params.style === 1) { // Style 1
        
        params.x+=2.5; params.y+=-10; // Style offsets
        
        /// VISOR
            
        function visor(cx1,cy1,cx2,cy2,cx3,cy3,radius,fill) {
        ctx.beginPath();
        ctx.arc(
            (params.x)*params.scale, (params.y)*params.scale,
            (radius)*params.scale,
            (3*Math.PI/2)+tilt, (Math.PI/2)+tilt, true
        );
        ctx.bezierCurveTo(
            rotatePoint(params.x, params.y, cx1, cy1, tilt)[0]*params.scale, rotatePoint(params.x, params.y, cx1, cy1, tilt)[1]*params.scale, // How the
            rotatePoint(params.x, params.y, cx2, cy2, tilt)[0]*params.scale, rotatePoint(params.x, params.y, cx2, cy2, tilt)[1]*params.scale, // heck does
            rotatePoint(params.x, params.y, cx3, cy3, tilt)[0]*params.scale, rotatePoint(params.x, params.y, cx3, cy3, tilt)[1]*params.scale  // this work
        );
        /*ctx.bezierCurveTo(
            (x+80), (y+20+5),
            (x+20), (y-20),
            (x), (y-20)
        );*/
        ctx.fillStyle = params.color.visor;
        if (fill) ctx.fill(); else ctx.stroke();
        } // (params.x+80, params.y+20+5, params.x+20, params.y-20, params.x, params.y-20, 20);
        
        /// HEADBAND
        
        function headband(cx1,cy1,cx2,cy2,cx3,cy3,offx,offy,fill) {
        /*let points = {
            x1: (50+5), y1: (50-20+1),
            cpx: (50-10), cpy: (50-6),
            x: (50-10), y: (50+18),
            offx: (-5), offy: (-1),
            radius: (20)
        };*/
        ctx.beginPath();
        ctx.moveTo(rotatePoint(params.x, params.y, cx1, cy1, tilt)[0]*params.scale, rotatePoint(params.x, params.y, cx1, cy1, tilt)[1]*params.scale);
        ctx.quadraticCurveTo(
            rotatePoint(params.x, params.y, cx2, cy2, tilt)[0]*params.scale, rotatePoint(params.x, params.y, cx2, cy2, tilt)[1]*params.scale,
            rotatePoint(params.x, params.y, cx3, cy3, tilt)[0]*params.scale, rotatePoint(params.x, params.y, cx3, cy3, tilt)[1]*params.scale 
        );
        ctx.lineTo(rotatePoint(params.x, params.y, cx3+offx, cy3+offy, tilt)[0]*params.scale, rotatePoint(params.x, params.y, cx3+offx, cy3+offy, tilt)[1]*params.scale);
        ctx.quadraticCurveTo(
            rotatePoint(params.x, params.y, cx2+offx, cy2+offy, tilt)[0]*params.scale, rotatePoint(params.x, params.y, cx2+offx, cy2+offy, tilt)[1]*params.scale,
            rotatePoint(params.x, params.y, cx1+offx, cy1+offy, tilt)[0]*params.scale, rotatePoint(params.x, params.y, cx1+offx, cy1+offy, tilt)[1]*params.scale
        );
        ctx.closePath();
        ctx.fillStyle = params.color.headband;
        if (fill) ctx.fill(); else ctx.stroke();
        } // (params.x+5, params.y-20+1, params.x-10, params.y-6, params.x-10, params.y+18, -5, -1);
        
        /// EAR
        
        function ear(cx1,cy1,fill) {
        let points = {
            cp1x: -25-2.5, cp1y: -25-5,
            cp2x: -50-7.5, cp2y: -5-5+2.5,
            x: -15, y: 35
        };
        ctx.beginPath();
        ctx.moveTo(rotatePoint(params.x, params.y, (cx1-2.5+2), (cy1+2.5+2), tilt)[0]*params.scale, rotatePoint(params.x, params.y, (cx1-2.5+2), (cy1+2.5+2), tilt)[1]*params.scale);
        ctx.bezierCurveTo(
            rotatePoint(params.x, params.y, (cx1+points["cp1x"]), (cy1+points["cp1y"]), tilt)[0]*params.scale, rotatePoint(params.x, params.y, (cx1+points["cp1x"]), (cy1+points["cp1y"]), tilt)[1]*params.scale,
            rotatePoint(params.x, params.y, (cx1+points["cp2x"]), (cy1+points["cp2y"]), tilt)[0]*params.scale, rotatePoint(params.x, params.y, (cx1+points["cp2x"]), (cy1+points["cp2y"]), tilt)[1]*params.scale,
            rotatePoint(params.x, params.y, (cx1+points["x"]), (cy1+points["y"]), tilt)[0]*params.scale, rotatePoint(params.x, params.y, (cx1+points["x"]), (cy1+points["y"]), tilt)[1]*params.scale
        );
        ctx.fillStyle = params.color.ear;
        if (fill) ctx.fill(); else ctx.stroke();
        } // (params.x+5, params.y-20-1); // (params.x, params.y-20);
        
        /// CHEEKPLATE (lol)
        
        function cheekplate(fill) {
        let points = {
            x: (params.x-7.5), y: (params.y+10),
            outerRadius: (7.5), innerRadius: (5),
            offx: (-30+2.5), stretch: (7.5)
        };
        ctx.beginPath();
        ctx.arc(rotatePoint(params.x, params.y, points["x"], points["y"], tilt)[0]*params.scale, rotatePoint(params.x, params.y, points["x"], points["y"], tilt)[1]*params.scale, points["outerRadius"]*params.scale, Math.PI/2+tilt, 3*Math.PI/2+tilt, true);
        /*ctx.quadraticCurveTo(
            points["x"]-40, points["y"],
            points["x"], points["y"]+points["radius"]
        ); -- obsolete, too sharp*/
        ctx.bezierCurveTo(
            rotatePoint(params.x, params.y, points["x"]+points["offx"], points["y"]-points["stretch"], tilt)[0]*params.scale, rotatePoint(params.x, params.y, points["x"]+points["offx"], points["y"]-points["stretch"], tilt)[1]*params.scale,
            rotatePoint(params.x, params.y, points["x"]+points["offx"], points["y"]+points["stretch"], tilt)[0]*params.scale, rotatePoint(params.x, params.y, points["x"]+points["offx"], points["y"]+points["stretch"], tilt)[1]*params.scale,
            rotatePoint(params.x, params.y, points["x"], points["y"]+points["outerRadius"], tilt)[0]*params.scale, rotatePoint(params.x, params.y, points["x"], points["y"]+points["outerRadius"], tilt)[1]*params.scale
        );
        ctx.fillStyle = params.color.cheekplate;
        if (fill) ctx.fill(); else ctx.stroke();
        
        // CHEEKCIRCLE (part of function cheekplate() now)
        
        // let points = {x, y, radius};
        ctx.beginPath();
        ctx.arc(rotatePoint(params.x, params.y, points["x"], points["y"], tilt)[0]*params.scale, rotatePoint(params.x, params.y, points["x"], points["y"], tilt)[1]*params.scale, points["innerRadius"]*params.scale, 0, Math.PI*2); // a [full] circle' anyway
        ctx.fillStyle = params.color.cheekcircle;
        if (fill) ctx.fill(); else ctx.stroke();
        }
        
        /// DISPLAY
        
        function display() {
        /*let points = {
            xe: (87.5)*scale, ye: (65)*scale,
            xs: (50+5)*scale, ys: (50+5)*scale
        };
        ctx.beginPath();
        ctx.moveTo(points["xe"], points["ye"]);
        //ctx.lineTo(points["xs"], points["ys"]);
        //ctx.lineTo()
        ctx.bezierCurveTo(
            (points["xe"]-points["xs"])/3*2+points["xs"], (points["ye"]-points["ys"])/3*1+points["ys"],
            (points["xe"]-points["xs"])/3*1+points["xs"], (points["ye"]-points["ys"])/3*2+points["ys"],
            points["xs"], points["ys"]
        );
        ctx.stroke();*/
        let points = {
            offxe: 30+7.5, offye: 15,
            offxs: 5, offys: 5,
            arcoffx: 10, arcoffy: -5,
            arcradius: 5, arctilt: Math.PI/12
        };
        ctx.beginPath();
        ctx.moveTo(rotatePoint(params.x, params.y, params.x+points["offxe"], params.y+points["offye"], tilt)[0]*params.scale, rotatePoint(params.x, params.y, params.x+points["offxe"], params.y+points["offye"], tilt)[1]*params.scale);
        ctx.bezierCurveTo(
            rotatePoint(params.x, params.y, (points["offxe"]-points["offxs"])/3*2+params.x+points["offxs"], (points["offye"]-points["offys"])/3*1+params.y+points["offys"], tilt)[0]*params.scale, rotatePoint(params.x, params.y, (points["offxe"]-points["offxs"])/3*2+params.x+points["offxs"], (points["offye"]-points["offys"])/3*1+params.y+points["offys"], tilt)[1]*params.scale,
            rotatePoint(params.x, params.y, (points["offxe"]-points["offxs"])/3*1+params.x+points["offxs"], (points["offye"]-points["offys"])/3*2+params.y+points["offys"], tilt)[0]*params.scale, rotatePoint(params.x, params.y, (points["offxe"]-points["offxs"])/3*1+params.x+points["offxs"], (points["offye"]-points["offys"])/3*2+params.y+points["offys"], tilt)[1]*params.scale,
            rotatePoint(params.x, params.y, params.x+points["offxs"], params.y+points["offys"], tilt)[0]*params.scale, rotatePoint(params.x, params.y, params.x+points["offxs"], params.y+points["offys"], tilt)[1]*params.scale
        );
        ctx.strokeStyle = params.color.display;
        ctx.stroke();
        ctx.strokeStyle = "#000";
        
        /*ctx.beginPath();
        (function(x, y, tilt){
            ctx.arc(x, y, (5)*scale, 0+tilt, Math.PI+tilt, true);
        })((50+10)*scale, (50-5)*scale, Math.PI/12);
        ctx.fill();*/
        ctx.beginPath();
        ctx.arc(rotatePoint(params.x, params.y, params.x+points["arcoffx"], params.y+points["arcoffy"], tilt)[0]*params.scale, rotatePoint(params.x, params.y, params.x+points["arcoffx"], params.y+points["arcoffy"], tilt)[1]*params.scale, points["arcradius"]*params.scale, Math.PI+points["arctilt"]+tilt, Math.PI*2+points["arctilt"]+tilt);
        ctx.fillStyle = params.color.display;
        ctx.fill();
        }
        
        /// RENDER
        
        ear(params.x+5, params.y-20-1, true);
        ear(params.x+5, params.y-20-1, false);
        visor(params.x+80, params.y+20+5, params.x+20, params.y-20, params.x, params.y-20, 20, true);
        display();
        visor(params.x+80, params.y+20+5, params.x+20, params.y-20, params.x, params.y-20, 20, false);
        ear(params.x, params.y-20, true);
        ear(params.x, params.y-20, false);
        headband(params.x+5, params.y-20+1, params.x-10, params.y-6, params.x-10, params.y+18, -5, -1, true);
        headband(params.x+5, params.y-20+1, params.x-10, params.y-6, params.x-10, params.y+18, -5, -1, false);
        cheekplate(true);
        cheekplate(false);
        // cheekcircle(); - included in cheekplate()
        
    } else console.log("Unsupported style");
}

function body(params={x:50, y:100, color:{torso: "orange", chestplate: "#D0D0D0"}, parentTilt:0/* it's already the parent */, localTilt:0, style:1, scale:1}) {
    
    let tilt = params.parentTilt+params.localTilt;
    params.scale*=1;
    
    if (params.style === 1) {
        
        params.x+=0; params.y+=0; // Style offsets
        
        /// TORSO
        
        function torso(fill) {
        let points = {
            bodyRadius: 15,
            bodyHeight: 80,
            neckRadius: 10,
            neckHeight: 15
        };
        ctx.beginPath();
        ctx.arc(params.x*params.scale, params.y*params.scale, points["bodyRadius"]*params.scale, 0+tilt, Math.PI+tilt);
        ctx.lineTo(rotatePoint(params.x, params.y, params.x-points["bodyRadius"], params.y-points["bodyHeight"], tilt)[0]*params.scale, rotatePoint(params.x, params.y, params.x-points["bodyRadius"], params.y-points["bodyHeight"], tilt)[1]*params.scale);
        ctx.bezierCurveTo(
            rotatePoint(params.x, params.y, params.x-points["bodyRadius"], params.y-points["bodyHeight"]-points["neckHeight"]/2, tilt)[0]*params.scale, rotatePoint(params.x, params.y, params.x-points["bodyRadius"], params.y-points["bodyHeight"]-points["neckHeight"]/2, tilt)[1]*params.scale,
            rotatePoint(params.x, params.y, params.x-points["neckRadius"], params.y-points["bodyHeight"]-points["neckHeight"]/2, tilt)[0]*params.scale, rotatePoint(params.x, params.y, params.x-points["neckRadius"], params.y-points["bodyHeight"]-points["neckHeight"]/2, tilt)[1]*params.scale,
            rotatePoint(params.x, params.y, params.x-points["neckRadius"], params.y-points["bodyHeight"]-points["neckHeight"], tilt)[0]*params.scale, rotatePoint(params.x, params.y, params.x-points["neckRadius"], params.y-points["bodyHeight"]-points["neckHeight"], tilt)[1]*params.scale,
        );
        ctx.arc(rotatePoint(params.x, params.y, params.x, params.y-points["bodyHeight"]-points["neckHeight"], tilt)[0]*params.scale, rotatePoint(params.x, params.y, params.x, params.y-points["bodyHeight"]-points["neckHeight"], tilt)[1]*params.scale, points["neckRadius"]*params.scale, Math.PI+tilt, Math.PI*2+tilt);
        ctx.bezierCurveTo(
            rotatePoint(params.x, params.y, params.x+points["neckRadius"], params.y-points["bodyHeight"]-points["neckHeight"]/2, tilt)[0]*params.scale, rotatePoint(params.x, params.y, params.x+points["neckRadius"], params.y-points["bodyHeight"]-points["neckHeight"]/2, tilt)[1]*params.scale,
            rotatePoint(params.x, params.y, params.x+points["bodyRadius"], params.y-points["bodyHeight"]-points["neckHeight"]/2, tilt)[0]*params.scale, rotatePoint(params.x, params.y, params.x+points["bodyRadius"], params.y-points["bodyHeight"]-points["neckHeight"]/2, tilt)[1]*params.scale,
            rotatePoint(params.x, params.y, params.x+points["bodyRadius"], params.y-points["bodyHeight"], tilt)[0]*params.scale, rotatePoint(params.x, params.y, params.x+points["bodyRadius"], params.y-points["bodyHeight"], tilt)[1]*params.scale
        );
        ctx.lineTo(rotatePoint(params.x, params.y, params.x+points["bodyRadius"], params.y, tilt)[0]*params.scale, rotatePoint(params.x, params.y, params.x+points["bodyRadius"], params.y, tilt)[1]*params.scale);
        ctx.fillStyle = params.color.torso;
        if (fill) ctx.fill(); else ctx.stroke();
        }
        
        /// CHESTPLATE
        
        function chestplate(fill) {
        let points = {
            lower: 2.5,
            untightEdge: 2.5,
            untightCenter: 5+0,
            height: 25
        };
        ctx.beginPath();
        ctx.moveTo(rotatePoint(params.x, params.y, params.x-15-points["untightEdge"], params.y-75+points["lower"], tilt)[0]*params.scale, rotatePoint(params.x, params.y, params.x-15-points["untightEdge"], params.y-75+points["lower"], tilt)[1]*params.scale);
        ctx.lineTo(rotatePoint(params.x, params.y, params.x+15+points["untightEdge"], params.y-75+points["lower"], tilt)[0]*params.scale, rotatePoint(params.x, params.y, params.x+15+points["untightEdge"], params.y-75+points["lower"], tilt)[1]*params.scale);
        ctx.lineTo(rotatePoint(params.x, params.y, params.x+15+points["untightCenter"], params.y-75+points["lower"]+points["height"]/2, tilt)[0]*params.scale, rotatePoint(params.x, params.y, params.x+15+points["untightCenter"], params.y-75+points["lower"]+points["height"]/2, tilt)[1]*params.scale);
        ctx.lineTo(rotatePoint(params.x, params.y, params.x+15+points["untightEdge"], params.y-75+points["lower"]+points["height"], tilt)[0]*params.scale, rotatePoint(params.x, params.y, params.x+15+points["untightEdge"], params.y-75+points["lower"]+points["height"], tilt)[1]*params.scale);
        ctx.lineTo(rotatePoint(params.x, params.y, params.x-15-points["untightEdge"], params.y-75+points["lower"]+points["height"], tilt)[0]*params.scale, rotatePoint(params.x, params.y, params.x-15-points["untightEdge"], params.y-75+points["lower"]+points["height"], tilt)[1]*params.scale);
        // ctx.lineTo(params.x-15-points["untightEdge"], params.y-75+points["lower"]); -- nah
        ctx.closePath();
        ctx.fillStyle = params.color.chestplate;
        if (fill) ctx.fill(); else ctx.stroke();
        }
        
        /// RENDER
        
        torso(true);
        torso(false);
        chestplate(true);
        chestplate(false);
        
    } else console.log("Unsupported style");
}

function armUpper(params={x:50, y:50, color:{arm: "#40DD78", armplate: "cyan"}, parentTilt:0, localTilt:0, style:1, scale:1, right:true}) {
    
    let tilt = params.parentTilt+params.localTilt;
    params.scale*=1;
    
    if (params.style === 1) {
        
        params.x+=0; params.y+=0; // Style offsets
        
        /// ARM
        
        function arm(fill) {
        let points = {
            radius: 15-1,
            length: 50
        };
        ctx.beginPath();
        ctx.arc(params.x*params.scale, params.y*params.scale, points["radius"]*params.scale, Math.PI+tilt, Math.PI*2+tilt);
        ctx.lineTo(rotatePoint(params.x, params.y, params.x+points["radius"], params.y+points["length"], tilt)[0]*params.scale, rotatePoint(params.x, params.y, params.x+points["radius"], params.y+points["length"], tilt)[1]*params.scale);
        ctx.arc(rotatePoint(params.x, params.y, params.x, params.y+points["length"], tilt)[0]*params.scale, rotatePoint(params.x, params.y, params.x, params.y+points["length"], tilt)[1]*params.scale, points["radius"]*params.scale, 0+tilt, Math.PI+tilt);
        // ctx.lineTo(); -- na~
        ctx.closePath();
        ctx.fillStyle = params.color.arm;
        if (fill) ctx.fill(); else ctx.stroke();
        }
        
        /// ARMPLATE
        
        function armplate(fill) {
        let points = {
            radius: 15-1-2
        };
        ctx.beginPath();
        ctx.arc(params.x*params.scale, params.y*params.scale, points["radius"]*params.scale, 0, Math.PI*2); // full circle
        ctx.fillStyle = params.color.armplate;
        if (fill) ctx.fill(); else ctx.stroke();
        }
        
        /// RENDER
        
        if (params.right) {
            arm(true);
            arm(false);
            armplate(true);
            armplate(false);
        } else {
            armplate(true);
            armplate(false);
            arm(true);
            arm(false);
        }
        
    } else console.log("Unsupported style");
}

function armLower(params={x:50, y:125, color:{arm: "#40DD78"}, parentTilt:0, localTilt:0, style:1, scale:1}) {
    
    let tilt = params.parentTilt+params.localTilt;
    params.scale*=1;
    
    if (params.style === 1) {
        
        params.x+=0; params.y+=0; // Style offsets
        
        /// ARM
        
        function arm(fill) {
        let points = {
            radius: 15-1-1,
            length: 60
        };
        ctx.beginPath();
        ctx.arc(params.x*params.scale, params.y*params.scale, points["radius"]*params.scale, Math.PI+tilt, Math.PI*2+tilt);
        ctx.lineTo(rotatePoint(params.x, params.y, params.x+points["radius"], params.y+points["length"], tilt)[0]*params.scale, rotatePoint(params.x, params.y, params.x+points["radius"], params.y+points["length"], tilt)[1]*params.scale);
        ctx.arc(rotatePoint(params.x, params.y, params.x, params.y+points["length"], tilt)[0]*params.scale, rotatePoint(params.x, params.y, params.x, params.y+points["length"], tilt)[1]*params.scale, points["radius"]*params.scale, 0+tilt, Math.PI+tilt);
        // ctx.lineTo(...);
        ctx.closePath();
        ctx.fillStyle = params.color.arm;
        if (fill) ctx.fill(); else ctx.stroke();
        }
        
        /// RENDER
        
        arm(true);
        arm(false);
        
    } else console.log("Unsupported style");
}

function legUpper(params={x:50, y:100, color:{leg: "magenta", legplate: "pink"}, parentTilt:0, localTilt:0, style:1, scale:1, right: true}) {
    
    let tilt = params.parentTilt+params.localTilt;
    params.scale*=1;
    
    if (params.style === 1) {
        
        params.x+=0; params.y+=0; // Style offsets
        
        /// LEG
        
        function leg(fill) {
        let points = {
            thicknessUpper: 45, // thicc
            height: 100, thicknessLower: 45
        };
        ctx.beginPath();
        ctx.arc(params.x*params.scale, params.y*params.scale, points["thicknessUpper"]/2*params.scale, Math.PI+tilt, Math.PI*2+tilt);
        /*ctx.quadraticCurveTo(
            params.x, params.y+points["height"],
            params.x-points["thicknessUpper"]/2, params.y
        ); -- too sharp*/ 
        ctx.bezierCurveTo(
            rotatePoint(params.x, params.y, params.x+points["thicknessLower"]/2, params.y+points["height"], tilt)[0]*params.scale, rotatePoint(params.x, params.y, params.x+points["thicknessLower"]/2, params.y+points["height"], tilt)[1]*params.scale,
            rotatePoint(params.x, params.y, params.x-points["thicknessLower"]/2, params.y+points["height"], tilt)[0]*params.scale, rotatePoint(params.x, params.y, params.x-points["thicknessLower"]/2, params.y+points["height"], tilt)[1]*params.scale,
            rotatePoint(params.x, params.y, params.x-points["thicknessUpper"]/2, params.y, tilt)[0]*params.scale, rotatePoint(params.x, params.y, params.x-points["thicknessUpper"]/2, params.y, tilt)[1]*params.scale
        );
        ctx.fillStyle = params.color.leg;
        if (fill) ctx.fill(); else ctx.stroke();
        }
        
        /// LEGPLATE
        
        function legplate(fill) {
        let points = {
            width: 30, offx: 0,
            length: 50, offy: 5
        };
        ctx.beginPath();
        ctx.moveTo(rotatePoint(params.x, params.y, params.x-points["width"]/2+points["offx"], params.y+points["offy"], tilt)[0]*params.scale, rotatePoint(params.x, params.y, params.x-points["width"]/2+points["offx"], params.y+points["offy"], tilt)[1]*params.scale);
        ctx.bezierCurveTo(
            rotatePoint(params.x, params.y, params.x-points["width"]/2+points["offx"], params.y-points["length"]/2+points["offy"], tilt)[0]*params.scale, rotatePoint(params.x, params.y, params.x-points["width"]/2+points["offx"], params.y-points["length"]/2+points["offy"], tilt)[1]*params.scale,
            rotatePoint(params.x, params.y, params.x+points["width"]/2+points["offx"], params.y-points["length"]/2+points["offy"], tilt)[0]*params.scale, rotatePoint(params.x, params.y, params.x+points["width"]/2+points["offx"], params.y-points["length"]/2+points["offy"], tilt)[1]*params.scale,
            rotatePoint(params.x, params.y, params.x+points["width"]/2+points["offx"], params.y+points["offy"], tilt)[0]*params.scale, rotatePoint(params.x, params.y, params.x+points["width"]/2+points["offx"], params.y+points["offy"], tilt)[1]*params.scale
        );
        ctx.bezierCurveTo(
            rotatePoint(params.x, params.y, params.x+points["width"]/2+points["offx"], params.y+points["length"]/2+points["offy"], tilt)[0]*params.scale, rotatePoint(params.x, params.y, params.x+points["width"]/2+points["offx"], params.y+points["length"]/2+points["offy"], tilt)[1]*params.scale,
            rotatePoint(params.x, params.y, params.x-points["width"]/2+points["offx"], params.y+points["length"]/2+points["offy"], tilt)[0]*params.scale, rotatePoint(params.x, params.y, params.x-points["width"]/2+points["offx"], params.y+points["length"]/2+points["offy"], tilt)[1]*params.scale,
            rotatePoint(params.x, params.y, params.x-points["width"]/2+points["offx"], params.y+points["offy"], tilt)[0]*params.scale, rotatePoint(params.x, params.y, params.x-points["width"]/2+points["offx"], params.y+points["offy"], tilt)[1]*params.scale
        );
        ctx.fillStyle = params.color.legplate;
        if (fill) ctx.fill(); else ctx.stroke();
        }
        
        /// RENDER
        
        if (params.right) {
            leg(true);
            leg(false);
            legplate(true);
            legplate(false);
        } else {
            legplate(true);
            legplate(false);
            leg(true);
            leg(false);
        }
        
    } else console.log("Unsupported style");
}

function legLower(params={x:50, y:175, color:{leg: "cyan"}, parentTilt:0, localTilt:0, style:1, scale:1}) {
    
    let tilt = params.parentTilt+params.localTilt;
    params.scale*=1;
    
    if (params.style === 1) {
        
        params.x+=0; params.y+=0; // Style offsets
        
        /// LEG
        
        function leg(fill) {
        let points = {
            thickness: 20, height: 75, // lower leg itself
            width: 20, length: 25, // the step part of the leg
            radiusInner: 5, radiusOuter: 10
        };
        ctx.beginPath();
        ctx.arc(params.x*params.scale, params.y*params.scale, points["thickness"]/2*params.scale, Math.PI+tilt, Math.PI*2+tilt);
        ctx.arcTo(
            rotatePoint(params.x, params.y, params.x+points["thickness"]/2, (params.y+points["height"])-points["width"]/2, tilt)[0]*params.scale, rotatePoint(params.x, params.y, params.x+points["thickness"]/2, (params.y+points["height"])-points["width"]/2, tilt)[1]*params.scale,
            rotatePoint(params.x, params.y, params.x+points["length"], (params.y+points["height"])-points["width"]/2, tilt)[0]*params.scale, rotatePoint(params.x, params.y, params.x+points["length"], (params.y+points["height"])-points["width"]/2, tilt)[1]*params.scale,
            points["radiusInner"]*params.scale
        );
        ctx.arc(rotatePoint(params.x, params.y, params.x+points["length"], params.y+points["height"], tilt)[0]*params.scale, rotatePoint(params.x, params.y, params.x+points["length"], params.y+points["height"], tilt)[1]*params.scale, points["width"]/2*params.scale, 3*Math.PI/2+tilt, 5*Math.PI/2+tilt);
        ctx.arcTo(
            rotatePoint(params.x, params.y, params.x-points["thickness"]/2, (params.y+points["height"])+points["width"]/2, tilt)[0]*params.scale, rotatePoint(params.x, params.y, params.x-points["thickness"]/2, (params.y+points["height"])+points["width"]/2, tilt)[1]*params.scale,
            rotatePoint(params.x, params.y, params.x-points["thickness"]/2, params.y, tilt)[0]*params.scale, rotatePoint(params.x, params.y, params.x-points["thickness"]/2, params.y, tilt)[1]*params.scale,
            points["radiusOuter"]*params.scale
        );
        ctx.closePath();
        ctx.fillStyle = params.color.leg;
        if (fill) ctx.fill(); else ctx.stroke();
        }
        
        /// RENDER
        
        leg(true);
        leg(false);
        
    } else console.log("Unsupported style");
}