$(document).ready(function() {
  chats.init();


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
      var input = $('#userInput').val();
      localStorage.setItem('userId', input);
      console.log(input);
      $('.userId').removeClass('show');
    });

    //on click of send msg button trigger these events
    $('#create').on('submit', function(event){
      event.preventDefault();
      var newMessage = {
        userId: "localStorage.getItem('userId')",
        message: $(this).find('input[name="message"]').val()
      };//end of newMessage variable
      chats.createMessage(newMessage);

    });//end submit event for .sendMessage button
  },
  config: {
    url:'http://tiy-fee-rest.herokuapp.com/collections/chatInTheBox',
  },
  render: function (data, tmpl, $el){ //declares what is passed into template
    var template= _.template(data, tmpl);
    $el.append(template);
  },
  renderChat: function(){
    $.ajax({
      url: chats.config.url,
      type: 'GET',
      success: function(chats) { //passes info through function and it is added into empty string
        console.log(chats)
        var template= _.template($('#chatTmpl').html());
        var markup = "";
        chats.forEach(function(item, idx, arr){
          markup +=template(item);
        });//end forEach
        console.log('markup is....', markup);
        $('article').html(markup);
      },
      error: function(err) {
        console.log(err);
      }
    });//end ajax for render
    //set timeout to auto refresh page
  },
  createMessage: function(message) {
    $.ajax({
      url: chats.config.url,
      data: message,
      type: 'POST', //request to add info to server and will appear when render function is run
    success: function(data) {
      console.log(data);
      chats.renderChat(); //reload chat if new data is received
    },
    error: function(err) {
      console.log(err); //oops
    }
  });//end createMessage ajax
  }


};//end chats methods
