"use client";

import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
type CampaignStatus = "active" | "paused" | "completed" | "draft";

interface Campaign {
  id: string;
  name: string;
  stack: string[];
  status: CampaignStatus;
  tracked: number;
  contacted: number;
  hired: number;
  rejected: number;
  createdAt: string;
  lastActivity: string;
  notes?: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: "c1",
    name: "Senior Backend Engineers – Q1 2026",
    stack: ["Node.js", "PostgreSQL", "Docker"],
    status: "active",
    tracked: 42, contacted: 18, hired: 3, rejected: 5,
    createdAt: "2026-01-10", lastActivity: "2026-02-25",
  },
  {
    id: "c2",
    name: "React Frontend Devs – Fintech Client",
    stack: ["React", "TypeScript", "Tailwind"],
    status: "active",
    tracked: 31, contacted: 12, hired: 1, rejected: 4,
    createdAt: "2026-01-22", lastActivity: "2026-02-26",
  },
  {
    id: "c3",
    name: "DevOps – Cloud Migration Batch",
    stack: ["AWS", "Kubernetes", "Terraform"],
    status: "paused",
    tracked: 19, contacted: 7, hired: 0, rejected: 2,
    createdAt: "2025-12-05", lastActivity: "2026-01-30",
  },
  {
    id: "c4",
    name: "AI/ML Engineers – Product Lab",
    stack: ["Python", "PyTorch", "FastAPI"],
    status: "completed",
    tracked: 55, contacted: 22, hired: 6, rejected: 9,
    createdAt: "2025-11-01", lastActivity: "2026-01-15",
  },
  {
    id: "c5",
    name: "Full Stack – Early Stage Startup",
    stack: ["Next.js", "Prisma", "Vercel"],
    status: "active",
    tracked: 14, contacted: 5, hired: 0, rejected: 1,
    createdAt: "2026-02-01", lastActivity: "2026-02-27",
  },
];

const STACKS = [
  "React", "Next.js", "Vue", "Angular", "TypeScript",
  "Node.js", "Python", "Go", "Java", "Rust",
  "PostgreSQL", "MongoDB", "Redis", "MySQL",
  "AWS", "GCP", "Azure", "Docker", "Kubernetes", "Terraform",
  "PyTorch", "TensorFlow", "FastAPI", "GraphQL", "Prisma",
];

const STATUS_CFG: Record<CampaignStatus, { label: string; dotColor: string; badgeBg: string; badgeBorder: string; textColor: string }> = {
  active:    { label: "Active",    dotColor: "#818cf8", badgeBg: "rgba(99,102,241,0.1)",  badgeBorder: "rgba(99,102,241,0.3)",  textColor: "#818cf8" },
  paused:    { label: "Paused",    dotColor: "#fbbf24", badgeBg: "rgba(245,158,11,0.1)",  badgeBorder: "rgba(245,158,11,0.3)",  textColor: "#fbbf24" },
  completed: { label: "Completed", dotColor: "#94a3b8", badgeBg: "rgba(148,163,184,0.1)", badgeBorder: "rgba(148,163,184,0.3)", textColor: "#94a3b8" },
  draft:     { label: "Draft",     dotColor: "#475569", badgeBg: "rgba(71,85,105,0.2)",   badgeBorder: "rgba(71,85,105,0.4)",   textColor: "#64748b" },
};

function daysAgo(dateStr: string): string {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000);
  if (diff === 0) return "today";
  if (diff === 1) return "1d ago";
  return `${diff}d ago`;
}

function fmtDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

