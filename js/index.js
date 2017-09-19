// JavaScript Document
$(function(){

//导航部分开始
(function(){

	var oNav=document.getElementById('nav');
	var oBg = oNav.children[0];
	var aLi=oNav.children[1].children;
	
	for(var i=0;i<aLi.length;i++)
	{
		aLi[i].onmouseover=function ()
		{
			move(oBg, this.offsetLeft);
		};
	}
	var left=0;
	var speed=0;
	
	function move(obj, target){
		clearInterval(obj.timer);
		obj.timer=setInterval(function (){
			//弹性-加速
			speed+=(target-left)/5;
			//摩擦-减速
			speed*=0.7;
	
			left+=speed;
	
			obj.style.left=Math.round(left)+'px';
	
			if(Math.round(left)==target && Math.abs(speed)<1){
				clearInterval(obj.timer);
			}
		}, 30);
	}	
})();	

/*pt-page-1*/
(function(){
	function hasClassName(inElement, inClassName)
	{
		var regExp = new RegExp('(?:^|\\s+)' + inClassName + '(?:\\s+|$)');
		return regExp.test(inElement.className);
	}
	
	function addClassName(inElement, inClassName)
	{
		if (!hasClassName(inElement, inClassName))
			inElement.className = [inElement.className, inClassName].join(' ');
	}
	
	function removeClassName(inElement, inClassName)
	{
		if (hasClassName(inElement, inClassName)) {
			var regExp = new RegExp('(?:^|\\s+)' + inClassName + '(?:\\s+|$)', 'g');
			var curClasses = inElement.className;
			inElement.className = curClasses.replace(regExp, ' ');
		}
	}
	
	function toggleClassName(inElement, inClassName)
	{
		if (hasClassName(inElement, inClassName))
			removeClassName(inElement, inClassName);
		else
			addClassName(inElement, inClassName);
	}
	
	$("#welcome").on("click",function(){
		toggleShape();
		
	});
	
	$("#backfaces").on("click",function(){
		toggleBackfaces();
		
	});
	
	function toggleShape()
	{
	  var shape = document.getElementById('shape');
	  if (hasClassName(shape, 'ring')) {
		removeClassName(shape, 'ring');
		addClassName(shape, 'cube');
	  } else {
		removeClassName(shape, 'cube');
		addClassName(shape, 'ring');
	  }
	  
	  var stage = document.getElementById('stage');
	  if (hasClassName(shape, 'ring')){	
		  stage.style.webkitTransform = 'translateZ(-200px)';
		  stage.style.transform = 'translateZ(-200px)';
		  
		  var str = '欢迎您来到我的个人网站。';
		  for(var i=0; i<str.length; i++){
			  shape.children[i].innerHTML = str.charAt(i);
		  }
		  
	  }
	  else{	
		  stage.style.webkitTransform = '';
		
		  stage.style.transform = '';
		  
		  for(var i=0; i<12; i++){
			  shape.children[i].innerHTML = i+1;
		  }
	  }
	  
	  
	}
	
	function toggleBackfaces()
	{
	  var backfacesVisible = document.getElementById('backfaces').checked;
	  var shape = document.getElementById('shape');
	  if (backfacesVisible)
		addClassName(shape, 'backfaces');
	  else
		removeClassName(shape, 'backfaces');
	}	
})();
/*pt-page-2*/
(function(){
	$.each($("#ul2 a"),function(index,value){
		$("#ul2 a").eq(index).css('background','url(picture/w'+(index+5)+'.jpg)');
	});
	
	
	var oUl = document.getElementById("ul2");
	var aLi  = oUl.getElementsByTagName("a");
	
	for(var i = 0; i < aLi.length; i++){
		lago(aLi[i]);
	}
	
	
	function direction(obj,oEvent){
					
		var x = oEvent.clientX - obj.offsetLeft - obj.offsetWidth/2;
		var y = obj.offsetHeight/2 + obj.offsetTop -  oEvent.clientY;
		
		var a = Math.atan2(y,x);
		
		// 0 左  1下 2 右 3 上
		
		return Math.round((a*180/Math.PI + 180)/90)%4;	
	}
	
	function lago(oDiv){
		oDiv.onmouseover = function(ev){
			var oEvent = ev || event;
			var oSrc = oEvent.fromElement || oEvent.relatedTarget;
			
			if(oDiv.contains(oSrc)){
				return;
			}
			
			var oSpan = this.children[0];
			
			var n = direction(oDiv,oEvent);
			
			switch(n){
				case 0:// 0 左 
				oSpan.style.left = "-230px";
				oSpan.style.top = "0";
				break;
				case 1://  1下
				oSpan.style.left = "0";
				oSpan.style.top = "150px";
				break;
				case 2://  2 右 
				oSpan.style.left = "230px";
				oSpan.style.top = "0";
				break;
				case 3:// 3 上
				oSpan.style.left = "0";
				oSpan.style.top = "-150px";
				break;
			}
			
			move(oSpan,{left:0,top:0});
		};
		
		oDiv.onmouseout = function(ev){
			var oSpan = this.children[0];
			var oEvent = ev || event;
			var oTo = oEvent.toElement || oEvent.relatedTarget;
			
			if(oDiv.contains(oTo)){
				return;
			}
			var n = direction(oDiv,oEvent);
			
			switch(n){
				case 0:
					move(oSpan,{left:-230,top:0});
				break;
				case 1:
				 move(oSpan,{left:0,top:150});
				break;
				case 2:
				 move(oSpan,{left:230,top:0});
				break;
				case 3:
				  move(oSpan,{left:0,top:-150});
				break;
			}
		};	
	}
})();

/*pt-page-3*/
(function(){
	var oBtn = document.getElementById("btn1");
	var oUl = document.getElementById("ul1");
	var aLi = oUl.children;
	var len = aLi.length;
	var zIndex = 1;
	
	var arr=[];
	for(var i=0; i<len; i++){
		arr[i] = i;
	}
	oBtn.onclick = function(){
		arr.sort(function(n,m){
			return Math.random() - 0.5;
		});
		for(var i=0; i<len; i++){
			aLi[i].index = arr[i];	
		}
		
		for(var i=0; i< len; i++){
			move(aLi[i],aPos[aLi[i].index]);
		}
	}
	var aPos = [];
	for(var i = 0; i < aLi.length; i++){
		aPos[i] = {left:aLi[i].offsetLeft, top: aLi[i].offsetTop};
		aLi[i].style.left = aPos[i].left + "px";
		aLi[i].style.top  = aPos[i].top  + "px";
	}
	
	for(var i = 0; i < aLi.length; i++){
		
		aLi[i].style.position = "absolute";
		aLi[i].style.margin  = "0";
		aLi[i].index = i;
		drag(aLi[i]);
	}
	
	function getDis(obj1,obj2){
		var a = obj1.offsetLeft - obj2.offsetLeft;
		var b = obj1.offsetTop - obj2.offsetTop;
		return Math.sqrt(a*a + b*b);
	}
	
	function findMin(obj){
		var iMin = 999999;
		var iMinIndex = -1;
		
		for(var i=0; i<aLi.length; i++){
			if(obj == aLi[i]) continue;
						
			if(collText(obj,aLi[i])){
				if(iMin > getDis(obj,aLi[i])){
					iMin = getDis(obj,aLi[i]);
					iMinIndex = i;
				}
			}
		}
		
		if(iMinIndex == -1){
			return null;
		}
		return aLi[iMinIndex];
	}
	
	function drag(obj){
		obj.onmousedown = function(ev){
			//obj.className = 'box';
			var oEvent = ev || event;
			var disX = oEvent.clientX - obj.offsetLeft;
			var disY = oEvent.clientY - obj.offsetTop;
			
			obj.style.zIndex = zIndex++;
			clearInterval(obj.timer);
			document.onmousemove = function(ev){
				var oEvent = ev || event;
				obj.style.left = oEvent.clientX - disX + 'px';
				obj.style.top = oEvent.clientY - disY +'px';
				
				for(var i = 0; i < aLi.length; i++){
					aLi[i].className = "";
				}
				
				findMin(obj) && (findMin(obj).className = 'box');
				
				
			};
			
			document.onmouseup = function(){
				document.onmousemove = null;
				document.onmouseup = null;
				obj.releaseCapture && obj.releaseCapture();	
				
				var oNear = findMin(obj);
				if(oNear){
					
					var tmp = obj.index;
					obj.index = oNear.index;
					oNear.index = tmp;
					
					move(oNear,aPos[oNear.index]);
				}
				move(obj,aPos[obj.index]);
				
				for(var i = 0; i < aLi.length; i++){
					aLi[i].className = "";
				}
			};
			
			return false;
			obj.setCapture && obj.setCapture();
			
		};
	}
	
	function collText(obj1,obj2){
		var l1 = obj1.offsetLeft;
		var t1 = obj1.offsetTop;
		var r1 = l1 + obj1.offsetWidth;
		var b1 = t1 + obj1.offsetHeight;
		
		var l2 = obj2.offsetLeft;
		var t2 = obj2.offsetTop;
		var r2 = l2 + obj2.offsetWidth;
		var b2 = t2 + obj2.offsetHeight;
		
		
		if(r1 < l2 || b1 < t2 || l1 > r2 || t1 > b2){
			return false;
		} else {
			return true;	
		}
	}	
})();

/*pt-page-4*/
(function(){
	var oDiv = document.getElementById('div1');
	var oUser = document.getElementById('user');
	var oPsw = document.getElementById('psw');
	var oLog = document.getElementById('log');
	var oReg = document.getElementById('reg');
	var oFace = document.getElementById('face');
	var oCont = document.getElementById('cont');
	var oChat = document.getElementById('chatbox');
	var oTxtA = document.getElementById('txta');
	var oBtnSend = document.getElementById('btnsend');
	
	var n=7;
	oFace.onclick =function(){
		n++;
		oFace.src = "picture/"+n+".jpg";
		oFace.alt = n;
		if(n == 14){
			n=6;
		}
	}
	var zns = 'http://www.zhinengshe.com/exercise/im/api.php';
	
	oReg.onclick =function(){
		jsonp(zns,{a:'reg',user:oUser.value,pass:oPsw.value,face:oFace.getAttribute('alt')},'cb',function(json){
			if(json.err == 0){
				alert(json.msg);
			} else {
				alert("注册失败");
			}
		});	
	}
	var tk = '';
	
	function toTime(time){
		
		var str = '';
		var oDate = new Date();
		oDate.setTime(time * 1000);
		
		var H = oDate.getHours();
		var M = oDate.getMinutes();
		var S = oDate.getSeconds();
		
		str = '' + H + ':' + M + ':' + S;
		
		return str;
		
	}
	
	oLog.onclick = function(){
		jsonp(zns,{a:'lgn', user:oUser.value, pass:oPsw.value},'cb',function(json){
			if(json.err == 0){
				alert(json.msg);
				oFace.onclick = null;
				tk = json.token;
				oFace.src = "picture/"+(parseInt(json.face)+6)+".jpg";
				oFace.alt = parseInt(json.face)+6;
				oFace.style.height = '90px';
				oFace.style.width = '90px';
				oCont.style.display = 'none';
				oChat.style.display = 'block';
				jsonp(zns,{a:'get_msg',token:json.token},'cb',function(json){
					if(json.err == 0){
						var arr = json.data;
						var oGetMsg = document.getElementById('get_msg');
						for( var i=0; i < arr.length; i++){
							
							var oDiv = document.createElement('div');
							
							oDiv.id = arr[i].ID;
							oDiv.innerHTML = '<strong>'+arr[i].username+'</strong>\
							<span>'+arr[i].content+'</span><br />\
							<i>'+toTime(arr[i].post_time)+'</i>';
							oGetMsg.appendChild(oDiv);
						}
					} else {
						alert('获取消息列表失败');	
					}
				});
				jsonp(zns,{a:'get_user_list',token:json.token},'cb',function(json){
					if(json.err == 0){
						var oUserList = document.getElementById('userlist');
						var arr = json.data;
						for(var i=0; i<arr.length; i++){
							var oDiv = document.createElement('div');
							oDiv.innerHTML = '<img src="picture/'+(parseInt(arr[i].face)+7)+'.jpg" /><span>'+arr[i].username+'</span>';
							oUserList.appendChild(oDiv);
						}
					} else {
						alert('获取用户列表失败');	
					}
				});
				
			} else {
				alert("登陆失败");
			}
		});	
	}
	oBtnSend.onclick =function(){
		jsonp(zns,{a:'snd_msg',content:oTxtA.value,token:tk},'cb',function(json){
			
			if(json.err == 0){
				var oGetMsg = document.getElementById('get_msg');
				var oDiv = document.createElement('div');
				oDiv.id = json.ID;
				
				oDiv.innerHTML = '<strong>'+oUser.value+'</strong>\
								 <span>'+oTxtA.value+'</span><br />\
								 <i>'+toTime(json.time)+'</i>';
				oGetMsg.appendChild(oDiv);
				oTxtA.value = '';
			} else {
				alert('上传消息失败');
			}
		});	
	}
	
	var maxID = 0;
	function getNewMsg()
	{
		
		jsonp(zns,{a:'get_msg_n',n:	maxID, token: token},'cb',function(json){
			if(json.err == 0){
				var arr = json.data;
				var oGetMsg = document.getElementById('get_msg');
				for( var i=0; i < arr.length; i++){
					
					var oDiv = document.createElement('div');
					
					oDiv.id = arr[i].ID;
					oDiv.innerHTML = '<strong>'+arr[i].username+'</strong>\
					<span>'+arr[i].content+'</span><br />\
					<i>'+toTime(arr[i].post_time)+'</i>';
					oGetMsg.appendChild(oDiv);
					
					maxID=arr[arr.length-1].ID;
				}
			} else {
				alert('获取消息列表失败');	
			}
		
		})
	}
})();
/*pt-page-5*/
(function(){
	var oBox=document.getElementById('box5');
	var oHour=document.getElementById('hour');
	var oMin=document.getElementById('min');
	var oSec=document.getElementById('sec');
	var oMon=document.getElementById('month');
	var oBox_sm=document.getElementById('box_sm');
	for(var i=0;i<12;i++){
		var oSpan=document.createElement('span');
		oBox_sm.appendChild(oSpan);
		oSpan.style.transform='rotate('+i*30+'deg)';
		oSpan.style.WebkitTransform='rotate('+i*30+'deg)';
		var n=i==0?12:i;
		oSpan.innerHTML='<em>'+n+'</em>';
		oSpan.children[0].style.transform='rotate('+(-i*30)+'deg)';
		oSpan.children[0].style.WebkitTransform='rotate('+(-i*30)+'deg)';
		
	}

	for(var i=0;i<60;i++){
		var oSpan=document.createElement('span');
		oBox.appendChild(oSpan);
		oSpan.style.transform='rotate('+i*6+'deg)';
		
		oSpan.style.WebkitTransform='rotate('+i*6+'deg)';
		if(i%5==0){
			var n=i/5==0?12:i/5;
			oSpan.className='big';
			oSpan.innerHTML='<em>'+n+'</em>';
			oSpan.children[0].style.transform='rotate('+(-i*6)+'deg)';
			oSpan.children[0].style.WebkitTransform='rotate('+(-i*6)+'deg)';
		}
	}
	setInterval(tick,1000);
	function tick(){
		var oDate=new Date();
		var M=oDate.getMonth()+1;
		var h=oDate.getHours();
		var m=oDate.getMinutes();
		var s=oDate.getSeconds();
		var ms=oDate.getMilliseconds();

		oHour.style.transform='rotate('+(h*30+m/60*30)+'deg)';
		oMin.style.transform='rotate('+(m*6+s/60*6)+'deg)';
		oSec.style.transform='rotate('+(s*6+ms/1000*6)+'deg)';
		oMon.style.transform='rotate('+(M*30)+'deg)';
		
		oHour.style.WebkitTransform='rotate('+(h*30+m/60*30)+'deg)';
		oMin.style.WebkitTransform='rotate('+(m*6+s/60*6)+'deg)';
		oSec.style.WebkitTransform='rotate('+(s*6+ms/1000*6)+'deg)';
		oMon.style.WebkitTransform='rotate('+(M*30)+'deg)';
	}
	tick();
	drag(oBox);
	function drag(oDiv){
		oDiv.onmousedown=function(ev){
		var oEvent=ev || event;
		
		var disX=oEvent.clientX-oDiv.offsetLeft;
		var disY=oEvent.clientY-oDiv.offsetTop;
		
		document.onmousemove=function(ev){
			var oEvent=ev || event;
			oDiv.style.left=oEvent.clientX-disX+'px';
			oDiv.style.top=oEvent.clientY-disY+'px';	
		};
		document.onmouseup=function(){
			document.onmousemove=null;
			document.onmouseup=null;	
			oDiv.releaseCapture && oDiv.releaseCapture();
		}
		oDiv.setCapture && oDiv.setCapture();
		return false;	
		};
	}
})();
/*pt-page-6*/
		
})


