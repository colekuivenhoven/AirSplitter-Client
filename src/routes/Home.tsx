import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import "../assets/styles/Home.css"

function Home(props:any) {
    const isMobile = props.isMobile;

    function renderInformationItem(title: string, tags: string[], description: string, links: string[], alt: boolean) {
        return (
            <div className="home-info-item"
                style={{
                    animation: alt ? `slideIn_Right 1.2s cubic-bezier(.05,1.16,.44,.97)` : `slideIn_Left 1.2s cubic-bezier(.05,1.16,.44,.97)`,
                    animationFillMode: "forwards",
                    animationDirection: "normal",
                    flexDirection: isMobile ? "column" : "row",
                }}
            >
                {!alt && 
                    <div className={`home-info-img${title == "Instrumental Isolation" ? "-2" : ""}`}
                        style={
                            isMobile ? {
                                width: "90%",
                            }
                            : {}}
                    />
                }

                <div className="home-info-content"
                    style={
                        isMobile ? {
                            width: "90%",
                        }
                        : {}}
                >
                    <span className="home-info-title"
                        style={{
                            fontSize: isMobile ? "5vmin" : "",
                        }}
                    >{title}</span>
                    <div className="home-info-description"
                        style={{
                            fontSize: isMobile ? "3vmin" : "",
                        }}
                    >
                        {description}
                    </div>
                    <div className="home-info-link-container">
                        {links.map((link, index) => {
                            return (
                                <span 
                                    className="home-info-tag" key={index}
                                    style={{
                                        fontSize: isMobile ? "3vmin" : "",
                                        margin: isMobile ? "1vmin" : "",
                                    }}
                                >{link}</span>
                            )
                        })}
                    </div>
                </div>
                {alt && 
                    <div className="home-info-img" 
                        style={
                            isMobile ? {
                                width: "70%",
                            }
                            : {}}
                    />
                }
            </div>
        )
    }

    return (
        <div className="container-home">
            <div className="home-content">
                {renderInformationItem(
                    "Instrumental Isolation", 
                    [],
                    `Uses deep learning to remove the vocal spectrum of an uploaded sound file. After a short
                    processing time, a WAV file of the isolated instrumental can be downloaded from our servers.`,
                    ["Launch", "More Info"],
                    false
                )}

                {renderInformationItem(
                    "Vocal Isolation", 
                    [],
                    `Uses the same deep learning method to isolate the vocal spectrum from the file. After
                    processing, the vocals can be downloaded as a WAV file from our servers.`,
                    ["Launch", "More Info"],
                    isMobile ? false : true
                )}

                {isMobile && renderInformationItem(
                    "Vocal Isolation", 
                    [],
                    `Uses the same deep learning method to isolate the vocal spectrum from the file. After
                    processing, the vocals can be downloaded as a WAV file from our servers.`,
                    ["Launch", "More Info"],
                    isMobile ? false : true
                )}
            </div>
        </div>
    )
}

export default Home;