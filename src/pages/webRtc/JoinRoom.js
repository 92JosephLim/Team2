import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import TopNav from '../../components/topnav/TopNav';
import "../../components/topnav/TopNav"; // TopNav CSS

function initjanus() {
  if (!Janus.isWebrtcSupported()) {
    bootbox.alert("No WebRTC support... ");
    return;
  }
  janus = new Janus({
    server: server,
    success: function () {
      janus.attach({
        plugin: "janus.plugin.videoroom",
        opaqueId: opaqueId,
        success: function (pluginHandle) {
          sfutest = pluginHandle;
          $("#details").remove();
          $("#videojoin").removeClass("hide").show();
          $("#registernow").removeClass("hide").show();
          $("#register").click(registerUsername);
          $("#roomname").focus();
          Janus.log("Plugin attached! (" + sfutest.getPlugin() + ", id=" + sfutest.getId() + ")");
          Janus.log("  -- This is a publisher/manager");
        },
        error: function (error) {
          Janus.error("  -- Error attaching plugin...", error);
          bootbox.alert("Error attaching plugin... " + error);
        },
        consentDialog: function (on) {
          Janus.debug("Consent dialog should be " + (on ? "on" : "off") + " now");
          if (on) {
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
              myid = msg["id"];
              mypvtid = msg["private_id"];
              Janus.log("Successfully joined room " + msg["room"] + " with ID " + myid);
              if (subscriber_mode) {
                $("#videojoin").hide();
                $("#videos").removeClass("hide").show();
              } else {
                publishOwnFeed(true);
              }
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
              Janus.warn("The room has been destroyed!");
              bootbox.alert("The room has been destroyed", function () {
                window.location.reload();
              });
            } else if (event === "event") {
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
                  Janus.debug("Feed " + remoteFeed.rfid + " (" + remoteFeed.rfdisplay + ") has left the room, detaching");
                  $("#remote" + remoteFeed.rfindex).empty().hide();
                  $("#videoremote" + remoteFeed.rfindex).empty();
                  feeds[remoteFeed.rfindex] = null;
                  remoteFeed.detach();
                }
              } else if (msg["unpublished"]) {
                var unpublished = msg["unpublished"];
                Janus.log("Publisher left: " + unpublished);
                if (unpublished === "ok") {
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
                  Janus.debug("Feed " + remoteFeed.rfid + " (" + remoteFeed.rfdisplay + ") has left the room, detaching");
                  $("#remote" + remoteFeed.rfindex).empty().hide();
                  $("#videoremote" + remoteFeed.rfindex).empty();
                  feeds[remoteFeed.rfindex] = null;
                  remoteFeed.detach();
                }
              } else if (msg["error"]) {
                if (msg["error_code"] === 426) {
                  bootbox.alert("<p>Apparently room <code>" + myroom + "</code> (the one this demo uses as a test room) " +
                    "does not exist...</p><p>Do you have an updated <code>janus.plugin.videoroom.jcfg</code> " +
                    "configuration file? If not, make sure you copy the details of room <code>" + myroom + "</code> " +
                    "from that sample in your current configuration file, then restart Janus and try again.");
                } else {
                  bootbox.alert(msg["error"]);
                }
              }
            }
          }
          if (jsep) {
            Janus.debug("Handling SDP as well...", jsep);
            sfutest.handleRemoteJsep({ jsep: jsep });
            var audio = msg["audio_codec"];
            if (mystream && mystream.getAudioTracks() && mystream.getAudioTracks().length > 0 && !audio) {
              toastr.warning("Our audio stream has been rejected, viewers won't hear us");
            }
            var video = msg["video_codec"];
            if (mystream && mystream.getVideoTracks() && mystream.getVideoTracks().length > 0 && !video) {
              toastr.warning("Our video stream has been rejected, viewers won't see us");
              $("#myvideo").hide();
              $("#videolocal").append('<div class="no-video-container">' +
                '<i class="fa fa-video-camera fa-5 no-video-icon" style="height: 100%;"></i>' +
                '<span class="no-video-text" style="font-size: 16px;">Video rejected, no webcam</span>' +
                "</div>");
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
            $("#myvideo").hide();
            if ($("#videolocal .no-video-container").length === 0) {
              $("#videolocal").append(
                '<div class="no-video-container">' +
                '<i class="fa fa-video-camera fa-5 no-video-icon"></i>' +
                '<span class="no-video-text">No webcam available</span>' +
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
  const [stompClient, setStompClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const roomId = queryParams.get("roomId");
  const [roomName, setRoomName] = useState("");

  const messagesEndRef = useRef(null);

  const navigate = useNavigate();
  const destroytest = () => {
    janus.destroy();
    navigate("/roomList");
  };

  useEffect(() => {
    if (roomId) {
      setRoomName(roomId);

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
    }
  }, [roomId]);

  useEffect(() => {
    // 새 메시지가 추가될 때마다 스크롤을 아래로 이동
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    }
  }, [messages]);

  const sendMessage = () => {
    if (isConnected && input.trim() !== '' && userId.trim() !== '') {
      const message = { content: `${userId}: ${input}` };
      stompClient.send(`/app/rooms/${roomId}/message`, {}, JSON.stringify(message));
      setInput('');
    }
  };

  const handleRegisterClick = () => {
    setUserId(username);
  };

  return (
    <>
      <TopNav /> {/* TopNav 컴포넌트 추가 */}
      <div className="flex h-screen" style={{ marginTop: "60px" }}>
        <div className="flex-grow flex justify-between items-center p-4">
          <nav className="navbar navbar-default navbar-static-top"></nav>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="page-header">
                  <h1>
                    방참여하기
                    <button className="btn btn-default" autoComplete="off" id="des" onClick={destroytest}>
                      방나가기
                    </button>
                  </h1>
                </div>
                <div className="container" id="details">
                  <div className="row">
                    <div className="col-md-12">
                      <h3>버튼을 눌러서 방에 참가하세요</h3>
                      <h4>대화명은 영어만 가능합니다.</h4>
                    </div>
                  </div>
                </div>
                <div className="container hide" id="videojoin">
                  <div className="row">
                    <div className="col-md-12" id="controls">
                      <div id="registernow">
                        <span className="label label-info" id="room"></span>
                        <div className="input-group margin-bottom-md" style={{ width: "100% !important" }}>
                          <span className="input-group-addon">방번호</span>
                          <input
                            autoComplete="off"
                            className="form-control"
                            type="text"
                            placeholder="방번호를 입력하세요"
                            id="roomname"
                            value={roomName}
                            readOnly
                          />
                        </div>
                        <span className="label label-info" id="you"></span>
                        <div className="input-group margin-bottom-md">
                          <span className="input-group-addon">대화명</span>
                          <input
                            autoComplete="off"
                            className="form-control"
                            type="text"
                            placeholder="내 대화명"
                            id="username"
                            onKeyPress={(e) => {
                              if (e.key === "Enter") checkEnter(e.target, e);
                            }}
                            onChange={(e) => setUsername(e.target.value)} // Update the username state
                          />
                          <span className="input-group-btn">
                            <button className="btn btn-success" autoComplete="off" id="register" onClick={handleRegisterClick}>
                              대화방 참여
                            </button>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container hide" id="videos">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h3 className="panel-title">
                            <span
                              className="badge badge-primary"
                              id="publisher"
                              style={{ fontSize: "1.5rem", padding: "0.5rem", borderRadius: "0.5rem" }}
                            ></span>
                            <div className="btn-group btn-group-xs pull-right hide">
                              <div className="btn-group btn-group-xs">
                                <button
                                  id="bitrateset"
                                  autoComplete="off"
                                  className="btn btn-primary dropdown-toggle"
                                  data-toggle="dropdown"
                                >
                                  Bandwidth<span className="caret"></span>
                                </button>
                                <ul id="bitrate" className="dropdown-menu" role="menu">
                                  <li>
                                    <a href="#" id="0">
                                      No limit
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#" id="128">
                                      Cap to 128kbit
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#" id="256">
                                      Cap to 256kbit
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#" id="512">
                                      Cap to 512kbit
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#" id="1024">
                                      Cap to 1mbit
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#" id="1500">
                                      Cap to 1.5mbit
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#" id="2000">
                                      Cap to 2mbit
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </h3>
                        </div>
                        <div className="panel-body" id="videolocal"></div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h3 className="panel-title">
                            Remote Video #1 <span className="label label-info hide" id="remote1"></span>
                          </h3>
                        </div>
                        <div className="panel-body relative" id="videoremote1"></div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h3 className="panel-title">
                            Remote Video #2 <span className="label label-info hide" id="remote2"></span>
                          </h3>
                        </div>
                        <div className="panel-body relative" id="videoremote2"></div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h3 className="panel-title">
                            Remote Video #3 <span className="label label-info hide" id="remote3"></span>
                          </h3>
                        </div>
                        <div className="panel-body relative" id="videoremote3"></div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h3 className="panel-title">
                            Remote Video #4 <span className="label label-info hide" id="remote4"></span>
                          </h3>
                        </div>
                        <div className="panel-body relative" id="videoremote4"></div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h3 className="panel-title">
                            Remote Video #5 <span className="label label-info hide" id="remote5"></span>
                          </h3>
                        </div>
                        <div className="panel-body relative" id="videoremote5"></div>
                      </div>
                    </div>
                  </div>
                </div> {/* 여기가 마지노선 */}
              </div>
            </div>
            <hr />
          </div>
        </div>

        <div className="w-1/5 p-4 bg-white border-l border-gray-200 flex flex-col h-full">
          <h2 className="text-xl font-bold mb-4">Chat Room {roomId}</h2>
          <div className="flex-grow bg-gray-200 p-4 rounded-lg overflow-y-auto" style={{ height: "100%" }}>
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
    </>
  );
}

const checkEnter = (target, event) => {
  if (event.key === "Enter") {
    // Your enter key logic here
  }
};

export default JoinRoom;

