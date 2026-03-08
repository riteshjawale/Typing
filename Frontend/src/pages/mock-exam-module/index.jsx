import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Clock3,
  Gauge,
  Highlighter,
  Languages,
  ListChecks,
  RotateCcw,
  Send,
  Text,
  ToggleLeft,
  ToggleRight,
  X,
} from 'lucide-react';
import Header from '../home-page/components/Header';
import Footer from '../home-page/components/Footer';

const SAMPLE_PASSAGE =
  'The library tall windows framed a sky painted in streaks of gold and violet. Dust motes floated lazily in the light, drifting above rows of well-worn books. A soft rustle of pages blended with the faint ticking of an ancient clock. Somewhere in the corner, a typewriter sat, its keys resting in patient silence, waiting for a story to awaken it. Outside, the street hummed with distant voices, footsteps, and the low growl of an approaching tram, each sound weaving into the evening gentle rhythm. Under the pale glow of the lantern, the old workshop felt alive.';

const SPEED_REQUIREMENTS = {
  time: '10min',
  languages: 'English, Marathi',
  layouts: 'Qwerty/Mangal/Remington GAIL',
  errorRate: '<7%',
  minimumSpeed: [
    { category: 'English', wpm: '40', kdph: '-' },
    { category: 'Marathi', wpm: '30', kdph: '-' },
  ],
  textLength: [
    { category: 'English', words: '400', keyDepressions: '-' },
    { category: 'Marathi', words: '300', keyDepressions: '-' },
  ],
};

