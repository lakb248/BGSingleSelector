define(['angular', 'angularMock', 'jquery', 'bgSingleSelector'], function (angular, mock, $) {
    describe('directive:bgSelector', function () {
        var compile, rootScope, selector, selectedValue;
        beforeEach(function () {
            module('bg.selector');
            inject(function (_$compile_, _$rootScope_) {
                compile = _$compile_;
                rootScope = _$rootScope_.$new();
            });

            var element = '<bg-selector ng-model="model.value" on-select="onItemSelected">'
                            + '<bg-option ng-repeat="item in data" value="item.value" label="item.name">'
                                + '<div>{{item.name}}</div>'
                            + '</bg-option>'
                        +'</bg-selector>';
            rootScope.model = {
                name: 'one',
                value: 1
            };
            rootScope.data = [{
                name: 'one',
                value: 1
            }, {
                name: 'two',
                value: 2
            }, {
                name: 'three',
                value: 3
            }];
            rootScope.onItemSelected = function (value, label) {
                selectedValue = value;
            };
            selector = compile(element)(rootScope);
            rootScope.$digest();
        });

        it('should have three choice item', function () {
            var choiceLength = selector.find('.bg-selector-choice').length;
            expect(choiceLength).toEqual(3);
        });

        it('should change the model on click of choice', function () {
            selector.find('.bg-selector-choice').eq(2).triggerHandler('click');
            rootScope.$digest();
            expect(rootScope.model.value).toEqual(3);
        });

        it('should have four choice item when push an object into data', function () {
            rootScope.data.push({
                name: 'four',
                value: 4
            });
            rootScope.$digest();
            var choiceLength = selector.find('.bg-selector-choice').length;
            expect(choiceLength).toEqual(4);
        });

        it('should show the choice list on click of the selector bar', function () {
            selector.find('.bg-selector-bar').triggerHandler('click');
            expect(selector.find('.bg-choice-list').css('display')).not.toEqual('none');
        });

        it('should hide the choice list on click of document', function () {
            selector.find('.bg-selector-bar').triggerHandler('click');
            $(document).triggerHandler('click');
            expect(selector.find('.bg-choice-list').css('display')).not.toEqual('none');
        });

        it('should clear the model when data change', function () {
            rootScope.data[1].value = 4;
            rootScope.$digest();
            expect(rootScope.model.value).toBe(null);
            rootScope.data[1].name = 'four';
            rootScope.$digest();
            expect(rootScope.model.value).toBe(null);
        });

        it('should call the callback function on selector value changed', function () {

            selector.find('.bg-selector-bar').triggerHandler('click');
            selector.find('.bg-selector-choice').eq(2).triggerHandler('click');
            expect(selectedValue).toEqual(3);
        });

    });

});
