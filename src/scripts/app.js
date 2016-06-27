// 引入spa类库
require('./lib/spa.min.js');
require('./lib/swiper-3.3.1.min.js');

// 引入主模板views
require('./views/index.js');
//引入视图页
require('./views/home.js');
require('./views/info.js');
require('./views/mine.js');
require('./views/gosome.js');


// SPA设置
SPA.config({
  indexView: 'index'
});
