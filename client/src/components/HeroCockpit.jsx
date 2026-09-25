import React from 'react';

export default function HeroCockpit() {
  return (
    <div
      className="relative mx-auto aspect-[1.18] w-full max-w-[560px] float-slow"
      aria-label="Illustration of a motorcycle cockpit"
    >
      <div className="absolute left-[6%] top-[21%] h-[58%] w-[86%] rotate-[-7deg] rounded-[42%] border-[22px] border-[hsl(76_83%_48%)] bg-[hsl(215_34%_18%)] shadow-[20px_28px_0_hsl(14_88%_62%)]" />
      <div className="absolute left-[22%] top-[34%] h-[28%] w-[58%] rotate-[-7deg] rounded-[50%] border-[12px] border-[hsl(45_44%_93%)] bg-[hsl(215_41%_14%)]" />
      <div className="absolute left-[40%] top-[14%] h-[52%] w-[8%] rotate-[15deg] rounded-full bg-[hsl(45_44%_93%)]" />
      <div className="absolute left-[28%] top-[17%] h-[12%] w-[35%] rotate-[9deg] rounded-full bg-[hsl(76_83%_48%)]" />
      <div className="absolute bottom-[11%] left-[13%] h-5 w-[74%] rotate-[-4deg] rounded-full bg-[hsl(45_44%_93%)]" />
      <div className="absolute right-[5%] top-[18%] h-11 w-11 rounded-full border-4 border-[hsl(14_88%_62%)] bg-[hsl(215_41%_14%)]" />
      <div className="absolute bottom-[2%] left-[2%] rotate-[-8deg] font-mono text-[10px] font-bold uppercase tracking-[.32em] text-[hsl(45_44%_93%/.55)]">
        ride / maintain / repeat
      </div>
    </div>
  );
}
