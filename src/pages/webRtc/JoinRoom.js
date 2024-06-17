import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import TopNav from "../../components/topnav/TopNav";
import Footer from "../../components/footer/Footer";
import "../../components/topnav/TopNav.css"; // TopNav CSS 
import "../../components/footer/Footer.css"; // TopNav CSS 

function initjanus() {
  if (!Janus.isWebrtcSupported()) {
    bootbox.alert("No WebRTC support... ");
    return;
  }
  // Create session
  janus = new Janus({
    server: server,
    success: function () {
      // Attach to VideoRoom plugin
      janus.attach({
        plugin: "janus.plugin.videoroom",
        opaqueId: opaqueId,
        success: function (pluginHandle) {
          $("#details").remove();
          sfutest = pluginHandle;
          Janus.log("Plugin attached! (" + sfutest.getPlugin() + ", id=" + sfutest.getId() + ")");
          Janus.log("  -- This is a publisher/manager");
          // Prepare the username registration
          $("#videojoin").removeClass("hide").show();
          $("#registernow").removeClass("hide").show();
          $("#register").click(registerUsername);
          $("#roomname").focus();
          $("#start")
            .removeAttr("disabled")
            .html("Stop")
            .click(function () {
              $(this).attr("disabled", true);
              janus.destroy();
            });

          Janus.log("Room List > ");
          // roomList();
        },
        error: function (error) {
          Janus.error("  -- Error attaching plugin...", error);
          bootbox.alert("Error attaching plugin... " + error);
        },
        consentDialog: function (on) {
          Janus.debug("Consent dialog should be " + (on ? "on" : "off") + " now");
          if (on) {
            // Darken screen and show hint
            $.blockUI({
              message: '<div><img src="up_arrow.png"/></div>',
              css: {
                border: "none",
                padding: "15px",
                backgroundColor: "transparent",
                color: "#aaa",
                top: "10px",
                left: navigator.mozGetUserMedia ? "-100px" : "300px",
              },
            });
          } else {
            // Restore screen
            $.unblockUI();
          }
        },
        iceState: function (state) {
          Janus.log("ICE state changed to " + state);
        },
        mediaState: function (medium, on) {
          Janus.log("Janus " + (on ? "started" : "stopped") + " receiving our " + medium);
        },
        webrtcState: function (on) {
          Janus.log("Janus says our WebRTC PeerConnection is " + (on ? "up" : "down") + " now");
          $("#videolocal").parent().parent().unblock();
          if (!on) return;
          $("#publish").remove();
          // This controls allows us to override the global room bitrate cap
          $("#bitrate").parent().parent().removeClass("hide").show();
          $("#bitrate a").click(function () {
            var id = $(this).attr("id");
            var bitrate = parseInt(id) * 1000;
            if (bitrate === 0) {
              Janus.log("Not limiting bandwidth via REMB");
            } else {
              Janus.log("Capping bandwidth to " + bitrate + " via REMB");
            }
            $("#bitrateset")
              .html($(this).html() + '<span class="caret"></span>')
              .parent()
              .removeClass("open");
            sfutest.send({ message: { request: "configure", bitrate: bitrate } });
            return false;
          });
        },
        onmessage: function (msg, jsep) {
          Janus.debug(" ::: Got a message (publisher) :::", msg);
          var event = msg["videoroom"];
          Janus.debug("Event: " + event);
          if (event) {
            if (event === "joined") {
              // Publisher/manager created, negotiate WebRTC and attach to existing feeds, if any
              myid = msg["id"];
              mypvtid = msg["private_id"];
              Janus.log("Successfully joined room " + msg["room"] + " with ID " + myid);
              if (subscriber_mode) {
                $("#videojoin").hide();
                $("#videos").removeClass("hide").show();
              } else {
                publishOwnFeed(true);
              }
              // Any new feed to attach to?
              if (msg["publishers"]) {
                var list = msg["publishers"];
                Janus.debug("Got a list of available publishers/feeds:", list);
                for (var f in list) {
                  var id = list[f]["id"];
                  var display = list[f]["display"];
                  var audio = list[f]["audio_codec"];
                  var video = list[f]["video_codec"];
                  Janus.debug("  >> [" + id + "] " + display + " (audio: " + audio + ", video: " + video + ")");
                  newRemoteFeed(id, display, audio, video);
                }
              }
            } else if (event === "destroyed") {
              // The room has been destroyed
              Janus.warn("The room has been destroyed!");
              bootbox.alert("The room has been destroyed", function () {
                window.location.reload();
              });
            } else if (event === "event") {
              // Any new feed to attach to?
              if (msg["publishers"]) {
                var list = msg["publishers"];
                Janus.debug("Got a list of available publishers/feeds:", list);
                for (var f in list) {
                  var id = list[f]["id"];
                  var display = list[f]["display"];
                  var audio = list[f]["audio_codec"];
                  var video = list[f]["video_codec"];
                  Janus.debug("  >> [" + id + "] " + display + " (audio: " + audio + ", video: " + video + ")");
                  newRemoteFeed(id, display, audio, video);
                }
              } else if (msg["leaving"]) {
                // One of the publishers has gone away?
                var leaving = msg["leaving"];
                Janus.log("Publisher left: " + leaving);
                var remoteFeed = null;
                for (var i = 1; i < 6; i++) {
                  if (feeds[i] && feeds[i].rfid == leaving) {
                    remoteFeed = feeds[i];
                    break;
                  }
                }
                if (remoteFeed != null) {
                  Janus.debug(
                    "Feed " + remoteFeed.rfid + " (" + remoteFeed.rfdisplay + ") has left the room, detaching"
                  );
                  $("#remote" + remoteFeed.rfindex)
                    .empty()
                    .hide();
                  $("#videoremote" + remoteFeed.rfindex).empty();
                  feeds[remoteFeed.rfindex] = null;
                  remoteFeed.detach();
                }
              } else if (msg["unpublished"]) {
                // One of the publishers has unpublished?
                var unpublished = msg["unpublished"];
                Janus.log("Publisher left: " + unpublished);
                if (unpublished === "ok") {
                  // That's us
                  sfutest.hangup();
                  return;
                }
                var remoteFeed = null;
                for (var i = 1; i < 6; i++) {
                  if (feeds[i] && feeds[i].rfid == unpublished) {
                    remoteFeed = feeds[i];
                    break;
                  }
                }
                if (remoteFeed != null) {
                  Janus.debug(
                    "Feed " + remoteFeed.rfid + " (" + remoteFeed.rfdisplay + ") has left the room, detaching"
                  );
                  $("#remote" + remoteFeed.rfindex)
                    .empty()
                    .hide();
                  $("#videoremote" + remoteFeed.rfindex).empty();
                  feeds[remoteFeed.rfindex] = null;
                  remoteFeed.detach();
                }
              } else if (msg["error"]) {
                if (msg["error_code"] === 426) {
                  // This is a "no such room" error: give a more meaningful description
                  bootbox.alert(
                    "<p>Apparently room <code>" +
                    myroom +
                    "</code> (the one this demo uses as a test room) " +
                    "does not exist...</p><p>Do you have an updated <code>janus.plugin.videoroom.jcfg</code> " +
                    "configuration file? If not, make sure you copy the details of room <code>" +
                    myroom +
                    "</code> " +
                    "from that sample in your current configuration file, then restart Janus and try again."
                  );
                } else {
                  bootbox.alert(msg["error"]);
                }
              }
            }
          }
          if (jsep) {
            Janus.debug("Handling SDP as well...", jsep);
            sfutest.handleRemoteJsep({ jsep: jsep });
            // Check if any of the media we wanted to publish has
            // been rejected (e.g., wrong or unsupported codec)
            var audio = msg["audio_codec"];
            if (mystream && mystream.getAudioTracks() && mystream.getAudioTracks().length > 0 && !audio) {
              // Audio has been rejected
              toastr.warning("Our audio stream has been rejected, viewers won't hear us");
            }
            var video = msg["video_codec"];
            if (mystream && mystream.getVideoTracks() && mystream.getVideoTracks().length > 0 && !video) {
              // Video has been rejected
              toastr.warning("Our video stream has been rejected, viewers won't see us");
              // Hide the webcam video
              $("#myvideo").hide();
              $("#videolocal").append(
                '<div class="no-video-container">' +
                '<i class="fa fa-video-camera fa-5 no-video-icon" style="height: 100%;"></i>' +
                '<span class="no-video-text" style="font-size: 16px;">Video rejected, no webcam</span>' +
                "</div>"
              );
            }
          }
        },
        onlocalstream: function (stream) {
          Janus.debug(" ::: Got a local stream :::", stream);
          mystream = stream;
          $("#videojoin").hide();
          $("#videos").removeClass("hide").show();
          if ($("#myvideo").length === 0) {
            $("#videolocal").append(
              '<video class="rounded centered" id="myvideo" width="100%" height="100%" autoplay playsinline muted="muted"/>'
            );
            // Add a 'mute' button
            $("#videolocal").append(
              '<button class="btn btn-warning btn-xs" id="mute" style="position: absolute; bottom: 0px; left: 0px; margin: 15px;">Mute</button>'
            );
            $("#mute").click(toggleMute);
            // Add an 'unpublish' button
            $("#videolocal").append(
              '<button class="btn btn-warning btn-xs" id="unpublish" style="position: absolute; bottom: 0px; right: 0px; margin: 15px;">Unpublish</button>'
            );
            $("#unpublish").click(unpublishOwnFeed);
          }
          $("#publisher").removeClass("hide").html(myusername).show();
          Janus.attachMediaStream($("#myvideo").get(0), stream);
          $("#myvideo").get(0).muted = "muted";
          if (
            sfutest.webrtcStuff.pc.iceConnectionState !== "completed" &&
            sfutest.webrtcStuff.pc.iceConnectionState !== "connected"
          ) {
            $("#videolocal")
              .parent()
              .parent()
              .block({
                message: "<b>Publishing...</b>",
                css: {
                  border: "none",
                  backgroundColor: "transparent",
                  color: "white",
                },
              });
          }
          var videoTracks = stream.getVideoTracks();
          if (!videoTracks || videoTracks.length === 0) {
            // No webcam
            $("#myvideo").hide();
            if ($("#videolocal .no-video-container").length === 0) {
              $("#videolocal").append(
                '<div class="no-video-container">' +
                '<i class="fa fa-video-camera fa-5 no-video-icon"></i>' +
                '<span className="no-video-text">No webcam available</span>' +
                "</div>"
              );
            }
          } else {
            $("#videolocal .no-video-container").remove();
            $("#myvideo").removeClass("hide").show();
          }
        },
        onremotestream: function (stream) {
          // The publisher stream is sendonly, we don't expect anything here
        },
        oncleanup: function () {
          Janus.log(" ::: Got a cleanup notification: we are unpublished now :::");
          mystream = null;
          $("#videolocal").html('<button id="publish" class="btn btn-primary">Publish</button>');
          $("#publish").click(function () {
            publishOwnFeed(true);
          });
          $("#videolocal").parent().parent().unblock();
          $("#bitrate").parent().parent().addClass("hide");
          $("#bitrate a").unbind("click");
        },
      });
    },
    error: function (error) {
      Janus.error(error);
      bootbox.alert(error, function () {
        window.location.reload();
      });
    },
    destroyed: function () {
      window.location.reload();
    },
  });
}

