import { expect } from "chai";
import { productDetails, settingsPO, alert, header, checkout } from "../pageObjects";

// Each implemented test gives you 20 points
describe("Cart", function() {
    beforeEach(function() {
        browser.setTimeout({
            implicit: 3000
          });
        settingsPO.open();

      productDetails.open("/rubber-ducks-c-1/blue-duck-p-4");
      productDetails.addToCart();
      checkout.open();
      });

    it("adding one item to cart should be successful", function() {
      expect(checkout.amountOfGoogs(), "BUT should be 1 duck in cart").to.equal(1);
    });
  
    it("removing one item from cart should be successful", function() {
        expect(checkout.amountOfGoogs(), "BUT should be 1 duck in cart").to.equal(1);
        checkout.removeGoods();
        expect(checkout.getTextNoGoods()).to.contain("There are no items in your cart.");
    });
  
    // from 1 to 2 for example
    it("increasing item quantity in cart should be successful", function() {
        expect(checkout.amountOfGoogs(), "BUT should be 1 duck in cart").to.equal(1);
        productDetails.open("/rubber-ducks-c-1/red-duck-p-3");
        expect(browser.getUrl()).to.contains("/red-duck-p-3");
        expect(header.getCartQuantity(), "quantity of goods = 1").to.equal(1);
        //add second duck
        productDetails.addToCart();
        expect(header.getCartQuantity(), "quantity of goods = 2").to.equal(2);
        checkout.open();
        expect(browser.getUrl()).to.contain("/checkout");
        expect(checkout.amountOfGoogs(), "BUT should be 1 duck in cart").to.equal(2);
    });
  
    // from 2 to 1 for example
    it("decreasing item quantity in cart should be successful", function() {
        expect(checkout.amountOfGoogs(), "BUT should be 1 duck in cart").to.equal(1);
        productDetails.open("/rubber-ducks-c-1/red-duck-p-3");
        expect(browser.getUrl()).to.contains("/red-duck-p-3");
        expect(header.getCartQuantity(), "quantity of goods = 1").to.equal(1);
        //add second duck
        productDetails.addToCart();
        expect(header.getCartQuantity(), "quantity of goods = 2").to.equal(2);
        checkout.open();
        expect(browser.getUrl()).to.contain("/checkout");
        expect(checkout.amountOfGoogs(), "should be 2 duck in cart").to.equal(2);
        //remove one duck
        //browser.pause(1500);
        checkout.removeGoods();
        browser.pause(1500);
        expect(checkout.amountOfGoogs(), "should be 1 duck in cart").to.equal(1);
        productDetails.open("/rubber-ducks-c-1/red-duck-p-3");
        expect(header.getCartQuantity(), "quantity of goods = 1").to.equal(1);
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
  describe("Prices", function() {
    beforeEach(function() {
        browser.setTimeout({
            implicit: 3000
          });
        settingsPO.open();
      });

    it("can be switched to EUR", function() {
      expect(header.getPresentCurrency(), " default currency NOT ").to.contain("USD");
      settingsPO.selectCurrencyEUR();
      settingsPO.saveChanges();
      expect(alert.getText()).to.contain('Changes saved successfully');
      expect(header.getPresentCurrency(), " new currency NOT ").to.contain("EUR");
      
    });

    afterEach(function() {
        let cookies = browser.getCookies();
        console.log(cookies);
        browser.deleteCookies();
        cookies = browser.getCookies();
        console.log(cookies);
      });
  });
  