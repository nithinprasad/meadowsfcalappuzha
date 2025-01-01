      
var deg=Math.PI/180;
var xorigine=150; 
var yorigine=150;
currentcamtime= new Date();
var cam={
	focale:250,
	x:0,
	y:0,
	z:0,
	x0:0,
	y0:0,
	z0:150,
	rcam:10,
	tetacam:0,
	phicam:10,
	vtetacam:1,
	vphicam:0,
	icam:{x:0,y:1,z:0},
	jcam:{x:1,y:0,z:0},
	kcam:{x:0,y:0,z:-1},
	phase:"perso",
	perso_target:Math.floor(22*Math.random()),
	lasttime:currentcamtime.getTime(),
	changetime:1+4*Math.random()
};
//ball
var balle={
	rballe:10,               
	x:0,
	y:0,               
	z:10,
	vx:0,
	vy:0,
	vz:0,
	phase:"alone",
	perso_got:-1,
	goal_point:{x:0,y:0,z:0},
	goal_perso:-1,
	path:[],
	possible:1
};
//terrain
var terrain=[];
var ltx=2000;
var lty=1000;
part=[[-1.4*ltx,-1.4*lty,0],[-1.4*ltx,1.4*lty,0],[1.4*ltx,1.4*lty,0],[1.4*ltx,-1.4*lty,0],[-1.4*ltx,-1.4*lty,0]];
terrain.push(part);
part=[[-1.45*ltx,-1.45*lty,400],[-1.45*ltx,1.45*lty,400],[1.45*ltx,1.45*lty,400],[1.45*ltx,-1.45*lty,400],[-1.45*ltx,-1.45*lty,400]];
terrain.push(part);
part=[[-1.4*ltx,-1.4*lty,0],[-1.45*ltx,-1.45*lty,400]];
terrain.push(part);
part=[[-1.4*ltx,1.4*lty,0],[-1.45*ltx,1.45*lty,400]];
terrain.push(part);
part=[[1.4*ltx,1.4*lty,0],[1.45*ltx,1.45*lty,400]];
terrain.push(part);
part=[[1.4*ltx,-1.4*lty,0],[1.45*ltx,-1.45*lty,400]];
terrain.push(part);
part=[[-ltx,-lty,0],[-ltx,lty,0],[ltx,lty,0],[ltx,-lty,0],[-ltx,-lty,0]];
terrain.push(part);
part=[[0,-lty,0],[0,lty,0]];
terrain.push(part);
part=[];
for(a=0;a<21;a++){
	an=18*a*deg;
	xx=200*Math.cos(an);
	yy=200*Math.sin(an);
	part.push([xx,yy,0]);
}
terrain.push(part);
for(d=-1;d<3;d+=2){
	part=[[d*ltx,-0.6*lty,0],[d*0.6*ltx,-0.6*lty,0],[d*0.6*ltx,0.6*lty,0],[d*ltx,0.6*lty,0]];
	terrain.push(part);
	part=[[d*ltx*0.6,165,0]];
	for(a=0;a<21;a++){
		an=(90+18*a)*deg;
		xx=ltx*0.6+100+200*Math.cos(an);
		yy=200*Math.sin(an);
		if (xx<ltx*0.6) {                
			part.push([d*xx,yy,0]);
		}            
	}          
	part.push([d*ltx*0.6,-165,0]);
	terrain.push(part);
	part=[[d*ltx,-0.3*lty,0],[d*0.9*ltx,-0.3*lty,0],[d*0.9*ltx,0.3*lty,0],[d*ltx,0.3*lty,0]];
	terrain.push(part);
	part=[[d*ltx,-0.3*lty,0],[d*ltx,-0.3*lty,220],[d*ltx,0.3*lty,220],[d*ltx,0.3*lty,0]];
	terrain.push(part);
	part=[[d*ltx,-0.3*lty,220],[d*1.1*ltx,-0.3*lty,200],[d*1.1*ltx,0.3*lty,200],[d*ltx,0.3*lty,220]];
	terrain.push(part);
	part=[[d*1.15*ltx,-0.3*lty,0],[d*1.1*ltx,-0.3*lty,200],[d*1.1*ltx,0.3*lty,200],[d*1.15*ltx,0.3*lty,0]];
	terrain.push(part);
	part=[[d*ltx,-0.3*lty,0],[d*1.15*ltx,-0.3*lty,0],[d*1.15*ltx,0.3*lty,0],[d*ltx,0.3*lty,0]];
	terrain.push(part);
}
var dng=10; 
var zone_width=3*ltx;
var zone_height=3*lty;        
var dxcell=zone_width/dng;
var dycell=zone_height/dng;
var cell = new Array(dng);
for (var i = 0; i < dng; i++) {
	cell[i] = new Array(dng);
	for (var j = 0; j < dng; j++) {
		cell[i][j]=new Array(0);                
	}
}
nb_personnages=22;
var personnages=[];
var rperso=75;
var ralentisseur=1;
var dconsideration=4*rperso*rperso;
var objectif_collectif=1;
var count_objectif_collectif=0;
var action_en_cours=[1,1];
//positions
var positions=[];
posdat=[];
for(a=0;a<11;a++){
	posdat.push({x:-ltx/2+ltx/11*a,y:-1.4*lty,ang:90});
}
for(a=0;a<11;a++){
	posdat.push({x:posdat[a].x,y:-posdat[a].y,ang:270});
}
positions.push({nom:"init",data:posdat});
posdat=[{x:200,y:0,ang:180},{x:100,y:-220,ang:100},{x:100,y:220,ang:260},{x:ltx/3-100,y:-2*lty/3,ang:170},{x:ltx/3+100,y:-lty/3,ang:180},{x:ltx/3+100,y:lty/3,ang:180},{x:ltx/3-100,y:2*lty/3,ang:190},{x:2*ltx/3-100,y:-lty/2,ang:170},{x:2*ltx/3+100,y:0,ang:180},{x:2*ltx/3-100,y:lty/2,ang:190},{x:ltx-100,y:0,ang:180}];
for(a=0;a<11;a++){
	posdat.push({x:-posdat[a].x,y:-posdat[a].y,ang:posdat[a].ang+180});
}    
positions.push({nom:"envoi",data:posdat});

var zone_couvrir=[];
delta_cx=100;
delta_cy=50;
posdat=[{xmin:-ltx/3,ymin:-lty/3,xmax:ltx/3,ymax:lty/3},

				{xmin:-ltx/3,ymin:-lty,xmax:ltx/3,ymax:-lty/3},
				{xmin:-ltx/3,ymin:lty/3,xmax:ltx/3,ymax:lty},

				{xmin:ltx/3,ymin:-lty,xmax:2*ltx/3,ymax:-lty/2},
				{xmin:ltx/3,ymin:-lty/2,xmax:2*ltx/3,ymax:0},
				{xmin:ltx/3,ymin:0,xmax:2*ltx/3,ymax:lty/2},
				{xmin:ltx/3,ymin:lty/2,xmax:2*ltx/3,ymax:lty},

				{xmin:2*ltx/3,ymin:-lty,xmax:ltx,ymax:-lty/3},
				{xmin:2*ltx/3,ymin:-lty/3,xmax:5*ltx/6,ymax:lty/3},
				{xmin:2*ltx/3,ymin:lty/3,xmax:ltx,ymax:lty},

				{xmin:5*ltx/6,ymin:-lty/3,xmax:ltx,ymax:lty/3}];
for(a=0;a<11;a++){
	posdat[a].xmin-=delta_cx;
	posdat[a].ymin-=delta_cy;
	posdat[a].xmax+=delta_cx;
	posdat[a].ymax+=delta_cy;
	posdat.push({xmin:-posdat[a].xmax,ymin:-posdat[a].ymax,xmax:-posdat[a].xmin,ymax:-posdat[a].ymin});
} 
zone_couvrir.push(posdat);

posdat=[{xmin:-ltx/2,ymin:-lty/3,xmax:0,ymax:lty/3},

				{xmin:-ltx/2,ymin:-lty,xmax:0,ymax:-lty/3},
				{xmin:-ltx/2,ymin:lty/3,xmax:0,ymax:lty},

				{xmin:0,ymin:-lty,xmax:ltx/2,ymax:-lty/2},
				{xmin:0,ymin:-lty/2,xmax:ltx/2,ymax:0},
				{xmin:0,ymin:0,xmax:ltx/2,ymax:lty/2},
				{xmin:0,ymin:lty/2,xmax:ltx/2,ymax:lty},

				{xmin:ltx/2,ymin:-lty,xmax:ltx,ymax:-lty/3},
				{xmin:ltx/2,ymin:-lty/3,xmax:4*ltx/5,ymax:lty/3},
				{xmin:ltx/2,ymin:lty/3,xmax:ltx,ymax:lty},

				{xmin:4*ltx/5,ymin:-lty/3,xmax:ltx,ymax:lty/3}];
for(a=0;a<11;a++){
	posdat[a].xmin-=delta_cx;
	posdat[a].ymin-=delta_cy;
	posdat[a].xmax+=delta_cx;
	posdat[a].ymax+=delta_cy;
	posdat.push({xmin:-posdat[a].xmax,ymin:-posdat[a].ymax,xmax:-posdat[a].xmin,ymax:-posdat[a].ymin});
} 
zone_couvrir.push(posdat);

posdat=[{xmin:-ltx,ymin:-lty/3,xmax:-ltx/3,ymax:lty/3},

				{xmin:-ltx,ymin:-lty,xmax:-ltx/3,ymax:-lty/3},
				{xmin:-ltx,ymin:lty/3,xmax:-ltx/3,ymax:lty},

				{xmin:-ltx/3,ymin:-lty,xmax:ltx/3,ymax:-lty/2},
				{xmin:-ltx/3,ymin:-lty/2,xmax:ltx/3,ymax:0},
				{xmin:-ltx/3,ymin:0,xmax:ltx/3,ymax:lty/2},
				{xmin:-ltx/3,ymin:lty/2,xmax:ltx/3,ymax:lty},

				{xmin:ltx/3,ymin:-lty,xmax:ltx,ymax:-lty/3},
				{xmin:ltx/3,ymin:-lty/3,xmax:3*ltx/4,ymax:lty/3},
				{xmin:ltx/3,ymin:lty/3,xmax:ltx,ymax:lty},

				{xmin:3*ltx/4,ymin:-lty/3,xmax:ltx,ymax:lty/3}];
for(a=0;a<11;a++){
	posdat[a].xmin-=delta_cx;
	posdat[a].ymin-=delta_cy;
	posdat[a].xmax+=delta_cx;
	posdat[a].ymax+=delta_cy;
	posdat.push({xmin:-posdat[a].xmax,ymin:-posdat[a].ymax,xmax:-posdat[a].xmin,ymax:-posdat[a].ymin});
} 
zone_couvrir.push(posdat);

var id_root=0;
var id_body=1;
var id_head=2;
var id_top_left_arm=3;
var id_bottom_left_arm=4;
var id_top_right_arm=5;
var id_bottom_right_arm=6;
var id_top_left_leg=7;
var id_bottom_left_leg=8;
var id_left_foot=9;
var id_top_right_leg=10;
var id_bottom_right_leg=11;
var id_right_foot=12;

