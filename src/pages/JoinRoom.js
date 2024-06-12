import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import Footer from "../components/Footer";
import TopNav from "../components/TopNav";
import we2 from "../assets/we2.jpg";

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
  const location = useLocation(); // Initialize useLocation
  const queryParams = new URLSearchParams(location.search);
  const roomId = queryParams.get("roomId");
  const [roomName, setRoomName] = useState("");
  useEffect(() => {
    if (roomId) {
      // 방번호와 방제목을 설정
      // $("#roomname").val(roomId);
      setRoomName(roomId);
    }
  }, [roomId]);

  return (
    <div>
      <TopNav />
      <img src={we2} className="absolute w-full cover z-0"/>
      <div className="container h-screen">
        <div className="row">
          <div className="col-md-12">
            <div className="page-header">
              <div>
                <button className="btn btn-default my-10" autoComplete="off" id="start" onClick={initjanus}>
                  방 참여하기
                </button>
              </div>
            </div>
            <div className="container" id="details">
              <div className="row">
                <div className="col-md-12">
                  <div className=" text-4xl font-bold mb-10">버튼을 눌러서 방에 참가하세요</div>
                  <div className=" text-3xl font-bold">대화명은 영어만 가능합니다.</div>
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
                      />
                      <span className="input-group-btn">
                        <button className="btn btn-success" autoComplete="off" id="register">
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
                        Local Video <span className="label label-primary hide" id="publisher"></span>
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
            </div>
      
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

const checkEnter = (target, event) => {
  if (event.key === "Enter") {
    // Your enter key logic here
  }
};

export default JoinRoom;
