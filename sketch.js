// Initialize global the variables here
// In this template the following functions have been collected
//============================================================
// function Polar(xstart,ystart,r,theta) <<< This is a class
// usage Vr= new Polar(0,0,100,0) ;
// Vr.disp() is a method in class Polar()
// Vr.disp() retuns coods of end point
// ============================================================
// function mySliders() 
// This is called from setup. also defined are slider1.changed() etc
// statement like value=slider1.value() will be in the main function draw()
//=============================================================
// function my(y)
// returns -y to correct for wierd native cood system
//=============================================================
// function myAxes() <<< draws x and y axis
//============================================================
//function arrow(x1,y1,x2,y2) <<< arrow from (x1,y1) to (x2,y2)
//=============================================================
 
function setup() {
  createCanvas(600, 500);
  background('yellow')// background color
  stroke('blue')// foreground color
  fill('green')
  textSize(16)
  strokeWeight(1)// thickness
  angleMode(DEGREES)// <<<< This is a must <<<<<<<
  textSize(20)
  mySliders()
  // Initialize your variables here
  rota=0
  
  
};// end of mandatory function setup()

function Polar(xst,yst,r,theta){
  this.r=r;
  this.theta=theta;
  this.xst=xst
  this.yst=yst
  this.x=this.r*cos(this.theta);
  this.y=this.r*sin(this.theta);
  
  this.disp=function(){
    x1=xst;y1=yst;
    x2=x1+this.x; y2=y1-this.y;
     ellipse(x1,y1,5);
    dx=x2-x1;dy=y2-y1;
    m=sqrt(dx*dx+dy*dy);
    ang=atan2(dy,dx);
    angPI=ang+180;
    ang1=angPI-30;
    ang2=angPI+30;
    x3=x2+m*0.2*cos(ang1);
    y3=y2+m*0.2*sin(ang1);
    x4=x2+m*0.2*cos(ang2);
    y4=y2+m*0.2*sin(ang2);
    m=sqrt(dx*dx+dy*dy);
    line(x1,y1,x2,y2);// main 
    line(x2,y2,x3,y3);// flare
    line(x2,y2,x4,y4);// flare  
    return [ x2,y2 ]
    }// end of method Polar.disp() in class Polar();
  // A method for multiplication of polar phasors is defined below
  this.mult=function(aaa)
    {
      Vmult= new Polar(this.xst,this.yst,this.r*aaa.r,this.theta+aaa.theta)
      return Vmult
     }//end of method polar.mult(V)
  
  
  this.add=function(aaa)
    {
      x1 = this.x;y1 = this.y
      x2 = aaa.x ;y2 = aaa.y
      M=sqrt(((x1+x2)**2)+((y1+y2)**2))
      thute=atan2((y1+y2),(x1+x2))
      Vadd= new Polar(this.xst,this.yst,M,thute)
      return Vadd
     }//end of method polar.add(V)
  
}// end of class polar

function mySliders(){
  sMin=0;sMax=120;sDefault=sMax;sStep=10
  push();stroke('red');background('red')
  s1=createSlider(sMin,sMax,sDefault,sStep)
  s1.position(10,20)
  s1.style('width','100px')

  s1.changed(s1Changed)
  pop()
  
  s2=createSlider(sMin,sMax,sDefault/10,sStep)
  s2.position(10,70)
  s2.style('width','100px')
  s2.changed(s2Changed)
  
  s3=createSlider(sMin,sMax,sDefault,sStep)
  s3.position(10,120)
  s3.style('width','100px')
  s3.changed(s3Changed)
  
  
}// end of function mySlider()

function s1Changed(){
  //initialize variables here
  background('220')
}//end of function s1Changed

function s2Changed(){
//initializw variables here
  background('220')
}//end of function s2Changed

function s3Changed(){
//initializw variables here
  background('220')
}//end of function s2Changed

