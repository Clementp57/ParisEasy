angular.module('parisEasy.services', [])

.factory('ParisApi', ['$q', '$http', function ($q, $http) {
    var token = "f624edf37a3ba2b5c1db2b231f273942a732be06b983b955d8c94147750e4451";
    var baseUrl = "http://api.paris.fr/api/data/1.0/";

    return {
        getCategories: function () {
            var deferred = $q.defer();
            var start = new Date().getTime(); //performance analyse

            var result = $http.get(baseUrl + "Equipements/get_categories/?token=" + token).then(
                function (response) {
                    deferred.resolve(result);
                    console.log('time taken for request: ' + (new Date().getTime() - start) + 'ms'); //debug
                    return response.data;
                },
                function () {
                    //$rootScope.notify('La connexion avec le serveur à échouée. Essayez de recharger la page.','error')
                });

            return deferred.promise;
        },
        getEquipements: function (catId, offset, limit) {
            var deferred = $q.defer();
            var start = new Date().getTime(); //performance analyse
            
            var url = baserUrl+"Equipements/get_equipements/?token="+token;
            url+= "&cid="+catId;
            url+= "&offset="offset;
            url+= "&limit="limit;

            var result = $http.get(url).then(
                function (response) {
                    deferred.resolve(result);
                    console.log('time taken for request: ' + (new Date().getTime() - start) + 'ms'); //debug
                    return response.data;
                },
                function () {
                    //$rootScope.notify('La connexion avec le serveur à échouée. Essayez de recharger la page.','error')
                }); 

            return deferred.promise;

        },
        get: function (chatId) {
            //            for (var i = 0; i < chats.length; i++) {
            //                if (chats[i].id === parseInt(chatId)) {
            //                    return chats[i];
            //                }
            //            }
            //            return null;
        }
    };
}])

.factory('Chats', function () {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var chats = [{
        id: 0,
        name: 'Ben Sparrow',
        lastText: 'You on your way?',
        face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
        id: 1,
        name: 'Max Lynx',
        lastText: 'Hey, it\'s me',
        face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
        id: 2,
        name: 'Andrew Jostlin',
        lastText: 'Did you get the ice cream?',
        face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
        id: 3,
        name: 'Adam Bradleyson',
        lastText: 'I should buy a boat',
        face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
        id: 4,
        name: 'Perry Governor',
        lastText: 'Look at my mukluks!',
        face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];

    return {
        all: function () {
            return chats;
        },
        remove: function (chat) {
            chats.splice(chats.indexOf(chat), 1);
        },
        get: function (chatId) {
            for (var i = 0; i < chats.length; i++) {
                if (chats[i].id === parseInt(chatId)) {
                    return chats[i];
                }
            }
            return null;
        }
    };
});