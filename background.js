chrome.contextMenus.create({
    'type':'normal',
    'title':'分享到微博',
    'contexts':['image','selection'],
    'onclick':sendit
});

function sendit(info, tab){
    if (info.selectionText == undefined){
		var url = 'http://service.weibo.com/share/share.php?url=' + info.pageUrl+'&title=' + tab.title + '&pic=' + info.srcUrl;
    } else {
		var url = 'http://service.weibo.com/share/share.php?url=' + info.pageUrl+'&title=' + info.selectionText ;
	}
	window.open(url); 
}

