import { FormEvent, ReactNode, useMemo, useState } from "react";

type View = "home" | "birthdays" | "reminders" | "calendar" | "settings";
type IconName =
  | "home"
  | "cake"
  | "bell"
  | "calendar"
  | "settings"
  | "plus"
  | "search"
  | "chevron"
  | "close"
  | "phone"
  | "message"
  | "mail"
  | "edit"
  | "more"
  | "check"
  | "download"
  | "moon";

type Person = {
  id: number;
  name: string;
  initials: string;
  date: string;
  day: number;
  month: string;
  relationship: string;
  countdown: string;
  age: number;
  phone: string;
  email: string;
  notes: string;
  color: string;
};

const people: Person[] = [
  { id: 1, name: "Ama Mensah", initials: "AM", date: "8 October", day: 8, month: "October", relationship: "Friend", countdown: "Today", age: 24, phone: "+233 24 123 4567", email: "ama@example.com", notes: "Loves flowers, brunch, and handwritten notes.", color: "coral" },
  { id: 2, name: "Kofi Boateng", initials: "KB", date: "11 October", day: 11, month: "October", relationship: "Family", countdown: "3 days", age: 31, phone: "+233 20 456 7812", email: "kofi@example.com", notes: "Call in the morning.", color: "blue" },
  { id: 3, name: "Abena Owusu", initials: "AO", date: "14 October", day: 14, month: "October", relationship: "Friend", countdown: "6 days", age: 27, phone: "+233 26 987 3434", email: "abena@example.com", notes: "Send a book recommendation.", color: "green" },
  { id: 4, name: "Michael Doe", initials: "MD", date: "17 October", day: 17, month: "October", relationship: "Work", countdown: "9 days", age: 35, phone: "+1 415 555 0112", email: "michael@example.com", notes: "Prefers a quick message.", color: "orange" },
  { id: 5, name: "Yaa Asante", initials: "YA", date: "22 October", day: 22, month: "October", relationship: "Family", countdown: "14 days", age: 29, phone: "+233 54 222 9887", email: "yaa@example.com", notes: "Plan a family dinner.", color: "purple" },
  { id: 6, name: "Nana Adjei", initials: "NA", date: "5 November", day: 5, month: "November", relationship: "Friend", countdown: "28 days", age: 26, phone: "+233 50 712 8022", email: "nana@example.com", notes: "Enjoys live music.", color: "blue" },
  { id: 7, name: "Sofia Martin", initials: "SM", date: "18 November", day: 18, month: "November", relationship: "Work", countdown: "41 days", age: 32, phone: "+34 612 345 678", email: "sofia@example.com", notes: "Send wishes in the afternoon.", color: "purple" },
];

const icons: Record<IconName, ReactNode> = {
  home: <><path d="M3 10.8 12 3l9 7.8" /><path d="M5.5 9.5V21h13V9.5M9 21v-7h6v7" /></>,
  cake: <><path d="M4 14h16v7H4zM6 14v-4h12v4M9 10V7M15 10V7" /><path d="M9 4c0 1-.7 1.5-1.5 1.5S6 5 6 4c0-.8 1.5-2 1.5-2S9 3.2 9 4ZM16.5 5.5C15.7 5.5 15 5 15 4c0-.8 1.5-2 1.5-2S18 3.2 18 4c0 1-.7 1.5-1.5 1.5Z" /></>,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></>,
  settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.6v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z" /></>,
  plus: <path d="M12 5v14M5 12h14" />,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
  chevron: <path d="m9 18 6-6-6-6" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 3 5.2 2 2 0 0 1 5 3h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.4 2.1L9.1 10.9a16 16 0 0 0 4 4l1.3-1.2a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />,
  message: <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  edit: <><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" /></>,
  more: <><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  download: <><path d="M12 3v12m0 0 4-4m-4 4-4-4M4 21h16" /></>,
  moon: <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" />,
};

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icons[name]}</svg>;
}

function Button({ children, variant = "primary", icon, onClick, type = "button", disabled = false, className = "" }: { children: ReactNode; variant?: "primary" | "secondary" | "ghost" | "danger"; icon?: IconName; onClick?: () => void; type?: "button" | "submit"; disabled?: boolean; className?: string }) {
  return <button className={`button button-${variant} ${className}`} onClick={onClick} type={type} disabled={disabled}>{icon && <Icon name={icon} size={18} />}{children}</button>;
}

