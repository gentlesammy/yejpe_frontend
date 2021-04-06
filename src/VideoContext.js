import {createContext, useState, useRef, useEffect} from "react";
import {io} from "socket.io-client";
import Peer from "simple-peer";

const videoContext = createContext();

const socket = io("https://yejpe.herokuapp.com/"); 
const ContextProvider = ({children}) => {
    const [stream, setStream] = useState(null);
    const myVideo = useRef();
    const friendVideo = useRef();
     const connectionRef = useRef();
    const [me, setMe] = useState(null)
    const [callDetails, setCallDetails] = useState({});
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [name, setName] = useState("sule")
    useEffect(() => {
        navigator.mediaDevices.getUserMedia({video: true, audio: true})
        .then((currentStream) => {
            setStream(currentStream);
            myVideo.current.srcObject = currentStream;
        })
        //handles backend/server socket calls and response
        socket.on("me", (id) => {
            setMe(id);
        });
        //when server emits calluser with data like {signal:signalData, from, name}
        socket.on("calluser", ({signal, from, name:callerName})=> {
            setCallDetails({
                isReceivingCall: true,
                callerName,
                from,
                signal, 
            })
        });

    }, [])


    //answer call
    const answerCall = () => {
        setCallAccepted(true);
        const peer = new Peer({initiator: false, trickle:false, stream}); 
        peer.on("signal", (data) => {
            socket.emit("answercall", {signal: data, to: callDetails.from});
        })
        peer.on("stream", (currentStream) => {
            friendVideo.current.srcObject = currentStream;
        });
        peer.signal(callDetails.signal)
        connectionRef.current = peer; 
    }

        //call user
    const callUser = (id) => {
        const peer = new Peer({initiator: true, trickle:false, stream}); 
         peer.on("signal", (data) => {
            socket.emit("calluser", {userToCall: id, signalData: data, from: me, name});
        })
        peer.on("stream", (currentStream) => {
            friendVideo.current.srcObject = currentStream;
        });

        socket.on("callaccepted", (signal) => {
            setCallAccepted(true);
            peer.signal(signal);
        })
        connectionRef.current = peer; 
    }

    //drop call
    const dropCall = () => {
        setCallEnded(true);
        connectionRef.current.destroy();
        window.location.reload();

    }

    return (
        <videoContext.Provider value={{
            stream, myVideo, friendVideo, callDetails, callAccepted, name, setName, callEnded, me, callUser, answerCall, dropCall
        }}>
            {children}
        </videoContext.Provider>
    )

}

export{ContextProvider, videoContext}; 