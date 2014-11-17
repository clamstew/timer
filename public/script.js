(function($) {

  if (window.Notification) {

    $("#requestPermission").on("click", function() {
      // webkitNotifications.requestPermission();
      Notification.requestPermission();
    });

    $("#checkPermission").on("click", function() {
      console.log('Notification.permission', Notification.permission);
      if (Notification.permission) {
        return $("#result").text(Notification.permission);
      } else {
        return $("#result").text((new Notification("check")).permission);
      }
    });

    return $("#show").on("click", function() {

      var notification;
      notification = new Notification($("[name=title]").val(), {
        tag: $("[name=tag]").val(),
        body: $("[name=body]").val(),
        iconUrl: $("[name=icon]").val(),
        icon: $("[name=icon]").val()
      });

      return notification.onclick = function() {
        // closes the notification
        notification.close();
        // briefly opens and closes a pop-up about:blank window
        window.open().close();
        // then that other window being open for a millisecond
        // allows you to refocus on the tab that the notification came from
        return window.focus();
      };

    });
  }

})($);
