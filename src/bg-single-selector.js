/**
 * @file 单选下拉框组件
 * @author linbin02@baidu.com
 */

define(['angular'], function (angular) {
    var bgs = angular.module('bg.selector', []);

    bgs.directive('bgSelector', ['$document', '$parse', function ($document, $parse) {

        /**
         * whether the value exist in the options
         * @author linbin02@baidu.com
         * @param  {string}  value   the value
         * @param  {string}  options the options
         * @return {boolean} retult  the result
         */
        var isExist = function (value, options) {
            options = options || [];
            var length = options.length;
            for (var i = 0; i < length; i ++) {
                var temp = options[i];
                if (temp === value) {
                    return true;
                }
            }
            return false;
        };
        // Runs during compile
        return {
            scope: {},
            controller: [
                '$scope', '$element', '$attrs', '$transclude',
                function ($scope, $element, $attrs, $transclude) {
                    var ctrl = this;
                    ctrl.options = [];
                    ctrl.open = false;
                    // hide choice list
                    ctrl.hideChoiceList = function () {
                        ctrl.open = false;
                    };
                    // toggle the status of choice list
                    ctrl.toggleChoiceList = function () {
                        ctrl.open = !ctrl.open;
                    };
                    // set the label of selector
                    ctrl.setSelectorLabel = function (label) {
                        ctrl.label = label;
                    };
                    ctrl.addOption = function (value) {
                        ctrl.options.push(value);
                    };
                }],
            controllerAs: 'selector',
            require: ['bgSelector', 'ngModel'],
            restrict: 'E',
            template: function (iElm, iAttrs) {
                var modelName = iAttrs.ngModel;
                return '<div class="bg-selector-container">'
                        + '<div class="bg-selector-bar">'
                            + '<div class="bg-selector-content" ng-bind-template="{{selector.label}}"></div>'
                            + '<div class="bg-selector-icon" ng-class="{true: \'open\'}[selector.open]"></div>'
                        + '</div>'
                        + '<div class="bg-choice-list" ng-show="selector.open">'
                        + '</div>'
                    + '</div>';
            },
            replace: true,
            transclude: true,
            link: function ($scope, iElm, iAttrs, ctrls, transcludeFn) {
                var selector = ctrls[0];
                var ngModel = ctrls[1];
                var placeholder = iAttrs.placeholder || '请选择';
                var choiceList = angular.element(iElm[0].querySelector('.bg-choice-list'));
                var selectorBar = angular.element(iElm[0].querySelector('.bg-selector-bar'));
                selector.onSelectCallback = $parse(iAttrs.onSelect)($scope);
                selectorBar.bind('click', function (e) {
                    selector.toggleChoiceList();
                    $scope.$apply();
                    e.stopPropagation();
                });
                // bind click event to hide the choice list when document clicked
                $document.bind('click', function (e) {
                    if (selector.open) {
                        selector.hideChoiceList();
                    }
                    $scope.$apply();
                });
                // watch ngModel to set the label
                $scope.$parent.$watch(iAttrs.ngModel, function (value) {
                    // reset the selector
                    if (!isExist(value, selector.options)) {
                        selector.setSelectorLabel(placeholder);
                    } else {
                        $scope.$broadcast('bgs:change', value);
                    }
                });

                selector.setValue = function (value, label) {
                    ngModel.$setViewValue(value);
                    selector.setSelectorLabel(label);
                };
                selector.getValue = function () {
                    return ngModel.$modelValue;
                };

                transcludeFn(function (clone) {
                    choiceList.append(clone);
                });
                selector.setSelectorLabel(placeholder);
            }
        };
    }]);

    bgs.directive('bgOption', ['$parse', function ($parse) {
        // Runs during compile
        return {
            priority: -1,
            controller: [
                '$scope', '$element', '$attrs', '$transclude',
                function ($scope, $element, $attrs, $transclude) {
                    var ctrl = this;
                    ctrl.value = $parse($attrs.value)($scope);
                    ctrl.label = $parse($attrs.label)($scope);
                }],
            require: ['bgOption', '^bgSelector'],
            restrict: 'E',
            template: '<div class="bg-selector-choice" ng-transclude></div>',
            replace: true,
            transclude: true,
            link: function ($scope, iElm, iAttrs, ctrls) {
                var bgOption = ctrls[0];
                var bgSelector = ctrls[1];
                iElm.bind('click', function () {
                    var value = bgOption.value;
                    var label = bgOption.label;
                    if (!label) {
                        value = '请选择';
                    }
                    // set the value and label of the selector when option clicked
                    bgSelector.setValue(value, label);
                    bgSelector.hideChoiceList();
                    // trigger the callback
                    if (bgSelector.onSelectCallback) {
                        bgSelector.onSelectCallback(value, label);
                    }
                });
                if (bgOption.value === bgSelector.getValue()) {
                    bgSelector.setSelectorLabel(bgOption.label);
                }

                // listen to the change event to set the label of the selector
                $scope.$on('bgs:change', function (event, value) {
                    if (value === bgOption.value) {
                        bgSelector.setSelectorLabel(bgOption.label);
                    }
                });
                bgSelector.addOption(bgOption.value);
            }
        };
    }]);
});