//公用函数
function getStyle(obj,name){
	return (obj.currentStyle || getComputedStyle(obj,false))[name];
}

function move(obj,json,options){
	options = options || {};
	options.duration = options.duration || 700;
	options.easing = options.easing || "ease-out";
	var start = {};
	var dis = {};
	
	for(var name in json){
		
		start[name] = parseFloat(getStyle(obj,name));
		
		dis[name] = json[name] - start[name];
	}
	var count = Math.round(options.duration/30);
	var n = 0;
	
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		n++;
		
		for(var name in json){
			
			switch(options.easing){
				case "linear":
					var a = n/count;
					var cur = start[name] + dis[name]*a;
					break;
				case "ease-in":
					var a = n/count;
					var cur = start[name] + dis[name]*Math.pow(a,3);
					break;
				case "ease-out":
					var a = 1 - n/count;
					var cur = start[name]+ dis[name]*(1-Math.pow(a,3));
					break;
			}
			
			if(name == "opacity"){
				obj.style.opacity = cur;
				obj.style.filter = "alpha(opacity:"+cur*100+")";
			} else {
				obj.style[name] = cur + "px";
			}
		}
		if(n == count){
			clearInterval(obj.timer);
			options.complete &&　options.complete.call(obj);
		}	
	},30);
}

