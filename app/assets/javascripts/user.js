$(function(){
  var preInput = "";
  function hitUser(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name="${user.name}">追加</a>
                </div>`
    $("#user-search-result").append(html);
  }

  function addGroupUser(user_id, user_name){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value=${user_id}>
                  <p class='chat-group-user__name'>${user_name}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    $("#chat-group-users").append(html);
  }

  $("#user-search-field").on("keyup", function(e){
    e.preventDefault();
    var input = $("#user-search-field").val();
    if (preInput !== input && input.length !== 0) {
      $.ajax({
        type: "GET",
        url: "/users",
        data: {keyword: input},
        dataType: "json"
      })
      .done(function(users){
        $("#user-search-result").empty();
        if ( users.length !== 0 ) {
          users.forEach(function(user){
            hitUser(user);
          });
        }
      })
      .fail(function(){
        alert('ユーザー検索に失敗しました');
      })
    } else {
      $("#user-search-result").empty();
    }
    preInput = input;
  })

  $(document).on("click", ".user-search-add", function(){
    var user_id = $(this).data("user-id");
    var user_name = $(this).data("user-name");
    $(this).parent().remove();
    addGroupUser(user_id, user_name);
  })

  $(document).on("click", ".user-search-remove", function(){
    $(this).parent().remove();
  })
})