function  personnage(id,x,y,ang,team,action,xgoal,ygoal,anggoal) {
	this.id=id;
	this.x=x;
	this.y=y;
	this.z=0;
	this.orient=0;
	this.team=team;
	if (this.team==0) {
		this.color="red";
	}else{
		this.color="blue";
	}
	this.xcell=Math.floor(dng*(this.x+zone_width/2)/zone_width);
	this.ycell=Math.floor(dng*(this.y+zone_height/2)/zone_height);
	cell[this.xcell][this.ycell].push(this.id);
	this.action=action;
	this.xgoal=xgoal;
	this.ygoal=ygoal;
	this.anggoal=anggoal;
	this.ang=ang;
	this.v=1;
	this.vx=this.v*Math.cos(ang*deg);
	this.vy=this.v*Math.sin(ang*deg);
	this.bases=[];
	this.gotballe=0;
	this.phase="marche";
	this.next_phase="wait";
	this.twait=5;
	this.squeleton=[];
	stru={name:id_root,parent:-1,parent_origin:[0,0,0],rotation:{x:0,y:0,z:0},point:[]};
	this.squeleton.push(stru);
	stru={name:id_body,parent:id_root,parent_origin:[0,0,90],rotation:{x:0,y:0,z:0},point:[[0,0,10],[-20,0,10],[-10,0,-30],[10,0,-30],[20,0,10],[0,0,10]]};
	this.squeleton.push(stru);
	stru={name:id_head,parent:id_body,parent_origin:[0,0,22],rotation:{x:0,y:0,z:0},point:[[0,0,-12],[0,0,-10],[10,0,-10],[10,0,10],[-10,0,10],[-10,0,-10],[0,0,-10]]};
	this.squeleton.push(stru);
	stru={name:id_top_left_arm,parent:id_body,parent_origin:[-20,0,10],rotation:{x:0,y:0,z:0},point:[[0,0,0],[0,0,-25]]};
	this.squeleton.push(stru);
	stru={name:id_bottom_left_arm,parent:id_top_left_arm,parent_origin:[0,0,-25],rotation:{x:0,y:0,z:0},point:[[0,0,0],[0,0,-20]]};
	this.squeleton.push(stru);
	stru={name:id_top_right_arm,parent:id_body,parent_origin:[20,0,10],rotation:{x:0,y:0,z:0},point:[[0,0,0],[0,0,-25]]};
	this.squeleton.push(stru);
	stru={name:id_bottom_right_arm,parent:id_top_right_arm,parent_origin:[0,0,-25],rotation:{x:0,y:0,z:0},point:[[0,0,0],[0,0,-20]]};
	this.squeleton.push(stru);
	stru={name:id_top_left_leg,parent:id_body,parent_origin:[-10,0,-30],rotation:{x:0,y:0,z:0},point:[[0,0,0],[0,0,-30]]};
	this.squeleton.push(stru);
	stru={name:id_bottom_left_leg,parent:id_top_left_leg,parent_origin:[0,0,-30],rotation:{x:0,y:0,z:0},point:[[0,0,0],[0,0,-30]]};
	this.squeleton.push(stru);
	stru={name:id_left_foot,parent:id_bottom_left_leg,parent_origin:[0,0,-30],rotation:{x:0,y:0,z:0},point:[[0,0,0],[-3,0,0],[-3,12,0],[3,12,0],[3,0,0],[0,0,0]]};
	this.squeleton.push(stru);
	stru={name:id_top_right_leg,parent:id_body,parent_origin:[10,0,-30],rotation:{x:0,y:0,z:0},point:[[0,0,0],[0,0,-30]]};
	this.squeleton.push(stru);
	stru={name:id_bottom_right_leg,parent:id_top_right_leg,parent_origin:[0,0,-30],rotation:{x:0,y:0,z:0},point:[[0,0,0],[0,0,-30]]};
	this.squeleton.push(stru);
	stru={name:id_right_foot,parent:id_bottom_right_leg,parent_origin:[0,0,-30],rotation:{x:0,y:0,z:0},point:[[0,0,0],[-3,0,0],[-3,12,0],[3,12,0],[3,0,0],[0,0,0]]};
	this.squeleton.push(stru);             
	this.do_bases_squeleton = function () {
		this.bases=[];                  
		s={xo:0,yo:0,zo:0,i:{x:Math.cos(this.orient),y:Math.sin(this.orient),z:0},j:{x:-Math.sin(this.orient),y:Math.cos(this.orient),z:0},k:{x:0,y:0,z:1}};                  
		this.bases.push(s);
		this.squeleton[0].rotation.z=this.orient;
		for(a=1;a<this.squeleton.length;a++){
			struc=this.squeleton[a];
			//trouve le repère parent
			xo=0;
			yo=0;
			zo=0;
			i={x:1,y:0,z:0};
			j={x:0,y:1,z:0};
			k={x:0,y:0,z:1};                                            
			//cherche la position du parent                    
			for(b=0;b<this.squeleton.length;b++){
				if (this.squeleton[b].name==struc.parent) {                                
					//origine du membre dans le repère absolu
					xo=this.bases[b].xo+struc.parent_origin[0]*this.bases[b].i.x+struc.parent_origin[1]*this.bases[b].j.x+struc.parent_origin[2]*this.bases[b].k.x;
					yo=this.bases[b].yo+struc.parent_origin[0]*this.bases[b].i.y+struc.parent_origin[1]*this.bases[b].j.y+struc.parent_origin[2]*this.bases[b].k.y;
					zo=this.bases[b].zo+struc.parent_origin[0]*this.bases[b].i.z+struc.parent_origin[1]*this.bases[b].j.z+struc.parent_origin[2]*this.bases[b].k.z;
					//rotation x
					teta=struc.rotation.x;                           
					ix=rot_norm_ang(i,i,teta);
					jx=rot_norm_ang(j,i,teta);
					kx=rot_norm_ang(k,i,teta);
					//rotation y
					teta=struc.rotation.y;
					iy=rot_norm_ang(ix,j,teta);
					jy=rot_norm_ang(jx,j,teta);
					ky=rot_norm_ang(kx,j,teta);
					//rotation z
					teta=struc.rotation.z;
					iz=rot_norm_ang(iy,k,teta);
					jz=rot_norm_ang(jy,k,teta);
					kz=rot_norm_ang(ky,k,teta);
					
					i={x:iz.x*this.bases[b].i.x+iz.y*this.bases[b].j.x+iz.z*this.bases[b].k.x,y:iz.x*this.bases[b].i.y+iz.y*this.bases[b].j.y+iz.z*this.bases[b].k.y,z:iz.x*this.bases[b].i.z+iz.y*this.bases[b].j.z+iz.z*this.bases[b].k.z};
					j={x:jz.x*this.bases[b].i.x+jz.y*this.bases[b].j.x+jz.z*this.bases[b].k.x,y:jz.x*this.bases[b].i.y+jz.y*this.bases[b].j.y+jz.z*this.bases[b].k.y,z:jz.x*this.bases[b].i.z+jz.y*this.bases[b].j.z+jz.z*this.bases[b].k.z};
					k={x:kz.x*this.bases[b].i.x+kz.y*this.bases[b].j.x+kz.z*this.bases[b].k.x,y:kz.x*this.bases[b].i.y+kz.y*this.bases[b].j.y+kz.z*this.bases[b].k.y,z:kz.x*this.bases[b].i.z+kz.y*this.bases[b].j.z+kz.z*this.bases[b].k.z};
				}
			}                        
			s={xo:xo,yo:yo,zo:zo,i:{x:i.x,y:i.y,z:i.z},j:{x:j.x,y:j.y,z:j.z},k:{x:k.x,y:k.y,z:k.z}};
			this.bases.push(s);
		}
	}    
	//animations
	this.do_animate = function () {
		switch (this.phase) {
			case "marche":
				this.do_anim_marche();
				break;
			case "wait":
				this.do_anim_wait();
				break;
			case "tacle":
				this.do_anim_tacle();
				break;
			case "tombe":
				this.do_anim_tombe();
				break;
			case "saute":
				this.do_anim_saute();
				break;
			case "head":
				this.do_anim_head();
				break;
			case "volee":
				this.do_anim_volee();
				break;
			case "amorti":
				this.do_anim_amorti();
				break;
			default:
				break;
											}
	}

	this.do_anim_marche = function () {
		switch (this.action) {
			case "reach_point":
				this.v=0.9*this.v+1;
				dx=this.xgoal-this.x;
				dy=this.ygoal-this.y;
				dd=Math.sqrt(dx*dx+dy*dy);
				if (dd<10) {
					//reached                                
					this.x=this.xgoal;
					this.y=this.ygoal;
					if (this.next_phase=="wait") {
						count_objectif_collectif++;
						if (count_objectif_collectif==22) {
							ralentisseur=2;
							objectif_collectif=0;
						}
						this.phase="wait";
						currenttime = new Date();
						this.t0=currenttime.getTime();
						this.next_phase="marche";
						this.v=2;
						this.ang=this.anggoal;
						this.vx=Math.cos(this.ang*deg);
						this.vy=Math.sin(this.ang*deg);                                    
					}else{                                   
						act=action_en_cours[this.team];
						okg=0;
						while(okg==0){
							//recommence tant que le point à atteindre n'est pas dans le terrain
							this.xgoal=zone_couvrir[act][this.id].xmin+Math.random()*(zone_couvrir[act][this.id].xmax-zone_couvrir[act][this.id].xmin);
							this.ygoal=zone_couvrir[act][this.id].ymin+Math.random()*(zone_couvrir[act][this.id].ymax-zone_couvrir[act][this.id].ymin);
							okg=1;
							if ((this.xgoal>ltx-10)||(this.xgoal<-ltx+10)||(this.ygoal>lty-10)||(this.ygoal<-lty+10)) {
								okg=0;
							}
						}
						this.v=0;
					}

				}else{

					dx=dx/dd;
					dy=dy/dd;
					this.vx=this.v*dx;
					this.vy=this.v*dy;
					this.x+=this.vx/ralentisseur;
					this.y+=this.vy/ralentisseur;

					if (objectif_collectif==0){                                    
						if (Math.random()*1000<4) {
							//this.phase="tacle";
							//this.phase2="init";
						}
					}
				}
				break;
			case "reach_ball":
				this.x+=this.vx;
				this.y+=this.vy;
				break;
			case "random":
				this.v=Math.sqrt(this.vx*this.vx+this.vy*this.vy);
				this.x+=this.vx;
				this.y+=this.vy;
				if (this.x<-ltx) {
					this.x=-ltx;
					this.vx=Math.abs(this.vx);
				}
				if (this.x>ltx) {
					this.x=ltx;
					this.vx=-Math.abs(this.vx);
				}
				if (this.y<-lty) {
					this.y=-lty;
					this.vy=Math.abs(this.vy);
				}
				if (this.y>lty) {
					this.y=lty;
					this.vy=-Math.abs(this.vy);
				}

			default:
				break;
											 }
		xcel=Math.floor(dng*(this.x+zone_width/2)/zone_width);
		ycel=Math.floor(dng*(this.y+zone_height/2)/zone_height);
		if ((xcel!=this.xcell)||(ycel!=this.ycell)) {            
			var pos=-1;
			for(var i=0;i<cell[this.xcell][this.ycell].length;i++){
				if (cell[this.xcell][this.ycell][i]==this.id) {
					pos=i;
				}
			}
			if (pos>-1) {                           
				cell[this.xcell][this.ycell].splice(pos,1);                           
				if ((xcel>-1)&&(ycel>-1)&&(xcel<dng)&&(ycel<dng)) { 
					this.xcell=xcel;
					this.ycell=ycel;
					cell[this.xcell][this.ycell].push(this.id);
				}                           
			}
		}

		if ((objectif_collectif==0)&&(this.action!="reach_ball")) {
	
			for(i=0;i<cell[this.xcell][this.ycell].length;i++){
				var id_other=cell[this.xcell][this.ycell][i];
				if (id_other!=this.id) {
					if(personnages[id_other].phase=="marche"){
						
						var xx=personnages[id_other].x;
						var yy=personnages[id_other].y;
						var dxx=xx-this.x;
						var dyy=yy-this.y;
						var d2=dxx*dxx+dyy*dyy;
						if (d2<dconsideration) {                                    
							dd=Math.sqrt(dxx*dxx+dyy*dyy);
							if (dd==0) {
								dd=1;
							}
							dxx=dxx/dd;
							dyy=dyy/dd;
							dt=-(this.xgoal-this.x)*dyy+(this.ygoal-this.y)*dxx;
							if (dt==0) {
								dt=1;
							}
							dt=dt/Math.abs(dt);
							this.xgoal=this.x-dt*dyy*150;
							this.ygoal=this.y+dt*dxx*150;
							if ((Math.abs(this.xgoal)>ltx)||(Math.abs(this.ygoal)>lty)) {
								this.xgoal=-ltx+2*ltx*Math.random();
								this.ygoal=-lty+2*lty*Math.random();
							}
							this.x-=dxx*20;
							this.y-=dyy*20;
						}
					}
				}
			}
			angl=Math.atan2(this.vy,this.vx);
			xv=Math.cos(angl);
			yv=Math.sin(angl);
			xu=yv;
			yu=-xu;
			if (this.gotballe==1) {
				//le personnage a la balle
				balle.x=this.x+40*xv;
				balle.y=this.y+40*yv;
				//passe aléatoire vers un des 3 plus proches ?
				if (Math.random()*50<1) {
					this.try_pass(0);
				}
			}else{
				//le personnage n'a pas la balle
				dxb=balle.x-this.x;
				dyb=balle.y-this.y;                            
				if (balle.possible==1) {
					//la balle n'est pas en jeu                                
					dxbb=dxb*xu+dyb*yu;
					dybb=dxb*xv+dyb*yv;
					if ((dxbb>-30)&&(dxbb<30)&&(dybb>30)&&(dybb<60)) {
						//un personnage vient de prendre la balle
						persoavant=balle.perso_got;
						if (persoavant>-1) {
							personnages[persoavant].gotballe=0;    
						}
						balle.possible=0;
						balle.perso_got=this.id;
						this.gotballe=1;
						cam.dn=20;
						cam.phase="transition";
						cam.tetacam=cam.tetacam%360;
						cam.nextphase="perso";
						cam.perso_target=this.id;
						cam.next_r=100+100*Math.random();                    
						cam.next_phi=5+10*Math.random();
						cam.changetime=1+4*Math.random();
					}
				}else{
					//la balle est-elle dans la zone que couvre le joueur ?
					if(this.action=="reach_point"){
						//le personnage est actif
						okball=1;
						if (balle.perso_got!=-1) {
							//un personnage détient la balle
							if (personnages[balle.perso_got].team==this.team) {
								//c'est un coéquipier
								okball=0;
							}
						}
						if (okball==1) {
							//le joueur cherche à atteindre la balle                                    
							if ((balle.x>zone_couvrir[this.team][this.id].xmin)&&(balle.x<zone_couvrir[this.team][this.id].xmax)&&(balle.y>zone_couvrir[this.team][this.id].ymin)&&(balle.y<zone_couvrir[this.team][this.id].ymax)) {
								
								this.xgoal=balle.x;
								this.ygoal=balle.y;
							}
						}else{
							//le joueur devrait chercher à bien se positionner pour aider son coéquipier
						}
					}
					//la balle est en jeu
					if (balle.perso_got!=-1) {
						//il y a un porteur de balle
						if ((this.team!=personnages[balle.perso_got].team)&&(personnages[balle.perso_got].phase=="marche")&&(this.tacledby!=personnages[balle.perso_got].id)) {
							//le porteur de balle est de l'équipe adverse, marche et n'est pas le dernier a l'avoir taclé
							dist_balle=Math.sqrt(dxb*dxb+dyb*dyb);
							dxbb=dxb*xu+dyb*yu;
							dybb=dxb*xv+dyb*yv;
							if ((dybb>0)&&(dybb<250)&&(dxbb<75/250*dybb)&&(dxbb>-75/250*dybb)) {
								//la balle est accessible dans un triangle devant le joueur
								if (this.v>5) {
									//la vitesse du personnage est suffisante
									//on tacle
									this.phase="tacle";
									this.phase2="init";
									//on s'oriente vers la balle
									ang=Math.atan2(dyb,dxb);
									this.vx=Math.cos(ang)*this.v;
									this.vy=Math.sin(ang)*this.v;                                                
								}                                           
							}
						}
					}
				}
			}
		}
		vv=this.v/10;
		ori=Math.atan2(this.vy,this.vx)-Math.PI/2;                    
		this.orient=ori;

		this.squeleton[id_bottom_left_arm].rotation.x=45*vv*deg;
		this.squeleton[id_top_left_arm].rotation.y=25*vv*deg;
		this.squeleton[id_top_right_arm].rotation.y=-25*vv*deg;
		this.squeleton[id_bottom_right_arm].rotation.x=45*vv*deg;         
		this.squeleton[id_bottom_left_leg].rotation.x=-45*vv*deg;         
		this.squeleton[id_bottom_right_leg].rotation.x=-10*vv*deg;
		currenttime = new Date();
		t = currenttime.getTime()/100+this.ang*deg;
		rot1=20*Math.cos(t)*deg*vv;
		rot2=rot1*25/20;
		rot3=rot1*45/20;
		rot4=10*Math.cos(t/2)*deg*vv;
		this.squeleton[id_head].rotation.z=rot1/2;
		this.squeleton[id_top_left_arm].rotation.x=rot3;
		this.squeleton[id_top_right_arm].rotation.x=-rot3;
		this.squeleton[id_top_left_leg].rotation.x=-rot2*2;
		this.squeleton[id_top_right_leg].rotation.x=rot2*2;
		this.squeleton[id_body].rotation.x=rot4;
		this.squeleton[id_head].rotation.x=-rot4;
		this.do_bases_squeleton();
	}

	//tente une passe
	this.try_pass = function (obligation){
		distance_id_proches=[];
		for(a=0;a<11;a++){
			ida=11*this.team+a;
			if ((ida!=this.id)&&(personnages[ida].phase=="marche")) {
				dxaa=personnages[ida].x-this.x;
				dyaa=personnages[ida].y-this.y;
				distance_id_proches.push(dxaa*dxaa+dyaa*dyaa);
			}else{
				distance_id_proches.push(-1);
			}                                    
		}
		id_proches=[];
		for(b=0;b<3;b++){
			dddmax=100000000;
			idchoice=-1;
			for(a=0;a<11;a++){
				if ((distance_id_proches[a]>0)&&(distance_id_proches[a]<dddmax)) {
					idchoice=a;
					dddmax=distance_id_proches[a];
				}
			}
			distance_id_proches[idchoice]=-1;
			id_proches.push([idchoice,dddmax]);                                    
		}
		rand=Math.floor(Math.random()*id_proches.length);       
		id_autre=11*this.team+id_proches[rand][0];
		dist_autre=Math.sqrt(id_proches[rand][1]);                        
		okk=0;
		rgx=personnages[id_autre].x-this.x;
		rgy=personnages[id_autre].y-this.y;
		pass_done=0;
		if ((rgx*xv+rgy*yv>150)||(obligation==1)) {
			//fait une passe si le perso choisi est devant et plus loin que 150 ou si c'est obligatoire
			pass_done=1;
			this.gotballe=0;
			balle.perso_got=-1;
			M0={x:balle.x,y:balle.y,z:balle.z};
			rr=Math.sqrt(rgx*rgx+rgy*rgy);
			hmax=20+Math.random()*rr/4;
			nr=(0.5+Math.floor(Math.random()*15))/10;
			rr=rr/nr;
			if (rr>350) {
				rr=350;
			}
			//choix d'un point de reception dans le terrain pour le joueur cible
			while(okk==0){                                    
				anf=Math.random()*360*deg;
				xx=personnages[id_autre].x+rr*Math.cos(anf);
				yy=personnages[id_autre].y+rr*Math.sin(anf);
				if ((Math.abs(xx)<ltx)&&(Math.abs(yy)<lty)) {
					okk=1;
				}
			}
			//choix du type de tir                     
			balle.goal_perso=id_autre;
			dgx=xx-M0.x;
			dgy=yy-M0.y;
			dist_obj=Math.sqrt(dgx*dgx+dgy*dgy);                            
			personnages[id_autre].xgoal=xx;
			personnages[id_autre].ygoal=yy;
			if ((Math.random()<0.5)&&(dist_obj>250)) {
				typ=Math.random();
				//passe en hauteur
				if (typ<0.33){
					//tete
					personnages[id_autre].phase="head";
					personnages[id_autre].phase2="court";
					M1={x:xx,y:yy,z:150+Math.random()*100};                                

				}else if (typ<0.66){
					//retour de volée
					personnages[id_autre].phase="volee";
					personnages[id_autre].phase2="court";
					M1={x:xx,y:yy,z:150+Math.random()*100};                                

				}else{
					//amorti
					personnages[id_autre].phase="amorti";
					personnages[id_autre].phase2="court";
					M1={x:xx,y:yy,z:150+Math.random()*100};                                

				}
				hmax=M1.z+Math.random()*50; //on peut avoir choisit un hmax plus bas que le point à atteindre
			}else{
				//passe normale
				personnages[id_autre].action="reach_ball";
				M1={x:xx,y:yy,z:balle.rballe};

			}

			balle.path=get_ball_path(M0,M1,hmax);                           
			personnages[id_autre].vx=(personnages[id_autre].xgoal-personnages[id_autre].x)/balle.path.length;
			personnages[id_autre].vy=(personnages[id_autre].ygoal-personnages[id_autre].y)/balle.path.length;
			personnages[id_autre].v=Math.sqrt(personnages[id_autre].vx*personnages[id_autre].vx+personnages[id_autre].vy*personnages[id_autre].vy);
			balle.phase="path";
			cam.phase="balle";
		}
	}


	//wait
	this.do_anim_wait = function () {
		currenttime = new Date();
		t = (currenttime.getTime()-this.t0)/1000;
		if (t>this.twait) {
			this.phase="marche";
			this.action="reach_point";
			this.xgoal=-ltx+2*ltx*Math.random();
			this.ygoal=-lty+2*lty*Math.random();
		}
	}

	//tacle
	this.do_anim_tacle = function () {
		//squelette
		if (this.phase2=="init") {                                                                        
			ori=Math.atan2(this.vy,this.vx)-Math.PI/2;
			this.has_shot=0;
			this.orient=ori;
			this.vx=3*this.vx;
			this.vy=3*this.vy;                        
			this.do_bases_squeleton();
			this.step_rem=10;
			this.body_drotx=((80+Math.random()*10-Math.random()*10)*deg-this.squeleton[id_body].rotation.x)/this.step_rem;
			this.head_drotx=((-35+Math.random()*8-Math.random()*8)*deg-this.squeleton[id_head].rotation.x)/this.step_rem;
			this.top_right_leg_drotx=((-5+Math.random()*15-Math.random()*5)*deg-this.squeleton[id_top_right_leg].rotation.x)/this.step_rem;
			this.bottom_right_leg_drotx=((-5+Math.random()*15-Math.random()*5)*deg-this.squeleton[id_bottom_right_leg].rotation.x)/this.step_rem;
			this.top_left_leg_drotx=((50+Math.random()*15-Math.random()*15)*deg-this.squeleton[id_top_left_leg].rotation.x)/this.step_rem;
			this.bottom_left_leg_drotx=((-90+Math.random()*15-Math.random()*15)*deg-this.squeleton[id_bottom_left_leg].rotation.x)/this.step_rem;
			this.fall_dz=(-90-this.z)/this.step_rem;                        
			this.phase2="chute";
		}else if (this.phase2=="chute") {                        
			this.squeleton[id_body].rotation.x+=this.body_drotx;                                       
			this.squeleton[id_head].rotation.x+=this.head_drotx;
			this.squeleton[id_top_right_leg].rotation.x+=this.top_right_leg_drotx;
			this.squeleton[id_bottom_right_leg].rotation.x+=this.bottom_right_leg_drotx;
			this.squeleton[id_top_left_leg].rotation.x+=this.top_left_leg_drotx;
			this.squeleton[id_bottom_left_leg].rotation.x+=this.bottom_left_leg_drotx;
			this.z+=this.fall_dz;                       
			this.do_bases_squeleton();
			this.step_rem--;
			if (this.step_rem==0) {
				this.phase2="glisse";
			}
		}else if (this.phase2=="glisse") {

		}else if (this.phase2=="releve1") {                        
			this.squeleton[id_body].rotation.x-=this.body_drotx/2;
			this.squeleton[id_top_right_arm].rotation.x+=this.top_right_arm_drotx;
			this.squeleton[id_top_left_arm].rotation.x+=this.top_left_arm_drotx;
			this.squeleton[id_top_right_leg].rotation.x+=this.body_drotx/2;
			this.squeleton[id_bottom_right_leg].rotation.x+=-this.body_drotx/2;
			this.z-=this.fall_dz/2;
			this.do_bases_squeleton();
			this.step_rem--;
			if (this.step_rem==0) {
				this.step_rem=10;
				this.phase2="releve2";
			}
		}else if (this.phase2=="releve2") {
			this.squeleton[id_body].rotation.x-=this.body_drotx/2;
			this.squeleton[id_top_right_arm].rotation.x-=this.top_right_arm_drotx/2;
			this.squeleton[id_top_left_arm].rotation.x+=this.top_left_arm_drotx;
			this.squeleton[id_top_right_leg].rotation.x+=this.body_drotx/2;
			this.squeleton[id_bottom_right_leg].rotation.x+=-this.body_drotx/2;
			this.z-=this.fall_dz;
			this.do_bases_squeleton();
			this.step_rem--;
			if (this.step_rem==0) {
				this.has_shot=0;
				this.phase="marche";
				this.action="reach_point";
				this.xgoal=this.x;
				this.ygoal=this.y;
				this.z=0;
			}
		}
		if ((this.phase2!="releve1")&&(this.phase2!="releve2")) {
			this.vx=0.97*this.vx;
			this.vy=0.97*this.vy;
			this.v=Math.sqrt(this.vx*this.vx+this.vy*this.vy);
			this.x+=this.vx/ralentisseur;
			this.y+=this.vy/ralentisseur;
			if ((this.v<5)&&(this.phase2=="glisse")) {                        
				this.phase2="releve1";
				this.step_rem=5;
				this.top_right_arm_drotx=((-75+Math.random()*15-Math.random()*15)*deg-this.squeleton[id_top_right_arm].rotation.x)/this.step_rem;
				this.top_left_arm_drotx=((-75+Math.random()*15-Math.random()*15)*deg-this.squeleton[id_top_left_arm].rotation.x)/this.step_rem;
				this.do_bases_squeleton();
			}
		}
		//la balle ?
		angl=Math.atan2(this.vy,this.vx);
		xv=Math.cos(angl);
		yv=Math.sin(angl);
		xu=yv;
		yu=-xu;
		feetx=(this.feet_place[0][0]+this.feet_place[1][0])/2+20*xv;
		feety=(this.feet_place[0][1]+this.feet_place[1][1])/2+20*yv;
		if ((this.gotballe==0)&&(balle.phase=="alone")) {
			//n'a pas la balle et la balle n'est pas en mode path
			dxb=balle.x-feetx;
			dyb=balle.y-feety;
			dist_balle=Math.sqrt(dxb*dxb+dyb*dyb);                        
			if ((dist_balle<40)&&(balle.z<20)) {
				//est sur le point de subtiliser la balle
				persoavant=balle.perso_got;
				if ((Math.random()<0.5)||(persoavant==-1)) {
					//attrappe la balle                               
					if (persoavant>-1) {
						//qu'arrive-t-il au type qui se fait prendre la balle
						if (personnages[persoavant].phase=="marche") {                                      
							//ce joueur marchait
							personnages[persoavant].gotballe=0;
							personnages[persoavant].tacledby=this.id;
							//le personnage taclé tombe
							personnages[persoavant].phase="tombe";
							personnages[persoavant].phase2="init";
							//le taclant prend la balle
							balle.possible=0;                            
							balle.perso_got=this.id;
							this.gotballe=1;
							cam.phase="balle";
						}else{
							//ce joueur ne marchait pas
						}
					}else{
						//balle seule sur le terrain                                   
						balle.possible=0;                            
						balle.perso_got=this.id;
						this.gotballe=1;
						cam.phase="balle";
					}
				}else{
					if ( personnages[persoavant].phase=="marche") {                                   
						//le personnage taclé saute s'il était en train de marcher                                    
						cam.phase="balle";
						personnages[persoavant].phase="saute";
						personnages[persoavant].phase2="init";
					}                                
				}
			}
		}
		if (this.gotballe==1) {
			//a la balle
			balle.x=feetx;
			balle.y=feety;
			balle.z=10;
			//passe aléatoire vers un des 3 plus proches ?
			if (Math.random()*10<1) {
				this.try_pass(0);
				if (this.gotballe==0) {                                
					//a effectué une passe et lève la jambe pour le tir
					this.has_shot=1;
					this.squeleton[id_top_right_leg].rotation.x=45*deg;
					this.do_bases_squeleton();
				}
			}
		}
		if (this.has_shot==1) {
			//a shooté et lève la jambe                            
			this.squeleton[id_top_right_leg].rotation.x=45*deg;
			this.do_bases_squeleton();
		}
		//changement de cellule ?
		xcel=Math.floor(dng*(this.x+zone_width/2)/zone_width);
		ycel=Math.floor(dng*(this.y+zone_height/2)/zone_height);
		if ((xcel!=this.xcell)||(ycel!=this.ycell)) {            
			var pos=-1;
			for(var i=0;i<cell[this.xcell][this.ycell].length;i++){
				if (cell[this.xcell][this.ycell][i]==this.id) {
					pos=i;
				}
			}
			if (pos>-1) {                           
				cell[this.xcell][this.ycell].splice(pos,1);                           
				if ((xcel>-1)&&(ycel>-1)&&(xcel<dng)&&(ycel<dng)) { 
					this.xcell=xcel;
					this.ycell=ycel;
					cell[this.xcell][this.ycell].push(this.id);
				}                           
			}
		}

	}
	//tombe
	this.do_anim_tombe = function () {
		//squelette
		if (this.phase2=="init") {                                                                        
			ori=Math.atan2(this.vy,this.vx)-Math.PI/2;                        
			this.orient=ori;                        
			this.vz=10+Math.random()*10;
			this.do_bases_squeleton();
			this.step_rem=10;
			this.body_drotx=((-80+Math.random()*10-Math.random()*10)*deg-this.squeleton[id_body].rotation.x)/this.step_rem;
			this.head_drotx=((35+Math.random()*8-Math.random()*8)*deg-this.squeleton[id_head].rotation.x)/this.step_rem;
			this.top_right_leg_drotx=((-50+Math.random()*15-Math.random()*5)*deg-this.squeleton[id_top_right_leg].rotation.x)/this.step_rem;
			this.bottom_right_leg_drotx=((-5+Math.random()*15-Math.random()*5)*deg-this.squeleton[id_bottom_right_leg].rotation.x)/this.step_rem;
			this.top_left_leg_drotx=((-50+Math.random()*15-Math.random()*15)*deg-this.squeleton[id_top_left_leg].rotation.x)/this.step_rem;
			this.bottom_left_leg_drotx=((-5+Math.random()*15-Math.random()*15)*deg-this.squeleton[id_bottom_left_leg].rotation.x)/this.step_rem;
			this.top_right_arm_drotx=((120+Math.random()*15-Math.random()*5)*deg-this.squeleton[id_top_right_arm].rotation.x)/this.step_rem;
			this.bottom_right_arm_drotx=((15+Math.random()*15-Math.random()*15)*deg-this.squeleton[id_bottom_right_arm].rotation.x)/this.step_rem;
			this.top_left_arm_drotx=((120+Math.random()*15-Math.random()*15)*deg-this.squeleton[id_top_left_arm].rotation.x)/this.step_rem;
			this.bottom_left_arm_drotx=((15+Math.random()*15-Math.random()*15)*deg-this.squeleton[id_bottom_left_arm].rotation.x)/this.step_rem;
			this.fall_dz=(-90-this.z)/this.step_rem;                        
			this.phase2="chute";
		}else if (this.phase2=="chute") {                        
			this.squeleton[id_body].rotation.x+=this.body_drotx;                                       
			this.squeleton[id_head].rotation.x+=this.head_drotx;
			this.squeleton[id_top_right_leg].rotation.x+=this.top_right_leg_drotx;
			this.squeleton[id_bottom_right_leg].rotation.x+=this.bottom_right_leg_drotx;
			this.squeleton[id_top_left_leg].rotation.x+=this.top_left_leg_drotx;
			this.squeleton[id_bottom_left_leg].rotation.x+=this.bottom_left_leg_drotx;
			this.squeleton[id_top_right_arm].rotation.x+=this.top_right_arm_drotx;
			this.squeleton[id_bottom_right_arm].rotation.x+=this.bottom_right_arm_drotx;
			this.squeleton[id_top_left_arm].rotation.x+=this.top_left_arm_drotx;
			this.squeleton[id_bottom_left_arm].rotation.x+=this.bottom_left_arm_drotx;
			this.z+=this.fall_dz;                       
			this.do_bases_squeleton();
			this.step_rem--;
			if (this.step_rem==0) {
				this.phase2="glisse";
			}
		}else if (this.phase2=="glisse") {

		}else if (this.phase2=="releve1") {                                                
			this.squeleton[id_top_right_arm].rotation.x+=this.top_right_arm_drotx;
			this.squeleton[id_top_left_arm].rotation.x+=this.top_left_arm_drotx;
			this.squeleton[id_bottom_right_arm].rotation.x+=this.bottom_right_arm_drotx;
			this.squeleton[id_bottom_left_arm].rotation.x+=this.bottom_left_arm_drotx;
			this.squeleton[id_top_right_leg].rotation.x+=this.top_right_leg_drotx;
			this.squeleton[id_top_left_leg].rotation.x+=this.top_left_leg_drotx;
			this.squeleton[id_bottom_right_leg].rotation.x+=this.bottom_right_leg_drotx;
			this.squeleton[id_bottom_left_leg].rotation.x+=this.bottom_left_leg_drotx;
			this.z-=this.fall_dz/4;
			this.do_bases_squeleton();
			this.step_rem--;
			if (this.step_rem==0) {
				this.step_rem=10;
				this.top_left_leg_drotx=(0*deg-this.squeleton[id_top_left_leg].rotation.x)/this.step_rem;
				this.top_right_arm_drotx=(0*deg-this.squeleton[id_top_right_arm].rotation.x)/this.step_rem;
				this.body_drotx=(0*deg-this.squeleton[id_body].rotation.x)/this.step_rem;
				this.phase2="releve2";
			}
		}else if (this.phase2=="releve2") {                                                
			this.squeleton[id_body].rotation.x+=this.body_drotx;
			this.squeleton[id_top_left_leg].rotation.x+=this.top_left_leg_drotx;
			this.squeleton[id_top_right_arm].rotation.x+=this.top_right_arm_drotx; 
			this.do_bases_squeleton();
			this.step_rem--;
			if (this.step_rem==0) {
				this.step_rem=10;
				this.fall_dz=(0-this.z)/this.step_rem;
				this.top_right_leg_drotx=(-10*deg-this.squeleton[id_top_right_leg].rotation.x)/this.step_rem;
				this.bottom_right_leg_drotx=(-10*deg-this.squeleton[id_bottom_right_leg].rotation.x)/this.step_rem;
				this.top_left_leg_drotx=(10*deg-this.squeleton[id_top_left_leg].rotation.x)/this.step_rem;
				this.bottom_left_leg_drotx=(-10*deg-this.squeleton[id_bottom_left_leg].rotation.x)/this.step_rem;
				this.top_right_arm_drotx=(10*deg-this.squeleton[id_top_right_arm].rotation.x)/this.step_rem;
				this.bottom_right_arm_drotx=(10*deg-this.squeleton[id_bottom_right_arm].rotation.x)/this.step_rem;
				this.top_left_arm_drotx=(10*deg-this.squeleton[id_top_left_arm].rotation.x)/this.step_rem;
				this.bottom_left_arm_drotx=(10*deg-this.squeleton[id_bottom_left_arm].rotation.x)/this.step_rem;
				this.phase2="releve3";
			}
		}else if (this.phase2=="releve3") {
			this.squeleton[id_top_right_arm].rotation.x+=this.top_right_arm_drotx;
			this.squeleton[id_top_left_arm].rotation.x+=this.top_left_arm_drotx;
			this.squeleton[id_bottom_right_arm].rotation.x+=this.bottom_right_arm_drotx;
			this.squeleton[id_bottom_left_arm].rotation.x+=this.bottom_left_arm_drotx;
			this.squeleton[id_top_right_leg].rotation.x+=this.top_right_leg_drotx;
			this.squeleton[id_top_left_leg].rotation.x+=this.top_left_leg_drotx;
			this.squeleton[id_bottom_right_leg].rotation.x+=this.bottom_right_leg_drotx;
			this.squeleton[id_bottom_left_leg].rotation.x+=this.bottom_left_leg_drotx;
			this.z+=this.fall_dz;                        
			this.do_bases_squeleton();
			this.step_rem--;
			if (this.step_rem==0) {                            
				this.phase="marche";                            
				this.action="reach_point";
				this.xgoal=this.x;
				this.ygoal=this.y;
				this.z=0;
			}
		}
		if ((this.phase2!="releve1")&&(this.phase2!="releve2")&&(this.phase2!="releve3")) {
			this.vx=0.99*this.vx;
			this.vy=0.99*this.vy;
			this.vz=0.97*this.vz-1;
			this.v=Math.sqrt(this.vx*this.vx+this.vy*this.vy);
			this.x+=this.vx/ralentisseur;
			this.y+=this.vy/ralentisseur;
			this.z+=this.vz;
			if (this.z<-90) {
				this.vz=0;
				this.z=-90;
			}
			if ((this.v<5)&&(this.phase2=="glisse")&&(this.z==-90)) {                        
				this.phase2="releve1";
				this.step_rem=10;
				this.top_right_leg_drotx=(90*deg-this.squeleton[id_top_right_leg].rotation.x)/this.step_rem;
				this.bottom_right_leg_drotx=(-90*deg-this.squeleton[id_bottom_right_leg].rotation.x)/this.step_rem;
				this.top_left_leg_drotx=(90*deg-this.squeleton[id_top_left_leg].rotation.x)/this.step_rem;
				this.bottom_left_leg_drotx=(-90*deg-this.squeleton[id_bottom_left_leg].rotation.x)/this.step_rem;
				this.top_right_arm_drotx=(90*deg-this.squeleton[id_top_right_arm].rotation.x)/this.step_rem;
				this.bottom_right_arm_drotx=(90*deg-this.squeleton[id_bottom_right_arm].rotation.x)/this.step_rem;
				this.top_left_arm_drotx=(90*deg-this.squeleton[id_top_left_arm].rotation.x)/this.step_rem;
				this.bottom_left_arm_drotx=(90*deg-this.squeleton[id_bottom_left_arm].rotation.x)/this.step_rem;
			}
			this.do_bases_squeleton();
		}

	}
	//saute
	this.do_anim_saute = function () {
		//squelette
		if (this.phase2=="init") {                                                                        
			ori=Math.atan2(this.vy,this.vx)-Math.PI/2;                        
			this.orient=ori;
			this.vx=2*this.vx;
			this.vy=2*this.vy;
			this.has_shot=0;
			this.vz=7+Math.random()*7;
			this.do_bases_squeleton();
			this.step_rem=10;                        
			this.head_drotx=((35+Math.random()*8-Math.random()*8)*deg-this.squeleton[id_head].rotation.x)/this.step_rem;
			this.top_right_leg_drotx=((50+Math.random()*15-Math.random()*5)*deg-this.squeleton[id_top_right_leg].rotation.x)/this.step_rem;
			this.bottom_right_leg_drotx=((-5+Math.random()*15-Math.random()*5)*deg-this.squeleton[id_bottom_right_leg].rotation.x)/this.step_rem;
			this.top_left_leg_drotx=((-50+Math.random()*15-Math.random()*15)*deg-this.squeleton[id_top_left_leg].rotation.x)/this.step_rem;
			this.bottom_left_leg_drotx=((-5+Math.random()*15-Math.random()*15)*deg-this.squeleton[id_bottom_left_leg].rotation.x)/this.step_rem;
			this.top_right_arm_drotx=((90+Math.random()*15-Math.random()*5)*deg-this.squeleton[id_top_right_arm].rotation.x)/this.step_rem;
			this.bottom_right_arm_drotx=((15+Math.random()*15-Math.random()*15)*deg-this.squeleton[id_bottom_right_arm].rotation.x)/this.step_rem;
			this.top_left_arm_drotx=((90+Math.random()*15-Math.random()*15)*deg-this.squeleton[id_top_left_arm].rotation.x)/this.step_rem;
			this.bottom_left_arm_drotx=((15+Math.random()*15-Math.random()*15)*deg-this.squeleton[id_bottom_left_arm].rotation.x)/this.step_rem;                        
			this.phase2="position_saut";                        
		}else if (this.phase2=="position_saut") {                                                
			this.squeleton[id_head].rotation.x+=this.head_drotx;
			this.squeleton[id_top_right_leg].rotation.x+=this.top_right_leg_drotx;
			this.squeleton[id_bottom_right_leg].rotation.x+=this.bottom_right_leg_drotx;
			this.squeleton[id_top_left_leg].rotation.x+=this.top_left_leg_drotx;
			this.squeleton[id_bottom_left_leg].rotation.x+=this.bottom_left_leg_drotx;
			this.squeleton[id_top_right_arm].rotation.x+=this.top_right_arm_drotx;
			this.squeleton[id_bottom_right_arm].rotation.x+=this.bottom_right_arm_drotx;
			this.squeleton[id_top_left_arm].rotation.x+=this.top_left_arm_drotx;
			this.squeleton[id_bottom_left_arm].rotation.x+=this.bottom_left_arm_drotx;                        
			this.do_bases_squeleton();
			this.step_rem--;
			if (this.step_rem==0) {
				this.phase2="air";                            
			}
		}else if (this.phase2=="air") {                                 
			//en l'air
		}
		//dans tous les cas
		this.vx=0.99*this.vx;
		this.vy=0.99*this.vy;
		this.vz=0.97*this.vz-1;
		this.v=Math.sqrt(this.vx*this.vx+this.vy*this.vy);
		this.x+=this.vx/ralentisseur;
		this.y+=this.vy/ralentisseur;
		this.z+=this.vz;
		if (this.gotballe==1) {                        
			//a la balle                        
			angl=Math.atan2(this.vy,this.vx);
			xv=Math.cos(angl);
			yv=Math.sin(angl);
			xu=yv;
			yu=-xu;
			balle.x=this.x+40*xv;
			balle.y=this.y+40*yv;
			balle.z=this.z+10;                        
			//passe aléatoire vers un des 3 plus proches ?
			if (Math.random()*5<1) {
				this.try_pass(0);
				if (this.gotballe==0) {                                
					//a effectué une passe et lève la jambe pour le tir
					this.has_shot=1;
					this.squeleton[id_top_right_leg].rotation.x=45*deg;
					this.do_bases_squeleton();
				}
			}
		}
		if (this.has_shot==1) {
			//a shooté et lève la jambe                            
			this.squeleton[id_top_right_leg].rotation.x=45*deg;
			this.do_bases_squeleton();
		}
		if ((this.z<0)&&(this.vz<0)) {                        
			this.vz=0;
			this.phase="marche";                            
			this.action="reach_point";
			this.xgoal=this.x;
			this.ygoal=this.y;
			this.z=0;
		}                       
		this.do_bases_squeleton();                
	}
	//court et fait une tête
	this.do_anim_head = function () {
		//squelette
		if (this.phase2=="court") {                        
			this.x+=this.vx;
			this.y+=this.vy;
			//squelette
			vv=this.v/10;
			ori=Math.atan2(this.vy,this.vx)-Math.PI/2;                    
			this.orient=ori;                    
			this.squeleton[id_bottom_left_arm].rotation.x=45*vv*deg;
			this.squeleton[id_top_left_arm].rotation.y=25*vv*deg;
			this.squeleton[id_top_right_arm].rotation.y=-25*vv*deg;
			this.squeleton[id_bottom_right_arm].rotation.x=45*vv*deg;         
			this.squeleton[id_bottom_left_leg].rotation.x=-45*vv*deg;         
			this.squeleton[id_bottom_right_leg].rotation.x=-10*vv*deg;
			currenttime = new Date();
			t = currenttime.getTime()/100+this.ang*deg;
			rot1=20*Math.cos(t)*deg*vv;
			rot2=rot1*25/20;
			rot3=rot1*45/20;
			rot4=10*Math.cos(t/2)*deg*vv;
			this.squeleton[id_head].rotation.z=rot1/2;
			this.squeleton[id_top_left_arm].rotation.x=rot3;
			this.squeleton[id_top_right_arm].rotation.x=-rot3;
			this.squeleton[id_top_left_leg].rotation.x=-rot2*2;
			this.squeleton[id_top_right_leg].rotation.x=rot2*2;
			this.squeleton[id_body].rotation.x=rot4;
			this.squeleton[id_head].rotation.x=-rot4;
			this.do_bases_squeleton();
			if (balle.path.length<11) {
				//c'est le moment de sauter
				this.phase2="init";
			}
		}else if (this.phase2=="init") {                                                                        
			ori=Math.atan2(this.vy,this.vx)-Math.PI/2;                        
			this.orient=ori;                
			this.has_shot=0;
			ll=balle.path.length-1;
			ballx=balle.path[ll].x;
			bally=balle.path[ll].y;
			ballz=balle.path[ll].z;
			xuu=ballx-this.x;
			yuu=bally-this.y;
			zuu=ballz-this.z;                        
			uu=Math.sqrt(xuu*xuu+yuu*yuu+zuu*zuu);
			xuu=xuu/uu;
			yuu=yuu/uu;
			zuu=zuu/uu;
			angtir=-Math.acos(zuu);                        
			this.step_rem=ll;                        
			this.vx=(ballx-44*xuu-this.x)/ll;
			this.vy=(bally-44*yuu-this.y)/ll;
			this.vz=(ballz-90-44*zuu-this.z)/ll;
			this.body_drotx=(angtir-this.squeleton[id_body].rotation.x)/this.step_rem;
			this.head_drotx=(0*deg-this.squeleton[id_head].rotation.x)/this.step_rem;
			this.do_bases_squeleton();                                               

			this.phase2="position_saut";                        
		}else if (this.phase2=="position_saut") {
			this.x+=this.vx;
			this.y+=this.vy;
			this.z+=this.vz;
			this.squeleton[id_body].rotation.x+=this.body_drotx;                                       
			this.squeleton[id_head].rotation.x+=this.head_drotx;
			this.do_bases_squeleton();
			this.step_rem--;
			if (this.step_rem==0) {
				this.phase2="vers_passe";                            
			}
		}else if (this.phase2=="vers_passe") {                                 
			//être sûr qu'on a bien la balle puis la passer
			if (balle.perso_got==this.id) {
				//fais une passe de suite
				angl=Math.atan2(this.vy,this.vx);
				xv=Math.cos(angl);
				yv=Math.sin(angl);
				this.try_pass(1);                         
				this.phase="tombe";
				this.phase2="init";
			}
		}                 

	}
	//court et fait un retour de volee
	this.do_anim_volee = function () {
		//squelette
		if (this.phase2=="court") {                        
			this.x+=this.vx;
			this.y+=this.vy;
			//squelette
			vv=this.v/10;
			ori=Math.atan2(this.vy,this.vx)-Math.PI/2;                    
			this.orient=ori;                    
			this.squeleton[id_bottom_left_arm].rotation.x=45*vv*deg;
			this.squeleton[id_top_left_arm].rotation.y=25*vv*deg;
			this.squeleton[id_top_right_arm].rotation.y=-25*vv*deg;
			this.squeleton[id_bottom_right_arm].rotation.x=45*vv*deg;         
			this.squeleton[id_bottom_left_leg].rotation.x=-45*vv*deg;         
			this.squeleton[id_bottom_right_leg].rotation.x=-10*vv*deg;
			currenttime = new Date();
			t = currenttime.getTime()/100+this.ang*deg;
			rot1=20*Math.cos(t)*deg*vv;
			rot2=rot1*25/20;
			rot3=rot1*45/20;
			rot4=10*Math.cos(t/2)*deg*vv;
			this.squeleton[id_head].rotation.z=rot1/2;
			this.squeleton[id_top_left_arm].rotation.x=rot3;
			this.squeleton[id_top_right_arm].rotation.x=-rot3;
			this.squeleton[id_top_left_leg].rotation.x=-rot2*2;
			this.squeleton[id_top_right_leg].rotation.x=rot2*2;
			this.squeleton[id_body].rotation.x=rot4;
			this.squeleton[id_head].rotation.x=-rot4;
			this.do_bases_squeleton();
			if (balle.path.length<16) {
				//c'est le moment de sauter
				this.phase2="init";
			}              

		}else if (this.phase2=="init") {                                                                        
			ori=Math.atan2(this.vy,this.vx)-Math.PI/2;                        
			this.orient=ori;                
			this.has_shot=0;
			ll=balle.path.length-1;
			ballx=balle.path[ll].x;
			bally=balle.path[ll].y;
			ballz=balle.path[ll].z;                                                                       
			angtirx=(180+30*(Math.random()-Math.random()))*deg;
			angtiry=(100*(Math.random()-Math.random()))*deg;
			this.step_rem=ll;

			this.squeleton[id_body].rotation.x+=angtirx;
			this.squeleton[id_body].rotation.y+=angtiry;
			this.do_bases_squeleton();
			this.anticipate_positions();
			xpied_reach=this.feet_place[0][0];
			ypied_reach=this.feet_place[0][1];
			zpied_reach=this.feet_place[0][2];
			this.squeleton[id_body].rotation.x-=angtirx;
			this.squeleton[id_body].rotation.y-=angtiry;
			this.do_bases_squeleton();
			this.vx=(ballx-xpied_reach)/ll;
			this.vy=(bally-ypied_reach)/ll;
			this.vz=(ballz-zpied_reach)/ll;
			this.body_drotx=(angtirx-this.squeleton[id_body].rotation.x)/this.step_rem;
			this.body_droty=(angtiry-this.squeleton[id_body].rotation.y)/this.step_rem;                        
			this.head_drotx=(0*deg-this.squeleton[id_head].rotation.x)/this.step_rem;
			this.do_bases_squeleton();                                               

			this.phase2="position_saut";                        
		}else if (this.phase2=="position_saut") {
			this.x+=this.vx;
			this.y+=this.vy;
			this.z+=this.vz;
			this.squeleton[id_body].rotation.x+=this.body_drotx;
			this.squeleton[id_body].rotation.y+=this.body_droty;
			this.squeleton[id_head].rotation.x+=this.head_drotx;
			this.do_bases_squeleton();
			this.step_rem--;
			if (this.step_rem==0) {                            
				this.phase2="vers_passe";                            
			}
		}else if (this.phase2=="vers_passe") {                                 
			//être sûr qu'on a bien la balle puis la passer
			if (balle.perso_got==this.id) {
				//fais une passe de suite
				angl=Math.atan2(this.vy,this.vx);
				xv=Math.cos(angl);
				yv=Math.sin(angl);                         
				this.step_rem=20;
				this.vz=(-60-this.z)/this.step_rem;                         
				this.body_drotx=(270*deg-this.squeleton[id_body].rotation.x)/this.step_rem;
				this.body_droty=-this.squeleton[id_body].rotation.y/this.step_rem;
				this.head_drotx=((35+Math.random()*8-Math.random()*8)*deg-this.squeleton[id_head].rotation.x)/this.step_rem;
				this.top_right_leg_drotx=((-50+Math.random()*15-Math.random()*5)*deg-this.squeleton[id_top_right_leg].rotation.x)/this.step_rem;
				this.bottom_right_leg_drotx=((-5+Math.random()*15-Math.random()*5)*deg-this.squeleton[id_bottom_right_leg].rotation.x)/this.step_rem;
				this.top_left_leg_drotx=((-50+Math.random()*15-Math.random()*15)*deg-this.squeleton[id_top_left_leg].rotation.x)/this.step_rem;
				this.bottom_left_leg_drotx=((-5+Math.random()*15-Math.random()*15)*deg-this.squeleton[id_bottom_left_leg].rotation.x)/this.step_rem;
				this.top_right_arm_drotx=((120+Math.random()*15-Math.random()*5)*deg-this.squeleton[id_top_right_arm].rotation.x)/this.step_rem;
				this.bottom_right_arm_drotx=((15+Math.random()*15-Math.random()*15)*deg-this.squeleton[id_bottom_right_arm].rotation.x)/this.step_rem;
				this.top_left_arm_drotx=((120+Math.random()*15-Math.random()*15)*deg-this.squeleton[id_top_left_arm].rotation.x)/this.step_rem;
				this.bottom_left_arm_drotx=((15+Math.random()*15-Math.random()*15)*deg-this.squeleton[id_bottom_left_arm].rotation.x)/this.step_rem; 
				this.try_pass(1);                                                  
				this.phase2="chute";
			}
		}else if (this.phase2=="chute") {                        
			this.z+=this.vz;
			this.squeleton[id_body].rotation.x+=this.body_drotx;
			this.squeleton[id_body].rotation.y+=this.body_droty;
			this.squeleton[id_top_right_arm].rotation.x+=this.top_right_arm_drotx;
			this.squeleton[id_top_left_arm].rotation.x+=this.top_left_arm_drotx;
			this.squeleton[id_bottom_right_arm].rotation.x+=this.bottom_right_arm_drotx;
			this.squeleton[id_bottom_left_arm].rotation.x+=this.bottom_left_arm_drotx;
			this.squeleton[id_top_right_leg].rotation.x+=this.top_right_leg_drotx;
			this.squeleton[id_top_left_leg].rotation.x+=this.top_left_leg_drotx;
			this.squeleton[id_bottom_right_leg].rotation.x+=this.bottom_right_leg_drotx;
			this.squeleton[id_bottom_left_leg].rotation.x+=this.bottom_left_leg_drotx;
			this.do_bases_squeleton();
			this.step_rem--;
			if (this.step_rem==0) {                            
				this.step_rem=15;
				this.phase2="wait";
			}
		}else if (this.phase2=="wait") {                                                
			this.step_rem--;
			if (this.step_rem==0) {
				this.step_rem=10;
				this.top_left_leg_drotx=(0*deg-this.squeleton[id_top_left_leg].rotation.x)/this.step_rem;
				this.top_right_arm_drotx=(0*deg-this.squeleton[id_top_right_arm].rotation.x)/this.step_rem;
				this.squeleton[id_body].rotation.x=-90*deg;                            
				this.body_drotx=(0*deg-this.squeleton[id_body].rotation.x)/this.step_rem;
				this.do_bases_squeleton();
				this.phase="tombe";
				this.phase2="releve2";
			}

		} 

	}

	//anticipe les positions d'un personnages avant de le dessiner pour récupérer des coordonnées de membres
	this.anticipate_positions = function () {
		this.feet_place=[];
		for(a=0;a<squeleton.length;a++){
			struc=squeleton[a];
			xo=this.bases[a].xo+this.x;
			yo=this.bases[a].yo+this.y;
			zo=this.bases[a].zo+this.z;
			i=this.bases[a].i;
			j=this.bases[a].j;
			k=this.bases[a].k;
			foot_record=0;
			if ((struc.name==id_right_foot)||(struc.name==id_left_foot)) {
				xpied=0;
				ypied=0;
				zpied=0;
				foot_record=1;
			}
			for(b=0;b<struc.point.length;b++){
				x=struc.point[b][0];
				y=struc.point[b][1];
				z=struc.point[b][2];                    
				xx=xo+x*i.x+y*j.x+z*k.x;
				yy=yo+x*i.y+y*j.y+z*k.y;
				zz=zo+x*i.z+y*j.z+z*k.z;
				if (foot_record==1) {
					xpied+=xx;
					ypied+=yy;
					zpied+=zz;
				}
				M={x:xx,y:yy,z:zz};
				pt=projection(M);                         
			}
			if (foot_record==1) {                    
				this.feet_place.push([xpied/struc.point.length,ypied/struc.point.length,zpied/struc.point.length]);
			}
		}                         
	}

	//court et fait un amorti
	this.do_anim_amorti = function () {
		//squelette
		if (this.phase2=="court") {                        
			this.x+=this.vx;
			this.y+=this.vy;
			//squelette
			vv=this.v/10;                        
			xuu=balle.x-this.x;
			yuu=balle.y-this.y;
			ori=Math.atan2(yuu,xuu);                        
			this.orient=ori; 
			this.squeleton[id_bottom_left_arm].rotation.x=45*vv*deg;
			this.squeleton[id_top_left_arm].rotation.y=25*vv*deg;
			this.squeleton[id_top_right_arm].rotation.y=-25*vv*deg;
			this.squeleton[id_bottom_right_arm].rotation.x=45*vv*deg;         
			this.squeleton[id_bottom_left_leg].rotation.x=-45*vv*deg;         
			this.squeleton[id_bottom_right_leg].rotation.x=-10*vv*deg;
			currenttime = new Date();
			t = currenttime.getTime()/100+this.ang*deg;
			rot1=20*Math.cos(t)*deg*vv;
			rot2=rot1*25/20;
			rot3=rot1*45/20;
			rot4=10*Math.cos(t/2)*deg*vv;
			this.squeleton[id_head].rotation.z=rot1/2;
			this.squeleton[id_top_left_arm].rotation.x=rot3;
			this.squeleton[id_top_right_arm].rotation.x=-rot3;
			this.squeleton[id_top_left_leg].rotation.x=-rot2*2;
			this.squeleton[id_top_right_leg].rotation.x=rot2*2;
			this.squeleton[id_body].rotation.x=rot4;
			this.squeleton[id_head].rotation.x=-rot4;
			this.do_bases_squeleton();
			if (balle.path.length<21) {
				//c'est le moment de sauter
				this.phase2="init";
			}
		}else if (this.phase2=="init") {                                                                                                
			ll=balle.path.length-1;
			ballx=balle.path[ll].x;
			bally=balle.path[ll].y;
			ballz=balle.path[ll].z;                        
			xuu=ballx-this.x;
			yuu=bally-this.y;
			pg=Math.cos(this.orient)*xuu+Math.sin(this.orient)*yuu;
			if (pg>0) {
				ori=Math.atan2(this.vy,this.vx)-Math.PI/2;
				pg=1;

			}else{
				ori=Math.atan2(this.vy,this.vx)+Math.PI/2;
				pg=-1;

			}
			this.orient=ori;
			ruu=Math.sqrt(xuu*xuu+yuu*yuu);
			xuu=xuu/ruu;
			yuu=yuu/ruu;
			this.step_rem=ll;                        
			this.vx=(ballx-this.x-pg*xuu*10)/ll;
			this.vy=(bally-this.y-pg*yuu*10)/ll;
			this.vz=(ballz-80-this.z)/ll;
			this.body_drotx=(0-this.squeleton[id_body].rotation.x)/this.step_rem;
			this.head_drotx=(-20*deg-this.squeleton[id_head].rotation.x)/this.step_rem;
			this.top_right_arm_drotx=(90*deg-this.squeleton[id_top_right_arm].rotation.x)/this.step_rem;
			this.top_left_arm_drotx=(90*deg-this.squeleton[id_top_right_arm].rotation.x)/this.step_rem;
			this.top_left_arm_droty=(90*deg-this.squeleton[id_top_left_arm].rotation.y)/this.step_rem;
			this.top_right_arm_droty=(-90*deg-this.squeleton[id_top_right_arm].rotation.y)/this.step_rem;
			this.do_bases_squeleton();                                                                       
			this.phase2="position_saut";                        
		}else if (this.phase2=="position_saut") {
			this.x+=this.vx;
			this.y+=this.vy;
			this.z+=this.vz;
			this.squeleton[id_body].rotation.x+=this.body_drotx;                                       
			this.squeleton[id_head].rotation.x+=this.head_drotx;
			this.squeleton[id_top_right_arm].rotation.x+=this.top_right_arm_drotx;
			this.squeleton[id_top_left_arm].rotation.x+=this.top_left_arm_drotx;
			this.squeleton[id_top_left_arm].rotation.y+=this.top_left_arm_droty;
			this.squeleton[id_top_right_arm].rotation.y+=this.top_right_arm_droty;
			this.do_bases_squeleton();
			this.step_rem--;
			if (this.step_rem==0) {
				this.vx=this.vx/2;
				this.vy=this.vy/2;
				this.step_rem=10;
				this.phase2="wait";
			}
		}else if (this.phase2=="wait") {
			this.step_rem--;
			if (this.step_rem==0) {
				this.step_rem=25;
				this.vz=(0-this.z)/this.step_rem;                            
				balle.vz=balle.z-this.z;                            
				balle.vy=Math.PI/this.step_rem;
				this.top_right_arm_drotx=(15*deg-this.squeleton[id_top_right_arm].rotation.x)/this.step_rem;
				this.top_left_arm_drotx=(-15*deg-this.squeleton[id_top_right_arm].rotation.x)/this.step_rem;
				this.top_left_arm_droty=(25*deg-this.squeleton[id_top_left_arm].rotation.y)/this.step_rem;
				this.top_right_arm_droty=(-25*deg-this.squeleton[id_top_right_arm].rotation.y)/this.step_rem;
				this.phase2="chute";                            
			}
		}else if (this.phase2=="chute") {
			this.z+=this.vz;
			this.x+=this.vx;
			this.y+=this.vy;
			balle.x+=this.vx;
			balle.y+=this.vy;
			lamb=(this.step_rem-1)/25;
			balle.z=lamb*(this.z+balle.vz)+(1-lamb)*10+150*Math.sin(balle.vy*(this.step_rem-1));                       
			this.squeleton[id_top_right_arm].rotation.x+=this.top_right_arm_drotx;
			this.squeleton[id_top_left_arm].rotation.x+=this.top_left_arm_drotx;
			this.squeleton[id_top_right_arm].rotation.y+=this.top_right_arm_droty;
			this.squeleton[id_top_left_arm].rotation.y+=this.top_left_arm_droty;
			this.do_bases_squeleton();
			this.step_rem--;
			if (this.step_rem==0) {
				this.vz=0;
				balle.vx=0;
				balle.vy=0;
				balle.vz=0;                            
				this.phase="marche";                            
				this.action="reach_point";
				this.xgoal=this.x;
				this.ygoal=this.y;
				this.z=0;
			}
		}                 

	}      
}




