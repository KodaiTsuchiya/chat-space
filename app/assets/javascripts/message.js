$(function(){
  var messageList = $(".main__messageroom ul");
  function refresh(){
    $(".main__inputarea__submit").prop('disabled', false);
  }
  function postMessage(message){
    var html = `<li data-id="${message.id}" >
                  <p class='main__messageroom__username'>${message.name}</p>
                  <p class='main__messageroom__timestamp'>${message.created_at}</p>
                  <p class='main__messageroom__message'>${message.body}</p>
                  ${ message.image == null ? "" : `<p class='main__messageroom__message'><img src="${message.image}"></p>`}
                </li>`
    messageList.append(html);
  }
  function getMessages(){
    var url = $(this).attr("action");
    var lastMessageId = $(".main__messageroom li:last").data("id");
    $.ajax({
      type: "GET",
      url: url,
      data: {id : lastMessageId},
      dataType: "json"
    })
    .done(function(messages){
      if (messages.length !== 0 ) {
        messages.forEach(function(message){
          postMessage(message);
          $(".main__messageroom").animate({scrollTop: $(".main__messageroom")[0].scrollHeight},'swing')
        });
      }
    })
    .fail(function(){
      alert("メッセージの取得に失敗しました。");
    })
  }

  $(".new_message").on("submit",function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr("action");
    $.ajax({
      type: "POST",
      url: url,
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
    .done(function(data){
      postMessage(data);
      $(".main__inputarea__message, .main__inputarea__image").val("")
      $(".main__messageroom").animate({scrollTop: $(".main__messageroom")[0].scrollHeight},'swing')
      refresh();
    })
    .fail(function(){
      alert("投稿に失敗しました。");
      refresh();
    })
  })
  setInterval(startTimer,5000);

  function startTimer(){
    currentPath = location.pathname;
    if ( currentPath.match("/groups/.+/messages") ) {
      getMessages();
    }
  }
});
