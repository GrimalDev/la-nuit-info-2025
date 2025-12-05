'use client';

import { useState, useEffect } from 'react';

interface ClippyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ClippyModal({ isOpen, onClose }: ClippyModalProps) {
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([
    { text: "Bonjour ! Je suis Clippy, votre assistant virtuel ! 📎 Comment puis-je vous aider aujourd'hui ?", isUser: false }
  ]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (!isOpen) {
      // Reset messages when modal closes
      setTimeout(() => {
        setMessages([
          { text: "Bonjour ! Je suis Clippy, votre assistant virtuel ! 📎 Comment puis-je vous aider aujourd'hui ?", isUser: false }
        ]);
      }, 300);
    }
  }, [isOpen]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = { text: inputValue, isUser: true };
    setMessages(prev => [...prev, userMessage]);

    // Generate Clippy response
    const responses = [
      "Excellent choix ! Je peux vous aider avec ça. 📎",
      "C'est une très bonne question ! Laissez-moi vous expliquer...",
      "Je vois que vous êtes intéressé par le recyclage informatique ! 💻",
      "Saviez-vous que NIRD Linux peut fonctionner sur des PC de plus de 10 ans ? 🐧",
      "Pour faire un don, rendez-vous sur la page Don ! 📝",
      "Consultez notre carte pour voir l'impact dans votre région ! 🗺️",
    ];

    setTimeout(() => {
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { text: randomResponse, isUser: false }]);
    }, 500);

    setInputValue('');
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
      onClick={onClose}
    >
      <div
        className="card"
        style={{ maxWidth: '500px', width: '100%' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="card-header">
          <div className="card-title-wrapper">
            <span className="card-icon">📎</span>
            <span className="card-title">Assistant Clippy</span>
          </div>
          <div className="card-controls">
            <button className="card-control-btn" onClick={onClose}>_</button>
            <button className="card-control-btn">□</button>
            <button className="card-control-btn" onClick={onClose}>✕</button>
          </div>
        </div>
        <div className="card-body">
          {/* Clippy Character */}
          <div className="text-center mb-3">
            <div style={{ fontSize: '4rem' }}>📎</div>
          </div>

          {/* Chat messages */}
          <div
            style={{
              height: '300px',
              overflowY: 'auto',
              border: '2px inset #dfdfdf',
              padding: '0.5rem',
              marginBottom: '1rem',
              backgroundColor: '#fff',
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  marginBottom: '0.75rem',
                  textAlign: msg.isUser ? 'right' : 'left',
                }}
              >
                <div
                  style={{
                    display: 'inline-block',
                    padding: '0.5rem',
                    backgroundColor: msg.isUser ? '#c0c0c0' : '#dfdfdf',
                    border: '2px solid #000',
                    borderRadius: '0',
                    maxWidth: '80%',
                    textAlign: 'left',
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input area */}
          <div className="d-flex" style={{ gap: '0.5rem' }}>
            <input
              type="text"
              className="form-control"
              placeholder="Posez votre question..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button className="btn btn-primary" onClick={handleSend}>
              <span className="btn-text">Envoyer</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