function Avatar({ person, large = false }: { person: Person; large?: boolean }) {
  return <div className={`avatar avatar-${person.color} ${large ? "avatar-large" : ""}`} aria-hidden="true">{person.initials}</div>;
}

function StatusBadge({ status }: { status: "Pending" | "Scheduled" | "Done" }) {
  return <span className={`status status-${status.toLowerCase()}`}><span className="status-dot" />{status}</span>;
}

function BirthdayRow({ person, onClick }: { person: Person; onClick: () => void }) {
  return (
    <button className="birthday-row" onClick={onClick}>
      <Avatar person={person} />
      <span className="birthday-main"><strong>{person.name}</strong><span>{person.date} · {person.relationship}</span></span>
      <span className={`countdown ${person.countdown === "Today" ? "today-text" : ""}`}>{person.countdown}</span>
      <Icon name="chevron" size={18} />
    </button>
  );
}

function Modal({ children, onClose, label }: { children: ReactNode; onClose: () => void; label: string }) {
  return <div className="modal-backdrop" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && onClose()}><section className="modal" role="dialog" aria-modal="true" aria-label={label}>{children}</section></div>;
}

function Field({ label, id, type = "text", placeholder, value, onChange, error }: { label: string; id: string; type?: string; placeholder?: string; value: string; onChange: (value: string) => void; error?: string }) {
  return <label className="field" htmlFor={id}><span>{label}</span><input id={id} type={type} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} aria-invalid={Boolean(error)} />{error && <small className="field-error">{error}</small>}</label>;
}

