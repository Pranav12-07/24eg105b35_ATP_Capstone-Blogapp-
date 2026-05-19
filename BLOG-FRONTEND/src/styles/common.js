// ─── Layout ───────────────────────────────────────────
export const pageBackground = "bg-[#f7f6f4] min-h-screen";
export const pageWrapper = "max-w-5xl mx-auto px-6 py-16";
export const section = "mb-14";

// ─── Cards ────────────────────────────────────────────
export const cardClass =
  "bg-[#eeece8] rounded-2xl p-7 hover:bg-[#e4e2dd] transition-colors duration-200 cursor-pointer";

// ─── Typography ───────────────────────────────────────
export const pageTitleClass = "text-5xl font-bold text-[#2f2f2f] tracking-tight leading-none mb-2";
export const headingClass = "text-2xl font-bold text-[#2f2f2f] tracking-tight";
export const subHeadingClass = "text-lg font-semibold text-[#3a3a3a] tracking-tight";
export const bodyText = "text-[#6f6f6f] leading-relaxed";
export const mutedText = "text-sm text-[#9a9a9a]";
export const linkClass = "text-[#7a6f5c] hover:text-[#5f5546] transition-colors";

// ─── Buttons ──────────────────────────────────────────
export const primaryBtn =
  "bg-[#7a6f5c] text-white font-semibold px-5 py-2 rounded-full hover:bg-[#5f5546] transition-colors cursor-pointer text-sm tracking-tight";
export const secondaryBtn =
  "border border-[#d6d3ce] text-[#2f2f2f] font-medium px-5 py-2 rounded-full hover:bg-[#eceae6] transition-colors cursor-pointer text-sm";
export const ghostBtn =
  "text-[#7a6f5c] font-medium hover:text-[#5f5546] transition-colors cursor-pointer text-sm";

// ─── Forms ────────────────────────────────────────────
export const formCard = "bg-[#eeece8] rounded-2xl p-10 max-w-4xl mx-auto";
export const formTitle = "text-2xl font-bold text-[#2f2f2f] tracking-tight text-center mb-7";
export const labelClass = "text-xs font-medium text-[#6f6f6f] mb-1.5 block";
export const inputClass =
  "w-full bg-[#faf9f7] border border-[#d6d3ce] rounded-xl px-4 py-2.5 text-[#2f2f2f] text-sm placeholder:text-[#a8a8a8] focus:outline-none focus:border-[#7a6f5c] focus:ring-2 focus:ring-[#7a6f5c]/10 transition";
export const formGroup = "mb-4";
export const submitBtn =
  "w-full bg-[#7a6f5c] text-white font-semibold py-2.5 rounded-full hover:bg-[#5f5546] transition-colors cursor-pointer mt-2 text-sm tracking-tight";

// ─── Navbar ───────────────────────────────────────────
export const navbarClass =
  "bg-[#f7f6f4]/90 backdrop-blur-xl border-b border-[#e2e0db] px-8 h-[52px] flex items-center sticky top-0 z-50";
export const navContainerClass = "max-w-5xl mx-auto w-full flex items-center justify-between";
export const navBrandClass = "text-base font-semibold text-[#2f2f2f] tracking-tight";
export const navLinksClass = "flex items-center gap-7";
export const navLinkClass =
  "text-[0.8rem] text-[#7a7a7a] hover:text-[#2f2f2f] transition-colors font-normal";
export const navLinkActiveClass =
  "text-[0.8rem] text-[#7a6f5c] font-medium";

// ─── Article / Blog ───────────────────────────────────
export const articleGrid = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6";
export const articleCardClass =
  "bg-[#eeece8] p-7 hover:bg-[#e4e2dd] transition-colors duration-200 flex flex-col gap-2.5 cursor-pointer";
export const articleTitle = "text-base font-semibold text-[#2f2f2f] leading-snug tracking-tight";
export const articleExcerpt = "text-sm text-[#6f6f6f] leading-relaxed";
export const articleMeta = "text-xs text-[#9a9a9a]";
export const articleBody = "text-[#6f6f6f] leading-[1.85] text-[0.95rem] max-w-2xl";
export const timestampClass = "text-xs text-[#9a9a9a] flex items-center gap-1.5";
export const tagClass =
  "text-[0.65rem] font-semibold text-[#7a6f5c] uppercase tracking-widest w-fit";

// ─── Article Page ─────────────────────────────────────
export const articlePageWrapper = "max-w-3xl mx-auto px-6 py-14";
export const articleHeader = "mb-10 flex flex-col gap-4";
export const articleCategory =
  "text-[0.7rem] font-semibold uppercase tracking-widest text-[#7a6f5c]";
export const articleMainTitle =
  "text-4xl font-bold text-[#2f2f2f] leading-tight tracking-tight";
export const articleAuthorRow =
  "flex items-center justify-between border-t border-b border-[#e2e0db] py-4 text-sm text-[#6f6f6f]";
export const authorInfo = "flex items-center gap-2 font-medium text-[#2f2f2f]";
export const articleContent =
  "text-[#2f2f2f] leading-[1.9] text-[1rem] whitespace-pre-line mt-8";
export const articleFooter =
  "border-t border-[#e2e0db] mt-12 pt-6 text-sm text-[#9a9a9a]";

// ─── Article Actions ─────────────────────────────
export const articleActions = "flex gap-3 mt-6";
export const editBtn =
  "bg-[#7a6f5c] text-white text-sm px-4 py-2 rounded-full hover:bg-[#5f5546] transition";
export const deleteBtn =
  "bg-[#b94b4b] text-white text-sm px-4 py-2 rounded-full hover:bg-[#933a3a] transition";

// ─── Article Status Badge ─────────────────────────
export const articleStatusActive =
  "absolute top-3 right-3 text-[10px] font-semibold px-2 py-1 rounded-full bg-[#8fbc8f]/20 text-[#4f7f4f]";
export const articleStatusDeleted =
  "absolute top-3 right-3 text-[10px] font-semibold px-2 py-1 rounded-full bg-[#b94b4b]/20 text-[#933a3a]";

// ─── Feedback ─────────────────────────────────────────
export const errorClass =
  "bg-[#b94b4b]/10 text-[#933a3a] border border-[#b94b4b]/20 rounded-xl px-4 py-3 text-sm";
export const successClass =
  "bg-[#8fbc8f]/10 text-[#4f7f4f] border border-[#8fbc8f]/20 rounded-xl px-4 py-3 text-sm";
export const loadingClass = "text-[#7a6f5c]/60 text-sm animate-pulse text-center py-10";
export const emptyStateClass = "text-center text-[#9a9a9a] py-16 text-sm";

// ─── Comments ───────────────────────────────────────
export const commentsWrapper = "mt-12 flex flex-col gap-6";
export const commentCard =
  "bg-[#eeece8] rounded-2xl p-5 transition hover:bg-[#e4e2dd]";
export const commentHeader = "flex items-center justify-between mb-2";
export const commentUser = "text-sm font-semibold text-[#2f2f2f]";
export const commentTime = "text-xs text-[#9a9a9a]";
export const commentText =
  "text-[#2f2f2f] text-sm leading-relaxed mt-1";
export const avatar =
  "w-9 h-9 rounded-full bg-[#7a6f5c]/10 text-[#7a6f5c] flex items-center justify-center text-sm font-semibold";
export const commentUserRow = "flex items-center gap-3";

// ─── Divider ──────────────────────────────────────────
export const divider = "border-t border-[#e2e0db] my-10";