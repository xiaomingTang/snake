window.onload=function(){
 	
	function Map(elem,w,h){
		this.width=w;
		this.height=h;
		this.isLoop=false;
		this.elem=elem;
		
		this.head=[];
		this.body=[];
		this.food=[];
		this.backup=[];
		
		this.mapArr=[];
		
		this.init();
		
	}
	
	Map.prototype={
		constructor:Map,
		
		init:function(){
			
			//根据this.width和this.height初始化this.mapArr
			for(var i=0;i<this.height;i++){
				var temp=[];
				for(var j=0;j<this.width;j++){
					temp.push([i,j]);
				}
				this.mapArr.push(temp);
			}
			
			//随机生成头部
			var randx=Math.floor(Math.random()*this.width),
				randy=Math.floor(Math.random()*this.height);
			this.head=[randx,randy];
			
			
			//随机生成食物
			var randx=Math.floor(Math.random()*this.width),
				randy=Math.floor(Math.random()*this.height);
			randx==this.head[0] && randy==this.head[1] && (randx=Math.floor(Math.random()*this.width)) && (randy=Math.floor(Math.random()*this.height))
			this.food=[randx,randy];
			
			this.renderMap().renderHead().renderFood();
						
			return this;
			
			
		},
		//根据this.mapArr渲染地图
		renderMap:function(){
			var temp=this.mapArr,
				table=document.createElement("table"),
				frag=document.createDocumentFragment();
			frag.appendChild(table);
			for(var i=0;i<temp.length;i++){
				var tr=document.createElement("tr");
				table.appendChild(tr);
				for(var j=0;j<temp[i].length;j++){
					var td=document.createElement("td");
					tr.appendChild(td);
					td.indexx=j;
					td.indexy=i;
				}
			}
			this.elem.appendChild(frag);
			return this;
		},
		//根据this.head渲染头部
		renderHead:function(){
			var td=this.elem.getElementsByTagName("td"),
				td_head=this.elem.getElementsByClassName("head")[0],
				head=this.head;
			if(!!td_head) td_head.className="";
			for(var i=0;i<td.length;i++){
				td[i].indexx==head[0] && td[i].indexy==head[1] && (td[i].className="head");
			}
			return this;
		},
		//根据this.body渲染身体
		renderBody:function(){
			var td=this.elem.getElementsByTagName("td"),
				td_body=this.elem.getElementsByClassName("body"),
				body=this.body;
			if(!!td_body){
				for(var i=0;i<td_body.length;i++){
					td_body[i].className="";
				}
			}
			for(var j in body){
				for(var i in td){
					td[i].indexx==body[j][0] && td[i].indexy==body[j][1] && (td[i].className="body");
				}
			}
			return this;
		},
		//根据this.food渲染食物
		renderFood:function(){
			var td=this.elem.getElementsByTagName("td"),
				food=this.food;
			for(var i=0;i<td.length;i++){
				td[i].indexx==food[0] && td[i].indexy==food[1] && (td[i].className="food");
			}
			return this;
		},
		//行走,改变this.head和this.body
		left:function(){
			var x=this.head[0],y=this.head[1];
			if(x==0){
				return this;
			}
			this.backup=this.body.pop();
			this.body.unshift([x,y]);
			x= x-1<0 ? 0 : x-1 ;
			this.head[0]=x;
			return this;
		},
		right:function(){
			var x=this.head[0],y=this.head[1];
			if(x==this.width-1){
				return this;
			}
			this.backup=this.body.pop();
			this.body.unshift([x,y]);
			x= x+1>this.width-1 ? this.width-1 : x+1 ;
			this.head[0]=x;
			return this;
		},
		top:function(){
			var x=this.head[0],y=this.head[1];
			if(y==0){
				return this;
			}
			this.backup=this.body.pop();
			this.body.unshift([x,y]);
			y= y-1<0 ? 0 : y-1 ;
			this.head[1]=y;
			return this;
		},
		bottom:function(){
			var x=this.head[0],y=this.head[1];
			if(y==this.height-1){
				return this;
			}
			this.backup=this.body.pop();
			this.body.unshift([x,y]);
			y= y+1>this.height-1 ? this.height-1 : y+1 ;
			this.head[1]=y;
			return this;
		},
		
		dripFood:function(){
			var randx=Math.floor(Math.random()*this.width),
				randy=Math.floor(Math.random()*this.height);
			randx==this.head[0] && randy==this.head[1] && (this.dripFood());
			for(var i=0;i<this.body.length;i++){
				randx==this.body[i][0] && randy==this.body[i][1] && (this.dripFood());
			}
			this.food=[randx,randy];
			return this;
		},
		
		test_handle:function(){
			if(this.head[0]==this.food[0] && this.head[1]==this.food[1]){
				this.dripFood();
				this.body.push(this.backup);
			}
			return this;
		}
		
	}
	
	
	
	var div=document.getElementById("snake"),
	    map=new Map(div,50,50);
            //why dont you change!
	

	window.onkeydown=function(event){
		switch(event.keyCode){
			case 37:
				map.left().test_handle().renderBody().renderHead().renderFood();
				break;
			case 38:
				map.top().test_handle().renderBody().renderHead().renderFood();
				break;
			case 39:
				map.right().test_handle().renderBody().renderHead().renderFood();
				break;
			case 40:
				map.bottom().test_handle().renderBody().renderHead().renderFood();
				break;
			default:
				break;
		}
	}
}
