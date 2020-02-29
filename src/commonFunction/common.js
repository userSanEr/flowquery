export default{
    //禁止页面滚动：
    openBoxBefore:function(){
        $('body').css({'overflow':'hidden'});
        document.addEventListener("touchmove",function(e){e.preventDefault();},{passive: false});
    },
    //开启滚动
    closeBoxBefore:function(){
        $('body').css({'overflow' : 'auto'});
        document.removeEventListener("touchmove",function(e){e.preventDefault();},false);
    }
    
}