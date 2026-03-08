import React, { useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import {
  Calendar,
  FileText,
  Globe,
  Keyboard,
  Clock3,
  RectangleVertical,
  Highlighter,
  Delete,
  Gauge,
  ListChecks,
  CircleX,
  Languages,
  AlertTriangle,
  Text,
  X,
} from 'lucide-react';
import Header from '../home-page/components/Header';
import Footer from '../home-page/components/Footer';

const TEST_DETAILS = {
  'mpsc-group-c': {
    parentLabel: 'Mpsc Group C Services',
    tests: {
      'tax-assistant': {
        examName: 'MPSC Group C Services Tax Assistant',
        pageTitle: 'Typing Tests for MPSC GROUP C SERVICES TAX ASSISTANT',
      },
      'clerk-and-typist': {
        examName: 'MPSC Group C Services Clerk and Typist',
        pageTitle: 'Typing Tests for MPSC GROUP C SERVICES CLERK AND TYPIST',
      },
    },
  },
  'bombay-high-court': {
    parentLabel: 'Bombay High Court Services',
    tests: {
      'english-typing-test': {
        examName: 'Bombay High Court English Typing Test',
        pageTitle: 'Typing Tests for BOMBAY HIGH COURT ENGLISH TYPING TEST',
      },
    },
  },
};

const TEST_NUMBERS = ['Select Test No', 'Test 1', 'Test 2', 'Test 3', 'Test 4', 'Test 5'];

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

const FieldRow = ({ icon: Icon, label, children }) => (
  <div className="grid grid-cols-[220px_minmax(0,1fr)] items-center gap-4">
    <div className="flex items-center gap-3 text-slate-900">
      <Icon size={18} className="text-slate-600" />
      <span className="text-lg font-semibold">{label}</span>
    </div>
    <div>{children}</div>
  </div>
);

const DetailStat = ({ icon: Icon, label, children, danger = false }) => (
  <div className="grid grid-cols-[110px_minmax(0,1fr)] items-center gap-4">
    <div className="flex items-center gap-3">
      <Icon size={18} className={danger ? 'text-red-500' : 'text-slate-600'} />
      <span className="text-lg font-semibold text-slate-900">{label}</span>
    </div>
    <div className="text-lg text-slate-800">{children}</div>
  </div>
);

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

const MockTestDetailPage = () => {
  const navigate = useNavigate();
  const { examId, testId } = useParams();

  const detail = TEST_DETAILS[examId]?.tests?.[testId];
  const parentLabel = TEST_DETAILS[examId]?.parentLabel;
  const languageOptions = examId === 'bombay-high-court' ? ['English'] : ['English', 'Marathi'];

  const [language, setLanguage] = useState(languageOptions[0]);
  const [testNo, setTestNo] = useState('Select Test No');
  const [keyboardLayout, setKeyboardLayout] = useState('QWERTY');
  const [time, setTime] = useState('10 minutes');
  const [orientation, setOrientation] = useState('Vertical');
  const [highlightText, setHighlightText] = useState('Disable');
  const [backspaceAllow, setBackspaceAllow] = useState('Enable');
  const [showSpeedRequirements, setShowSpeedRequirements] = useState(false);
  const [showSpeedGuideline, setShowSpeedGuideline] = useState(false);
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]);

  if (!detail || !parentLabel) {
    return <Navigate to="/home-page" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-orange-50 to-amber-50">
      <Header />
      <main className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-[30px] border border-orange-200 bg-white/90 p-6 shadow-[0_28px_80px_rgba(191,93,25,0.12)] sm:p-10">
            <div className="mb-8 text-sm text-orange-700">
              <span>Home</span>
              <span className="mx-2 text-orange-300">/</span>
              <span>Typing Test</span>
              <span className="mx-2 text-orange-300">/</span>
              <span>{detail.examName}</span>
            </div>

            <h1 className="mb-10 text-3xl font-black uppercase tracking-tight text-slate-950 sm:text-4xl">
              {detail.pageTitle}
            </h1>

            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
              <div className="space-y-4">
                <FieldRow icon={FileText} label="Exam:">
                  <div className="flex items-center gap-3 text-lg text-slate-800">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-100 to-rose-100 text-xs font-bold text-orange-700">
                      TT
                    </div>
                    <span>{detail.examName}</span>
                  </div>
                </FieldRow>

                <FieldRow icon={Globe} label="Language:">
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full max-w-[280px] rounded-xl border border-orange-300 bg-white px-4 py-3 text-base text-slate-800 shadow-sm outline-none transition focus:border-orange-500"
                  >
                    {languageOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </FieldRow>

                <FieldRow icon={Keyboard} label="Keyboard Layout:">
                  <select
                    value={keyboardLayout}
                    onChange={(e) => setKeyboardLayout(e.target.value)}
                    className="w-full max-w-[280px] rounded-xl border border-orange-300 bg-white px-4 py-3 text-base text-slate-800 shadow-sm outline-none transition focus:border-orange-500"
                  >
                    <option>QWERTY</option>
                    <option>Remington</option>
                    <option>Mangal</option>
                  </select>
                </FieldRow>

                <FieldRow icon={Clock3} label="Time:">
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full max-w-[280px] rounded-xl border border-orange-300 bg-white px-4 py-3 text-base text-slate-800 shadow-sm outline-none transition focus:border-orange-500"
                  >
                    <option>10 minutes</option>
                    <option>15 minutes</option>
                    <option>20 minutes</option>
                  </select>
                </FieldRow>

                <FieldRow icon={RectangleVertical} label="Select Orientation:">
                  <select
                    value={orientation}
                    onChange={(e) => setOrientation(e.target.value)}
                    className="w-full max-w-[280px] rounded-xl border border-orange-300 bg-white px-4 py-3 text-base text-slate-800 shadow-sm outline-none transition focus:border-orange-500"
                  >
                    <option>Vertical</option>
                    <option>Horizontal</option>
                  </select>
                </FieldRow>

                <FieldRow icon={Highlighter} label="Highlight Text:">
                  <select
                    value={highlightText}
                    onChange={(e) => setHighlightText(e.target.value)}
                    className="w-full max-w-[280px] rounded-xl border border-orange-300 bg-white px-4 py-3 text-base text-slate-800 shadow-sm outline-none transition focus:border-orange-500"
                  >
                    <option>Disable</option>
                    <option>Enable</option>
                  </select>
                </FieldRow>

                <FieldRow icon={Delete} label="Backspace Allow:">
                  <select
                    value={backspaceAllow}
                    onChange={(e) => setBackspaceAllow(e.target.value)}
                    className="w-full max-w-[280px] rounded-xl border border-orange-300 bg-white px-4 py-3 text-base text-slate-800 shadow-sm outline-none transition focus:border-orange-500"
                  >
                    <option>Enable</option>
                    <option>Disable</option>
                  </select>
                </FieldRow>

                <FieldRow icon={Gauge} label="Speed Requirements:">
                  <button
                    type="button"
                    onClick={() => setShowSpeedRequirements(true)}
                    className="w-fit text-lg text-slate-800 underline decoration-slate-300 underline-offset-4 transition hover:text-orange-700 hover:decoration-orange-500"
                  >
                    View Speed Requirements
                  </button>
                </FieldRow>

                <FieldRow icon={ListChecks} label="Speed Calculation Guideline:">
                  <button
                    type="button"
                    onClick={() => setShowSpeedGuideline(true)}
                    className="w-fit text-lg text-slate-800 underline decoration-slate-300 underline-offset-4 transition hover:text-orange-700 hover:decoration-orange-500"
                  >
                    View Evaluation Guideline
                  </button>
                </FieldRow>
              </div>

              <div className="rounded-[28px] border border-orange-200 bg-gradient-to-br from-orange-50 to-white p-6 shadow-sm">
                <div className="space-y-5">
                  <DetailStat icon={Calendar} label="Date:">
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full max-w-[220px] rounded-xl border border-orange-300 bg-white px-4 py-3 text-base text-slate-800 shadow-sm outline-none transition focus:border-orange-500"
                    />
                  </DetailStat>

                  <DetailStat icon={FileText} label="Test No.:">
                    <select
                      value={testNo}
                      onChange={(e) => setTestNo(e.target.value)}
                      className="w-full max-w-[240px] rounded-xl border border-orange-300 bg-white px-4 py-3 text-base text-slate-800 shadow-sm outline-none transition focus:border-orange-500"
                    >
                      {TEST_NUMBERS.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </DetailStat>

                  <DetailStat icon={CircleX} label="Already Attempted:" danger>
                    No
                  </DetailStat>

                  <DetailStat icon={FileText} label="Result:">
                    N/A
                  </DetailStat>

                  <button
                    type="button"
                    onClick={() =>
                      navigate('/mock-exam-module', {
                        state: {
                          examId,
                          testId,
                          examName: detail.examName,
                          language,
                          testNo: testNo === 'Select Test No' ? 'Test 1' : testNo,
                          keyboardLayout,
                          time,
                          orientation,
                          highlightText,
                          backspaceAllow,
                          selectedDate,
                        },
                      })
                    }
                    className="mt-4 w-full rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-4 text-lg font-semibold text-white shadow-[0_8px_24px_rgba(234,88,12,0.24)] transition hover:from-orange-600 hover:to-amber-600"
                  >
                    Start Test
                  </button>

                  <div className="pt-2 text-sm text-slate-500">
                    <Link
                      to={`/mock-tests/${examId}`}
                      className="underline decoration-slate-300 underline-offset-4 transition hover:text-orange-700 hover:decoration-orange-500"
                    >
                      Back to test list
                    </Link>
                  </div>
                </div>
              </div>
            </div>
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
                    <Keyboard size={18} />
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
                    <AlertTriangle size={18} />
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
                    or omission or substitution of a letter/letters, e.g.: the word ‘spelling’ typed as
                    ‘seeplings’ etc.
                  </li>
                  <li>Wrong Capitalisation: Wrong use of capital letter for small letter and vice-versa.</li>
                </ul>
              </section>

              <section className="mb-8 space-y-3 text-lg leading-8 text-slate-700">
                <p>
                  <span className="font-semibold text-slate-900">One Mistake = One Error</span>
                </p>
                <p>Error should be less than 7% of total words typed.</p>
                <p>Suppose you’ve typed 400 words so the maximum permissible error or mistake is 28.</p>
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

export default MockTestDetailPage;
