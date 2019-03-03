import * as faker from "faker";
import { expect } from "chai";

// Each implemented test gives you 15 points (max total - 45)
describe("Items search", function() {
  beforeEach(function() {
    browser.url("http://ip-5236.sunline.net.ua:38015/");
    browser.pause(1500);
  });
  const searchField = '[name="query"]';
  it("should show results in case multiple items matches", function() {
    browser.pause(1500);
    $(searchField).setValue("duck");
    browser.pause(1500);
    $(searchField).addValue("Enter");
    browser.pause(1500);
    expect(browser.getUrl()).to.equal("http://ip-5236.sunline.net.ua:38015/search?query=duck");
    let elements = [$$("#box-search-results .products.row.half-gutter>div")];
   expect(elements.length, "more than one duck").to.have.lengthOf.above(1);
  });

  it("should redirect to item page in case only one result matches", function() {
    $(searchField).setValue("blue");
    $(searchField).addValue("Enter");
    browser.pause(1500);
    expect(browser.getUrl()).to.equal("http://ip-5236.sunline.net.ua:38015/rubber-ducks-c-1/blue-duck-p-4")
    let element = [$$("#box-product.box")];
    expect(element.length, "one duck").to.have.lengthOf(1);
  });

  it("should redirect to 'no matching results' in case no items matched", function() {
    $('[name="query"]').setValue("test");
    $('[name="query"]').addValue("Enter");
    browser.pause(1500);
    const text = $("#box-search-results em").getText();
    expect(text).to.contain("No matching results");
  });
  expect(browser.getUrl()).to.contains("/search?query=test");
});
afterEach(function() {
  browser.deleteAllCookies();
});



// Each implemented test gives you 20 points (max total - 40)
describe("Search results sorting", function() {
  beforeEach(function() {
    browser.url("http://ip-5236.sunline.net.ua:38015/");
  });
  const searchField = '[name="query"]';
  it("correctly arranges items when using 'by price' sorting", function() {
    $(searchField).setValue("duck");
    $(searchField).addValue("Enter");
    expect(browser.getUrl()).contain("search?query=duck");
    //sort
    $('a.btn.btn-default[href*="sort=price"').click;

    console.log($$("#box-search-results .products.row.half-gutter [data-price]").values);

    let ducks = $$("#box-search-results .products.row.half-gutter");
    //let price = ducks.map(duck=> parseInt(duck.getAttribute("data-price")));
     let duckPrice; 
    for (var i = 0; i<ducks.length; i++) {
      let rowPrice = parseInt(ducks[i].getAttribute("data-price"));
      duckPrice[i]=rowPrice;
    }
    function compareNumeric(a, b) {
      if (a > b) return 1;
      if (a < b) return -1;
      if (a == b) return 0;
    }
    let sortPrice = duckPrice.slice().sort(compareNumeric);
    expect(duckPrice).to.deep.equal(sortPrice);
    });

  it.skip("correctly arranges items when using 'by name' sorting", function() {
    $(searchField).setValue("duck");
    $(searchField).addValue("Enter");
    expect(browser.getUrl()).contain("search?query=duck");
    //sort
    $('a.btn.btn-default[href*="sort=name"').click;
    let names = $$("#box-search-results .products.row.half-gutter");
    let duckName = names.map(name => (name.getAttribute("data-name").toLowerCase));
    let sortName = duckName.slice().sort();
    expect(duckName).to.deep.equal(sortName);
  

  afterEach(function() {
    browser.deleteAllCookies();
  });
});

// BONUS LEVEL - this test gives you 15 points
describe("Contact us form", function() {
  it("must send messages to shop administration", function() {
    browser.url("/customer-service-s-0");
    const contForm = 'form[name="contact_form"]'
      const contactForm = {
      name: $(contForm).$('input.form-control[name="name"]'),
      email: $(contForm).$('input.form-control[name="email"]'),
      subject: $(contForm).$('input.form-control[name="subject"]'),
      message: $(contForm).$('.form-control[name="message"]'),
      sendButton: $(contForm).$('button.btn.btn-default[name="send"]')
  };
    contactForm.name.setValue("TestUser");
    const email = faker.internet.email(undefined, undefined, "test.com");
    console.log("Email will be used", email);
    contactForm.email.setValue(email);
    contactForm.subject.setValue("TestRequest");
    contactForm.message.setValue("TestMessage");
    contactForm.sendButton.click();
    
    /*const contactForm = 'form[name="contact_form"]';
    $(contactForm)
      .$('input.form-control[name="name"]')
      .setValue("TestUser");
    const email = faker.internet.email(undefined, undefined, "test.com");
    console.log("Email will be used", email);
    $(contactForm)
      .$('input.form-control[name="email"]')
      .setValue(email);
    $(contactForm)
      .$('input.form-control[name="subject"]')
      .setValue("TestRequest");
    $(contactForm)
      .$('.form-control[name="message"]')
      .setValue("TestMessage");
    $(contactForm)
      .$('button.btn.btn-default[name="send"]')
      .click();*/
    browser.pause(1500);
    expect($(".alert.alert-success").isDisplayed()).to.equal(
      true,
      "Expected Alert to be visible, but it doesnt"
    );
    const text = $(".alert.alert-success").getText();
    expect(text).to.contain("Your email has successfully been sent");
  });

  after(function() {
    let cookies = browser.getCookies();
    console.log(cookies);
    browser.deleteCookies();
    cookies = browser.getCookies();
    console.log(cookies);
  });
});
});