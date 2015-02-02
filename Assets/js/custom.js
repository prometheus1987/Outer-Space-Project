$( document ).ready(function() {  
  var c = document.querySelector(".c"), 
      ctx = c.getContext("2d"),
      xInt = 10,
      yInt = 80,
      inc = 0.05,
      max = 24,
      n=0,
      initCanvas,
      run,
      w, h,
      PI = Math.PI, 
      sin = Math.sin, cos = Math.cos,
      rId,
      trimUnit = function(i, u) {
        return parseInt(i.split(u)[0], 10);
      },
      $ = function(n,x,d){
        var dt = PI/d, 
            s = 0,
            i, t;

        for(i=0; i<d; i++){  
          t = dt*i;
          s += cos(n*t - x*sin(t));      
        }

        return s*(dt/PI);
      };

  run = function(){
    var plot, t;
    ctx.clearRect(0, 0, w, h);
    
    for(t=-max;t<max;t+=inc){
      plot = $(n, t, 200);
      ctx.fillStyle = "hsl(" + plot*510 + ", 100%, 50%)";
      ctx.fillRect((t+max)*xInt, 2*h/3-plot*yInt+Math.random()*20, 1, 1);
    }

    rId = requestAnimationFrame(run);
  };

  initCanvas = function() {
    var s;
    
    setTimeout(function() {
      s = getComputedStyle(c);
      w = c.width = trimUnit(s.width, "px");
      h = c.height = trimUnit(s.height, "px");
      
      if(rId)
        cancelAnimationFrame(rId);

      run();
    }, 500);
  };

  initCanvas();
  addEventListener("resize", initCanvas, false);
});