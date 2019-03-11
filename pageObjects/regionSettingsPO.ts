import {BasePO} from "./fragments/base";

export class SettingsPO extends BasePO{
selectCurrencyEUR(){
    let currencyDropDown = $('#box-regional-settings [name="currency_code"]');  
    currencyDropDown.waitForDisplayed(3000);
    currencyDropDown.click();  //click on curency drop-down
    let selectEUR = $('#box-regional-settings [name="currency_code"] [value="EUR"]');  
    selectEUR.waitForDisplayed(3000);
    selectEUR.click(); //choose currency EUR
    
};
saveChanges(){
    const saveBtn = $('#box-regional-settings .btn.btn-default');  
    saveBtn.waitForDisplayed(3000);
    saveBtn.click();
};

open() {
    super.open("/regional_settings");
  }
}
export const settingsPO = new SettingsPO();