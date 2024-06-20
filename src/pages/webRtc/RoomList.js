// RoomList.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function initjanus() {
  return new Promise((resolve, reject) => {
    if (!Janus.isWebrtcSupported()) {
      bootbox.alert("No WebRTC support... ");
      reject(new Error("No WebRTC support"));
      return;
    }

    janus = new Janus({
      server: server,
      success: function () {
        janus.attach({
          plugin: "janus.plugin.videoroom",
          opaqueId: opaqueId,
          success: function (pluginHandle) {
            $("#details").remove();
            sfutest = pluginHandle;
            Janus.log("Plugin attached! (" + sfutest.getPlugin() + ", id=" + sfutest.getId() + ")");
            Janus.log("  -- This is a publisher/manager");

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
            resolve(); // Initialization complete
          },
          error: function (error) {
            Janus.error("  -- Error attaching plugin...", error);
            bootbox.alert("Error attaching plugin... " + error);
            reject(error);
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
              var audio = msg["audio_codec"];
              if (mystream && mystream.getAudioTracks() && mystream.getAudioTracks().length > 0 && !audio) {
                toastr.warning("Our audio stream has been rejected, viewers won't hear us");
              }
              var video = msg["video_codec"];
              if (mystream.getVideoTracks() && mystream.getVideoTracks().length > 0 && !video) {
                toastr.warning("Our video stream has been rejected, viewers won't see us");
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
              $("#videolocal").append(
                '<button class="btn btn-warning btn-xs" id="mute" style="position: absolute; bottom: 0px; left: 0px; margin: 15px;">Mute</button>'
              );
              $("#mute").click(toggleMute);
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
          onremotestream: function (stream) {},
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
        reject(error);
      },
      destroyed: function () {
        window.location.reload();
        reject(new Error("Session destroyed"));
      },
    });
  });
}
function RoomList() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage] = useState(8); // 한 페이지에 표시할 방 수
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 관리
  const [isRoomNumberBoxOpen, setIsRoomNumberBoxOpen] = useState(false); // 방 번호 입력 박스 상태 관리
  const [roomNumber, setRoomNumber] = useState(""); // 방 번호 상태 관리

  function getRoomList() {
    var body = { request: "list" };
    sfutest.send({
      message: body,
      success: function (result) {
        if (result && result.list) {
          var rooms = result.list;
          console.log("Rooms list: ", rooms);
          setRooms(rooms);
          setFilteredRooms(rooms);
        }
      },
    });
  }

  const handleJoinRoom = (roomId, roomDescription) => {
    console.log(`참가할 방 ID: ${roomId}`);
    console.log("방제목" + roomDescription);
    navigate(`/joinRoom?roomId=${roomId}&roomDescription=${roomDescription}`);
  };

  useEffect(() => {
    console.log("방목록");
    initjanus()
      .then(() => {
        getRoomList();
      })
      .catch((error) => {
        console.error("Failed to initialize Janus:", error);
      });
  }, []);

  const handleSearch = () => {
    const filtered = rooms.filter((room) => room.description.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredRooms(filtered);
  };

  const handleRoomNumberJoin = () => {
    if (roomNumber.trim() !== "") {
      const room = rooms.find((room) => room.room.toString() === roomNumber);
      if (room) {
        navigate(`/joinRoom?roomId=${roomNumber}&roomDescription=${room.description}`);
      } else {
        alert("해당 방 번호를 찾을 수 없습니다.");
      }
    } else {
      alert("방 번호를 입력하세요.");
    }
  };

  // 현재 페이지에 표시할 방 목록 계산
  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

  const totalPages = Math.ceil(filteredRooms.length / roomsPerPage);

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleRefresh = () => {
    getRoomList();
  };

  // 페이지 번호 구성 요소
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPageNumbersToShow = 3;

    // 이전 페이지로 돌아가는 버튼 추가
    if (currentPage > 1) {
      pageNumbers.push(
        <li key="prev-button" className="mx-1">
          <button className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 text-white" onClick={handlePrev}>
            &laquo;
          </button>
        </li>
      );
    }

    for (let i = currentPage; i < currentPage + maxPageNumbersToShow && i <= totalPages; i++) {
      pageNumbers.push(
        <li key={i} className="mx-1">
          <button
            id={i}
            onClick={handleClick}
            className={`px-3 py-1 rounded ${
              currentPage === i ? "bg-blue-500 text-white" : "bg-gray-700 hover:bg-gray-600 text-white"
            }`}
          >
            {i}
          </button>
        </li>
      );
    }

    if (currentPage + maxPageNumbersToShow < totalPages) {
      pageNumbers.push(
        <li key="right-dots" className="dots mx-1 text-white">
          ...
        </li>
      );
      pageNumbers.push(
        <li key={totalPages} className="mx-1">
          <button
            id={totalPages}
            onClick={handleClick}
            className={`px-3 py-1 rounded ${
              currentPage === totalPages ? "bg-blue-500 text-white" : "bg-gray-700 hover:bg-gray-600 text-white"
            }`}
          >
            {totalPages}
          </button>
        </li>
      );
    }

    // 다음 페이지로 가는 버튼 추가
    if (currentPage < totalPages) {
      pageNumbers.push(
        <li key="next-button" className="mx-1">
          <button className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 text-white" onClick={handleNext}>
            &raquo;
          </button>
        </li>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="container mx-auto flex flex-col lg:flex-row">

      <div className="flex-1 lg:ml-4">
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg" style={{ backgroundColor: "#282828" }}>
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
            <h1 className="text-2xl lg:text-4xl font-bold text-white">방 목록</h1>
            <div className="flex space-x-2 mt-4 sm:mt-0">
              <button
                className="px-4 py-2 bg-yellow-500 text-white font-bold rounded hover:bg-yellow-600"
                onClick={handleRefresh}
              >
                새로고침
              </button>
              <input
                type="text"
                placeholder="방 제목 검색"
                className="px-4 py-2 border rounded bg-gray-700 text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
              <button
                className="px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
                onClick={handleSearch}
              >
                검색
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white font-bold rounded hover:bg-green-600"
                onClick={() => setIsRoomNumberBoxOpen(true)}
              >
                방 번호로 입장
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
            {currentRooms.map((room) => (
              <div
                key={room.room}
                className="p-4 bg-gray-700 rounded shadow-md"
                style={{ backgroundColor: "#3C3C3C" }}
              >
                <div>
                  <h2 className="text-xl font-semibold text-white">{room.description}</h2>
                  <p className="text-white">참여 인원수: {room.num_participants}</p>
                  <button
                    className="mt-2 px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
                    onClick={() => handleJoinRoom(room.room, room.description)}
                  >
                    참가하기
                  </button>
                </div>
              </div>
            ))}
          </div>
          <ul id="page-numbers" className="flex justify-center mt-6 space-x-2 text-white">
            {renderPageNumbers()}
          </ul>
        </div>
      </div>

      {isRoomNumberBoxOpen && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setIsRoomNumberBoxOpen(false)}
        >
          <div className="bg-gray-700 p-6 rounded shadow-lg w-80" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl lg:text-2xl font-semibold mb-4 text-white">방 번호를 입력하세요</h2>
            <input
              type="text"
              placeholder="방 번호"
              className="w-full p-2 border border-gray-500 rounded mb-4 bg-gray-800 text-white"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
            />
            <button
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleRoomNumberJoin}
            >
              입장
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default RoomList;