//<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
//====<><><><><><><><><><> main() <><><><><><><><><><><><><><><><>
//====<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
function draw() {
  background(180);
  translate(width/2,height/2) 
  
  push();stroke('red');text('Va = '+s1.value(),-width/2.1,-height/2.15);pop()
  push();stroke('yellow');text('Vb = '+s2.value(),-width/2.1,-height/2.8);pop()
  push();stroke('blue');text('Vc = '+s3.value(),-width/2.1,-height/3.9);pop()
  
  //coods for drawing Va,Vb,Vc phasors
  xabc=0;yabc=-100
  text('a-b-c  phasors',xabc,yabc-20)
  //===== The 'a' operator 
  a= new Polar(0,0,1,120)//1@/_120
  aSq=a.mult(a)         //1@/_240
  rota=rota+1
  Vr=new Polar(xabc,yabc,s1.value(),0+rota)
  Vy=new Polar(xabc,yabc,s2.value(),-120+rota)
  Vb=new Polar(xabc,yabc,s3.value(),120+rota)
  
  push();textSize(24)
  push();strokeWeight(4);stroke('red');xy=Vr.disp();text("Va",xy[0],xy[1]);pop()
  push();strokeWeight(4);stroke('yellow');xy=Vy.disp();text("Vb",xy[0],xy[1]);pop()
  push();strokeWeight(4);stroke('blue');xy=Vb.disp();text("Vc",xy[0],xy[1]);pop()
  pop()
  Va1=Vr.add(Vy.mult(a).add(Vb.mult(aSq)))
  Va2=Vr.add(Vy.mult(aSq).add(Vb.mult(a))) 
  Va0=Vr.add(Vy.add(Vb))
  
  
  oneBy3=new Polar(0,0,0.3333,0)
  Va1=Va1.mult(oneBy3)
  Va2=Va2.mult(oneBy3)
  Va0=Va0.mult(oneBy3)
  
  
  Va0_mag=round(Va0.r,2)
  Va1_mag=round(Va1.r,2)
  Va2_mag=round(Va2.r,2)
  
  xz=-200;yz=100
  text('   Zero Seq ',xz-50,yz+80)
  xp=0;yp=100
  text('      +ve Seq ',xp-50,yz+80)
  xn=200;yn=100
  text('  -ve Seq ',xn-50,yz+80)
  
  Vb1=Va1.mult(aSq)
  Vc1=Va1.mult(a)
  
  Vb2=Va2.mult(a)
  Vc2=Va2.mult(aSq)
  
  
  Va1=new Polar(xp,yp,Va1.r,Va1.theta)
  Vb1=new Polar(xp,yp,Vb1.r,Vb1.theta)
  Vc1=new Polar(xp,yp,Vc1.r,Vc1.theta)
  
  Va2=new Polar(xn,yn,Va2.r,Va2.theta)
  Vb2=new Polar(xn,yn,Vb2.r,Vb2.theta)
  Vc2=new Polar(xn,yn,Vc2.r,Vc2.theta)
  
  Va0=new Polar(xz,yz,Va0.r,Va0.theta)
  Vb0=new Polar(xz+10,yz+10,Va0.r,Va0.theta)
  Vc0=new Polar(xz+20,yz+20,Va0.r,Va0.theta)
  
  push();
  strokeWeight(1);textSize(0)
  push();stroke('red')   ;xy=Va1.disp();text('Va1',xy[0],xy[1]);pop();
  push();stroke('yellow');xy=Vb1.disp();text("Vb1",xy[0],xy[1]);pop()
  push();stroke('blue')  ;xy=Vc1.disp();text("Vc1",xy[0],xy[1]);pop()
  
  push();stroke('red')   ;xy=Va2.disp();text("Va2",xy[0],xy[1]);pop();
  push();stroke('yellow');xy=Vb2.disp();text("Vb2",xy[0],xy[1]);pop()
  push();stroke('blue')  ;xy=Vc2.disp();text("Vc2",xy[0],xy[1]);pop()
 
  push();stroke('red')   ;xy=Va0.disp();text("Va0",xy[0],xy[1]);pop();
  push();stroke('yellow');xy=Vb0.disp();text("Vb0",xy[0],xy[1]);pop()
  push();stroke('blue')  ;xy=Vc0.disp();text("Vc0",xy[0],xy[1]);pop()
  
  pop()
  myText()
  // End of your code
  //==================================================
}// end of mandatory function draw()

//========== User defined functions follow

 function my(y)
{ 
  return(-1*y)
  // This is to because y decreases upwards
}// end of function my(y)
//==========================================

function myAxes(){
line(-width/2,0,width/2,0)
line(0,my(height/2),0,my(-height/2))
}//end of function myCoods()

function arrow(x1,y1,x2,y2){
  // if angleMode() not set to degrees in setup
  angleMode(DEGREES)
  dx=x2-x1; dy=y2-y1;
  m=sqrt(dx*dx+dy*dy);
  a=(atan2(dy,dx));
  aPI=a+180;
  a1=aPI+20 ; a2=aPI-20;
  x3=x2+0.1*m*cos(a1);y3=y2+0.1*m*sin(a1);
  x4=x2+0.1*m*cos(a2);y4=y2+0.1*m*sin(a2);
  line(x1,y1,x2,y2);
  line(x2,y2,x3,y3);
  line(x2,y2,x4,y4);
  
};// end of function arrow()

function myText(){

text("Va0= 1/3 (Va+Vb+Vc)",-width/2,-60)
text("Va1= 1/3 (Va+aVb+aaVc)",-width/2,-40)
text("Va2= 1/3 (Va+aaVb+aVc)",-width/2,-20)
text("Symmetrical Components",-50,-height/2.2)

}//end of function myText
