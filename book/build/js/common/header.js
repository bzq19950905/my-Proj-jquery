define(["jquery","render","text!header"],function(n,r,d){return function(e){n("body").append(d),r(e,n("#header-tpl"),n(".render-header")),n(".icon-back").on("click",function(){history.go(-1)})}});