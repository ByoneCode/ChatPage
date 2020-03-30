
var ws = new WebSocket("")  //连接服务器

$('#content-list ul').append('<li role="me"><span>' + '正在连接服务器...' + '</span><i></i></li>');
closebtn();
ws.onopen = function() {  //连接成功回调
	console.log('服务器连接成功');
	$('#content-list ul').append('<li role="rob"><i></i><span>' + '服务器连接成功' + '</span></li>');
	openbtn();
}

ws.onerror = function(data) {  //出现异常回调
	console.log('出现异常' + data);
	$('#content-list ul').append('<li role="rob"><i></i><span>' + '服务器连接异常' + '</span></li>');
}

ws.onclose = function() {  //关闭回调
	console.log('服务器连接关闭');
	$('#content-list ul').append('<li role="rob"><i></i><span>' + '服务器连接关闭' + '</span></li>');
}
//监听键盘回车事件
$(document).keydown(function(event) {
	if (event.keyCode == 13) {
		$('#send').click();
	}
});
//点击发送事件
$('#send').click(function() {
	var content = $('#content').val();
	if (content == '') {
		alert('请填写聊天内容');
		return false;
	}
	$('#content-list ul').append('<li role="me"><span>' + content + '</span><i></i></li>');
	$('#send').text('正在回复...');
	closebtn();
	ws.send(content);
	ws.onmessage = function(data) {
		if(isJson(data.data)){
			var obj = JSON.parse(data.data);
			console.log(obj)
			if(obj.type == '163music'){
				$('#content-list ul').append('<li role="rob" class="music"><span><img src="'+obj.songPic+'" width="50px" /><div class="music-right"><p>'+obj.songName+'</p><p><a target="_blank" href="'+obj.url+'">点击播放</a><p></div></span><i></i></li>');
			}
		}else{
		$('#content-list ul').append('<li role="rob"><i></i><span>' + data.data + '</span></li>');
		}
		$('#content').val('');
		$('#send').text('发送');
		openbtn();
		// 移动到最底部
		window.scrollTo(0, document.documentElement.clientHeight);
	}
})
// 判断是否是json
function isJson(str) {
    if (typeof str == 'string') {
        try {
            JSON.parse(str);
            return true;
        } catch(e) {
            console.log(e);
            return false;
        }
    }
    console.log('它不是字符串');    
}

//禁用按钮
function closebtn(){
	$('#send').css('background-color', '#666');
	$('#send').prop('disabled','disabled');
}
// 启用按钮
function openbtn(){
	$('#send').css('background-color', '#2db37f');
	$('#send').prop('disabled','');
}