$(function(){
	var userAgent	=	navigator.userAgent.toLowerCase();
	if($('html').hasClass('ie') || userAgent.indexOf('msie') > -1){
		$.fn.extend({
			customized: function() {
				var randStr	=	Math.random().toString().substr(2,8);
				var thisID		=	this.addClass("pm_"+randStr);
				
				//Create parent - Add elements in this parent
				var parentDiv			=	document.createElement("div");
				parentDiv.className		=	'generateSelect';
				parentDiv.id			=	'select_'+randStr;
				
				//Create children title span
				var titleSpan			=	document.createElement("span");
				titleSpan.className		=	'generateTitle';
				titleSpan.id			=	'generated_'+randStr;
				titleSpan.setAttribute("dir", randStr);
				titleSpan.innerHTML		=	'Select';	
				parentDiv.appendChild(titleSpan);
				
				//Create List of options
				var ulList	=	document.createElement("ul");
				ulList.className		=	'generatSelectors';
				ulList.id			=	'selector_'+randStr;
				ulList.setAttribute("dir", randStr);
				
				//Create inner options
				var index	=	0;
				var selectTitle	=	'';
				$(this).children("option").each(function(){
					var liVal		=	$(this).val();
					var liHTML		=	$(this).html();
					
					var liList	=	document.createElement("li");
					liList.setAttribute("dir", liVal);
					liList.setAttribute("value", index);
					if($(this).prop("selected")){
						liList.setAttribute("class", 'selected');
						selectTitle	=	liHTML;
					}
					liList.innerHTML		=	liHTML;
					ulList.appendChild(liList);
					index++;
					
					
				});
				parentDiv.appendChild(ulList);
				$(".pm_"+randStr).after(parentDiv);
				if(selectTitle != ''){
					$("#generated_"+randStr).html(selectTitle);
				}
				
				//Styling
				var addCls	=	$(".pm_"+randStr).prop("class").replace("pm_"+randStr,'');
				$("#select_"+randStr).addClass(addCls);
				$(".pm_"+randStr).hide();
			}
		});
		$('select').each(function(){
			$(this).customized();
		});
		
		$(document).on('click', '.generateTitle', function(e){
	 		$('.generatSelectors').hide();
			var thisID			=	$(this).attr("dir");
			var thisSelector	=	$("#selector_"+thisID);
			if(thisSelector.css("display") != 'none'){
				thisSelector.hide();
			}else{
				thisSelector.show();
			}
			var scrollPos	=	isNaN(parseInt($('.generatSelectors li.selected').val())) ? 0 : parseInt($('.generatSelectors li.selected').val());
			var multiple	=	40;
			scrollPos		=	parseInt(scrollPos*multiple);
			thisSelector.scrollTop(scrollPos);
		});
		
		$(document).on('click', '.generatSelectors li', function(e){
			var selectorID	=	$(this).parent().attr("dir");
			$('#selector_'+selectorID+' li').removeClass("selected");
			$(this).addClass("selected");
			var getVal	=	$(this).attr("dir");
			var getName	=	$(this).html();
			$(".pm_"+selectorID).val(getVal);
			$("#generated_"+selectorID).html(getName);
			$(".generatSelectors").hide();
		});
	}
});
$(document).on("click",function(e){
	var target	=	e.target.className;
	if(target != 'generateTitle'){
		$('.generatSelectors').hide();
	}
});