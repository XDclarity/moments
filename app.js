//个人名称
var userName = 'XDclarity';
//数据
var data = [{
  user: {
    name: '椰汁糕', 
    avatar: './img/avatar2.png'
  }, 
  content: {
    type: 0, // 多图片消息
    text: '猫主子美照四张~',
    pics: ['./img/reward1.png', './img/reward2.png', './img/reward3.png', './img/reward4.png'],
    share: {},
    timeString: '10分钟前'
  }, 
  reply: {
    hasLiked: false,
    likes: ['我点赞贼快', '瓜瓜'],
    comments: [{
      author: 'Guo封面',
      text: '也太可爱了吧！！！'
    },{
      author: '阿喵',
      text: 'awsl'
    }]
  }
}, {
  user: {
    name: '熙熙',
    avatar: './img/avatar3.png'
  },
  content: {
    type: 1, // 转发消息
    text: '抢是不可能抢到的',
    pics: [],
    share: {
      pic: './img/banner.png',
      text: '3秒售罄！华晨宇深圳演唱会门票你抢到了吗'
    },
    timeString: '50分钟前'
  },
  reply: {
    hasLiked: false,
    likes: ['椰汁糕'],
    comments: []
  }
}, {
  user: {
    name: '我马上就到',
    avatar: './img/avatar4.png'
  },
  content: {
    type: 2, // 单图片消息
    text: '咕咕咕~咕咕咕~',
    pics: ['./img/pic.png'],
    share: {},
    timeString: '一小时前'
  },
  reply: {
    hasLiked: false,
    likes:[],
    comments: []
  }
}, {
  user: {
    name: '啊开开',
    avatar: './img/avatar5.png'
  },
  content: {
    type: 3, // 无图片消息
    text: '说出来你可能不信，但我真的被十七张牌秒了',
    pics: [],
    share: {},
    timeString: '3个小时前'
  }, 
  reply: {
    hasLiked: false,
    likes:[],
    comments: []
  }
}];

//DOM
var $page = $('.page-moments');
var $momentsList = $('.moments-list');

//点赞内容
function likesHtmlTpl(likes) {
  if (!likes.length) {
    return '';
  }
  var  htmlText = ['<div class="reply-like"><i class="icon-like-blue"></i>'];
  // 点赞人的html列表
  var likesHtmlArr = [];
  // 遍历生成
  for(var i = 0, len = likes.length; i < len; i++) {
    likesHtmlArr.push('<a class="reply-who" href="#">' + likes[i] + '</a>');
  }
  // 每个点赞人以逗号加一个空格来相隔
  var likesHtmlText = likesHtmlArr.join(', ');
  htmlText.push(likesHtmlText);
  htmlText.push('</div>');
  return htmlText.join('');
}
//评论内容
function commentsHtmlTpl(comments) {
  if (!comments.length) {
    return '';
  }
  var  htmlText = ['<div class="reply-comment">'];
  for(var i = 0, len = comments.length; i < len; i++) {
    var comment = comments[i];
    htmlText.push('<div class="comment-item"><a class="reply-who" href="#">' + comment.author + '</a>：' + comment.text + '</div>');
  }
  htmlText.push('</div>');
  return htmlText.join('');
}
//评论点赞总体内容
function replyTpl(replyData) {
  var htmlText = [];
  htmlText.push('<div class="reply-zone">');
  htmlText.push(likesHtmlTpl(replyData.likes));
  htmlText.push(commentsHtmlTpl(replyData.comments));
  htmlText.push('</div>');
  return htmlText.join('');
}
//多张图片消息
function multiplePicTpl(pics) {
  var htmlText = [];
  htmlText.push('<ul class="item-pic">');
  for (var i = 0, len = pics.length; i < len; i++) {
    htmlText.push('<img class="pic-item" src="' + pics[i] + '">')
  }
  htmlText.push('</ul>');
  return htmlText.join('');
}
//分享消息
function shareTpl(share){
  var htmlText = [];
  htmlText.push("<a href='img/share.png' class='item-share'><img src="+share.pic+" "+"class='share-img' width='40px' height='40px'><p class='share-tt'>"+share.text+"</p></a>");
  return htmlText.join('');
}
//单图片消息
function singleTpl(pic){
  var htmlText = [];
  htmlText.push('<img class="item-only-img" src="' + pic[0] + '">');
  //htmlText.push('<img class="one-img" src="" "+pics[0]+">');
  return htmlText.join('');
}
//无图片消息
function pureTextTpl(txet){
  var htmlText = [];
  return htmlText.join('');
}

//点赞评论弹窗
function action(){
  $('.item-ft').append(
    "<div class='likeAndReply'>"+
    "<span class='unlike'>"+
    "<span class='like-icon' ></span>取消</span>"+
    "<span class='like'>"+
    "<span class='like-icon' ></span>点赞</span>"+
    "<span class='reply'>"+
    "<span class='reply-icon' ></span>评论</span></div>")
}

//加入输入
function addInput() {
  $(".page-moments").append("<div class='reply-hide'>"+"<input type='text' name='input' class='in-text' placeholder='评论'>"+"<input type='button' name='send' value='发送' class='in-button'></div>");
}

