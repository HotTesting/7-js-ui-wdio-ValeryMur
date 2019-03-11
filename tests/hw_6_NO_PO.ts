import { expect } from "chai";
//import * as faker from "faker";

// Each implemented test gives you 20 points
describe.skip("Cart", function() {
    beforeEach(function() {
        browser.setTimeout({
            implicit: 2000
          });
      });
    it("adding one item to cart should be successful", function() {
        browser.url("/rubber-ducks-c-1/blue-duck-p-4"); //open page with duck
        $(".btn.btn-success").click();  //click add to cart
        browser.pause(1500);
        $("#cart").click(); //click on cart
        browser.pause(1500);
        expect(browser.getUrl()).to.contain("/checkout");
        let countOfGoods: number = $$("tr.item").length
        console.log(" AMOUNT OF GOODS: " + countOfGoods);
        expect(countOfGoods).to.equal(1);
    });
  
    it("removing one item from cart should be successful", function() {
        browser.url("/rubber-ducks-c-1/blue-duck-p-4"); //open page with duck
        $(".btn.btn-success").click();  //click add to cart
        browser.pause(1500);
        $("#cart").click(); //click on cart
        browser.pause(1500);
        expect(browser.getUrl()).to.contain("/checkout");
        let countOfGood: number = $$("tr.item").length
        console.log(" AMOUNT OF GOODS: " + countOfGood);
        expect(countOfGood).to.equal(1);
        $("button[name='remove_cart_item']").click();  //remove duck
        browser.pause(1500);
        let textNoItem: string = $("#box-checkout em").getText();
        expect(textNoItem).to.contain("There are no items in your cart.");
    });
  
    // from 1 to 2 for example
    it("increasing item quantity in cart should be successful", function() {
        browser.url("/rubber-ducks-c-1/blue-duck-p-4"); //open page with duck
        $(".btn.btn-success").click();  //click add to cart
        browser.pause(1500);
        let quantity = Number($("#cart span.quantity").getText());
        console.log(" Quantity OF GOODS: " + quantity);
        expect(quantity, "quantity of goods - 1").to.equal(1);
        browser.pause(1500);
        $("#cart").click(); //click on cart
        browser.pause(1500);
        expect(browser.getUrl()).to.contain("/checkout");
        let countOfGoods: number = $$("tr.item").length
        console.log(" AMOUNT OF GOODS: " + countOfGoods);
        expect(countOfGoods).to.equal(1);
        //add second duck
        browser.url("/rubber-ducks-c-1/red-duck-p-3"); //open page with duck
        $(".btn.btn-success").click();  //click add to cart
        browser.pause(1500);
        let quantity1 = Number($("#cart span.quantity").getText());
        console.log(" Quantity OF GOODS: " + quantity1);
        expect(quantity1, "quantity of goods -2").to.equal(2);
        browser.pause(1500);
        $("#cart").click(); //click on cart
        browser.pause(1500);
        expect(browser.getUrl()).to.contain("/checkout");
        let countOfGoods1: number = $$("tr.item").length
        console.log(" AMOUNT OF GOODS: " + countOfGoods1);
        expect(countOfGoods1).to.equal(2);
    });
  
    // from 2 to 1 for example
    it("decreasing item quantity in cart should be successful", function() {
        browser.url("/rubber-ducks-c-1/blue-duck-p-4"); //open page with duck
        $(".btn.btn-success").click();  //click add to cart
        browser.pause(1500);
        let quantity = Number($("#cart span.quantity").getText());
        console.log(" Quantity OF GOODS: " + quantity);
        expect(quantity, "quantity of goods - 1").to.equal(1);
        browser.pause(1500);
        $("#cart").click(); //click on cart
        browser.pause(1500);
        expect(browser.getUrl()).to.contain("/checkout");
        let countOfGoods: number = $$("tr.item").length
        console.log(" AMOUNT OF GOODS: " + countOfGoods);
        expect(countOfGoods).to.equal(1);
        //add second duck
        browser.url("/rubber-ducks-c-1/red-duck-p-3"); //open page with duck
        $(".btn.btn-success").click();  //click add to cart
        browser.pause(1500);
        let quantity1 = Number($("#cart span.quantity").getText());
        console.log(" Quantity OF GOODS: " + quantity1);
        expect(quantity1, "quantity of goods - 2").to.equal(2);
        browser.pause(1500);
        $("#cart").click(); //click on cart
        browser.pause(1500);
        expect(browser.getUrl()).to.contain("/checkout");
        let countOfGoods1: number = $$("tr.item").length
        console.log(" AMOUNT OF GOODS: " + countOfGoods1);
        expect(countOfGoods1, "two ducks").to.equal(2);
        //remove second duck
        $("button[name='remove_cart_item']").click();  //remove duck
        browser.pause(1500);
        let countOfGoods2: number = $$("tr.item").length
        console.log(" AMOUNT OF GOODS: " + countOfGoods2);
        expect(countOfGoods2, "one duck left").to.equal(1);
        browser.url("/"); //open main page 
        browser.pause(1500);
        let quantity2 = Number($("#cart span.quantity").getText());
        console.log(" Quantity OF GOODS: " + quantity2);
        expect(quantity2, "quantity of goods = 1").to.equal(1);

    });
    afterEach(function() {
        let cookies = browser.getCookies();
        console.log(cookies);
        browser.deleteCookies();
        cookies = browser.getCookies();
        console.log(cookies);
      });
  });
  
  // This test gives you 20 points
  describe.skip("Prices", function() {
    beforeEach(function() {
        browser.setTimeout({
            implicit: 2000
          });
      });

    it("can be switched to EUR", function() {
        browser.url("/");
        //check defalt currency
        let defaltCurrency: string = $(".currency span").getText();
        console.log("defalt currency " + defaltCurrency);
        expect(defaltCurrency).to.contain("USD");
        //change currency
        $(".change").click(); //open popup region settings
        let title = $("#box-regional-settings .title").getText();
        console.log(" Title of form" + title);
        expect(title).to.contain("Regional Settings");
        $('#box-regional-settings [name="currency_code"]').click();  //click on curency drop-down
        $('#box-regional-settings [name="currency_code"] [value="EUR"]').click();  //choose currency EUR
        $('#box-regional-settings .btn.btn-default').click();  //click on btn save
        let alertText = $('.alert.alert-success').getText();
        expect(alertText).to.contain('Changes saved successfully');
        expect($(".alert.alert-success").isDisplayed()).to.equal(
            true,
            "Expected Alert to be visible, but it doesnt"
          );
        let newCurrency: string =  $(".currency span").getText();
        console.log("new currency " + newCurrency);
        expect(newCurrency).to.contain("EUR");
    });

    afterEach(function() {
        let cookies = browser.getCookies();
        console.log(cookies);
        browser.deleteCookies();
        cookies = browser.getCookies();
        console.log(cookies);
      });
  });