const Nightmare = require('nightmare')
const nodecache = require('node-cache');
const cookieCache = new nodecache({ stdTTL: 720 });

async function runJDSCookieAutomation() {
    const nightmare = Nightmare()
    return nightmare
        .goto('https://shop.jdsindustries.com/do_login.php')
        .type('.loginInput', 'username')
        .type('#txtpassword', 'password')
        .click('.btnLogin')
        .cookies.get()
        .end()
};

async function getJDSCookies() {
    if (cookieCache.has('cookies')) {
        return cookieCache.get('cookies')
    } else {
        const allCookies = await runJDSCookieAutomation();
        const phpCookie = allCookies.find(cookie => {
            return cookie.name === 'PHPSESSID'
        })
        const gaCookie = allCookies.find(cookie => {
            return cookie.name === '_ga'
        })
        cookieCache.set('cookies', {
            'phpCookie': phpCookie.value,
            'gaCookie': gaCookie.value
        });
        return cookieCache.get('cookies');
    }

}

module.exports = { getJDSCookies }