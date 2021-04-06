import {useContext, useEffect} from 'react'
import {videoContext} from "../VideoContext"
import "./Video.css"

const Video = () => {
    const {stream, myVideo, friendVideo, callDetails, callAccepted, name, callEnded} = useContext(videoContext);
    return (
        <div className="video_container">
        {
            stream && (
                <div className="my_video"> 
                <h3>{name || "Name"}</h3>
                <video playsInline muted ref={myVideo} autoPlay    className="video-Mine"/>
            </div>
            )
        }

        {
            callAccepted && !callEnded && (
            <div className="friend_video"> 
                {/* <h1>Friend's video will be shown here</h1> */}
                <video playsInline muted ref={friendVideo} autoPlay    className="video-his"/>
                <h3>{callDetails.name || "Name"}</h3>
            </div>
            )
        }
            

             
        </div>
    )
}

export default Video
