'use client';

import { useEffect, useRef, useState } from 'react';
import { Play, Pause, Gift } from 'lucide-react';
import { Playfair_Display, Dancing_Script } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-playfair',
});

const dancing = Dancing_Script({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-dancing',
});

export default function BirthdayGreeting() {
  const [currentPage, setCurrentPage] = useState<'intro' | 'opening' | 'main'>(
    'intro'
  );
  const [isTyping, setIsTyping] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [openingStep, setOpeningStep] = useState(0);
  const [showGift, setShowGift] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  const birthdayMessage = 'Selamat Ulang Tahun! 🎉';
  const fullMessage =
    'Semoga panjang umur, sehat selalu, dan semua impianmu tercapai! Hari ini adalah hari spesialmu, jadi nikmati setiap momennya! 🎂✨';

  const openingTexts = [
    'Selamat Ulang Tahun',
    'Buat Tobrut Ini',
    '19 Juni',
    'Wish u all the best! ✨',
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isTyping && currentPage === 'main') {
            setIsTyping(true);
            typeMessage();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (parallaxRef.current && currentPage === 'main') {
      observer.observe(parallaxRef.current);
    }

    return () => observer.disconnect();
  }, [isTyping, currentPage]);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current && currentPage === 'main') {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        heroRef.current.style.transform = `translateY(${rate}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  const typeMessage = () => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullMessage.length) {
        setTypedText(fullMessage.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 50);
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleOpenGreeting = () => {
    setCurrentPage('opening');
    startOpeningAnimation();
  };

  const startOpeningAnimation = () => {
    let step = 0;
    const timer = setInterval(() => {
      if (step < openingTexts.length) {
        setOpeningStep(step + 1);
        step++;
      } else {
        clearInterval(timer);
        setTimeout(() => {
          setCurrentPage('main');
        }, 1500);
      }
    }, 1200);
  };

  const handleGiftClick = () => {
    setShowGift(true);
  };

  if (currentPage === 'intro') {
    return (
      <div
        className={`${playfair.variable} ${dancing.variable} min-h-screen bg-gradient-to-br from-rose-400 via-pink-500 to-purple-600 flex items-center justify-center relative overflow-hidden`}
      >
        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float text-white/20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                fontSize: `${Math.random() * 20 + 10}px`,
              }}
            >
              ✨
            </div>
          ))}
        </div>

        <div className="text-center z-10 px-4">
          <div className="mb-12 animate-bounce">
            <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-white/50 shadow-2xl backdrop-blur-sm">
              <img
                src="/1pp.jpeg"
                alt="Liya"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <h1 className="text-5xl sm:text-7xl font-bold text-white mb-8 animate-pulse font-playfair">
            Selamat Ulang Tahun
          </h1>
          <h2 className="text-4xl sm:text-6xl font-bold text-yellow-300 mb-12 animate-bounce font-dancing">
            Liya
          </h2>

          <button
            onClick={handleOpenGreeting}
            className="group relative px-8 py-4 bg-white/20 backdrop-blur-sm border-2 border-white/50 rounded-full text-white font-semibold text-xl hover:bg-white/30 transition-all duration-300 transform hover:scale-105"
          >
            <span className="relative z-10">Open Ucapan Ultah 🎁</span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>
    );
  }

  if (currentPage === 'opening') {
    return (
      <div
        className={`${playfair.variable} ${dancing.variable} min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center`}
      >
        <div className="text-center">
          {openingTexts.slice(0, openingStep).map((text, index) => (
            <div
              key={index}
              className={`text-4xl sm:text-6xl font-bold text-white mb-8 animate-fade-in-up font-playfair ${
                index === 0
                  ? 'text-yellow-300'
                  : index === 1
                  ? 'text-pink-300'
                  : index === 2
                  ? 'text-blue-300'
                  : 'text-green-300'
              }`}
              style={{ animationDelay: `${index * 0.3}s` }}
            >
              {text}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${playfair.variable} ${dancing.variable} min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100`}
    >
      {/* Audio Player */}
      <audio ref={audioRef} loop>
        <source src="/birthday-song.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Music Control */}
      <button
        onClick={toggleMusic}
        className="fixed top-4 right-4 z-50 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white/90 transition-all duration-300"
      >
        {isPlaying ? (
          <Pause className="w-6 h-6 text-purple-600" />
        ) : (
          <Play className="w-6 h-6 text-purple-600" />
        )}
      </button>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div ref={heroRef} className="absolute inset-0 z-0">
          <img
            src="/7pp.jpeg"
            alt="Birthday Hero"
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <div className="animate-bounce mb-8">
            <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto rounded-full overflow-hidden border-4 border-white shadow-2xl">
              <img
                src="/1pp.jpeg"
                alt="Birthday Person"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 mb-6 animate-pulse font-playfair">
            {birthdayMessage}
          </h1>

          <div className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto">
            <p className="animate-fade-in-up">
              Hari yang spesial untuk orang yang spesial! 🎈
            </p>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 text-4xl animate-float">
            🎂
          </div>
          <div className="absolute top-1/3 right-1/4 text-3xl animate-float-delayed">
            🎈
          </div>
          <div className="absolute bottom-1/3 left-1/3 text-3xl animate-float">
            🎉
          </div>
          <div className="absolute bottom-1/4 right-1/3 text-4xl animate-float-delayed">
            ✨
          </div>
        </div>
      </section>

      {/* Typing Animation Section */}
      <section
        ref={parallaxRef}
        className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm"
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 font-playfair">
              Pesan Spesial Untukmu
            </h2>
            <div className="text-xl sm:text-2xl text-gray-700 leading-relaxed min-h-[120px] flex items-center justify-center">
              <p className="typewriter">
                {typedText}
                <span className="animate-blink">|</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Parallax Photo Gallery */}
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12 font-playfair">
            Momen Berharga 📸
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div
                key={index}
                className="parallax-item group cursor-pointer"
                style={{
                  transform: `translateY(${
                    index % 2 === 0 ? '20px' : '-20px'
                  })`,
                }}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-500 transform group-hover:scale-105">
                  <img
                    src={`/${index}pp.jpeg`}
                    alt={`Memory ${index}`}
                    className="w-full h-64 sm:h-72 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="text-sm font-medium">
                        Liya Tobrut #{index}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gift Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 font-playfair">
            Ada Kado Spesial Nih! 🎁
          </h2>

          <button
            onClick={handleGiftClick}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-xl rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <Gift className="w-8 h-8 animate-bounce" />
            Buka Kado Sekarang!
          </button>
        </div>
      </section>

      {/* Gift Modal */}
      {showGift && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-auto animate-fade-in-up">
            {/* Close Button */}
            <button
              onClick={() => {
                setShowGift(false);
              }}
              className="absolute top-4 right-4 z-10 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors duration-200"
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 font-playfair">
                Kado Spesial Untukmu! 🎁
              </h3>

              {/* Gift GIF */}
              <div className="mb-6 rounded-xl overflow-hidden shadow-lg">
                <img
                  src="/placeholder.svg?height=300&width=300&text=🎁+Happy+Birthday+GIF"
                  alt="Birthday Gift GIF"
                  className="w-full h-64 object-cover"
                />
              </div>

              <div className="space-y-4">
                <p className="text-xl font-bold text-pink-600 font-playfair">
                  Selamat Ulang Tahun Liya! 🎉
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Semoga website ini bisa jadi kenang-kenangan yang indah di
                  hari spesialmu. Kado yang sesungguhnya adalah doa dan harapan
                  terbaik untukmu! 🌟
                </p>
                <div className="text-3xl">💕✨🎂🎈</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-12 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4 font-playfair">
            Selamat Ulang Tahun Sekali Lagi! 🎊
          </h3>
          <p className="text-lg opacity-90">
            Semoga tahun ini membawa kebahagiaan yang tak terhingga
          </p>
          <div className="mt-8 text-4xl">🎂🎈🎉✨🎁</div>
        </div>
      </footer>
    </div>
  );
}
