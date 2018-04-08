  $(function(){
    $("#fullpage").fullpage({
      //设置每个页面的颜色
      sectionsColor: ["#fadd67", "#84a2d4", "#ef674d", "#ffeedd", "#d04759", "#84d9ed", "#8ac060"],
      verticalCentered: false,
      //显示项目导航
      navigation: true,
      /* 滚屏的滚动速度 */
      scrollingSpeed:1000,
       /* 离开上一屏 */
      onLeave: function(index,nextIndex,direction){
        $(".more").hide();
        //从第二屏到第三屏
        if (index ==2 && nextIndex ==3) {
          $(".section:eq(1)").find('.shaf').addClass('animated');
        }
        //从三屏到第四屏
        if (index == 3 && nextIndex == 4) {
          $(".section:eq(2)").find('.safa').addClass('animated');
        } 
        //从五屏到第六屏
        if (index == 5 && nextIndex == 6) {
          $(".section:eq(4)").find('.sofa').addClass('animated');
          $(".section:eq(5)").find(".box").addClass('animated');
        }
      },
      //进入下一屏
      afterLoad: function (link,index) {
        $(".more").fadeIn();
         /* 在下一屏中加上一个类 */
        $(".section").eq(index - 1).addClass('now');
        
         /* 第七屏才需要的动画 */
        if (index == 7) {
          $(".section:eq(6)").find(".star img").each(function (i) {
            $(this).delay(i * 800).fadeIn(800);
          })
       }
        
      },

      afterRender: function() {
        $(".more").on("click", function () {
          $.fn.fullpage.moveSectionDown();
        });
        /* 第四屏 当购物车滚动的时候 */
        $(".section:eq(3)").on("animationend", '.cart', function () {
          $(".section:eq(3)").find('.text').find("img:first").hide().siblings().fadeIn();
          $(".section:eq(3)").find('.address').fadeIn(function () {
            $(this).find("img:last").fadeIn();
          })
        });
       /* 第八屏 鼠标移动事件 */
        $(".section:nth-child(8)").on('mousemove', function (e) {
          
          $(this).find(".hand img").css({
             left: e.clientX,
            /* 在纵轴上加20 是因为 为了让 鼠标露出来 */
             top: e.clientY +10
           });
          /*给再来一次添加点击事件  */
        }).on("click", ".again", function () {
          /* 点击再来一次  重新开始所有的动画*/
          $('.section.now').removeClass('now');
          $('.section').find('.animated').removeClass('animated');
          /* removeAttr 是删除元素的属性 */;
          $('.section').find('[style]').removeAttr('style');

            /* 使用 fullpage 中的方法 */
          /* 回到第一屏 */
          $.fn.fullpage.moveTo(1);

       })
 
      }


    });
    
  })