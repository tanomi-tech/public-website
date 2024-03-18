/**
 * For small snippets that apply sitewide (globally).
 */
document.addEventListener('DOMContentLoaded', function () {
    /**
     * Open all external page links in new tabs.
     */
    const anchors = document.getElementsByTagName('a')
    for (const a of anchors) {
        if (a.hostname !== location.hostname) {
            if (
                ['https:', 'http:'].includes(a.protocol) 
                && a.hostname !== location.hostname
            ) {
                console.log(a.href);
                a.target = '_blank';
            }
        }
    }
}, false);