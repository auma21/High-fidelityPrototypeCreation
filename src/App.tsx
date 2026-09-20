import { useState } from 'react'

type Screen =
  | 'welcome'
  | 'skills'
  | 'projects'
  | 'recommendation'
  | 'why-team'
  | 'balance'
  | 'alternatives'
  | 'ai-info'
  | 'confirmed'

const NAV_LINKS = ['About', 'How It Works', 'Privacy']

function Nav({ onNav }: { onNav?: () => void }) {
  return (
    <nav className="flex items-center justify-between px-6 py-3 border-b border-slate-200 bg-white">
      <span className="font-semibold text-blue-600 text-sm tracking-tight">TeamForge AI</span>
      <div className="flex gap-5">
        {NAV_LINKS.map(l => (
          <button key={l} onClick={onNav} className="text-xs text-slate-500 hover:text-slate-800 transition-colors">
            {l}
          </button>
        ))}
      </div>
    </nav>
  )
}

function Pill({ children, active }: { children: React.ReactNode; active?: boolean }) {
  return (
    <span
      className={`inline-block text-xs px-2.5 py-0.5 rounded-full border font-medium ${
        active
          ? 'bg-blue-600 text-white border-blue-600'
          : 'bg-white text-slate-600 border-slate-300'
      }`}
    >
      {children}
    </span>
  )
}

function SkillBar({ label, current, required, status }: { label: string; current: number; required: number; status: 'Good' | 'Gap' | 'Strong' }) {
  const color = status === 'Gap' ? '#f59e0b' : status === 'Strong' ? '#10b981' : '#2563eb'
  return (
    <div className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-4 py-2">
      <span className="text-sm text-slate-700">{label}</span>
      <div className="w-28">
        <div className="skill-bar">
          <div className="skill-bar-fill" style={{ width: `${current}%`, background: color }} />
        </div>
      </div>
      <div className="w-28">
        <div className="skill-bar">
          <div className="skill-bar-fill" style={{ width: `${required}%`, background: '#cbd5e1' }} />
        </div>
      </div>
      <span
        className={`text-xs font-medium w-10 text-right ${
          status === 'Gap' ? 'text-amber-500' : status === 'Strong' ? 'text-emerald-600' : 'text-blue-600'
        }`}
      >
        {status}
      </span>
    </div>
  )
}

