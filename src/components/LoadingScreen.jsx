export default function LoadingScreen({ text = 'Loading...' }) {
  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#222831]/95 backdrop-blur-sm">
      <div className="flex flex-col items-center">

        {/* Rotating Football */}
        <div className="ticket-loading-ball">
          ⚽
        </div>

        {/* Custom Text */}
        <p className="mt-5 text-center text-[11px] font-black uppercase tracking-[4px] text-white">
          {text}
        </p>

        {/* Loading Line */}
        <div className="mt-4 h-[2px] w-32 overflow-hidden bg-white/20">
          <div className="animate-loading-line h-full w-full bg-[#ee1e46]" />
        </div>

      </div>
    </div>
  )
}