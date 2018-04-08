window.onload = function(){
 
    search();

    banner();
   
  downTime();
}

  //  搜索框

 var  search = function(){
    /*需求*/
  /*1.默认顶部位置透明*/
  /*2.当页面滚动的时候 滚动的越多透明度就越大  最大0.85*/
  /*3.当超过轮播图的位置的时候  就不透明*/

    var  jdheaderBox = document.querySelector('.jd_header_box');
   /*获取轮播图的高度*/
    var  jdBanner = document.querySelector('.jd_banner');
    var  banHeight = jdBanner.offsetHeight;


     window.onscroll = function(){
      /*获取向上滚动的距离*/
      var scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
        
        var opacity = 0;
      //  判断向上卷曲的高度是否大于轮播图的高度
       if(scrollTop < banHeight){
        
         opacity = scrollTop/banHeight*0.85;

       }else{
    
       opacity = 0.85;

       }
       
       jdheaderBox.style.backgroundColor = 'rgb(216,80,92,'+opacity+')'; 

     }
     
   }


   // 轮播图

var banner = function () {
  /*获取轮播图的div*/
  var jdBanner = document.querySelector('.jd_banner');
  //获取轮播图的宽度 
  var BanWidth = jdBanner.offsetWidth;
  /*获取第一个ul*/
  var imgBox = jdBanner.querySelector('ul:first-child');
  /* 获取点的容器 */
  var poxBox = jdBanner.querySelector('ul:last-child');
  /* 获取点容器中所有的li */
  var list = poxBox.querySelectorAll('li');
    
  /*自动轮播 */
    
  // 定义当前索引为1;
  var index = 1;
  /* 定时器 */
  var timer = setInterval(function () {
    index++;

    /* 过渡 */
    imgBox.style.transition = "all 0.6s";
    imgBox.style.webkitTransition = "all 0.6s ";

    /* 移动 */
    imgBox.style.transform = 'translateX(' + (-index * BanWidth) + 'px)';
    /* 兼容 */
    imgBox.style.webkitTransform = 'translateX(' + (-index * BanWidth) + 'px)';

    //console.log(index);

  }, 1000);
      
  /* 当最后一张图片动画切换完成 瞬间跳转到二张 */
  imgBox.addEventListener('transitionend', function () {
    /*索引为9且动执行完成*/
        
    if (index >= 9) {
          
      /* 无缝滚动  瞬间移动到索引为 1 的图片 */
      index = 1;
         
      /* 因为需要瞬间跳转到第二张   这里不需要过渡的效果 */
      imgBox.style.transition = "none";
      imgBox.style.webkitTransition = "none";
        
      /* 移动 */
      imgBox.style.transform = 'translateX(' + (-index * BanWidth) + 'px)';
      /* 兼容 */
      imgBox.style.webkitTransform = 'translateX(' + (-index * BanWidth) + 'px)';
          
    } else if (index <= 0) {
          
      index = 8;

      /* 这里不需要过渡的效果 */
      imgBox.style.transition = "none";
      imgBox.style.webkitTransition = "none";
        
      /* 移动 */
      imgBox.style.transform = 'translateX(' + (-index * BanWidth) + 'px)';
      /* 兼容 */
      imgBox.style.webkitTransform = 'translateX(' + (-index * BanWidth) + 'px)';
    }
    /*2. 点对应当前图片  根据索引改点的NOW样式*/
    /*当前的索引取值范围是多少  1-8 对应LI的所有 0-7 */
    setpot();
  });
  /* 给小按钮添加样式 */
  var setpot = function () {
    /* 去掉之前的样式 */
    poxBox.querySelector('li.now').classList.remove('now');
    /* 给当前的元素添加样式 */
    list[index - 1].classList.add('now');

  }

  /*3. 滑动功能  滑动过程中轮播图停止  使用touch事件更改触摸的容器位置 */
  var startX = 0;  //记录触摸的起始X坐标
  var moveX = 0;   // 记录滑动的距离
  var distanceX = 0; //记录移动了多少的距离
  var startTime = 0;  //记录开始滑动的时间
  var isMove = false;   //为了严谨 需要做一个判断 滑动的体感速度
  imgBox.addEventListener('touchstart', function (e) {
    startX = e.touches[0].clientX;
    /* 记录开始滑动的时间 */
    startTime = Date.now();

    /* 清除定时器 */
    clearInterval(timer);
  });
      
  imgBox.addEventListener('touchmove', function (e) {
    /*在移动端有浏览器默认事件  滑动边框部分 回退前进历史的行为*/
    /*在移动端有浏览器默认事件  上下滚动  所以我们要阻止浏览器的默认行为*/
    e.preventDefault();

    moveX = e.touches[0].clientX;
    /* 记录移动了多少的距离 */
    distanceX = moveX - startX;
    //console.log(distanceX);
        
    /* 将要去定位的位置 = 当前的位移 +  移动的距离*/
    var translateX = -index * BanWidth + distanceX;
    //console.log(translateX);

    /*去改变图片容器的位置 不能有动画*/
    imgBox.style.transition = "none";
    imgBox.style.webkitTransition = "none";
        
    /* 移动 */
    imgBox.style.transform = 'translateX(' + translateX + 'px)';
    /* 兼容 */
    imgBox.style.webkitTransform = 'translateX(' + translateX + 'px)';
        
    isMove = true;
         
  });

  imgBox.addEventListener('touchend', function (e) {
    /* 检测一定滑动过 */
    if (isMove) {
      var t = Date.now() - startTime;  //记录滑动到结束用的时间
      //获取滑动的距离
      var d = Math.abs(distanceX);
      // console.log(d);
      //怎么求这个速度   移动的距离/滑动的时间 = 速度
      var seep = d / t;
      // console.log(seep);
      /* 判断滑动的体感速度 */
      /*经过测试  体感速度  0.5 px/ms 比较快*/
      if (seep > 0.3) {
               
        if (distanceX > 0) {
          index--;
        } else {
          index++;
        }
        /* 过渡 */
        imgBox.style.transition = "all 0.6s";
        imgBox.style.webkitTransition = "all 0.6s ";

        /* 移动 */
        imgBox.style.transform = 'translateX(' + (-index * BanWidth) + 'px)';
        /* 兼容 */
        imgBox.style.webkitTransform = 'translateX(' + (-index * BanWidth) + 'px)';

      } else {
        /*4.判断 当滑动的距离不超过 图片的3 分之 1  就吸附回去*/
        if (Math.abs(distanceX) < BanWidth / 3) {
         
          /* 吸附效果  让其回到原始的位置 */
          /* 过渡 */
          imgBox.style.transition = "all 0.6s";
          imgBox.style.webkitTransition = "all 0.6s ";
 
          /* 移动 */
          imgBox.style.transform = 'translateX(' + (-index * BanWidth) + 'px)';
          /* 兼容 */
          imgBox.style.webkitTransform = 'translateX(' + (-index * BanWidth) + 'px)';
          
          /*5. 滑动结束 滑动的距离 超过三分之一  图片切换  上一张  下一张 */
        } else {
          if (distanceX > 0) {
            index--;
          } else {
            index++;
          }
          /* 过渡 */
          imgBox.style.transition = "all 0.6s";
          imgBox.style.webkitTransition = "all 0.6s ";
 
          /* 移动 */
          imgBox.style.transform = 'translateX(' + (-index * BanWidth) + 'px)';
          /* 兼容 */
          imgBox.style.webkitTransform = 'translateX(' + (-index * BanWidth) + 'px)';
 
        }
      }
    }
          
    clearInterval(timer);
    /* 当滑动结束 , 开启定时器 */
    timer = setInterval(function () {
      index++;
      /* 过渡 */
      imgBox.style.transition = "all 0.6s";
      imgBox.style.webkitTransition = "all 0.6s ";

      /* 移动 */
      imgBox.style.transform = 'translateX(' + (-index * BanWidth) + 'px)';
      /* 兼容 */
      imgBox.style.webkitTransform = 'translateX(' + (-index * BanWidth) + 'px)';
    }, 1000)
        
    /* 检测是否滑动 */
    isMove = 0;
    /* 刚触摸屏幕的坐标 */
    startX = 0;
    startTime = 0;
    distanceX = 0;

  })
};

/* 定时器 */
var downTime = function () {
   /*需求*/
    /*1. 模拟需要倒计时  4小时*/
    /*2. 每一秒去更新 黑色盒子*/
  
  /* 获取 sk_time 中所有的span */
  var spanList = document.querySelectorAll('.sk_time span');

  // 假设是6个小时
  var time = 4*60*60;

  /* 定时器 */

  var timer = setInterval(function () {
    time--;

    var h = Math.floor(time / 3600);
    var m = Math.floor(time % 3600 /60);
    var s = Math.floor(time % 60);
 
        spanList[0].innerHTML = Math.floor(h / 10);
        spanList[1].innerHTML = h % 10;

        spanList[3].innerHTML = Math.floor(m / 10);
        spanList[4].innerHTML = m % 10;

        spanList[6].innerHTML = Math.floor(s / 10);
        spanList[7].innerHTML = s % 10;
    
    if (time <= 0) {
      
      clearInterval(timer);

    }

  },1000)
  
}
