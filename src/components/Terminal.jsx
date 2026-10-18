import { useCallback, useEffect, useRef, useState } from 'react';
import data from '../data/data.json';
import WindowFrame from './WindowFrame';

const SECTION_IDS = ['home', 'about', 'experience', 'educations', 'projects', 'skills', 'activities', 'certifications', 'contact'];
const SUGGESTIONS = ['help', 'whoami', 'projects', 'skills', 'contact'];
const BOOT_COMMAND = 'whoami';

const resumeHref = data.social.find((s) => s.label.toLowerCase() === 'resume')?.href;

function Prompt() {
  return (
    <span className="term-prompt">
      <span className="tp-user">guest@sajan</span>
      <span className="tp-sep">:</span>
      <span className="tp-path">~</span>
      <span className="tp-sep">$</span>
    </span>
  );
}

function resolveSection(name) {
  const query = name.toLowerCase().replace(/^[./~]+|\/+$/g, '');
  return SECTION_IDS.find((id) => id.startsWith(query));
}

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

const COMMANDS = {
  help: {
    desc: 'list available commands',
    run: () => [
      <span className="term-muted">Available commands:</span>,
      ...Object.entries(COMMANDS)
        .filter(([, c]) => !c.hidden)
        .map(([name, c]) => (
          <span>
            <span className="term-key">{`  ${name.padEnd(12)}`}</span>
            <span className="term-muted">{c.desc}</span>
          </span>
        )),
    ],
  },
  whoami: {
    desc: 'who is Sajan?',
    run: () => [
      <span className="term-accent term-bold">{data.meta.name}</span>,
    ],
  },
  about: {
    desc: 'short bio',
    run: () => [<span>{data.about.paragraphs[0]}</span>],
  },
  skills: {
    desc: 'tech stack by category',
    run: () =>
      data.skills.map((s) => (
        <span>
          <span className="term-key">{s.category}: </span>
          <span className="term-string">{s.groups.flatMap((g) => g.tags).join(', ')}</span>
        </span>
      )),
  },
  projects: {
    desc: 'list projects',
    run: () => [
      ...data.projects.map((p, i) => (
        <span>
          <span className="term-muted">{`[${String(i + 1).padStart(2, '0')}] `}</span>
          {p.title}
        </span>
      )),
      <span className="term-muted">{"→ run 'cd projects' to see details"}</span>,
    ],
  },
  experience: {
    desc: 'work history',
    run: () =>
      data.experience.map((e) => (
        <span>
          <span className="term-accent">{e.role}</span>
          <span className="term-muted"> @ </span>
          {e.company}
          <span className="term-muted">{` (${e.period})`}</span>
        </span>
      )),
  },
  education: {
    desc: 'degrees & schools',
    run: () =>
      data.education.map((e) => (
        <span>
          <span className="term-accent">{e.degree}</span>
          <span className="term-muted"> — </span>
          {e.institution}
        </span>
      )),
  },
  certs: {
    desc: 'certifications',
    run: () => [
      <span className="term-muted">{`${data.certifications.length} certificates found:`}</span>,
      ...data.certifications.map((c) => <span>{`  • ${c.title}`}</span>),
    ],
  },
  contact: {
    desc: 'how to reach me',
    run: () => {
      const { email, phone, location } = data.contact;
      return [
        <span><span className="term-key">email    </span><a href={`mailto:${email}`}>{email}</a></span>,
        <span><span className="term-key">phone    </span>{phone}</span>,
        <span><span className="term-key">location </span>{location}</span>,
      ];
    },
  },
  socials: {
    desc: 'social profiles',
    run: () =>
      data.social.map(({ label, href }) => (
        <span>
          <span className="term-key">{label.padEnd(10)}</span>
          <a href={href} target="_blank" rel="noopener noreferrer">{href.replace(/^https?:\/\//, '')}</a>
        </span>
      )),
  },
  resume: {
    desc: 'open my resume',
    run: () => {
      if (!resumeHref) return [<span className="term-error">resume not available</span>];
      window.open(resumeHref, '_blank', 'noopener');
      return [<span className="term-muted">Opening resume in a new tab…</span>];
    },
  },
  ls: {
    desc: 'list sections',
    run: () => [<span className="term-path">{SECTION_IDS.map((id) => `${id}/`).join('  ')}</span>],
  },
  cd: {
    desc: 'jump to a section, e.g. cd projects',
    run: ([target]) => {
      if (!target) return [<span className="term-muted">usage: cd &lt;section&gt; — try 'ls'</span>];
      const id = resolveSection(target);
      if (!id) return [<span className="term-error">{`cd: no such section: ${target}`}</span>];
      scrollToSection(id);
      return [<span className="term-muted">{`Navigating to /${id} …`}</span>];
    },
  },
  clear: { desc: 'clear the terminal', run: () => [] },
  echo: { hidden: true, run: (args) => [<span>{args.join(' ')}</span>] },
  date: { hidden: true, run: () => [<span>{new Date().toString()}</span>] },
  sudo: {
    hidden: true,
    run: () => [<span className="term-error">guest is not in the sudoers file. This incident will be reported.</span>],
  },
};

const COMMAND_NAMES = Object.keys(COMMANDS);

export default function Terminal() {
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(null);
  const [booting, setBooting] = useState(true);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);
  const nextId = useRef(0);

  const push = useCallback((nodes) => {
    setLines((prev) => [...prev, ...nodes.map((node) => ({ id: nextId.current++, node }))]);
  }, []);

  const execute = useCallback(
    (raw) => {
      const trimmed = raw.trim();
      const [name = '', ...args] = trimmed.split(/\s+/);
      const command = COMMANDS[name.toLowerCase()];

      if (trimmed) setHistory((h) => [...h, trimmed]);

      if (command && name.toLowerCase() === 'clear') {
        setLines([]);
        return;
      }

      const echo = (
        <span>
          <Prompt /> <span className="term-cmd">{raw}</span>
        </span>
      );

      if (!trimmed) {
        push([echo]);
      } else if (!command) {
        push([
          echo,
          <span className="term-error">{`command not found: ${name}`}</span>,
          <span className="term-muted">{"Type 'help' to see available commands."}</span>,
        ]);
      } else {
        push([echo, ...command.run(args)]);
      }
    },
    [push]
  );

  // Boot: type out `whoami`, run it, then show a hint
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timers = [];
    const finish = () => {
      setInput('');
      execute(BOOT_COMMAND);
      push([<span className="term-muted">{"Type 'help' to explore, or click a command below."}</span>]);
      setBooting(false);
    };

    if (reduceMotion) {
      timers.push(setTimeout(finish, 0));
    } else {
      let i = 0;
      const tick = () => {
        i += 1;
        setInput(BOOT_COMMAND.slice(0, i));
        timers.push(setTimeout(i < BOOT_COMMAND.length ? tick : finish, i < BOOT_COMMAND.length ? 110 : 400));
      };
      timers.push(setTimeout(tick, 900));
    }

    return () => timers.forEach(clearTimeout);
  }, [execute, push]);

  // Keep the newest output in view (scrolls only the terminal, never the page)
  useEffect(() => {
    const body = bodyRef.current;
    if (body) body.scrollTop = body.scrollHeight;
  }, [lines]);

  const run = (command) => {
    execute(command);
    setInput('');
    setHistoryIndex(null);
  };

  const handleKeyDown = (e) => {
    if (booting) return;

    if (e.key === 'Enter') {
      run(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const idx = historyIndex === null ? history.length - 1 : Math.max(historyIndex - 1, 0);
      setHistoryIndex(idx);
      setInput(history[idx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === null) return;
      const idx = historyIndex + 1;
      if (idx >= history.length) {
        setHistoryIndex(null);
        setInput('');
      } else {
        setHistoryIndex(idx);
        setInput(history[idx]);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const matches = COMMAND_NAMES.filter((c) => !COMMANDS[c].hidden && c.startsWith(input.trim().toLowerCase()));
      if (matches.length === 1) setInput(`${matches[0]} `);
      else if (matches.length > 1) push([<span className="term-muted">{matches.join('  ')}</span>]);
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  const focusInput = () => {
    if (window.getSelection()?.toString()) return;
    inputRef.current?.focus({ preventScroll: true });
  };

  return (
    <WindowFrame
      title="guest@sajan: ~ — zsh"
      className="terminal"
      bodyClassName="terminal-body"
      bodyProps={{ ref: bodyRef, onMouseUp: focusInput }}
      footer={
        <div className="terminal-suggest">
          <span className="term-muted">try:</span>
          {SUGGESTIONS.map((c) => (
            <button key={c} type="button" disabled={booting} onClick={() => run(c)}>
              {c}
            </button>
          ))}
        </div>
      }
    >
      <div aria-live="polite">
        {lines.map(({ id, node }) => (
          <div key={id} className="term-line">{node}</div>
        ))}
      </div>
      <label className="term-input-row">
        <Prompt />
        <input
          ref={inputRef}
          className="term-input"
          value={input}
          readOnly={booting}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Terminal command input"
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
        />
      </label>
    </WindowFrame>
  );
}
