'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Mic, MicOff, Loader } from 'lucide-react';
import { WidgetSelector } from '@/components/ui/widgets/WidgetSelector';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}

interface Widget {
  type: 'checklist' | 'flowchart' | 'data_table' | 'chart';
  data: any;
}

export default function WorkshopPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    connectWebSocket();
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  const connectWebSocket = () => {
    try {
      wsRef.current = new WebSocket('ws://localhost:8000/api/v1/ws');
      
      wsRef.current.onopen = () => {
        console.log('WebSocket connected');
        setIsConnected(true);
        setError(null);
      };
      
      wsRef.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        
        if (data.type === 'text') {
          setMessages(prev => [...prev, { 
            role: 'assistant', 
            content: data.content,
            timestamp: new Date().toISOString()
          }]);
        } else if (data.type === 'widget') {
          setWidgets(prev => [...prev, data.content]);
        }
      };
      
      wsRef.current.onclose = () => {
        console.log('WebSocket disconnected');
        setIsConnected(false);
        setTimeout(connectWebSocket, 2000);
      };
      
      wsRef.current.onerror = (error) => {
        console.error('WebSocket error:', error);
        setError('Connection error occurred. Please refresh the page.');
        setIsConnected(false);
      };
    } catch (error) {
      console.error('WebSocket connection error:', error);
      setError('Failed to establish connection. Please refresh the page.');
      setIsConnected(false);
    }
  };

  const toggleRecording = async () => {
    if (isRecording) {
      await stopRecording();
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        startRecording(stream);
      } catch (err) {
        console.error('Error accessing microphone:', err);
        setError('Unable to access microphone. Please check permissions.');
      }
    }
  };

  const startRecording = (stream: MediaStream) => {
    try {
      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks: BlobPart[] = [];
      
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        sendAudioData(audioBlob);
      };

      mediaRecorder.start(1000);
      setIsRecording(true);
      setMessages(prev => [...prev, {
        role: 'system',
        content: 'Recording started...',
        timestamp: new Date().toISOString()
      }]);
    } catch (err) {
      console.error('Error starting recording:', err);
      setError('Failed to start recording. Please try again.');
    }
  };

  const stopRecording = async () => {
    try {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      }
      setIsRecording(false);
      setMessages(prev => [...prev, {
        role: 'system',
        content: 'Recording stopped, processing...',
        timestamp: new Date().toISOString()
      }]);
    } catch (err) {
      console.error('Error stopping recording:', err);
      setError('Failed to stop recording. Please refresh the page.');
    }
  };

  const sendAudioData = async (audioBlob: Blob) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      setError('Connection lost. Please refresh the page.');
      return;
    }

    try {
      wsRef.current.send(audioBlob);
    } catch (err) {
      console.error('Error sending audio data:', err);
      setError('Failed to send audio data. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg flex items-center justify-between">
            <span>{error}</span>
            <button
              onClick={() => setError(null)}
              className="text-red-700 hover:text-red-800"
            >
              ×
            </button>
          </div>
        )}

        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">
                Cultural Competency Workshop
              </h1>
              <div className="flex items-center gap-2">
                {!isConnected && (
                  <div className="flex items-center text-sm text-amber-600">
                    <Loader className="w-4 h-4 animate-spin mr-2" />
                    Connecting...
                  </div>
                )}
              </div>
            </div>

            {/* Messages Section */}
            <div className="space-y-4 mb-8 max-h-[60vh] overflow-y-auto">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`p-4 rounded-lg ${
                    msg.role === 'assistant' 
                      ? 'bg-blue-50 text-blue-700' 
                      : msg.role === 'system'
                      ? 'bg-gray-50 text-gray-600 text-sm'
                      : 'bg-white text-gray-700'
                  }`}
                >
                  {msg.content}
                  <div className="text-xs text-gray-500 mt-1">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Widgets Section */}
            <div className="space-y-6">
              {widgets.map((widget, idx) => (
                <WidgetSelector
                  key={idx}
                  type={widget.type}
                  data={widget.data}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Controls */}
        <div className="fixed bottom-6 right-6">
          <button
            onClick={toggleRecording}
            disabled={!isConnected}
            className={`p-4 rounded-full shadow-lg transition-all ${
              !isConnected
                ? 'bg-gray-400 cursor-not-allowed'
                : isRecording 
                ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {isRecording ? (
              <MicOff className="w-6 h-6 text-white" />
            ) : (
              <Mic className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}