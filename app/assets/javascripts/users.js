$(function(){

  function appendHTML(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    $('#user-search-result').append(html);
  }

  function  appendEmpty(){
    var html = `
               <div class="chat-group-user clearfix">
                <p class="chat-group-user__name">ユーザーが見つかりません</p>
               </div>`
    $('#user-search-result').append(html);
  }

  function  appendChatMember(id, name){
    var html = `
            <div class='chat-group-user'>
              <input name='group[user_ids][]' type='hidden' value='${id}'>  
              <p class='chat-group-user__name'>${name}</p>
              <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
            </div>
            `
    $('#chat-group-users').append(html)
  }

  $('#user-search-field').on('keyup',function(e){
    e.preventDefault();    
    var input = $('#user-search-field').val();
    
    $.ajax({
      url: "/users",
      type: 'GET',
      data: { keyword: input},
      dataType: 'json'
    })
    .done(function(users){
      $('#user-search-result').empty();
      if(users.length !== 0){
        users.forEach(function(user){
          appendHTML(user);
        })
      }else{
        appendEmpty();
      }
    })
    .fail(function(){
      alert("ユーザー検索に失敗しました");
    })
  })

  $(document).on('click','.chat-group-user__btn--add',function(){
    var memberId = $(this).attr('data-user-id');
    var memberName = $(this).attr('data-user-name');
    var parent = $(this).parent();
    $(parent).remove();
    appendChatMember(memberId,memberName);
  })

  $(document).on('click','.chat-group-user__btn--remove',function(){
    var parent = $(this).parent();
    $(parent).remove();
  })
})