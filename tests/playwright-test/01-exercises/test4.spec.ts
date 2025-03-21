import {expect , test} from '@playwright/test';
import { PersonalNotesPage } from '../../../page/personal-notes-page';

test ("Exercies 4: Personal notes", async ({page}) =>{
    const notes =[
        {
            title: "Note 1",
            content: "This is note 1"
        },
        {
            title: "Note 2",
            content: "This is note 2"
        },
        {
            title: "Note 3",
            content: "This is note 3"
        },
        {
            title: "Note 4",
            content: "This is note 4"
        },
        {
            title: "Note 5",
            content: "This is note 5"
        },
        {
            title: "Note 6",
            content: "This is note 6"
        },
        {
            title: "Note 7",
            content: "This is note 7"
        },
        {
            title: "Note 8",
            content: "This is note 8"
        },
        {
            title: "Note 9",
            content: "This is note 9"
        },
        {
            title: "Note 10",
            content: "This is note 10"
        }
    ]
    await test.step("Navigate to Material Playwright Page", async () =>{
        await page.goto("https://material.playwrightvn.com/");
    })
    await test.step("Click on Personal notes", async()=>{
        await page.locator("//a[@href='04-xpath-personal-notes.html']").click();
    })
    await test.step("Them moi 10 note co noi dung la tieu de va 1 phan ngan (khoang 3 dong) tai bao https://vnexpress.net/khoa-hoc", async()=>{
        for (const note of notes){
            await page.locator("//input[@id='note-title']").fill(note.title);
            await page.locator("//textarea[@id='note-content']").fill(note.content);
            await page.locator("//button[@id='add-note']").click();
        }
    })
    await test.step("Thuc hien search theo tieu de bai bao bat ki", async()=>{
        await page.locator("//input[@id='search']").fill(notes[0].title);
    })
    await page.waitForTimeout(10000);
})


