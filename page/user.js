const {By, Key, until, Actions} = require('selenium-webdriver');

module.exports = driver => {
    return {
        clickMenu: async function (menuName) {
            await driver.wait(until.elementLocated(By.linkText(menuName)), 10000);
            linkText = await driver.findElement(By.linkText(menuName))
            await driver.wait(until.elementIsVisible(linkText), 10000);
            await linkText.click();
        },
        clickSubMenu: async function  (subMenuName) {
            await driver.wait(until.elementLocated(By.linkText(subMenuName)), 10000);
            linkText = await driver.findElement(By.linkText(subMenuName))
            await driver.wait(until.elementIsVisible(linkText), 10000);
            await linkText.click();
        }
    }
}