//retourne le chemin de la balle entre 2 points du terrain
function get_ball_path(M0,M1,hmax){
	jjx=M1.x-M0.x;
	jjy=M1.y-M0.y;
	jjz=M1.z-M0.z;
	distplan=Math.sqrt(jjx*jjx+jjy*jjy);            
	if (distplan==0) {
		//ce sont les mêmes points dans le plan  xy
		path=[];
	}else{
		//ce sont des points différents dans le plan xy
		ii={x:jjx/distplan,y:jjy/distplan,z:0};
		jj={x:0,y:0,z:1};
		//M1 dans M0,ii,jj
		xd=jjx*ii.x+jjy*ii.y;
		yd=M1.z-M0.z;                
		//calcul des paramètres                               
		//a=-4*hmax/xd/xd;
		//b=-a*xd;

		aa=-xd/4/hmax;
		bb=1;
		cc=-yd/xd;
		sqr_delta=Math.sqrt(1-yd/hmax);
		b=(-bb+sqr_delta)/2/aa;

		//if (b<yd/xd) {
		b=(-bb-sqr_delta)/2/aa;
		//}
		a=(yd/xd-b)/xd;                
		df=Math.sqrt(hmax*hmax+distplan*distplan/2);                
		nn=Math.ceil(df/10);
		path=[];
		for(i=0;i<nn+1;i++){
			x=i*distplan/nn;                    
			y=a*x*x+b*x+M0.z;

			xx=M0.x+x*ii.x;
			yy=M0.y+x*ii.y;
			zz=y;
			path.push({x:xx,y:yy,z:zz});

		}
	}
	return path;
}