// ─── Campaign Card ─────────────────────────────────────────────────────────────
function CampaignCard({ campaign, onClick }: { campaign: Campaign; onClick: (c: Campaign) => void }) {
  const cfg = STATUS_CFG[campaign.status];
  const contactPct = campaign.tracked > 0 ? Math.round((campaign.contacted / campaign.tracked) * 100) : 0;
  const hireRate = campaign.contacted > 0 ? Math.round((campaign.hired / campaign.contacted) * 100) : 0;

  return (
    <div
      onClick={() => onClick(campaign)}
      style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 24, padding: 24, cursor: "pointer", display: "flex", flexDirection: "column", gap: 20, transition: "border-color 0.2s" }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(99,102,241,0.3)")}
      onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)")}
    >
      {/* Top row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "3px 10px", borderRadius: 99, fontSize: 11, fontWeight: 600, background: cfg.badgeBg, border: `1px solid ${cfg.badgeBorder}`, color: cfg.textColor, letterSpacing: "0.04em" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: cfg.dotColor, flexShrink: 0 }} />
          {cfg.label}
        </span>
        <span style={{ fontSize: 11, color: "#475569" }}>{fmtDate(campaign.createdAt)}</span>
      </div>

      {/* Name */}
      <p style={{ fontSize: 15, fontWeight: 600, color: "#e2e8f0", lineHeight: 1.4, margin: 0 }}>{campaign.name}</p>

      {/* Stack */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {campaign.stack.slice(0, 4).map(t => (
          <span key={t} style={{ fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 6, background: "rgba(99,102,241,0.1)", color: "#818cf8", border: "1px solid rgba(99,102,241,0.2)" }}>{t}</span>
        ))}
        {campaign.stack.length > 4 && (
          <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 6, background: "rgba(255,255,255,0.04)", color: "#475569", border: "1px solid rgba(255,255,255,0.06)" }}>+{campaign.stack.length - 4}</span>
        )}
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: 14 }}>
        {[
          { label: "Tracked",  val: campaign.tracked,   color: "#cbd5e1" },
          { label: "Contacted",val: campaign.contacted, color: "#cbd5e1" },
          { label: "Hired",    val: campaign.hired,     color: "#818cf8" },
          { label: "Rejected", val: campaign.rejected,  color: "#f87171" },
        ].map(({ label, val, color }, i) => (
          <div key={label} style={{ borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.05)" : "none", padding: "0 8px" }}>
            <div style={{ fontSize: 20, fontWeight: 700, color, lineHeight: 1 }}>{val}</div>
            <div style={{ fontSize: 9, color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 4 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Bar */}
      <div>
        <div style={{ height: 3, background: "rgba(255,255,255,0.05)", borderRadius: 99, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${contactPct}%`, background: "linear-gradient(90deg, #6366f1, #818cf8)", borderRadius: 99, transition: "width 0.6s ease" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 10, color: "#475569" }}>
          <span>Hire rate <strong style={{ color: "#818cf8" }}>{hireRate}%</strong></span>
          <span>Active {daysAgo(campaign.lastActivity)}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────
function CreateModal({ onClose, onCreate }: { onClose: () => void; onCreate: (c: Campaign) => void }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [status, setStatus] = useState<CampaignStatus>("draft");
  const [notes, setNotes] = useState("");
  const [stackSearch, setStackSearch] = useState("");
  const [stack, setStack] = useState<string[]>([]);

  const filteredStacks = STACKS.filter(s => s.toLowerCase().includes(stackSearch.toLowerCase()) && !stack.includes(s));
  const toggle = (s: string) => setStack(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  const handleCreate = () => {
    if (!name.trim()) return;
    onCreate({ id: "c" + Date.now(), name, stack, status, tracked: 0, contacted: 0, hired: 0, rejected: 0, createdAt: new Date().toISOString().slice(0,10), lastActivity: new Date().toISOString().slice(0,10), notes });
    onClose();
  };

  const inputStyle = { width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, color: "#e2e8f0", fontSize: 14, padding: "11px 14px", outline: "none", boxSizing: "border-box" as const, fontFamily: "inherit" };
  const labelStyle = { display: "block", fontSize: 11, fontWeight: 600 as const, color: "#64748b", textTransform: "uppercase" as const, letterSpacing: "0.1em", marginBottom: 8 };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: 500, background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, overflow: "hidden" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "28px 28px 0" }}>
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, color: "#818cf8", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 4 }}>Step {step} of 2</p>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#f8fafc", margin: 0 }}>{step === 1 ? "Campaign Details" : "Tech Stack"}</h2>
          </div>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, color: "#64748b", cursor: "pointer", fontSize: 14, padding: "6px 10px" }}>✕</button>
        </div>

        {/* Progress */}
        <div style={{ margin: "18px 28px 0", height: 2, background: "rgba(255,255,255,0.06)", borderRadius: 99 }}>
          <div style={{ height: "100%", width: step === 1 ? "50%" : "100%", background: "linear-gradient(90deg,#6366f1,#94a3b8)", borderRadius: 99, transition: "width 0.4s ease" }} />
        </div>

        {step === 1 ? (
          <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: 18 }}>
            <div>
              <label style={labelStyle}>Campaign Name *</label>
              <input autoFocus style={inputStyle} placeholder="e.g. Senior Backend Engineers – Q2 2026" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Status</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {(Object.keys(STATUS_CFG) as CampaignStatus[]).map(key => {
                  const cfg = STATUS_CFG[key];
                  const active = status === key;
                  return (
                    <button key={key} onClick={() => setStatus(key)} style={{ padding: "7px 14px", borderRadius: 99, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", border: `1px solid ${active ? cfg.badgeBorder : "rgba(255,255,255,0.06)"}`, background: active ? cfg.badgeBg : "transparent", color: active ? cfg.textColor : "#64748b", transition: "all 0.15s" }}>
                      {cfg.label}
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <label style={labelStyle}>Notes (optional)</label>
              <textarea style={{ ...inputStyle, height: 80, resize: "vertical" }} placeholder="Client brief, requirements, or internal notes…" value={notes} onChange={e => setNotes(e.target.value)} />
            </div>
          </div>
        ) : (
          <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={labelStyle}>Search Technologies</label>
              <input autoFocus style={inputStyle} placeholder="Search stack…" value={stackSearch} onChange={e => setStackSearch(e.target.value)} />
            </div>
            {stack.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {stack.map(s => (
                  <span key={s} onClick={() => toggle(s)} style={{ fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 99, background: "rgba(99,102,241,0.12)", color: "#818cf8", border: "1px solid rgba(99,102,241,0.25)", cursor: "pointer" }}>
                    {s} ✕
                  </span>
                ))}
              </div>
            )}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, maxHeight: 180, overflowY: "auto" }}>
              {filteredStacks.slice(0, 20).map(s => (
                <button key={s} onClick={() => toggle(s)} style={{ padding: "6px 12px", borderRadius: 8, fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: "inherit", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", color: "#94a3b8", transition: "all 0.1s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(99,102,241,0.35)"; e.currentTarget.style.color = "#818cf8"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "#94a3b8"; }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{ padding: "16px 28px 24px", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", gap: 10 }}>
          {step === 2 && (
            <button onClick={() => setStep(1)} style={{ padding: "10px 20px", borderRadius: 12, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#64748b" }}>
              ← Back
            </button>
          )}
          <div style={{ flex: 1 }} />
          {step === 1 ? (
            <button onClick={() => name.trim() && setStep(2)} disabled={!name.trim()} style={{ padding: "10px 24px", borderRadius: 12, fontSize: 13, fontWeight: 700, cursor: name.trim() ? "pointer" : "not-allowed", fontFamily: "inherit", background: "#6366f1", color: "#fff", border: "none", opacity: name.trim() ? 1 : 0.4, transition: "all 0.15s" }}>
              Next →
            </button>
          ) : (
            <button onClick={handleCreate} style={{ padding: "10px 24px", borderRadius: 12, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", background: "#6366f1", color: "#fff", border: "none" }}>
              Create Campaign
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Detail Panel ─────────────────────────────────────────────────────────────
function DetailPanel({ campaign, onClose }: { campaign: Campaign; onClose: () => void }) {
  const cfg = STATUS_CFG[campaign.status];
  const funnelRows = [
    { label: "Tracked",      val: campaign.tracked,   max: campaign.tracked, color: "#475569" },
    { label: "Contacted",    val: campaign.contacted, max: campaign.tracked, color: "#6366f1" },
    { label: "Interviewing", val: Math.max(0, campaign.contacted - campaign.hired - campaign.rejected), max: campaign.tracked, color: "#818cf8" },
    { label: "Hired",        val: campaign.hired,     max: campaign.tracked, color: "#a5b4fc" },
  ];

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 40, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", display: "flex", justifyContent: "flex-end" }}>
      <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: 420, height: "100vh", background: "#0A0A0A", borderLeft: "1px solid rgba(255,255,255,0.07)", overflowY: "auto", padding: 32, display: "flex", flexDirection: "column", gap: 24 }}>
        {/* Top */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "3px 10px", borderRadius: 99, fontSize: 11, fontWeight: 600, background: cfg.badgeBg, border: `1px solid ${cfg.badgeBorder}`, color: cfg.textColor }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: cfg.dotColor }} />
            {cfg.label}
          </span>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, color: "#64748b", cursor: "pointer", fontSize: 14, padding: "6px 10px" }}>✕</button>
        </div>

        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#f8fafc", margin: "0 0 4px" }}>{campaign.name}</h2>
          <p style={{ fontSize: 11, color: "#475569", margin: 0 }}>Created {fmtDate(campaign.createdAt)} · Last active {daysAgo(campaign.lastActivity)}</p>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {campaign.stack.map(t => (
            <span key={t} style={{ fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 6, background: "rgba(99,102,241,0.1)", color: "#818cf8", border: "1px solid rgba(99,102,241,0.2)" }}>{t}</span>
          ))}
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 16, padding: "16px 0", textAlign: "center" }}>
          {[
            { label: "Tracked",      val: campaign.tracked,   color: "#cbd5e1" },
            { label: "Contacted",    val: campaign.contacted, color: "#cbd5e1" },
            { label: "Intervw.",     val: Math.max(0, campaign.contacted - campaign.hired - campaign.rejected), color: "#a5b4fc" },
            { label: "Hired",        val: campaign.hired,     color: "#818cf8" },
            { label: "Rejected",     val: campaign.rejected,  color: "#f87171" },
          ].map(({ label, val, color }, i) => (
            <div key={label} style={{ borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.05)" : "none", padding: "0 4px" }}>
              <div style={{ fontSize: 18, fontWeight: 700, color, lineHeight: 1 }}>{Math.max(0, val)}</div>
              <div style={{ fontSize: 9, color: "#475569", textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Funnel */}
        <div>
          <p style={{ fontSize: 11, fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14 }}>Recruitment Funnel</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {funnelRows.map(({ label, val, max, color }) => (
              <div key={label}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5, fontSize: 12 }}>
                  <span style={{ color: "#64748b" }}>{label}</span>
                  <span style={{ color: "#94a3b8", fontWeight: 600 }}>{val}</span>
                </div>
                <div style={{ height: 5, background: "rgba(255,255,255,0.05)", borderRadius: 99, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${max > 0 ? Math.round((val / max) * 100) : 0}%`, background: color, borderRadius: 99, transition: "width 0.6s ease" }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 10, marginTop: "auto" }}>
          <button style={{ flex: 1, padding: "12px", borderRadius: 12, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", background: "#6366f1", color: "#fff", border: "none" }}>View Developers</button>
          <button style={{ flex: 1, padding: "12px", borderRadius: 12, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", background: "rgba(255,255,255,0.04)", color: "#94a3b8", border: "1px solid rgba(255,255,255,0.08)" }}>Edit Campaign</button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function CampaignsDashboard() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(MOCK_CAMPAIGNS);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState<"all" | CampaignStatus>("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"recent" | "activity" | "tracked">("recent");
  const [selected, setSelected] = useState<Campaign | null>(null);
  const [activeNav, setActiveNav] = useState("Campaigns");

  const totals = {
    active:    campaigns.filter(c => c.status === "active").length,
    tracked:   campaigns.reduce((s, c) => s + c.tracked, 0),
    hired:     campaigns.reduce((s, c) => s + c.hired, 0),
    contacted: campaigns.reduce((s, c) => s + c.contacted, 0),
  };

  const filtered = campaigns
    .filter(c => filter === "all" || c.status === filter)
    .filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.stack.some(s => s.toLowerCase().includes(search.toLowerCase())))
    .sort((a, b) => {
      if (sort === "recent")   return new Date(b.createdAt).getTime()    - new Date(a.createdAt).getTime();
      if (sort === "activity") return new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime();
      if (sort === "tracked")  return b.tracked - a.tracked;
      return 0;
    });

  const navItems = ["Overview", "Campaigns", "Developers", "Analytics", "Security", "Settings"];

  return (
    <div style={{ minHeight: "100vh", background: "#050505", color: "#e2e8f0", fontFamily: "system-ui, -apple-system, sans-serif", display: "flex" }}>
      {/* Ambient glow */}
      <div style={{ position: "fixed", top: 0, left: "50%", transform: "translateX(-50%)", width: 1000, height: 500, background: "radial-gradient(ellipse, rgba(99,102,241,0.10) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

      {/* Sidebar */}
      <aside style={{ width: 220, minHeight: "100vh", background: "#0A0A0A", borderRight: "1px solid rgba(255,255,255,0.05)", display: "flex", flexDirection: "column", padding: "28px 0", position: "sticky", top: 0, height: "100vh", zIndex: 10, flexShrink: 0 }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "0 20px 28px", borderBottom: "1px solid rgba(255,255,255,0.05)", marginBottom: 20 }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: "#6366f1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: "#fff", fontWeight: 800, flexShrink: 0 }}>⚡</div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: "#f8fafc", letterSpacing: "0.12em", textTransform: "uppercase" }}>Skill Hunt</div>
            <div style={{ fontSize: 10, color: "#475569", letterSpacing: "0.08em" }}>2026</div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "0 10px" }}>
          {navItems.map(label => {
            const isActive = activeNav === label;
            return (
              <div key={label} onClick={() => setActiveNav(label)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 12, fontSize: 13, fontWeight: 500, cursor: "pointer", marginBottom: 2, background: isActive ? "rgba(99,102,241,0.1)" : "transparent", color: isActive ? "#818cf8" : "#64748b", border: isActive ? "1px solid rgba(99,102,241,0.2)" : "1px solid transparent", transition: "all 0.15s" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: isActive ? "#818cf8" : "#334155", flexShrink: 0 }} />
                {label}
              </div>
            );
          })}
        </nav>

        {/* User */}
        <div style={{ padding: "20px 16px 0", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #6366f1, #475569)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff", flexShrink: 0 }}>JD</div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#e2e8f0" }}>J. Doe</div>
            <div style={{ fontSize: 10, color: "#475569" }}>Senior Recruiter</div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: "40px 40px 80px", position: "relative", zIndex: 5, minWidth: 0 }}>
        {/* Page header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 36 }}>
          <div>
            <p style={{ fontSize: 11, color: "#475569", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>Dashboard / Campaigns</p>
            <h1 style={{ fontSize: 28, fontWeight: 700, color: "#f8fafc", margin: 0, letterSpacing: "-0.02em" }}>My Campaigns</h1>
          </div>
          <button onClick={() => setShowModal(true)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "11px 22px", borderRadius: 14, background: "#6366f1", color: "#fff", border: "none", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", transition: "background 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.background = "#4f46e5"}
            onMouseLeave={e => e.currentTarget.style.background = "#6366f1"}
          >
            <span style={{ fontSize: 18, lineHeight: 1 }}>+</span> New Campaign
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
          {[
            { label: "Active Campaigns", value: totals.active,    gradient: "linear-gradient(90deg, #6366f1, #818cf8)" },
            { label: "Total Tracked",    value: totals.tracked,   gradient: "linear-gradient(90deg, #94a3b8, #cbd5e1)" },
            { label: "Contacted",        value: totals.contacted, gradient: "linear-gradient(90deg, #818cf8, #a5b4fc)" },
            { label: "Hired",            value: totals.hired,     gradient: "linear-gradient(90deg, #a5b4fc, #c7d2fe)" },
          ].map(({ label, value, gradient }) => (
            <div key={label} style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 20, padding: "22px 24px", position: "relative", overflow: "hidden", transition: "border-color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(99,102,241,0.2)"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)"}
            >
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: gradient, opacity: 0.7 }} />
              <div style={{ fontSize: 36, fontWeight: 700, background: gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1.1, marginBottom: 4 }}>{value}</div>
              <div style={{ fontSize: 11, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 100, gap: 16 }}>
            <div style={{ width: 64, height: 64, borderRadius: 20, background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>📋</div>
            <p style={{ color: "#64748b", fontSize: 14 }}>No campaigns found.</p>
            <button onClick={() => setShowModal(true)} style={{ padding: "10px 22px", borderRadius: 12, background: "#6366f1", color: "#fff", border: "none", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
              + Create your first campaign
            </button>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 18 }}>
            {filtered.map(c => (
              <CampaignCard key={c.id} campaign={c} onClick={setSelected} />
            ))}
            {/* Ghost card */}
            <div onClick={() => setShowModal(true)} style={{ background: "#0A0A0A", border: "1px dashed rgba(255,255,255,0.08)", borderRadius: 24, padding: 24, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, minHeight: 200, transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(99,102,241,0.3)"; e.currentTarget.style.background = "rgba(99,102,241,0.02)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.background = "#0A0A0A"; }}
            >
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, color: "#818cf8" }}>+</div>
              <span style={{ fontSize: 13, color: "#475569" }}>New Campaign</span>
            </div>
          </div>
        )}
      </main>

      {/* Detail panel */}
      {selected && <DetailPanel campaign={selected} onClose={() => setSelected(null)} />}

      {/* Modal */}
      {showModal && <CreateModal onClose={() => setShowModal(false)} onCreate={c => setCampaigns(prev => [c, ...prev])} />}
    </div>
  );
}