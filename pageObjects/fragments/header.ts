//import { BaseFragment } from "./baseFragment";

export class Header  {
  getPresentCurrency(){
   let currentCurrency: string = $(".currency span").getText();
    console.log("defalt currency = " + currentCurrency);
    return currentCurrency;
  }
   
  getCartQuantity() {
    let quantity = Number($("#cart span.quantity").getText());
    console.log("Quantity OF GOODS = " + quantity);
    return quantity;
  }
}

export const header = new Header();