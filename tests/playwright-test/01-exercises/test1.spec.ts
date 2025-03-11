import {test} from '@playwright/test';

const username = "Tuan Hoang";
const email = "tuanhoang@gmail.com";
const birthdate = "13/05/1997";
const bio = "my test"


test ("Exercies 1: Register Page", async ({page}) =>{
    await test.step("Navigate to Material Playwright Page", async () =>{
        await page.goto("https://material.playwrightvn.com/");
    })
    
    await test.step("Click on Register button", async() =>{
        await page.locator("//a[@href='01-xpath-register-page.html']").click();
    })

    await test.step("fill information", async() =>{
        await page.locator("//input[@id='username']").fill(username);
        await page.locator("//input[@id='email']").fill(email);
        await page.locator("//input[@id='male']").click();
        await page.locator("//input[@id='traveling']").click();
        
    })
    
})