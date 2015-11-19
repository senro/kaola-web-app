$( function()
{
    $( 'audio' ).audioPlayer(
        {
            classPrefix: 'audioplayer'
        });
    var $audioplayerplaypause=$(".audioplayer-playpause"),
        $audioplayertime=$(".audioplayer-time"),
        $audioplayerbar=$(".audioplayer-bar"),
        $audioplayervolume=$(".audioplayer-volume");

    $audioplayerplaypause.find("a").addClass("btn btn-xs btn-primary")
    $audioplayertime.remove();
    $audioplayerbar.remove();
    $audioplayervolume.remove();
});