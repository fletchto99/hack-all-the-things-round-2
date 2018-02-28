supportApp.service('supportService', function supportService($http){

	var SupportService = {
    	sendMessage: function(msg){
        return $http({
          url: "/api/send",
          method: "POST",
          data: {message: msg},
          headers: {'Content-Type': 'application/json;charset=UTF-8'}
        }).then(function(result){
          return result.data;
        });
      },
      getUID: function(){
        const uid = SupportService.getCookie('uid') || '';
        return $http({
          url: '/api/get-uid',
          method: 'GET'
        }).then(function(result){
          document.cookie = 'uid='+result.data.uid;
          return result.data.uid;
        });
      },
      makeAdmin: function(){
        const uid = SupportService.getCookie('uid') || '';
        return $http({
          url: '/api/make-admin',
          method: "GET",
          params: {uid: uid},
        }).then(function(result){
          return result.data;
        });
      },
      getAdminProfile: function(){
        return $http({
          url: '/api/admin-profile',
          method: 'GET'
        }).then(function(result){
          return result.data.access;
        });
      },
      getCookie: function(name) {
        match = document.cookie.match(new RegExp(name + '=([^;]+)'));
        if (match) return match[1];
      }
    }

    return SupportService;
});