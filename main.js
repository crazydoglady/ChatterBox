$(document).ready(function() {
  chats.init();
  setInterval(chats.renderChat, 1000);

});//end doc ready

var chats = {
  init: function() {
    chats.initStyling();
    chats.initEvents();
  },
  initStyling: function() {
    chats.renderChat();
  },

  initEvents: function() {
    $('.userId').on('submit', function(event){
      event.preventDefault();
      $('.chatbox').html();
      chats.createUser();
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
      chats.logoutUser();
    });//end of logout submit event

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
    console.log(login);
    if (login == null) {
      $('.chatbox').removeClass('show');
      $('.create').removeClass('show');
      $('.logout').removeClass('show');
    } else {
      $('#userDisplay').html(localStorage.userId);
      $('.chatbox').addClass('show');
      $('.create').addClass('show');
      $('.userId').removeClass('show');
      $('.logout').addClass('show');
      $('.usersList').addClass('show');
    }
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
  createUser: function() {
    var userName = $('#userInput').val();
    localStorage.setItem( 'userId', userName);
    console.log(userName);
    // $.ajax({
    //   url: chats.config.url,
    //   type: 'GET',
    //   success: function(chats) { //passes info through function and it is added into empty string
    //     var template= _.template($('#userLogin').html());
    //     var markup = "";
    //     $('.logout').html(markup);
    //   },
    //   error: function(err) {
    //     console.log(err, "render error");
    //   }
    // });//end ajax for render
},
  logoutUser: function() {
    localStorage.removeItem('userId');
    $('#userInput').val("");
    $('.userId').addClass('show');
    console.log('logout success');

    chats.renderChat();

}
// editName: function (id, name) {
//   $.ajax({
//     userName: userId,
//     data: message,
//     type: 'PUT',
//     success: function() {
//
//   },
//     error: function(err){
//
//     }
//   });
//
// }


};//end chats methods
