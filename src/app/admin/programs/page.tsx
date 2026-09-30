"use client";

import { useEffect, useState, useMemo, useSyncExternalStore, useCallback } from "react";
import Link from "next/link";
import { Plus_Jakarta_Sans } from "next/font/google";
import {
  Search,
  RefreshCw,
  Trash2,
  ExternalLink,
  Edit3,
  Plus,
  CheckCircle2,
  AlertCircle,
  Save,
  X,
  Lock,
  Unlock,
  LogIn,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  LogOut,
  Globe,
  Tag,
} from "lucide-react";
import type { ProgramItem } from "@/lib/content-db";
import { formatCourseSlug } from "@/lib/seo-utils";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  preload: false,
});



const emptySubscribe = () => () => { };
function useAdminSession() {
  return useSyncExternalStore(
    emptySubscribe,
    () => (typeof window !== "undefined" ? sessionStorage.getItem("treqo_admin_auth") === "true" : false),
    () => false
  );
}

export default function AdminProgramsPage() {
  const isSessionAuthed = useAdminSession();
  const [unlocked, setUnlocked] = useState(false);
  const isAuthenticated = isSessionAuthed || unlocked;

  const [pinInput, setPinInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");

  const [programs, setPrograms] = useState<ProgramItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "live" | "coming-soon">("all");

  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Modal State for Add / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingProgram, setEditingProgram] = useState<ProgramItem | null>(null);
  const [programForm, setProgramForm] = useState<Partial<ProgramItem> & { slug?: string }>({
    id: "",
    slug: "",
    title: "",
    description: "",
    metaTitle: "",
    metaDescription: "",
    image: "",
    previewLabel: "STUDENT WORKSHOP",
    badge: "BATCH 2 · OPEN",
    badgeVariant: "blue",
    duration: "4 months · Online",
    actionText: "View course →",
    actionHref: "/courses/new-program",
    href: "/courses/new-program",
    tags: ["All"],
    isLocked: false,
    order: 1,
    metaKeywords: [],
  });
  const [rawKeywordsInput, setRawKeywordsInput] = useState("");
  const [rawTagsInput, setRawTagsInput] = useState("");
  const [isSlugCustomized, setIsSlugCustomized] = useState(false);

  // Delete Confirmation Modal State
  const [deletingProgram, setDeletingProgram] = useState<ProgramItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  function getStoredPin(): string {
    if (typeof window === "undefined") return "";
    return sessionStorage.getItem("treqo_admin_pin") || "";
  }

  function notifySuccess(msg: string) {
    setSaveMessage(msg);
    setTimeout(() => setSaveMessage(null), 3500);
  }

  function notifyError(msg: string) {
    setErrorMessage(msg);
    setTimeout(() => setErrorMessage(null), 4500);
  }

  const loadPrograms = useCallback(async () => {
    try {
      const res = await fetch("/api/programs", {
        headers: { "x-admin-pin": getStoredPin() },
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.programs)) {
          setPrograms(data.programs);
        }
      } else {
        notifyError("Failed to fetch programs from server.");
      }
    } catch {
      notifyError("Network error loading programs.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch programs once authenticated
  useEffect(() => {
    if (isAuthenticated) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      loadPrograms();
    }
  }, [isAuthenticated, loadPrograms]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setAuthError("");
    const trimmed = pinInput.trim();

    if (!trimmed) {
      setAuthError("Please enter your administrator PIN / password.");
      return;
    }

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: trimmed }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        sessionStorage.setItem("treqo_admin_auth", "true");
        sessionStorage.setItem("treqo_admin_pin", trimmed);
        setUnlocked(true);
        setPinInput("");
        setAuthError("");
      } else {
        setAuthError(data.error || "Incorrect PIN. Access denied.");
      }
    } catch {
      setAuthError("Authentication service error. Please check your network connection.");
    }
  }

  function handleLogout() {
    sessionStorage.removeItem("treqo_admin_auth");
    sessionStorage.removeItem("treqo_admin_pin");
    setUnlocked(false);
    setPrograms([]);
  }

  // Toggle Live / Coming Soon
  async function handleToggleStatus(program: ProgramItem) {
    const newLockState = !program.isLocked;
    const newBadge = newLockState ? "COMING SOON" : (program.badge === "COMING SOON" ? "BATCH 2 · OPEN" : program.badge);
    const newVariant = newLockState ? "gray" : (program.badgeVariant === "gray" ? "blue" : program.badgeVariant || "blue");
    const newAction = newLockState ? "Get notified →" : "View course →";
    const newApplyCta = newLockState ? "Notify Me When Open" : (program.applyCta === "Notify Me When Open" ? "Apply for Batch 2" : (program.applyCta || "Apply for Batch 2"));
    const newHref = program.href || `/categories/${program.id}`;

    // Optimistic update
    setPrograms((prev) =>
      prev.map((p) =>
        p.id === program.id
          ? {
            ...p,
            isLocked: newLockState,
            badge: newBadge,
            badgeVariant: newVariant,
            actionText: newAction,
            applyCta: newApplyCta,
            href: newHref,
            actionHref: newHref,
          }
          : p
      )
    );

    try {
      const res = await fetch(`/api/programs/${encodeURIComponent(program.id)}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-pin": getStoredPin(),
        },
        body: JSON.stringify({
          isLocked: newLockState,
          badge: newBadge,
          badgeVariant: newVariant,
          actionText: newAction,
          applyCta: newApplyCta,
          href: newHref,
          actionHref: newHref,
        }),
      });

      if (res.ok) {
        notifySuccess(newLockState ? `Locked "${program.title}" (Coming Soon)` : `Unlocked "${program.title}" (Live)`);
      } else {
        notifyError("Failed to update program status.");
        loadPrograms();
      }
    } catch {
      notifyError("Network error updating program status.");
      loadPrograms();
    }
  }

  // Order Move Up / Down
  async function handleMoveOrder(index: number, direction: "up" | "down") {
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= programs.length) return;

    const reordered = [...programs];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(targetIdx, 0, moved);

    // Update order values
    const orderedIds = reordered.map((p) => p.id);
    setPrograms(reordered.map((p, idx) => ({ ...p, order: idx + 1 })));

    try {
      const res = await fetch("/api/programs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-pin": getStoredPin(),
        },
        body: JSON.stringify({
          action: "reorder",
          orderedIds,
        }),
      });
      if (res.ok) {
        notifySuccess("Program order updated.");
      } else {
        notifyError("Failed to save reordered list.");
        loadPrograms();
      }
    } catch {
      notifyError("Network error reordering programs.");
      loadPrograms();
    }
  }

  function openAddModal() {
    setEditingProgram(null);
    setIsSlugCustomized(false);
    setProgramForm({
      id: "",
      slug: "",
      title: "",
      description: "",
      metaTitle: "",
      metaDescription: "",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      previewLabel: "CAMPUS WORKSHOP",
      badge: "BATCH 2 · OPEN",
      badgeVariant: "blue",
      duration: "4 months · Online",
      actionText: "View course →",
      actionHref: "/courses/new-program",
      href: "/courses/new-program",
      tags: ["All", "Flagship"],
      isLocked: false,
      order: programs.length + 1,
      metaKeywords: [],
    });
    setRawTagsInput("All, Flagship");
    setRawKeywordsInput("");
    setIsModalOpen(true);
  }

  function openEditModal(program: ProgramItem) {
    const initialSlug = program.id || formatCourseSlug(program.href) || "";
    const canonicalHref = program.actionHref || program.href || (initialSlug ? `/courses/${initialSlug}` : "");
    setEditingProgram(program);
    setIsSlugCustomized(true);
    setProgramForm({
      ...program,
      slug: initialSlug,
      metaTitle: program.metaTitle || (program.title ? `${program.title} | TREQO` : ""),
      metaDescription: program.metaDescription || program.description || "",
      actionHref: canonicalHref,
      href: canonicalHref,
      tags: program.tags || ["All"],
      metaKeywords: program.metaKeywords || [],
    });
    setRawTagsInput(Array.isArray(program.tags) ? program.tags.join(", ") : "All");
    setRawKeywordsInput(Array.isArray(program.metaKeywords) ? program.metaKeywords.join(", ") : "");
    setIsModalOpen(true);
  }

  async function handleSaveProgram(e: React.FormEvent) {
    e.preventDefault();
    if (!programForm.title?.trim()) {
      notifyError("Program title is required.");
      return;
    }
    if (!programForm.description?.trim()) {
      notifyError("Program description is required.");
      return;
    }
    if (!programForm.badge?.trim()) {
      notifyError("Badge text is required.");
      return;
    }

    const parsedSlug = formatCourseSlug(programForm.slug || programForm.id || programForm.title);
    if (!parsedSlug) {
      notifyError("A valid URL slug or title is required.");
      return;
    }

    setIsSaving(true);
    const parsedKeywords = rawKeywordsInput
      .split(/[,;\n]+/)
      .map((k) => k.trim())
      .filter(Boolean);
    const parsedTags = rawTagsInput
      .split(/[,;\n]+/)
      .map((t) => t.trim())
      .filter(Boolean);

    const canonicalHref = programForm.actionHref?.trim() || `/courses/${parsedSlug}`;

    const payload = {
      ...programForm,
      id: parsedSlug,
      slug: parsedSlug,
      href: canonicalHref,
      actionHref: canonicalHref,
      metaTitle: programForm.metaTitle?.trim() || (programForm.title ? `${programForm.title.trim()} | TREQO` : ""),
      metaDescription: programForm.metaDescription?.trim() || programForm.description?.trim() || "",
      metaKeywords: parsedKeywords,
      tags: parsedTags.length > 0 ? parsedTags : ["All"],
    };

    try {
      if (editingProgram) {
        // PATCH with editable slug support
        const res = await fetch(`/api/programs/${encodeURIComponent(editingProgram.id)}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "x-admin-pin": getStoredPin(),
          },
          body: JSON.stringify({
            ...payload,
            newSlug: parsedSlug,
          }),
        });
        if (res.ok) {
          notifySuccess(`Saved "${programForm.title}" (Slug: ${parsedSlug})`);
          setIsModalOpen(false);
          loadPrograms();
        } else {
          const err = await res.json();
          notifyError(err.error || "Failed to update program.");
        }
      } else {
        // POST with editable slug
        const res = await fetch("/api/programs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-admin-pin": getStoredPin(),
          },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          notifySuccess(`Created program "${programForm.title}" (Slug: ${parsedSlug})`);
          setIsModalOpen(false);
          loadPrograms();
        } else {
          const err = await res.json();
          notifyError(err.error || "Failed to create program.");
        }
      }
    } catch {
      notifyError("Network error saving program.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleConfirmDelete() {
    if (!deletingProgram) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/programs/${encodeURIComponent(deletingProgram.id)}`, {
        method: "DELETE",
        headers: { "x-admin-pin": getStoredPin() },
      });
      if (res.ok) {
        notifySuccess(`Deleted "${deletingProgram.title}"`);
        setDeletingProgram(null);
        setPrograms((prev) => prev.filter((p) => p.id !== deletingProgram.id));
      } else {
        const err = await res.json();
        notifyError(err.error || "Failed to delete program.");
      }
    } catch {
      notifyError("Network error deleting program.");
    } finally {
      setIsDeleting(false);
    }
  }

  // Filtered list
  const filteredPrograms = useMemo(() => {
    return programs.filter((p) => {
      // Status filter
      if (filterStatus === "live" && p.isLocked) return false;
      if (filterStatus === "coming-soon" && !p.isLocked) return false;

      // Search query
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      const inTitle = p.title.toLowerCase().includes(q);
      const inDesc = p.description.toLowerCase().includes(q);
      const inMeta = p.meta ? p.meta.toLowerCase().includes(q) : false;
      const inPreview = p.previewLabel ? p.previewLabel.toLowerCase().includes(q) : false;
      const inTags = p.tags?.some((t) => t.toLowerCase().includes(q)) ?? false;
      return inTitle || inDesc || inMeta || inPreview || inTags;
    });
  }, [programs, filterStatus, searchQuery]);

  const liveCount = programs.filter((p) => !p.isLocked).length;
  const comingSoonCount = programs.filter((p) => p.isLocked).length;

  // Unauthenticated view
  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen bg-[#FDFAF6] text-[#0B0B0F] flex items-center justify-center p-4 ${plusJakarta.className}`}>
        <div className="w-full max-w-md rounded-2xl border border-[#3B0D3B]/15 bg-[#FAF5EE] p-8 shadow-xl">
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#3B0D3B]/10 border border-[#3B0D3B]/20 text-[#3B0D3B]">
              <Lock className="h-7 w-7" />
            </div>
            <h1 className="mt-4 text-2xl font-black text-[#0B0B0F] tracking-tight">Programs Management</h1>
            <p className="mt-1.5 text-xs text-[#5A4A5A]">
              Enter your Administrator PIN to access the programs console.
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="text-xs font-bold text-[#0B0B0F]">Administrator PIN</label>
              <div className="relative mt-1.5">
                <input
                  type={showPassword ? "text" : "password"}
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setAuthError("");
                  }}
                  placeholder="Enter administrator PIN"
                  className="w-full rounded-xl border border-[#3B0D3B]/15 bg-white px-4 py-3 text-sm text-[#0B0B0F] placeholder:text-[#5A4A5A]/50 focus:border-[#3B0D3B] focus:ring-1 focus:ring-[#3B0D3B]/20 focus:outline-none transition-all"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#5A4A5A] hover:text-[#0B0B0F]"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {authError && (
              <div className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 p-3 text-xs text-red-700">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#3B0D3B] hover:bg-[#2A082A] py-3 text-sm font-bold text-white shadow-sm transition-all cursor-pointer"
            >
              <LogIn className="h-4 w-4" />
              <span>Unlock Programs Console</span>
            </button>

            <div className="text-center pt-2">
              <Link href="/" className="text-xs text-[#5A4A5A] hover:text-[#0B0B0F] transition-colors">
                ← Return to Public Website
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Authenticated view
  return (
    <div className={`min-h-screen bg-[#FDFAF6] text-[#0B0B0F] flex ${plusJakarta.className}`}>
      {/* 1. SIDEBAR */}
      <aside className="w-64 border-r border-[#3B0D3B]/15 bg-[#FAF5EE] flex flex-col justify-between hidden md:flex shrink-0">
        <div className="p-6 space-y-6">
          <Link href="/" target="_blank" className="flex items-center gap-2.5">
            <span className="text-xl font-black text-[#0B0B0F] tracking-wider">TREQO</span>
            <span className="rounded bg-[#3B0D3B]/10 px-1.5 py-0.5 text-[9px] font-black text-[#3B0D3B] tracking-widest uppercase">
              ADMIN
            </span>
          </Link>

          <nav className="space-y-1">
            <Link
              href="/admin"
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-[#5A4A5A] hover:text-[#0B0B0F] hover:bg-[#F5EDE0] transition-colors"
            >
              <LayoutDashboard className="h-4 w-4 shrink-0 text-[#5A4A5A]" />
              <span>Dashboard Overview</span>
            </Link>

            <Link
              href="/admin/programs"
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-[#3B0D3B] text-white shadow-sm"
            >
              <div className="flex items-center gap-3">
                <GraduationCap className="h-4 w-4 shrink-0 text-white" />
                <span>Programs &amp; Courses</span>
              </div>
              <span className="text-[10px] text-white/80 font-black">{programs.length}</span>
            </Link>

            <Link
              href="/admin/leads"
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-[#5A4A5A] hover:text-[#0B0B0F] hover:bg-[#F5EDE0] transition-colors"
            >
              <Users className="h-4 w-4 shrink-0 text-[#5A4A5A]" />
              <span>Student Leads</span>
            </Link>

            <Link
              href="/admin"
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-[#5A4A5A] hover:text-[#0B0B0F] hover:bg-[#F5EDE0] transition-colors"
            >
              <BookOpen className="h-4 w-4 shrink-0 text-[#5A4A5A]" />
              <span>Settings &amp; Blogs</span>
            </Link>
          </nav>
        </div>

        <div className="p-4 border-t border-[#3B0D3B]/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-full bg-[#3B0D3B]/10 text-[#3B0D3B] font-bold text-xs flex items-center justify-center border border-[#3B0D3B]/20">
              A
            </div>
            <div>
              <p className="text-xs font-bold text-[#0B0B0F] leading-tight">Admin</p>
              <p className="text-[10px] text-[#5A4A5A] leading-tight">Treqo HQ</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="p-1.5 text-[#5A4A5A] hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
            title="Log Out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 px-6 sm:px-8 flex items-center justify-between border-b border-[#3B0D3B]/15 bg-[#FDFAF6]/90 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <h1 className="text-base sm:text-lg font-black text-[#0B0B0F] tracking-tight">
              Programs &amp; Curriculum Tracks
            </h1>
            <span className="rounded-full bg-[#3B0D3B]/10 px-2.5 py-0.5 text-[11px] font-bold text-[#3B0D3B]">
              {programs.length} total
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs text-[#5A4A5A] hover:text-[#0B0B0F] px-3 py-1.5 rounded-lg border border-[#3B0D3B]/15 hover:bg-[#FAF5EE] transition-colors"
            >
              <span>View Website</span>
              <ExternalLink className="h-3 w-3 opacity-70" />
            </Link>

            <button
              type="button"
              onClick={openAddModal}
              className="inline-flex items-center gap-2 rounded-xl bg-[#3B0D3B] hover:bg-[#2A082A] px-3.5 py-2 text-xs font-bold text-white shadow-sm transition-all cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Program</span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="md:hidden p-2 text-[#5A4A5A] hover:text-red-600"
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </header>

        {/* Notifications Bar */}
        {saveMessage && (
          <div className="mx-6 mt-4 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2 shadow-sm">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
            <span>{saveMessage}</span>
          </div>
        )}
        {errorMessage && (
          <div className="mx-6 mt-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-center gap-2 shadow-sm">
            <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        <main className="p-6 sm:p-8 space-y-6 flex-1 max-w-[1350px] w-full">
          {/* Top Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-2xl bg-white border border-[#3B0D3B]/15 p-4 flex items-center gap-4 shadow-sm">
              <div className="h-11 w-11 rounded-xl bg-[#3B0D3B]/10 border border-[#3B0D3B]/20 flex items-center justify-center shrink-0 text-[#3B0D3B]">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl font-black text-[#0B0B0F]">{programs.length}</div>
                <div className="text-[11px] text-[#5A4A5A] font-medium">Total Programs</div>
              </div>
            </div>

            <div className="rounded-2xl bg-white border border-[#3B0D3B]/15 p-4 flex items-center gap-4 shadow-sm">
              <div className="h-11 w-11 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0 text-emerald-600">
                <Unlock className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl font-black text-emerald-600">{liveCount}</div>
                <div className="text-[11px] text-[#5A4A5A] font-medium">Live Programs</div>
              </div>
            </div>

            <div className="rounded-2xl bg-white border border-[#3B0D3B]/15 p-4 flex items-center gap-4 shadow-sm">
              <div className="h-11 w-11 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0 text-amber-600">
                <Lock className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl font-black text-amber-600">{comingSoonCount}</div>
                <div className="text-[11px] text-[#5A4A5A] font-medium">Coming Soon</div>
              </div>
            </div>
          </div>

          {/* Action & Filter Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex flex-1 flex-col sm:flex-row gap-3">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5A4A5A]" />
                <input
                  type="text"
                  placeholder="Search by title, description, tags, preview label..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-[#3B0D3B]/15 bg-white pl-10 pr-4 py-2.5 text-xs text-[#0B0B0F] placeholder:text-[#5A4A5A]/50 focus:border-[#3B0D3B] focus:ring-1 focus:ring-[#3B0D3B]/20 focus:outline-none transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5A4A5A] hover:text-[#0B0B0F]"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-1 bg-white border border-[#3B0D3B]/15 rounded-xl p-1 shrink-0 shadow-sm">
                <button
                  type="button"
                  onClick={() => setFilterStatus("all")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${filterStatus === "all" ? "bg-[#3B0D3B] text-white shadow-sm" : "text-[#5A4A5A] hover:text-[#0B0B0F]"
                    }`}
                >
                  All ({programs.length})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterStatus("live")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${filterStatus === "live" ? "bg-emerald-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
                    }`}
                >
                  Live ({liveCount})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterStatus("coming-soon")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${filterStatus === "coming-soon" ? "bg-amber-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
                    }`}
                >
                  Coming Soon ({comingSoonCount})
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={loadPrograms}
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-[#0e111a] px-3.5 py-2.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
                <span>Refresh</span>
              </button>
            </div>
          </div>

          {/* Programs Grid */}
          {filteredPrograms.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-800 p-12 text-center bg-[#0a0d14]/40">
              <GraduationCap className="h-10 w-10 text-slate-600 mx-auto mb-3" />
              <h3 className="text-sm font-bold text-white">No programs found</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                {searchQuery || filterStatus !== "all"
                  ? "Try adjusting your search query or status filter."
                  : "Click 'Add Program' to create your first track."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredPrograms.map((program, idx) => (
                <div
                  key={program.id}
                  className={`rounded-2xl border transition-all flex flex-col justify-between overflow-hidden bg-[#0e111a] ${program.isLocked
                    ? "border-amber-900/40 shadow-amber-950/10"
                    : "border-slate-800 hover:border-slate-700 shadow-slate-950/20"
                    }`}
                >
                  {/* Card Media Preview Header */}
                  <div className="relative aspect-[16/9] w-full bg-slate-900 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={program.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"}
                      alt={program.title}
                      className="h-full w-full object-cover"
                    />

                    {/* Preview Label */}
                    <div className="absolute top-2.5 left-2.5">
                      <span className="rounded-md bg-black/70 backdrop-blur-md px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white/90 border border-white/10">
                        {program.previewLabel || "CLASSROOM"}
                      </span>
                    </div>

                    {/* Order Controls */}
                    <div className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-black/70 backdrop-blur-md rounded-lg p-1 border border-white/10">
                      <button
                        type="button"
                        onClick={() => handleMoveOrder(idx, "up")}
                        disabled={idx === 0}
                        title="Move Up"
                        className="p-1 text-slate-300 hover:text-white disabled:opacity-30 cursor-pointer"
                      >
                        <ArrowUp className="h-3 w-3" />
                      </button>
                      <span className="text-[10px] font-bold text-white px-1">#{program.order ?? idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => handleMoveOrder(idx, "down")}
                        disabled={idx === filteredPrograms.length - 1}
                        title="Move Down"
                        className="p-1 text-slate-300 hover:text-white disabled:opacity-30 cursor-pointer"
                      >
                        <ArrowDown className="h-3 w-3" />
                      </button>
                    </div>

                    {/* Status Banner */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between">
                      {/* Badge pill */}
                      <span
                        className={`rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${program.badgeVariant === "amber"
                          ? "bg-amber-500 text-black font-black"
                          : program.badgeVariant === "gray" || program.isLocked
                            ? "bg-slate-800 text-slate-300 border border-slate-700"
                            : "bg-[#3B0D3B] text-white"
                          }`}
                      >
                        {program.badge}
                      </span>

                      {/* Status Toggle Button */}
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(program)}
                        className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md transition-all cursor-pointer ${program.isLocked
                          ? "bg-amber-950/80 text-amber-300 border border-amber-600/50 hover:bg-amber-900"
                          : "bg-emerald-950/80 text-emerald-300 border border-emerald-600/50 hover:bg-emerald-900"
                          }`}
                        title={program.isLocked ? "Click to set Live" : "Click to set Coming Soon"}
                      >
                        {program.isLocked ? (
                          <>
                            <Lock className="h-3 w-3" />
                            <span>Coming Soon</span>
                          </>
                        ) : (
                          <>
                            <Unlock className="h-3 w-3" />
                            <span>Live</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="text-[11px] font-medium text-slate-400">
                        {program.duration || program.meta}
                      </div>
                      <h3 className="mt-1 font-bold text-base text-white line-clamp-1">{program.title}</h3>
                      <p className="mt-1 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {program.description}
                      </p>
                    </div>

                    {/* Tags */}
                    {program.tags && program.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {program.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded bg-slate-800/80 px-1.5 py-0.5 text-[9px] font-semibold text-slate-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Bottom Action Footer */}
                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => openEditModal(program)}
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs font-semibold text-slate-200 hover:bg-slate-700 cursor-pointer"
                        >
                          <Edit3 className="h-3 w-3" />
                          <span>Edit</span>
                        </button>
                        <Link
                          href={program.actionHref || `/categories/${program.id}`}
                          target="_blank"
                          className="inline-flex items-center gap-1 rounded-lg bg-slate-900 border border-slate-800 px-2.5 py-1 text-xs text-slate-400 hover:text-white"
                        >
                          <ExternalLink className="h-3 w-3" />
                          <span>Preview</span>
                        </Link>
                      </div>

                      <button
                        type="button"
                        onClick={() => setDeletingProgram(program)}
                        className="text-slate-500 hover:text-red-400 p-1.5 rounded-lg hover:bg-red-950/30 transition-colors cursor-pointer"
                        title="Delete Program"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* 3. ADD / EDIT PROGRAM MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0B0B0F]/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-2xl border border-[#3B0D3B]/15 bg-[#FDFAF6] p-6 sm:p-8 shadow-2xl my-8 text-[#0B0B0F]">
            <div className="flex items-center justify-between border-b border-[#3B0D3B]/10 pb-4">
              <div>
                <h2 className="text-xl font-bold text-[#0B0B0F]">
                  {editingProgram ? `Edit Program: ${editingProgram.title}` : "Create New Program Track"}
                </h2>
                <p className="text-xs text-[#5A4A5A] mt-0.5">
                  Configure titles, badges, preview labels, and homepage display metadata.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-[#5A4A5A] hover:text-[#0B0B0F] hover:bg-[#FAF5EE] p-1.5 rounded-lg transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProgram} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-[#0B0B0F]">Program Title *</label>
                  <input
                    type="text"
                    required
                    value={programForm.title || ""}
                    onChange={(e) => {
                      const newTitle = e.target.value;
                      const updates: Partial<typeof programForm> = { title: newTitle };
                      if (!editingProgram && !isSlugCustomized) {
                        const autoSlug = formatCourseSlug(newTitle);
                        updates.slug = autoSlug;
                        updates.actionHref = autoSlug ? `/courses/${autoSlug}` : "";
                        updates.href = autoSlug ? `/courses/${autoSlug}` : "";
                      }
                      setProgramForm({ ...programForm, ...updates });
                    }}
                    placeholder="e.g. Growth & Performance Marketing Specialist"
                    className="mt-1 w-full rounded-xl border border-[#3B0D3B]/15 bg-white px-3.5 py-2.5 text-xs text-[#0B0B0F] placeholder:text-[#5A4A5A]/50 focus:border-[#3B0D3B] focus:ring-1 focus:ring-[#3B0D3B]/20 focus:outline-none transition-all"
                  />
                </div>

                {/* Editable URL Slug */}
                <div className="sm:col-span-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-[#0B0B0F] flex items-center gap-1.5">
                      <span>Program URL Slug *</span>
                      <span className="text-[10px] font-normal text-[#5A4A5A]">(Editable route identifier)</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        const autoSlug = formatCourseSlug(programForm.title);
                        if (autoSlug) {
                          setIsSlugCustomized(false);
                          setProgramForm({
                            ...programForm,
                            slug: autoSlug,
                            actionHref: `/courses/${autoSlug}`,
                            href: `/courses/${autoSlug}`,
                          });
                        }
                      }}
                      className="text-[11px] font-semibold text-[#3B0D3B] hover:underline flex items-center gap-1 cursor-pointer"
                      title="Auto-generate slug from program title"
                    >
                      <RefreshCw className="h-3 w-3" />
                      Auto-generate from title
                    </button>
                  </div>
                  <div className="mt-1 flex rounded-xl border border-[#3B0D3B]/15 bg-white overflow-hidden focus-within:border-[#3B0D3B] focus-within:ring-1 focus-within:ring-[#3B0D3B]/20 transition-all">
                    <span className="inline-flex items-center px-3 text-[11px] font-mono text-[#5A4A5A] bg-[#FAF5EE] border-r border-[#3B0D3B]/10 select-none">
                      /courses/
                    </span>
                    <input
                      type="text"
                      required
                      value={programForm.slug || ""}
                      onChange={(e) => {
                        const cleaned = formatCourseSlug(e.target.value);
                        setIsSlugCustomized(true);
                        setProgramForm({
                          ...programForm,
                          slug: cleaned,
                          actionHref: cleaned ? `/courses/${cleaned}` : "",
                          href: cleaned ? `/courses/${cleaned}` : "",
                        });
                      }}
                      placeholder="growth-marketing-specialist"
                      className="flex-1 px-3.5 py-2.5 text-xs font-mono font-semibold text-[#0B0B0F] placeholder:text-[#5A4A5A]/50 focus:outline-none"
                    />
                  </div>
                  <div className="mt-1 flex items-center justify-between text-[11px] text-[#5A4A5A]">
                    <span>
                      Live public path:{" "}
                      <code className="text-[#3B0D3B] font-bold font-mono">
                        /courses/{formatCourseSlug(programForm.slug || programForm.title) || "slug"}
                      </code>
                    </span>
                    {programForm.slug && (
                      <Link
                        href={`/courses/${formatCourseSlug(programForm.slug)}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 text-[#3B0D3B] hover:underline font-semibold"
                      >
                        <span>Preview Route</span>
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-[#0B0B0F]">Description *</label>
                  <textarea
                    required
                    rows={3}
                    value={programForm.description || ""}
                    onChange={(e) => setProgramForm({ ...programForm, description: e.target.value })}
                    placeholder="Detailed program summary and curriculum highlights..."
                    className="mt-1 w-full rounded-xl border border-[#3B0D3B]/15 bg-white px-3.5 py-2.5 text-xs text-[#0B0B0F] placeholder:text-[#5A4A5A]/50 focus:border-[#3B0D3B] focus:ring-1 focus:ring-[#3B0D3B]/20 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#0B0B0F]">Badge Text *</label>
                  <input
                    type="text"
                    required
                    value={programForm.badge || ""}
                    onChange={(e) => setProgramForm({ ...programForm, badge: e.target.value })}
                    placeholder="e.g. BATCH 2 · OPEN or COMING SOON"
                    className="mt-1 w-full rounded-xl border border-[#3B0D3B]/15 bg-white px-3.5 py-2.5 text-xs text-[#0B0B0F] focus:border-[#3B0D3B] focus:ring-1 focus:ring-[#3B0D3B]/20 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#0B0B0F]">Badge Variant *</label>
                  <select
                    value={programForm.badgeVariant || "blue"}
                    onChange={(e) =>
                      setProgramForm({
                        ...programForm,
                        badgeVariant: e.target.value as "blue" | "amber" | "gray" | "emerald",
                      })
                    }
                    className="mt-1 w-full rounded-xl border border-[#3B0D3B]/15 bg-white px-3.5 py-2.5 text-xs text-[#0B0B0F] focus:border-[#3B0D3B] focus:ring-1 focus:ring-[#3B0D3B]/20 focus:outline-none cursor-pointer transition-all"
                  >
                    <option value="blue">Blue (Standard Active)</option>
                    <option value="amber">Amber (Attention / Limited)</option>
                    <option value="gray">Gray (Locked / Soon)</option>
                    <option value="emerald">Emerald (Brand Accent)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#0B0B0F]">Meta / Duration</label>
                  <input
                    type="text"
                    value={programForm.duration || ""}
                    onChange={(e) =>
                      setProgramForm({
                        ...programForm,
                        duration: e.target.value,
                        meta: e.target.value,
                      })
                    }
                    placeholder="e.g. 4 months · Online"
                    className="mt-1 w-full rounded-xl border border-[#3B0D3B]/15 bg-white px-3.5 py-2.5 text-xs text-[#0B0B0F] focus:border-[#3B0D3B] focus:ring-1 focus:ring-[#3B0D3B]/20 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#0B0B0F]">Preview Label</label>
                  <input
                    type="text"
                    value={programForm.previewLabel || ""}
                    onChange={(e) => setProgramForm({ ...programForm, previewLabel: e.target.value })}
                    placeholder="e.g. CLASSROOM · CEO CHALLENGE"
                    className="mt-1 w-full rounded-xl border border-[#3B0D3B]/15 bg-white px-3.5 py-2.5 text-xs text-[#0B0B0F] focus:border-[#3B0D3B] focus:ring-1 focus:ring-[#3B0D3B]/20 focus:outline-none transition-all"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-[#0B0B0F]">Cover Image URL</label>
                  <input
                    type="text"
                    value={programForm.image || ""}
                    onChange={(e) => setProgramForm({ ...programForm, image: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="mt-1 w-full rounded-xl border border-[#3B0D3B]/15 bg-white px-3.5 py-2.5 text-xs text-[#0B0B0F] focus:border-[#3B0D3B] focus:ring-1 focus:ring-[#3B0D3B]/20 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#0B0B0F]">Action CTA Text</label>
                  <input
                    type="text"
                    value={programForm.actionText || ""}
                    onChange={(e) => setProgramForm({ ...programForm, actionText: e.target.value })}
                    placeholder="e.g. View course → or Get notified →"
                    className="mt-1 w-full rounded-xl border border-[#3B0D3B]/15 bg-white px-3.5 py-2.5 text-xs text-[#0B0B0F] focus:border-[#3B0D3B] focus:ring-1 focus:ring-[#3B0D3B]/20 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#0B0B0F]">Action Target URL *</label>
                  <input
                    type="text"
                    required
                    value={programForm.actionHref || ""}
                    onChange={(e) =>
                      setProgramForm({
                        ...programForm,
                        actionHref: e.target.value,
                        href: e.target.value,
                      })
                    }
                    placeholder="/courses/digital-marketing"
                    className="mt-1 w-full rounded-xl border border-[#3B0D3B]/15 bg-white px-3.5 py-2.5 text-xs text-[#0B0B0F] focus:border-[#3B0D3B] focus:ring-1 focus:ring-[#3B0D3B]/20 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#0B0B0F]">Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={rawTagsInput}
                    onChange={(e) => setRawTagsInput(e.target.value)}
                    placeholder="All, Flagship, Short, Students"
                    className="mt-1 w-full rounded-xl border border-[#3B0D3B]/15 bg-white px-3.5 py-2.5 text-xs text-[#0B0B0F] focus:border-[#3B0D3B] focus:ring-1 focus:ring-[#3B0D3B]/20 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#0B0B0F]">Display Order</label>
                  <input
                    type="number"
                    min={1}
                    value={programForm.order ?? 1}
                    onChange={(e) => setProgramForm({ ...programForm, order: Number(e.target.value) })}
                    className="mt-1 w-full rounded-xl border border-[#3B0D3B]/15 bg-white px-3.5 py-2.5 text-xs text-[#0B0B0F] focus:border-[#3B0D3B] focus:ring-1 focus:ring-[#3B0D3B]/20 focus:outline-none transition-all"
                  />
                </div>

                {/* ================================================= */}
                {/* SEO & SEARCH ENGINE METADATA (REAL-TIME REFLECTION) */}
                {/* ================================================= */}
                <div className="sm:col-span-2 rounded-2xl border border-[#3B0D3B]/15 bg-[#FAF5EE]/50 p-4 sm:p-5 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#3B0D3B]/10 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center h-7 w-7 rounded-lg bg-[#3B0D3B] text-white">
                        <Search className="h-3.5 w-3.5" />
                      </span>
                      <div>
                        <h4 className="text-xs font-bold text-[#0B0B0F]">Program SEO &amp; Meta Data</h4>
                        <p className="text-[10px] text-[#5A4A5A]">
                          Reflects in real-time across Google SERP snippet previews and public page metadata.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full bg-[#3B0D3B]/10 text-[#3B0D3B] text-[10px] font-black uppercase">
                        {rawKeywordsInput.split(/[,;\n]+/).filter((k) => k.trim()).length} keywords active
                      </span>
                    </div>
                  </div>

                  {/* Real-Time Google SERP Snippet Preview */}
                  <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs space-y-1">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block">
                      Real-Time Google Search Engine Result Preview
                    </span>
                    <div className="text-[11px] text-emerald-800 flex items-center gap-1 font-mono">
                      <Globe className="h-3 w-3 text-emerald-600" />
                      <span>
                        https://treqo.org/courses/{formatCourseSlug(programForm.slug || programForm.title) || "program-slug"}
                      </span>
                    </div>
                    <h5 className="text-xs sm:text-sm font-semibold text-blue-800 hover:underline cursor-pointer line-clamp-1">
                      {programForm.metaTitle || (programForm.title ? `${programForm.title} | TREQO` : "Program Title | TREQO")}
                    </h5>
                    <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                      {programForm.metaDescription || programForm.description || "Enter description to preview Google search snippet..."}
                    </p>
                  </div>

                  {/* SEO Title & Description Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="text-[11px] font-bold text-[#0B0B0F] block mb-1">
                        Page SEO Meta Title (Title Tag)
                      </label>
                      <input
                        type="text"
                        value={programForm.metaTitle || ""}
                        onChange={(e) => setProgramForm({ ...programForm, metaTitle: e.target.value })}
                        placeholder={programForm.title ? `${programForm.title} | TREQO` : "e.g. Growth Marketing Track | TREQO"}
                        className="w-full rounded-xl border border-[#3B0D3B]/15 bg-white px-3 py-2 text-xs text-[#0B0B0F] placeholder:text-[#5A4A5A]/50 focus:border-[#3B0D3B] focus:outline-none transition-all"
                      />
                      <span className="mt-1 text-[10px] text-[#5A4A5A] block">
                        {(programForm.metaTitle || (programForm.title ? `${programForm.title} | TREQO` : "")).length} / 60 chars (Recommended: 50-60)
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[11px] font-bold text-[#0B0B0F]">
                          SEO Meta Description
                        </label>
                        {programForm.description && programForm.metaDescription !== programForm.description && (
                          <button
                            type="button"
                            onClick={() => setProgramForm({ ...programForm, metaDescription: programForm.description })}
                            className="text-[10px] text-[#3B0D3B] hover:underline font-semibold cursor-pointer"
                          >
                            Copy from description
                          </button>
                        )}
                      </div>
                      <textarea
                        rows={2}
                        value={programForm.metaDescription || ""}
                        onChange={(e) => setProgramForm({ ...programForm, metaDescription: e.target.value })}
                        placeholder={programForm.description || "Brief snippet for Google search ranking (140-160 characters)..."}
                        className="w-full rounded-xl border border-[#3B0D3B]/15 bg-white px-3 py-2 text-xs text-[#0B0B0F] placeholder:text-[#5A4A5A]/50 focus:border-[#3B0D3B] focus:outline-none transition-all"
                      />
                      <div className="mt-1 flex items-center justify-between text-[10px]">
                        <span className={(programForm.metaDescription || "").length > 160 ? "text-amber-600 font-semibold" : "text-[#5A4A5A]"}>
                          {(programForm.metaDescription || "").length} / 160 chars
                        </span>
                        <span className="text-[#5A4A5A]">
                          {(programForm.metaDescription || "").length >= 120 && (programForm.metaDescription || "").length <= 160 ? "✅ Optimal length" : ""}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Keywords Input */}
                  <div className="space-y-2 pt-2 border-t border-[#3B0D3B]/10">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-bold text-[#0B0B0F] flex items-center gap-1">
                        <Tag className="h-3 w-3 text-[#3B0D3B]" />
                        <span>Category SEO Meta Keywords (comma-separated)</span>
                      </label>
                      {rawKeywordsInput.trim().length > 0 && (
                        <button
                          type="button"
                          onClick={() => setRawKeywordsInput("")}
                          className="text-[10px] font-bold text-red-600 hover:text-red-800 cursor-pointer"
                        >
                          Clear all keywords
                        </button>
                      )}
                    </div>
                    <textarea
                      rows={2}
                      value={rawKeywordsInput}
                      onChange={(e) => setRawKeywordsInput(e.target.value)}
                      placeholder="digital marketing classes, seo training, performance marketing certification, google ads course..."
                      className="w-full rounded-xl border border-[#3B0D3B]/15 bg-white px-3 py-2 text-xs text-[#0B0B0F] placeholder:text-[#5A4A5A]/50 focus:border-[#3B0D3B] focus:ring-1 focus:ring-[#3B0D3B]/20 focus:outline-none transition-all leading-relaxed"
                    />

                    {/* Quick Preset Buttons */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                      <span className="text-[10px] font-bold text-[#5A4A5A]">Quick presets:</span>
                      {[
                        { label: "+ Performance Marketing", kw: "performance marketing, meta ads, roas optimization" },
                        { label: "+ SEO & CRO", kw: "search engine optimization, cro, google search console, ga4 attribution" },
                        { label: "+ Career & Placement", kw: "digital marketing course with placement, marketing certificate hyderabad" },
                      ].map((preset) => (
                        <button
                          key={preset.label}
                          type="button"
                          onClick={() => {
                            const current = rawKeywordsInput.trim();
                            if (!current) {
                              setRawKeywordsInput(preset.kw);
                            } else {
                              const existingList = current.split(/[,;\n]+/).map((k) => k.trim()).filter(Boolean);
                              const toAdd = preset.kw.split(/[,;\n]+/).map((k) => k.trim()).filter((k) => !existingList.includes(k));
                              setRawKeywordsInput([...existingList, ...toAdd].join(", "));
                            }
                          }}
                          className="px-2 py-0.5 rounded-lg border border-[#3B0D3B]/15 bg-white hover:bg-[#FAF5EE] text-[10px] font-semibold text-[#3B0D3B] transition-colors cursor-pointer"
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>

                    {/* Active Keyword Chips */}
                    {rawKeywordsInput.trim().length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1.5 max-h-36 overflow-y-auto">
                        {rawKeywordsInput
                          .split(/[,;\n]+/)
                          .map((k) => k.trim())
                          .filter(Boolean)
                          .map((kw, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center gap-1 rounded-md bg-white border border-[#3B0D3B]/20 px-2 py-0.5 text-[11px] text-[#3B0D3B] shadow-2xs font-medium"
                            >
                              <span>{kw}</span>
                              <button
                                type="button"
                                onClick={() => {
                                  const remaining = rawKeywordsInput
                                    .split(/[,;\n]+/)
                                    .map((k) => k.trim())
                                    .filter(Boolean)
                                    .filter((_, idx) => idx !== i);
                                  setRawKeywordsInput(remaining.join(", "));
                                }}
                                className="text-[#3B0D3B]/60 hover:text-red-600 font-bold ml-0.5 cursor-pointer"
                                title="Remove keyword"
                              >
                                &times;
                              </button>
                            </span>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Status Toggle in Form */}
              <div className="flex items-center justify-between rounded-xl bg-white border border-[#3B0D3B]/15 p-3.5 mt-2 shadow-sm">
                <div>
                  <span className="text-xs font-bold text-[#0B0B0F] block">Program Lock Status</span>
                  <span className="text-[11px] text-[#5A4A5A]">
                    {programForm.isLocked ? "Currently Locked (Coming Soon mode)" : "Currently Open (Live enrollment)"}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setProgramForm({
                      ...programForm,
                      isLocked: !programForm.isLocked,
                      badge: !programForm.isLocked ? "COMING SOON" : "BATCH 2 · OPEN",
                      badgeVariant: !programForm.isLocked ? "gray" : "blue",
                      actionText: !programForm.isLocked ? "Get notified →" : "View course →",
                    })
                  }
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${programForm.isLocked
                    ? "bg-amber-50 text-amber-700 border border-amber-200"
                    : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    }`}
                >
                  {programForm.isLocked ? "🔒 Locked (Coming Soon)" : "🔓 Live (Open)"}
                </button>
              </div>

              <div className="pt-4 border-t border-[#3B0D3B]/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border border-[#3B0D3B]/15 bg-white px-4 py-2.5 text-xs font-semibold text-[#5A4A5A] hover:bg-[#FAF5EE] hover:text-[#0B0B0F] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#3B0D3B] hover:bg-[#2A082A] px-5 py-2.5 text-xs font-bold text-white shadow-sm transition-all cursor-pointer disabled:opacity-50"
                >
                  <Save className="h-4 w-4" />
                  <span>{isSaving ? "Saving..." : editingProgram ? "Save Changes" : "Create Program"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. DELETE CONFIRMATION MODAL */}
      {deletingProgram && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl border border-red-900/50 bg-[#0e111a] p-6 shadow-2xl">
            <div className="flex items-center gap-3 text-red-400 mb-3">
              <div className="p-2 rounded-xl bg-red-950/60 border border-red-800/50">
                <Trash2 className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white">Confirm Deletion</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Are you sure you want to permanently delete the program{" "}
              <strong className="text-white">&quot;{deletingProgram.title}&quot;</strong>? This will remove it from both
              the admin database and the public website.
            </p>
            <div className="mt-6 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setDeletingProgram(null)}
                className="rounded-xl border border-slate-700 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="rounded-xl bg-red-600 hover:bg-red-500 px-4 py-2 text-xs font-bold text-white shadow-md cursor-pointer disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Yes, Delete Program"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
