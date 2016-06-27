var tplHome = require('../templates/home.string');



SPA.defineView('home',{
  html:tplHome,

  plugins: ['delegated',{
    name: 'avalon',
    options: function (vm) {
      vm.bookList = [];
    }
  }],
  init:{
    vm: null,
    livelistArray: []
  },

  bindEvents:{

    'beforeShow': function () {
      var that = this;

      // 获得vm对象
      that.vm = that.getVM();

      $.ajax({
        url: '/api/getLivelist.php',
        type: 'get',
        data:{
          rtype: 'origin'
        },
        success: function (rs) {
          //console.log(rs.data);
          that.vm.bookList = rs.data;

          // that.livelistArray = rs.data;
          // that.vm.livelist = that.formatData(rs.data);
          //添加事件
            //书籍展示
            var moduleSwiper = new Swiper('.mainModul',{
              slidesPerView: 3,
              // paginationClickable: true,
              spaceBetween: 30,
              freeMode: true
            });
        }
      });
    },

    show:function(){
      var that = this;
      //轮播图
      var bannerSwiper = new Swiper('#bannerSwip',{
        loop:true,
        // 如果需要分页器
        pagination: '.swiper-pagination',
        //自动播放
        autoplay: 3000,
      });

      // 下拉刷新，上拉加载更多
      var scrollSize = 48;
      var myScroll = this.widgets.homeHotScroll;
      myScroll.scrollBy(0, -scrollSize);

      var head = $('.head img'),
          topImgHasClass = head.hasClass('up');
      var foot = $('.foot img'),
          bottomImgHasClass = head.hasClass('down');
      myScroll.on('scroll', function () {
          var y = this.y,
              maxY = this.maxScrollY - y;
          if (y >= 0) {
              !topImgHasClass && head.addClass('up');
              return '';
          }
          if (maxY >= 0) {
              !bottomImgHasClass && foot.addClass('down');
              return '';
          }
      });

      myScroll.on('scrollEnd', function () {
          if (this.y >= -scrollSize && this.y < 0) {
              myScroll.scrollTo(0, -scrollSize);
              head.removeClass('up');
          } else if (this.y >= 0) {
              head.attr('src', '/mymove/images/ajax-loader.gif');
              //todo ajax下拉刷新数据

              $.ajax({
                url: '/api/getLivelist.php',
                data: {
                  rtype: 'refresh'
                },
                success: function (rs) {
                  that.livelistArray = [];
                  //console.log(that.livelistArray);
                  that.livelistArray = that.livelistArray.concat(rs.data);
                  //console.log(that.livelistArray);
                  that.vm.bookList =  that.livelistArray;
                  //添加事件
                    //书籍展示
                    var moduleSwiper = new Swiper('.mainModul',{
                      slidesPerView: 3,
                      // paginationClickable: true,
                      spaceBetween: 30,
                      freeMode: true
                    });
                  //that.livelistArray = newArray;
                }
              });
          }

          var maxY = this.maxScrollY - this.y;
          var self = this;
          if (maxY > -scrollSize && maxY < 0) {
              myScroll.scrollTo(0, self.maxScrollY + scrollSize);
              foot.removeClass('down')
          } else if (maxY >= 0) {
              foot.attr('src', '/mymove/images/ajax-loader.gif');
              // ajax上拉加载数据

              $.ajax({
                url: '/api/getLivelist.php',
                data: {
                  rtype: 'more'
                },
                success: function (rs) {
                  // var newArray = that.livelistArray.concat(rs.data);
                  // that.vm.livelist = that.formatData(newArray);
                  // that.livelistArray = newArray;
                  //console.log(rs);
                  that.livelistArray = that.livelistArray.concat(rs.data);
                  that.vm.bookList =  that.livelistArray;
                  //添加事件
                    //书籍展示
                    var moduleSwiper = new Swiper('.mainModul',{
                      slidesPerView: 3,
                      // paginationClickable: true,
                      spaceBetween: 30,
                      freeMode: true
                    });
                  //that.livelistArray = newArray;
                }
              });

          }
      })




    }//end show
  }//end bindEvents


});
