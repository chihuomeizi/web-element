$(function () {
  /* 轮播图 */
  banner();
  swipeTab();
  $('[data-toggle="tooltip"]').tooltip();
})

var banner = function () {

  /*需求：动态渲染轮播图*/
  /*1. 需要去判断当前设备是移动端还是非移动端*/
  /*2. 根据图片地址去生成你的HTML格式的代码 (存在data-属性上)*/
  /*3. 你可以把HTML代码追加在对应的位置*/
  
  var render = function () {
    /* 临界点是 768以下称之为 超小屏幕 */
    var isMobile = $(window).width() < 768;
    $('#carousel-example-generic .item').each(function () {
      var text = "";
      if (isMobile) {
        var url = $(this).data('mUrl');
        text = '<a class="m_imgBox" href="#"><img src=' + url + ' ></a>';
      } else {
        var url = $(this).data('pcUrl');
        text = '<a href="#" class="pc_imgBox" style="background-image : url(' + url + ');"></a>';
      }
      $(this).html(text);
    })

  };
  render();
  /*需求 在页面尺寸发生改变的时候 重新渲染轮播图*/
  $(window).on('resize', function () {
    render();
  });

  /*需求 在移动端进行手势切换  上一张  下一张*/
  /*手势：左滑手势  右滑手势*/
  /*1. 滑动结束之后对行为的判断*/
  /*2. 条件：一定滑动过 滑动的距离50px */
  /*结论：基于touch事件的封装 衍生出来的 */
  
  var isMove = false;  //检测是否有滑动
  var distanceX = 0;   //滑动的距离
  var startX = 0;
  $('.wjs_banner').on('touchstart', function (e) {
    //originalEvent 指的是原生事件对象
    startX = e.originalEvent.touches[0].clientX;
  });

  $('.wjs_banner').on('touchmove', function (e) {
    isMove = true;
    var moveX = e.originalEvent.touches[0].clientX
    distanceX = moveX - startX;
    
  });

  $('.wjs_banner').on('touchend', function (e) {
    if (isMove && Math.abs(distanceX) > 50) {
       
      if (distanceX > 0) {
        /* 上一张 */
        $('#carousel-example-generic').carousel('prev');
      } else {
        /* 下一张 */
        $('#carousel-example-generic').carousel('next');
      }

    }
    isMove = false;
    distanceX = 0;
    startx = 0;

  });
  
};

var swipeTab = function () {
  var $mobileTab = $('#tops');
  var widthSum = 0;
  $mobileTab.find('li').each(function () {
    widthSum += $(this).outerWidth(true);
  });
  $mobileTab.width(widthSum);

  $mobileTab.parent().css('overflow', 'hidden');

  new IScroll('.topsParent', {
    scrollX:true,
        scrollY:false
  })
}