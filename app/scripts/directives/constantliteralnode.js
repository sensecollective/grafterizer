'use strict';

/**
 * @ngdoc directive
 * @name grafterizerApp.directive:constantLiteralNode
 * @description
 * # constantLiteralNode
 */
angular.module('grafterizerApp')
    .directive('constantLiteralNode', function ($mdDialog, transformationDataModel, RecursionHelper) {
    return {
        templateUrl: 'views/constantliteralnode.html',
        restrict: 'E',
        compile: function(element) {
            return RecursionHelper.compile(element, function(scope, iElement, iAttrs, controller, transcludeFn){

                scope.editNode = function () {
                    scope.originalNode = {};
                    angular.copy(scope.node, scope.originalNode);
                    var newScope = scope.$new(false, scope);
                    newScope.newNode = scope.node;
                    newScope.isCreate = false;
                    $mdDialog.show({
                        templateUrl: 'views/mappingNodeDefinitionDialog.html',
                        controller: 'MappingnodedefinitiondialogCtrl',
                        scope: newScope
                    }).then(function(graphNode) {
                        angular.copy(graphNode, scope.node);
                    }, function() {
                        angular.copy(scope.originalNode, scope.node);
                        newScope.$destroy();
                    });
                }
                scope.clickAddPropertyAfter = function (property) {
                    scope.originalProperties = [];
                    angular.copy(scope.node.subElements, scope.originalProperties);
                    if(!property){
                        scope.isCreateNew = true;
                    } else {
                        scope.isCreateNew = false;
                    }
                    $mdDialog.show({
                        templateUrl: 'views/propertydialog.html',
                        controller: 'PropertydialogCtrl',
                        scope: scope.$new(false, scope)
                    }).then( function(propertyNode) {
                        if(propertyNode){
                            scope.node.addNodeAfter(property, propertyNode);
                        }
                    }, function () {
                        angular.copy(scope.originalProperties, scope.node.subElements);
                    });
                };
            })
        }
    };
});
