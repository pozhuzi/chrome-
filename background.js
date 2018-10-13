let param = (object) => (
  Object.keys(object)
    .map((key) => {
      let value = object[key]
      if (value !== undefined && value !== null) {
        return key + '=' + encodeURIComponent(value)
      }
    })
    .filter(Boolean)
    .join('&')
)

let getShareUrl = (data={}) => (
  'http://service.weibo.com/share/share.php?' + param({
    url: data.url,
    title: data.title,
    pic: data.imageUrl
  })
)

chrome.contextMenus.onClicked.addListener((info, tab) => {
  let data = {
    // NOTE: ignore info.linkUrl
    url: info.pageUrl,
    title: tab.title,
  }

  if (info.mediaType === 'image') {
    if (info.srcUrl) {
      data.imageUrl = info.srcUrl
    }
  }

  if (info.selectionText && info.selectionText.trim().length > 1) {
    data.title = info.selectionText.trim()
  }

  window.open(getShareUrl(data))
})

chrome.contextMenus.create({
  id: 'Share to Weibo',
  title: 'Share to Weibo',
  contexts: ['all'],
})
