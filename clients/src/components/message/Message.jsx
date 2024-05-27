// 105 with own as props
import React from 'react'
import "./message.css";
import { format } from "timeago.js";

// 142 message as props
const Message = ({own, message, currentUser}) => {
  console.log(message);
  
  return (
    // 106
    <div className={own ? "message own" : "message"}>
       <div className="messageTop">
         <img
           className="messageImg"
           src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
           alt=""
         />
         {/* 143 message details */}
         <p className="messageText">{message.text}</p>
       </div>
       <div className="messageBottom">
          {format(message.createdAt)}
       </div>
    </div>
  )
}

export default Message