import { useEffect, useState } from "react";
import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  BriefcaseBusiness,
  CheckCircle2,
  Cloud,
  Code2,
  Database,
  GraduationCap,
  LayoutDashboard,
  LockKeyhole,
  Menu,
  Network,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  X,
  Zap,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./App.css";

const initialSkills = [
  { name: "Python", level: 82, required: 85, color: "#ff9f43" },
  { name: "Cloud Computing", level: 38, required: 80, color: "#a78bfa" },
  { name: "SQL & Databases", level: 65, required: 75, color: "#38bdf8" },
  { name: "Data Structures", level: 72, required: 80, color: "#34d399" },
  { name: "System Design", level: 25, required: 70, color: "#fb7185" },
];

const progressData = [
  { day: "Mon", score: 32 },
  { day: "Tue", score: 38 },
  { day: "Wed", score: 36 },
  { day: "Thu", score: 48 },
  { day: "Fri", score: 53 },
  { day: "Sat", score: 62 },
  { day: "Sun", score: 68 },
];

const initialRoadmap = [
  {
    title: "Cloud Computing Fundamentals",
    detail: "Understand cloud models, virtualization and core services.",
    duration: "4 hours",
    tag: "High priority",
    color: "orange",
  },
  {
    title: "AWS Core Services",
    detail: "Learn EC2, S3, IAM and basic cloud networking.",
    duration: "6 hours",
    tag: "Recommended",
    color: "purple",
  },
  {
    title: "System Design Basics",
    detail: "Explore APIs, scalability, load balancing and databases.",
    duration: "5 hours",
    tag: "Next step",
    color: "blue",
  },
];

