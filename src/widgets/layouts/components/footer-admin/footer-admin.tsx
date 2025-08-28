import { CubeDevelopmentIcon } from "@shared/assets";
import { FC } from "react";

export const FooterAdmin: FC = () => {
  return (
    <footer
      className="relative px-8 py-12 overflow-hidden border-t border-cyan-700/50"
      style={{ background: "var(--Gradients-Gradient-5)" }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-cyan-200/10 to-white/5"></div>
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground aspect-square size-16">
              <CubeDevelopmentIcon className="size-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-white via-cyan-100 to-cyan-200 bg-clip-text">
                Cube Development
              </h1>
              <p className="text-cyan-200/80">Premium Administrative Suite</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-10 md:grid-cols-4">
          <div className="p-4 transition-all duration-300 border bg-cyan-800/40 backdrop-blur-sm rounded-xl border-cyan-600/40 group hover:border-blue-400/60">
            <div className="flex items-center justify-center w-10 h-10 mb-3 transition-colors bg-blue-500/20 rounded-xl group-hover:bg-blue-500/30">
              <div className="w-5 h-5 bg-blue-500 rounded-lg"></div>
            </div>
            <p className="text-lg font-bold text-white">Enterprise</p>
            <p className="text-xs text-cyan-200/70">Edition</p>
          </div>

          <div className="p-4 transition-all duration-300 border bg-cyan-800/40 backdrop-blur-sm rounded-xl border-cyan-600/40 group hover:border-emerald-400/60">
            <div className="flex items-center justify-center w-10 h-10 mb-3 transition-colors bg-emerald-500/20 rounded-xl group-hover:bg-emerald-500/30">
              <div className="w-5 h-5 rounded-lg bg-emerald-500"></div>
            </div>
            <p className="text-lg font-bold text-white">Secure</p>
            <p className="text-xs text-cyan-200/70">Platform</p>
          </div>

          <div className="p-4 transition-all duration-300 border bg-cyan-800/40 backdrop-blur-sm rounded-xl border-cyan-600/40 group hover:border-purple-400/60">
            <div className="flex items-center justify-center w-10 h-10 mb-3 transition-colors bg-purple-500/20 rounded-xl group-hover:bg-purple-500/30">
              <div className="w-5 h-5 bg-purple-500 rounded-lg"></div>
            </div>
            <p className="text-lg font-bold text-white">24/7</p>
            <p className="text-xs text-cyan-200/70">Support</p>
          </div>

          <div className="p-4 transition-all duration-300 border bg-cyan-800/40 backdrop-blur-sm rounded-xl border-cyan-600/40 group hover:border-orange-400/60">
            <div className="flex items-center justify-center w-10 h-10 mb-3 transition-colors bg-orange-500/20 rounded-xl group-hover:bg-orange-500/30">
              <div className="w-5 h-5 bg-orange-500 rounded-lg"></div>
            </div>
            <p className="text-lg font-bold text-white">Global</p>
            <p className="text-xs text-cyan-200/70">Network</p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between pt-8 border-t md:flex-row border-cyan-600/40">
          <p className="mb-4 text-sm text-cyan-200/60 md:mb-0">
            © 2024 Cube Development • Version 1.0
          </p>
        </div>
      </div>
    </footer>
  );
};
