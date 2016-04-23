var channels = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff","brunofin","comster404","test_channel","cretetion","sheevergaming","TR7K","OgamingSC2","ESL_SC2"];


// extract data from Twitch API for each user that you can find in the 
// above array called users.

function twitchAPI() {
  
  channels.forEach(function process(channel) {
    function userURL(type, name) {
      return 'https://api.twitch.tv/kraken/' + type +
             '/' + name + '?callback=?';
    };
    // streams
    $.getJSON(userURL('streams', channel), function(data) {
       
      var status, game;
      
      if(data.stream === null) {
        status = 'offline';
        game = "Offline";
      } else if(data.stream === undefined) {
          status = 'offline';
          game = 'Account Closed';
      } else {
          status = 'online';
          game = data.stream.game;
      }
      
      // channels
      $.getJSON(userURL('channels', channel), function(data) {
        
        var logo = data.logo != null ? data.logo : "http://primusdatabase.com/images/8/83/Unknown_avatar.png";
        
        var name = data.display_name != null ? data.display_name : channel;
        
        var user = "<div class='user " + status + "'>" + 
            "<img src='" + logo + "' alt = unavailable />" + 
            "<div class='status'>" +
            "<a href='" + data.url + "' target='_blank'>" + 
              name + '</a> </br> <span>' + game + '</sapn></div></div>';
        
        status === "online" ? $('#channels-box').prepend(user) : 
                            $('#channels-box').append(user);
      }); // channels     
    }); // streams
  }); // forEach  
}; // twitchAPI

$(document).ready(function() {
  
  twitchAPI();
  
  $('#all').on('click', function() {
    $('#all').css('background-color', '#D3D3D3');
    $('#online').css('background-color', '#ffffff');
    $('#offline').css('background-color', '#ffffff');
    $('.online').removeClass('hide');
    $('.offline').removeClass('hide');
  });
  
  $('#online').on('click', function() {
    $('#online').css('background-color', '#D3D3D3');
    $('#all').css('background-color', '#ffffff');
    $('#offline').css('background-color', '#ffffff');
    $('.online').removeClass('hide');
    $('.offline').addClass('hide');
  });
  
  $('#offline').on('click', function() {
    $('#offline').css('background-color', '#D3D3D3');
    $('#all').css('background-color', '#ffffff');
    $('#online').css('background-color', '#ffffff');
    $('.online').addClass('hide');
    $('.offline').removeClass('hide');
  });
  
});