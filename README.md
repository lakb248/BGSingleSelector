# BGSingleSelector

Simple single selector implements by AngularJS

## Usage
```html
<!--
value attribute is the value of the option and label attribute is the laleb to show when the option is selected, the value of the attribute will parse as the property of the item
-->
<bg-single-selector ng-model="data.value">
    <bg-option ng-repeat="item in options" value="value" label="label"></bg-option>
</bg-single-selector>
```
