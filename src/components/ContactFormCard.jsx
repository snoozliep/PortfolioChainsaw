import React, { useState, useRef, useEffect } from 'react';
import { Send, CheckCircle2, MapPin, Mail } from 'lucide-react';

const embeddedStyles = `
@import url('https://fonts.googleapis.com/css2?family=Courier+Prime:ital,wght@0,400;0,700;1,400&family=Oswald:wght@600;700&display=swap');

.detective-casefile-container {
  position: relative;
  max-width: 1100px;
  margin: 40px auto;
  padding: 10px;
  background-color: #0d0e12;
  font-family: 'Courier Prime', monospace;
  color: #d1d1d1;
}

.folder-tab {
  width: 280px;
  height: 36px;
  background-color: #211d1a;
  border-top: 2px solid #52473e;
  border-left: 2px solid #52473e;
  border-right: 2px solid #52473e;
  border-radius: 8px 16px 0 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.tab-stamp {
  font-family: 'Oswald', sans-serif;
  color: #a32222;
  font-size: 0.8rem;
  letter-spacing: 2px;
  border: 1px solid #a32222;
  padding: 1px 4px;
}

.tab-id {
  font-size: 0.75rem;
  color: #7a7067;
  font-weight: bold;
}

.detective-folder-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  background-color: #161514;
  border: 2px solid #38322c;
  border-radius: 0 12px 12px 12px;
  padding: 36px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.8);
}

.case-tag {
  display: block;
  font-family: 'Oswald', sans-serif;
  color: #c43333;
  font-size: 0.85rem;
  letter-spacing: 2px;
  margin-bottom: 8px;
}

.case-title,
.contract-title {
  font-family: 'Oswald', sans-serif;
  font-size: 2.5rem;
  line-height: 1.1;
  color: #f2ebd9;
  text-transform: uppercase;
  margin-bottom: 20px;
  letter-spacing: 1px;
}

.casefile-left-section {
  border-right: 1px dashed #38322c;
  padding-right: 32px;
  display: flex;
  flex-direction: column;
}

.error-banner {
  padding: 10px 12px;
  background-color: #381212;
  color: #fca5a5;
  border: 1px solid #7f1d1d;
  font-size: 0.8rem;
  margin-bottom: 16px;
}

.contact-form .input-group {
  margin-bottom: 16px;
}

.contact-form label {
  display: block;
  font-size: 0.75rem;
  color: #8c8175;
  margin-bottom: 6px;
  font-weight: bold;
  letter-spacing: 1px;
}

.contact-form input,
.contact-form textarea {
  width: 100%;
  background-color: #0b0a0a;
  border: 1px solid #38322c;
  color: #e3ded5;
  padding: 10px 12px;
  font-family: 'Courier Prime', monospace;
  font-size: 0.88rem;
  box-sizing: border-box;
}

.contact-form input:focus,
.contact-form textarea:focus {
  outline: none;
  border-color: #c43333;
}

.submit-case-btn {
  width: 100%;
  background-color: #2b2520;
  border: 1px solid #52473e;
  color: #f2ebd9;
  padding: 12px;
  font-family: 'Oswald', sans-serif;
  letter-spacing: 2px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;
}

.submit-case-btn:hover:not(:disabled) {
  background-color: #c43333;
  border-color: #c43333;
  color: #fff;
}

.submit-case-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.submission-success-box {
  padding: 24px;
  text-align: center;
  background-color: #0b0a0a;
  border: 1px solid #38322c;
  margin-bottom: 20px;
}

.submission-success-box h3 {
  font-family: 'Oswald', sans-serif;
  font-size: 1.5rem;
  color: #f2ebd9;
  margin-bottom: 8px;
}

.submission-success-box p {
  font-size: 0.85rem;
  color: #a8a096;
  line-height: 1.5;
}

.reset-form-btn {
  margin-top: 16px;
  background: none;
  border: none;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #c5a059;
  cursor: pointer;
  text-decoration: underline;
}

.folder-footer-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  border-top: 1px solid #38322c;
  margin-top: auto;
  padding-top: 20px;
}

.info-label {
  color: #b89452;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.7rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 4px;
}

.info-val {
  font-size: 0.82rem;
  color: #e3ded5;
  font-weight: bold;
}

.casefile-right-section {
  display: flex;
  flex-direction: column;
}

.contract-description {
  font-size: 0.88rem;
  color: #a8a096;
  line-height: 1.5;
  margin-bottom: 20px;
}

.contract-paper-card {
  background-color: #f0eada;
  color: #2b2b2b;
  padding: 18px;
  border-radius: 4px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
  position: relative;
  transition: transform 0.2s ease;
}

.contract-paper-card.bound {
  box-shadow: 0 0 15px rgba(196, 51, 51, 0.4);
}

.contract-terms {
  font-size: 0.85rem;
  line-height: 1.4;
  margin-bottom: 14px;
  color: #38342e;
}

.canvas-wrapper {
  position: relative;
  width: 100%;
  height: 130px;
  background-color: #e6dfce;
  border: 1px dashed #999081;
}

.canvas-wrapper canvas {
  width: 100%;
  height: 100%;
  cursor: crosshair;
  touch-action: none;
}

.sign-watermark {
  position: absolute;
  bottom: 8px;
  left: 10px;
  font-size: 0.7rem;
  color: #a39b8c;
  pointer-events: none;
  font-weight: bold;
  letter-spacing: 1px;
}

.contract-actions {
  display: flex;
  gap: 12px;
  margin-top: 20px;
}

.bind-btn {
  flex: 2;
  background-color: #c43333;
  border: none;
  color: #ffffff;
  padding: 12px;
  font-family: 'Oswald', sans-serif;
  font-size: 1rem;
  letter-spacing: 2px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.bind-btn:hover {
  background-color: #a32222;
}

.bind-btn.bound {
  background-color: #228b22;
}

.clear-btn {
  flex: 1;
  background-color: transparent;
  border: 1px solid #52473e;
  color: #f2ebd9;
  padding: 12px;
  font-family: 'Oswald', sans-serif;
  font-size: 1rem;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.clear-btn:hover {
  border-color: #f2ebd9;
}

@media (max-width: 850px) {
  .detective-folder-body {
    grid-template-columns: 1fr;
  }
  .casefile-left-section {
    border-right: none;
    border-bottom: 1px dashed #38322c;
    padding-right: 0;
    padding-bottom: 32px;
  }
}
`;

