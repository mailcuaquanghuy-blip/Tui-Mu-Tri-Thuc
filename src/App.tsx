/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { QUESTIONS } from './questions';

const DANH_SACH_QUA = [
  { ten: 'Hình dán siêu ngầu 🦸‍♂️', icon: '✨', mauSac: 'bg-yellow-200 text-[#333]' },
  { ten: 'Kẹo mút dâu tây 🍓', icon: '🍭', mauSac: 'bg-red-200 text-[#333]' },
  { ten: 'Búp bê mini dễ thương 👗', icon: '🎎', mauSac: 'bg-pink-200 text-[#333]' },
  { ten: 'Bút chì màu cầu vồng 🌈', icon: '🖍️', mauSac: 'bg-blue-200 text-[#333]' },
  { ten: 'Huy hiệu lấp lánh ⭐', icon: '🏅', mauSac: 'bg-purple-200 text-[#333]' },
  { ten: 'Xe ô tô đồ chơi 🏎️', icon: '🚗', mauSac: 'bg-green-200 text-[#333]' },
  { ten: 'Móc khóa thú cưng 🐶', icon: '🔑', mauSac: 'bg-orange-200 text-[#333]' },
  { ten: 'Máy bay giấy ✈️', icon: '✈️', mauSac: 'bg-cyan-200 text-[#333]' },
];

