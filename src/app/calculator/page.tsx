"use client";

import { useState } from "react";

type Op = "+" | "−" | "×" | "÷";

const calc = (a: number, b: number, op: Op) => {
  switch (op) {
    case "+":
      return a + b;
    case "−":
      return a - b;
    case "×":
      return a * b;
    case "÷":
      return b === 0 ? NaN : a / b;
  }
};

const fmt = (n: number) =>
  Number.isFinite(n) ? String(parseFloat(n.toPrecision(12))) : "Ошибка";

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [prev, setPrev] = useState<number | null>(null);
  const [op, setOp] = useState<Op | null>(null);
  const [fresh, setFresh] = useState(true);

  const digit = (d: string) => {
    if (fresh) {
      setDisplay(d);
      setFresh(false);
    } else if (display.replace(/[-.]/g, "").length < 12) {
      setDisplay(display === "0" ? d : display + d);
    }
  };

  const dot = () => {
    if (fresh) {
      setDisplay("0.");
      setFresh(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const chooseOp = (next: Op) => {
    if (display === "Ошибка") return;
    const cur = parseFloat(display);
    if (op && prev !== null && !fresh) {
      const res = calc(prev, cur, op);
      setDisplay(fmt(res));
      setPrev(Number.isFinite(res) ? res : null);
    } else {
      setPrev(cur);
    }
    setOp(next);
    setFresh(true);
  };

  const equals = () => {
    if (!op || prev === null) return;
    setDisplay(fmt(calc(prev, parseFloat(display), op)));
    setPrev(null);
    setOp(null);
    setFresh(true);
  };

  const clear = () => {
    setDisplay("0");
    setPrev(null);
    setOp(null);
    setFresh(true);
  };

  const negate = () =>
    display !== "Ошибка" &&
    display !== "0" &&
    setDisplay(display.startsWith("-") ? display.slice(1) : "-" + display);

  const percent = () =>
    display !== "Ошибка" && setDisplay(fmt(parseFloat(display) / 100));

  const base =
    "flex h-16 items-center justify-center rounded-2xl text-xl font-semibold active:scale-95 transition-transform";
  const num = `${base} bg-[#2A312C] text-white`;
  const fn = `${base} bg-[#3B433E] text-white`;
  const opCls = (o: Op) =>
    `${base} ${op === o && fresh ? "bg-white text-[#FF7A59]" : "bg-[#FF7A59] text-[#1A0E0A]"}`;

  return (
    <div className="w-[320px] rounded-[32px] bg-[#1F2521] p-4 font-sans shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
      <div
        className="flex h-24 items-end justify-end overflow-hidden px-3 pb-2 text-right text-5xl font-semibold text-white"
        aria-live="polite"
      >
        {display}
      </div>

      <div className="grid grid-cols-4 gap-3">
        <button type="button" onClick={clear} className={fn}>
          AC
        </button>
        <button
          type="button"
          onClick={negate}
          className={fn}
          aria-label="Сменить знак"
        >
          +/−
        </button>
        <button
          type="button"
          onClick={percent}
          className={fn}
          aria-label="Процент"
        >
          %
        </button>
        <button
          type="button"
          onClick={() => chooseOp("÷")}
          className={opCls("÷")}
        >
          ÷
        </button>

        {["7", "8", "9"].map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => digit(d)}
            className={num}
          >
            {d}
          </button>
        ))}
        <button
          type="button"
          onClick={() => chooseOp("×")}
          className={opCls("×")}
        >
          ×
        </button>

        {["4", "5", "6"].map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => digit(d)}
            className={num}
          >
            {d}
          </button>
        ))}
        <button
          type="button"
          onClick={() => chooseOp("−")}
          className={opCls("−")}
        >
          −
        </button>

        {["1", "2", "3"].map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => digit(d)}
            className={num}
          >
            {d}
          </button>
        ))}
        <button
          type="button"
          onClick={() => chooseOp("+")}
          className={opCls("+")}
        >
          +
        </button>

        <button
          type="button"
          onClick={() => digit("0")}
          className={`${num} col-span-2`}
        >
          0
        </button>
        <button type="button" onClick={dot} className={num}>
          ,
        </button>
        <button
          type="button"
          onClick={equals}
          className={`${base} bg-[#3DDC84] text-[#0F1A13]`}
        >
          =
        </button>
      </div>
    </div>
  );
}
