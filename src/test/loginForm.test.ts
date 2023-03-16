import { EMAIL, LOGIN, PASSWORD } from "../../credentials"

describe('Login form test', async () => {
    beforeEach(async () => {
        await browser.url('https://github.com/login')
    })

    it('user should be log in', async () => {
        await browser.$('//*[@id="login_field"]').waitForDisplayed({
            timeoutMsg: 'Login field was not displayed'
        })
        await browser.$('//*[@id="login_field"]').setValue(LOGIN)
        await browser.$('//*[@id="password"]').setValue(PASSWORD)
        await browser.$('//*[@type="submit"]').waitForClickable({
            timeoutMsg: 'Login button was not clicable'
        })
        await browser.$('//*[@type="submit"]').click()

        await browser.$('//summary//*[contains(@class, "avatar")]').waitForDisplayed({
            timeoutMsg: 'Avatar was not displayed'
        })
        await browser.$('//summary//*[contains(@class, "avatar")]').click()

        expect(await browser.$('//*[@class="css-truncate-target"]').getText()).toEqual(LOGIN)
    })

    it('user should not be log in with incorrect login', async () => {
        await browser.$('//*[@id="login_field"]').waitForDisplayed({
            timeoutMsg: 'Login field was not displayed'
        })
        await browser.$('//*[@id="login_field"]').setValue('lubawa12')
        await browser.$('//*[@id="password"]').setValue(PASSWORD)
        await browser.$('//*[@type="submit"]').waitForClickable({
            timeoutMsg: 'Login button was not clicable'
        })
        await browser.$('//*[@type="submit"]').click()

        await browser.$('//*[@id="js-flash-container"]').waitForDisplayed({
            timeoutMsg: 'Login field was correct'
        })
        expect(await browser.$('//*[@id="js-flash-container"]').isDisplayed()).toEqual(true)
    })

    it('user should not be log in with incorrect password', async () => {
        await browser.$('//*[@id="login_field"]').waitForDisplayed({
            timeoutMsg: 'Login field was not displayed'
        })
        await browser.$('//*[@id="login_field"]').setValue(LOGIN)
        await browser.$('//*[@id="password"]').setValue('12345Q')
        await browser.$('//*[@type="submit"]').waitForClickable({
            timeoutMsg: 'Login button was not clicable'
        })
        await browser.$('//*[@type="submit"]').click()

        await browser.$('//*[@id="js-flash-container"]').waitForDisplayed({
            timeoutMsg: 'Password field was correct'
        })
        expect(await browser.$('//*[@id="js-flash-container"]').isDisplayed()).toEqual(true)
    })

    it('user should be log in with email', async () => {
        await browser.$('//*[@id="login_field"]').waitForDisplayed({
            timeoutMsg: 'Login field was not displayed'
        })
        await browser.$('//*[@id="login_field"]').setValue(EMAIL)
        await browser.$('//*[@id="password"]').setValue(PASSWORD)
        await browser.$('//*[@type="submit"]').waitForClickable({
            timeoutMsg: 'Login button was not clicable'
        })
        await browser.$('//*[@type="submit"]').click()

        await browser.$('//summary//*[contains(@class, "avatar")]').waitForDisplayed({
            timeoutMsg: 'Avatar was not displayed'
        })
        await browser.$('//summary//*[contains(@class, "avatar")]').click()

        expect(await browser.$('//*[@class="css-truncate-target"]').getText()).toEqual(LOGIN)
    })
    
    afterEach(async () => {
        await browser.reloadSession()
    })
})