function Header({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return <header className="page-header"><div><h1>{title}</h1>{subtitle && <p>{subtitle}</p>}</div>{action}</header>;
}

function EmptyState({ title, text, action }: { title: string; text: string; action?: ReactNode }) {
  return <div className="empty-state"><div className="empty-icon"><Icon name="cake" size={24} /></div><h3>{title}</h3><p>{text}</p>{action}</div>;
}

function App() {
  const [view, setView] = useState<View>("home");
  const [selected, setSelected] = useState<Person | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [statuses, setStatuses] = useState<Record<number, "Pending" | "Scheduled" | "Done">>({ 2: "Pending", 3: "Scheduled", 4: "Scheduled", 5: "Done" });
  const [toast, setToast] = useState("");
  const [dark, setDark] = useState(false);
  const [form, setForm] = useState({ name: "", dob: "", phone: "", email: "", notes: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const navigate = (next: View) => { setView(next); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const notify = (message: string) => { setToast(message); window.setTimeout(() => setToast(""), 2600); };
  const openAdd = () => { setSaved(false); setShowAdd(true); setShowAdvanced(false); setErrors({}); };

  const saveBirthday = (event: FormEvent) => {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!form.name.trim()) nextErrors.name = "Please enter a full name.";
    if (!form.dob) nextErrors.dob = "Please choose a date of birth.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setSaved(true);
    setTimeout(() => { setShowAdd(false); setSaved(false); setForm({ name: "", dob: "", phone: "", email: "", notes: "" }); navigate("home"); notify("Birthday saved"); }, 1300);
  };

  const filteredPeople = useMemo(() => people.filter((person) => {
    const matchesSearch = person.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || (filter === "This week" && person.id <= 3) || (filter === "This month" && person.month === "October") || person.relationship === filter.replace("Friends", "Friend");
    return matchesSearch && matchesFilter;
  }), [search, filter]);

  return (
    <div className={`app ${dark ? "dark" : ""}`}>
      <aside className="sidebar">
        <button className="brand" onClick={() => navigate("home")} aria-label="bday home"><span className="brand-mark"><Icon name="cake" size={20} /></span><span>bday</span></button>
        <nav className="desktop-nav" aria-label="Main navigation">
          <NavItem label="Home" icon="home" active={view === "home"} onClick={() => navigate("home")} />
          <NavItem label="Birthdays" icon="cake" active={view === "birthdays"} onClick={() => navigate("birthdays")} />
          <NavItem label="Reminders" icon="bell" active={view === "reminders"} onClick={() => navigate("reminders")} badge="2" />
          <NavItem label="Calendar" icon="calendar" active={view === "calendar"} onClick={() => navigate("calendar")} />
          <NavItem label="Settings" icon="settings" active={view === "settings"} onClick={() => navigate("settings")} />
        </nav>
        <div className="sidebar-footer"><div className="mini-avatar">KA</div><div><strong>Kwame Addo</strong><span>Personal account</span></div><Icon name="more" size={18} /></div>
      </aside>

      <main className="main">
        <div className="mobile-top"><button className="brand" onClick={() => navigate("home")}><span className="brand-mark"><Icon name="cake" size={18} /></span><span>bday</span></button><button className="icon-button" aria-label="Notifications" onClick={() => navigate("reminders")}><Icon name="bell" size={21} /><span className="notification-dot" /></button></div>
        <div className="content">
          {view === "home" && <Home onAdd={openAdd} onPerson={setSelected} onNavigate={navigate} notify={notify} />}
          {view === "birthdays" && <Birthdays search={search} setSearch={setSearch} filter={filter} setFilter={setFilter} people={filteredPeople} onPerson={setSelected} onAdd={openAdd} />}
          {view === "reminders" && <Reminders statuses={statuses} setStatuses={setStatuses} onPerson={setSelected} notify={notify} />}
          {view === "calendar" && <CalendarView onPerson={setSelected} />}
          {view === "settings" && <Settings dark={dark} setDark={setDark} notify={notify} />}
        </div>
      </main>

      <nav className="mobile-nav" aria-label="Mobile navigation">
        <NavItem label="Home" icon="home" active={view === "home"} onClick={() => navigate("home")} />
        <NavItem label="Birthdays" icon="cake" active={view === "birthdays"} onClick={() => navigate("birthdays")} />
        <NavItem label="Reminders" icon="bell" active={view === "reminders"} onClick={() => navigate("reminders")} />
        <NavItem label="More" icon="more" active={view === "settings" || view === "calendar"} onClick={() => navigate("settings")} />
      </nav>
      <button className="fab" onClick={openAdd} aria-label="Add birthday"><Icon name="plus" size={26} /></button>

      {selected && <Profile person={selected} onClose={() => setSelected(null)} onDelete={() => setShowDelete(true)} notify={notify} />}
      {showAdd && <AddBirthday saved={saved} form={form} setForm={setForm} errors={errors} advanced={showAdvanced} setAdvanced={setShowAdvanced} onClose={() => setShowAdd(false)} onSubmit={saveBirthday} />}
      {showDelete && <ConfirmDelete name={selected?.name ?? ""} onCancel={() => setShowDelete(false)} onDelete={() => { setShowDelete(false); setSelected(null); notify("Birthday deleted"); }} />}
      {toast && <div className="toast" role="status"><span><Icon name="check" size={17} /></span>{toast}</div>}
    </div>
  );
}

function NavItem({ label, icon, active, onClick, badge }: { label: string; icon: IconName; active: boolean; onClick: () => void; badge?: string }) {
  return <button className={`nav-item ${active ? "active" : ""}`} onClick={onClick}><span className="nav-icon"><Icon name={icon} size={20} />{badge && <span className="nav-badge">{badge}</span>}</span><span>{label}</span></button>;
}

function Home({ onAdd, onPerson, onNavigate, notify }: { onAdd: () => void; onPerson: (person: Person) => void; onNavigate: (view: View) => void; notify: (message: string) => void }) {
  return <>
    <Header title="Good evening 👋" subtitle="Thursday, 8 October 2026" action={<Button icon="plus" onClick={onAdd}>Add birthday</Button>} />
    <div className="summary" aria-label="Birthday summary">
      <div><strong>127</strong><span>People</span></div><i /><div><strong>2</strong><span>Today</span></div><i /><div><strong>8</strong><span>This week</span></div>
    </div>
    <section className="section">
      <div className="section-heading"><div><span className="eyebrow">Today</span><h2>A day worth celebrating</h2></div><button className="text-button" onClick={() => onNavigate("calendar")}>Open calendar <Icon name="chevron" size={16} /></button></div>
      <div
        className="hero-card"
        style={{
          minHeight: 100,
          padding: 12,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "nowrap",
          borderRadius: 14,
          border: "1px solid rgba(217, 104, 74, 0.18)",
          background:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 246, 241, 0.96) 55%, rgba(255, 238, 230, 0.9) 100%)",
          boxShadow:
            "0 1px 2px rgba(59, 45, 35, 0.04), 0 12px 32px rgba(126, 77, 56, 0.08)",
        }}
      >
        <div className="confetti confetti-one" /><div className="confetti confetti-two" /><div className="confetti confetti-three" />
        <div className="hero-person"><Avatar person={people[0]} large /><div><span className="birthday-label">Birthday today</span><h3>{people[0].name}</h3><p>24 years old today</p></div></div>
        <div className="hero-actions"><Button icon="message" onClick={() => notify("Wishes ready to send")}>Send wishes</Button><Button variant="secondary" onClick={() => onPerson(people[0])}>View profile</Button></div>
      </div>
    </section>
    <section className="section">
      <div className="section-heading"><div><span className="eyebrow">Coming up</span><h2>Next birthdays</h2></div><button className="text-button" onClick={() => onNavigate("birthdays")}>View all <Icon name="chevron" size={16} /></button></div>
      <div className="list-card">{people.slice(1, 5).map((person) => <BirthdayRow key={person.id} person={person} onClick={() => onPerson(person)} />)}</div>
      <p className="tip"><span>i</span> Tap a birthday to see contact details, notes, and reminders.</p>
    </section>
  </>;
}

function Birthdays({ search, setSearch, filter, setFilter, people: visible, onPerson, onAdd }: { search: string; setSearch: (value: string) => void; filter: string; setFilter: (value: string) => void; people: Person[]; onPerson: (person: Person) => void; onAdd: () => void }) {
  const groups = ["October", "November"];
  return <>
    <Header title="Birthdays" subtitle="Everyone you care about, in one calm place." action={<Button icon="plus" onClick={onAdd}>Add birthday</Button>} />
    <div className="toolbar"><label className="search"><Icon name="search" size={19} /><span className="sr-only">Search birthdays</span><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search birthdays…" />{search && <button onClick={() => setSearch("")} aria-label="Clear search"><Icon name="close" size={16} /></button>}</label><div className="chips">{["All", "This week", "This month", "Family", "Friends"].map((item) => <button key={item} onClick={() => setFilter(item)} className={filter === item ? "active" : ""}>{item}</button>)}</div></div>
    {visible.length ? groups.map((month) => {
      const monthPeople = visible.filter((person) => person.month === month);
      return monthPeople.length > 0 && <section className="month-group" key={month}><div className="month-label"><h2>{month}</h2><span>{monthPeople.length} birthdays</span></div><div className="list-card">{monthPeople.map((person) => <BirthdayRow key={person.id} person={person} onClick={() => onPerson(person)} />)}</div></section>;
    }) : <EmptyState title="No birthdays found" text="Try another name or clear your filters." action={<Button variant="secondary" onClick={() => { setSearch(""); setFilter("All"); }}>Clear filters</Button>} />}
  </>;
}

function Reminders({ statuses, setStatuses, onPerson, notify }: { statuses: Record<number, "Pending" | "Scheduled" | "Done">; setStatuses: (next: Record<number, "Pending" | "Scheduled" | "Done">) => void; onPerson: (person: Person) => void; notify: (message: string) => void }) {
  const cycle = (id: number) => {
    const current = statuses[id];
    const next = current === "Pending" ? "Scheduled" : current === "Scheduled" ? "Done" : "Pending";
    setStatuses({ ...statuses, [id]: next });
    notify(`Reminder marked ${next.toLowerCase()}`);
  };
  return <>
    <Header title="Reminders" subtitle="Stay ahead without having to remember everything." />
    <section className="attention-card"><div className="attention-icon"><Icon name="bell" size={22} /></div><div><span className="eyebrow">This week</span><h2>2 birthdays are coming up.</h2><p>Everything is ready. One reminder still needs your attention.</p></div><div className="avatar-stack">{people.slice(1, 4).map((person) => <Avatar key={person.id} person={person} />)}</div></section>
    <section className="section"><div className="section-heading"><div><span className="eyebrow">Scheduled</span><h2>Upcoming reminders</h2></div></div><div className="reminder-list">{people.slice(1, 5).map((person) => <div className="reminder-row" key={person.id}><button className="reminder-person" onClick={() => onPerson(person)}><Avatar person={person} /><span><strong>{person.name}</strong><small>{person.date}</small></span></button><div className="reminder-time"><span>{person.id === 2 ? "3 days before" : "7 days before"}</span><small>at 9:00 AM</small></div><button className="badge-button" onClick={() => cycle(person.id)} aria-label={`Change ${person.name}'s reminder status`}><StatusBadge status={statuses[person.id]} /></button><button className="row-more" aria-label="More reminder options"><Icon name="more" size={19} /></button></div>)}</div></section>
  </>;
}

function CalendarView({ onPerson }: { onPerson: (person: Person) => void }) {
  const [selectedDay, setSelectedDay] = useState(8);
  const offset = 4;
  const days = Array.from({ length: 35 }, (_, i) => i - offset + 1);
  const person = people.find((item) => item.month === "October" && item.day === selectedDay);
  return <>
    <Header title="Calendar" subtitle="See every celebration at a glance." action={<Button variant="secondary">Today</Button>} />
    <div className="calendar-layout"><section className="calendar-card"><div className="calendar-header"><button aria-label="Previous month">‹</button><h2>October 2026</h2><button aria-label="Next month">›</button></div><div className="weekdays">{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => <span key={day}>{day}</span>)}</div><div className="calendar-grid">{days.map((day, i) => day > 0 && day <= 31 ? <button key={i} onClick={() => setSelectedDay(day)} className={`${day === selectedDay ? "selected" : ""} ${people.some((item) => item.month === "October" && item.day === day) ? "has-birthday" : ""}`}><span>{day}</span></button> : <span key={i} />)}</div></section><aside className="day-panel"><span className="eyebrow">Selected day</span><h2>October {selectedDay}</h2>{person ? <div className="calendar-person"><Avatar person={person} large /><strong>{person.name}</strong><span>Turns {person.age} this year</span><Button variant="secondary" onClick={() => onPerson(person)}>View profile</Button></div> : <EmptyState title="A quiet day" text="No birthdays on this date." />}</aside></div>
  </>;
}

