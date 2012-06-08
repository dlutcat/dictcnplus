var using = localStorage['enabled'] || 'close';

function setEnabled(enabled) {
    localStorage['enabled'] = enabled ? "open" : "close";
    chrome.browserAction.setIcon({
        path: enabled ? 'enable.png' : 'disable.png'
    });
    chrome.browserAction.setTitle({
        title: enabled ? 'Disable Dict.cn' : 'Enable Dict.cn'
    });
    var todo = function (windows) {
        for (var i = 0; i < windows.length; i++) {
            for (var j = 0; j < windows[i].tabs.length; j++) {
                setDictOfTab(windows[i].tabs[j], enabled)
            }
        }
    };
    chrome.windows.getAll({
        populate: true
    },
    todo)
}

function setDictOfTab(tab, enabled) {
    chrome.tabs.sendRequest(tab.id, {
        type: localStorage['enabled']
    },
    function (response) {
        if (sendResponse.result == 'error') {
            console.dir(sendResponse.error.stack || sendResponse.error)
        }
    })
}

function toggle() {
    using = !using;
    setEnabled(using)
}
chrome.browserAction.onClicked.addListener(function (tab) {
    toggle()
});
chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
    try {
        if (request.type == 'currentstate') {
            sendResponse({
                result: localStorage['enabled']
            })
        } else if (request.type == 'close') {
            if (using) {
                using = false;
                setEnabled(using)
            }
        }
    } catch(e) {}
},
false);

if(localStorage['enabled'] == 'open'){
setEnabled(using);
}