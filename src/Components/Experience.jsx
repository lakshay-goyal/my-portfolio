import React, { useRef, useEffect } from 'react';

const experiences = [
  {
    company: 'Tech Innovators Inc.',
    logo: 'https://img.icons8.com/color/48/000000/company.png',
    role: 'Senior Software Engineer',
    period: 'Jul 2022 - Present',
    location: 'Gurgaon, India',
    highlights: [
      'Led a team of 5 engineers to deliver a scalable SaaS platform.',
      'Architected and implemented microservices for high-traffic workloads.',
      'Mentored junior developers and conducted code reviews.',
    ],
    color: 'from-blue-300 via-blue-100 to-blue-50',
    dot: 'bg-blue-400',
    glow: 'shadow-blue-200',
    pin: 'bg-blue-400',
    blob: 'fill-blue-100',
  },
  {
    company: 'NextGen Solutions',
    logo: 'https://img.icons8.com/color/48/000000/company.png',
    role: 'Software Engineer',
    period: 'Jan 2020 - Jun 2022',
    location: 'Remote',
    highlights: [
      'Developed and maintained core modules for a fintech product.',
      'Collaborated with cross-functional teams for product launches.',
      'Optimized legacy codebase, improving performance by 30%.',
    ],
    color: 'from-teal-300 via-teal-100 to-teal-50',
    dot: 'bg-teal-400',
    glow: 'shadow-teal-200',
    pin: 'bg-teal-400',
    blob: 'fill-teal-100',
  },
  // Add more experiences as needed
];

const pathHeight = 600 + (experiences.length - 1) * 320;

const Experience = () => {
  const pathRef = useRef(null);

  // Animate SVG path drawing on scroll
  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const length = path.getTotalLength();
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;
    const handleScroll = () => {
      const section = document.getElementById('Experience');
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const visible = Math.max(0, windowHeight - rect.top);
      const percent = Math.min(1, visible / (rect.height || 1));
      path.style.strokeDashoffset = length * (1 - percent);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="Experience" className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-x-hidden">
      <div className="max-w-5xl mx-auto px-4 relative">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight relative inline-block">
            Experience Journey
            <span className="absolute left-1/2 -bottom-2 w-20 h-1 bg-blue-200 rounded-full -translate-x-1/2"></span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            My professional journey visualized as a unique path.
          </p>
        </div>
        {/* SVG winding path with animated drawing */}
        <svg
          width="120"
          height={pathHeight}
          viewBox={`0 0 120 ${pathHeight}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-1/2 -translate-x-1/2 z-0"
          style={{ pointerEvents: 'none' }}
        >
          <defs>
            <linearGradient id="timeline-gradient" x1="0" y1="0" x2="0" y2={pathHeight} gradientUnits="userSpaceOnUse">
              <stop stopColor="#60a5fa" />
              <stop offset="1" stopColor="#5eead4" />
            </linearGradient>
          </defs>
          <path
            ref={pathRef}
            d={`M60 40 Q 100 120 60 200 Q 20 280 60 360 Q 100 440 60 520 Q 20 600 60 ${pathHeight - 40}`}
            stroke="url(#timeline-gradient)"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            filter="url(#glow)"
            style={{ transition: 'stroke-dashoffset 0.5s cubic-bezier(0.23,1,0.32,1)' }}
          />
          {/* Dots for each experience */}
          {experiences.map((exp, idx) => {
            const y = 40 + idx * 160 * 2;
            return (
              <circle
                key={idx}
                cx="60"
                cy={y}
                r="16"
                className={exp.dot}
                style={{ filter: 'drop-shadow(0 0 16px #60a5fa88)' }}
              />
            );
          })}
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </svg>
        {/* Experience cards pinned to the path */}
        <div className="relative z-10 flex flex-col items-center" style={{ minHeight: pathHeight }}>
          {experiences.map((exp, idx) => {
            const y = 40 + idx * 160 * 2;
            const isLeft = idx % 2 === 0;
            return (
              <div
                key={idx}
                className={`absolute w-full flex ${isLeft ? 'justify-start' : 'justify-end'} animate-fade-in-up`}
                style={{ top: y - 60, animationDelay: `${idx * 0.2}s` }}
              >
                {/* Decorative SVG blob */}
                <svg width="180" height="120" viewBox="0 0 180 120" className={`absolute -z-10 -top-8 ${isLeft ? '-left-24' : '-right-24'} opacity-60 blur-sm`}>
                  <ellipse cx="90" cy="60" rx="80" ry="40" className={exp.blob} />
                </svg>
                {/* Pin connecting card to dot */}
                <div className={`absolute ${isLeft ? '-left-8' : '-right-8'} top-12 w-4 h-4 rounded-full ${exp.pin} shadow-lg border-2 border-white z-20`} />
                {/* Card */}
                <div
                  className={`relative max-w-md w-full rounded-3xl shadow-2xl border-0 bg-white/60 backdrop-blur-lg p-7 transition-transform duration-300 hover:scale-105 hover:shadow-3xl group ${exp.glow}`}
                  style={{
                    background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                    '--tw-gradient-from': `var(--tw-color-${exp.color.split(' ')[0]})`,
                    '--tw-gradient-via': `var(--tw-color-${exp.color.split(' ')[1]})`,
                    '--tw-gradient-to': `var(--tw-color-${exp.color.split(' ')[2]})`,
                    borderLeft: `6px solid #60a5fa`,
                    transformStyle: 'preserve-3d',
                  }}
                  onMouseMove={e => {
                    const card = e.currentTarget;
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = ((y - centerY) / centerY) * 8;
                    const rotateY = ((x - centerX) / centerX) * -8;
                    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = '';
                  }}
                >
                  <div className="flex items-center gap-4 mb-2">
                    <img src={exp.logo} alt={exp.company} className="w-12 h-12 rounded-full shadow-lg border-2 border-white/80 bg-white/80" />
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 leading-tight">{exp.role}</h3>
                      <span className="text-sm text-gray-600 font-medium">@ {exp.company}</span>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <span className="text-xs text-gray-500 font-medium">{exp.period}</span>
                    <span className="text-xs text-gray-400 mt-1 md:mt-0">{exp.location}</span>
                  </div>
                  <ul className="list-disc pl-5 text-gray-700 space-y-1 mt-2">
                    {exp.highlights.map((point, i) => (
                      <li key={i} className="leading-relaxed">{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Animation keyframes */}
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(40px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
      `}</style>
    </section>
  );
};

export default Experience; 