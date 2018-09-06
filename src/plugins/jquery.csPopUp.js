(function($){
	$.fn.csPopUp=function(){
		$.fn.csPopUp.deflunt={  //默认参数
			trigger:".trigger",
			x_align:"cc",
			y_align:"cc",
			x_offset:0,
			y_offset:0
		}
		return this.each(function(index,item) {
			var item=$(item);
			var tem=item.data("options"); //配置参数
			var options= eval(tem);
			var opts = $.extend({},$.fn.csPopUp.deflunt,options); //参数合并，获得最终参数。
			var trigger=opts.trigger;
			var popBox_event="";
			var popBox_width=item.width();
			var popBox_height=item.height();
			var trigger_width=$(trigger).width();
			var trigger_height=$(trigger).height();
			var trigger_pos=$(trigger).position();
			var pop_x="";
			var pop_y="";
			function m_out(){
				if(popBox_event != "enter"){
					item.css("display","none");
				}
			}
			item.bind('mouseenter',function(){
				popBox_event="enter";
			});
			item.bind('mouseleave',function(){
				item.css("display","none");
				popBox_event="out";
			});
			$(trigger).bind('mouseenter', function() {
				item.css("display","block");
			});
			$(trigger).bind('mouseleave', function() {
				setTimeout(m_out,10);
			});

			switch(opts.x_align){  //align: trigger---popBox
				case "cc": pop_x = trigger_pos.left-(popBox_width-trigger_width)/2 ;
					break;
				case "cl": pop_x = trigger_pos.left+trigger_width/2;
					break;
				case "cr":pop_x = trigger_pos.left+trigger_width/2-popBox_width;
					break;
				case "ll":pop_x = trigger_pos.left;
					break;
				case "lc":pop_x = trigger_pos.left-popBox_width/2;
					break;
				case "lr":pop_x = trigger_pos.left-popBox_width;
					break;
				case "rr":pop_x = trigger_pos.left+trigger_width-popBox_width;
					break;
				case "rl":pop_x = trigger_pos.left+trigger_width;
					break;
				case "rc":pop_x = trigger_pos.left+trigger_width-popBox_width/2;
					break;
				default:
					break;
			}
			switch(opts.y_align){  //align: trigger---popBox
				case "cc":pop_y=trigger_pos.top+trigger_height/2-popBox_height/2;
					break;
				case "ct":pop_y=trigger_pos.top+trigger_height/2;
					break;
				case "cb":pop_y=trigger_pos.top+trigger_height/2-popBox_height;
					break;
				case "tt":pop_y=trigger_pos.top;
					break;
				case "tc":pop_y=trigger_pos.top-popBox_height/2;
					break;
				case "tb":pop_y=trigger_pos.top;
					break;
				case "bb":pop_y=trigger_pos.top+trigger_height-popBox_height;
					break;
				case "bt":pop_y=trigger_pos.top+trigger_height;
					break;
				case "bc":pop_y=trigger_pos.top+trigger_height-popBox_height/2;
					break;
				default:
					break;
			}
			item.css("left",pop_x+opts.x_offset);
			item.css("top",pop_y+opts.y_offset);
			pop_x="";
			pop_y="";
		});
	}
})(jQuery);



