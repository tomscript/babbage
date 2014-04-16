/**
 * @fileoverview End to end testing.
 * @author tomfitzgerald@google.com (Tom Fitzgerald)
 */

/** @const */
var settings = {
  ADDRESS: 'http://localhost:8080',
  TOTAL_PLUGIN_CNT: 11
};


describe('List plugins', function() {
  it('Should list more than x plugins', function() {
    browser.get(settings.ADDRESS);
    var availablePlugins = element.all(by.repeater('plugin in plugins'));
    expect(availablePlugins.count()).toEqual(settings.TOTAL_PLUGIN_CNT);
  });
});


describe('Simple conversion', function() {
  it('Should Base64 encode and decode given text', function() {
    browser.get(settings.ADDRESS);

    // Should have no selected plugins.
    var selectedPlugins = element.all(by.repeater('plugin in selectedPlugins'));
    expect(selectedPlugins.count()).toEqual(0);

    // Click on the first plugin and verify.
    var availablePlugins = element.all(by.repeater('plugin in plugins'));
    element.all(by.css('#available-plugins li')).get(1).click();
    expect(selectedPlugins.count()).toEqual(1);

    // Put in text to convert and veriy.
    var inputEl = element(by.model('inputTextArea'));
    inputEl.sendKeys('tomiscool');
    inputEl.getAttribute('value').then(function(data){
      expect(data).toBe('tomiscool');
    });

    // Submit make make sure it converted properly.
    element(by.css('#submit-button')).click();
    element(by.model('outputTextArea')).getAttribute('value').then(
        function(data){
      expect(data).toBe('dG9taXNjb29s');
    });
  });
});

