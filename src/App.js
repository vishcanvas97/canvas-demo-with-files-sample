

import React, { useState } from 'react';
import './App.css';
function App() {
  const [activeTab, setActiveTab] = useState('engage');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [videoData, setVideoData] = useState(null);


  // Video engagement modal state
  const [showEngageForm, setShowEngageForm] = useState(false);
  const [engageFormShown, setEngageFormShown] = useState(false);
  const [videoModalPaused, setVideoModalPaused] = useState(false);
  const videoRef = React.useRef(null);

  // Demo cards for each tab
  const [engageCards, setEngageCards] = useState([
    {
      src: 'Cricket highlights.mp4',
      title: 'Cricket Highlights',
      desc: 'Exciting cricket match highlights.',
      lockTime: 2
    }
  ]);
  const [monetizeCards, setMonetizeCards] = useState([
    {
      src: 'Movie clip.mp4',
      title: 'Movie Clip',
      desc: 'A featured movie scene.',
      lockTime: 2
    }
  ]);

  // Form state
  const [demoName, setDemoName] = useState('');
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState('');
  const [lockTime, setLockTime] = useState('');

  const handleTabClick = (tab) => setActiveTab(tab);
  const resetForm = () => {
    setDemoName('');
    setFile(null);
    setFileUrl('');
    setLockTime('');
  };

  const handleOpenUploadModal = () => {
    resetForm();
    setShowUploadModal(true);
  };
  const handleCloseUploadModal = () => {
    setShowUploadModal(false);
    resetForm();
  };

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    setFile(f);
    if (f) {
      setFileUrl(URL.createObjectURL(f));
    } else {
      setFileUrl('');
    }
  };

  const handleDemoNameChange = (e) => setDemoName(e.target.value);
  const handleLockTimeChange = (e) => setLockTime(e.target.value);

  const handleDemoCanvasAEL = (e) => {
    e.preventDefault();
    if (!fileUrl || !demoName) return;
    const newCard = {
      src: fileUrl,
      title: demoName,
      desc: lockTime ? `Engagement overlay at ${lockTime} seconds` : 'User uploaded demo',
      lockTime: lockTime
    };
    if (activeTab === 'engage') {
      setEngageCards((prev) => [...prev, newCard]);
    } else {
      setMonetizeCards((prev) => [...prev, newCard]);
    }
    setShowUploadModal(false);
    resetForm();
  };

  const handleDemoCardClick = (card) => {
    setVideoData(card);
    setShowVideoModal(true);
    setShowEngageForm(false);
    setEngageFormShown(false);
    setVideoModalPaused(false);
  };
  const handleCloseVideoModal = () => {
    setShowVideoModal(false);
    setVideoData(null);
    setShowEngageForm(false);
    setEngageFormShown(false);
    setVideoModalPaused(false);
  };

  // Show form at 2 seconds
  const handleVideoTimeUpdate = () => {
    if (
      videoRef.current &&
      videoRef.current.currentTime >= 2 &&
      !showEngageForm &&
      !engageFormShown
    ) {
      setShowEngageForm(true);
      setEngageFormShown(true);
      if (activeTab === 'monetize') {
        setVideoModalPaused(true);
        videoRef.current.pause();
      }
    }
  };

  // const handleCloseEngageForm = () => {
  //   setShowEngageForm(false);
  //   if (activeTab === 'monetize') {
  //     setVideoModalPaused(false);
  //     if (videoRef.current) videoRef.current.play();
  //   }
  // };
  const handleCloseEngageForm = (skipSeconds = 0) => {
    setShowEngageForm(false);
    if (activeTab === 'monetize') {
      setVideoModalPaused(false);
      if (videoRef.current) {
        if (skipSeconds > 0) {
          videoRef.current.currentTime = Math.min(
            videoRef.current.currentTime + skipSeconds,
            videoRef.current.duration
          );
        }
        videoRef.current.play();
      }
    }
  };

  return (
    <div className="demo-app">
      <div className="logo-container">
        <img src={process.env.PUBLIC_URL + '/CanvasLogo.png'} alt="Canvas Logo" className="canvas-logo" />
      </div>
      <h1 className="demo-title">
        Canvas <span className="ael-gradient">AEL</span> Demo
      </h1>
      <div className="tabs">
        <button
          className={`tab-btn${activeTab === 'engage' ? ' active' : ''}`}
          onClick={() => handleTabClick('engage')}
        >
          Canvas Engage
        </button>
        <button
          className={`tab-btn${activeTab === 'monetize' ? ' active' : ''}`}
          onClick={() => handleTabClick('monetize')}
        >
          Canvas Monetize
        </button>
      </div>
      <div className="tab-content">
        {activeTab === 'engage' && (
          <div className="tab-panel">
            <p className="tab-desc">Live Sports & Events - Trigger real-time fan interactions</p>
            <div className="demo-cards">
              {engageCards.map((card, idx) => (
                <div className="demo-card" key={idx} onClick={() => handleDemoCardClick(card)}>
                  <div className="demo-card-info">
                    <div className="demo-card-title">{card.title}</div>
                    <div className="demo-card-desc">
                      Peak Moment: {card.lockTime ? card.lockTime : 0} sec
                    </div>
                  </div>
                </div>
              ))}
            </div>
             {/* <button className="cta-btn" onClick={handleOpenUploadModal}>Upload Your Content</button>  */}
          </div>
        )}
        {activeTab === 'monetize' && (
          <div className="tab-panel">
            <p className="tab-desc">OTT & Content Platforms - Transform attention into revenue</p>
            <div className="demo-cards">
              {monetizeCards.map((card, idx) => (
                <div className="demo-card" key={idx} onClick={() => handleDemoCardClick(card)}>
                  <div className="demo-card-info">
                    <div className="demo-card-title">{card.title}</div>
                    <div className="demo-card-desc">{card.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            {/* <button className="cta-btn" onClick={handleOpenUploadModal}>Upload Your Content</button> */}
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="modal-overlay" onClick={handleCloseUploadModal}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={handleCloseUploadModal}>&times;</button>
            <h2 className="modal-heading">Transform Your Video Into an Engagement Engine</h2>
            <p className="modal-subline">Upload any video to see Canvas AEL detect peak moments and trigger smart overlays for data capture and monetization.</p>
            <form className="upload-form" onSubmit={handleDemoCanvasAEL}>
              {/* Name field removed as requested */}
              <div className="form-group">
                <label htmlFor="fileUpload" className="form-label">Pick a file</label>
                <input
                  id="fileUpload"
                  type="file"
                  className="form-input"
                  accept="video/*"
                  placeholder="Tap here"
                  onChange={handleFileChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lockTime" className="form-label">Lock Time: Set Peak Moment</label>
                <input
                  id="lockTime"
                  type="number"
                  className="form-input"
                  placeholder="Seconds (e.g. 15)"
                  value={lockTime}
                  onChange={handleLockTimeChange}
                  min="0"
                />
                <div className="form-helper">Choose when to trigger engagement overlay</div>
              </div>
              <div className="form-actions">
                <button type="button" className="cta-btn secondary" onClick={handleCloseUploadModal}>Start Over</button>
                <button type="submit" className="cta-btn primary" disabled={!fileUrl || !demoName}>Demo Canvas AEL</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Video Modal (with right-positioned form for Engage tab) */}
      {showVideoModal && videoData && (
        <div className="modal-overlay" onClick={handleCloseVideoModal} style={{zIndex:1500,position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(0,0,0,0.85)'}}>
          <div
            className="video-modal-flex"
            onClick={e => e.stopPropagation()}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              maxWidth: '100vw',
              maxHeight: '100vh',
              borderRadius: 0,
              padding: 0,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              background: 'transparent',
            }}
          >
            <div style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
              <button
                className="modal-close"
                onClick={handleCloseVideoModal}
                style={{position:'absolute',top:24,right:32,zIndex:2,fontSize:'2.5rem',color:'#fff'}}
              >
                &times;
              </button>
              <video
                ref={videoRef}
                src={videoData.src && videoData.src.startsWith('blob:') ? videoData.src : process.env.PUBLIC_URL + '/' + videoData.src}
                controls
                autoPlay
                style={{
                  width: '100vw',
                  height: '100vh',
                  maxWidth: '100vw',
                  maxHeight: '100vh',
                  borderRadius: 0,
                  background: '#000',
                  margin: 0,
                  objectFit: 'contain',
                }}
                onTimeUpdate={handleVideoTimeUpdate}
                paused={videoModalPaused ? 'paused' : undefined}
              />
              <div style={{padding:'18px 24px 20px 24px',color:'#fff',width:'90vw',maxWidth:'1200px'}}>
                <div className="demo-card-title" style={{fontSize:'1.5rem',marginBottom:'6px'}}>{videoData.title}</div>
                <div className="demo-card-desc">{videoData.desc}</div>
              </div>
            </div>
            {/* Engagement Form Modal (right of video for Engage tab) */}
            {showEngageForm && activeTab === 'engage' && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 3000,
                pointerEvents: 'auto',
                background: 'rgba(0,0,0,0.18)'
              }}>
                <div style={{flex: 1}} />
                <div style={{flex: '0 0 420px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
                  <div className="modal" style={{maxWidth:400,margin:'0 40px',position:'relative'}}>
                    <button className="modal-close" onClick={handleCloseEngageForm}>&times;</button>
                    <h3 style={{fontWeight:700,marginBottom:18}}>To view from a different camera feed, enter your email:</h3>
                    <form>
                      <div className="form-group">
                        <input type="email" className="form-input" placeholder="Enter your email" />
                      </div>
                      <div className="form-actions">
                        <button type="button" className="cta-btn secondary" onClick={handleCloseEngageForm}>Skip</button>
                        <button type="button" className="cta-btn primary" onClick={handleCloseEngageForm}>Submit</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Engagement Form Modal (overlays for Monetize tab only) */}
      {showEngageForm && activeTab !== 'engage' && (
        <div className="modal-overlay" style={{zIndex:2000}}>
          <div className="modal" style={{maxWidth:400,margin:'80px auto'}}>
            <button className="modal-close" onClick={handleCloseEngageForm}>&times;</button>
            <h3 style={{fontWeight:700,marginBottom:18}}>To continue watching, tell us how did you know about this movie?</h3>
            <form>
              <div className="form-group" style={{alignItems:'flex-start'}}>
                <label style={{display:'flex',alignItems:'center',gap:'8px',fontWeight:500}}>
                  <input type="radio" name="monetize_poll" value="youtube" style={{marginRight:8}} />
                  Watched the trailer on YouTube
                </label>
                <label style={{display:'flex',alignItems:'center',gap:'8px',fontWeight:500,marginTop:'10px'}}>
                  <input type="radio" name="monetize_poll" value="friend" style={{marginRight:8}} />
                  Shared by a friend
                </label>
              </div>
              <div className="form-actions">
              <button type="button" className="cta-btn secondary" onClick={() => handleCloseEngageForm(5)}>Skip 5s</button>
                <button type="button" className="cta-btn primary" onClick={() => handleCloseEngageForm(0)}>Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
