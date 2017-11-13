/**
 * Created by asus on 2017/11/10.
 */

$(function(){
    /*获取屏幕宽度，确定用大图还是小图*/
   //resize（）作用是根据屏幕的宽度决定轮播图片使用大还是小
   function resize(){
       /*获取屏幕宽度*/
       var windowWidth=$(window).width();
       /*判断屏幕是大还是小 根据Bootstrap栅格参数小屏幕为中间值*/
       var isSmallScreen=windowWidth<768;
       /*根据大小为界面上的每一张轮播图设置背景*/
       //$('#main_ad > .carousel-inner > .item')  获取到的是一个dom数组（多个）
       $('#main_ad > .carousel-inner > .item').each(function(i,item){
           /*each()遍历函数，i第几次遍历（序号），item被遍历的元素*/
           var $item=$(item);  //拿到的item是dom对象，需要转换
           //data()函数去取tada属性
           var imgSrc=$item.data(isSmallScreen ? 'image-xs' : 'image-lg');
           //设置背景图片
           $item.css('backgroundImage', 'url("' + imgSrc + '")');
           //使用小图时，尺寸要等比例变化，所以小图使用img方式
           if (isSmallScreen) {
               $item.html('<img src="' + imgSrc + '" alt="" />');
           } else {
               $item.html("");
           }
       })
   }
    $(window).on('resize',resize).trigger('resize');


    /* 控制标签页的标签容器宽度*/
    var $ulContainer=$('.nav-tabs');
    //获取所有子元素的宽度和
     var width=30; //ul有padding-left：20px ，盒子边框
    //遍历元素
     $ulContainer.children().each(function(index,element){
     /*   console.log(element.clientWidth); //原生js
         console.log($(element))*/
         width+=element.clientWidth;
     });
      //width是li的总和
    // 判断当前UL的宽度是否超出屏幕，如果超出就显示横向滚动条
      if(width > $(window).width()){
          $ulContainer
              .css('width',width).parent()
              .css('overflow-x', 'scroll');
      }


    //新闻列表a点击注册事件
    var  $newTitle=$('.news-title');
    $('#news .nav-pills a').on('click',function(){
        //获取当前点击元素
        var $this=$(this);
        //获取对应的title值
        var title=$this.data('title');
        //将title设置到相应的位置
        console.log(title);
        $newTitle.text(title);
    });


    //获取手指在轮播图元素上的一个滑动方向（左右）
    //根据获得到的方向选择上一张或者下一张

    //获取界面上的轮播图容器
     var $carousels=$('.carousel');
     var startX,endX;
    var offset=50;
    //手指触摸坐开始坐标
    $carousels.on('touchstart',function(e){
        //console.log(e);
        startX= e.originalEvent.touches[0].clientX;
        //console.log(startX);
    });
    //手指触摸离开坐标
    $carousels.on('touchmove',function(e){
        endX= e.originalEvent.touches[0].clientX;
        //console.log(endX);
    });
    //结束触摸一瞬间记录最后的手指所在坐标
    //比大小
    $carousels.on('touchend',function(e){
        //console.log(e);
        //获取每次运动的距离，当距离大于一定值时认为是有方向变化
        var distance=Math.abs(startX-endX);
        if(distance > offset){
            $(this).carousel( startX >endX ? 'prev' : 'next');
        }
    });




})