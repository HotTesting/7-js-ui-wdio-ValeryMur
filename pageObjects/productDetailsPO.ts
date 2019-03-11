import { BasePO } from "./fragments/base";

export class ProductDetailsPO extends BasePO {
  addToCart(): any {
    $("button.btn-success").click();
    browser.pause(1000); 
  }
}

export const productDetails = new ProductDetailsPO();