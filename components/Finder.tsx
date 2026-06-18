"use client";

import Link from "next/link";
import { useState } from "react";
import { FINDER, PKG_MAP } from "@/lib/finder-data";
import { ICONS } from "@/lib/catalogue";
import RawSvg from "./RawSvg";

type Answers = Record<string, string>;

interface FinderRes {
  title: string;
  services: readonly string[];
  pkg: string | null;
  note: string;
}

function resolveResult(answers: Answers): FinderRes {
  const R = FINDER.results as unknown as Record<string, FinderRes>;
  const stage = answers.stage,
    entity = answers.entity;
  if (stage === "idea") return R.idea;
  if (stage === "protect") return R.protect;
  if (stage === "registering") {
    if (entity === "pvt") return R.registering_pvt;
    if (entity === "llp") return R.registering_llp;
    if (entity === "solo") return R.registering_solo;
    return R.registering_pvt;
  }
  if (stage === "running") {
    if (entity === "llp") return R.running_llp;
    if (entity === "solo") return R.default;
    return R.running_pvt;
  }
  return R.default;
}

export default function Finder() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const steps = FINDER.steps;
  const done = step >= steps.length;
  const progCount = steps.length;

  const choose = (key: string, v: string) => {
    setAnswers((a) => ({ ...a, [key]: v }));
    setStep((s) => s + 1);
  };
  const restart = () => {
    setStep(0);
    setAnswers({});
  };

  return (
    <>
      <div className="finder-prog" id="finder-prog">
        {Array.from({ length: progCount }).map((_, i) => (
          <span key={i} className={i <= (done ? progCount : step) ? "on" : ""} />
        ))}
      </div>
      <div id="finder-body">
        {!done ? (
          <div className="finder-step">
            <div className="finder-q">{steps[step].q}</div>
            <div className="finder-opts">
              {steps[step].options.map((o) => (
                <button key={o.v} className="fopt" onClick={() => choose(steps[step].key, o.v)}>
                  <b>{o.label}</b>
                  <span>{o.sub}</span>
                </button>
              ))}
            </div>
            {step > 0 && (
              <button className="finder-back" onClick={() => setStep((s) => s - 1)}>
                <RawSvg html={ICONS.arrowIcon} />
                Back
              </button>
            )}
          </div>
        ) : (
          <FinderResult answers={answers} onRestart={restart} />
        )}
      </div>
    </>
  );
}

function FinderResult({ answers, onRestart }: { answers: Answers; onRestart: () => void }) {
  const r = resolveResult(answers);
  const pkg = r.pkg ? (PKG_MAP as unknown as Record<string, { name: string; fee: string; save: number }>)[r.pkg] : null;
  return (
    <div className="fres">
      <span className="fres-badge">
        <RawSvg html={ICONS.sparkIcon} />
        Your recommended setup
      </span>
      <h3 className="fres-title">{r.title}</h3>
      <p className="fres-note">{r.note}</p>
      <div className="fres-svc">
        {r.services.map((sv) => (
          <div className="fres-svc-row" key={sv}>
            <span className="chk">
              <RawSvg html={ICONS.checkIcon} />
            </span>
            <b>{sv}</b>
          </div>
        ))}
      </div>
      {pkg && (
        <div className="fres-pkg">
          <div className="l">
            <em>Best-value bundle · save {pkg.save}%</em>
            <b>{pkg.name}</b>
          </div>
          <Link href="/services" className="btn-accent">
            View {pkg.fee}/yr <RawSvg html={ICONS.arrowIcon} />
          </Link>
        </div>
      )}
      <div className="fres-actions">
        <Link href="/contact" className="btn-primary">
          Get my free quote <RawSvg html={ICONS.arrowIcon} />
        </Link>
        <button className="fres-restart" onClick={onRestart}>
          <RawSvg html={ICONS.arrowIcon} />
          Start over
        </button>
      </div>
    </div>
  );
}
