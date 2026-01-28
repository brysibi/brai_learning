
import React, { useState, useEffect, useMemo } from 'react';
import { Article, Section, ApiResponse } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<'reader' | 'admin'>('reader');
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedSection, setSelectedSection] = useState<string>('All');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeAdminTab, setActiveAdminTab] = useState<'overview' | 'server-code'>('overview');

  // Database iniziale simulato
  useEffect(() => {
    const initialData: Article[] = [
      {
        id: "2026-01-29-ai-future",
        title: "L'era del Vibe Coding: Creare software con l'intuizione",
        section: Section.VibeCoding,
        imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        abstract: "Come il linguaggio naturale sta diventando la nuova interfaccia primaria per l'architettura software di alto livello.",
        content: "<p>Il Vibe Coding non è solo una moda, è un cambio di paradigma. Invece di lottare con la sintassi, gli ingegneri ora definiscono il 'vibe' del progetto e lasciano che l'intelligenza artificiale gestisca il boilerplate pesante...</p><p>Le implicazioni per la velocità di sviluppo sono enormi. Immagina di poter descrivere un'intera applicazione e vederla prendere vita in pochi minuti, concentrandoti solo sull'esperienza utente e sulla logica di business di alto livello.</p>",
        publishedDate: new Date().toISOString()
      },
      {
        id: "2026-01-28-avatar-news",
        title: "Avatar AI: La nuova frontiera della Content Creation",
        section: Section.ContentCreation,
        imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
        abstract: "Gli avatar digitali stanno diventando indistinguibili dagli umani. Cosa significa per i brand?",
        content: "<p>I brand stanno iniziando a scalare la creazione di contenuti video utilizzando avatar AI che parlano ogni lingua del mondo con la stessa facilità...</p>",
        publishedDate: "2026-01-28T10:00:00Z"
      },
      {
        id: "2026-01-27-open-source",
        title: "Top 5 Progetti Open Source da seguire nel 2026",
        section: Section.OpenSource,
        imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
        abstract: "Dalla privacy locale alla generazione di modelli 3D, ecco cosa sta bollendo in pentola nella community.",
        content: "<p>La community open source sta superando i giganti tech con soluzioni locali e decentralizzate...</p>",
        publishedDate: "2026-01-27T15:00:00Z"
      }
    ];
    setArticles(initialData);
  }, []);

  const filteredArticles = useMemo(() => {
    if (selectedSection === 'All') return articles;
    return articles.filter(a => a.section === selectedSection);
  }, [articles, selectedSection]);

  const todayArticle = useMemo(() => articles[0], [articles]);

  const triggerManualGeneration = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const newArticle: Article = {
        id: `${new Date().getTime()}-ai-generated`,
        title: "AI Insight: L'evoluzione dei Large Language Models",
        section: Section.NewsAI,
        imageUrl: `https://picsum.photos/seed/${Math.random()}/800/400`,
        abstract: "Un'analisi automatica sui nuovi trend di miniaturizzazione dei modelli.",
        content: "<p>Contenuto generato dall'agente BrAI alle " + new Date().toLocaleTimeString() + ". La miniaturizzazione permette di far girare LLM complessi direttamente su dispositivi mobili con latenza zero.</p>",
        publishedDate: new Date().toISOString()
      };
      setArticles(prev => [newArticle, ...prev]);
      setIsGenerating(false);
    }, 1500);
  };

  // --- COMPONENTI UI READER ---

  const ReaderView = () => (
    <div className="flex flex-col animate-in fade-in duration-500">
      {/* Featured Article (Today) */}
      {todayArticle && selectedSection === 'All' && (
        <section 
          className="relative h-[450px] w-full flex items-end p-6 cursor-pointer group"
          onClick={() => setSelectedArticle(todayArticle)}
        >
          <img 
            src={todayArticle.imageUrl} 
            className="absolute inset-0 w-full h-full object-cover brightness-50 transition-transform duration-700 group-hover:scale-105" 
            alt="" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"></div>
          <div className="relative z-10 max-w-2xl">
            <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest mb-3 inline-block">
              Articolo del Giorno
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3 leading-tight leading-tight">
              {todayArticle.title}
            </h2>
            <p className="text-slate-300 text-sm md:text-base line-clamp-2">
              {todayArticle.abstract}
            </p>
          </div>
        </section>
      )}

      {/* Categories Scroller */}
      <div className="sticky top-[64px] bg-white/80 backdrop-blur-md z-20 border-b border-slate-100 px-4 py-3 overflow-x-auto no-scrollbar flex gap-2">
        {['All', ...Object.values(Section)].map(sec => (
          <button
            key={sec}
            onClick={() => setSelectedSection(sec)}
            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              selectedSection === sec 
              ? 'bg-slate-900 text-white shadow-lg' 
              : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
            }`}
          >
            {sec}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map(article => (
          <div 
            key={article.id} 
            onClick={() => setSelectedArticle(article)}
            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all group cursor-pointer"
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={article.imageUrl} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                alt={article.title} 
              />
              <div className="absolute top-3 left-3">
                <span className="bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-[9px] font-black uppercase text-slate-900 tracking-tighter">
                  {article.section}
                </span>
              </div>
            </div>
            <div className="p-4">
              <p className="text-[10px] text-slate-400 font-medium mb-1">
                {new Date(article.publishedDate).toLocaleDateString('it-IT', { day: 'numeric', month: 'long' })}
              </p>
              <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                {article.title}
              </h3>
              <p className="text-sm text-slate-500 line-clamp-2 mt-2 leading-relaxed">
                {article.abstract}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // --- COMPONENTI UI ADMIN (Backend Dashboard) ---

  const AdminView = () => (
    <div className="p-6 max-w-5xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Backend Control Center</h2>
          <p className="text-slate-500 text-sm">Gestione API, Cron Jobs e Agenti AI</p>
        </div>
        <div className="flex gap-2">
           <button 
            onClick={() => setActiveAdminTab('overview')}
            className={`px-4 py-2 text-xs font-bold rounded-xl ${activeAdminTab === 'overview' ? 'bg-slate-900 text-white' : 'bg-white border text-slate-600'}`}
          >
            Monitoraggio
          </button>
          <button 
            onClick={() => setActiveAdminTab('server-code')}
            className={`px-4 py-2 text-xs font-bold rounded-xl ${activeAdminTab === 'server-code' ? 'bg-slate-900 text-white' : 'bg-white border text-slate-600'}`}
          >
            Server.js
          </button>
        </div>
      </div>

      {activeAdminTab === 'overview' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Stato Servizi</h3>
              <div className="flex items-center gap-3 mb-6 bg-green-50 p-3 rounded-xl">
                <div className="size-2.5 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-bold text-green-700 text-sm">REST API Online</span>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-xl">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Database Articles</p>
                  <p className="text-2xl font-black text-slate-900">{articles.length}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Prossimo Update AI</p>
                  <p className="text-sm font-black text-blue-600">Oggi @ 21:00</p>
                </div>
              </div>
              <button 
                onClick={triggerManualGeneration}
                disabled={isGenerating}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-black py-4 rounded-xl transition-all flex items-center justify-center gap-2 text-sm shadow-lg shadow-blue-200"
              >
                {isGenerating ? <span className="material-symbols-outlined animate-spin">sync</span> : <span className="material-symbols-outlined">auto_awesome</span>}
                {isGenerating ? 'GENERAZIONE IN CORSO...' : 'FORZA AGENTE AI'}
              </button>
            </div>
          </div>
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
             <div className="p-4 border-b bg-slate-50 flex justify-between items-center">
                <h3 className="text-xs font-black text-slate-500 uppercase">Log Attività Recente</h3>
                <span className="text-[10px] font-bold text-blue-500">Live Feedback</span>
             </div>
             <div className="p-4 space-y-3 font-mono text-[11px]">
                <div className="flex gap-4 text-slate-500 border-b border-slate-50 pb-2">
                   <span className="text-blue-500">[21:00:00]</span>
                   <span>CRON_JOB: Inizializzazione sessione Agente AI...</span>
                </div>
                <div className="flex gap-4 text-slate-500 border-b border-slate-50 pb-2">
                   <span className="text-blue-500">[21:00:04]</span>
                   <span className="text-green-600">AI_AGENT: Articolo generato con successo. ID: {articles[0].id}</span>
                </div>
                <div className="flex gap-4 text-slate-500">
                   <span className="text-blue-500">[21:00:05]</span>
                   <span>FS_WRITE: Database articles.json aggiornato.</span>
                </div>
             </div>
          </div>
        </div>
      ) : (
        <div className="bg-slate-900 text-slate-300 p-6 rounded-2xl shadow-2xl font-mono text-[12px] overflow-x-auto border-t-4 border-blue-500">
           <pre className="whitespace-pre-wrap">{SERVER_CODE_STRING}</pre>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Universal Navigation */}
      <header className="bg-white/90 backdrop-blur-lg border-b border-slate-100 px-6 py-4 flex justify-between items-center sticky top-0 z-[100]">
        <div className="flex items-center gap-2">
          <div className="bg-slate-900 p-1.5 rounded-xl rotate-3">
            <span className="material-symbols-outlined text-white text-xl">neurology</span>
          </div>
          <h1 className="text-xl font-black text-slate-900 tracking-tighter">BrAI <span className="text-blue-600 font-medium">is Learning</span></h1>
        </div>
        
        <div className="flex items-center bg-slate-100 p-1 rounded-xl">
           <button 
            onClick={() => setView('reader')}
            className={`px-4 py-1.5 text-[11px] font-black rounded-lg transition-all flex items-center gap-1.5 ${view === 'reader' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <span className="material-symbols-outlined text-sm">menu_book</span>
            READER
          </button>
          <button 
            onClick={() => setView('admin')}
            className={`px-4 py-1.5 text-[11px] font-black rounded-lg transition-all flex items-center gap-1.5 ${view === 'admin' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <span className="material-symbols-outlined text-sm">settings_ethernet</span>
            ADMIN
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1">
        {view === 'reader' ? <ReaderView /> : <AdminView />}
      </main>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-[200] flex items-end md:items-center justify-center p-0 md:p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedArticle(null)}></div>
          <div className="relative bg-white w-full max-w-3xl h-[90vh] md:h-auto md:max-h-[85vh] overflow-y-auto rounded-t-[32px] md:rounded-[32px] shadow-2xl animate-in slide-in-from-bottom-10 duration-500">
            <button 
              onClick={() => setSelectedArticle(null)}
              className="absolute top-6 right-6 z-10 bg-slate-100 hover:bg-slate-200 text-slate-800 p-2 rounded-full transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <img src={selectedArticle.imageUrl} className="w-full h-64 md:h-96 object-cover" alt="" />
            <div className="p-8 md:p-12">
              <span className="bg-blue-50 text-blue-600 text-[10px] font-black px-2 py-1 rounded uppercase tracking-widest mb-4 inline-block">
                {selectedArticle.section}
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 leading-tight">
                {selectedArticle.title}
              </h2>
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-100">
                 <div className="size-10 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-500">BrAI</div>
                 <div>
                    <p className="text-sm font-bold text-slate-900">AI Agent Writer</p>
                    <p className="text-xs text-slate-400">{new Date(selectedArticle.publishedDate).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                 </div>
              </div>
              <div 
                className="prose prose-slate max-w-none text-slate-600 leading-relaxed text-lg"
                dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
              />
              <div className="mt-12 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                 <h4 className="text-sm font-bold text-slate-900 mb-2">Ti è piaciuto questo articolo?</h4>
                 <p className="text-xs text-slate-500">Ogni giorno alle 21:00 il nostro agente AI analizza i trend e scrive nuovi approfondimenti. Iscriviti alla newsletter per non perderli.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-8 px-6 text-center">
         <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">BrAI Is Learning</p>
         <p className="text-[10px] text-slate-300">© 2026 • Realizzato con amore per la conoscenza AI</p>
      </footer>
    </div>
  );
};

const SERVER_CODE_STRING = `
const express = require('express');
const fs = require('fs');
const cron = require('node-cron');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Endpoint: GET Articolo del Giorno
app.get('/articles/today', (req, res) => {
    const articles = JSON.parse(fs.readFileSync('articles.json'));
    res.json(articles[0]); // Restituisce il più recente
});

// Endpoint: GET Per Sezione
app.get('/articles', (req, res) => {
    const section = req.query.section;
    let articles = JSON.parse(fs.readFileSync('articles.json'));
    if(section) articles = articles.filter(a => a.section === section);
    res.json(articles);
});

// Cron Job: 21:00 Daily AI Generation
cron.schedule('0 21 * * *', async () => {
    // 1. Chiama Agente AI
    // 2. Inserisci in articles.json
    console.log("Triggering AI Agent...");
});

app.listen(3001, () => console.log("BrAI Backend ready."));
`;

export default App;
