import {useContext} from 'react'
import {videoContext} from "../VideoContext"
import "./Notification.css"

const Notifications = () => {
    const {answerCall, callDetails, callAccepted} = useContext(videoContext);
    return (
        <>
            {
                callDetails.isReceivingCall && !callAccepted && (
                    <div className="noti_info">
                       <p> {callDetails.callerName} is Calling ...</p>
                       <button onClick={answerCall}> Receive </button>
                    </div>

                )
            }
        </>
    )
}

export default Notifications
