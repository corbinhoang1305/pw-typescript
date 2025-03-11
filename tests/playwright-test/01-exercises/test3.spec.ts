import {test} from '@playwright/test';

test ("Exercies 3: Product page", async ({page}) =>{ 
    await test.step("Navigate to Material Playwright Page", async () =>{
        await page.goto("https://material.playwrightvn.com/");
    })

    await test.step("Click on Todo Page", async()=>{
        await page.locator("//a[@href='03-xpath-todo-list.html']").click();
    })

    await test.step("Them moi 100 todo item có noi dung 'Todo<i>'", async()=>{
        
    })
})