//rotation de v autour de n d'un angle ang
function rot_norm_ang(v,n,ang) {
	//normalize n
	rn=Math.sqrt(n.x*n.x+n.y*n.y+n.z*n.z);
	if (rn==0) {
		rn=1;
	}
	n={x:n.x/rn,y:n.y/rn,z:n.z/rn};
	//projection de v sur n
	nvn=prod_scal(v,n);
	vn={x:nvn*v.x,y:nvn*v.y,z:nvn*v.z};
	//projection de v sur la surface dont n est la normale
	vt={x:v.x-vn.x,y:v.y-vn.y,z:v.z-vn.z};
	rvt=Math.sqrt(vt.x*vt.x+vt.y*vt.y+vt.z*vt.z);
	if (rvt==0) {
		rvt=1;
	}            
	vt={x:vt.x/rvt,y:vt.y/rvt,z:vt.z/rvt};
	//on complète la base
	vb=prod_vect(n,vt);
	//on retourne le nouveau v : vn+rvt*cos(ang)*vt+rvt*sin(ang)*vb
	return {x:vn.x+rvt*(Math.cos(ang)*vt.x+Math.sin(ang)*vb.x),y:vn.y+rvt*(Math.cos(ang)*vt.y+Math.sin(ang)*vb.y),z:vn.z+rvt*(Math.cos(ang)*vt.z+Math.sin(ang)*vb.z)};
}

