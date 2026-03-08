import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Header from '../home-page/components/Header';
import Footer from '../home-page/components/Footer';

const MOCK_TEST_LISTS = {
  'mpsc-group-c': {
    breadcrumb: 'Mpsc Group C Services',
    title: 'All Typing Tests for MPSC GROUP C SERVICES',
    items: [
      {
        name: 'MPSC Group C Services Tax Assistant',
        slug: 'tax-assistant',
      },
      {
        name: 'MPSC Group C Services Clerk and Typist',
        slug: 'clerk-and-typist',
      },
    ],
  },
  'bombay-high-court': {
    breadcrumb: 'Bombay High Court Services',
    title: 'All Typing Tests for BOMBAY HIGH COURT SERVICES',
    items: [
      {
        name: 'Bombay High Court English Typing Test',
        slug: 'english-typing-test',
      },
    ],
  },
};

const MockTestListPage = () => {
  const { examId } = useParams();
  const config = MOCK_TEST_LISTS[examId];

  if (!config) {
    return <Navigate to="/home-page" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-amber-50">
      <Header />
      <main className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-[28px] border border-orange-200 bg-white/90 p-6 shadow-[0_24px_80px_rgba(194,97,26,0.12)] sm:p-10">
            <div className="mb-8 text-sm text-orange-700">
              <span>Home</span>
              <span className="mx-2 text-orange-300">/</span>
              <span>Exam</span>
              <span className="mx-2 text-orange-300">/</span>
              <span>{config.breadcrumb}</span>
            </div>

            <h1 className="mb-8 text-3xl font-black uppercase tracking-tight text-slate-900 sm:text-4xl">
              {config.title}
            </h1>

            <div className="space-y-4">
              {config.items.map((item) => (
                <Link
                  key={item.name}
                  to={`/mock-tests/${examId}/${item.slug}`}
                  className="group flex items-center gap-4 rounded-2xl border border-transparent px-3 py-3 transition hover:border-orange-200 hover:bg-orange-50"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-100 to-rose-100 text-xs font-bold text-orange-700">
                    TT
                  </div>
                  <span className="text-lg font-medium text-slate-800 underline decoration-slate-300 underline-offset-4 transition group-hover:text-orange-700 group-hover:decoration-orange-400">
                    {item.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MockTestListPage;
