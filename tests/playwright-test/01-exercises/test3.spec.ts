import {test} from '@playwright/test';

test ("Exercies 3: Product page", async ({page}) =>{ 
    await test.step("Navigate to Material Playwright Page", async () =>{
        await page.goto("https://material.playwrightvn.com/");
    })

    await test.step("Click on Todo Page", async()=>{
        await page.locator("//a[@href='03-xpath-todo-list.html']").click();
    })

    await test.step("Them moi 100 todo item có noi dung 'Todo<i>'", async()=>{
        for (let i = 1 ; i<= 100; i++){
            await page.locator("//input[@id='new-task']").fill(`Todo${i}`);
            await page.locator("//button[@id='add-task']").click();
        }
    })
    // await page.waitForTimeout(10000); 
    
    await test.step("Xoa cac todo co so le", async()=>{
        page.on("dialog", async dialog => {
            await dialog.accept();
        });
        for (let i = 1 ; i<= 100; i++){
            if (i % 2 !== 0){
                await page.locator(`//button[@id='todo${i}-delete']`).click();
            }
        }
    })
    // await page.waitForTimeout(10000);
})