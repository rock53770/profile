// JavaScript Document

(function(){
var added = false;
window.cal=function(id){
	var oDiv = document.getElementById(id);
	var oBtnPrev = oDiv.children[0];
	var oBtnNext = oDiv.children[1];
	var oSpan    = oDiv.children[2];
	var oUl      = oDiv.children[oDiv.children.length - 1];
	
	var iNow = 0;
	oBtnPrev.onclick = function(){
		iNow--;
		refresh();
	};
	oBtnNext.onclick = function(){
		iNow++;
		refresh();
	};
	refresh();
	function refresh(){
		oUl.innerHTML = '';
		var oDate = new Date();
		oDate.setDate(1);
		oDate.setMonth(oDate.getMonth() + iNow);
		oSpan.innerHTML = oDate.getFullYear() + '年' + (oDate.getMonth() + 1) + '月';
		
		var oDate= new Date();
		oDate.setDate(1);
		oDate.setMonth(oDate.getMonth() + iNow);
		
		var day = oDate.getDay();
		if(day == 0){
			day = 7;	
		}
		day--;
		var oDate= new Date();
		oDate.setDate(1);
		oDate.setMonth(oDate.getMonth() + iNow);
		
		oDate.setDate(0);
		var prevTotal = oDate.getDate();
		
		for(var i=1; i<=day; i++){
			var oLi = document.createElement('li');
			oLi.innerHTML = prevTotal-day + i;
			oUl.appendChild(oLi);
			oLi.className = 'past';
		}
		
		var oDate= new Date();
		oDate.setDate(1);
		oDate.setMonth(oDate.getMonth() + iNow);
		
		oDate.setMonth(oDate.getMonth()+1);
		oDate.setDate(0);
		
		var total = oDate.getDate();
		
		var oDate= new Date();
		var today = oDate.getDate();
		
		for(var i=1; i<=total; i++){
			var oLi = document.createElement('li');
			oLi.innerHTML = i;
			oUl.appendChild(oLi);
			
			if(iNow < 0 ){
				oLi.className = 'past';
			} else if(iNow == 0){
				
				if(i<today){
					oLi.className = 'past';
				} else if(i == today){
					oLi.className = 'today';
				}
			}
		}
		for(var i = 0; i < oUl.children.length; i++){
			if(i%7 == 5 || i%7 == 6){
				
				if(oUl.children[i].className == ""){
					oUl.children[i].className = "week_end";
				}
				
			}
		}
		
		for(var i=1; i <= 42-total-day; i++){
			var oLi = document.createElement('li');
			oLi.innerHTML = i;
			oUl.appendChild(oLi);
			oLi.className = 'past';
		}
	}
	
	if(added) return;
	added = true;
	var oLink = document.createElement("link");
	oLink.rel = "stylesheet";
	oLink.href = "cal.css";
	document.body.appendChild(oLink);
}
})();














