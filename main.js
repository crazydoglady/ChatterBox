

$(document).ready(function() {
  chats.init();
  setInterval(chats.renderChat, 1000);

    // to delete bad data uncomment out this line and put in correct id from server
   //chatInTheBox1.deleteMessage('54d639b0ddad9b0300000011');

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
      $('.userId').removeClass('show');
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
    //set timeout to auto refresh page
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
deleteMessage: function(id) {
  $.ajax({
      url: tasks.config.url + '/' + id,
      type: 'DELETE', //D is for Delete in CRUD
      success: function (data) {
        tasks.renderTasks();
      },
      error: function(err) {
        console.log(err , "deleteMessage error"); //You DONE BAD!
      }
    }); //end ajax for delete
  },


};//end chats methods