const RequirementCard = ({ icon: Icon, title, countLabel, columns, rows }) => (
  <div className="overflow-hidden rounded-2xl border border-orange-300">
    <div className="flex items-center justify-between bg-orange-50 px-4 py-3">
      <div className="flex items-center gap-2 text-sm font-semibold text-orange-700">
        <Icon size={16} />
        <span>{title}</span>
      </div>
      <span className="text-sm font-medium text-orange-500">{countLabel}</span>
    </div>
    <table className="min-w-full text-sm">
      <thead className="bg-white">
        <tr className="border-t border-orange-200 text-left text-orange-700">
          {columns.map((column) => (
            <th key={column} className="px-4 py-3 font-semibold">
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index} className="border-t border-orange-100 bg-white text-slate-700">
            {Object.values(row).map((value, valueIndex) => (
              <td key={valueIndex} className="px-4 py-3">
                {value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const InfoRow = ({ label, children }) => (
  <div className="flex items-center justify-between gap-4">
    <span className="text-sm font-semibold text-slate-800">{label}</span>
    <div>{children}</div>
  </div>
);

const Toggle = ({ checked, onChange }) => (
  <button
    type="button"
    onClick={onChange}
    className="text-slate-900 transition hover:text-orange-600"
    aria-pressed={checked}
  >
    {checked ? <ToggleRight size={38} className="fill-slate-900" /> : <ToggleLeft size={38} />}
  </button>
);

const MockExamModule = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [typedText, setTypedText] = useState('');
  const [fontSize, setFontSize] = useState(18);
  const [highlightText, setHighlightText] = useState(false);
  const [backspaceAllowed, setBackspaceAllowed] = useState(true);
  const [showSpeedRequirements, setShowSpeedRequirements] = useState(false);
  const [showSpeedGuideline, setShowSpeedGuideline] = useState(false);

  const examName = state?.examName || 'Typing Zone Demo';
  const language = state?.language || 'English';
  const selectedTime = state?.time || '10 minutes';
  const orientation = state?.orientation || 'Vertical';
  const keyboardLayout = state?.keyboardLayout || 'QWERTY';
  const testNo = state?.testNo || 'Test 1';

  const totalSeconds = useMemo(() => {
    const minutes = Number.parseInt(selectedTime, 10);
    return Number.isNaN(minutes) ? 600 : minutes * 60;
  }, [selectedTime]);

  const [timeLeft, setTimeLeft] = useState(totalSeconds);

  useEffect(() => {
    setTimeLeft(totalSeconds);
  }, [totalSeconds]);

  useEffect(() => {
    if (timeLeft <= 0) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setTimeLeft((current) => (current > 0 ? current - 1 : 0));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [timeLeft]);

  const formattedTime = `${String(Math.floor(timeLeft / 60)).padStart(2, '0')}:${String(
    timeLeft % 60
  ).padStart(2, '0')}`;

  const highlightedPassage = useMemo(() => {
    if (!highlightText || typedText.length === 0) {
      return SAMPLE_PASSAGE;
    }

    const matched = SAMPLE_PASSAGE.slice(0, typedText.length);
    const remaining = SAMPLE_PASSAGE.slice(typedText.length);

    return (
      <>
        <span className="rounded bg-amber-100 text-orange-800">{matched}</span>
        {remaining}
      </>
    );
  }, [highlightText, typedText]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-orange-50 to-amber-50">
      <Header />
      <main className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-sm text-orange-700">
            <span>Home</span>
            <span className="mx-2 text-orange-300">/</span>
            <span>Typing Zone Demo</span>
          </div>

          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <h1 className="text-2xl font-black text-slate-950 sm:text-3xl">{examName}</h1>
              <div className="flex flex-wrap gap-3">
                <div className="rounded-xl border border-orange-300 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm">
                  {language}-{keyboardLayout}
                </div>
                <div className="rounded-xl border border-orange-300 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm">
                  {testNo}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setTypedText('');
                setTimeLeft(totalSeconds);
              }}
              className="inline-flex items-center gap-2 self-start rounded-xl border border-orange-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-orange-400 hover:text-orange-700"
            >
              <RotateCcw size={16} />
              Reset
            </button>
          </div>

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_280px]">
            <div className="space-y-4">
              <div
                className={`min-h-[180px] rounded-[22px] border border-slate-300 bg-white p-5 leading-10 text-slate-700 shadow-sm ${
                  orientation === 'Horizontal' ? 'tracking-wide' : ''
                }`}
                style={{ fontSize: `${fontSize}px` }}
              >
                {highlightedPassage}
              </div>

              <textarea
                value={typedText}
                onChange={(e) => setTypedText(e.target.value)}
                onKeyDown={(e) => {
                  if (!backspaceAllowed && e.key === 'Backspace') {
                    e.preventDefault();
                  }
                }}
                placeholder="Start typing here..."
                className="min-h-[220px] w-full rounded-[22px] border border-slate-300 bg-white p-5 text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-orange-400"
                style={{ fontSize: `${fontSize}px` }}
              />
            </div>

            <aside className="rounded-[24px] border border-slate-300 bg-white p-5 shadow-sm">
              <div className="mb-5 flex items-center gap-3 text-2xl font-black text-slate-950">
                <Clock3 size={24} className="text-slate-700" />
                <span>Time left:</span>
                <span className="rounded-lg bg-orange-100 px-3 py-1 font-mono text-orange-700">
                  {formattedTime}
                </span>
              </div>

              <button
                type="button"
                onClick={() => navigate('/home-page')}
                className="mb-6 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-600 px-4 py-4 text-lg font-semibold text-white transition hover:bg-slate-700"
              >
                <Send size={18} />
                Submit Typing Test
              </button>

              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-stone-50 px-3 py-2">
                  <button
                    type="button"
                    onClick={() => setFontSize((current) => Math.max(14, current - 1))}
                    className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-lg font-semibold text-slate-800"
                  >
                    Aa-
                  </button>
                  <span className="text-sm font-semibold text-slate-800">{fontSize}px</span>
                  <button
                    type="button"
                    onClick={() => setFontSize((current) => Math.min(28, current + 1))}
                    className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-lg font-semibold text-slate-800"
                  >
                    Aa+
                  </button>
                </div>

                <InfoRow label="Highlight Text">
                  <Toggle checked={highlightText} onChange={() => setHighlightText((value) => !value)} />
                </InfoRow>

                <InfoRow label="Backspace Allow">
                  <Toggle
                    checked={backspaceAllowed}
                    onChange={() => setBackspaceAllowed((value) => !value)}
                  />
                </InfoRow>

                <InfoRow label="Select Language:">
                  <div className="rounded-lg border border-slate-200 bg-stone-50 px-3 py-2 text-sm text-slate-500">
                    {language}
                  </div>
                </InfoRow>

                <InfoRow label="Select Time:">
                  <div className="rounded-lg border border-slate-200 bg-stone-50 px-3 py-2 text-sm text-slate-500">
                    {selectedTime}
                  </div>
                </InfoRow>

                <InfoRow label="Select Orientation:">
                  <div className="rounded-lg border border-slate-200 bg-stone-50 px-3 py-2 text-sm text-slate-500">
                    {orientation}
                  </div>
                </InfoRow>

                <button
                  type="button"
                  onClick={() => setShowSpeedRequirements(true)}
                  className="flex items-center gap-2 text-sm text-slate-800 underline decoration-slate-300 underline-offset-4 transition hover:text-orange-700 hover:decoration-orange-500"
                >
                  <Gauge size={16} />
                  <span>View Speed Requirements</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowSpeedGuideline(true)}
                  className="flex items-center gap-2 text-sm text-slate-800 underline decoration-slate-300 underline-offset-4 transition hover:text-orange-700 hover:decoration-orange-500"
                >
                  <ListChecks size={16} />
                  <span>View Evaluation Guideline</span>
                </button>

                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="inline-flex text-sm text-orange-700 underline decoration-orange-200 underline-offset-4"
                >
                  Back to test setup
                </button>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />

      {showSpeedRequirements && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 py-8">
          <div className="w-full max-w-4xl rounded-[28px] border border-orange-200 bg-white p-6 shadow-[0_30px_90px_rgba(15,23,42,0.28)] sm:p-8">
            <div className="mb-6 flex items-start justify-between gap-4">
              <h2 className="text-3xl font-bold text-slate-900">Speed Requirements</h2>
              <button
                type="button"
                onClick={() => setShowSpeedRequirements(false)}
                className="rounded-full border border-slate-300 p-2 text-slate-500 transition hover:border-orange-300 hover:text-orange-600"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mb-8 grid gap-5 sm:grid-cols-2">
              <div className="space-y-5">
                <div className="grid grid-cols-[150px_minmax(0,1fr)] gap-4 text-lg">
                  <div className="flex items-center gap-2 font-semibold text-orange-700">
                    <Clock3 size={18} />
                    <span>Time</span>
                  </div>
                  <div className="text-slate-700">{SPEED_REQUIREMENTS.time}</div>
                </div>

                <div className="grid grid-cols-[150px_minmax(0,1fr)] gap-4 text-lg">
                  <div className="flex items-center gap-2 font-semibold text-orange-700">
                    <Text size={18} />
                    <span>Layouts / Fonts</span>
                  </div>
                  <div className="text-slate-700">{SPEED_REQUIREMENTS.layouts}</div>
                </div>
              </div>

              <div className="space-y-5">
                <div className="grid grid-cols-[150px_minmax(0,1fr)] gap-4 text-lg">
                  <div className="flex items-center gap-2 font-semibold text-orange-700">
                    <Languages size={18} />
                    <span>Languages</span>
                  </div>
                  <div className="text-slate-700">{SPEED_REQUIREMENTS.languages}</div>
                </div>

                <div className="grid grid-cols-[150px_minmax(0,1fr)] gap-4 text-lg">
                  <div className="flex items-center gap-2 font-semibold text-orange-700">
                    <Highlighter size={18} />
                    <span>Error Rate</span>
                  </div>
                  <div className="text-slate-700">{SPEED_REQUIREMENTS.errorRate}</div>
                </div>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <RequirementCard
                icon={Gauge}
                title="Minimum Speed"
                countLabel="2 categories"
                columns={['Category', 'WPM', 'KDPH']}
                rows={SPEED_REQUIREMENTS.minimumSpeed}
              />
              <RequirementCard
                icon={Text}
                title="Text Length"
                countLabel="2 categories"
                columns={['Category', 'Words', 'Key Depressions']}
                rows={SPEED_REQUIREMENTS.textLength}
              />
            </div>
          </div>
        </div>
      )}

      {showSpeedGuideline && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 py-8">
          <div className="w-full max-w-4xl rounded-[28px] border border-orange-200 bg-white p-6 shadow-[0_30px_90px_rgba(15,23,42,0.28)] sm:p-8">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                  <ListChecks size={16} />
                  <span>Evaluation Guideline</span>
                </div>
                <h2 className="text-3xl font-bold text-slate-900">Speed Calculation Guideline</h2>
              </div>
              <button
                type="button"
                onClick={() => setShowSpeedGuideline(false)}
                className="rounded-full border border-slate-300 p-2 text-slate-500 transition hover:border-orange-300 hover:text-orange-600"
              >
                <X size={18} />
              </button>
            </div>

            <div className="max-h-[70vh] overflow-y-auto pr-2 text-slate-800">
              <h3 className="mb-6 text-3xl font-black leading-tight text-slate-950">
                Typing Speed Calculation Guideline - MPSC Group C
              </h3>

              <section className="mb-8">
                <h4 className="mb-3 text-2xl font-semibold text-slate-900">Calculation of words</h4>
                <p className="text-lg leading-8 text-slate-700">
                  The standard measure is: 5 strokes/characters make one word. To determine the words
                  typed, therefore, the number of strokes typed by the candidate will be divided by 5.
                </p>
              </section>

              <section className="mb-8">
                <h4 className="mb-3 text-2xl font-semibold text-slate-900">Calculation Of Mistakes</h4>
                <p className="mb-3 text-lg leading-8 text-slate-700">
                  The following errors are treated as mistakes:-
                </p>
                <ul className="list-disc space-y-2 pl-6 text-lg leading-8 text-slate-700">
                  <li>For every omission of word.</li>
                  <li>For every substitution of a wrong word.</li>
                  <li>For every addition of a word not found in the passage.</li>
                  <li>
                    For every spelling error committed by way of repetition, or addition or transposition
                    or omission or substitution of a letter/letters, e.g.: the word &lsquo;spelling&rsquo;
                    typed as &lsquo;seeplings&rsquo; etc.
                  </li>
                  <li>Wrong Capitalisation: Wrong use of capital letter for small letter and vice-versa.</li>
                </ul>
              </section>

              <section className="mb-8 space-y-3 text-lg leading-8 text-slate-700">
                <p>
                  <span className="font-semibold text-slate-900">One Mistake = One Error</span>
                </p>
                <p>Error should be less than 7% of total words typed.</p>
                <p>Suppose you&apos;ve typed 400 words so the maximum permissible error or mistake is 28.</p>
              </section>

              <section className="space-y-3">
                <h4 className="text-2xl font-semibold text-slate-900">Typing Speed</h4>
                <p className="text-lg leading-8 text-slate-700">
                  The typing speed of the candidate will be worked out by the following formula:
                </p>
                <div className="rounded-2xl border border-orange-200 bg-orange-50 px-5 py-4 text-xl font-semibold text-orange-800">
                  Typing Speed (WPM) = (Total Words Typed / 5) / Time (in minutes)
                </div>
                <p className="text-lg leading-8 text-slate-700">
                  The minimum speed should be 40 words per minute in English and 30 words per minute in Marathi.
                </p>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MockExamModule;
