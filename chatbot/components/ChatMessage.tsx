'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './ChatMessage.css';

interface ChatMessageProps {
  message: {
    type: 'user' | 'assistant';
    content: string;
    sources?: Array<{
      document: string;
      text: string;
      metadata?: Record<string, any>;
    }>;
  };
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const [showSources, setShowSources] = React.useState(false);

  const markdownComponents = {
    p: ({node, ...props}: any) => <p className="markdown-paragraph" {...props} />,
    h1: ({node, ...props}: any) => <h1 className="markdown-heading" {...props} />,
    h2: ({node, ...props}: any) => <h2 className="markdown-heading markdown-h2" {...props} />,
    h3: ({node, ...props}: any) => <h3 className="markdown-heading markdown-h3" {...props} />,
    ul: ({node, ...props}: any) => <ul className="markdown-list" {...props} />,
    ol: ({node, ...props}: any) => <ol className="markdown-list markdown-ordered" {...props} />,
    li: ({node, ...props}: any) => <li className="markdown-list-item" {...props} />,
    code: ({node, ...props}: any) => <code className="markdown-code" {...props} />,
    pre: ({node, ...props}: any) => <pre className="markdown-pre" {...props} />,
    blockquote: ({node, ...props}: any) => <blockquote className="markdown-blockquote" {...props} />,
    strong: ({node, ...props}: any) => <strong className="markdown-bold" {...props} />,
    em: ({node, ...props}: any) => <em className="markdown-italic" {...props} />,
    a: ({node, ...props}: any) => <a className="markdown-link" target="_blank" rel="noopener noreferrer" {...props} />,
  };

  return (
    <div className={`message ${message.type}-message`}>
      <div className="message-avatar">
        {message.type === 'user' ? '👤' : '🤖'}
      </div>
      <div className="message-content">
        {message.type === 'assistant' ? (
          <div className="markdown-content">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
              {message.content}
            </ReactMarkdown>
          </div>
        ) : (
          <p>{message.content}</p>
        )}
        {message.sources && message.sources.length > 0 && (
          <div className="sources-section">
            <button
              className="sources-toggle"
              onClick={() => setShowSources(!showSources)}
            >
              📚 Sources ({message.sources.length})
            </button>
            {showSources && (
              <div className="sources-list">
                {message.sources.map((source, idx) => (
                  <div key={idx} className="source-item">
                    <div className="source-document">{source.document}</div>
                    <div className="source-text">{source.text}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
