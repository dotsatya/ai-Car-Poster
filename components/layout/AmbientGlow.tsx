export function AmbientGlow() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-b from-brand/10 via-transparent to-transparent blur-[140px] opacity-70" />
      <div className="absolute top-[1400px] left-1/4 w-[600px] h-[600px] bg-white/[0.02] blur-[150px]" />
      <div className="absolute top-[2800px] right-1/4 w-[700px] h-[600px] bg-brand/5 blur-[160px]" />
    </div>
  );
}