//retourne les coordonnées de la souris
function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};
}
//produit vectoriel
function  prod_vect(A,B) {
	xxx=A.y*B.z-A.z*B.y;
	yyy=A.z*B.x-A.x*B.z;
	zzz=A.x*B.y-A.y*B.x;
	return {x:xxx,y:yyy,z:zzz};
}
//produit scalaire
function prod_scal(A,B){
	return A.x*B.x+A.y*B.y+A.z*B.z;
}
//projection
function projection(M){
	//vecteur camM
	dM={x:M.x-cam.x,y:M.y-cam.y,z:M.z-cam.z};
	//projection de M dans le référentiel de la caméra
	MM={x:prod_scal(dM,cam.icam),y:prod_scal(dM,cam.jcam),z:prod_scal(dM,cam.kcam)};
	if (MM.y>0) {
		//devant la caméra
		xx=xorigine+cam.focale*MM.x/(cam.focale+MM.y);
		yy=yorigine-cam.focale*MM.z/(cam.focale+MM.y);               
		devant=1;
	}else{
		//derrière la caméra
		if (MM.y==-cam.focale) {
			//sur la focale
			xx=xorigine;
			yy=yorigine;
		}else{
			xx=xorigine+cam.focale*MM.x/(cam.focale+MM.y);
			yy=yorigine-cam.focale*MM.z/(cam.focale+MM.y);                    
		}

		devant=0; 
	}

	return {x:xx,y:yy,devant:devant,MM:MM};
}
//lorsqu'on clique le canvas
function do_click(x,y) {

}

