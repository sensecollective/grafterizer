'use strict';

/**
 * @ngdoc directive
 * @name grafterizerApp.directive:mapc
 * @description
 * # mapc
 */
angular.module('grafterizerApp')
    .directive('mapcFunction', function (transformationDataModel) {
    return {
        templateUrl: 'views/mapcfunction.html',
        restrict: 'E',
        link: function postLink(scope, element, attrs) {
            if(!scope.function){
                var keyfuncpair = new transformationDataModel.KeyFunctionPair("colName", scope.$parent.transformation.customFunctionDeclarations[0]);
                scope.function = new transformationDataModel.MapcFunction([keyfuncpair]);
            }

            scope.$parent.generateCurrFunction = function(){
                var keyFunctionPairs = [];
                return new transformationDataModel.MapcFunction(scope.function.keyFunctionPairs);
            };  
            scope.addKeyFunctionPair = function () {
                var newKeyFunctionPair = new transformationDataModel.KeyFunctionPair("", scope.$parent.transformation.customFunctionDeclarations[0].name);
                this.function.keyFunctionPairs.push(newKeyFunctionPair);
            };
            scope.removeKeyFunctionPair = function (kfPair) {
                console.log(kfPair);
                scope.function.removeKeyFunctionPair(kfPair);
            };
        }
    };
});
