# BGSingleSelector

[ ![Travis CI Status](https://travis-ci.org/GaojingComponent/BGSingleSelector.svg?branch=master)](https://travis-ci.org/GaojingComponent/BGSingleSelector)    ![codecov.io](https://codecov.io/github/GaojingComponent/BGSingleSelector/branch.svg?branch=master)

Simple single selector implements by AngularJS

## Usage
```html
<!--
value attribute is the value of the option and label attribute is the laleb to show when the option is selected,
the value of the attribute will parse as the property of the item
-->
<bg-single-selector ng-model="data.value">
    <bg-option ng-repeat="item in options" value="value" label="name"></bg-option>
</bg-single-selector>
```
And in javascript
```javascript
$scope.options = [{
    value: 1,
    name: 'one'
}, {
    value: 2,
    name: 'two'
}, {
    value: 3,
    name: 'three'
}];
```
