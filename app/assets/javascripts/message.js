$(function(){

  function buildMessage(message){
    var insertImage = message.image == undefined ? "" : `<img src="${message.image}" class="message__lower-info__image">`
    var html = `<div class="message">
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
    $('#message_content').val('')
    $('#new_message')[0].reset();
    $('.submit-btn').attr('disabled', false);
  })
  .fail(function(){
    alert('ERROR!! メッセージを送信できませんでした。');
  })
  .always(function(message){
    $('.form__submit').prop('disabled', false);
  })
  })
})