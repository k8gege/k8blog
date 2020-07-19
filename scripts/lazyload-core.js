'use strict';
var cheerio = require('cheerio'); 
  
function lazyloadImg(source) {
    var LZ= cheerio.load(source, {
        decodeEntities: false
    });
    //遍历所有 img 标签，添加data-original属性
    LZ('img').each(function(index, element) {
        var oldsrc = LZ(element).attr('src');
        if (oldsrc) {
            LZ(element).removeAttr('src');
            LZ(element).attr({
                
                 'data-original': oldsrc
            });
            
        }
    });
    return LZ.html();
}
//在渲染之前，更改 img 标签
hexo.extend.filter.register('after_render:html', lazyloadImg);

