import {Page} from '@playwright/test';
import {MaterialBasePage} from './material-page';

export class RegisterPage extends MaterialBasePage{
    xpathUsername = "//input[@id='username']";
    xpathEmail ="//input[@id='email']";
    xpathGenderMale ="//input[@id='male']";
    xpathGenderFemale ="//input[@id='female']";
    getXpathOptionHobby (hobby: "reading" | "traveling" | "cooking" ){
        return `//input[@id='${hobby}']`;
    }
    xpathSelectInterest ="//select[@id='interest']";
    xpathSelectCountry ="//select[@id='country']";
    xpathDateOfBirth ="//input[@id='dob']";
    xpathProfilePicture ="//input[@id='profile']";
    xpathBio ="//textarea[@id='bio']";
    xpathNewsletter ="//input[@id='newsletter']";
    xpathBtnRegister ="//button[@type='submit']";

    constructor(page: Page){
        super(page);
    }

    async goToRegisterPage(){
        await this.openMeterialPage();
        await this.gotoPage("Register Page");
    }

    async fillUsername(username: string){
        await this.page.locator(this.xpathUsername).fill(username);
    }
}