$(document).on('turbolinks:load', function() {

  $(function() {

    var search_list = $("#user-search-result");

    function appendUser(user) {
      var html = `<div class='chat-group-user clearfix'>
                    <p class='chat-group-user__name'>${user.user_name}</p>
                    <a class='user-search-add chat-group-user__btn chat-group-user__btn--add' data-user-id=${user.id}' data-user-name='${user.user_name}'>追加</a>
                  </div>`
      search_list.append(html);
    }

    function appendNoUser(user) {
      var html = `<div class='chat-group-user clearfix'>
                    <p class='chat-group-user__name'>${user.user_name}</p>
                  </div>`
      search_list.append(html);
    }
    
    function addUser(user_id, user_name) {
      var html = `<div class='chat-group-user clearfix' id='chat-group-user-8'>
                    <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                      <p class='chat-group-user__name'>${user_name}</p>
                      <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                  </div>`
      $('#chat-group-users').append(html);
    }


    $("#user-search-field").on("keyup", function(e) {
      var input = $("#user-search-field").val();
      if (input !== ""){
        $.ajax({
          type: 'GET',
          url: '/users',
          data: { keyword: input },
          dataType: 'json'
        })
        .done(function(users) {
          $("#user-search-result").empty();
          if (users.length !== 0) {
            users.forEach(function(user){
              appendUser(user);
            });
          }
          else {
            appendNoUser("一致するユーザーはいません");
          }
        })
        .fail(function(){
          alert('ユーザー検索に失敗しました');
        })
      }
    });
    
    
    $('#user-search-result').on('click', '.chat-group-user__btn--add', function () {
      var user_id = $(this).data('user-id');
      var user_name = $(this).data('user-name');
      addUser(user_id, user_name);
      $(this).parent().remove();
    });

    $('#chat-group-users').on('click', '.chat-group-user__btn--remove', function () {
      $(this).parent().remove();
    });

  });
});