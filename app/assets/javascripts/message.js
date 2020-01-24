$(function(){

  var reloadMessages = function(){
    last_message_id = $('.main_chat__center__chats__chat:last').data("message-id");
    
    $.ajax({
      url: "api/messages",
      type: 'GET',
      data: {id: last_message_id},
      dataType: 'json'
    })
    .done(function(messages) {
      if(messages.length !== 0){
        var insertHTML = '';
        $.each(messages,function(i,message){
          insertHTML += buildHTML(message)
        });
        $('.main_chat__center__chats').append(insertHTML);
        $('.main_chat__center').animate({scrollTop: $('.main_chat__center')[0].scrollHeight});
        $('#new_message')[0].reset();
        $('.main_chat__bottom__form--submit').removeAttr('disabled');
      }
    })
    .fail(function() {
      alert('error');
    });
  }

  function buildHTML(message){
    if (message.image.url && message.content ){
      var html = `<div class="main_chat__center__chats__chat" data-message-id="${message.id}">
                    <div class="main_chat__center__chats__chat__status">
                      <p class="main_chat__center__chats__chat__status--name">${message.user_name}</p>
                      <p class="main_chat__center__chats__chat__status--date">${message.created_at}</p>
                    </div>
                    <p class="main_chat__center__chats__chat--text">${message.content}</p> 
                    <img class="main_chat__center__chats__chat--image" src="${message.image.url}">
                  </div>`
      return html;
    }else if (message.content){
      var html = `<div class="main_chat__center__chats__chat" data-message-id="${message.id}">
                    <div class="main_chat__center__chats__chat__status">
                      <p class="main_chat__center__chats__chat__status--name">${message.user_name}</p>
                      <p class="main_chat__center__chats__chat__status--date">${message.created_at}</p>
                    </div>
                    <p class="main_chat__center__chats__chat--text">${message.content}</p>
                  </div>`
      return html;
    }else if(message.image.url){
      var html = `<div class="main_chat__center__chats__chat" data-message-id="${message.id}">
                    <div class="main_chat__center__chats__chat__status">
                      <p class="main_chat__center__chats__chat__status--name">${message.user_name}</p>
                      <p class="main_chat__center__chats__chat__status--date">${message.created_at}</p>
                    </div>
                    <img class="main_chat__center__chats__chat--image" src="${message.image.url}">
                  </div>`
      return html;
    }
  }


  $('#new_message').on('submit',function(e){

    var formData = new FormData(this);
    var url = $(this).attr('action');


    e.preventDefault();
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main_chat__center__chats').append(html);
      $('.main_chat__center').animate({scrollTop: $('.main_chat__center')[0].scrollHeight});
      $('#new_message')[0].reset();
      $('.main_chat__bottom__form--submit').removeAttr('disabled');    
    })
    .fail(function(){
      alert('メッセージ送信に失敗しました');
    })


  })
  if (document.location.href.match(/\/groups\/\d+\/messages/)){
    setInterval(reloadMessages,7000);
  }
  
})