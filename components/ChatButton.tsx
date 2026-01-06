export default function ChatButton() {
  return (
    <button className="fixed bottom-8 right-8 w-16 h-16 bg-accent text-white rounded-full shadow-lg shadow-accent/25 hover:scale-110 transition-all z-50 flex items-center justify-center group" aria-label="Open chat">
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
      <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-20"></span>
    </button>
  );
}