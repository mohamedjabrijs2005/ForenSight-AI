import { Outlet } from 'react-router-dom';
import { Shield } from 'lucide-react';

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-[#f0f4f9] flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Header / Logo */}
      <div className="w-full max-w-2xl text-center mb-10">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="p-3 bg-white rounded-2xl shadow-sm border border-border">
            <Shield className="w-10 h-10 text-primary" />
          </div>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
          ForenSight AI Command Center
        </h2>
        <p className="mt-3 text-sm md:text-base text-muted-foreground font-medium">
          Secure Government Portal • Crime Analytics & Visualization Platform
        </p>
      </div>

      {/* Main Login Form - Broad & Wider */}
      <div className="w-full max-w-2xl">
        <div className="bg-white py-12 px-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)] sm:rounded-[24px] sm:px-16 border border-border/50">
          <Outlet />
        </div>
      </div>

      {/* Downside YouTube Video */}
      <div className="w-full max-w-2xl mt-12">
        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4 text-center">
          Platform Overview
        </h3>
        <div className="relative w-full rounded-2xl overflow-hidden shadow-lg border border-border bg-muted/50 aspect-video">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/YcwmJ5TvFpQ?autoplay=0&mute=1"
            title="ForenSight AI Platform Overview"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full max-w-2xl mt-10">
        <p className="text-center text-xs text-muted-foreground font-medium">
          Unauthorized access is strictly prohibited.<br />
          &copy; {new Date().getFullYear()} ForenSight AI Systems. All rights reserved.
        </p>
      </div>

    </div>
  );
}
