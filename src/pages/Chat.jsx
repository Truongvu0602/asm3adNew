/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import socketIO from "socket.io-client";
import { Button, Spinner, TextInput } from "flowbite-react";
import { BiPaperPlane } from "react-icons/bi";

const SERVER_HOST = import.meta.env.VITE_SERVER_HOST?.replace(/\/+$/, "");

let socket;
if (!socket) {
  socket = socketIO(SERVER_HOST, {
    transports: ["websocket"],
    withCredentials: true,
  });
}

const Chat = () => {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [roomId, setRoomId] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState(null);
  const [newRoom, setNewRoom] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);

      try {
        const response = await axios.get(`${SERVER_HOST}/admin/chat`, {
          withCredentials: true,
        });

        if (response.status === 200) {
          const data = await response.data;
          setRooms(data.chats);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
        if (error.response.status === 401) {
          window.location.reload();
        }
        if (error.response.data.message) {
          setError(error.response.data.message);
        } else {
          setError("Something went wrong");
        }
      }
    };

    fetchRooms();
  }, [newRoom]); // Fetch room when new room is created and when component mounts

  // emit joinRoom event when roomId changes (select room)
  useEffect(() => {
    if (roomId) {
      joinRoom(roomId);
    }
  }, [roomId]);

  // Scroll chat to bottom on new message
  useEffect(() => {
    const chatBox = document.getElementById("chatBox");
    if (chatBox) {
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }, [messages]);

  const handleKeyPress = (event) => {
    //Listen for Enter key to send message
    if (event.key === "Enter") {
      sendMsg();
    }
  };

  // SocketIO events emit functions //

  const joinRoom = (roomId) => {
    socket.emit("joinRoom", {
      // emit joinRoom event
      roomId,
      msg: { message: "Staff has joined the room.", from: "system" }, // system message to noti when the staff is joined
    });
  };

  const selectRoom = (selectId) => {
    socket.emit("disconect", roomId); // emit disconect event before joining new room
    if (selectId == roomId) {
      return setRoomId(null); // this is for staff to click again on the same room to leave chat
    } else {
      setRoomId(selectId); // else just enter the selected room
    }
  };

  const sendMsg = () => {
    if (!inputMessage) return; // if input message is empty, return

    if (inputMessage.trim() === "/end") {
      // if input message is /end, emit endChat event
      setInputMessage("");
      return socket.emit("endChat", roomId);
    }

    socket.emit("sendMsg", {
      // emit sendMsg event
      roomId,
      msg: { message: inputMessage, from: "admin" },
    });
    setInputMessage("");
  };

  // SocketIO Events listeners //

  socket.on("receiveChat", (data) => {
    setMessages(data.messages);
  });

  socket.on("receiveMsg", (data) => {
    setMessages([...messages, data]);
  });

  socket.on("newRoom", (data) => {
    setNewRoom(true); //Listen for new room creation, then refetch rooms to get newest chat rooms
  });

  // if (error) {
  //   return (
  //     <div className="grid grid-cols-12 min-w-full min-h-[60vh] container mx-auto px-2 items-center">
  //       <div className="col-span-12 px-2 text-center">
  //         <h1 className="text-2xl font-bold text-rose-500">{error}</h1>
  //       </div>
  //     </div>
  //   );
  // }

  // return (
  //   <div className="grid grid-cols-12 min-w-full min-h-[60vh] max-h-[80vh] container mx-auto px-2">
  //     <div className="col-span-3">
  //       <h1 className="text-2xl font-bold text-slate-500">Chat rooms :</h1>
  //       <div className=" max-h-full">
  //         {loading ? (
  //           <div className="h-full flex">
  //             <Spinner color="success" className="mr-2" />{" "}
  //             <span>Loading rooms ...</span>
  //           </div>
  //         ) : (
  //           <ul className="roomsList overflow-scroll max-h-[70vh] overflow-y-hidden overflow-x-hidden">
  //             {rooms.map((room) => {
  //               return (
  //                 <li
  //                   key={room._id}
  //                   onClick={() => selectRoom(room.roomId)}
  //                   className={`${
  //                     roomId === room.roomId ? "bg-slate-200" : ""
  //                   } text-xs px-2 py-3 hover:cursor-pointer hover:bg-slate-100 border-b-2`}
  //                 >
  //                   <p className="text-slate-700 font-bold ">
  //                     Room ID:{" "}
  //                     <span className="text-slate-500 text-xs">
  //                       {room.roomId}
  //                     </span>
  //                   </p>
  //                 </li>
  //               );
  //             })}
  //           </ul>
  //         )}
  //       </div>
  //     </div>
  //     <div className="col-span-9 px-2">
  //       {!roomId && (
  //         <div className="text-slate-400 w-full h-full flex items-center justify-center">
  //           Select a chat room to start chat wtih customers.
  //         </div>
  //       )}
  //       {roomId && (
  //         <div className="chatBox flex flex-col">
  //           <div className="chatBoxHeader">
  //             <p>
  //               <span className="font-bold">Room ID: </span>
  //               <span className="text-slate-400 ">{roomId}</span>
  //             </p>
  //             <hr />
  //           </div>
  //           <div
  //             id="chatBox"
  //             className="chatBoxBody h-[70vh] flex flex-col overflow-scroll overflow-x-hidden scroll-mx-0 py-3"
  //           >
  //             <div className="chatBoxMsg min-h-[500px]">
  //               {!messages && (
  //                 <div className="flex flex-col">
  //                   <div>
  //                     <div className="w-[300px] h-[100px] bg-slate-200 rounded p-3 animate-pulse my-2 flex flex-col">
  //                       <div className="bg-slate-100 text-center mb-2 w-full h-[20px]"></div>
  //                       <div className="bg-slate-100 text-center my-2 w-[50px] h-[20px]"></div>
  //                       <div className="bg-slate-100 text-center my-2 w-[125px] h-[20px]"></div>
  //                     </div>
  //                     <div className="w-[300px] h-[100px] bg-slate-200 rounded p-3 animate-pulse flex flex-col items-end float-right my-2">
  //                       <div className="bg-slate-100 text-center mb-2 w-full h-[20px]"></div>
  //                       <div className="bg-slate-100 text-center my-2 w-[50px] h-[20px]"></div>
  //                       <div className="bg-slate-100 text-center my-2 w-[125px] h-[20px]"></div>
  //                     </div>
  //                   </div>
  //                   <div>
  //                     <div className="w-[300px] h-[100px] bg-slate-200 rounded p-3 animate-pulse my-2 flex flex-col">
  //                       <div className="bg-slate-100 text-center mb-2 w-full h-[20px]"></div>
  //                       <div className="bg-slate-100 text-center my-2 w-[50px] h-[20px]"></div>
  //                       <div className="bg-slate-100 text-center my-2 w-[125px] h-[20px]"></div>
  //                     </div>
  //                     <div className="w-[300px] h-[100px] bg-slate-200 rounded p-3 animate-pulse flex flex-col items-end float-right my-2">
  //                       <div className="bg-slate-100 text-center mb-2 w-full h-[20px]"></div>
  //                       <div className="bg-slate-100 text-center my-2 w-[50px] h-[20px]"></div>
  //                       <div className="bg-slate-100 text-center my-2 w-[125px] h-[20px]"></div>
  //                     </div>
  //                   </div>
  //                 </div>
  //               )}
  //               {messages &&
  //                 messages.map((msg) => {
  //                   if (msg?.from === "admin") {
  //                     return (
  //                       <div
  //                         key={msg._id}
  //                         className="flex flex-col justify-end m-2 bg-cyan-600 p-2 rounded-md w-fit ml-auto"
  //                       >
  //                         <p className="text-slate-800 capitalize text-sm">
  //                           You:
  //                         </p>
  //                         <p className="text-slate-100 text-right">
  //                           {msg.message}
  //                         </p>
  //                       </div>
  //                     );
  //                   }
  //                   if (msg?.from === "customer") {
  //                     return (
  //                       <div
  //                         key={msg._id}
  //                         className="flex flex-col justify-end m-2 bg-slate-600 p-2 rounded-md w-fit mr-auto"
  //                       >
  //                         <p className="text-slate-400 capitalize text-sm">
  //                           {msg.from} :{" "}
  //                         </p>
  //                         <p className="text-slate-100 text-right mr-auto">
  //                           {msg.message}
  //                         </p>
  //                       </div>
  //                     );
  //                   }
  //                   if (msg?.from === "system") {
  //                     return (
  //                       <div
  //                         key={msg._id}
  //                         className="flex justify-end m-2 bg-slate-300 p-1 rounded-md w-fit mx-auto"
  //                       >
  //                         <p className="text-slate-100 text-right text-sm">
  //                           {msg.message}
  //                         </p>
  //                       </div>
  //                     );
  //                   }
  //                 })}
  //             </div>
  //           </div>
  //           <div className="chatBoxInput flex gap-2 min-w-100">
  //             <TextInput
  //               onKeyDown={handleKeyPress}
  //               placeholder="Type here to chat, type /end to end chat."
  //               className="w-full"
  //               value={inputMessage}
  //               onChange={(e) => setInputMessage(e.target.value)}
  //             />
  //             <Button
  //               className="flex items-center justify-center gap-2"
  //               onClick={() => {
  //                 sendMsg();
  //               }}
  //             >
  //               <span className="w-15 h-15">
  //                 <BiPaperPlane />
  //               </span>
  //             </Button>
  //           </div>
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // );
  if (error) {
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
          minWidth: "100%",
          minHeight: "60vh",
          padding: "0 0.5rem",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ gridColumn: "span 12", textAlign: "center" }}>
          <h1
            style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#f43f5e" }}
          >
            {error}
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
        minWidth: "100%",
        minHeight: "60vh",
        maxHeight: "80vh",
        padding: "0 0.5rem",
      }}
    >
      {/* Left Panel (Rooms) */}
      <div style={{ gridColumn: "span 3" }}>
        <h1
          style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#64748b" }}
        >
          Chat rooms :
        </h1>
        <div style={{ maxHeight: "100%" }}>
          {loading ? (
            <div
              style={{ height: "100%", display: "flex", alignItems: "center" }}
            >
              <Spinner color="success" style={{ marginRight: "0.5rem" }} />
              <span>Loading rooms ...</span>
            </div>
          ) : (
            <ul
              style={{
                overflowY: "scroll",
                maxHeight: "70vh",
                paddingRight: "0.5rem",
              }}
            >
              {rooms.map((room) => (
                <li
                  key={room._id}
                  onClick={() => selectRoom(room.roomId)}
                  style={{
                    fontSize: "0.75rem",
                    padding: "0.75rem 0.5rem",
                    borderBottom: "2px solid #e2e8f0",
                    backgroundColor:
                      roomId === room.roomId ? "#e2e8f0" : "transparent",
                    cursor: "pointer",
                  }}
                >
                  <p style={{ color: "#334155", fontWeight: "bold" }}>
                    Room ID:{" "}
                    <span style={{ color: "#64748b", fontSize: "0.75rem" }}>
                      {room.roomId}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Right Panel (Chat Box) */}
      <div style={{ gridColumn: "span 9", paddingLeft: "0.5rem" }}>
        {!roomId ? (
          <div
            style={{
              color: "#94a3b8",
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Select a chat room to start chat with customers.
          </div>
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            {/* Chat Header */}
            <div>
              <p>
                <span style={{ fontWeight: "bold" }}>Room ID: </span>
                <span style={{ color: "#94a3b8" }}>{roomId}</span>
              </p>
              <hr />
            </div>

            {/* Chat Body */}
            <div
              id="chatBox"
              style={{
                height: "70vh",
                overflowY: "scroll",
                display: "flex",
                flexDirection: "column",
                padding: "0.75rem 0",
              }}
            >
              <div style={{ minHeight: "500px" }}>
                {!messages && (
                  <>
                    {[1, 2].map((i) => (
                      <div key={i}>
                        <div
                          style={{
                            width: "300px",
                            height: "100px",
                            backgroundColor: "#e2e8f0",
                            borderRadius: "0.5rem",
                            padding: "0.75rem",
                            animation: "pulse 2s infinite",
                            marginBottom: "0.5rem",
                          }}
                        >
                          <div
                            style={{
                              backgroundColor: "#f1f5f9",
                              height: "20px",
                              marginBottom: "0.5rem",
                            }}
                          />
                          <div
                            style={{
                              backgroundColor: "#f1f5f9",
                              height: "20px",
                              width: "50px",
                              marginBottom: "0.5rem",
                            }}
                          />
                          <div
                            style={{
                              backgroundColor: "#f1f5f9",
                              height: "20px",
                              width: "125px",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </>
                )}

                {messages &&
                  messages.map((msg) => {
                    if (msg?.from === "admin") {
                      return (
                        <div
                          key={msg._id}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            margin: "0.5rem",
                            backgroundColor: "#0891b2",
                            padding: "0.5rem",
                            borderRadius: "0.375rem",
                            maxWidth: "75%",
                            alignSelf: "flex-end",
                          }}
                        >
                          <p style={{ color: "#f1f5f9", fontSize: "0.875rem" }}>
                            You:
                          </p>
                          <p style={{ color: "white", textAlign: "right" }}>
                            {msg.message}
                          </p>
                        </div>
                      );
                    }
                    if (msg?.from === "customer") {
                      return (
                        <div
                          key={msg._id}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            margin: "0.5rem",
                            backgroundColor: "#475569",
                            padding: "0.5rem",
                            borderRadius: "0.375rem",
                            maxWidth: "75%",
                            alignSelf: "flex-start",
                          }}
                        >
                          <p style={{ color: "#cbd5e1", fontSize: "0.875rem" }}>
                            {msg.from}:
                          </p>
                          <p style={{ color: "white" }}>{msg.message}</p>
                        </div>
                      );
                    }
                    if (msg?.from === "system") {
                      return (
                        <div
                          key={msg._id}
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            margin: "0.5rem",
                            backgroundColor: "#cbd5e1",
                            padding: "0.25rem",
                            borderRadius: "0.375rem",
                            maxWidth: "fit-content",
                            alignSelf: "center",
                          }}
                        >
                          <p style={{ color: "#1e293b", fontSize: "0.875rem" }}>
                            {msg.message}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  })}
              </div>
            </div>

            {/* Chat Input */}
            <div
              style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}
            >
              <TextInput
                placeholder="Type here to chat, type /end to end chat."
                value={inputMessage}
                onKeyDown={handleKeyPress}
                onChange={(e) => setInputMessage(e.target.value)}
                style={{ flex: 1 }}
              />
              <Button
                onClick={sendMsg}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                }}
              >
                <BiPaperPlane />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