function ajax(options)
{
	options=options||{};
	options.json=options.json||{};
	options.type=options.type||'get';
	options.timeout=options.timeout||0;
	
	var arr=[];
	for(var i in options.json)
	{
		arr.push(i+'='+encodeURIComponent(options.json[i]));
	}
	var str=arr.join('&');
	
	
	if(window.XMLHttpRequest)
	{
		var oAjax=new XMLHttpRequest();
	}
	else
	{
		var oAjax=new ActiveXObject('Microsoft.XMLHttp');
	}
	
	if(options.type=='post')
	{
		oAjax.open('post', options.url, true);
		oAjax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		oAjax.send(str);
	}
	else
	{
		oAjax.open('get', options.url+'?'+str, true);
		oAjax.send();
	}
	
	
	oAjax.onreadystatechange=function ()
	{
		
		if(oAjax.readyState==4)
		{
			if(oAjax.status>=200 && oAjax.status<300 || oAjax.status==304)
			{
				options.fnSucc && options.fnSucc(oAjax.responseText);
			}
			else
			{
				options.fnFaild && options.fnFaild();
			}
		}
	};
	
	if(options.timeout)
	{
		setTimeout(function (){
			oAjax.abort();
		}, options.timeout);
	}
}

function jsonp(url, data, cbName, fn)
{
	data[cbName]='jsonp'+Math.random();
	data[cbName]=data[cbName].replace('.', '');
	
	var arr=[];
	for(var i in data)
	{
		arr.push(i+'='+encodeURIComponent(data[i]));
	}
	var str=arr.join('&');
	
	window[data[cbName]]=function (json)
	{
		fn(json);
		
		oHead.removeChild(oS);
		window[data[cbName]]=null;
	};
	var oS=document.createElement('script');
	oS.src=url+'?'+str;
	
	var oHead=document.getElementsByTagName('head')[0];
	oHead.appendChild(oS);
}