function Avatar({ name, role, color }: { name: string; role: string; color: string }) {
  const initials = name.split(' ').map(n => n[0]).join('')
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-sm"
        style={{ background: color }}
      >
        {initials}
      </div>
      <div className="text-center">
        <p className="text-xs font-medium text-slate-800">{name}</p>
        <p className="text-[10px] text-slate-500">{role}</p>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Screen 01 – Welcome
// ─────────────────────────────────────────────
function WelcomeScreen({ go }: { go: (s: Screen) => void }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Nav />
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center max-w-xl mx-auto gap-6">
        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-slate-900 leading-tight" style={{ fontFamily: 'DM Serif Display, serif' }}>
          Build the right team.<br />
          <span className="text-blue-600">Understand the match.</span><br />
          Grow together.
        </h1>
        <p className="text-slate-500 text-base leading-relaxed max-w-sm">
          TeamForge AI helps Capstone students discover complementary teammates using skills, project interests, preferred roles and development goals.
        </p>
        <div className="flex gap-3 mt-2">
          <button
            onClick={() => go('skills')}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors shadow-sm"
          >
            Create My Profile
          </button>
          <button
            onClick={() => go('projects')}
            className="border border-slate-300 hover:border-blue-400 text-slate-700 hover:text-blue-600 text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
          >
            Browse Projects
          </button>
        </div>
        <p className="text-xs text-slate-400 mt-4 max-w-xs leading-relaxed">
          TeamForge AI provides recommendations only. You remain in control of your final team choice.
        </p>
        <button onClick={() => go('ai-info')} className="text-xs text-blue-500 underline underline-offset-2">
          How does TeamForge use AI?
        </button>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Screen 02 – Student Skills Profile
// ─────────────────────────────────────────────
function SkillsScreen({ go }: { go: (s: Screen) => void }) {
  const [skills, setSkills] = useState({ python: 'Advanced', ml: 'Intermediate', dataviz: 'Intermediate', react: 'Beginner' })
  const [roles, setRoles] = useState(['Data Scientist', 'Frontend Developer'])
  const [devSkills, setDevSkills] = useState(['React', 'Cloud'])
  const [interests] = useState(['AI / ML', 'Sustainability'])
  const [avail, setAvail] = useState({ mon: true, tue: true, wed: false, thu: true, fri: false })

  const levels = ['Beginner', 'Intermediate', 'Advanced']
  const allRoles = ['Data Scientist', 'Machine Learning Engineer', 'Frontend Developer', 'Backend Developer', 'UI Designer', 'UX Researcher']

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Nav />
      <div className="flex-1 max-w-3xl mx-auto w-full px-6 py-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-1">Create Your TeamForge Profile</h2>
        <p className="text-sm text-slate-500 mb-8">Help us understand your skills and goals to find your ideal team.</p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Existing Skills */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-800 mb-4">Existing Skills</h3>
            <div className="space-y-3">
              {Object.entries(skills).map(([skill, level]) => (
                <div key={skill} className="flex items-center justify-between gap-3">
                  <span className="text-sm text-slate-700 capitalize w-24">{skill === 'ml' ? 'Machine Learning' : skill === 'dataviz' ? 'Data Visualization' : skill}</span>
                  <select
                    value={level}
                    onChange={e => setSkills(s => ({ ...s, [skill]: e.target.value }))}
                    className="flex-1 text-xs border border-slate-200 rounded-lg px-2 py-1.5 bg-slate-50 text-slate-700 focus:outline-none focus:border-blue-400"
                  >
                    {levels.map(l => <option key={l}>{l}</option>)}
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* Preferred Roles */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-800 mb-4">Preferred Roles</h3>
            <div className="flex flex-wrap gap-2">
              {allRoles.map(r => (
                <button
                  key={r}
                  onClick={() => setRoles(prev => prev.includes(r) ? prev.filter(x => x !== r) : [...prev, r])}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                    roles.includes(r)
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-slate-600 border-slate-300 hover:border-blue-300'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Skills to Develop */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-800 mb-4">Skills I Want to Develop</h3>
            <div className="flex flex-wrap gap-2">
              {['React', 'Cloud', 'Product Management', 'DevOps', 'AI/ML', 'UX Research', 'Data Engineering'].map(s => (
                <button
                  key={s}
                  onClick={() => setDevSkills(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                    devSkills.includes(s)
                      ? 'bg-emerald-500 text-white border-emerald-500'
                      : 'bg-white text-slate-600 border-slate-300 hover:border-emerald-300'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Project Interests */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-800 mb-4">Project Interests</h3>
            <div className="flex flex-wrap gap-2">
              {['AI / ML', 'Healthcare', 'Sustainability', 'EdTech', 'FinTech', 'Web3', 'Social Impact'].map(i => (
                <span
                  key={i}
                  className={`text-xs px-3 py-1.5 rounded-full border cursor-pointer transition-colors ${
                    interests.includes(i)
                      ? 'bg-violet-600 text-white border-violet-600'
                      : 'bg-white text-slate-600 border-slate-300 hover:border-violet-300'
                  }`}
                >
                  {i}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Availability */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm mt-6">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">Availability</h3>
          <div className="flex gap-3">
            {Object.entries(avail).map(([day, active]) => (
              <button
                key={day}
                onClick={() => setAvail(a => ({ ...a, [day]: !a[day as keyof typeof a] }))}
                className={`w-10 h-10 rounded-xl text-xs font-semibold uppercase transition-colors ${
                  active
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Privacy note */}
        <div className="flex items-start gap-3 mt-5 p-4 bg-blue-50 rounded-xl border border-blue-100">
          <svg className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" />
          </svg>
          <p className="text-xs text-blue-700 leading-relaxed">
            We use your skills, preferred roles, learning goals, project interests and availability to find complementary teammates.
          </p>
        </div>

        <div className="flex justify-between mt-8">
          <button onClick={() => go('welcome')} className="text-sm text-slate-500 hover:text-slate-700 transition-colors">
            ← Back
          </button>
          <button
            onClick={() => go('projects')}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-8 py-2.5 rounded-lg transition-colors shadow-sm"
          >
            Save Profile & Browse Projects
          </button>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Screen 03 – Project Browser
// ─────────────────────────────────────────────
function ProjectsScreen({ go }: { go: (s: Screen) => void }) {
  const [search, setSearch] = useState('')
  const [activeTag, setActiveTag] = useState('All')

  const tags = ['All', 'AI', 'Data Science', 'Web', 'Healthcare']
  const projects = [
    {
      id: 1,
      title: 'Responsible AI Learning Platform',
      desc: 'An educational platform to help students learn about responsible AI through interactive tools and real-world scenarios.',
      skills: ['Python', 'React', 'AI', 'UX'],
      compat: 82,
      category: 'AI',
    },
    {
      id: 2,
      title: 'Campus Sustainability Tracker',
      desc: 'A web application to track and visualize campus sustainability metrics, energy usage, and carbon footprint in real time.',
      skills: ['Vue.js', 'Data Viz', 'API', 'UX'],
      compat: 74,
      category: 'Data Science',
    },
    {
      id: 3,
      title: 'Patient Triage Assistant',
      desc: 'ML-powered tool for hospital emergency departments to assist with patient prioritization based on symptoms and vitals.',
      skills: ['Python', 'ML', 'Healthcare APIs'],
      compat: 68,
      category: 'Healthcare',
    },
    {
      id: 4,
      title: 'Open Source Contribution Dashboard',
      desc: 'A dashboard helping developers track contributions across GitHub repos and discover high-impact open source issues.',
      skills: ['React', 'GraphQL', 'TypeScript'],
      compat: 61,
      category: 'Web',
    },
  ]

  const filtered = projects.filter(p => {
    const matchTag = activeTag === 'All' || p.category === activeTag
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.desc.toLowerCase().includes(search.toLowerCase())
    return matchTag && matchSearch
  })

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Nav />
      <div className="flex-1 max-w-2xl mx-auto w-full px-6 py-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-1">Find a Capstone Project</h2>
        <p className="text-sm text-slate-500 mb-6">Browse available projects and see how well your skills match each team's needs.</p>

        <div className="relative mb-4">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search projects by keyword..."
            className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
          />
        </div>

        <div className="flex gap-2 mb-6">
          {tags.map(t => (
            <button
              key={t}
              onClick={() => setActiveTag(t)}
              className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-colors ${
                activeTag === t
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-slate-600 border-slate-300 hover:border-blue-300'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map(p => (
            <div key={p.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="font-semibold text-slate-900 text-sm leading-snug">{p.title}</h3>
                <span className="shrink-0 text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">
                  {p.compat}% match
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-3 leading-relaxed">{p.desc}</p>
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {p.skills.map(s => (
                    <span key={s} className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                      {s}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 shrink-0">
                  <button className="text-xs text-slate-500 border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors">
                    View Project
                  </button>
                  <button
                    onClick={() => go('recommendation')}
                    className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Explore Team
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Screen 04 – Team Recommendation
// ─────────────────────────────────────────────
function RecommendationScreen({ go }: { go: (s: Screen) => void }) {
  const members = [
    { name: 'Tunde A.', role: 'Java / AI', color: '#7c3aed' },
    { name: 'Priya S.', role: 'Frontend / UX', color: '#0891b2' },
    { name: 'Sam B.', role: 'Backend', color: '#16a34a' },
    { name: 'Mei C.', role: 'Cloud / DevOps', color: '#ea580c' },
  ]

  const coverage = [
    { label: 'AI / ML', pct: 82 },
    { label: 'Frontend', pct: 90 },
    { label: 'Backend', pct: 75 },
    { label: 'UX', pct: 70 },
    { label: 'DevOps', pct: 55 },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Nav />
      <div className="flex-1 max-w-2xl mx-auto w-full px-6 py-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-1">Recommended Team Option</h2>
        <p className="text-sm text-slate-500 mb-8">Based on your profile and project requirements.</p>

        {/* Members */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-5">
          <div className="flex justify-around mb-6">
            {members.map(m => <Avatar key={m.name} {...m} />)}
          </div>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2">
              <span className="text-sm font-bold text-emerald-700">82%</span>
              <span className="text-xs text-emerald-600">Team Compatibility</span>
            </div>
          </div>
        </div>

        {/* Coverage + Why */}
        <div className="grid md:grid-cols-2 gap-5 mb-5">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-800 mb-3">Team Coverage</h3>
            <div className="space-y-2.5">
              {coverage.map(c => (
                <div key={c.label} className="flex items-center gap-3">
                  <span className="text-xs text-slate-600 w-16">{c.label}</span>
                  <div className="flex-1 skill-bar">
                    <div className="skill-bar-fill bg-blue-500" style={{ width: `${c.pct}%` }} />
                  </div>
                  <span className="text-[10px] text-slate-400 w-7 text-right">{c.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-800 mb-3">Why This Team?</h3>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex gap-2 items-start"><span className="text-blue-500 mt-0.5">✓</span> Complementary technical skills</li>
              <li className="flex gap-2 items-start"><span className="text-blue-500 mt-0.5">✓</span> Compatible role preferences</li>
              <li className="flex gap-2 items-start"><span className="text-blue-500 mt-0.5">✓</span> Compatible availability</li>
              <li className="flex gap-2 items-start"><span className="text-blue-500 mt-0.5">✓</span> Shared project interest</li>
              <li className="flex gap-2 items-start"><span className="text-blue-500 mt-0.5">✓</span> Opportunity for skill development</li>
            </ul>

            <div className="mt-4 pt-4 border-t border-slate-100">
              <p className="text-[10px] text-slate-400">
                Required Skills: Python · React · AI · UX Concepts
              </p>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 text-xs text-amber-700 mb-5 flex items-center gap-2">
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" />
          </svg>
          Recommendation confidence: <strong>Medium</strong> — based on 4 matched profiles
        </div>

        <div className="flex gap-3">
          <button onClick={() => go('why-team')} className="flex-1 border border-blue-300 text-blue-600 text-sm font-medium py-2.5 rounded-xl hover:bg-blue-50 transition-colors">
            Why This Team?
          </button>
          <button onClick={() => go('alternatives')} className="flex-1 border border-slate-300 text-slate-600 text-sm font-medium py-2.5 rounded-xl hover:bg-slate-50 transition-colors">
            Explore Alternative Team
          </button>
          <button onClick={() => go('balance')} className="flex-1 border border-slate-300 text-slate-600 text-sm font-medium py-2.5 rounded-xl hover:bg-slate-50 transition-colors">
            View Team Balance
          </button>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Screen 05 – Why This Team?
// ─────────────────────────────────────────────
function WhyTeamScreen({ go }: { go: (s: Screen) => void }) {
  const reasons = [
    {
      icon: '🧠',
      title: 'Skills',
      desc: 'Your combined skills cover your project requirements, with good query density across technical areas.',
    },
    {
      icon: '🎯',
      title: 'Roles',
      desc: 'Your preferred roles are complementary and cover a balanced, full-stack team with no role sent to overlap.',
    },
    {
      icon: '🗓️',
      title: 'Availability',
      desc: 'Your schedules have compatible free time allowing for regular collaboration.',
    },
    {
      icon: '📈',
      title: 'Learning Opportunity',
      desc: 'This team offers a learning opportunity to grow your skills, particularly in DevOps.',
      highlight: true,
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Nav />
      <div className="flex-1 max-w-xl mx-auto w-full px-6 py-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-1">Why Was This Team Recommended?</h2>
        <p className="text-sm text-slate-500 mb-8">Here's the reasoning behind your match.</p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {reasons.map(r => (
            <div
              key={r.title}
              className={`rounded-2xl border p-4 shadow-sm ${
                r.highlight
                  ? 'bg-blue-50 border-blue-200'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="text-2xl mb-2">{r.icon}</div>
              <h3 className={`text-sm font-semibold mb-1 ${r.highlight ? 'text-blue-800' : 'text-slate-800'}`}>
                {r.title}
              </h3>
              <p className={`text-xs leading-relaxed ${r.highlight ? 'text-blue-700' : 'text-slate-500'}`}>
                {r.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-slate-800 text-slate-300 rounded-2xl p-5 text-xs leading-relaxed mb-8">
          <p className="text-slate-400 mb-1 font-medium text-[10px] uppercase tracking-wider">Transparency note</p>
          These recommendations are advisory. You can access the cause, explore and refine, or reject it. You remain in control of your final choice.
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => go('confirmed')}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
          >
            Accept Team
          </button>
          <button
            onClick={() => go('alternatives')}
            className="flex-1 border border-slate-300 text-slate-600 text-sm font-medium py-2.5 rounded-xl hover:bg-slate-50 transition-colors"
          >
            Explore Alternatives
          </button>
          <button
            onClick={() => go('projects')}
            className="flex-1 border border-slate-300 text-slate-600 text-sm font-medium py-2.5 rounded-xl hover:bg-slate-50 transition-colors"
          >
            Not For Me
          </button>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Screen 06 – Team Balance Dashboard
// ─────────────────────────────────────────────
function BalanceScreen({ go }: { go: (s: Screen) => void }) {
  const skills = [
    { label: 'Python', current: 85, required: 80, status: 'Good' as const },
    { label: 'AI / ML', current: 75, required: 70, status: 'Good' as const },
    { label: 'Backend', current: 65, required: 70, status: 'Good' as const },
    { label: 'Frontend', current: 80, required: 85, status: 'Good' as const },
    { label: 'UX', current: 60, required: 65, status: 'Good' as const },
    { label: 'DevOps', current: 30, required: 60, status: 'Gap' as const },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Nav />
      <div className="flex-1 max-w-2xl mx-auto w-full px-6 py-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-1">Team Balance Dashboard</h2>
        <p className="text-sm text-slate-500 mb-8">How your team's skills align with project requirements.</p>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-5">
          <div className="grid grid-cols-[1fr_auto_auto_auto] text-[10px] font-semibold text-slate-400 uppercase tracking-wider gap-4 pb-3 border-b border-slate-100 mb-1">
            <span>Skill Area</span>
            <span className="w-28">Current</span>
            <span className="w-28">Required</span>
            <span className="w-10 text-right">Status</span>
          </div>
          {skills.map(s => <SkillBar key={s.label} {...s} />)}
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-8">
          <div className="flex items-start gap-3">
            <span className="text-xl">💡</span>
            <div>
              <h3 className="text-sm font-semibold text-amber-900 mb-1">Development Opportunity</h3>
              <p className="text-xs text-amber-800 leading-relaxed">
                This team has a DevOps skills gap. This could be a great learning opportunity for team members interested in developing cloud and deployment skills.
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={() => go('skills')} className="flex-1 border border-blue-300 text-blue-600 text-sm font-medium py-2.5 rounded-xl hover:bg-blue-50 transition-colors">
            View Development Plan
          </button>
          <button onClick={() => go('recommendation')} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors">
            Back to Recommendation
          </button>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Screen 07 – Alternative Teams
// ─────────────────────────────────────────────
function AlternativesScreen({ go }: { go: (s: Screen) => void }) {
  const options = [
    {
      label: 'Option A',
      desc: 'Strong technical coverage with experienced team members.',
      tags: ['High Tech', 'Experienced'],
      color: '#2563eb',
    },
    {
      label: 'Option B',
      desc: 'Higher learning opportunity with diverse skill development potential.',
      tags: ['Learning', 'Diverse'],
      color: '#7c3aed',
    },
    {
      label: 'Option C',
      desc: 'Strong schedule compatibility and shared project interests.',
      tags: ['Schedule Fit', 'Interests'],
      color: '#0891b2',
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Nav />
      <div className="flex-1 max-w-xl mx-auto w-full px-6 py-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-1">Explore Alternative Teams</h2>
        <p className="text-sm text-slate-500 mb-8">Each option has a different strength profile. Compare and choose what fits your goals.</p>

        <div className="space-y-3 mb-6">
          {options.map(o => (
            <div key={o.label} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold shrink-0"
                style={{ background: o.color }}
              >
                {o.label.split(' ')[1]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800 mb-0.5">{o.label}</p>
                <p className="text-xs text-slate-500 leading-relaxed mb-2">{o.desc}</p>
                <div className="flex gap-1.5">
                  {o.tags.map(t => (
                    <span key={t} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{t}</span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => go('recommendation')}
                className="shrink-0 text-xs font-medium text-blue-600 border border-blue-200 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors"
              >
                View
              </button>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs text-blue-700 leading-relaxed mb-8 flex items-start gap-2">
          <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" />
          </svg>
          TeamForge does not assume that one team is objectively correct. Compare options and choose the team that best suits your goals.
        </div>

        <button onClick={() => go('recommendation')} className="w-full border border-slate-300 text-slate-600 text-sm font-medium py-2.5 rounded-xl hover:bg-slate-50 transition-colors">
          ← Back to Recommendation
        </button>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Screen 08 – How TeamForge Uses AI
// ─────────────────────────────────────────────
function AiInfoScreen({ go }: { go: (s: Screen) => void }) {
  const used = [
    'Skills & proficiency',
    'Role preferences',
    'Learning goals',
    'Availability schedule',
    'Project interests',
  ]
  const notUsed = [
    'Name / identity',
    'Grades',
    'Demographics',
    'Disability status',
    'Social connections',
    'Prior team history',
  ]

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Nav />
      <div className="flex-1 max-w-xl mx-auto w-full px-6 py-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-1">How TeamForge Uses AI</h2>
        <p className="text-sm text-slate-500 mb-8">Transparency about how your data is used to generate recommendations.</p>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <span className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 text-xs">✓</span>
              Information Used
            </h3>
            <ul className="space-y-2">
              {used.map(i => (
                <li key={i} className="flex items-center gap-2 text-xs text-slate-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                  {i}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <span className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center text-red-500 text-xs">✕</span>
              Information Not Used
            </h3>
            <ul className="space-y-2">
              {notUsed.map(i => (
                <li key={i} className="flex items-center gap-2 text-xs text-slate-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-300 shrink-0" />
                  {i}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm mb-5">
          <h3 className="text-sm font-semibold text-slate-800 mb-3">Your Controls</h3>
          <ul className="space-y-2 text-xs text-slate-600">
            <li className="flex gap-2 items-start">
              <span className="text-blue-500 mt-0.5">⚙</span>
              Edit your profile at any time
            </li>
            <li className="flex gap-2 items-start">
              <span className="text-blue-500 mt-0.5">🔍</span>
              Request an explainability review
            </li>
            <li className="flex gap-2 items-start">
              <span className="text-blue-500 mt-0.5">🚫</span>
              Opt out of AI matching entirely
            </li>
            <li className="flex gap-2 items-start">
              <span className="text-blue-500 mt-0.5">✅</span>
              All recommendations require your final approval
            </li>
          </ul>
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-5 mb-8">
          <h3 className="font-semibold mb-1 text-sm">AI Recommendations, Human Choice</h3>
          <p className="text-xs text-blue-100 leading-relaxed">
            AI suggests and you decide. You can accept, explore alternatives, or reject recommendations at any point. You remain in full control of your team decisions.
          </p>
        </div>

        <button
          onClick={() => go('welcome')}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
        >
          Return to Welcome
        </button>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Screen 09 – Team Confirmed
// ─────────────────────────────────────────────
function ConfirmedScreen({ go }: { go: (s: Screen) => void }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Nav />
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="bg-white rounded-2xl border-2 border-emerald-300 shadow-lg p-10 max-w-sm w-full text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-emerald-100 border-4 border-emerald-400 flex items-center justify-center">
              <svg className="w-10 h-10 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2" style={{ fontFamily: 'DM Serif Display, serif' }}>
            Team Confirmed
          </h2>
          <p className="text-sm text-slate-500 mb-8">
            Confirm your team and move forward
          </p>
          <button
            onClick={() => go('recommendation')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-3 rounded-xl transition-colors shadow-sm"
          >
            View My Team
          </button>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Main App Router
// ─────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState<Screen>('welcome')

  const go = (s: Screen) => setScreen(s)

  // Breadcrumb / progress indicator
  const screenOrder: Screen[] = ['welcome', 'skills', 'projects', 'recommendation', 'why-team', 'balance', 'alternatives', 'ai-info', 'confirmed']
  const screenLabels: Record<Screen, string> = {
    welcome: '01 Welcome',
    skills: '02 Skills Profile',
    projects: '03 Projects',
    recommendation: '04 Recommendation',
    'why-team': '05 Why This Team',
    balance: '06 Team Balance',
    alternatives: '07 Alternatives',
    'ai-info': '08 AI Info',
    confirmed: '09 Confirmed',
  }

  return (
    <div className="relative">
      {/* Screen Router */}
      {screen === 'welcome' && <WelcomeScreen go={go} />}
      {screen === 'skills' && <SkillsScreen go={go} />}
      {screen === 'projects' && <ProjectsScreen go={go} />}
      {screen === 'recommendation' && <RecommendationScreen go={go} />}
      {screen === 'why-team' && <WhyTeamScreen go={go} />}
      {screen === 'balance' && <BalanceScreen go={go} />}
      {screen === 'alternatives' && <AlternativesScreen go={go} />}
      {screen === 'ai-info' && <AiInfoScreen go={go} />}
      {screen === 'confirmed' && <ConfirmedScreen go={go} />}

      {/* Floating Screen Navigator */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-slate-900/95 backdrop-blur-md text-white rounded-2xl px-3 py-2 flex items-center gap-1 shadow-xl z-50">
        {screenOrder.map(s => (
          <button
            key={s}
            onClick={() => go(s)}
            title={screenLabels[s]}
            className={`text-[10px] px-2 py-1 rounded-lg transition-colors whitespace-nowrap ${
              screen === s
                ? 'bg-blue-600 text-white font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            {screenLabels[s]}
          </button>
        ))}
      </div>
    </div>
  )
}
