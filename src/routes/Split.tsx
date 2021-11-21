import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import downloadjs from 'downloadjs';

import "../assets/styles/Split.css"

interface IVocalPath {
    name: string;
    type: string;
    ext: string;
  }

function Split(props:any) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [uploaded, setUploaded] = useState<boolean>(false);
    const [gotVocals, setGotVocals] = useState<boolean>(false);
    const [vocalPath, setVocalPath] = useState<IVocalPath>({
        name: '',
        type: '',
        ext: ''
      });
    const [vocalName, setVocalName] = useState('');

    const isMobile = props.isMobile;
  
    async function handleIsolate_2stem() {
      setIsLoading(true);
      let response:any = await fetch('http://130.45.47.105:3040/song-2stem/convert/'+vocalName);
      response = await response.json();
      setVocalPath({
        name: response.path_name,
        type: response.path_type,
        ext: response.path_ext
      });
      setIsLoading(false);
      setGotVocals(true);
    }
  
    async function download_2stem() {
      let response:any = await fetch('http://130.45.47.105:3040/file/get-zip/'+vocalPath.name);
      response = await response.blob();
      downloadjs(response, `Isolate_${vocalName}.zip`);
      resetAll();
    }
  
    async function handleUploadAudio(event:any) {
      let file = event.target.files;
      let newName = `${Date.now().toString().substring(0,7)}_`+file[0].name.replaceAll(" ", "");
      const formData = new FormData();
      formData.append('audio', file[0]);
  
      setVocalName(newName);
  
      fetch('http://130.45.47.105:3040/uploadAudio', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setUploaded(true);
      })
      .catch(error => {
        console.error(error)
      })
    }

    async function handleCancel() {
        resetAll();
        let response:any = await fetch('http://130.45.47.105:3040/cancelUpload/'+vocalName);
        response = await response.json();
    }
  
    function resetAll():void {
      setVocalName('');
      setGotVocals(false);
      setUploaded(false);
      setIsLoading(false);
  
      let inputVocal = document.getElementById('audio-input-vocal') as HTMLInputElement;
      inputVocal.value = '';
    }

    return (
        <div className="container-split">
            <div className="split-content"
                style={{
                    flexDirection: isMobile ? 'column' : 'row',
                    justifyContent: isMobile ? 'center' : '',
                }}
            >
                <div className="split-info-item"
                    style={{
                        marginBottom: isMobile ? '15vmin' : '',
                        width: isMobile ? 'calc(100% - 4vmin)' : '',
                    }}
                >
                    <div className="split-info-title"
                        style={{
                            fontSize: isMobile ? '8vmin' : '',
                        }}
                    >
                        Isolate Audio
                    </div>
                    <div className="split-row">
                        <div className={`split-info-upload-btn ${vocalName ? "" : "active"} upload`}
                            onClick={() => {
                                let vocal_input = document.getElementById('audio-input-vocal') as HTMLInputElement;
                                vocal_input.click();
                            }}
                            style={{
                                fontSize: isMobile ? "5vmin" : "",
                                padding: isMobile ? "1vmin" : "",
                                borderWidth: isMobile ? "1vmin" : "",
                                borderRadius: isMobile ? "2vmin" : "",
                            }}
                        >
                            {vocalName ? "Successfully Uploaded" : "Upload +"}
                        </div>
                        <input 
                            type="file" 
                            id="audio-input-vocal" 
                            style={{display: "none"}}
                            onChange={(event) => handleUploadAudio(event)}
                        />
                        
                    </div>
                    <div className="split-info-progressbar"
                        style={{
                            marginTop: isMobile ? "4vmin" : "",
                            borderRadius: isMobile ? "2vmin" : "",
                            height: vocalName ? "" : "0.25vh"

                        }}
                    >
                        <div 
                            className={`split-info-upload-btn ${(vocalName && !gotVocals && !isLoading) ? "active" : ""} isolate`}
                            style={{
                                fontSize: isMobile ? "5vmin" : "",
                                padding: isMobile ? "1vmin" : "",
                                display: !vocalName ? "none" : "",
                                borderWidth: isMobile ? "1vmin" : "",
                                borderRadius: isMobile ? "2vmin" : "",
                            }}
                            onClick={() => {
                                if (vocalName) {
                                    handleIsolate_2stem();
                                }
                            }}
                        >
                            {isLoading 
                                ? vocalName
                                    ? "Loading..."
                                    : ""
                                : gotVocals
                                    ? "Complete"
                                    : "Isolate"
                            }
                        </div>
                        <div className={`split-info-upload-btn ${gotVocals ? "active" : ""} download`}
                            style={{
                                marginRight: '1vmin',
                                marginLeft: isMobile ? "3vmin" : "",
                                fontSize: isMobile ? "5vmin" : "",
                                padding: isMobile ? "1vmin" : "",
                                display: !vocalName ? "none" : "",
                                borderWidth: isMobile ? "1vmin" : "",
                                borderRadius: isMobile ? "2vmin" : "",
                            }}
                            onClick={() => {
                                if (gotVocals) {
                                    download_2stem();
                                }
                            }}
                        >
                            Download
                        </div>
                    </div>
                    <div className={`split-info-cancel-btn ${vocalName ? "active" : ""}`}
                        onClick={() => {
                            handleCancel();
                        }}
                        style={{
                            fontSize: isMobile ? "5vmin" : "",
                            padding: isMobile ? "1vmin" : "",
                            marginTop: isMobile ? "3vmin" : "",
                            marginLeft: "auto",
                            marginRight: "0vmin",
                            borderWidth: isMobile ? "1vmin" : "",
                            borderRadius: isMobile ? "2vmin" : "",
                        }}
                    >
                        Cancel
                    </div>
                </div>

                {/* {!isMobile && <div className="split-info-item"
                    style={{
                        animation: "slideIn_Top 0.8s cubic-bezier(.05,1.16,.44,.97)",
                        animationDirection: "normal",
                        animationFillMode: "forwards"
                    }}
                >
                    <div className="split-info-title">
                        Isolate Instrumental
                    </div>
                    <div className="split-row">
                        <div className={`split-info-upload-btn ${vocalName ? "" : "active"} upload`}
                            onClick={() => {
                                let instru_input = document.getElementById('audio-input-instrumental') as HTMLInputElement;
                                instru_input.click();
                            }}
                        >
                            {vocalName ? "Successfully Uploaded" : "Upload +"}
                        </div>
                        <input 
                            type="file" 
                            id="audio-input-instrumental" 
                            style={{display: "none"}}
                            onChange={(event) => handleUploadAudio(event)}
                        />
                        <div 
                            className={`split-info-upload-btn ${(vocalName && !gotVocals && !isLoading) ? "active" : ""} isolate`}
                            style={{
                                marginLeft: 'auto',
                            }}
                            onClick={() => {
                                if (vocalName) {
                                    handleIsolate_2stem();
                                }
                            }}
                        >
                            {isLoading 
                                ? vocalName
                                    ? "Loading..."
                                    : ""
                                : gotVocals
                                    ? "Complete"
                                    : "Isolate"
                            }
                        </div>
                        <div className={`split-info-upload-btn ${gotVocals ? "active" : ""} download`}
                            style={{
                                marginRight: '1vmin',
                            }}
                            onClick={() => {
                                if (gotVocals) {
                                    download_2stem();
                                }
                            }}
                        >
                            Download
                        </div>
                    </div>
                    <div className="split-info-progressbar">
                        
                    </div>
                    <div className={`split-info-cancel-btn ${vocalName ? "active" : ""}`}
                        onClick={() => {
                            handleCancel();
                        }}
                    >
                        Cancel
                    </div>
                </div>} */}

            </div>
        </div>
    )
}

export default Split;