function App() {
  const [activePage, setActivePage] = useState("Overview");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [apiStatus, setApiStatus] = useState("checking");
  const [cloudInfo, setCloudInfo] = useState(null);
  const [role, setRole] = useState("Cloud Engineer");
  const [studentName, setStudentName] = useState("Kiran");
  const [skills, setSkills] = useState(initialSkills);
  const [completed, setCompleted] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [showSkillForm, setShowSkillForm] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    let mounted = true;

    async function checkBackend() {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/health");
        if (!response.ok) throw new Error("API unavailable");

        const data = await response.json();

        if (mounted) {
          setApiStatus(data.status === "healthy" ? "online" : "offline");
        }

        const infoResponse = await fetch(
          "http://127.0.0.1:8000/api/cloud-info",
        );

        if (infoResponse.ok && mounted) {
          setCloudInfo(await infoResponse.json());
        }
      } catch {
        if (mounted) setApiStatus("offline");
      }
    }

    checkBackend();
    return () => {
      mounted = false;
    };
  }, []);

  const gaps = skills
    .map((skill) => ({
      ...skill,
      gap: Math.max(0, skill.required - skill.level),
    }))
    .sort((a, b) => b.gap - a.gap);

  const averageScore = Math.round(
    skills.reduce((sum, skill) => sum + skill.level, 0) /
      Math.max(skills.length, 1),
  );

  const navigation = [
    { name: "Overview", icon: LayoutDashboard },
    { name: "Skill Analysis", icon: Target },
    { name: "Learning Roadmap", icon: GraduationCap },
    { name: "Cloud Infrastructure", icon: Cloud },
  ];

  function notify(message) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2800);
  }

  function addSkill(event) {
    event.preventDefault();

    const cleaned = newSkill.trim();

    if (!cleaned) return;

    if (skills.some((skill) => skill.name.toLowerCase() === cleaned.toLowerCase())) {
      notify("This skill already exists.");
      return;
    }

    setSkills((current) => [
      ...current,
      {
        name: cleaned,
        level: 30,
        required: 70,
        color: "#ff9f43",
      },
    ]);

    setNewSkill("");
    setShowSkillForm(false);
    notify("Skill added to your analysis.");
  }

  function updateSkillLevel(name, level) {
    setSkills((current) =>
      current.map((skill) =>
        skill.name === name ? { ...skill, level: Number(level) } : skill,
      ),
    );
  }

  function toggleRoadmap(index) {
    setCompleted((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index],
    );
  }

  function renderOverview() {
    return (
      <>
        <section className="hero-card">
          <div className="hero-orb hero-orb-one" />
          <div className="hero-orb hero-orb-two" />

          <div className="hero-content">
            <div className="eyebrow">
              <Sparkles size={14} /> YOUR CAREER INTELLIGENCE
            </div>

            <h2>
              Build skills.
              <br />
              <span>Close the gap.</span>
            </h2>

            <p>
              Your career journey, powered by cloud technology and intelligent
              skill analysis.
            </p>

            <div className="hero-actions">
              <button
                className="primary-button"
                onClick={() => setActivePage("Skill Analysis")}
              >
                Analyze my skills <ArrowRight size={17} />
              </button>

              <div className="hero-live">
                <span className="live-dot" /> Live dashboard
              </div>
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="orbit orbit-outer" />
            <div className="orbit orbit-inner" />

            <div className="visual-center">
              <BrainCircuit size={46} strokeWidth={1.3} />
            </div>

            <div className="orbit-node node-one">
              <Cloud size={19} />
            </div>
            <div className="orbit-node node-two">
              <Database size={19} />
            </div>
            <div className="orbit-node node-three">
              <Network size={19} />
            </div>
          </div>

          <div className="hero-index">01 / CAREER INTELLIGENCE</div>
        </section>

        <section className="metrics-grid">
          <MetricCard
            label="Skill readiness"
            value={`${averageScore}%`}
            change="Current skill average"
            icon={Target}
            tone="orange"
            trend="up"
          />
          <MetricCard
            label="Skills assessed"
            value={String(skills.length).padStart(2, "0")}
            change="Across your skill profile"
            icon={BrainCircuit}
            tone="purple"
          />
          <MetricCard
            label="Skills to improve"
            value={String(gaps.filter((item) => item.gap > 0).length).padStart(2, "0")}
            change="Based on target role"
            icon={TrendingUp}
            tone="blue"
          />
          <MetricCard
            label="Roadmap completed"
            value={`${Math.round((completed.length / initialRoadmap.length) * 100)}%`}
            change={`${completed.length} of ${initialRoadmap.length} milestones`}
            icon={CheckCircle2}
            tone="green"
          />
        </section>

        <section className="content-grid">
          <div className="panel readiness-panel">
            <PanelHeading
              eyebrow="PERFORMANCE"
              title="Skill readiness"
              subtitle="Your current proficiency against your career target."
              action={
                <button
                  className="text-button"
                  onClick={() => setActivePage("Skill Analysis")}
                >
                  View analysis <ArrowRight size={15} />
                </button>
              }
            />

            <div className="skill-list">
              {gaps.slice(0, 5).map((skill) => (
                <SkillBar key={skill.name} skill={skill} />
              ))}
            </div>

            <div className="chart-legend">
              <span><i className="legend-current" /> Your level</span>
              <span><i className="legend-required" /> Target level</span>
            </div>
          </div>

          <div className="panel progress-panel">
            <PanelHeading
              eyebrow="WEEKLY ACTIVITY"
              title="Your progress"
              subtitle="A sample view of your learning momentum."
            />

            <div className="progress-highlight">
              <div>
                <strong>+36%</strong>
                <span><ArrowUpRight size={14} /> Learning momentum</span>
              </div>
              <div className="highlight-icon"><Activity size={20} /></div>
            </div>

            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={progressData}>
                  <defs>
                    <linearGradient id="progressGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ff9f43" stopOpacity={0.32} />
                      <stop offset="100%" stopColor="#ff9f43" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#242630" strokeDasharray="3 5" vertical={false} />
                  <XAxis
                    dataKey="day"
                    tick={{ fill: "#777b8d", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis hide domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{
                      background: "#171820",
                      border: "1px solid #30313b",
                      borderRadius: "10px",
                      color: "#fff",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#ff9f43"
                    strokeWidth={2.5}
                    fill="url(#progressGradient)"
                    activeDot={{ r: 5, fill: "#ff9f43" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <p className="chart-note">Illustrative sample data · Not yet saved to the cloud</p>
          </div>
        </section>

        <section className="content-grid bottom-grid">
          <div className="panel roadmap-panel">
            <PanelHeading
              eyebrow="YOUR NEXT MOVE"
              title="Learning roadmap"
              subtitle="Start with the skills that matter most."
              action={
                <button
                  className="text-button"
                  onClick={() => setActivePage("Learning Roadmap")}
                >
                  Full roadmap <ArrowRight size={15} />
                </button>
              }
            />

            <div className="roadmap-list">
              {initialRoadmap.map((item, index) => (
                <RoadmapItem
                  key={item.title}
                  item={item}
                  index={index}
                  done={completed.includes(index)}
                  onToggle={() => toggleRoadmap(index)}
                />
              ))}
            </div>
          </div>

          <div className="panel cloud-panel">
            <PanelHeading
              eyebrow="CLOUD STATUS"
              title="Infrastructure"
              subtitle="Your application service connections."
            />

            <div className="cloud-status-card">
              <div className={`cloud-status-icon ${apiStatus}`}>
                <Cloud size={23} />
              </div>
              <div className="cloud-status-copy">
                <strong>FastAPI backend</strong>
                <span>
                  {apiStatus === "online"
                    ? "API responding"
                    : apiStatus === "checking"
                      ? "Checking connection…"
                      : "Not connected"}
                </span>
              </div>
              <span className={`status-pill ${apiStatus}`}>
                <i /> {apiStatus}
              </span>
            </div>

            <div className="infra-list">
              <InfraRow
                icon={LockKeyhole}
                label="Firebase Authentication"
                status="Not configured"
              />
              <InfraRow
                icon={Database}
                label="Cloud Firestore"
                status="Not connected"
              />
              <InfraRow
                icon={Network}
                label="Cloud deployment"
                status="Planned"
              />
            </div>

            <div className="cloud-footnote">
              <ShieldCheck size={16} />
              <span>
                {cloudInfo
                  ? "API metadata received. Cloud services still need configuration."
                  : "Service indicators reflect the current development setup."}
              </span>
            </div>
          </div>
        </section>
      </>
    );
  }

  function renderSkillAnalysis() {
    return (
      <section className="page-content">
        <div className="page-intro">
          <div>
            <div className="eyebrow">CAREER INTELLIGENCE / 02</div>
            <h2>Skill gap analysis</h2>
            <p>Compare your proficiency with the skills required for your target role.</p>
          </div>
          <button className="primary-button" onClick={() => setShowSkillForm(!showSkillForm)}>
            <Sparkles size={16} /> Add a skill
          </button>
        </div>

        <div className="panel role-panel">
          <div className="role-icon"><BriefcaseBusiness size={22} /></div>
          <div className="role-field">
            <label htmlFor="target-role">YOUR TARGET CAREER</label>
            <select id="target-role" value={role} onChange={(event) => setRole(event.target.value)}>
              <option>Cloud Engineer</option>
              <option>AI/ML Engineer</option>
              <option>Software Developer</option>
              <option>Data Analyst</option>
              <option>DevOps Engineer</option>
              <option>Cybersecurity Analyst</option>
            </select>
          </div>
          <div className="role-average">
            <span>Average readiness</span>
            <strong>{averageScore}%</strong>
          </div>
        </div>

        {showSkillForm && (
          <form className="panel add-skill-form" onSubmit={addSkill}>
            <label htmlFor="new-skill">Skill name</label>
            <input
              id="new-skill"
              value={newSkill}
              onChange={(event) => setNewSkill(event.target.value)}
              placeholder="e.g. Docker, AWS, Linux"
              maxLength={50}
              autoFocus
            />
            <button className="primary-button" type="submit">Add skill</button>
          </form>
        )}

        <div className="panel analysis-panel">
          <PanelHeading
            eyebrow="PROFICIENCY BREAKDOWN"
            title="Your skill inventory"
            subtitle="Adjust the sliders to represent your current skill levels."
          />

          {gaps.map((skill) => (
            <div className="analysis-skill" key={skill.name}>
              <div className="analysis-skill-heading">
                <div>
                  <strong>{skill.name}</strong>
                  <span>Target proficiency: {skill.required}%</span>
                </div>
                <div className="gap-label">
                  {skill.gap > 0 ? `${skill.gap}% gap` : "Target reached"}
                </div>
              </div>
              <div className="analysis-track">
                <div style={{ width: `${skill.level}%`, background: skill.color }} />
              </div>
              <div className="slider-row">
                <span>Current level</span>
                <input
                  aria-label={`${skill.name} proficiency`}
                  type="range"
                  min="0"
                  max="100"
                  value={skill.level}
                  onChange={(event) => updateSkillLevel(skill.name, event.target.value)}
                  style={{ "--skill-color": skill.color }}
                />
                <strong>{skill.level}%</strong>
              </div>
            </div>
          ))}

          <div className="analysis-note">
            <BrainCircuit size={19} />
            <div>
              <strong>Analysis is currently local</strong>
              <p>Skill levels and target requirements are sample values. Cloud persistence and role-specific skill requirements are the next implementation steps.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  function renderRoadmap() {
    return (
      <section className="page-content">
        <div className="page-intro">
          <div>
            <div className="eyebrow">PERSONAL DEVELOPMENT / 03</div>
            <h2>Your learning roadmap</h2>
            <p>A structured path to strengthen your skills for {role}.</p>
          </div>
          <div className="completion-ring">
            <strong>{completed.length}/{initialRoadmap.length}</strong>
            <span>completed</span>
          </div>
        </div>

        <div className="roadmap-page-list">
          {initialRoadmap.map((item, index) => (
            <RoadmapItem
              key={item.title}
              item={item}
              index={index}
              done={completed.includes(index)}
              onToggle={() => toggleRoadmap(index)}
            />
          ))}
        </div>

        <div className="panel roadmap-tip">
          <Zap size={22} />
          <div>
            <strong>Keep your momentum going</strong>
            <p>Complete one learning milestone at a time. Progress is currently stored in this browser session only.</p>
          </div>
        </div>
      </section>
    );
  }

  function renderCloudInfrastructure() {
    return (
      <section className="page-content">
        <div className="page-intro">
          <div>
            <div className="eyebrow">SYSTEM ARCHITECTURE / 04</div>
            <h2>Cloud infrastructure</h2>
            <p>Understand the services that power the SkillGap AI platform.</p>
          </div>
          <span className={`status-pill ${apiStatus}`}><i /> API {apiStatus}</span>
        </div>

        <div className="infra-cards">
          <InfraCard icon={Code2} title="Frontend" tech="React + Vite" description="Student dashboard and interactive skill analysis." state="Running locally" />
          <InfraCard icon={Network} title="Backend API" tech="Python + FastAPI" description="REST endpoints for application services and analysis." state={apiStatus === "online" ? "Connected locally" : "Not connected"} />
          <InfraCard icon={Database} title="Cloud database" tech="Firebase Cloud Firestore" description="Planned cloud persistence for student profiles and progress." state="Not configured" />
          <InfraCard icon={LockKeyhole} title="Authentication" tech="Firebase Authentication" description="Planned managed identity and secure student sign-in." state="Not configured" />
        </div>

        <div className="panel architecture-panel">
          <PanelHeading
            eyebrow="REQUEST FLOW"
            title="How the system works"
            subtitle="The intended cloud architecture."
          />
          <div className="architecture-flow">
            <div className="architecture-node">
              <GraduationCap size={24} />
              <strong>Student</strong>
              <span>Browser</span>
            </div>
            <ArrowRight className="flow-arrow" />
            <div className="architecture-node">
              <Code2 size={24} />
              <strong>React UI</strong>
              <span>Frontend</span>
            </div>
            <ArrowRight className="flow-arrow" />
            <div className="architecture-node">
              <Network size={24} />
              <strong>FastAPI</strong>
              <span>Backend</span>
            </div>
            <ArrowRight className="flow-arrow" />
            <div className="architecture-node cloud-node">
              <Cloud size={24} />
              <strong>Cloud services</strong>
              <span>Firestore + Auth</span>
            </div>
          </div>
          <div className="architecture-disclaimer">
            <Activity size={17} />
            <span>This is the planned architecture. Cloud database, authentication and hosting must be configured before they are operational.</span>
          </div>
        </div>
      </section>
    );
  }

  const pageTitle = activePage === "Overview"
    ? "Overview"
    : activePage;

  return (
    <div className="app-shell">
      {mobileMenu && (
        <button className="mobile-backdrop" aria-label="Close menu" onClick={() => setMobileMenu(false)} />
      )}

      <aside className={`sidebar ${mobileMenu ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-mark"><BrainCircuit size={25} /></div>
          <div>
            <span className="brand-name">skillgap<span>.ai</span></span>
            <span className="brand-caption">CAREER INTELLIGENCE</span>
          </div>
          <button className="mobile-close" aria-label="Close menu" onClick={() => setMobileMenu(false)}>
            <X size={19} />
          </button>
        </div>

        <div className="workspace-label">WORKSPACE</div>

        <nav className="side-navigation">
          {navigation.map(({ name, icon: Icon }) => (
            <button
              key={name}
              className={`nav-item ${activePage === name ? "active" : ""}`}
              onClick={() => {
                setActivePage(name);
                setMobileMenu(false);
              }}
            >
              <Icon size={18} strokeWidth={1.8} />
              <span>{name}</span>
              {name === "Skill Analysis" && <span className="nav-count">{skills.length}</span>}
              {name === "Overview" && <span className="active-indicator" />}
            </button>
          ))}
        </nav>

        <div className="sidebar-separator" />

        <div className="workspace-label">YOUR CAREER</div>
        <div className="career-card">
          <div className="career-icon"><BriefcaseBusiness size={18} /></div>
          <div>
            <strong>{role}</strong>
            <span>Target role</span>
          </div>
          <button
            aria-label="Change target role"
            onClick={() => setActivePage("Skill Analysis")}
          >
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="sidebar-spacer" />

        <div className="cloud-mini-card">
          <div className="cloud-mini-top">
            <Cloud size={18} />
            <span>CLOUD CONNECTIVITY</span>
          </div>
          <div className="cloud-mini-status">
            <span className={`status-dot ${apiStatus}`} />
            {apiStatus === "online" ? "Backend connected" : apiStatus === "checking" ? "Checking API…" : "Backend offline"}
          </div>
          <div className="cloud-mini-bar"><span style={{ width: apiStatus === "online" ? "100%" : "18%" }} /></div>
          <span className="cloud-mini-caption">Local development environment</span>
        </div>

        <button className="settings-link" onClick={() => notify("Settings will be added in a future version.")}>
          <Settings size={17} /> Settings <ArrowRight size={15} />
        </button>

        <div className="profile">
          <div className="avatar">{studentName.charAt(0).toUpperCase()}</div>
          <div className="profile-info">
            <strong>{studentName}</strong>
            <span>Student workspace</span>
          </div>
          <span className="profile-online" />
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div className="topbar-left">
            <button className="menu-toggle" aria-label="Open menu" onClick={() => setMobileMenu(true)}>
              <Menu size={21} />
            </button>
            <div className="breadcrumb">
              <span>Workspace</span><span className="breadcrumb-divider">/</span><strong>{pageTitle}</strong>
            </div>
          </div>

          <div className="topbar-right">
            <div className="environment-badge">
              <span className={`status-dot ${apiStatus}`} />
              DEV ENVIRONMENT
            </div>
            <div className="topbar-divider" />
            <div className="topbar-date">
              <span>YOUR TARGET</span>
              <strong>{role}</strong>
            </div>
            <div className="topbar-avatar">{studentName.charAt(0).toUpperCase()}</div>
          </div>
        </header>

        <div className="dashboard-content">
          <div className="welcome-row">
            <div>
              <div className="eyebrow"><span className="welcome-line" /> YOUR CAREER, ENGINEERED</div>
              <h1>{activePage === "Overview" ? <>Welcome back, {studentName}<span className="heading-period">.</span></> : pageTitle}<span className="heading-period">.</span></h1>
              <p>
                {activePage === "Overview"
                  ? "Your next opportunity starts with the skills you build today."
                  : "Explore your skills, progress and cloud-powered career workspace."}
              </p>
            </div>
            <div className="date-chip"><Activity size={15} /> <span>PERSONAL WORKSPACE</span></div>
          </div>

          {activePage === "Overview" && renderOverview()}
          {activePage === "Skill Analysis" && renderSkillAnalysis()}
          {activePage === "Learning Roadmap" && renderRoadmap()}
          {activePage === "Cloud Infrastructure" && renderCloudInfrastructure()}

          <footer className="app-footer">
            <div className="footer-brand"><BrainCircuit size={17} /> skillgap.ai</div>
            <span>Built for your next career milestone.</span>
            <div className="footer-status"><span className={`status-dot ${apiStatus}`} /> {apiStatus === "online" ? "API reachable" : "Local preview"}</div>
          </footer>
        </div>
      </main>

      {notice && <div className="toast-message"><CheckCircle2 size={18} /> {notice}</div>}
    </div>
  );
}

function MetricCard({ label, value, change, icon: Icon, tone, trend }) {
  return (
    <article className="metric-card">
      <div className="metric-top">
        <span>{label}</span>
        <div className={`metric-icon ${tone}`}><Icon size={19} /></div>
      </div>
      <div className="metric-value">{value}</div>
      <div className="metric-foot">
        {trend && <span className="metric-trend"><ArrowUpRight size={14} /></span>}
        <span>{change}</span>
      </div>
      <div className={`metric-accent ${tone}`} />
    </article>
  );
}

function PanelHeading({ eyebrow, title, subtitle, action }) {
  return (
    <div className="panel-heading">
      <div>
        <div className="panel-eyebrow">{eyebrow}</div>
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </div>
      {action && <div className="panel-action">{action}</div>}
    </div>
  );
}

function SkillBar({ skill }) {
  return (
    <div className="skill-bar-row">
      <div className="skill-bar-heading">
        <span>{skill.name}</span>
        <span><strong>{skill.level}%</strong><small> / {skill.required}%</small></span>
      </div>
      <div className="skill-track">
        <div className="skill-required-line" style={{ left: `${skill.required}%` }} />
        <div className="skill-fill" style={{ width: `${skill.level}%`, background: skill.color }} />
      </div>
    </div>
  );
}

function RoadmapItem({ item, index, done, onToggle }) {
  return (
    <div className={`roadmap-item ${done ? "roadmap-done" : ""}`}>
      <button
        className={`roadmap-check ${done ? "checked" : ""}`}
        onClick={onToggle}
        aria-label={`${done ? "Mark incomplete" : "Mark complete"}: ${item.title}`}
      >
        {done ? <CheckCircle2 size={19} /> : <span>{String(index + 1).padStart(2, "0")}</span>}
      </button>
      <div className="roadmap-item-content">
        <div className="roadmap-item-title">
          <strong>{item.title}</strong>
          <span className={`roadmap-tag ${item.color}`}>{done ? "Completed" : item.tag}</span>
        </div>
        <p>{item.detail}</p>
        <div className="roadmap-meta"><span><Activity size={13} /> {item.duration}</span></div>
      </div>
      <button className="roadmap-arrow" onClick={onToggle} aria-label="Toggle milestone">
        {done ? <CheckCircle2 size={18} /> : <ArrowRight size={18} />}
      </button>
    </div>
  );
}

function InfraRow({ icon: Icon, label, status }) {
  return (
    <div className="infra-row">
      <div className="infra-row-icon"><Icon size={16} /></div>
      <span>{label}</span>
      <small>{status}</small>
    </div>
  );
}

function InfraCard({ icon: Icon, title, tech, description, state }) {
  return (
    <article className="panel infra-card">
      <div className="infra-card-icon"><Icon size={21} /></div>
      <span className="infra-card-label">{title}</span>
      <h3>{tech}</h3>
      <p>{description}</p>
      <div className="infra-card-state"><span className="status-dot offline" /> {state}</div>
    </article>
  );
}

export default App;