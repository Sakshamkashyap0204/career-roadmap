import React, { useState, useEffect } from 'react';
import './SpaceCareerPortal.css'; // Create this file for styles

const SpaceCareerPortal = () => {
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [selectedStep, setSelectedStep] = useState(null);
  const [showRoadmap, setShowRoadmap] = useState(false);
  const [showStepDetails, setShowStepDetails] = useState(false);
  const [animateStars, setAnimateStars] = useState(true);

  // Career categories and data
  const careerCategories = [
    {
      id: 'scientists',
      title: 'Scientists',
      careers: [
        { id: 'astrophysicist', title: 'Astrophysicist', description: 'Study space phenomena like black holes and galaxies.' },
        { id: 'planetary_scientist', title: 'Planetary Scientist', description: 'Explore planets, moons, and other celestial bodies.' },
        { id: 'astrobiologist', title: 'Astrobiologist', description: 'Investigate the potential for life beyond Earth.' },
        { id: 'cosmologist', title: 'Cosmologist', description: 'Investigate the origins and evolution of the universe.' },
        { id: 'heliophysicist', title: 'Heliophysicist', description: 'Study the Sun and its impact on the solar system.' }
      ]
    },
    {
      id: 'engineers',
      title: 'Engineers',
      careers: [
        { id: 'aerospace_engineer', title: 'Aerospace Engineer', description: 'Design spacecraft, rockets, and aircraft.' },
        { id: 'mechanical_engineer', title: 'Mechanical Engineer', description: 'Build and maintain spacecraft systems.' },
        { id: 'software_engineer', title: 'Software Engineer', description: 'Write programs to control spacecraft and analyze data.' },
        { id: 'robotics_engineer', title: 'Robotics Engineer', description: 'Create robots like rovers and robotic arms.' },
        { id: 'propulsion_engineer', title: 'Propulsion Engineer', description: 'Develop rocket engines and propulsion systems.' }
      ]
    },
    {
      id: 'operations',
      title: 'Mission Operations',
      careers: [
        { id: 'flight_director', title: 'Flight Director', description: 'Lead missions from NASA\'s Mission Control.' },
        { id: 'mission_planner', title: 'Mission Planner', description: 'Design and schedule space missions.' },
        { id: 'launch_director', title: 'Launch Director', description: 'Oversee rocket launches.' },
        { id: 'spacecraft_communicator', title: 'Spacecraft Communicator (CAPCOM)', description: 'Act as the primary voice between Earth and astronauts.' }
      ]
    },
    {
      id: 'astronauts',
      title: 'Astronauts',
      careers: [
        { id: 'pilot_astronaut', title: 'Pilot Astronaut', description: 'Fly spacecraft and lead missions.' },
        { id: 'mission_specialist', title: 'Mission Specialist', description: 'Conduct experiments and spacewalks.' },
        { id: 'payload_specialist', title: 'Payload Specialist', description: 'Operate and maintain scientific equipment.' }
      ]
    },
    {
      id: 'specialized',
      title: 'Specialized Roles',
      careers: [
        { id: 'space_lawyer', title: 'Space Lawyer', description: 'Navigate international space law and treaties.' },
        { id: 'ai_engineer', title: 'AI and Machine Learning Engineer', description: 'Use AI to analyze space data and automate processes.' },
        { id: 'aerospace_physician', title: 'Aerospace Physician', description: 'Monitor astronauts\' health before, during, and after spaceflight.' },
        { id: 'data_scientist', title: 'Data Scientist', description: 'Analyze massive datasets from space missions.' }
      ]
    }
  ];

  // Roadmap steps - common for all careers but with custom content
  const generateRoadmapSteps = (careerId) => {
    const careerSpecificContent = {
      astrophysicist: {
        highSchool: "Focus on advanced physics, mathematics, and astronomy courses. Join astronomy clubs and participate in science competitions. Begin learning to code and explore the night sky with telescopes if possible.",
        undergraduate: "Pursue a Bachelor's degree in Physics, Astronomy, or Astrophysics. Take courses in calculus, differential equations, quantum mechanics, and computational physics. Seek research opportunities with professors.",
        graduate: "Complete a Master's degree in Astrophysics specializing in areas like stellar evolution, galaxies, or cosmology. Begin publishing research and attend astronomy conferences.",
        doctorate: "Obtain a PhD in Astrophysics with original research on topics like black holes, dark matter, or galaxy formation. Publish in peer-reviewed journals and build your professional network.",
        postdoctoral: "Complete 2-3 years of postdoctoral research at universities, observatories, or space agencies. Establish your research reputation and apply for research grants.",
        career: "Work as a research scientist at universities, national laboratories, space agencies (NASA, ESA), or private observatories. Alternative paths include science communication, data science, or aerospace industry research."
      },
      cosmologist: {
        highSchool: "Excel in advanced mathematics, physics, and computer science. Develop strong analytical thinking and problem-solving skills. Read books on cosmology and the universe's origins.",
        undergraduate: "Earn a Bachelor's degree in Physics with coursework in astrophysics, mathematics, and computational methods. Begin understanding general relativity and quantum mechanics.",
        graduate: "Complete a Master's focusing on cosmology or theoretical physics. Study cosmic microwave background, dark matter, and structure formation. Learn advanced computational modeling.",
        doctorate: "Conduct original research in theoretical or observational cosmology. Work on problems like cosmic inflation, dark energy, or large-scale structure. Master cosmological simulations.",
        postdoctoral: "Join cosmology research groups at universities or institutes. Collaborate on large-scale surveys or experiments (LSST, Euclid). Secure competitive research grants.",
        career: "Careers include theoretical cosmologist, computational astrophysicist, professor, researcher at national laboratories, or data scientist for cosmological surveys."
      },
      astrobiologist: {
        highSchool: "Focus on biology, chemistry, physics, and earth sciences. Participate in science fairs. Develop strong laboratory skills and interdisciplinary scientific knowledge.",
        undergraduate: "Pursue a degree in Biology, Chemistry, or Earth Sciences with astronomy electives. Take courses in biochemistry, microbiology, geology, and planetary science.",
        graduate: "Complete a Master's in Astrobiology or related field. Study extremophiles, planetary habitability, or biosignatures. Begin interdisciplinary research collaborations.",
        doctorate: "Conduct original research connecting biology to astronomy. Study topics like extremophiles, biosignatures, or prebiotic chemistry. Publish in astrobiology journals.",
        postdoctoral: "Work with astrobiology research teams at universities, NASA, or research institutes. Participate in mission planning for life-detection missions on other planets.",
        career: "Career paths include research scientist at astrobiology institutes, planetary scientist, exoplanet researcher, or mission specialist for space agencies."
      }
    };

    // Default content for careers without specific content
    const defaultContent = {
      highSchool: "Focus on STEM subjects (Science, Technology, Engineering, Mathematics). Join relevant clubs and competitions. Develop fundamental skills in critical thinking and problem-solving.",
      undergraduate: "Earn a Bachelor's degree in a relevant field. Take specialized courses, seek internships, and participate in research projects when possible.",
      graduate: "Complete a Master's degree with specialization in your area of interest. Build technical expertise and begin professional networking.",
      doctorate: "Obtain a PhD with original research contribution to your field. Publish papers and present at conferences to establish your expertise.",
      postdoctoral: "Gain specialized experience through research positions or industry work. Develop your professional reputation and specialized skills.",
      career: "Career paths include research, industry positions, academia, government agencies, or entrepreneurial ventures in the space sector."
    };

    // Get career-specific content or use default
    const content = careerSpecificContent[careerId] || defaultContent;

    return [
      {
        id: 1,
        title: "High School",
        content: content.highSchool
      },
      {
        id: 2,
        title: "Undergraduate Degree",
        content: content.undergraduate
      },
      {
        id: 3,
        title: "Graduate Degree",
        content: content.graduate
      },
      {
        id: 4,
        title: "Doctorate (PhD)",
        content: content.doctorate
      },
      {
        id: 5,
        title: "Post-Doctoral",
        content: content.postdoctoral
      },
      {
        id: 6,
        title: "Career Path",
        content: content.career
      }
    ];
  };

  // Handle career selection
  const handleCareerClick = (career) => {
    setSelectedCareer(career);
    setShowRoadmap(true);
    setSelectedStep(null);
    setShowStepDetails(false);
  };

  // Handle step selection in roadmap
  const handleStepClick = (step) => {
    setSelectedStep(step);
    setShowStepDetails(true);
  };

  // Close roadmap popup
  const closeRoadmap = () => {
    setShowRoadmap(false);
  };

  // Close step details popup
  const closeStepDetails = () => {
    setShowStepDetails(false);
  };

  // Find the full career object based on ID
  const getCareerById = (careerId) => {
    for (const category of careerCategories) {
      const career = category.careers.find(c => c.id === careerId);
      if (career) return career;
    }
    return null;
  };

  // Generate animated stars for the background
  const renderStars = () => {
    const starCount = 200;
    const stars = [];
    
    for (let i = 0; i < starCount; i++) {
      const size = Math.random() * 3;
      const animationDuration = 3 + Math.random() * 8;
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const delay = Math.random() * 5;
      
      stars.push(
        <div 
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${left}%`,
            top: `${top}%`,
            opacity: animateStars ? 0.7 : 1,
            animation: animateStars ? `twinkle ${animationDuration}s infinite ${delay}s` : 'none'
          }}
        />
      );
    }
    
    return stars;
  };

  const selectedCareerObj = selectedCareer ? getCareerById(selectedCareer) : null;
  const roadmapSteps = selectedCareer ? generateRoadmapSteps(selectedCareer) : [];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-black via-indigo-950 to-blue-950">
      {/* Animated stars */}
      <div className="absolute inset-0 overflow-hidden">
        {renderStars()}
      </div>
      
      {/* Nebula-like effects */}
      <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full top-96 left-64 w-96 h-96"></div>
      <div className="absolute inset-0 bg-purple-500/5 blur-3xl rounded-full -top-24 -right-24 w-96 h-96"></div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <h1 className="text-4xl font-bold text-center text-white mb-8">AstroVerse Explorer</h1>
        <h2 className="text-2xl font-semibold text-center text-blue-200 mb-12">Space Career Pathways</h2>
        
        {/* Career categories and listings */}
        <div className="max-w-3xl mx-auto">
          {careerCategories.map((category) => (
            <div key={category.id} className="mb-8">
              <h3 className="text-xl font-semibold text-purple-300 mb-4 border-b border-purple-500/30 pb-2">
                {category.title}
              </h3>
              
              <div className="space-y-3">
                {category.careers.map((career) => (
                  <div 
                    key={career.id}
                    onClick={() => handleCareerClick(career.id)}
                    className="p-4 bg-indigo-900/30 hover:bg-indigo-800/50 rounded-lg border border-indigo-700/40 cursor-pointer transition-all transform hover:-translate-y-1 backdrop-blur-sm"
                  >
                    <h4 className="text-lg font-medium text-blue-200">{career.title}</h4>
                    <p className="text-blue-100/70 text-sm mt-1">{career.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Roadmap Popup */}
      {showRoadmap && selectedCareerObj && (
        <div className="fixed inset-0 flex items-center justify-center z-30">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeRoadmap}></div>
          
          {/* Popup content */}
          <div className="relative z-10 bg-gradient-to-br from-indigo-900/90 to-blue-900/90 backdrop-blur-md p-6 rounded-xl border border-indigo-500/30 w-11/12 max-w-4xl max-h-[90vh] overflow-auto">
            {/* Close button */}
            <button 
              onClick={closeRoadmap}
              className="absolute top-4 right-4 text-white/80 hover:text-white p-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <h3 className="text-2xl font-bold text-blue-200 mb-6">{selectedCareerObj.title} Roadmap</h3>
            
            <div className="relative mb-10 mt-8">
              {/* Timeline line */}
              <div className="absolute top-6 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded"></div>
              
              {/* Steps */}
              <div className="flex justify-between relative">
                {roadmapSteps.map((step) => (
                  <div key={step.id} className="flex flex-col items-center relative z-10">
                    <button
                      onClick={() => handleStepClick(step)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                        selectedStep && selectedStep.id === step.id
                          ? 'bg-purple-600 text-white border-purple-400 shadow-lg shadow-purple-500/30' 
                          : 'bg-indigo-800/70 text-blue-200 border-blue-400/50 hover:bg-indigo-700'
                      }`}
                    >
                      {step.id}
                    </button>
                    <p className="text-xs font-medium text-center mt-3 text-blue-200 max-w-[80px]">{step.title}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="text-blue-200/80 text-center text-sm">
              Click on any step in the roadmap to see details
            </div>
          </div>
        </div>
      )}
      
      {/* Step Details Popup */}
      {showStepDetails && selectedStep && (
        <div className="fixed inset-0 flex items-center justify-center z-40">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeStepDetails}></div>
          
          {/* Popup content */}
          <div className="relative z-10 bg-gradient-to-br from-indigo-950/90 to-blue-950/90 backdrop-blur-md p-6 rounded-xl border border-indigo-500/30 w-11/12 max-w-2xl max-h-[80vh] overflow-auto">
            {/* Close button */}
            <button 
              onClick={closeStepDetails}
              className="absolute top-4 right-4 text-white/80 hover:text-white p-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center mr-3">
                {selectedStep.id}
              </div>
              <h3 className="text-xl font-bold text-blue-200">{selectedStep.title}</h3>
            </div>
            
            <div className="bg-indigo-900/40 rounded-lg p-4 border border-indigo-700/30">
              <p className="text-blue-100 leading-relaxed">{selectedStep.content}</p>
            </div>
            
            {/* Additional resources or links could go here */}
            <div className="mt-6 text-sm text-blue-300/70">
              <p>Want to learn more? Explore our learning modules or join the AstroVerse community!</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpaceCareerPortal;