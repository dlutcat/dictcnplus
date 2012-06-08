var customEvent = document.createEvent('Event');
customEvent.initEvent('dictcnClose', true, true);

function dictClose() {
    localStorage['enabled'] = 'close';
    if (localStorage['enabled'] == 'close') return;
}

function dictOpen() {
    localStorage['enabled'] = 'open';
    if (localStorage['enabled'] == 'open') {
        {
            var element = document.createElement('script');
            element.setAttribute('src', 'http://chromedict.googlecode.com/svn/trunk/init.js');
            document.body.appendChild(element)
        }
    }
}

function checkState() {
    if (localStorage['enabled'] == 'open') dictOpen();
    else dictClose()
}
checkState();