//initialisation
function init(){          
	//mon canvas
	var mycanvas=document.getElementById('id_canvas1');
	mycanvas.addEventListener('click', function(evt) {
		var mousePos = getMousePos(mycanvas, evt);
		do_click(mousePos.x,mousePos.y);                                     
	}, false);
	//récupère les positions initiales
	id=get_perso_positions("init");          
	mes_positions=positions[id];
	id=get_perso_positions("envoi");          
	mes_positions_goal=positions[id];          
	//creation des personnages          
	team=0;
	for(a=0;a<nb_personnages;a++){
		x=mes_positions.data[a].x;
		y=mes_positions.data[a].y;
		ang=mes_positions.data[a].ang;
		action="reach_point";
		xgoal=mes_positions_goal.data[a].x;
		ygoal=mes_positions_goal.data[a].y;
		anggoal=mes_positions_goal.data[a].ang;
		if (a>nb_personnages/2-1) {
			team=1;
		}
		personnages.push(new personnage(a,x,y,ang,team,action,xgoal,ygoal,anggoal));
	}
	//fonction à appeler en boucle
	window.requestAnimationFrame(draw);
}

//récupère un type de positions des personnages
function get_perso_positions(mon_nom) {
	id=-1;
	for(a=0;a<positions.length;a++){
		if(positions[a].nom==mon_nom){
			id=a;
		}
	}
	return id;
}

