function init() {
    function setState() {
        var element = document.createElement('script');
        element.innerHTML = (localStorage['enabled'] == 'open' ? 'dictOpen();' : 'dictClose();');
        element.type = 'text/javascript';
        document.getElementsByTagName('head')[0].appendChild(element)
    }
    window.addEventListener('dictcnClose', function () {
        chrome.extension.sendRequest({
            type: 'close'
        },
        function (response) {})
    },
    false);
    chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
        try {
            if (request.type) {
                localStorage['enabled'] = request.type;
                setState();
                sendResponse.result = 'ok'
            } else {
                sendResponse.result = 'error';
                sendResponse.error = 'unknow'
            }
        } catch(e) {
            console.dir(e);
            sendResponse.result = 'error';
            sendResponse.error = e
        }
    },
    false); 
	{
        var element = document.createElement('script');
        element.src = chrome.extension.getURL("checkState.js");
        document.getElementsByTagName('head')[0].appendChild(element)
    }
}
if (typeof(dictLoaded) == 'undefined') {
    dictLoaded = true;
    var used = false;
    chrome.extension.sendRequest({
        type: 'currentstate'
    },
    function (response) {
        localStorage['enabled'] = response.result;
        init()
    })
}