//消息体 
function messageTpl(messageData) {
  var user = messageData.user;
  var content = messageData.content;
  var htmlText = [];
  htmlText.push('<div class="moments-item" data-index="0">');
  // 消息用户头像
  htmlText.push('<a class="item-left" href="#">');
  htmlText.push('<img src="' + user.avatar + '" width="42" height="42" alt=""/>');
  htmlText.push('</a>');
  // 消息右边
  htmlText.push('<div class="item-right">');
  // 消息内容-用户名称
  htmlText.push('<a href="#" class="item-name">' + user.name + '</a>');
  // 消息内容-文本信息
  htmlText.push('<p class="item-msg">' + content.text + '</p>');
  // 消息内容-图片列表 
  var contentHtml = '';
  switch(content.type) {
      //多图片消息
    case 0:
      contentHtml = multiplePicTpl(content.pics);
      break;
      //转发消息
    case 1:
      contentHtml = shareTpl(content.share);
      break;
      //单张图片消息
    case 2:
      contentHtml = singleTpl(content.pics);
      break;
      //无图片消息
    case 3:
      contentHtml = pureTextTpl(content.text);
      break;
    }
  htmlText.push(contentHtml);
  // 消息时间和回复按钮
  htmlText.push('<div class="item-ft">');
  htmlText.push('<span class="item-time">' + content.timeString + '</span>');
  htmlText.push('<div class="item-reply-btn">');
  htmlText.push('<span class="item-reply"></span>');
  htmlText.push('</div></div>');
  //回复模块（点赞和评论）
  htmlText.push(replyTpl(messageData.reply));
  htmlText.push('</div></div>');
  return htmlText.join('');
}

//页面渲染函数：render
function render() {
  //需要展示data数组中所有数据
  var len=data.length;
  for(var i = 1;i<len;i++)
  {
    $momentsList.html($momentsList.html()+messageTpl(data[i]));
  }
  action();
  addInput();
}

//页面绑定事件函数：bindEvent
function bindEvent() {
//放大图片以及遮罩层实现
  $('.pic-item').on('click',function(){
    $('.mask').css({display: 'inline'})
    document.getElementById('showImg').src=$(this).attr("src");
  });
  $('.mask').on('click',function(){
    $('.mask').css({display: 'none'})});
  $('.item-only-img').on('click',function(){
    $('.mask').css({display: 'inline'})
    document.getElementById('showImg').src=$(this).attr("src");
  })
 $('.item-right').on( "click",".item-reply-btn", function(){
//保存相关对象的信息
    index = $(this).parents(".moments-item").index();
    dataThis = data[index];
    elem = $(this).parents(".moments-item");

    var $re = $(this).parents(".item-ft").find(".likeAndReply"); 
    if(dataThis.reply.hasLiked){
      $re.find(".like").css("display","none");
      $re.find(".unlike").css("display","flex");
    }else{
       $re.find(".like").css("display","flex");
      $re.find(".unlike").css("display","none");
    }
    if($re.hasClass("re-show")){
      $(".likeAndReply").removeClass("re-show")
    }else{
      $(".likeAndReply").removeClass("re-show")
      $re.addClass("re-show");
    }
  });

//点赞
  $(".item-ft").on("click",".likeAndReply .like",function(){

    $(".likeAndReply").removeClass("re-show");
    dataThis.reply.likes.push(userName);
    var text = likesHtmlTpl(dataThis.reply.likes);
    $(this).parents(".moments-item").find(".reply-like").remove();
    $(this).parents(".moments-item").find(".reply-zone").prepend(text);
    dataThis.reply.hasLiked = true;
    console.log("点赞");
  });

//取消点赞
  $(".item-ft").on("click",".likeAndReply .unlike",function(){
      $(".likeAndReply").removeClass("re-show");
      var likes = dataThis.reply.likes.filter(function(item){
        return item!==userName;
      });
      dataThis.reply.likes = likes;
      if(dataThis.reply.likes.length === 0){
        $(this).parents(".moments-item").find(".reply-like").remove();
      }else{
        var text = likesHtmlTpl(dataThis.reply.likes);
        $(this).parents(".moments-item").find(".reply-like").remove();
        $(this).parents(".moments-item").find(".reply-zone").prepend(text);
        console.log("取消点赞");
      }
        dataThis.reply.hasLiked = false;
  });

//点按钮出现输入框
  $(".item-ft").on("click",".likeAndReply .reply",function(e){

    $(".likeAndReply").removeClass("re-show");
    $(".reply-hide").addClass("show");
    console.log($(".reply-hide").length);
    e.stopPropagation();

  });

//获得焦点和键盘操作事件
  $(".page-moments").on("focus keyup","input",function(){
    if($(this).val().trim()!==""){
      $(this).siblings(".in-button").css({color:"white",background:"rgb(66,176,11)"});
    }else{
      $(this).siblings(".in-button").css({color:"#aaa",background:"#ccc"});
    }
  });

//发送评论
  $(".page-moments").on("click",".in-button",function(){
    var textThis = $(this).siblings(".in-text").val();
    var $comment = elem.find(".reply-comment");
    dataThis.reply.comments.push({
      author:userName,
      text:textThis
    });
    var textRe = commentsHtmlTpl(dataThis.reply.comments);

    if($comment.length){
      $comment.remove();
      elem.find(".reply-zone").append(textRe);
    }else{
      elem.find(".reply-zone").append(textRe);
    }

    $(this).siblings(".in-text").val("");
    $(this).parent().removeClass("show");
  });

//挪开点击评论框消失
  $(window).on('click', function(event) {
    var target = event.target;
    if (target.className !== 'item-reply') {
    
      if($(".likeAndReply").hasClass("re-show")){
        $(".likeAndReply").removeClass("re-show");
      } 
    } 
    if(event.target.nodeName!=="INPUT"){
      $(".reply-hide").removeClass("show");
    }
  }); 
}

//页面入口函数：init
//绑定事件
function init() {
  // 渲染页面
  render();
  bindEvent();
}
init();