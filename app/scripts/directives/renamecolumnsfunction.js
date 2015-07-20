'use strict';

/**
 * @ngdoc directive
 * @name grafterizerApp.directive:renameColumnsFunction
 * @description
 * # renameColumnsFunction
 */
angular.module('grafterizerApp')
  .directive('renameColumnsFunction', function(transformationDataModel) {
    return {
      templateUrl: 'views/renameColumnsFunction.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        if (!scope.function) {
            var renfunc = scope.$parent.transformation.findPrefixerOrCustomFunctionByName(
scope.$parent.transformation.customFunctionDeclarations[0].name);
          scope.function = new transformationDataModel.RenameColumnsFunction([renfunc], [null,null]);
        }

        scope.$parent.generateCurrFunction = function() {
            var functArray = [];
           if (!scope.function.mappings[0]) {
        for (var i=0;i<scope.function.functionsToRenameWith.length;++i)
        {
            var newrenfunc = scope.function.functionsToRenameWith[i];
            functArray.push(scope.$parent.transformation.findPrefixerOrCustomFunctionByName(newrenfunc.toString()));
        }
           }
           return new transformationDataModel.RenameColumnsFunction(
            functArray, scope.function.mappings);
           
        };

        scope.addRenameFunction = function() {
            var renfunc = scope.$parent.transformation.findPrefixerOrCustomFunctionByName(
scope.$parent.transformation.customFunctionDeclarations[0].name);
        this.function.functionsToRenameWith.push(renfunc);
        }; 

        scope.removeRenameFunction = function(index) {
          scope.function.removeRenameFunction(index);
        };
        scope.addRenameMapping = function() {
            this.function.mappings.push(null);
            this.function.mappings.push(null);
        }; 
        scope.removeMappingPair = function(index) {
          this.function.mappings.splice(index,2);
        };
        scope.getMapLength = function(num) {
            var b = new Array();
            for (var i =0;i<=num/2;i+=2) b.push(i);
            return b;
        };
        scope.showUsage=false;
        scope.switchShowUsage=function() {
        scope.showUsage=!scope.showUsage;
        }
      }
    };
  });
