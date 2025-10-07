import React from 'react'
import { useLang } from '../i18n'
import FloatingParticles from './FloatingParticles'

const GradeSelection = ({ setCurrentPage }) => {
  const { t, lang } = useLang()
  const primaryGrades = [6, 7, 8, 9, 10]
  const higherGrades = [11, 12]

  const handleGradeClick = (grade) => {
    setCurrentPage('subjectSelection', { grade })
  }

  const handleBackToHome = () => {
    setCurrentPage('home')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-20 px-4">
      <FloatingParticles />
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          {lang === 'hi' ? 'अपनी कक्षा चुनें' : 'Choose Your'}{' '}
          <span className="bg-gradient-to-r from-stem-blue to-stem-purple bg-clip-text text-transparent">
            {lang === 'hi' ? 'कक्षा स्तर' : 'Grade Level'}
          </span>
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          {lang === 'hi' ? 'अपनी एसटीईएम यात्रा शुरू करने के लिए कक्षा चुनें' : 'Select your grade to start your STEM learning journey'}
        </p>
      </div>

             <div className="max-w-7xl mx-auto">
         {/* PRIMARY SCHOOL Section */}
         <div className="mb-16">
           <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
             <span className="bg-gradient-to-r from-stem-green to-stem-blue bg-clip-text text-transparent">
               PRIMARY SCHOOL
             </span>
           </h2>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
             {primaryGrades.map((grade, index) => (
               <div
                 key={grade}
                 onClick={() => handleGradeClick(grade)}
                 className={`group cursor-pointer transform transition-all duration-300 hover:scale-105 animate-slide-up stagger-${index + 1}`}
               >
                 <div className="bg-gradient-to-br from-stem-green/20 to-stem-blue/20 backdrop-blur-sm rounded-3xl p-8 border border-stem-green/30 hover:border-stem-green/60 transition-all duration-300 h-full flex flex-col items-center justify-center text-center group-hover:shadow-2xl group-hover:shadow-stem-green/20">
                   {/* Grade Icon */}
                   <div className="w-24 h-24 bg-gradient-to-br from-stem-green to-stem-blue rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:animate-glow">
                     <span className="text-4xl font-bold text-white">{grade}</span>
                   </div>
                   
                   {/* Grade Label */}
                   <h3 className="text-2xl font-bold text-white mb-2">
                     {lang === 'hi' ? `कक्षा ${grade}` : `Grade ${grade}`}
                   </h3>
                   
                   {/* Description */}
                   <p className="text-gray-300 text-sm leading-relaxed">
                     {grade === 6 && (lang === 'hi' ? 'अपनी एसटीईएम यात्रा शुरू करें' : 'Begin your STEM adventure')}
                     {grade === 7 && (lang === 'hi' ? 'विज्ञान और गणित की मूल बातें' : 'Explore science & math fundamentals')}
                     {grade === 8 && (lang === 'hi' ? 'आलोचनात्मक सोच विकसित करें' : 'Build critical thinking skills')}
                     {grade === 9 && (lang === 'hi' ? 'मुख्य अवधारणाओं में महारत' : 'Master core concepts')}
                     {grade === 10 && (lang === 'hi' ? 'उन्नत अध्ययन की तैयारी' : 'Prepare for advanced learning')}
                   </p>
                   
                   {/* Hover Effect */}
                   <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                     <div className="w-8 h-8 bg-stem-green rounded-full flex items-center justify-center mx-auto">
                       <span className="text-white text-lg">→</span>
                     </div>
                   </div>
                 </div>
               </div>
             ))}
           </div>
         </div>

         {/* HIGHER EDUCATION Section */}
         <div className="mb-16">
           <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
             <span className="bg-gradient-to-r from-stem-purple to-stem-orange bg-clip-text text-transparent">
               {lang === 'hi' ? 'उच्च शिक्षा' : 'HIGHER EDUCATION'}
             </span>
           </h2>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
             {higherGrades.map((grade, index) => (
               <div
                 key={grade}
                 onClick={() => handleGradeClick(grade)}
                 className={`group cursor-pointer transform transition-all duration-300 hover:scale-105 animate-bounce-in stagger-${index + 1}`}
               >
                 <div className="bg-gradient-to-br from-stem-purple/20 to-stem-orange/20 backdrop-blur-sm rounded-3xl p-10 border border-stem-purple/30 hover:border-stem-purple/60 transition-all duration-300 h-full flex flex-col items-center justify-center text-center group-hover:shadow-2xl group-hover:shadow-stem-purple/20">
                   {/* Grade Icon */}
                   <div className="w-32 h-32 bg-gradient-to-br from-stem-purple to-stem-orange rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-xl group-hover:animate-glow">
                     <span className="text-5xl font-bold text-white">{grade}</span>
                   </div>
                   
                   {/* Grade Label */}
                   <h3 className="text-3xl font-bold text-white mb-4">
                     {lang === 'hi' ? `कक्षा ${grade}` : `Grade ${grade}`}
                   </h3>
                   
                   {/* Description */}
                   <p className="text-gray-300 text-lg leading-relaxed mb-4">
                     {grade === 11 && (lang === 'hi' ? 'उन्नत एसटीईएम व कोडिंग के मूल' : 'Advanced STEM concepts & coding fundamentals')}
                     {grade === 12 && (lang === 'hi' ? 'कॉलेज तैयारी व विशेष कौशल' : 'College preparation & specialized skills')}
                   </p>
                   
                   {/* Special Features */}
                   <div className="bg-white/10 rounded-2xl p-4 mb-4">
                     <p className="text-stem-orange font-semibold text-sm">
                       {grade === 11 && (lang === 'hi' ? '✨ कोडिंग व उन्नत टेक शामिल' : '✨ Includes Coding & Advanced Tech')}
                       {grade === 12 && (lang === 'hi' ? '🚀 कॉलेज तैयारी व विशेष ट्रैक्स' : '🚀 College Prep & Specialized Tracks')}
                     </p>
                   </div>
                   
                   {/* Hover Effect */}
                   <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                     <div className="w-10 h-10 bg-stem-purple rounded-full flex items-center justify-center mx-auto">
                       <span className="text-white text-xl">→</span>
                     </div>
                   </div>
                 </div>
               </div>
             ))}
           </div>
         </div>

                 {/* Additional Info Section */}
         <div className="text-center mb-16">
           <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-600 max-w-4xl mx-auto">
             <h3 className="text-2xl font-bold text-white mb-4">
               Ready to Begin Your STEM Journey?
             </h3>
             <p className="text-xl text-gray-300 mb-6">
               Each grade level offers tailored content, interactive lessons, and engaging challenges 
               designed to make learning fun and effective. Choose your grade to get started!
             </p>
             <div className="flex flex-wrap justify-center gap-4">
               <div className="flex items-center text-stem-green">
                 <span className="text-2xl mr-2">✓</span>
                 <span className="text-white">Interactive Learning</span>
               </div>
               <div className="flex items-center text-stem-blue">
                 <span className="text-2xl mr-2">✓</span>
                 <span className="text-white">Progress Tracking</span>
               </div>
               <div className="flex items-center text-stem-purple">
                 <span className="text-2xl mr-2">✓</span>
                 <span className="text-white">Gamified Experience</span>
               </div>
             </div>
           </div>
         </div>

         {/* Back Button at Bottom */}
         <div className="text-center mt-12 mb-8">
           <button
             onClick={handleBackToHome}
             className="px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-300 flex items-center mx-auto"
           >
             {lang === 'hi' ? '← होम पर वापस' : '← Back to Home'}
           </button>
         </div>
       </div>
     </div>
   )
 }

export default GradeSelection