function JoinRoom() {
  useEffect(() => {
    initjanus(); // Janus 초기화 함수 직접 호출
  }, []);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [roomName, setRoomName] = useState("");
  const [stompClient, setStompClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isRoomJoined, setIsRoomJoined] = useState(false);

  const messagesEndRef = useRef(null);

  const navigate = useNavigate();

  const connectToChat = (roomId) => {
    const socket = new SockJS('http://localhost:80/chat');
    const client = Stomp.over(socket);

    client.connect({}, () => {
      client.subscribe(`/topic/rooms/${roomId}`, (message) => {
        setMessages((prevMessages) => [...prevMessages, message.body]);
      });
      setIsConnected(true);
    });

    client.onclose = () => {
      setIsConnected(false);
    };

    setStompClient(client);

    return () => {
      if (client) {
        client.disconnect();
      }
    };
  };

  const destroytest = () => {
    janus.destroy();
    navigate("/roomList");
  };

  const handleRegisterClick = () => {
    setUserId(username);
    connectToChat(roomName); // 방 이름으로 채팅 연결
    setIsRoomJoined(true);
  };

  const sendMessage = () => {
    if (isConnected && input.trim() !== '' && userId.trim() !== '') {
      const message = { content: `${userId}: ${input}` };
      stompClient.send(`/app/rooms/${roomName}/message`, {}, JSON.stringify(message));
      setInput('');
    }
  };

  useEffect(() => {
    // 새 메시지가 추가될 때마다 스크롤을 아래로 이동
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    }
  }, [messages]);

  return (
    <>
      <TopNav />
      <div className="flex h-screen mt-16">
        <div className="flex flex-col w-3/4 p-4">
          <div className="flex-grow flex justify-center items-center">
            {!isRoomJoined && (
              <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-2xl font-bold text-center mb-8">방 참여하기</h1>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <label className="w-24">방번호</label>
                    <input
                      type="text"
                      placeholder="방번호를 입력하세요"
                      value={roomName}
                      readOnly
                      className="flex-grow p-2 border rounded bg-gray-100"
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="w-24">대화명</label>
                    <input
                      type="text"
                      placeholder="내 대화명"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="flex-grow p-2 border rounded"
                    />
                  </div>
                  <div className="flex justify-center mt-4">
                    <button
                      className="px-4 py-2 bg-green-500 text-white rounded"
                      onClick={handleRegisterClick}
                    >
                      대화방 참여
                    </button>
                  </div>
                </div>
              </div>
            )}
            {isRoomJoined && (
              <div className="w-full bg-gray-100 p-4 rounded-lg overflow-y-auto">
                <div className="flex flex-wrap -mx-2">
                  <div className="w-full md:w-1/3 px-2 mb-4">
                    <div className="bg-white p-4 rounded shadow">
                      <h3 className="text-lg font-bold mb-2">Local Video <span className="badge badge-primary hide" id="publisher"></span></h3>
                      <div className="panel-body" id="videolocal"></div>
                    </div>
                  </div>
                  <div className="w-full md:w-1/3 px-2 mb-4">
                    <div className="bg-white p-4 rounded shadow">
                      <h3 className="text-lg font-bold mb-2">Remote Video #1 <span className="badge badge-info hide" id="remote1"></span></h3>
                      <div className="panel-body" id="videoremote1"></div>
                    </div>
                  </div>
                  <div className="w-full md:w-1/3 px-2 mb-4">
                    <div className="bg-white p-4 rounded shadow">
                      <h3 className="text-lg font-bold mb-2">Remote Video #2 <span className="badge badge-info hide" id="remote2"></span></h3>
                      <div className="panel-body" id="videoremote2"></div>
                    </div>
                  </div>
                  <div className="w-full md:w-1/3 px-2 mb-4">
                    <div className="bg-white p-4 rounded shadow">
                      <h3 className="text-lg font-bold mb-2">Remote Video #3 <span className="badge badge-info hide" id="remote3"></span></h3>
                      <div className="panel-body" id="videoremote3"></div>
                    </div>
                  </div>
                  <div className="w-full md:w-1/3 px-2 mb-4">
                    <div className="bg-white p-4 rounded shadow">
                      <h3 className="text-lg font-bold mb-2">Remote Video #4 <span className="badge badge-info hide" id="remote4"></span></h3>
                      <div className="panel-body" id="videoremote4"></div>
                    </div>
                  </div>
                  <div className="w-full md:w-1/3 px-2 mb-4">
                    <div className="bg-white p-4 rounded shadow">
                      <h3 className="text-lg font-bold mb-2">Remote Video #5 <span className="badge badge-info hide" id="remote5"></span></h3>
                      <div className="panel-body" id="videoremote5"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-1/4 p-4 bg-white border-l border-gray-200 flex flex-col h-full">
          <h2 className="text-xl font-bold mb-4">Chat Room {roomName}</h2>
          <div className="flex-grow bg-gray-200 p-4 rounded-lg overflow-y-auto h-full">
            <ul className="space-y-2">
              {messages.map((msg, index) => (
                <li key={index} className="bg-white p-2 rounded-lg shadow-sm">
                  {msg}
                </li>
              ))}
              <div ref={messagesEndRef} />
            </ul>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-center mb-2">
              <label className="mr-2 text-xl font-bold">Nickname</label>
              <input
                type="text"
                placeholder="Enter your ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex mt-2">
              <input
                type="text"
                placeholder="Enter your message"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') sendMessage();
                }}
                className="flex-grow p-2 border-t border-b focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={sendMessage}
                className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

const checkEnter = (target, event) => {
  if (event.key === "Enter") {
    // Your enter key logic here
  }
};

export default JoinRoom;