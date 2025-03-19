import {expect , test} from '@playwright/test';

import { TodoPage } from '../../../page/todo-page';


test ("Exercies 3: Product page", async ({page}) =>{ 
    const todoPage = new TodoPage(page);

    await test.step("Go to Todo Page", async () =>{
        await todoPage.goToTodoPage();
    })

    await test.step("Them moi 100 todo item có noi dung 'Todo<i>'", async()=>{
        for (let i = 1 ; i<= 100; i++){
            await todoPage.addNewTask(`Todo${i}`);
        }
    })
    // await page.waitForTimeout(10000); 
    
    await test.step("Xoa cac todo co so le", async()=>{
        page.on("dialog", async dialog => {
            await dialog.accept();
        });
        for (let i = 1 ; i<= 100; i++){
            if (i % 2 !== 0){
                await todoPage.deleteTask(`Todo${i}`);
            }
        }
    })
    
    await test.step("Verify todo 90 is in viewport? ", async()=>{
        const xpathtodo90 = todoPage.getLocatorTask("Todo90");
        await expect(xpathtodo90).toBeInViewPort();
    })
})