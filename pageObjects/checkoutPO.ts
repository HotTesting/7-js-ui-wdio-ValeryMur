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

    removeGood(indx): void {
        let deleteButtons = $$("button[name='remove_cart_item']")
        if (deleteButtons.length -1 < indx) {
            throw new Error('Provided index more than number of goods in cart')
        }

       let deleteIcon =  $$("button[name='remove_cart_item']")[indx];
       deleteIcon.waitForDisplayed(4000, undefined, `Cannot remove item number ${indx} because it is not visible`);
       deleteIcon.click();
    }

    getTextNoGoods() {
       // let textNoItem: string = $("#box-checkout em").getText();
        return $("#box-checkout em").getText();
    }

 }

 export const checkout = new Checkout();