//mouvement de la caméra
function cam_move() {            
	switch (cam.phase) {
		case "perso":
			cam.tetacam=(cam.tetacam+cam.vtetacam)%360;
			cam.phicam+=cam.vphicam;
			cam.x=cam.rcam*Math.cos(cam.phicam*deg)*Math.cos(cam.tetacam*deg);
			cam.y=cam.rcam*Math.cos(cam.phicam*deg)*Math.sin(cam.tetacam*deg);
			cam.z=cam.rcam*Math.sin(cam.phicam*deg);             
			cam.jcam={x:-cam.x/cam.rcam,y:-cam.y/cam.rcam,z:-cam.z/cam.rcam};
			cam.icam={x:-Math.sin(cam.tetacam*deg),y:Math.cos(cam.tetacam*deg),z:0};
			cam.kcam=prod_vect(cam.icam,cam.jcam);
			cam.x0=personnages[cam.perso_target].x;
			cam.y0=personnages[cam.perso_target].y;
			cam.x+=cam.x0;
			cam.y+=cam.y0;
			cam.z+=cam.z0;
			break;
		case "balle":
			cam.tetacam=(cam.tetacam+cam.vtetacam)%360;
			cam.phicam+=cam.vphicam;
			cam.x=cam.rcam*Math.cos(cam.phicam*deg)*Math.cos(cam.tetacam*deg);
			cam.y=cam.rcam*Math.cos(cam.phicam*deg)*Math.sin(cam.tetacam*deg);
			cam.z=cam.rcam*Math.sin(cam.phicam*deg);             
			cam.jcam={x:-cam.x/cam.rcam,y:-cam.y/cam.rcam,z:-cam.z/cam.rcam};
			cam.icam={x:-Math.sin(cam.tetacam*deg),y:Math.cos(cam.tetacam*deg),z:0};
			cam.kcam=prod_vect(cam.icam,cam.jcam);
			cam.x0=balle.x;
			cam.y0=balle.y;
			cam.x+=cam.x0;
			cam.y+=cam.y0;
			cam.z+=cam.z0;
			break;
		case "transition":                   
			switch (cam.nextphase) {
				case "perso":
					dr=(cam.next_r-cam.rcam)/cam.dn;
					cam.rcam+=dr;                          
					dphi=(cam.next_phi-cam.phicam)/cam.dn;
					cam.phicam+=dphi;
					dx=(personnages[cam.perso_target].x-cam.x)/cam.dn;
					dy=(personnages[cam.perso_target].y-cam.y)/cam.dn;
					dz=(150+personnages[cam.perso_target].z-cam.z)/cam.dn;                          
					cam.x+=dx;
					cam.y+=dy;
					cam.z+=dz;                          
					break;
				case "fixe":                          
					dr=(cam.next_r-cam.rcam)/cam.dn;
					cam.rcam+=dr;
					dteta=(cam.next_teta-cam.tetacam)/cam.dn;
					cam.tetacam+=dteta;
					dphi=(cam.next_phi-cam.phicam)/cam.dn;
					cam.phicam+=dphi;
					cam.x=cam.rcam*Math.cos(cam.phicam*deg)*Math.cos(cam.tetacam*deg);
					cam.y=cam.rcam*Math.cos(cam.phicam*deg)*Math.sin(cam.tetacam*deg);
					cam.z=cam.rcam*Math.sin(cam.phicam*deg);             
					cam.jcam={x:-cam.x/cam.rcam,y:-cam.y/cam.rcam,z:-cam.z/cam.rcam};
					cam.icam={x:-Math.sin(cam.tetacam*deg),y:Math.cos(cam.tetacam*deg),z:0};
					cam.kcam=prod_vect(cam.icam,cam.jcam);                          
					break;
				default:
					break;
													 }                   
			cam.dn--;
			if (cam.dn==0) {                     
				cam.phase=cam.nextphase;
				currenttime=new Date();
				t=currenttime.getTime();
				cam.lasttime=t;                   

			}
			break;
		default:
			break;
									 }
	currenttime=new Date();
	t=currenttime.getTime();
	if (((t-cam.lasttime)/1000>cam.changetime)&&(cam.phase!="transition")&&(cam.phase!="balle")){
		//changement de caméra
		cam.dn=20;
		cam.phase="transition";
		cam.tetacam=cam.tetacam%360;
		if (balle.perso_got>-1) {
			n=Math.floor(Math.random()*2);
		}else{ 
			n=1;
		}

		switch (n) {
			case 0:
				cam.nextphase="perso";
				cam.perso_target=balle.perso_got;//Math.floor(22*Math.random());
				cam.next_r=100+100*Math.random();                    
				cam.next_phi=5+10*Math.random();
				cam.changetime=1+4*Math.random();
				break;
			case 1:
				cam.nextphase="fixe";
				cam.next_r=500+1000*Math.random();
				cam.next_teta=360*Math.random();
				cam.next_phi=10+80*Math.random();
				cam.changetime=1+4*Math.random();
				break;
			default:
				break;
						 }               


	}
}

