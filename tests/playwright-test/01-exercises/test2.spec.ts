import {expect,test} from '@playwright/test';
import {ProductPage} from '../../../page/product-page';


test ("Exercies 2: Product page", async ({page}) =>{ 

     const productPage = new ProductPage(page);
     const arrayProducts = [
          {
               name: "Product 1",
               price: 10,
               quatity: 2,
          },
          {
               name: "Product 2",
               price: 20,
               quatity: 3,
          },
          {
               name: "Product 3",
               price: 30,
               quatity: 1,
          }
     ]


     await test.step("Go to Product Page", async () =>{
          await productPage.goToProductPage();
     })

     await test.step("Add product to cart", async () =>{
          for (let i = 0; i < arrayProducts.length; i++){
               await productPage.addProductToCart(arrayProducts[i].name, arrayProducts[i].quatity);
          }
     })

     await test.step("Verify quantity of product in cart", async () =>{
          for (let i = 0; i < arrayProducts.length; i++){
               const actualQuantityProduct = (await productPage.getInfoProductInCart(arrayProducts[i].name)).quantity;
               const expectQuantityProduct = arrayProducts[i].quatity.toString();
               console.log("actualQuantityProduct: ", actualQuantityProduct);
               console.log("expectQuantityProduct: ", expectQuantityProduct);
               expect(actualQuantityProduct).toEqual(expectQuantityProduct);
          }
     })

     await test.step("Verify total price of product in cart", async () =>{
          const a = arrayProducts.length;
          console.log(`number of array: ${a}`);
          
          // for (let i = 0; i < arrayProducts.length; i++){

     
     })

})

