

import React, { useState } from 'react';
import './App.css';
import {
  AppBar, Tabs, Tab, Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, Card, CardContent, CardActions, Stack, Snackbar, Alert
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
function App() {
  // State for Canvs Demo tab
  const [canvasDemoVideos, setCanvasDemoVideos] = useState([]);
  const [showCanvasDemoUpload, setShowCanvasDemoUpload] = useState(false);
  const [canvasDemoFile, setCanvasDemoFile] = useState(null);
  const [canvasDemoFileUrl, setCanvasDemoFileUrl] = useState('');
  const [canvasDemoTitle, setCanvasDemoTitle] = useState('');
  const [canvasDemoLockTime, setCanvasDemoLockTime] = useState('');
  const [showCanvasDemoMetaModal, setShowCanvasDemoMetaModal] = useState(false);
  const [renameIdx, setRenameIdx] = useState(null);
  const [renameValue, setRenameValue] = useState('');
  const [activeTab, setActiveTab] = useState('engage');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [videoData, setVideoData] = useState(null);


  // Video engagement modal state
  const [showEngageForm, setShowEngageForm] = useState(false);
  const [engageFormShown, setEngageFormShown] = useState(false);
  const [videoModalPaused, setVideoModalPaused] = useState(false);
  const [engageEmail, setEngageEmail] = useState("");
  const [engageEmailTouched, setEngageEmailTouched] = useState(false);
  // Countdown for enabling Skip button
  const [skipCountdown, setSkipCountdown] = useState(0);
  const skipTimerRef = React.useRef(null);
  const videoRef = React.useRef(null);
  return (
    </>
  );
}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 4 }}>
          <img src={process.env.PUBLIC_URL + '/CanvasLogo.png'} alt="Canvas Logo" style={{ width: 80, marginBottom: 8 }} />
          <Typography variant="h4" fontWeight={700} sx={{ mb: 2 }}>
            Canvas - <Box component="span" className="ael-gradient" sx={{ background: 'linear-gradient(90deg,#ff512f,#dd2476)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 700 }}>AEL</Box> Demo
          </Typography>
          <AppBar position="static" color="default" sx={{ borderRadius: 2, boxShadow: 1, mb: 3, width: '100%', maxWidth: 600 }}>
            <Tabs
              value={activeTab}
              onChange={handleTabClick}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <Tab label="Canvas Engage" value="engage" />
              <Tab label="Canvas Monetize" value="monetize" />
              <Tab label="Canvs Demo" value="canvasdemo" />
            </Tabs>
          </AppBar>
        </Box>
        <Box sx={{ maxWidth: 700, mx: 'auto', mt: 2 }}>
          {activeTab === 'engage' && (
            <Box>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>Live Sports & Events - Trigger real-time fan interactions</Typography>
              <Stack direction="row" spacing={2} flexWrap="wrap">
                {engageCards.map((card, idx) => (
                  <Card key={idx} sx={{ minWidth: 220, mb: 2, cursor: 'pointer', flex: '1 1 220px' }} onClick={() => handleDemoCardClick(card)}>
                    <CardContent>
                      <Typography variant="h6">{card.title}</Typography>
                      <Typography variant="body2" color="text.secondary">{card.desc}</Typography>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </Box>
          )}
          {activeTab === 'monetize' && (
            <Box>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>OTT & Content Platforms - Transform attention into revenue</Typography>
              <Stack direction="row" spacing={2} flexWrap="wrap">
                {monetizeCards.map((card, idx) => (
                  <Card key={idx} sx={{ minWidth: 220, mb: 2, cursor: 'pointer', flex: '1 1 220px' }} onClick={() => handleDemoCardClick(card)}>
                    <CardContent>
                      <Typography variant="h6">{card.title}</Typography>
                      <Typography variant="body2" color="text.secondary">{card.desc}</Typography>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </Box>
          )}
          {activeTab === 'canvasdemo' && (
            <Box>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>Try Canvas Demo: Upload your own video and set a lock time for email capture!</Typography>
              <Button variant="contained" startIcon={<UploadFileIcon />} sx={{ mb: 2 }} onClick={handleCanvasDemoUploadClick}>
                Upload Video
              </Button>
              <Stack direction="row" spacing={2} flexWrap="wrap">
                {canvasDemoVideos.length === 0 && (
                  <Typography color="text.secondary" sx={{ py: 4, textAlign: 'center', width: '100%' }}>No videos uploaded yet.</Typography>
                )}
                {canvasDemoVideos.map((card, idx) => (
                  <Card key={idx} sx={{ minWidth: 220, mb: 2, position: 'relative', flex: '1 1 220px' }}>
                    <CardContent sx={{ cursor: 'pointer' }} onClick={() => handleCanvasDemoCardClick(card)}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <PlayCircleOutlineIcon color="primary" />
                        {renameIdx === idx ? (
                          <TextField
                            value={renameValue}
                            onChange={e => setRenameValue(e.target.value)}
                            size="small"
                            sx={{ flex: 1 }}
                          />
                        ) : (
                          <Typography variant="h6">{card.title}</Typography>
                        )}
                      </Stack>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Engagement overlay at {card.lockTime}s
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ position: 'absolute', top: 0, right: 0 }}>
                      {renameIdx === idx ? (
                        <IconButton size="small" color="primary" onClick={() => handleCanvasDemoRenameSave(idx)}><SaveIcon /></IconButton>
                      ) : (
                        <IconButton size="small" color="primary" onClick={() => handleCanvasDemoRename(idx)}><EditIcon /></IconButton>
                      )}
                      <IconButton size="small" color="error" onClick={() => handleCanvasDemoDelete(idx)}><DeleteIcon /></IconButton>
                    </CardActions>
                  </Card>
                ))}
              </Stack>
            </Box>
          )}
        </Box>
      </Box>
      {/* Canvas Demo Upload Modal */}
      <Dialog open={showCanvasDemoUpload} onClose={() => setShowCanvasDemoUpload(false)}>
        <DialogTitle>Upload a Video
          <IconButton aria-label="close" onClick={() => setShowCanvasDemoUpload(false)} sx={{ position: 'absolute', right: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Button variant="outlined" component="label" startIcon={<UploadFileIcon />} fullWidth sx={{ mb: 2 }}>
            Select Video File
            <input type="file" accept="video/*" hidden onChange={handleCanvasDemoFileChange} />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowCanvasDemoUpload(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleCanvasDemoUploadNext} disabled={!canvasDemoFileUrl}>Next</Button>
        </DialogActions>
      </Dialog>
      {/* Canvas Demo Meta Modal */}
      <Dialog open={showCanvasDemoMetaModal} onClose={() => setShowCanvasDemoMetaModal(false)}>
        <DialogTitle>Video Details
          <IconButton aria-label="close" onClick={() => setShowCanvasDemoMetaModal(false)} sx={{ position: 'absolute', right: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleCanvasDemoMetaSubmit} sx={{ mt: 1 }}>
            <TextField
              label="Title"
              value={canvasDemoTitle}
              onChange={e => setCanvasDemoTitle(e.target.value)}
              required
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Lock Time (seconds)"
              type="number"
              value={canvasDemoLockTime}
              onChange={e => setCanvasDemoLockTime(e.target.value)}
              required
              fullWidth
              inputProps={{ min: 0 }}
            />
            <DialogActions sx={{ mt: 2 }}>
              <Button onClick={() => setShowCanvasDemoMetaModal(false)}>Cancel</Button>
              <Button type="submit" variant="contained" disabled={!canvasDemoTitle || !canvasDemoLockTime}>Save</Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
      {/* Engagement Form Modal (overlays for Monetize tab and Canvas Demo tab) */}
      <Dialog open={showEngageForm && (activeTab === 'monetize' || activeTab === 'canvasdemo')} onClose={() => handleCloseEngageForm(0)}>
        <DialogTitle>To continue watching, enter your email:
          <IconButton aria-label="close" onClick={() => handleCloseEngageForm(0)} sx={{ position: 'absolute', right: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={e => { e.preventDefault(); handleEngageSubmit(); }}>
            <TextField
              label="Email"
              type="email"
              value={engageEmail}
              onChange={handleEngageEmailChange}
              onBlur={() => setEngageEmailTouched(true)}
              error={engageEmailTouched && !isValidEmail(engageEmail)}
              helperText={engageEmailTouched && !isValidEmail(engageEmail) ? 'Please enter a valid email address.' : ''}
              fullWidth
              sx={{ mb: 2 }}
            />
            <DialogActions>
              <Button onClick={() => handleCloseEngageForm(5)} disabled={skipCountdown > 0} color="secondary">
                {skipCountdown > 0 ? `Skip (${skipCountdown})` : 'Skip 5s'}
              </Button>
              <Button type="submit" variant="contained" disabled={!isValidEmail(engageEmail)}>Submit</Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
  };
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

  // Show form at lockTime seconds (dynamic)
  // Show form at lockTime seconds (dynamic) - support canvasdemo tab
  const handleVideoTimeUpdate = () => {
    if (
      videoRef.current &&
      videoData &&
      typeof videoData.lockTime !== 'undefined' &&
      Number(videoRef.current.currentTime) >= Number(videoData.lockTime) &&
      !showEngageForm &&
      !engageFormShown
    ) {
      setShowEngageForm(true);
      setEngageFormShown(true);
      if (activeTab === 'monetize' || activeTab === 'canvasdemo') {
        setVideoModalPaused(true);
        videoRef.current.pause();
      }
    }
  };

  // Handles closing the engage form, with optional skip logic
  const handleCloseEngageForm = (skipSeconds = 0) => {
    setShowEngageForm(false);
    setEngageEmail("");
    setEngageEmailTouched(false);
    setSkipCountdown(0);
    if (skipTimerRef.current) {
      clearInterval(skipTimerRef.current);
      skipTimerRef.current = null;
    }
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
  // Start countdown when engage form is shown
  React.useEffect(() => {
    if (showEngageForm) {
      setSkipCountdown(30);
      if (skipTimerRef.current) clearInterval(skipTimerRef.current);
      skipTimerRef.current = setInterval(() => {
        setSkipCountdown(prev => {
          if (prev <= 1) {
            clearInterval(skipTimerRef.current);
            skipTimerRef.current = null;
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setSkipCountdown(0);
      if (skipTimerRef.current) {
        clearInterval(skipTimerRef.current);
        skipTimerRef.current = null;
      }
    }
    // Cleanup on unmount
    return () => {
      if (skipTimerRef.current) {
        clearInterval(skipTimerRef.current);
        skipTimerRef.current = null;
      }
    };
  }, [showEngageForm]);

  // Email validation for engage modal
  const isValidEmail = (email) => {
    // Simple email regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  const handleEngageEmailChange = (e) => {
    setEngageEmail(e.target.value);
    setEngageEmailTouched(true);
  };
  const handleEngageSubmit = () => {
    if (isValidEmail(engageEmail)) {
      handleCloseEngageForm();
    } else {
      setEngageEmailTouched(true);
    }
  };

  return (
  <Box sx={{ bgcolor: '#f5f6fa', minHeight: '100vh' }}>
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 4 }}>
      <img src={process.env.PUBLIC_URL + '/CanvasLogo.png'} alt="Canvas Logo" style={{ width: 80, marginBottom: 8 }} />
      <Typography variant="h4" fontWeight={700} sx={{ mb: 2 }}>
        Canvas - <Box component="span" className="ael-gradient" sx={{ background: 'linear-gradient(90deg,#ff512f,#dd2476)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 700 }}>AEL</Box> Demo
      </Typography>
      <AppBar position="static" color="default" sx={{ borderRadius: 2, boxShadow: 1, mb: 3, width: '100%', maxWidth: 600 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabClick}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Canvas Engage" value="engage" />
          <Tab label="Canvas Monetize" value="monetize" />
          <Tab label="Canvs Demo" value="canvasdemo" />
        </Tabs>
      </AppBar>
    </Box>
      <Box sx={{ maxWidth: 700, mx: 'auto', mt: 2 }}>
        {activeTab === 'engage' && (
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>Live Sports & Events - Trigger real-time fan interactions</Typography>
            <Stack direction="row" spacing={2} flexWrap="wrap">
              {engageCards.map((card, idx) => (
                <Card key={idx} sx={{ minWidth: 220, mb: 2, cursor: 'pointer', flex: '1 1 220px' }} onClick={() => handleDemoCardClick(card)}>
                  <CardContent>
                    <Typography variant="h6">{card.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{card.desc}</Typography>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Box>
        )}
        {activeTab === 'monetize' && (
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>OTT & Content Platforms - Transform attention into revenue</Typography>
            <Stack direction="row" spacing={2} flexWrap="wrap">
              {monetizeCards.map((card, idx) => (
                <Card key={idx} sx={{ minWidth: 220, mb: 2, cursor: 'pointer', flex: '1 1 220px' }} onClick={() => handleDemoCardClick(card)}>
                  <CardContent>
                    <Typography variant="h6">{card.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{card.desc}</Typography>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Box>
        )}
        {activeTab === 'canvasdemo' && (
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>Try Canvas Demo: Upload your own video and set a lock time for email capture!</Typography>
            <Button variant="contained" startIcon={<UploadFileIcon />} sx={{ mb: 2 }} onClick={handleCanvasDemoUploadClick}>
              Upload Video
            </Button>
            <Stack direction="row" spacing={2} flexWrap="wrap">
              {canvasDemoVideos.length === 0 && (
                <Typography color="text.secondary" sx={{ py: 4, textAlign: 'center', width: '100%' }}>No videos uploaded yet.</Typography>
              )}
              {canvasDemoVideos.map((card, idx) => (
                <Card key={idx} sx={{ minWidth: 220, mb: 2, position: 'relative', flex: '1 1 220px' }}>
                  <CardContent sx={{ cursor: 'pointer' }} onClick={() => handleCanvasDemoCardClick(card)}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <PlayCircleOutlineIcon color="primary" />
                      {renameIdx === idx ? (
                        <TextField
                          value={renameValue}
                          onChange={e => setRenameValue(e.target.value)}
                          size="small"
                          sx={{ flex: 1 }}
                        />
                      ) : (
                        <Typography variant="h6">{card.title}</Typography>
                      )}
                    </Stack>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Engagement overlay at {card.lockTime}s
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ position: 'absolute', top: 0, right: 0 }}>
                    {renameIdx === idx ? (
                      <IconButton size="small" color="primary" onClick={() => handleCanvasDemoRenameSave(idx)}><SaveIcon /></IconButton>
                    ) : (
                      <IconButton size="small" color="primary" onClick={() => handleCanvasDemoRename(idx)}><EditIcon /></IconButton>
                    )}
                    <IconButton size="small" color="error" onClick={() => handleCanvasDemoDelete(idx)}><DeleteIcon /></IconButton>
                  </CardActions>
                </Card>
              ))}
            </Stack>
          </Box>
        )}
      </Box>
      {/* Canvas Demo Upload Modal */}
      <Dialog open={showCanvasDemoUpload} onClose={() => setShowCanvasDemoUpload(false)}>
        <DialogTitle>Upload a Video
          <IconButton aria-label="close" onClick={() => setShowCanvasDemoUpload(false)} sx={{ position: 'absolute', right: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Button variant="outlined" component="label" startIcon={<UploadFileIcon />} fullWidth sx={{ mb: 2 }}>
            Select Video File
            <input type="file" accept="video/*" hidden onChange={handleCanvasDemoFileChange} />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowCanvasDemoUpload(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleCanvasDemoUploadNext} disabled={!canvasDemoFileUrl}>Next</Button>
        </DialogActions>
      </Dialog>
      {/* Canvas Demo Meta Modal */}
      <Dialog open={showCanvasDemoMetaModal} onClose={() => setShowCanvasDemoMetaModal(false)}>
        <DialogTitle>Video Details
          <IconButton aria-label="close" onClick={() => setShowCanvasDemoMetaModal(false)} sx={{ position: 'absolute', right: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleCanvasDemoMetaSubmit} sx={{ mt: 1 }}>
            <TextField
              label="Title"
              value={canvasDemoTitle}
              onChange={e => setCanvasDemoTitle(e.target.value)}
              required
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Lock Time (seconds)"
              type="number"
              value={canvasDemoLockTime}
              onChange={e => setCanvasDemoLockTime(e.target.value)}
              required
              fullWidth
              inputProps={{ min: 0 }}
            />
            <DialogActions sx={{ mt: 2 }}>
              <Button onClick={() => setShowCanvasDemoMetaModal(false)}>Cancel</Button>
              <Button type="submit" variant="contained" disabled={!canvasDemoTitle || !canvasDemoLockTime}>Save</Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>

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
                playsInline
                disablePictureInPicture
                webkit-playsinline="true"
                x5-playsinline="true"
                x-webkit-airplay="allow"
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
                background: 'rgba(0,0,0,0.04)'
              }}>
                <div style={{flex: 1}} />
                <div style={{
                  flex: '0 0 95vw',
                  maxWidth: 340,
                  minWidth: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100vh',
                  marginRight: 0,
                }}>
                  <div
                    className="modal"
                    style={{
                      maxWidth: 320,
                      width: '95vw',
                      margin: '0 2vw',
                      position: 'relative',
                      background: 'rgba(255,255,255,0.60)',
                      borderRadius: 14,
                      padding: '24px 18px 24px 18px',
                      boxSizing: 'border-box',
                      boxShadow: '0 4px 24px 0 rgba(0,0,0,0.14)',
                    }}
                  >
                    {/* <button className="modal-close" onClick={handleCloseEngageForm}>&times;</button> */}
                    <h3 style={{
                      fontWeight: 700,
                      marginBottom: 10,
                      fontSize: '1rem',
                      textAlign: 'center',
                      lineHeight: 1.2,
                    }}>
                      {videoData && (videoData.src === 'football.mp4' || videoData.title === 'Football')
                        ? 'To get a chance to win $5000 lottery, enter your email.'
                        : 'To view from a different camera feed, enter your email:'}
                    </h3>
                    <form onSubmit={e => { e.preventDefault(); handleEngageSubmit(); }}>
                      <div className="form-group" style={{marginBottom: 10}}>
                        <input
                          type="email"
                          className="form-input"
                          placeholder="Enter your email"
                          value={engageEmail}
                          onChange={handleEngageEmailChange}
                          onBlur={() => setEngageEmailTouched(true)}
                          style={{
                            fontSize: '0.98rem',
                            padding: '7px 8px',
                            borderRadius: 6,
                            width: '100%',
                            ...(engageEmailTouched && !isValidEmail(engageEmail) ? { borderColor: 'red' } : {}),
                          }}
                        />
                        {engageEmailTouched && !isValidEmail(engageEmail) && (
                          <div style={{ color: 'red', fontSize: '0.82em', marginTop: 2, textAlign: 'left' }}>Please enter a valid email address.</div>
                        )}
                      </div>
                      <div className="form-actions" style={{display:'flex',gap:6,flexDirection:'row',justifyContent:'center'}}>
                        <button
                          type="button"
                          className="cta-btn secondary"
                          onClick={handleCloseEngageForm}
                          disabled={skipCountdown > 0}
                          style={{fontSize:'0.98rem',padding:'6px 10px',minWidth:0}}
                        >
                          {skipCountdown > 0 ? `Skip (${skipCountdown})` : 'Skip'}
                        </button>
                        <button
                          type="submit"
                          className="cta-btn primary"
                          disabled={!isValidEmail(engageEmail)}
                          style={{fontSize:'0.98rem',padding:'6px 10px',minWidth:0}}
                        >Submit</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Engagement Form Modal (overlays for Monetize tab and Canvas Demo tab) */}
      <Dialog open={showEngageForm && (activeTab === 'monetize' || activeTab === 'canvasdemo')} onClose={() => handleCloseEngageForm(0)}>
        <DialogTitle>To continue watching, enter your email:
          <IconButton aria-label="close" onClick={() => handleCloseEngageForm(0)} sx={{ position: 'absolute', right: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={e => { e.preventDefault(); handleEngageSubmit(); }}>
            <TextField
              label="Email"
              type="email"
              value={engageEmail}
              onChange={handleEngageEmailChange}
              onBlur={() => setEngageEmailTouched(true)}
              error={engageEmailTouched && !isValidEmail(engageEmail)}
              helperText={engageEmailTouched && !isValidEmail(engageEmail) ? 'Please enter a valid email address.' : ''}
              fullWidth
              sx={{ mb: 2 }}
            />
            <DialogActions>
              <Button onClick={() => handleCloseEngageForm(5)} disabled={skipCountdown > 0} color="secondary">
                {skipCountdown > 0 ? `Skip (${skipCountdown})` : 'Skip 5s'}
              </Button>
              <Button type="submit" variant="contained" disabled={!isValidEmail(engageEmail)}>Submit</Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    <Snackbar
      open={snackbar.open}
      autoHideDuration={3000}
      onClose={() => setSnackbar({ ...snackbar, open: false })}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
        {snackbar.message}
      </Alert>
    </Snackbar>
  </Box>

export default App;