function Settings({ dark, setDark, notify }: { dark: boolean; setDark: (value: boolean) => void; notify: (message: string) => void }) {
  return <>
    <Header title="Settings" subtitle="A few simple ways to make bday yours." />
    <div className="settings-layout"><section className="settings-card"><div className="settings-title"><span className="settings-icon"><Icon name="bell" size={20} /></span><div><h2>Reminders</h2><p>Choose how and when you hear from us.</p></div></div><SettingRow title="Default reminder timing" detail="7 days before" onClick={() => notify("Reminder preference opened")} /><SettingRow title="Notification preferences" detail="Email and push" onClick={() => notify("Notification preferences opened")} /></section><section className="settings-card"><div className="settings-title"><span className="settings-icon"><Icon name="settings" size={20} /></span><div><h2>Account & app</h2><p>Manage your account and data.</p></div></div><SettingRow title="Profile and account" detail="Kwame Addo" /><SettingRow title="Data import & export" detail="CSV or contacts" icon="download" onClick={() => notify("Your export is being prepared")} /><div className="setting-row"><span className="row-leading"><Icon name="moon" size={19} /></span><div><strong>Dark theme</strong><span>Use a calmer display at night</span></div><button className={`switch ${dark ? "on" : ""}`} onClick={() => setDark(!dark)} role="switch" aria-checked={dark}><span /></button></div></section><section className="settings-card"><SettingRow title="About bday" detail="Version 1.0" /><SettingRow title="Privacy & support" detail="" /></section></div>
  </>;
}

