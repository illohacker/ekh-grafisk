"use client";

import { useState, useEffect, useCallback } from "react";

// ── Types ──

type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  message: string;
  file_url: string | null;
  file_name: string | null;
  status: string;
  created_at: string;
  updated_at: string;
};

const ADMIN_KEY = "ekh-admin-2026";

type Note = {
  id: string;
  lead_id: string;
  content: string;
  created_at: string;
};

// ── Constants ──

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  new:       { label: "Ny",            color: "text-blue-700",   bg: "bg-blue-50 border-blue-200" },
  contacted: { label: "Kontaktet",     color: "text-yellow-700", bg: "bg-yellow-50 border-yellow-200" },
  quoted:    { label: "Tilbud sendt",  color: "text-purple-700", bg: "bg-purple-50 border-purple-200" },
  won:       { label: "Vunnet",        color: "text-green-700",  bg: "bg-green-50 border-green-200" },
  lost:      { label: "Tapt",          color: "text-red-700",    bg: "bg-red-50 border-red-200" },
};

// ── Dashboard ──

export default function Dashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Lead | null>(null);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<"leads" | "stats">("leads");

  const fetchLeads = useCallback(async () => {
    try {
      const res = await fetch("/api/leads");
      const data = await res.json();
      setLeads(Array.isArray(data) ? data : []);
    } catch {
      setLeads([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  async function updateStatus(id: string, status: string) {
    await fetch("/api/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    fetchLeads();
    if (selected?.id === id) {
      setSelected((prev) => prev ? { ...prev, status } : null);
    }
  }

  async function deleteLead(id: string) {
    if (!confirm("Er du sikker på at du vil slette denne kontakten? Denne handlingen kan ikke angres.")) return;
    const res = await fetch("/api/leads", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, admin_key: ADMIN_KEY }),
    });
    if (res.ok) {
      setSelected(null);
      fetchLeads();
    } else {
      alert("Kunne ikke slette. Kun admin har tilgang.");
    }
  }

  // Filtered & searched leads
  const filtered = leads.filter((l) => {
    if (filter !== "all" && l.status !== filter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        l.name.toLowerCase().includes(q) ||
        (l.company || "").toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const stats = {
    total: leads.length,
    new: leads.filter((l) => l.status === "new").length,
    contacted: leads.filter((l) => l.status === "contacted").length,
    won: leads.filter((l) => l.status === "won").length,
  };

  return (
    <div className="min-h-screen bg-[#f8f5f7] flex">
      {/* Main content */}
      <div className={`flex-1 transition-all ${selected ? "lg:mr-[440px]" : ""}`}>
        {/* Header */}
        <header className="bg-white border-b border-[#e8e0e5] px-6 py-4 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a href="/" className="text-[#6b7280] hover:text-[#1a1a1a] text-sm">
                &larr; Tilbake
              </a>
              <h1 className="text-xl font-bold text-[#1a1a1a]">
                EKH Grafisk &mdash; Leads
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setTab("leads")}
                className={`text-sm font-medium px-3 py-1 rounded-lg transition-colors ${tab === "leads" ? "bg-[#C2267A] text-white" : "text-[#6b7280] hover:text-[#1a1a1a]"}`}
              >
                Leads ({leads.length})
              </button>
              <button
                onClick={() => setTab("stats")}
                className={`text-sm font-medium px-3 py-1 rounded-lg transition-colors ${tab === "stats" ? "bg-[#C2267A] text-white" : "text-[#6b7280] hover:text-[#1a1a1a]"}`}
              >
                Statistikk
              </button>
            </div>
          </div>
        </header>

        <main className="p-6 max-w-7xl mx-auto">
          {tab === "stats" && <StatsPanel />}

          {tab === "leads" && <>
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard label="Totalt" value={stats.total} accent="#C2267A" />
            <StatCard label="Nye" value={stats.new} accent="#2563eb" />
            <StatCard label="Kontaktet" value={stats.contacted} accent="#ca8a04" />
            <StatCard label="Vunnet" value={stats.won} accent="#16a34a" />
          </div>

          {/* Filters + Search */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <input
              type="text"
              placeholder="Sok etter navn, bedrift eller e-post..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-lg border border-[#e8e0e5] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#C2267A]/20 focus:border-[#C2267A]"
            />
            <div className="flex gap-1.5 flex-wrap">
              {[{ key: "all", label: "Alle" }, ...Object.entries(STATUS_CONFIG).map(([k, v]) => ({ key: k, label: v.label }))].map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === f.key
                      ? "bg-[#C2267A] text-white"
                      : "bg-white border border-[#e8e0e5] text-[#6b7280] hover:border-[#C2267A]/30"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Leads table */}
          <div className="bg-white rounded-xl border border-[#e8e0e5] shadow-sm overflow-hidden">
            {loading ? (
              <div className="p-12 text-center text-[#6b7280]">Laster...</div>
            ) : filtered.length === 0 ? (
              <div className="p-12 text-center text-[#6b7280]">
                {search || filter !== "all"
                  ? "Ingen leads matcher filteret."
                  : "Ingen leads enna. Kontakter fra landingssiden vises her."}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#e8e0e5] text-left text-xs text-[#6b7280] uppercase tracking-wider">
                      <th className="px-5 py-3 font-medium">Navn</th>
                      <th className="px-5 py-3 font-medium">Bedrift</th>
                      <th className="px-5 py-3 font-medium hidden sm:table-cell">E-post</th>
                      <th className="px-5 py-3 font-medium hidden md:table-cell">Telefon</th>
                      <th className="px-5 py-3 font-medium">Status</th>
                      <th className="px-5 py-3 font-medium hidden lg:table-cell">Dato</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((lead) => {
                      const sc = STATUS_CONFIG[lead.status] || STATUS_CONFIG.new;
                      return (
                        <tr
                          key={lead.id}
                          onClick={() => setSelected(lead)}
                          className={`border-b border-[#e8e0e5] last:border-0 cursor-pointer transition-colors ${
                            selected?.id === lead.id
                              ? "bg-[#C2267A]/5"
                              : "hover:bg-[#f8f5f7]"
                          }`}
                        >
                          <td className="px-5 py-4">
                            <div className="font-medium text-[#1a1a1a]">{lead.name}</div>
                          </td>
                          <td className="px-5 py-4 text-sm text-[#6b7280]">
                            {lead.company || "\u2014"}
                          </td>
                          <td className="px-5 py-4 text-sm text-[#6b7280] hidden sm:table-cell">
                            {lead.email}
                          </td>
                          <td className="px-5 py-4 text-sm text-[#6b7280] hidden md:table-cell">
                            {lead.phone || "\u2014"}
                          </td>
                          <td className="px-5 py-4">
                            <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-medium border ${sc.bg} ${sc.color}`}>
                              {sc.label}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-sm text-[#6b7280] hidden lg:table-cell">
                            {new Date(lead.created_at).toLocaleDateString("nb-NO")}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>}
        </main>
      </div>

      {/* Detail panel */}
      {selected && (
        <LeadPanel
          lead={selected}
          onClose={() => setSelected(null)}
          onStatusChange={(status) => updateStatus(selected.id, status)}
          onDelete={() => deleteLead(selected.id)}
          onLeadUpdated={fetchLeads}
        />
      )}
    </div>
  );
}

// ── Stat Card ──

function StatCard({ label, value, accent }: { label: string; value: number; accent: string }) {
  return (
    <div className="bg-white rounded-xl p-5 border border-[#e8e0e5] shadow-sm">
      <p className="text-2xl font-bold" style={{ color: accent }}>{value}</p>
      <p className="text-sm text-[#6b7280] mt-1">{label}</p>
    </div>
  );
}

// ── Lead Detail Panel ──

function LeadPanel({
  lead,
  onClose,
  onStatusChange,
  onDelete,
  onLeadUpdated,
}: {
  lead: Lead;
  onClose: () => void;
  onStatusChange: (status: string) => void;
  onDelete: () => void;
  onLeadUpdated: () => void;
}) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, [lead.id]);

  async function fetchNotes() {
    try {
      const res = await fetch(`/api/leads/notes?lead_id=${lead.id}`);
      const data = await res.json();
      setNotes(Array.isArray(data) ? data : []);
    } catch {
      setNotes([]);
    }
  }

  async function addNote() {
    if (!newNote.trim()) return;
    setSaving(true);
    try {
      await fetch("/api/leads/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lead_id: lead.id, content: newNote.trim() }),
      });
      setNewNote("");
      fetchNotes();
    } catch {
      // silently fail
    } finally {
      setSaving(false);
    }
  }

  const sc = STATUS_CONFIG[lead.status] || STATUS_CONFIG.new;

  return (
    <div className="fixed top-0 right-0 h-full w-full sm:w-[440px] bg-white border-l border-[#e8e0e5] shadow-xl z-40 flex flex-col">
      {/* Panel header */}
      <div className="px-6 py-4 border-b border-[#e8e0e5] flex items-center justify-between flex-shrink-0">
        <h2 className="text-lg font-bold text-[#1a1a1a] truncate pr-4">{lead.name}</h2>
        <button
          onClick={onClose}
          className="text-[#6b7280] hover:text-[#1a1a1a] text-2xl leading-none"
        >
          &times;
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        {/* Contact info */}
        <div className="px-6 py-5 border-b border-[#e8e0e5]">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Bedrift" value={lead.company} />
            <Field label="E-post" value={lead.email} href={`mailto:${lead.email}`} />
            <Field label="Telefon" value={lead.phone} href={lead.phone ? `tel:${lead.phone}` : undefined} />
            <Field label="Mottatt" value={new Date(lead.created_at).toLocaleDateString("nb-NO", { day: "numeric", month: "long", year: "numeric" })} />
          </div>
        </div>

        {/* Status */}
        <div className="px-6 py-4 border-b border-[#e8e0e5]">
          <label className="block text-xs font-medium text-[#6b7280] uppercase tracking-wider mb-2">
            Status
          </label>
          <div className="flex flex-wrap gap-2">
            {Object.entries(STATUS_CONFIG).map(([key, conf]) => (
              <button
                key={key}
                onClick={() => onStatusChange(key)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-all ${
                  lead.status === key
                    ? `${conf.bg} ${conf.color} ring-1 ring-current`
                    : "bg-white border-[#e8e0e5] text-[#6b7280] hover:border-[#C2267A]/30"
                }`}
              >
                {conf.label}
              </button>
            ))}
          </div>
        </div>

        {/* Original message */}
        <div className="px-6 py-4 border-b border-[#e8e0e5]">
          <label className="block text-xs font-medium text-[#6b7280] uppercase tracking-wider mb-2">
            Opprinnelig melding
          </label>
          <div className="bg-[#f8f5f7] rounded-lg p-4 text-sm text-[#1a1a1a] whitespace-pre-wrap">
            {lead.message}
          </div>
        </div>

        {/* File attachment */}
        {lead.file_name && (
          <div className="px-6 py-4 border-b border-[#e8e0e5]">
            <label className="block text-xs font-medium text-[#6b7280] uppercase tracking-wider mb-2">
              Vedlegg
            </label>
            <a
              href={lead.file_url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#f8f5f7] rounded-lg px-4 py-3 text-sm text-[#C2267A] hover:bg-[#C2267A]/10 transition-colors border border-[#e8e0e5]"
            >
              <span>📎</span>
              {lead.file_name}
            </a>
          </div>
        )}

        {/* Notes */}
        <div className="px-6 py-4">
          <label className="block text-xs font-medium text-[#6b7280] uppercase tracking-wider mb-3">
            Notater ({notes.length})
          </label>

          {/* Add note */}
          <div className="mb-4">
            <textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Skriv et notat om denne kontakten..."
              rows={3}
              className="w-full px-3 py-2.5 rounded-lg border border-[#e8e0e5] text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#C2267A]/20 focus:border-[#C2267A]"
            />
            <button
              onClick={addNote}
              disabled={!newNote.trim() || saving}
              className="mt-2 w-full bg-[#C2267A] hover:bg-[#9E1D63] disabled:opacity-40 text-white font-medium py-2 rounded-lg text-sm transition-colors"
            >
              {saving ? "Lagrer..." : "Legg til notat"}
            </button>
          </div>

          {/* Notes list */}
          {notes.length === 0 ? (
            <p className="text-sm text-[#6b7280] text-center py-4">
              Ingen notater ennå.
            </p>
          ) : (
            <div className="space-y-3">
              {notes.map((note) => (
                <div key={note.id} className="bg-[#f8f5f7] rounded-lg p-3 border border-[#e8e0e5]">
                  <p className="text-sm text-[#1a1a1a] whitespace-pre-wrap">{note.content}</p>
                  <p className="text-xs text-[#6b7280] mt-2">
                    {new Date(note.created_at).toLocaleString("nb-NO", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Delete button */}
          <div className="mt-8 pt-6 border-t border-[#e8e0e5]">
            <button
              onClick={onDelete}
              className="w-full py-2.5 rounded-lg border border-red-200 text-red-600 text-sm font-medium hover:bg-red-50 transition-colors"
            >
              Slett denne kontakten
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Field helper ──

// ── Stats Panel ──

function StatsPanel() {
  const [data, setData] = useState<{
    totalViews: number;
    totalLeads: number;
    conversionRate: string;
    utmSources: Record<string, number>;
    dailyViews: Record<string, number>;
    dailyLeads: Record<string, number>;
    statusBreakdown: Record<string, number>;
  } | null>(null);
  const [days, setDays] = useState(30);

  useEffect(() => {
    fetch(`/api/analytics?days=${days}`)
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData(null));
  }, [days]);

  if (!data) return <div className="text-center text-[#6b7280] py-12">Laster statistikk...</div>;

  const maxView = Math.max(...Object.values(data.dailyViews), 1);
  const sortedDays = Object.keys(data.dailyViews).sort();
  const last14 = sortedDays.slice(-14);

  return (
    <div className="space-y-6">
      {/* Period selector */}
      <div className="flex gap-2">
        {[7, 14, 30].map((d) => (
          <button
            key={d}
            onClick={() => setDays(d)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              days === d ? "bg-[#C2267A] text-white" : "bg-white border border-[#e8e0e5] text-[#6b7280]"
            }`}
          >
            {d} dager
          </button>
        ))}
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-[#e8e0e5]">
          <p className="text-3xl font-bold text-[#C2267A]">{data.totalViews}</p>
          <p className="text-sm text-[#6b7280] mt-1">Sidevisninger</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-[#e8e0e5]">
          <p className="text-3xl font-bold text-[#2563eb]">{data.totalLeads}</p>
          <p className="text-sm text-[#6b7280] mt-1">Leads</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-[#e8e0e5]">
          <p className="text-3xl font-bold text-[#16a34a]">{data.conversionRate}%</p>
          <p className="text-sm text-[#6b7280] mt-1">Konverteringsrate</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-[#e8e0e5]">
          <p className="text-3xl font-bold text-[#ca8a04]">{data.statusBreakdown?.won || 0}</p>
          <p className="text-sm text-[#6b7280] mt-1">Vunnet</p>
        </div>
      </div>

      {/* Daily views bar chart */}
      <div className="bg-white rounded-xl p-6 border border-[#e8e0e5]">
        <h3 className="font-semibold text-[#1a1a1a] mb-4">Daglige sidevisninger</h3>
        {last14.length === 0 ? (
          <p className="text-sm text-[#6b7280] text-center py-8">Ingen data ennå. Trafikk fra annonser vises her.</p>
        ) : (
          <div className="flex items-end gap-1 h-40">
            {last14.map((day) => {
              const count = data.dailyViews[day] || 0;
              const height = Math.max((count / maxView) * 100, 4);
              const leadCount = data.dailyLeads[day] || 0;
              return (
                <div key={day} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-xs text-[#6b7280]">{count}</span>
                  <div className="w-full flex flex-col gap-0.5" style={{ height: `${height}%` }}>
                    <div className="flex-1 bg-[#C2267A]/20 rounded-t" />
                    {leadCount > 0 && (
                      <div className="bg-[#C2267A] rounded-b" style={{ height: `${(leadCount / count) * 100}%`, minHeight: 4 }} />
                    )}
                  </div>
                  <span className="text-[10px] text-[#6b7280] -rotate-45">{day.slice(5)}</span>
                </div>
              );
            })}
          </div>
        )}
        <div className="flex items-center gap-4 mt-4 text-xs text-[#6b7280]">
          <span className="flex items-center gap-1"><span className="w-3 h-3 bg-[#C2267A]/20 rounded" /> Visninger</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 bg-[#C2267A] rounded" /> Leads</span>
        </div>
      </div>

      {/* Traffic sources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-6 border border-[#e8e0e5]">
          <h3 className="font-semibold text-[#1a1a1a] mb-4">Trafikkkilder</h3>
          {Object.keys(data.utmSources).length === 0 ? (
            <p className="text-sm text-[#6b7280] text-center py-4">Ingen data ennå.</p>
          ) : (
            <div className="space-y-3">
              {Object.entries(data.utmSources)
                .sort(([, a], [, b]) => b - a)
                .map(([source, count]) => (
                  <div key={source} className="flex items-center justify-between">
                    <span className="text-sm text-[#1a1a1a] font-medium">{source}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-[#f8f5f7] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#C2267A] rounded-full"
                          style={{ width: `${(count / data.totalViews) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-[#6b7280] w-8 text-right">{count}</span>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl p-6 border border-[#e8e0e5]">
          <h3 className="font-semibold text-[#1a1a1a] mb-4">Lead-status</h3>
          {Object.keys(data.statusBreakdown).length === 0 ? (
            <p className="text-sm text-[#6b7280] text-center py-4">Ingen leads ennå.</p>
          ) : (
            <div className="space-y-3">
              {Object.entries(data.statusBreakdown).map(([status, count]) => {
                const conf = STATUS_CONFIG[status];
                return (
                  <div key={status} className="flex items-center justify-between">
                    <span className={`text-sm font-medium ${conf?.color || "text-[#6b7280]"}`}>
                      {conf?.label || status}
                    </span>
                    <span className="text-sm text-[#6b7280]">{count}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Google Ads info */}
      <div className="bg-white rounded-xl p-6 border border-[#e8e0e5]">
        <h3 className="font-semibold text-[#1a1a1a] mb-2">Google Ads-kampanje</h3>
        <p className="text-sm text-[#6b7280]">
          Når Google Ads er aktivt, vil trafikk fra annonsene vises her med UTM-kilde &quot;google&quot;.
          Bruk disse UTM-parametrene i annonsene:
        </p>
        <div className="mt-3 bg-[#f8f5f7] rounded-lg p-3 font-mono text-xs text-[#1a1a1a] break-all">
          ?utm_source=google&amp;utm_medium=cpc&amp;utm_campaign=profileringsartikler
        </div>
      </div>
    </div>
  );
}

// ── Field helper ──

function Field({ label, value, href }: { label: string; value: string | null; href?: string }) {
  const display = value || "\u2014";
  return (
    <div>
      <p className="text-xs font-medium text-[#6b7280] uppercase tracking-wider">{label}</p>
      {href && value ? (
        <a href={href} className="text-sm text-[#C2267A] hover:underline mt-0.5 block truncate">
          {display}
        </a>
      ) : (
        <p className="text-sm text-[#1a1a1a] mt-0.5 truncate">{display}</p>
      )}
    </div>
  );
}
