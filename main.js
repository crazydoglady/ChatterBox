
$(document).ready(function() {
  chats.init();
  // if (localStorage.getItem('userId') == "" || localStorage.getItem('userId') == "null") {
  //   $('.userId').hide();
  // } else {
  //   $('.userId').show();
  // };
  setInterval(chats.renderChat, 1000);

});//end doc ready




var chats = {
  init: function() {
    chats.initStyling();
    chats.initEvents();
  },
  initStyling: function() {

    // if (localStorage.getItem('userId') !== "") {
    //   $('.chatbox').hide();
    //   $('.userId').show();
    // } else {
    //   $('.chatbox').show();
    //   $('.userId').hide();
    // };
    chats.renderChat();
  },
  initEvents: function() {
    $('.userId').on('submit', function(event){
      event.preventDefault();
      var userName = $('#userInput').val();
      localStorage.setItem( 'userId', userName);
      $('.chatbox').show();
      $('.userId').hide();
      // console.log(userName);
      // $('.userId').removeClass('show');

    });


    //on click of send msg button trigger these events
    $('#create').on('submit', function(event){
      event.preventDefault();
      var newMessage = {
        userId: localStorage.getItem( 'userId' ),
        message: $(this).find('input[name="message"]').val(),
      };//end of newMessage variable


      chats.createMessage(newMessage);

    });//end submit event for .sendMessage button

    $('#logout').on('click', function (event) {
      event.preventDefault();
      chats.logOutUser();//enables log out
    });


    //   $('section').on('click', '.deleteMessage', function (event) {
    //   event.preventDefault();
    //   var taskid = $(this).closest('article').data('_id');
    //   console.log(taskid);
    //   tasks.deleteTask(taskid);
    // });
//   $('section').on('click', '.deleteMessage', function (event) {
//   event.preventDefault();
//   var taskid = $(this).closest('article').data('_id');
//   console.log(taskid);
//   tasks.deleteTask(taskid);
// });


    // $('#logout').on('click', function(event){
    //   event.preventDefault();
    //   chats.clearChat();
    //   localStorage.removeItem('userId');
    //
    // });
  },
  config: {
    url:'http://tiy-fee-rest.herokuapp.com/collections/chatInTheBox1',
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
        // console.log(chats)
        var template= _.template($('#chatTmpl').html());
        var markup = "";
        chats.forEach(function(item, idx, arr){
          markup +=template(item);
        });//end forEach
        // console.log('markup is....', markup);
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
      userName: "userId",
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

},


logOutUser: function () {
  delete localStorage.userId;
  console.log('SUCCESS: deleted localStorage.userId');
  location.reload();

  $.ajax({
      url: tasks.config.url,
      type: 'DELETE', //D is for Delete in CRUD
      // success: function (data) {
      //   console.log(data);
      //   chats.renderChat();
      // },
      // error: function(err) {
      //   console.log(err); //You DONE BAD!
      // }
    }); //end ajax for delete
  $('.chatbox').hide();
  },


};//end chats methods
