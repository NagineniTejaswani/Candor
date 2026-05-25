import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const entries = [
  {
    text: "Today I felt invisible at work. Like everything I did just disappeared into the room without anyone noticing.",
    ai: "💭 That kind of invisibility is one of the loneliest feelings — putting effort into something and watching it dissolve without a ripple. Your work matters even when no one says so. Tonight, write one thing you did today that you're quietly proud of, even if nobody saw it.",
    mood: "lonely",
    score: "3/10",
  },
  {
    text: "I met my old school friends today. We laughed until we cried and I forgot what stress felt like for a few hours.",
    ai: "😊 There's something irreplaceable about people who knew you before life got complicated. That laughter wasn't just fun — it was your soul remembering who it is. Carry a little of that lightness into tomorrow.",
    mood: "joyful",
    score: "9/10",
  },
  {
    text: "I don't know why but I cried today for no reason. Everything is fine but something feels heavy and I can't explain it.",
    ai: "🌧️ Sometimes the body carries what the mind hasn't processed yet. There doesn't need to be a reason for the weight — it's enough that you feel it. Be gentle with yourself tonight.",
    mood: "emotional",
    score: "4/10",
  },
];

const Landing = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const typedRef = useRef(null);
  const aiRef = useRef(null);
  const moodRef = useRef(null);
  const scoreRef = useRef(null);
  const moodRowRef = useRef(null);

  useEffect(() => {
    if (token) navigate('/dashboard');
  }, [token]);

  useEffect(() => {
    let entryIdx = 0;
    let charIdx = 0;
    let phase = 'typing';
    let timer;

    const run = () => {
      const entry = entries[entryIdx];
      const typed = typedRef.current;
      const aiEl = aiRef.current;
      const moodRow = moodRowRef.current;
      if (!typed) return;

      if (phase === 'typing') {
        if (charIdx <= entry.text.length) {
          typed.innerHTML = entry.text.slice(0, charIdx) +
            '<span class="inline-block w-0.5 h-4 bg-amber-400 ml-0.5 align-middle animate-pulse"></span>';
          charIdx++;
          timer = setTimeout(run, 38);
        } else {
          phase = 'showing';
          timer = setTimeout(run, 700);
        }
      } else if (phase === 'showing') {
        typed.innerHTML = entry.text;
        aiEl.textContent = entry.ai;
        aiEl.style.opacity = '1';
        moodRef.current.textContent = entry.mood;
        scoreRef.current.textContent = `mood score: ${entry.score}`;
        moodRow.style.opacity = '1';
        phase = 'waiting';
        timer = setTimeout(run, 4500);
      } else {
        entryIdx = (entryIdx + 1) % entries.length;
        charIdx = 0;
        phase = 'typing';
        aiEl.style.opacity = '0';
        moodRow.style.opacity = '0';
        typed.innerHTML = '';
        timer = setTimeout(run, 400);
      }
    };

    run();
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#0d0d0f] text-[#e8e4de] flex flex-col">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-[#c9a96e]/10">
        <div className="flex items-center gap-3">
          <span style={{fontFamily:"'Cormorant Garamond', serif"}} className="text-[#c9a96e] text-2xl font-light tracking-widest italic">Candor</span>
          <span className="text-[#666] text-xs">/ honest reflection</span>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => navigate('/login')}
            className="px-5 py-2 rounded-full text-xs border border-[#c9a96e]/25 text-[#c9a96e] hover:bg-[#c9a96e]/10 transition-all"
          >
            log in
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="px-5 py-2 rounded-full text-xs border border-[#c9a96e]/40 bg-[#c9a96e]/10 text-[#e8c98a] hover:bg-[#c9a96e]/20 transition-all"
          >
            get started
          </button>
        </div>
      </nav>

      {/* Hero */}
      {/* Hero */}
<div className="flex flex-col lg:flex-row items-center gap-12 px-8 pt-16 pb-12 max-w-6xl mx-auto w-full">
  
  {/* Left side — text */}
  <div className="flex-1 text-left">
    <p className="text-[10px] tracking-[0.2em] text-[#c9a96e]/60 uppercase mb-5">
      your private space to feel
    </p>
    <h1 
  style={{fontFamily:"'Cormorant Garamond', serif"}}
  className="text-6xl font-light leading-none mb-4 gap-0"
>
  Write what you<br />
  can't say to<br />
  <span className="italic text-[#c9a96e]">anyone.</span>
</h1>
    <p className="text-sm text-[#666] leading-relaxed mb-8 max-w-sm">
      Most feelings stay locked inside — not because you don't want to share,
      but because the world isn't always safe to be honest in.
      <span className="text-[#888]"> Candor listens. Without judgment. Without advice. Without telling a soul.</span>
    </p>
    <div className="flex gap-3">
      <button
        onClick={() => navigate('/signup')}
        className="px-7 py-2.5 rounded-full text-sm border border-[#c9a96e]/40 bg-[#c9a96e]/10 text-[#e8c98a] hover:bg-[#c9a96e]/20 transition-all"
      >
        begin writing →
      </button>
      <button
        onClick={() => navigate('/login')}
        className="px-7 py-2.5 rounded-full text-sm border border-white/8 text-[#666] hover:text-[#888] transition-all"
      >
        log in
      </button>
    </div>
  </div>

  {/* Right side — live preview card */}
  <div className="flex-1 w-full">
    <div className="w-full bg-white/[0.02] border border-[#c9a96e]/12 rounded-2xl p-6 text-left">
      <p className="text-[9px] tracking-[0.15em] text-[#c9a96e]/50 uppercase mb-3">
        a journal entry
      </p>
      <p
        ref={typedRef}
        className="text-sm text-[#777] italic leading-relaxed min-h-[60px]"
      />
      <div className="h-px bg-[#c9a96e]/10 my-4" />
      <p className="text-[9px] tracking-[0.15em] text-[#c9a96e]/50 uppercase mb-2">
        candor reflects
      </p>
      <p
        ref={aiRef}
        className="text-xs text-[#b8a882] leading-relaxed transition-opacity duration-700"
        style={{ opacity: 0 }}
      />
      <div
        ref={moodRowRef}
        className="flex items-center gap-3 mt-4 transition-opacity duration-700"
        style={{ opacity: 0 }}
      >
        <span
          ref={moodRef}
          className="text-[10px] px-3 py-1 rounded-full border border-[#c9a96e]/25 bg-[#c9a96e]/8 text-[#c9a96e]"
        />
        <span
          ref={scoreRef}
          className="text-[10px] text-[#555]"
        />
      </div>
    </div>
  </div>

</div>

      {/* Features */}
      <div className="grid grid-cols-3 gap-3 px-8 pb-10 max-w-6xl mx-auto w-full">
        {[
          { icon: '✦', title: 'Write freely', desc: 'No prompts. No structure. Just an open page and your honest words.' },
          { icon: '◈', title: 'AI reads between the lines', desc: 'Not advice. Not diagnosis. A warm reflection of what you actually feel.' },
          { icon: '◎', title: 'Watch yourself grow', desc: 'Mood scores over time reveal patterns you never noticed about yourself.' },
        ].map((f, i) => (
          <div key={i} className="bg-white/[0.02] border border-white/5 rounded-xl p-4">
            <div className="text-[#c9a96e]/60 text-base mb-2">{f.icon}</div>
            <div className="text-xs font-medium text-[#ccc] mb-1">{f.title}</div>
            <div className="text-[11px] text-[#555] leading-relaxed">{f.desc}</div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center px-8 py-4 border-t border-white/5 max-w-6xl mx-auto w-full">
        <span className="text-[11px] text-[#333]">no data sold. no ads. ever.</span>
        <span className="text-[11px] text-[#c9a96e]/40">made with honest intent 🕯️</span>
      </div>
    </div>
  );
};

export default Landing;