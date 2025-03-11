import {test} from '@playwright/test';

const username = "Tuan Hoang";
const email = "tuanhoang@gmail.com";
const birthdate = "1997-05-13";
const bio = "my test";
const country = "Canada";


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
        await page.locator("//option[@value='sports']").click();
        await page.selectOption("//select[@id='country']",country);
        await page.locator("//input[@id='dob']").fill(birthdate);
        await page.locator("//textarea[@id='bio']").fill(bio);
        await page.locator("//span[@class='slider round']").click();
    })

    await test.step("Click Register button", async() =>{
        await page.locator("//button[@type='submit']").click();
    })
    
})