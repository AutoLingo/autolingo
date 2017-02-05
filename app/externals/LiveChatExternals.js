import io from '../sockets'

import { socket } from '../components/ChatAppVideo'

const LiveChatExternals = () => {

    // Documentation - https://github.com/muaz-khan/WebRTC-Experiment/tree/master/websocket

    var channel = location.href.replace(/\/|:|#|%|\.|\[|\]/g, '');

    var pub = 'pub-f986077a-73bd-4c28-8e50-2e44076a84e0';
    var sub = 'sub-b8f4c07a-352e-11e2-bb9d-c7df1d04ae4a';

    WebSocket  = PUBNUB.ws;

    var websocket = new WebSocket('wss://pubsub.pubnub.com/' + pub + '/' + sub + '/' + channel);
    

    websocket.onerror = function() {
        //location.reload();
    };

    websocket.onclose = function() {
        //location.reload();
    };

    websocket.push = websocket.send;
    websocket.send = function(data) {
        websocket.push(JSON.stringify(data));
    };

    // Peer connection 
    var peer = new PeerConnection(websocket);


    peer.onUserFound = function(userid) {
        if (document.getElementById(userid)) return;
        var tr = document.createElement('tr');

        var td1 = document.createElement('td');
        var td2 = document.createElement('td');

        td1.innerHTML = userid + ' has camera. Are you interested in video chat?';

        var button = document.createElement('button');
        button.innerHTML = 'Join';
        button.id = userid;
        button.style.float = 'right';
        button.onclick = function() {
            button = this;
            getUserMedia(function(stream) {
                peer.addStream(stream);
                peer.sendParticipationRequest(button.id);
            });
            button.disabled = true;
        };
        td2.appendChild(button);

        tr.appendChild(td1);
        tr.appendChild(td2);
        roomsList.appendChild(tr);
    };

    peer.onStreamAdded = function(e) {
        if (e.type == 'local') document.querySelector('#start-broadcasting').disabled = false;
        var video = e.mediaElement;

        video.setAttribute('width', 600);
        video.setAttribute('controls', true);

        videosContainer.insertBefore(video, videosContainer.firstChild);

        video.play();
        rotateVideo(video);
        scaleVideos();
    };

    peer.onStreamEnded = function(e) {
        var video = e.mediaElement;
        if (video) {
            video.style.opacity = 0;
            rotateVideo(video);
            setTimeout(function() {
                video.parentNode.removeChild(video);
                scaleVideos();
            }, 1000);
        }
    };

//**************************** 'START VIDEO CHAT' BUTTON *****************
    document.querySelector('#start-broadcasting').onclick = function() {
        this.disabled = true;
        getUserMedia(function(stream) {
            peer.addStream(stream);
            peer.startBroadcasting();
        });
        socket.emit('broadcast_video_room', {
            room: location.pathname + location.hash
        })
    };
//**************************** 

    document.querySelector('#your-name').onchange = function() {
        peer.userid = this.value;
    };

    var videosContainer = document.getElementById('videos-container') || document.body;
    var btnSetupNewRoom = document.getElementById('setup-new-room');
    var roomsList = document.getElementById('rooms-list');

    if (btnSetupNewRoom) btnSetupNewRoom.onclick = setupNewRoomButtonClickHandler;

    function rotateVideo(video) {
        video.style[navigator.mozGetUserMedia ? 'transform' : '-webkit-transform'] = 'rotate(0deg)';
        setTimeout(function() {
            video.style[navigator.mozGetUserMedia ? 'transform' : '-webkit-transform'] = 'rotate(360deg)';
        }, 1000);
    }

    function scaleVideos() {
        var videos = document.querySelectorAll('video'),
            length = videos.length,
            video;

        var minus = 130;
        var windowHeight = 700;
        var windowWidth = 600;
        var windowAspectRatio = windowWidth / windowHeight;
        var videoAspectRatio = 4 / 3;
        var blockAspectRatio;
        var tempVideoWidth = 0;
        var maxVideoWidth = 0;

        for (var i = length; i > 0; i--) {
            blockAspectRatio = i * videoAspectRatio / Math.ceil(length / i);
            if (blockAspectRatio <= windowAspectRatio) {
                tempVideoWidth = videoAspectRatio * windowHeight / Math.ceil(length / i);
            } else {
                tempVideoWidth = windowWidth / i;
            }
            if (tempVideoWidth > maxVideoWidth)
                maxVideoWidth = tempVideoWidth;
        }
        for (var i = 0; i < length; i++) {
            video = videos[i];
            if (video)
                video.width = maxVideoWidth - minus;
        }
    }

    window.onresize = scaleVideos;

    // you need to capture getUserMedia yourself!
    function getUserMedia(callback) {
        var hints = {
            audio: true,
            video: {
                optional: [],
                mandatory: {}
            }
        };
        navigator.getUserMedia(hints, function(stream) {
            var video = document.createElement('video');
            video.src = URL.createObjectURL(stream);
            video.controls = true;
            video.muted = true;

            peer.onStreamAdded({
                mediaElement: video,
                userid: 'self',
                stream: stream
            });

            callback(stream);
        });
    }

    (function() {
        var uniqueToken = document.getElementById('unique-token');
        if (uniqueToken)
            if (location.hash.length > 2) uniqueToken.parentNode.parentNode.parentNode.innerHTML = '<h2 style="text-align:center;"><a href="' + location.href + '" target="_blank">Share this link</a></h2>';
            else uniqueToken.innerHTML = uniqueToken.parentNode.parentNode.href = '#' + (Math.random() * new Date().getTime()).toString(36).toUpperCase().replace(/\./g, '-');
    })();
}

export default LiveChatExternals