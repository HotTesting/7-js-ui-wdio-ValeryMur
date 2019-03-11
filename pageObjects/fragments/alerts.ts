
export class Alerts {
    getText(){
        let alertText = $('.alert.alert-success').getText();
        return alertText;
    } 
    getSelector(){
        let alertSelector = $('.alert.alert-success');
        alertSelector.waitForDisplayed(3000);
        return alertSelector
    }
}
export const alert = new Alerts();