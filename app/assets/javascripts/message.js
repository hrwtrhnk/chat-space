$(document).on('turbolinks:load', function() {

  function buildMessage(message){
    var insertImage = message.image == undefined ? "" : `<img src="${message.image}" class="message__lower-info__image">`
    var html = `<div class="message" data-id="${message.id}">
                  <div class="message__upper-info">
                    <p class="message__upper-info__talker">
                    ${message.user_name}
                    </p>
                    <p class="message__upper-info__date">
                    ${message.created_at}
                    </p>
                  </div>
                  <div class="message__lower-info">
                    <p class="message__lower-info__text">
                    ${message.content}
                    </p>
                    ${insertImage}
                  </div>
                </div>`
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
  })
  .done(function(message){
    var html = buildMessage(message);
    $('.messages').append(html)
    $('.messages').animate({ scrollTop: $(".messages")[0].scrollHeight }, 500);
    $('#new_message')[0].reset();
    $('.submit-btn').prop('disabled', false);
  })
  .fail(function(){
    alert('メッセージを送信できませんでした。');
  })
  .always(function(message){
    $('.form__submit').prop('disabled', false);
  })
  })

  var reloadMessages = function() {
    if (location.href.match(/\/groups\/\d+\/messages/)){
      var latest_message_id = $('.message').last().data('id');
      $.ajax({
        url: 'api/messages',
        type: 'get',
        dataType: 'json',
        data: {id: latest_message_id}
      })
      .done(function(messages) {
        var insertHTML = '';
        messages.forEach(function(message){
        insertHTML += buildMessage(message)
        $('.messages').append(insertHTML)
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 500);
        })
      })
      .fail(function() {
        alert('自動更新に失敗しました');
      });
    } else {
      clearInterval(reloadMessages);
    }
  };
  setInterval(reloadMessages, 5000);
});