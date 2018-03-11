supportApp.controller('SupportController', ['supportService', function(supportService) {
    var support = this;

    //establish identity with server
    supportService.getUID();

    support.showNotification = false;
    support.isAdmin = false;
    support.notification = '';
    support.message = '';
    support.messages = [
      {text:'Welcome to our support service. How may I assist you?', author: 'agent', status:'received'},
    ];

    document.getElementById('message-textarea').focus();
    
    support.sendMessage = function(){
      var message = support.message;
      if(message==='') return;

      support.message = '';
      support.messages.push({text: message, author: 'me', status: 'sending'});
      support.scrollToBottom();
      supportService.sendMessage(message).then(function(res){
        support.messages[support.messages.length-1].status = 'sent'; // update sent state
        support.messages.push({text: res.message, author: 'agent', status: 'received'}) // add new message
        
        document.getElementById('message-textarea').focus(); //regain focus to continue convo
        support.scrollToBottom();
      }, function(err){
        support.messages[support.messages.length-1].status = 'failed';
        console.error(err);
      });
    }

    support.keyPress = function(event){
      if(event.keyCode===13 && !event.shiftKey){// enter key without shift
        support.sendMessage();
        setTimeout(function (){document.getElementById('message-textarea').value='';}, 200);// remove empty new lines
      }
    }

    support.scrollToBottom = function(){
      setTimeout(function (){
        var convoConatiner = document.getElementById('convo-container');
        convoConatiner.scrollTop = convoConatiner.scrollHeight;
      }, 200);
    }

    support.convoTallerThanView = function(){
      var convoConatiner = document.getElementById('convo-container');
      return convoConatiner.scrollHeight > convoConatiner.clientHeight;
    }

    support.makeAdmin = function(){
      supportService.makeAdmin();
    }

    support.getAdminProfile = function(){
      support.showNotification = true;
      supportService.getAdminProfile().then(function(notification){
        support.notification = 'access '+notification;
        if(notification.indexOf('flag')>-1) support.isAdmin = true;
      });
    }

    support.closeNotification = function(){
      support.showNotification = false;
      console.log(support.showNotification);
    }

  }]);