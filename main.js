$(document).ready(function() {
  chats.init();
  setInterval(chats.renderChat, 1000);

});//end doc ready

var chats = {
  init: function() {
    chats.initStyling();
    chats.initEvents();
    setInterval();
  },
  initStyling: function() {
    chats.renderChat();
  },

  initEvents: function() {
    $('.userId').on('submit', function(event){
      event.preventDefault();
      var userName = $('#userInput').val();
    localStorage.setItem( 'userId', userName);
      console.log(userName);

    });//end submit userId

    //on click of send msg button trigger these events
    $('#create').on('submit', function(event){
      event.preventDefault();
      var newMessage = {
        userId: localStorage.getItem( 'userId' ),
        message: $(this).find('input[name="message"]').val(),
      };//end of newMessage variable

      chats.createMessage(newMessage);

    });//end submit event for .sendMessage button

    $('.logout').on('submit', function(event){
      event.preventDefault();
      console.log("logoutish1");
      localStorage.removeItem('userId')
      console.log("logoutish2");
      chats.renderChat();
    });//end of logout

  },
  config: {
    url:'http://tiy-fee-rest.herokuapp.com/collections/chatInTheBox1',
  },
  render: function (data, tmpl, $el){ //declares what is passed into template
    var template= _.template(data, tmpl);
    $el.append(template);
  },
  renderChat: function(){
    var login = localStorage.userId;
    if (login == null) {
      $('.chatbox').removeClass('show');
      $('.create').removeClass('show');
      $('.logout').removeClass('show');
    } else {
      $('.chatbox').addClass('show');
      $('.create').addClass('show');
      $('.userId').removeClass('show');

    }
    console.log( login);
    $.ajax({
      url: chats.config.url,
      type: 'GET',
      success: function(chats) { //passes info through function and it is added into empty string
        var template= _.template($('#chatTmpl').html());
        var markup = "";
        chats.forEach(function(item, idx, arr){
          markup +=template(item);
        });//end forEach
        $('article').html(markup);
      },
      error: function(err) {
        console.log(err, "render error");
      }
    });//end ajax for render
  },
  createMessage: function(message) {
    $.ajax({
      url: chats.config.url,
      userName: "userId",
      data: message,
      type: 'POST', //request to add info to server and will appear when render function is run
    success: function(data) {
      chats.renderChat(); //reload chat if new data is received
    },
    error: function(err) {
      console.log(err , "createMessage error" ); //oops
    }
  });//end createMessage ajax

},
editName: function (id, name) {
  $.ajax({
    userName: userId,
    data: message,
    type: 'PUT',
    success: function() {

  },
    error: function(err){

    }
  });

}


};//end chats methods