//mouvements de la balle
function do_ball_stuff() {
	switch (balle.phase) {
		case "path":

			pos_balle=balle.path.splice(0,1);
			balle.x=pos_balle[0].x;
			balle.y=pos_balle[0].y;
			balle.z=pos_balle[0].z;

			if (balle.path.length==0) {
				balle.phase="alone";
				//un personnage vient de receptionner la balle
				personnages[balle.goal_perso].action="reach_point";
				personnages[balle.goal_perso].gotballe=1;
				balle.perso_got=balle.goal_perso;
				balle.goal_perso=-1;                        
				if (cam.phase=="balle") {
					cam.dn=20;
					cam.phase="transition";
					cam.tetacam=cam.tetacam%360;
					cam.nextphase="perso";
					cam.perso_target=balle.perso_got;
					cam.next_r=100+100*Math.random();                    
					cam.next_phi=5+10*Math.random();
					cam.changetime=1+4*Math.random();
				}
			}
			break;
		default:
			break;
										 }
}

//rendu à chaque itération
function draw() {
	//le contexte de mon canvas
	var ctx = document.getElementById('id_canvas1').getContext('2d');

	//que fait la balle ?
	do_ball_stuff();

	//mouvement de la camera
	cam_move();

	//efface le canvas
	ctx.clearRect(0,0,300,300);
	ctx.beginPath();
	//terrain
	ctx.beginPath();
	ctx.strokeStyle = 'black';
	for (p=0;p<terrain.length;p++) {            
		part=terrain[p];
		dernier_devant=1;            
		for(a=0;a<part.length;a++){                
			point=part[a];                
			M={x:point[0],y:point[1],z:point[2]};
			pt=projection(M);
			if ((pt.devant==0)&&(dernier_devant==0)) {
				//les deux derniers points sont derrière donc on ne dessine rien
			}else if ((pt.devant==1)&&(dernier_devant==1)) {
				//Les deux derniers points sont devant
				if (a==0) {
					ctx.moveTo(pt.x, pt.y);
				}else{
					ctx.lineTo(pt.x, pt.y);
				}
			}else if(a>0){
				//un des points est derrière et l'autre non
				//trouve l'intersection entre le segment et le plan de la caméra
				MM1={x:pt.MM.x,y:pt.MM.y,z:pt.MM.z};
				dMM={x:MM1.x-MM0.x,y:MM1.y-MM0.y,z:MM1.z-MM0.z};
				lambda=-MM0.y/dMM.y;
				MI={x:MM0.x+lambda*dMM.x,y:0,z:MM0.z+lambda*dMM.z};
				xx=xorigine+MI.x;
				yy=yorigine-MI.z;
				if (pt.devant==0) {
					//le nouveau point est derrière
					ctx.lineTo(xx, yy);   
				}else{
					//l'ancien point est derrière
					ctx.moveTo(xx, yy);
					ctx.lineTo(pt.x, pt.y);
				}
			}
			MM0={x:pt.MM.x,y:pt.MM.y,z:pt.MM.z};
			dernier_devant=pt.devant;
		}
	}          
	ctx.stroke();
	//actions en cours
	//cherche si on est en mode attaque, milieu ou defense
	if (balle.x>ltx/2) {
		//defense et attaque
		action_en_cours=[0,2];
	}else if (balle.x>-ltx/2) {
		//milieu et milieu
		action_en_cours=[1,1];
	}else{
		//attaque et defense
		action_en_cours=[2,0];
	}

	//personnages          
	for(p=0;p<personnages.length;p++){
		//anime
		personnages[p].do_animate();
		//dessine
		squeleton=personnages[p].squeleton;
		dM={x:personnages[p].x-cam.x,y:personnages[p].y-cam.y,z:personnages[p].z-cam.z};            
		if(prod_scal(dM,cam.jcam)>0){
			//personnage devant la camera
			ctx.beginPath();
			ctx.strokeStyle = personnages[p].color;
			personnages[p].feet_place=[];
			for(a=0;a<squeleton.length;a++){
				struc=squeleton[a];
				xo=personnages[p].bases[a].xo+personnages[p].x;
				yo=personnages[p].bases[a].yo+personnages[p].y;
				zo=personnages[p].bases[a].zo+personnages[p].z;
				i=personnages[p].bases[a].i;
				j=personnages[p].bases[a].j;
				k=personnages[p].bases[a].k;
				foot_record=0;
				if ((struc.name==id_right_foot)||(struc.name==id_left_foot)) {
					xpied=0;
					ypied=0;
					foot_record=1;
				}
				for(b=0;b<struc.point.length;b++){
					x=struc.point[b][0];
					y=struc.point[b][1];
					z=struc.point[b][2];                    
					xx=xo+x*i.x+y*j.x+z*k.x;
					yy=yo+x*i.y+y*j.y+z*k.y;
					zz=zo+x*i.z+y*j.z+z*k.z;
					if (foot_record==1) {
						xpied+=xx;
						ypied+=yy;
					}
					M={x:xx,y:yy,z:zz};
					pt=projection(M);
					if (b==0) {
						ctx.moveTo(pt.x, pt.y);
					}else{
						ctx.lineTo(pt.x, pt.y);
					}
				}
				if (foot_record==1) {                    
					personnages[p].feet_place.push([xpied/struc.point.length,ypied/struc.point.length]);
				}
			}
			ctx.stroke();
		}
	}
	//balle

	M={x:balle.x,y:balle.y,z:balle.z};
	pt=projection(M);         
	if (pt.devant==1) {
		ctx.beginPath();
		ctx.strokeStyle = 'green';
		//ombre de la balle
		Mo00={x:balle.x-balle.rballe,y:balle.y,z:0};
		pt00=projection(Mo00);
		ctx.moveTo(pt00.x, pt00.y);
		Mo01={x:balle.x+balle.rballe,y:balle.y,z:0};
		pt01=projection(Mo01);

		ctx.lineTo(pt01.x, pt01.y);
		Mo10={x:balle.x,y:balle.y-balle.rballe,z:0};
		pt10=projection(Mo10);            
		ctx.moveTo(pt10.x, pt10.y);
		Mo11={x:balle.x,y:balle.y+balle.rballe,z:0};
		pt11=projection(Mo11);
		ctx.lineTo(pt11.x, pt11.y);
		ctx.stroke();
		ctx.beginPath();
		//si la balle est devant la camera, on la dessine
		radius=balle.rballe*cam.focale/(cam.focale+pt.MM.y);
		ctx.arc(pt.x, pt.y, radius, 0, 2 * Math.PI, false);
		ctx.stroke();
	}
	window.requestAnimationFrame(draw);
}

window.onload = function () {	
	init();           
}
