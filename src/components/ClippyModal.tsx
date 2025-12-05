'use client';

import { useState, useEffect, useRef } from 'react';

interface ClippyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ClippyModal({ isOpen, onClose }: ClippyModalProps) {
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([
    { text: "Bonjour ! Je suis Clippy, votre assistant virtuel ! 📎 Comment puis-je vous aider aujourd'hui ?", isUser: false }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Auto-scroll when messages change
    scrollToBottom();
  }, [messages]);

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

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    // Add user message
    const userMessage = { text: inputValue, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    
    const currentInput = inputValue;
    setInputValue('');
    setIsLoading(true);

    try {
      // Call TinyLlama API
      const response = await fetch('/api/clippy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: currentInput }),
      });

      const data = await response.json();
      
      if (data.success && data.response) {
        setMessages(prev => [...prev, { text: data.response, isUser: false }]);
      } else {
        throw new Error('Invalid response');
      }
    } catch (error) {
      console.error('Error calling Clippy API:', error);
      // Fallback response
      const fallbackResponses = [
        "Oh ! Je suis un peu perdu... Mais je peux vous dire que NIRD Linux c'est génial ! 📎",
        "Hmm... Je ne suis pas sûr de comprendre. Voulez-vous faire un don ? 🎁",
        "Euh... Excellente question ! Avez-vous visité notre carte interactive ? 🗺️",
        "Je crois que j'ai besoin d'un café... ☕ Parlons plutôt de recyclage informatique !",
      ];
      const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
      setMessages(prev => [...prev, { text: randomResponse, isUser: false }]);
    } finally {
      setIsLoading(false);
    }
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
            ref={chatContainerRef}
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
            {/* Invisible element to scroll to */}
            <div ref={messagesEndRef} />
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
              disabled={isLoading}
            />
            <button className="btn btn-primary" onClick={handleSend} disabled={isLoading}>
              <span className="btn-text">{isLoading ? '⏳' : 'Envoyer'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