function SettingRow({ title, detail, icon, onClick }: { title: string; detail: string; icon?: IconName; onClick?: () => void }) {
  return <button className="setting-row" onClick={onClick}>{icon && <span className="row-leading"><Icon name={icon} size={19} /></span>}<div><strong>{title}</strong>{detail && <span>{detail}</span>}</div><Icon name="chevron" size={18} /></button>;
}

function Profile({ person, onClose, onDelete, notify }: { person: Person; onClose: () => void; onDelete: () => void; notify: (message: string) => void }) {
  return <Modal onClose={onClose} label={`${person.name}'s profile`}><div className="modal-top"><span>Birthday profile</span><button className="icon-button" onClick={onClose} aria-label="Close profile"><Icon name="close" size={21} /></button></div><div className="profile-hero"><Avatar person={person} large /><div><span className="birthday-label">{person.countdown === "Today" ? "Birthday today" : `In ${person.countdown}`}</span><h2>{person.name}</h2><p>{person.date} · {person.age} years old</p></div></div><div className="quick-actions"><button onClick={() => notify(`Calling ${person.name}`)}><span><Icon name="phone" size={20} /></span>Call</button><button onClick={() => notify(`Message ready for ${person.name}`)}><span><Icon name="message" size={20} /></span>Message</button><button onClick={() => notify("Wishes ready to send")}><span><Icon name="cake" size={20} /></span>Send wishes</button><button onClick={() => notify("Edit mode opened")}><span><Icon name="edit" size={20} /></span>Edit</button></div><div className="details-grid"><Detail label="Relationship" value={person.relationship} /><Detail label="Group" value={person.relationship === "Work" ? "Colleagues" : "Close circle"} /><Detail label="Phone" value={person.phone} /><Detail label="Email" value={person.email} /><Detail label="Reminder" value="7 days before" /><Detail label="Notes" value={person.notes} wide /></div><button className="delete-link" onClick={onDelete}>Delete birthday</button></Modal>;
}

