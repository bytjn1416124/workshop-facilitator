'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Mic, MicOff } from 'lucide-react';
import { WidgetSelector } from '@/components/ui/widgets';

export default function WorkshopPage() {
  const [messages, setMessages] = useState([]);
  const [widgets, setWidgets] = useState([]);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/api/v1/ws');
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (data.type === 'text') {
        setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
      } else if (data.type === 'widget') {
        setWidgets(prev => [...prev, data.content]);
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  const toggleRecording = async () => {
    setIsRecording(!isRecording);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8">
          <CardContent className="p-6">
            <h1 className="text-2xl font-bold mb-6">
              Cultural Competency Workshop
            </h1>
            
            {/* Messages Section */}
            <div className="space-y-4 mb-8">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`p-3 rounded ${
                    msg.role === 'assistant' 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'bg-gray-50 text-gray-700'
                  }`}
                >
                  {msg.content}
                </div>
              ))}
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
            className={`p-4 rounded-full shadow-lg ${
              isRecording 
                ? 'bg-red-500 hover:bg-red-600' 
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