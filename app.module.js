var app = angular.module("clarionShoppingCart",["ngRoute","Header","HomePage","ui.bootstrap","DashboardPage"]);

app.controller("IndexController",function($scope) {
    $scope.msg = "Angular is working !!!";
});

app.service("LoginService",function() {
    let user = {
        email:"",
        pass:""
    };
    return {
        SetLoginData:function(email,pass) {
            user.email = email;
            user.pass = pass;
            //console.log(user);
        },
        GetLoginData:function() {
            //console.log(user);
            if(user.email != ''){
                let username = user.email.split('@');
                return username[0];
            }
            //console.log(username);

        },
    }
});

app.service("ProductService",function() {
    return {
        list : [
            {
                name:"Product 1",
                price:"12,000",
                quality:3
            },
            {
                name:"Product 2",
                price:"12,000",
                quality:3
            },
            {
                name:"Product 3",
                price:"12,000",
                quality:3
            },
            {
                name:"Product 4",
                price:"12,000",
                quality:3
            }
        ],
        AddProduct:function(obj) {
            this.list.push(obj);
            console.log(this.list);
        },
        EditProduct:function(name,price,quality,id) {
            this.list[id].name = name;
            this.list[id].price = price;
            this.list[id].quality = quality;
            console.log(this.list);
        },
        RemoveProduct:function(itemIndex) {
            this.list.splice(itemIndex,1);
        },

    }


});

app.config(function($routeProvider) {
    $routeProvider
    .when('/',{
        templateUrl:"views/components/home.html",
        controller:"HomeController"
    })
    .when('/Dashboard',{
        templateUrl:"views/components/dashboard.html",
        controller:"DashboardController"
    })
});
