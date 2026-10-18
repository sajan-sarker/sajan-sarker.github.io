import { useState } from 'react';
import data from '../data/data.json';
import SectionHeading from './SectionHeading';
import WindowFrame from './WindowFrame';
import { snakeCase } from '../utils/format';

const FILE_COLORS = ['#60a5fa', '#c084fc', '#7dd3fc', '#f59e0b', '#34d399', '#f472b6', '#818cf8', '#a855f7'];

function CodeLine({ indent = 0, children }) {
  return (
    <div className="code-line">
      <span className="code-content" style={{ paddingLeft: `${indent * 1.5}rem` }}>
        {children}
      </span>
    </div>
  );
}

export default function SkillsSection() {
  const skills = data.skills;
  const [active, setActive] = useState(0);
  const current = skills[active];
  const fileName = (category) => `${snakeCase(category)}.py`;
  const totalSkills = skills.reduce((n, s) => n + s.groups.reduce((m, g) => m + g.tags.length, 0), 0);

  return (
    <section id="skills" className="section-wrapper section-alt">
      <div className="max-w-6xl mx-auto px-4">
        <SectionHeading index={5} title="Skills" comment="python3 skills.py" />

        <div className="reveal">
          <WindowFrame
            title={`skills — ${fileName(current.category)}`}
            className="skills-window"
            bodyClassName="skills-layout"
            footer={
              <div className="status-bar">
                <span><i className="fa-solid fa-code-branch" aria-hidden="true" /> main</span>
                <span>{`${skills.length} files`}</span>
                <span>{`${totalSkills} skills`}</span>
                <span className="ml-auto hidden sm:inline">UTF-8</span>
                <span className="hidden sm:inline"><i className="fab fa-python" aria-hidden="true" /> Python 3</span>
              </div>
            }
          >
            <aside className="skills-sidebar" role="tablist" aria-label="Skill categories">
              <p className="sidebar-label">EXPLORER</p>
              {skills.map((s, i) => (
                <button
                  key={s.category}
                  type="button"
                  role="tab"
                  aria-selected={active === i}
                  className={`skills-file${active === i ? ' is-active' : ''}`}
                  onClick={() => setActive(i)}
                  style={{ '--file-color': FILE_COLORS[i % FILE_COLORS.length] }}
                >
                  <i className="fab fa-python" aria-hidden="true" />
                  <span className="truncate">{fileName(s.category)}</span>
                  <span className="skills-count">{s.groups.reduce((m, g) => m + g.tags.length, 0)}</span>
                </button>
              ))}
            </aside>

            <div className="skills-editor" key={active} role="tabpanel">
              <CodeLine><span className="tok-comment">{`# ${current.category}`}</span></CodeLine>
              <CodeLine>
                <span className="tok-var">{snakeCase(current.category).toUpperCase()}</span>
                <span className="tok-punc">: </span>
                <span className="tok-kw">dict</span>
                <span className="tok-punc">[</span>
                <span className="tok-kw">str</span>
                <span className="tok-punc">, </span>
                <span className="tok-kw">list</span>
                <span className="tok-punc">] = {'{'}</span>
              </CodeLine>
              {current.groups.map((group) => (
                <div key={group.label}>
                  <CodeLine indent={1}><span className="tok-comment">{`# ${group.label}`}</span></CodeLine>
                  <CodeLine indent={1}>
                    <span className="tok-key">{`"${snakeCase(group.label)}"`}</span>
                    <span className="tok-punc">: [</span>
                  </CodeLine>
                  <CodeLine indent={2}>
                    <span className="tag-list">
                      {group.tags.map((tag) => (
                        <span key={tag} className="tag tag-string">{`"${tag}"`}</span>
                      ))}
                    </span>
                  </CodeLine>
                  <CodeLine indent={1}><span className="tok-punc">],</span></CodeLine>
                </div>
              ))}
              <CodeLine><span className="tok-punc">{'}'}</span></CodeLine>
              <CodeLine>{' '}</CodeLine>
              <CodeLine>
                <span className="tok-builtin">print</span>
                <span className="tok-punc">(</span>
                <span className="tok-builtin">sum</span>
                <span className="tok-punc">(</span>
                <span className="tok-builtin">len</span>
                <span className="tok-punc">(v) </span>
                <span className="tok-kw">for</span>
                <span className="tok-punc"> v </span>
                <span className="tok-kw">in</span>
                <span className="tok-punc"> </span>
                <span className="tok-var">{snakeCase(current.category).toUpperCase()}</span>
                <span className="tok-punc">.values()))  </span>
                <span className="tok-comment">{`# ${current.groups.reduce((m, g) => m + g.tags.length, 0)}`}</span>
              </CodeLine>
            </div>
          </WindowFrame>
        </div>
      </div>
    </section>
  );
}