export default function App() {
  const [view, setView] = useState<'home' | 'game' | 'review'>('home');
  const [playerName, setPlayerName] = useState("");
  
  const [tuiMu, setTuiMu] = useState<any[]>([]);
  const [quaDaMo, setQuaDaMo] = useState<any[]>([]);
  const [history, setHistory] = useState<{question: any, selectedIdx: number, isCorrect: boolean}[]>([]);
  
  const [activeBag, setActiveBag] = useState<any | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const [reviewFilter, setReviewFilter] = useState<string>('Tất cả');

  const batDauChoi = () => {
    if (!playerName.trim()) return;
    
    // Đảo lồng câu hỏi và chọn 20 câu để chơi
    const shuffled = [...QUESTIONS].sort(() => 0.5 - Math.random()).slice(0, 20);
    const colors = ["bg-[#6BCB77]", "bg-[#9d72ff]", "bg-[#ff8c42]", "bg-[#38bdf8]", "bg-[#f472b6]", "bg-[#fbbf24]"];
    const icons = ["❓", "🎒", "✨", "🌟", "🎁", "🎨"];
    
    const newBags = shuffled.map((q, idx) => ({
      id: idx + 1,
      bagBg: colors[Math.floor(Math.random() * colors.length)],
      icon: icons[Math.floor(Math.random() * icons.length)],
      question: q
    }));
    
    setTuiMu(newBags);
    setQuaDaMo([]);
    setHistory([]);
    setView('game');
  };

  const traLoi = (idx: number) => {
    if (selectedAnswer !== null || !activeBag) return;
    setSelectedAnswer(idx);
    const isCorrect = idx === activeBag.question.correctAnswerIndex;
    
    setTimeout(() => {
      if (isCorrect) {
        confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
        const phanThuong = DANH_SACH_QUA[Math.floor(Math.random() * DANH_SACH_QUA.length)];
        setQuaDaMo(prev => [...prev, phanThuong]);
      }
      
      setHistory(prev => [{
        question: activeBag.question,
        selectedIdx: idx,
        isCorrect
      }, ...prev]);

      setTuiMu(prev => prev.filter(bag => bag.id !== activeBag.id));
      setActiveBag(null);
      setSelectedAnswer(null);
    }, 1500); // Đợi 1.5 giây để người chơi xem kết quả
  };

  if (view === 'home') {
    return (
      <div className="min-h-screen bg-[#FFD93D] flex items-center justify-center p-4 md:p-6 font-sans">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          className="bg-white border-[6px] border-[#333] rounded-[24px] p-8 max-w-md w-full shadow-[8px_8px_0px_#333] flex flex-col items-center text-center relative"
        >
          <div className="absolute top-4 right-4">
            <button 
              onClick={() => setView('review')}
              className="bg-[#333] text-white px-3 py-1 rounded-[10px] shadow-[4px_4px_0px_#FF6B6B] hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all font-black"
            >
              📖 Ôn Tập
            </button>
          </div>
          
          <div className="text-6xl mb-4 mt-6 animate-bounce">🎒</div>
          <h1 className="text-3xl md:text-4xl font-black uppercase text-[#FF6B6B] mb-2 leading-tight" style={{ textShadow: "2px 2px 0px #333" }}>Khám Phá<br/>Túi Mù Tri Thức</h1>
          <p className="text-[#333] font-bold mb-6">Đăng nhập để nhận 20 chiếc túi mù chứa đầy câu hỏi hóc búa dành cho học sinh lớp 4 nhé!</p>
          <input 
            type="text" 
            placeholder="Tên của bạn là gì?"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && batDauChoi()}
            className="w-full border-[4px] border-[#333] rounded-[15px] p-3 text-lg font-bold outline-none focus:border-[#4D96FF] mb-4 text-center transition-colors shadow-inner bg-[#f9f9f9]"
            maxLength={15}
          />
          <button 
            onClick={batDauChoi}
            disabled={!playerName.trim()}
            className="w-full bg-[#6BCB77] text-white border-[4px] border-[#333] py-3 rounded-[15px] font-black uppercase text-xl shadow-[4px_4px_0px_#333] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0px_#333] active:translate-y-1 active:translate-x-1 active:shadow-[0px_0px_0px_#333] transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-6"
          >
            Bắt Đầu Chơi!
          </button>
          
          <div className="w-full bg-[#f9f9f9] border-[3px] border-[#333] rounded-[15px] p-3 text-sm font-bold text-[#333] text-center shadow-inner">
            <div className="uppercase text-[#FF6B6B] font-black text-xs mb-1">🎮 Trò chơi được phát triển bởi 🎮</div>
            Vũ Trần Minh Hiếu (29/08/2016) <br/>
            Học sinh lớp 4B <br/> 
            Tiểu học Nguyễn Trãi, Phường Trường Thi, Tỉnh Ninh Bình
          </div>
        </motion.div>
      </div>
    );
  }

  if (view === 'review') {
    const questionsToReview = QUESTIONS.filter(q => reviewFilter === 'Tất cả' || q.difficulty === reviewFilter);
    return (
      <div className="min-h-screen bg-[#4D96FF] p-4 md:p-8 font-sans">
        <div className="max-w-[1000px] mx-auto bg-white border-[6px] border-[#333] rounded-[24px] shadow-[8px_8px_0px_#333] p-4 md:p-8 h-[calc(100vh-4rem)] flex flex-col">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 border-b-[4px] border-[#333] pb-4 gap-4">
            <h2 className="text-3xl font-black uppercase text-[#FF6B6B]" style={{ textShadow: "2px 2px 0px #333" }}>Phòng Ôn Tập ({QUESTIONS.length} câu)</h2>
            <div className="flex gap-2 items-center w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
               <span className="font-bold flex-shrink-0">Mức độ:</span>
               {['Tất cả', 'Dễ', 'Trung bình', 'Khó'].map(filter => (
                 <button 
                    key={filter}
                    onClick={() => setReviewFilter(filter)}
                    className={`px-3 py-1 border-[3px] border-[#333] rounded-[10px] font-bold text-sm shadow-[2px_2px_0px_#333] flex-shrink-0 transition-all ${
                      reviewFilter === filter ? 'bg-[#FFD93D] translate-y-[2px] translate-x-[2px] shadow-none' : 'bg-[#f9f9f9]'
                    }`}
                 >
                   {filter}
                 </button>
               ))}
               <button 
                 onClick={() => setView('home')}
                 className="ml-auto md:ml-4 bg-[#FF6B6B] text-white px-4 py-1 border-[3px] border-[#333] rounded-[10px] shadow-[2px_2px_0px_#333] font-bold flex-shrink-0"
               >
                 Trở Lại
               </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-4">
            {questionsToReview.map((q) => (
              <div key={q.id} className="border-[4px] border-[#333] rounded-[15px] p-4 shadow-[4px_4px_0px_#333] bg-[#fdfdfd]">
                <div className="flex items-center gap-2 mb-2">
                   <span className="bg-[#333] text-white px-2 py-0.5 rounded text-xs font-black">Câu {q.id}</span>
                   <span className={`px-2 py-0.5 border-[2px] border-[#333] rounded text-xs font-black shadow-[2px_2px_0px_#333]
                      ${q.difficulty === 'Dễ' ? 'bg-[#6BCB77] text-white' : q.difficulty === 'Trung bình' ? 'bg-[#FFD93D] text-[#333]' : 'bg-[#FF6B6B] text-white'}
                   `}>
                     {q.difficulty}
                   </span>
                   <span className="text-[#666] text-sm font-bold ml-auto">{q.subject}</span>
                </div>
                <h3 className="text-lg font-black text-[#333] mb-3">{q.text}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {q.options.map((opt, i) => (
                    <div 
                      key={i} 
                      className={`p-2 border-[3px] border-[#333] rounded-[10px] font-bold text-sm
                        ${i === q.correctAnswerIndex ? 'bg-[#e5ffd4]' : 'bg-white'}
                      `}
                    >
                      <span className={`inline-block w-6 h-6 rounded-full text-center leading-6 mr-2 
                        ${i === q.correctAnswerIndex ? 'bg-[#6BCB77] text-white' : 'bg-[#eee] text-[#666]'}
                      `}>
                        {['A', 'B', 'C', 'D'][i]}
                      </span>
                      {opt}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {questionsToReview.length === 0 && (
               <div className="text-center font-bold text-gray-500 mt-10">Không tìm thấy câu hỏi phù hợp.</div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFD93D] p-2 md:p-4 font-sans">
      <div className="max-w-[1200px] mx-auto h-[min(calc(100vh-2rem),800px)] grid grid-cols-1 md:grid-cols-4 grid-rows-[auto_1fr_auto] md:grid-rows-[auto_1fr] gap-3 md:gap-4">
        
        {/* Header */}
        <div className="md:col-span-3 bg-[#FF6B6B] border-[6px] border-[#333] rounded-[24px] flex flex-col items-center justify-center p-3 shadow-[8px_8px_0px_#333] text-white text-center relative">
          <button 
             onClick={() => setView('home')}
             className="absolute top-2 left-2 md:top-4 md:left-4 bg-white text-[#333] border-[3px] border-[#333] px-2 py-1 md:px-3 md:py-1 rounded-[10px] shadow-[2px_2px_0px_#333] font-bold text-xs hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all"
          >
            ← Thoát
          </button>
          <h1 style={{ textShadow: "3px 3px 0px #333", letterSpacing: "1px" }} className="text-2xl md:text-[32px] leading-tight font-black uppercase mb-1 drop-shadow-md">
            Túi Mù Tri Thức
          </h1>
          <p className="text-sm md:text-base font-bold">Xin chào nhà thông thái <span className="bg-white text-[#FF6B6B] px-2 py-0.5 rounded border-2 border-[#333]">{playerName}</span>!</p>
        </div>

        {/* Stats */}
        <div className="md:col-span-1 bg-[#4D96FF] border-[6px] border-[#333] rounded-[24px] flex flex-col md:justify-center items-center p-3 shadow-[8px_8px_0px_#333] text-white flex-row md:flex-col justify-around">
          <div className="text-base md:text-[22px] font-black md:mb-2 text-center drop-shadow-md">⭐ ĐIỂM: {quaDaMo.length * 5}/100</div>
          <div className="text-base md:text-[22px] font-black md:mb-4 text-center drop-shadow-md">🎁 ĐÃ MỞ: {20 - tuiMu.length}/20</div>
          {tuiMu.length === 0 && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              onClick={() => setView('home')}
              className="bg-[#FFD93D] text-[#333] border-[4px] border-[#333] px-3 py-1 md:px-4 md:py-2 font-black uppercase rounded-xl hover:bg-white transition-colors shadow-[4px_4px_0px_#333] active:translate-y-1 active:translate-x-1 active:shadow-[0px_0px_0px_#333]"
            >
              Chơi Lại
            </motion.button>
          )}
        </div>

        {/* Game Stage */}
        <div className="md:col-span-3 md:row-span-1 bg-[#f9f9f9] border-[6px] border-[#333] rounded-[24px] flex flex-col items-center p-4 shadow-[8px_8px_0px_#333] relative overflow-hidden min-h-[300px] md:min-h-[450px]">
          <div className="flex flex-wrap justify-center content-start gap-2 md:gap-4 items-center w-full z-10 overflow-y-auto pb-4 custom-scrollbar h-full">
            <AnimatePresence>
              {tuiMu.map((bag) => (
                <motion.button
                  key={bag.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1.05, y: -5, rotate: 3 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveBag(bag)}
                  className={`w-[60px] h-[80px] sm:w-[75px] sm:h-[100px] md:w-[95px] md:h-[125px] ${bag.bagBg} border-[3px] md:border-[4px] border-[#333] rounded-[10px] shadow-[4px_4px_0px_#333] flex flex-col items-center justify-center cursor-pointer transition-transform relative shrink-0`}
                >
                  <div className="text-[24px] sm:text-[32px] md:text-[40px] mb-1 drop-shadow-md">{bag.icon}</div>
                  <span className="text-white font-black text-[9px] sm:text-[10px] md:text-[11px] uppercase bg-[#333] px-1 md:px-2 py-[1px] md:py-[2px] rounded-[4px] whitespace-nowrap">
                    Túi {bag.id}
                  </span>
                </motion.button>
              ))}
            </AnimatePresence>

            {tuiMu.length === 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl md:text-3xl font-black text-[#FF6B6B] self-center text-center mt-10 drop-shadow-sm w-full"
              >
                Bạn đã hoàn thành thử thách! 🎉<br/>Tuyệt vời lắm!
              </motion.div>
            )}
          </div>
        </div>

        {/* Collection / History */}
        <div className="md:col-span-1 md:row-span-1 bg-white border-[6px] border-[#333] rounded-[24px] flex flex-col p-3 shadow-[8px_8px_0px_#333] min-h-[220px] overflow-hidden">
          <div className="text-[16px] md:text-[18px] font-black border-b-[4px] border-[#333] w-full text-center pb-2 mb-3 uppercase text-[#333]">
            Lịch sử trả lời
          </div>
          
          <div className="w-full flex-1 flex flex-col gap-2 overflow-y-auto pr-1">
            <AnimatePresence>
              {history.map((item, index) => (
                <motion.div
                  key={`hist-${item.question.id}-${index}`}
                  initial={{ scale: 0, x: 50, opacity: 0 }}
                  animate={{ scale: 1, x: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 12 }}
                  className={`flex flex-col gap-1 p-3 border-[3px] border-[#333] rounded-[10px] shadow-[2px_2px_0px_#333] text-[13px] font-bold ${item.isCorrect ? 'bg-[#e5ffd4]' : 'bg-[#ffe4e4]'}`}
                >
                  <div className="font-black text-[#333] border-b-2 border-[#333]/10 pb-1 mb-1">
                    {item.question.text}
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-2">
                       <span className="text-[#666]">Bạn chọn:</span> 
                       <span className={item.isCorrect ? 'text-green-700' : 'text-red-600 line-through'}>
                         {item.question.options[item.selectedIdx]}
                       </span>
                    </div>
                    {!item.isCorrect && (
                       <div className="flex gap-2 items-center">
                         <span className="text-[#666]">Đáp án:</span> 
                         <span className="bg-[#FFD93D] px-1.5 py-0.5 rounded-[5px] border-2 border-[#333] text-[#333]">
                           {item.question.options[item.question.correctAnswerIndex]}
                         </span>
                       </div>
                    )}
                  </div>
                </motion.div>
              ))}
              
              {history.length === 0 && tuiMu.length > 0 && (
                <div className="text-center text-gray-400 font-bold text-sm mt-4 italic">
                  Chưa trả lời câu nào...<br/>Hãy mở túi để bắt đầu!
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>

      {/* Question Modal Overlay */}
      <AnimatePresence>
        {activeBag && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              className="bg-white border-[6px] border-[#333] rounded-[24px] max-w-2xl w-full p-5 md:p-8 shadow-[12px_12px_0px_#000] flex flex-col items-center max-h-[90vh] overflow-y-auto"
            >
              <div className="bg-[#FFD93D] text-[#333] border-[3px] border-[#333] px-4 py-1 rounded-full font-black text-sm mb-4 shadow-[2px_2px_0px_#333]">Câu hỏi túi số {activeBag.id}</div>
              <h2 className="text-xl md:text-2xl font-black text-center text-[#333] mb-6 leading-relaxed">{activeBag.question.text}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
                {activeBag.question.options.map((opt: string, idx: number) => {
                  let btnColor = "bg-[#f9f9f9] text-[#333] hover:bg-[#e2e8f0]";
                  if (selectedAnswer !== null) {
                      if (idx === activeBag.question.correctAnswerIndex) btnColor = "bg-[#6BCB77] text-white";
                      else if (idx === selectedAnswer) btnColor = "bg-[#FF6B6B] text-white";
                  }
                  
                  return (
                    <button
                      key={idx}
                      disabled={selectedAnswer !== null}
                      onClick={() => traLoi(idx)}
                      className={`border-[4px] border-[#333] p-3 md:p-4 rounded-[15px] font-bold text-base md:text-lg text-left shadow-[4px_4px_0px_#333] transition-all
                        ${selectedAnswer === null ? 'active:translate-y-1 active:translate-x-1 active:shadow-[0px_0px_0px_#333]' : 'shadow-none translate-y-1 translate-x-1'}
                        ${btnColor}
                      `}
                    >
                      <span className="inline-block bg-[#333] text-white w-8 h-8 text-center leading-8 rounded-full mr-3 text-sm font-black border-2 border-transparent">{["A", "B", "C", "D"][idx]}</span>
                      {opt}
                    </button>
                  );
                })}
              </div>
              
              {selectedAnswer !== null && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-6 p-4 border-[4px] border-[#333] rounded-[15px] w-full text-center shadow-[4px_4px_0px_#333]"
                    style={{ backgroundColor: selectedAnswer === activeBag.question.correctAnswerIndex ? '#f0fdf4' : '#fef2f2' }}
                  >
                    {selectedAnswer === activeBag.question.correctAnswerIndex ? (
                      <span className="text-[#16a34a] font-black text-xl md:text-2xl">🎉 Tuyệt vời! Bạn đã trả lời đúng!</span>
                    ) : (
                      <span className="text-[#dc2626] font-black text-xl md:text-2xl">😢 Rất tiếc, chưa chính xác mất rồi!</span>
                    )}
                  </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
