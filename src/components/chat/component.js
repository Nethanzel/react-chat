import './style.css';

import SelfMessage from "../selfTextMessage/component";
import SelfImage from "../selfImageMessage/component";
import Message from "../othersTextMessage/component";
import ImageMessage from "../othersImageMessage/component";
import ServerMessage from "../serverMessage/component";

import socket from "../socket/component";
import React, { useEffect, useState } from "react";

const Chat = () => {

  const [messages, setMessages] = useState([]);
  const { getUser } = require("../../components/dataCache/module");

  useEffect(() => {
    socket.on("joined", async (evData) => {
      const res = await fetch(`./api/queue/${socket.id}`)
      let data = await res.json();
      data = [...data, {...evData, date: timeResolver()}];
      setMessages(data);
      scrollDown();
    });

    socket.on("message", data => {
      setMessages(msgList => [...msgList, {...data.data, date: timeResolver()}]);
      scrollDown();
    });

    socket.on("event", data => {
      setMessages(msgList => [...msgList, {...data, date: timeResolver()}]);
      scrollDown();
    });

    return function cleanup() {
      socket.off("joined");
      socket.off("message");
      socket.off("event");
    }
  }, [messages, setMessages]);

  const scrollDown = () => {
    let view = document.getElementById("chatView");
    if(view) {
      view.scrollTop = view.scrollHeight;
    }
  }

  const timeResolver = () => {
    let hour = new Date().getHours();
    let minute = new Date().getMinutes();
    hour = hour > 9 ? hour : "0" + hour;
    minute = minute > 9 ? minute : "0" + minute;
    return `${hour}:${minute}`;
  }

  return (
    <div className="chat">
      {
        messages.map((message, index) => {
         
          if(!message.user) { 
            return <ServerMessage 
              date={message.date}
              msg={message.msg}
              key={index}
            />
          } else if(message.user !== getUser()) {
            if(!message.content) {
              return <Message 
                date={message.date}
                img={message.img}
                user={message.user}
                msg={message.msg}
                key={index}
              />
            } else {
              return <ImageMessage 
                content={message.content}
                date={message.date}
                img={message.img}
                user={message.user}
                key={index}
              /> 
            }

          } else if(message.user === getUser()) {
            if(!message.content) {
              return <SelfMessage
                date={message.date}
                img={message.img}
                msg={message.msg}
                key={index}
              />
            } else {
              return <SelfImage 
                content={message.content}
                date={message.date}
                img={message.img}
                key={index}
              />
            }        
          }

          return null;
        })
      }
    </div>
  );
}

export default Chat;
