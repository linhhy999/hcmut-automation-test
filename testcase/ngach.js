const {Builder, By, Key, until, Actions} = require('selenium-webdriver');

(async function example() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        const UserPage = require('../page/user')(driver)

        await driver.get('http://localhost:8000/user');
        await UserPage.clickMenu("Danh mục");
        await UserPage.clickSubMenu("Ngạch");
        
        // get last row before add
        await driver.wait(until.elementLocated(By.css('tr:last-child td')), 10000);
        lastRow = await driver.findElement(By.css('tr:last-child td'))
        await driver.wait(until.elementIsVisible(lastRow), 10000);
        arr = (await driver.findElements(By.css('tr:last-child td'))).slice(0,-1).map(x =>  x.getText());
        lastRowBeforeAdd = await Promise.all(arr)

        // click on add button
        await driver.wait(until.elementLocated(By.css('.btn-primary.btn-circle')), 10000);
        button = await driver.findElement(By.css('.btn-primary.btn-circle'))
        await driver.wait(until.elementIsVisible(button), 10000);
        await (await driver.findElement(By.css('.btn-primary.btn-circle'))).click();

        // fill all fields
        data = ["Mã ngạch", "Mã số chức danh nghề nghiệp", "Tên ngạch / chức danh nghề nghiệp", "Nhóm ngạch"]
        await driver.wait(until.elementLocated(By.id('inputMA_NGACH')), 10000);
        input = await driver.findElement(By.id('inputMA_NGACH'))
        await driver.wait(until.elementIsVisible(input), 10000);
        await (await driver.findElement(By.id('inputMA_NGACH'))).sendKeys(data[0]);
        await (await driver.findElement(By.id('inputMASO_CDNN'))).sendKeys(data[1]);
        await (await driver.findElement(By.id('inputTEN_NGACH_CDNN'))).sendKeys(data[2]);
        await (await driver.findElement(By.id('inputNHOM_NGACH'))).sendKeys(data[3]);

        // click luu
        await (await driver.findElement(By.css('.btn-primary[type=submit]'))).click();

        // check valid type after add
        await driver.wait(until.elementLocated(By.css('.alert')), 10000);
        alert = await driver.findElement(By.css('.alert'))
        await driver.wait(until.elementIsVisible(alert), 10000);

        // get last row after add
        arr = (await driver.findElements(By.css('tr:last-child td'))).slice(0,-1).map(x =>  x.getText());
        lastRowAfterAdd = await Promise.all(arr)

        // valid data after add
        if (JSON.stringify(lastRowBeforeAdd)==JSON.stringify(lastRowAfterAdd))
            console.error("Dữ liệu chưa được add!")
        if (parseInt(lastRowBeforeAdd[0])!=(parseInt(lastRowAfterAdd[0])-1))
            console.error("ID tự sinh cho dữ liệu chưa đúng!")
        if (JSON.stringify(data)!=JSON.stringify(lastRowAfterAdd.slice(1,lastRowAfterAdd.length)))
            console.error("Dữ liệu add vào chưa đúng!")

        // click update
        await driver.executeScript('document.querySelector("tr:last-child .btn-primary").scrollIntoView()')
        await (await driver.findElement(By.css('tr:last-child .btn-primary'))).click();

        // check all input of fields
        // x = lastRowAfterAdd[1] == await (await driver.findElement(By.id('inputMA_NGACH'))).getText();
        // y = lastRowAfterAdd[2] == await (await driver.findElement(By.id('inputMASO_CDNN'))).getText();
        // z = lastRowAfterAdd[3] == await (await driver.findElement(By.id('inputTEN_NGACH_CDNN'))).getText();
        // t = lastRowAfterAdd[4] == await (await driver.findElement(By.id('inputNHOM_NGACH'))).getText();
        // if (!(x&&y&&z&&t))
        //     console.error("input hiển thị tại form update khác với dữ liệu bảng")
        

        // click delete
        await driver.executeScript('document.querySelector("tr:last-child .btn-danger").scrollIntoView()')
        await (await driver.findElement(By.css('tr:last-child .btn-danger'))).click();

        // click OK
        await driver.wait(until.elementLocated(By.css('.swal-button--danger')), 10000);
        button = await driver.findElement(By.css('.swal-button--danger'))
        await driver.wait(until.elementIsVisible(button), 10000);
        await button.click();

        // check alert type after delete
        await driver.wait(until.elementLocated(By.css('.alert')), 10000);
        alert = await driver.findElement(By.css('.alert'))
        await driver.wait(until.elementIsVisible(alert), 10000);
        
        // get last row after delete
        arr = (await driver.findElements(By.css('tr:last-child td'))).slice(0,-1).map(x =>  x.getText());
        lastRowAfterDelete = await Promise.all(arr)

        // valid data after delete
        if (JSON.stringify(lastRowAfterDelete)==JSON.stringify(lastRowAfterAdd))
            console.error("Dữ liệu chưa được delete!")
        if (JSON.stringify(lastRowBeforeAdd)!=JSON.stringify(lastRowAfterDelete))
            console.error("Các dữ liệu delete chưa đúng!")
  	} 
	catch(err) {
		console.error(err.message)
	}
  	finally {
    	// await driver.quit();
  	}
})();