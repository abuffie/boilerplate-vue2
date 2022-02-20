 // FireFlys
 // Forgot where I got this code, it has been modified
 // Uses canvas to create a bunch of whisps in the backgound
 // clicking should also spawn more at position
(function () {
    let canvas;
    let c = init("canvas"),
      w = (canvas.width = window.innerWidth-5),
      h = (canvas.height = window.innerHeight);
    
    //initiation
    class firefly{
        constructor(){
            this.t = 0;
            this.a=0;
            this.size=0;
            this.tickSpeed=this.RandomRange(0.001,.008);
            this.x = Math.random()*w;
            this.y = Math.random()*h;
            this.s = this.RandomRange(0.75,3);
            this.ang = Math.random()*2*Math.PI;
            this.v = this.s*this.s/4;        
        }
  
        move(){
            this.x += this.v*Math.cos(this.ang);
            this.y += this.v*Math.sin(this.ang);
            this.ang += Math.random()*20*Math.PI/180-10*Math.PI/180;
        }

        show(){
            //color alpha lerp
            this.a = (0 * (1 - this.t) + 1 * this.t);
            // lerp to size
            if(this.size<this.s){
                this.size+=.01;
            }
            this.t+=this.tickSpeed;
            c.beginPath();
            c.arc(this.x,this.y,this.size,0,2*Math.PI);
            c.fillStyle='rgb(245, 222, 179 , '+ this.a+')';
            c.fill();
            if(this.t>=1){
                this.tickSpeed *= -1;
            }
        }

        RandomRange(min, max) {
            return Math.random() * (max - min) + min;
        }
    }
    let f = [];


    function makeCluster(x,y){
      let c = Math.random()*10;
      while(c>0){
        let ff = new firefly();
        ff.x=x;
        ff.y=y;
        ff.t=1;
        ff.a=1;
        ff.size=ff.RandomRange(1,3);
        ff.fillStyle="#111";
        f.push(ff);
        c--;
      }
    }


    function draw() {
        if(f.length < 100){
            for(let j = 0; j < 10; j++){
                f.push(new firefly());
            }
        }
      //animation
      for(let i = 0; i < f.length; i++){
      f[i].move();
      f[i].show();
      if(f[i].x < 0 || f[i].x > w || f[i].y < 0 || f[i].y > h){
         f.splice(i,1);
         }
      }
    }
    let mouse = {};
    let last_mouse = {};
   
    canvas.addEventListener(
      "mousemove",
      function(e) {
      last_mouse.x = mouse.x;
      last_mouse.y = mouse.y;
      mouse.x = e.pageX - this.offsetLeft;
      mouse.y = e.pageY - this.offsetTop;
      },
      false
    );
    function init(elemid) {
      canvas = document.createElement("canvas");
      canvas.style.position='absolute';
      canvas.style.zIndex=0;
      canvas.style.maxWidth="100%";

      window.addEventListener("click", 
    function(e){
      makeCluster(e.clientX, e.clientY);
    });

      //let canvas = document.getElementById(elemid),
      let c = canvas.getContext("2d"),
      w = (canvas.width = window.innerWidth),
      h = (canvas.height = window.innerHeight);
      c.fillStyle = "rgba(30,30,30,0)";
      c.fillRect(0, 0, w, h);
      document.body.prepend(canvas);
      return c;
    }
    window.requestAnimFrame = (function() {
      return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(callback) {
        window.setTimeout(callback);
      }
      );
    });
    function loop() {
      window.requestAnimFrame(loop);
      c.clearRect(0, 0, w, h);
      draw();
    }
    window.addEventListener("resize", function() {
      (w = canvas.width = window.innerWidth),
      (h = canvas.height = window.innerHeight);
      loop();
    });
    loop();
    setInterval(loop, 1000 / 60);
}());