function Detail({ label, value, wide = false }: { label: string; value: string; wide?: boolean }) {
  return <div className={`detail ${wide ? "wide" : ""}`}><span>{label}</span><strong>{value}</strong></div>;
}

function AddBirthday({ saved, form, setForm, errors, advanced, setAdvanced, onClose, onSubmit }: { saved: boolean; form: { name: string; dob: string; phone: string; email: string; notes: string }; setForm: (form: { name: string; dob: string; phone: string; email: string; notes: string }) => void; errors: Record<string, string>; advanced: boolean; setAdvanced: (value: boolean) => void; onClose: () => void; onSubmit: (event: FormEvent) => void }) {
  return <Modal onClose={onClose} label="Add birthday">{saved ? <div className="success-state"><div><Icon name="check" size={30} /></div><h2>Birthday saved 🎉</h2><p>You’ll get a reminder seven days before.</p></div> : <><div className="modal-top"><span>New birthday</span><button className="icon-button" onClick={onClose} aria-label="Close"><Icon name="close" size={21} /></button></div><div className="form-heading"><h2>Add birthday</h2><p>Just the essentials. You can add more later.</p></div><form onSubmit={onSubmit} noValidate><Field label="Full name" id="name" placeholder="e.g. Efua Mensah" value={form.name} onChange={(name) => setForm({ ...form, name })} error={errors.name} /><Field label="Date of birth" id="dob" type="date" value={form.dob} onChange={(dob) => setForm({ ...form, dob })} error={errors.dob} /><label className="field" htmlFor="reminder"><span>Reminder</span><select id="reminder" defaultValue="7"><option value="1">1 day before birthday</option><option value="3">3 days before birthday</option><option value="7">7 days before birthday</option><option value="14">14 days before birthday</option></select></label><button type="button" className="advanced-toggle" onClick={() => setAdvanced(!advanced)}><Icon name="plus" size={18} /> Add phone, email, group or notes</button>{advanced && <div className="advanced-fields"><Field label="Phone" id="phone" type="tel" placeholder="+233…" value={form.phone} onChange={(phone) => setForm({ ...form, phone })} /><Field label="Email" id="email" type="email" placeholder="name@example.com" value={form.email} onChange={(email) => setForm({ ...form, email })} /><label className="field" htmlFor="notes"><span>Notes</span><textarea id="notes" placeholder="A helpful detail to remember…" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} /></label></div>}<div className="form-actions"><Button variant="secondary" onClick={onClose}>Cancel</Button><Button type="submit">Save birthday</Button></div></form></>}</Modal>;
}

function ConfirmDelete({ name, onCancel, onDelete }: { name: string; onCancel: () => void; onDelete: () => void }) {
  return <Modal onClose={onCancel} label="Confirm deletion"><div className="confirm"><div className="danger-icon"><Icon name="close" size={22} /></div><h2>Delete this birthday?</h2><p>{name} will be removed along with their reminders and notes. This can’t be undone.</p><div className="form-actions"><Button variant="secondary" onClick={onCancel}>Keep birthday</Button><Button variant="danger" onClick={onDelete}>Delete birthday</Button></div></div></Modal>;
}

export default App;
