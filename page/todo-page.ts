import { Page  } from "@playwright/test";
import { MaterialBasePage } from "./material-page";

export class TodoPage extends MaterialBasePage {
    constructor (page : Page){
        super(page);
    }

    xpathInputNewTask = "//input[@id='new-task']";
    xpathBtnAddTask = "//button[@id='add-task']";
    // xpathBtnDeleteTask = "//button[@id='todo1-delete']";
    
    async goToTodoPage(){
        await this.openMeterialPage();
        await this.gotoPage("Todo page");
    }

    async addNewTask (content: string){
        await this.page.locator(this.xpathInputNewTask).fill(content);
        await this.page.locator(this.xpathBtnAddTask).click();
    }

    async deleteTask(content: string){
        const xpath = content.replace(" ","-").toLowerCase();
        await this.page.locator(`//button[@id='${xpath}-delete']`).click();
    }

    async getLocatorTask(content: string){
        return this.page.locator(`//span[contains(text(),'${content}')]`);
    }


}