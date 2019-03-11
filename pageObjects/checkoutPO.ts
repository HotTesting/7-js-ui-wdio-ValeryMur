import { BasePO } from "./fragments/base";

export class Checkout extends BasePO {

    open(){
        super.open("/checkout");
    }

    amountOfGoogs(): number {
        let countOfGoods: number = $$("tr.item").length
        console.log(" AMOUNT OF GOODS: " + countOfGoods);
        return countOfGoods;
    }

    removeGoods(): void {
       let deleteIcon =  $("button[name='remove_cart_item']");
       deleteIcon.waitForDisplayed(4000);
       deleteIcon.click();
    }

    getTextNoGoods() {
       // let textNoItem: string = $("#box-checkout em").getText();
        return $("#box-checkout em").getText();
    }

 }

 export const checkout = new Checkout();