export default function ContactFormCard({
  title = 'Send Us a Message',
  subtitle = 'GET IN TOUCH',
  locationText = 'Manila, Philippines',
  emailText = 'contact@domain.com',
  endpoint = 'https://formspree.io/f/mvkpzdqz',
  onSubmitSuccess,
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const [isBound, setIsBound] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    ctx.strokeStyle = '#b20a2c';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, [submitted]);

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { x, y } = getCoordinates(e);

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    setHasSignature(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { x, y } = getCoordinates(e);

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
    setIsBound(false);
  };

  const bindContract = () => {
    if (!hasSignature) {
      setError('Please provide a signature before binding the contract.');
      return;
    }
    setError(null);
    setIsBound(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill out all required fields.');
      return;
    }

    setLoading(true);
    setError(null);

    const canvas = canvasRef.current;
    const signatureBase64 = hasSignature ? canvas.toDataURL('image/png') : '';

    const payload = {
      ...formData,
      signature: signatureBase64,
      contractBound: isBound,
    };

    try {
      if (endpoint) {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error('Failed to send message. Please try again.');
        }
      }

      setSubmitted(true);
      onSubmitSuccess?.(payload);
    } catch (err) {
      setError(err.message || 'An error occurred while submitting.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{embeddedStyles}</style>
      <div className="detective-casefile-container">
        <div className="folder-tab">
          <span className="tab-stamp">CONFIDENTIAL</span>
          <span className="tab-id">FILE NO. 05-A</span>
        </div>

        <div className="detective-folder-body">
          <div className="casefile-left-section">
            <span className="case-tag">— {subtitle} —</span>
            <h2 className="case-title">{title}</h2>

            {submitted ? (
              <div className="submission-success-box">
                <CheckCircle2 size={40} style={{ color: '#c5a059', margin: '0 auto 12px' }} />
                <h3>Message Sent</h3>
                <p>
                  Thank you, <strong>{formData.name}</strong>. We have received your inquiry and will reply to{' '}
                  <strong>{formData.email}</strong> shortly.
                </p>
                <button
                  type="button"
                  className="reset-form-btn"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', subject: '', message: '' });
                    clearCanvas();
                  }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                {error && <div className="error-banner">{error}</div>}

                <div className="input-group">
                  <label>FULL NAME *</label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="input-group">
                  <label>EMAIL ADDRESS *</label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="input-group">
                  <label>SUBJECT</label>
                  <input
                    type="text"
                    placeholder="How can we help?"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>

                <div className="input-group">
                  <label>MESSAGE *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="submit-case-btn" disabled={loading}>
                  <Send size={14} /> {loading ? 'SENDING...' : 'SUBMIT INQUIRY'}
                </button>
              </form>
            )}

            <div className="folder-footer-info">
              <div>
                <span className="info-label">
                  <MapPin size={12} /> LOCATION
                </span>
                <span className="info-val">{locationText}</span>
              </div>
              <div>
                <span className="info-label">
                  <Mail size={12} /> DIRECT EMAIL
                </span>
                <span className="info-val">{emailText}</span>
              </div>
            </div>
          </div>

          <div className="casefile-right-section">
            <span className="case-tag">— CASE FILE 05 — SIGN HERE</span>
            <h2 className="contract-title">MAKE A CONTRACT.</h2>
            <p className="contract-description">
              Draw your signature in blood below. Non-binding, mostly decorative, entirely your own fear to name.
            </p>

            <div className={`contract-paper-card ${isBound ? 'bound' : ''}`}>
              <p className="contract-terms">
                In exchange for one (1) uninterrupted night's sleep, the undersigned agrees to feed something small and personal to whatever's under the bed.
              </p>

              <div className="canvas-wrapper">
                <canvas
                  ref={canvasRef}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                />
                <span className="sign-watermark">× SIGN ABOVE</span>
              </div>
            </div>

            <div className="contract-actions">
              <button
                type="button"
                className={`bind-btn ${isBound ? 'bound' : ''}`}
                onClick={bindContract}
              >
                {isBound ? 'CONTRACT BOUND' : 'BIND THE CONTRACT'}
              </button>
              <button type="button" className="clear-btn" onClick={clearCanvas}>
                CLEAR
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}

export { ContactFormCard };