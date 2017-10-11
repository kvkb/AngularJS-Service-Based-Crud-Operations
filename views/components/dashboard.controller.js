var app =  angular.module("DashboardPage",[]);

app.controller("DashboardController",function($scope,ProductService,$uibModal, $log, $document,LoginService) {

    $scope.UserName = LoginService.GetLoginData();

    $scope.products = ProductService.list;

    var $ctrl = this;

    $ctrl.getProduct = {
        name:"Sample Name",
        price:"12,345",
        quality:0,
        id:0
    };

    $ctrl.types = ["Add","Edit"];


    console.log($scope.products);

    $ctrl.animationsEnabled = true;

    $ctrl.AddProduct = function (size, parentSelector) {
        var parentElem = parentSelector ?
        angular.element($document[0].querySelector('.page-wrapper ' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
            animation: $ctrl.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'AddProductModal.html',
            controller: 'AddProductModalCtrl',
            controllerAs: '$ctrl',
            size: size,
            appendTo: parentElem,
            resolve: {
                type:function() {
                    return $ctrl.types[0]
                },
                name:function() {
                    return $ctrl.name
                },
                price:function() {
                    return $ctrl.price
                },
                quality:function() {
                    return $ctrl.quality
                },
                newProduct:function() {
                    return $ctrl.newProduct
                }
            },
        });

    };


    $scope.EditProduct = function(obj,ind){
        $ctrl.getProduct.name = obj.name;
        $ctrl.getProduct.price = obj.price;
        $ctrl.getProduct.quality = obj.quality;
        $ctrl.getProduct.id = ind;

        console.log(ind);
        $ctrl.EditProduct('sm');
    };

    $ctrl.EditProduct = function (size, parentSelector) {
        var parentElem = parentSelector ?
        angular.element($document[0].querySelector('.page-wrapper ' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
            animation: $ctrl.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'AddProductModal.html',
            controller: 'EditProductModalCtrl',
            controllerAs: '$ctrl',
            size: size,
            appendTo: parentElem,
            resolve: {
                type:function() {
                    return $ctrl.types[1]
                },
                name:function() {
                    return $ctrl.getProduct.name
                },
                price:function() {
                    return $ctrl.getProduct.price
                },
                quality:function() {
                    return $ctrl.getProduct.quality
                },
                id:function() {
                    return $ctrl.getProduct.id
                }
            },
        });

    };

    $scope.RemoveProduct = function(ind){
        ProductService.RemoveProduct(ind);
    };



});

app.controller('AddProductModalCtrl', function ($uibModalInstance,type,name,price,quality,newProduct,$scope,ProductService) {
    var $ctrl = this;
    $ctrl.type = type;
    $ctrl.name = name;
    $ctrl.price = price;
    $ctrl.quality = quality;

    $ctrl.ok = function () {

        $ctrl.newProduct = {
            name:$ctrl.name,
            price:$ctrl.price,
            quality:$ctrl.quality
        };
        console.log("new product:"+$ctrl.newProduct);
        ProductService.AddProduct($ctrl.newProduct);
        $uibModalInstance.close($ctrl.newProduct);

    };

    $ctrl.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

app.controller('EditProductModalCtrl', function ($uibModalInstance,type,id,name,price,quality,$scope,ProductService) {
    var $ctrl = this;
    $ctrl.type = type;
    $ctrl.name = name;
    $ctrl.price = price;
    $ctrl.quality = quality;
    $ctrl.id = id;

    $ctrl.ok = function () {

        console.log($ctrl.newProduct);
        ProductService.EditProduct($ctrl.name,$ctrl.price,$ctrl.quality,$ctrl.id);
        $uibModalInstance.close();

    };

    $ctrl.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
