import {useContext, useState} from 'react'
import {videoContext} from "../VideoContext"
import {CopyToClipboard} from 'react-copy-to-clipboard';
import "./Options.css"

const Options = ({children}) => {
    const [idCopied, setIdCopied] = useState(false)
    const [idToCall, setIdToCall] = useState(null);
    const {me, callAccepted, name, setName, dropCall, callUser, callEnded} = useContext(videoContext);
    const makeACall = () => {
        if(idToCall == null) {
            alert("Please Enter a recipient Id to call out");
        }else{
            callUser(idToCall);
        }
    }
    return (
        <div className="options_container">
            
            <div className="options_col" elevation={10}>
                  <div className="options_col1">
                    <h3>Account Info</h3> 
                    <input placeholder="Name" value = {name} onChange= {(e) => setName(e.target.value)}/>
                    <CopyToClipboard text={me} className={`"'copy_but" ${idCopied}? "copied" : ""`}  onCopy={() => setIdCopied(true)}>
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                            </svg>
                            {
                                idCopied ? "Id Copied" :" Copy Your Id"
                            }                 
                        </button>
                    </CopyToClipboard>
                </div>  
                <div className="options_col2">
                    <h3>Make a Call</h3> 
                    <input placeholder="Id to Call"  value={idToCall} onChange={(e) => setIdToCall(e.target.value)}/>
                    {
                        callAccepted && !callEnded ? (
                            <button className="endCall" onClick={dropCall}> 
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 3h5m0 0v5m0-5l-6 6M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z" />
                                    </svg>
                                End Call
                            </button>
                        ): (
                        <button onClick = {makeACall} > 
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 3h5m0 0v5m0-5l-6 6M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z" />
                                </svg>
                                Call
                        </button>
                        )
                    }
                </div>  
            </div>    
            {children}       
        </div>
    )
}

export default Options
