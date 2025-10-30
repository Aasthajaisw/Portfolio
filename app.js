const { useState, useEffect, useRef } = React;

// Data from CV
const portfolioData = {
  personalInfo: {
    name: "Aastha Jaiswal",
    phone: "+91 6268852030",
    email: "aasthajaiswal058@gmail.com",
    location: "Singrauli, Madhya Pradesh, India",
    jobTitles: [
      "Full Stack Developer",
      "Cloud Enthusiast",
      "Problem Solver",
      "React Developer"
    ],
    profileImage: "https://drive.google.com/file/d/1uZG6gUpjvtelTKrCo4r1UvK-7_a75Kr6/view?usp=drive_link",
    linkedin: "https://www.linkedin.com/in/aastha-jaiswal01/",
    github: "https://github.com/Aasthajaisw"
  },
  education: [
    {
      institution: "GLA University, Mathura",
      qualification: "B.Tech Computer Science and Engineering",
      grade: "8.02 CGPA",
      date: "June 2026",
      status: "Expected"
    },
    {
      institution: "Delhi Public School, Singrauli",
      qualification: "Intermediate",
      grade: "89.8%",
      date: "2026"
    },
    {
      institution: "Delhi Public School, Singrauli",
      qualification: "High School",
      grade: "89.2%",
      date: "2019"
    }
  ],
  experience: [
    {
      position: "AWS-Cloud Computing Industrial Trainee",
      company: "Technical Guftgu",
      date: "June 2024",
      tools: ["AWS EC2", "S3", "Linux"],
      responsibilities: [
        "Gained hands-on experience in deploying and managing servers on AWS EC2",
        "Worked on automating log export and backup using CloudWatch, S3, Python, and Bash scripts",
        "Learned about server monitoring, data redundancy, and disaster recovery processes"
      ]
    }
  ],
  projects: [
    {
      name: "Server Log Export to Mumbai Region",
      tools: ["AWS EC2", "CloudWatch", "S3", "Python", "Bash Script"],
      description: "Designed and deployed a scalable server on AWS EC2 for real-time log collection and automated export to the Mumbai region, ensuring disaster recovery and data resilience.",
      achievements: [
        "Configured AWS CloudWatch and S3 for centralized logging",
        "Automated log rotation, archival, and backup using Python and Bash scripts",
        "Improved log availability and data redundancy, reduced manual maintenance"
      ],
      status: "Completed"
    },
    {
      name: "College Picker and Recommender",
      tools: ["HTML", "CSS", "JavaScript", "Node.js", "MongoDB"],
      description: "Developed a web application with college filtering and recommendation logic based on students' requirements.",
      achievements: [
        "Implemented college filtering and recommendation logic",
        "Designed responsive front-end interface for seamless user interaction",
        "Integrated MongoDB database for efficient data storage and retrieval"
      ],
      status: "Completed"
    },
    {
      name: "NeuroBridge AI Mental Wellness Platform",
      tools: ["React", "Tailwind CSS", "JavaScript", "Node.js", "MongoDB", "Express"],
      description: "Contributing to a full-stack mental health app with mood tracking, AI chat, and therapist appointment booking.",
      achievements: [
        "Working on frontend with React and Tailwind CSS",
        "Implementing JWT/Google OAuth for secure access",
        "Integrating Groq AI with role-based dashboards for personalized interactions"
      ],
      status: "In Progress"
    }
  ],
  skills: {
    Programming: ["Java", "JavaScript"],
    Web: ["ReactJS", "Tailwind CSS", "Node.js", "Express.js"],
    Databases: ["MySQL", "MongoDB"],
    "Core Subjects": ["DBMS", "OOPs", "Operating Systems", "Data Structures and Algorithms"],
    DevOps: ["AWS"],
    "Soft Skills": ["Leadership", "Analytical Thinking", "Problem-solving"]
  },
  certifications: [
    "Certified Full Stack Web Developer by DevTown Pvt Ltd",
    "Solved 200+ problems on LeetCode",
    "Attended AWS Cloud Computing Workshop"
  ]
};

// Typing Animation Hook
const useTypingAnimation = (texts, typingSpeed = 100, deletingSpeed = 50, pauseDuration = 2000) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[currentIndex];
    let timeout;

    if (!isDeleting && displayText === currentText) {
      timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    } else {
      const speed = isDeleting ? deletingSpeed : typingSpeed;
      timeout = setTimeout(() => {
        setDisplayText(
          isDeleting
            ? currentText.substring(0, displayText.length - 1)
            : currentText.substring(0, displayText.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentIndex, texts, typingSpeed, deletingSpeed, pauseDuration]);

  return displayText;
};

// Intersection Observer Hook
const useIntersectionObserver = (options) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return [ref, isVisible];
};

// Hero Section
const HeroSection = () => {
  const typedText = useTypingAnimation(portfolioData.personalInfo.jobTitles);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center gradient-overlay grid-pattern relative">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Profile Image Placeholder */}
          <div className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-8 rounded-full bg-gradient-to-br from-purple-600 to-emerald-600 p-1 shadow-2xl transform hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-4xl md:text-5xl font-bold text-purple-700">
              {portfolioData.personalInfo.name.split(' ').map(n => n[0]).join('')}
            </div>
          </div>

          {/* Name */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl text-gray-800 mb-4 fade-in-up" style={{ fontWeight: 700 }}>
            {portfolioData.personalInfo.name}
          </h1>

          {/* Typing Animation */}
          <div className="text-2xl md:text-3xl lg:text-4xl text-purple-700 mb-6 h-12 md:h-14 flex items-center justify-center" style={{ fontWeight: 700 }}>
            <span>{typedText}</span>
            <span className="typing-cursor"></span>
          </div>

          {/* Brief Intro */}
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed" style={{ fontWeight: 400 }}>
            Passionate about building scalable web applications and cloud solutions. 
            Dedicated to solving complex problems with elegant code.
          </p>

          {/* Social Icons */}
          <div className="flex justify-center gap-6 mb-10">
            <a
              href={`mailto:${portfolioData.personalInfo.email}`}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-md hover:shadow-xl hover:scale-110 transition-all duration-300 text-gray-700 hover:text-purple-700"
              aria-label="Email"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/aastha-jaiswal01/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-md hover:shadow-xl hover:scale-110 transition-all duration-300 text-gray-700 hover:text-purple-700"
              aria-label="LinkedIn"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a
              href="https://github.com/Aasthajaisw"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-md hover:shadow-xl hover:scale-110 transition-all duration-300 text-gray-700 hover:text-purple-700"
              aria-label="GitHub"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection('projects')}
              className="px-6 py-2 bg-transparent text-gray-800 font-normal rounded-none border-b-2 border-transparent hover:border-gray-800 transition-all duration-300"
              style={{ fontWeight: 400 }}
            >
              View My Work
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-6 py-2 bg-transparent text-gray-800 font-normal rounded-none border-b-2 border-transparent hover:border-gray-800 transition-all duration-300"
              style={{ fontWeight: 400 }}
            >
              Get In Touch
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// About Section
const AboutSection = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section id="about" ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl text-gray-800 mb-12 text-center" style={{ fontWeight: 700 }}>
            About <span className="text-purple-700">Me</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Image Placeholder */}
            <div className="order-2 md:order-1">
              <div className="w-full h-80 rounded-2xl bg-gradient-to-br from-purple-400 via-emerald-400 to-purple-600 shadow-2xl transform hover:scale-105 transition-transform duration-300"></div>
            </div>
            
            {/* Content */}
            <div className="order-1 md:order-2">
              <p className="text-lg text-gray-700 mb-6 leading-relaxed" style={{ fontWeight: 400 }}>
                Hi! I'm <span className="text-purple-700" style={{ fontWeight: 700 }}>{portfolioData.personalInfo.name}</span>, 
                a passionate Full Stack Developer and Cloud Enthusiast from {portfolioData.personalInfo.location}. 
                I specialize in building modern web applications using React, Node.js, and cloud technologies.
              </p>
              
              <p className="text-lg text-gray-700 mb-6 leading-relaxed" style={{ fontWeight: 400 }}>
                Currently pursuing B.Tech in Computer Science at GLA University with a CGPA of 8.02. 
                I love solving complex problems and have solved over 200+ problems on LeetCode, 
                demonstrating my strong foundation in Data Structures and Algorithms.
              </p>

              {/* Key Highlights */}
              <div className="space-y-4">
                <h3 className="text-xl text-gray-800 mb-4" style={{ fontWeight: 700 }}>Certifications &amp; Achievements</h3>
                {portfolioData.certifications.map((cert, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Education Section
const EducationSection = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section id="education" ref={ref} className="py-20 gradient-overlay">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl text-gray-800 mb-12 text-center" style={{ fontWeight: 700 }}>
            <span className="text-purple-700">Education</span>
          </h2>
          
          <div className="max-w-4xl mx-auto space-y-8">
            {portfolioData.education.map((edu, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl text-gray-800 mb-2" style={{ fontWeight: 700 }}>
                      {edu.qualification}
                    </h3>
                    <p className="text-lg text-purple-700" style={{ fontWeight: 400 }}>{edu.institution}</p>
                  </div>
                  <div className="flex flex-col items-start md:items-end gap-2">
                    <span className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm" style={{ fontWeight: 400 }}>
                      {edu.grade}
                    </span>
                    <span className="text-gray-600" style={{ fontWeight: 400 }}>{edu.date}</span>
                  </div>
                </div>
                {edu.status && (
                  <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm" style={{ fontWeight: 400 }}>
                    {edu.status}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Experience Section
const ExperienceSection = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2 });
  const [expandedIndex, setExpandedIndex] = useState(0);

  return (
    <section id="experience" ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl text-gray-800 mb-12 text-center" style={{ fontWeight: 700 }}>
            <span className="text-purple-700">Experience</span>
          </h2>
          
          <div className="max-w-5xl mx-auto space-y-6">
            {portfolioData.experience.map((exp, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-purple-50 to-emerald-50 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <div
                  className="p-8 cursor-pointer"
                  onClick={() => setExpandedIndex(expandedIndex === index ? -1 : index)}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-2xl text-gray-800 mb-2" style={{ fontWeight: 700 }}>
                        {exp.position}
                      </h3>
                      <p className="text-lg text-purple-700" style={{ fontWeight: 400 }}>{exp.company}</p>
                    </div>
                    <span className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 shadow-md" style={{ fontWeight: 400 }}>
                      {exp.date}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {exp.tools.map((tool, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-white text-purple-700 rounded-full text-sm shadow-sm" style={{ fontWeight: 400 }}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  <div
                    className={`transition-all duration-500 overflow-hidden ${
                      expandedIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="mt-4 pt-4 border-t border-purple-200">
                      <h4 className="text-gray-800 mb-3" style={{ fontWeight: 700 }}>Key Responsibilities:</h4>
                      <ul className="space-y-2">
                        {exp.responsibilities.map((resp, i) => (
                          <li key={i} className="flex items-start gap-2 text-gray-700">
                            <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <button className="mt-4 text-gray-800 bg-transparent border-b border-transparent hover:border-gray-800 transition-all duration-300" style={{ fontWeight: 400, paddingBottom: '2px' }}>
                    {expandedIndex === index ? 'Show Less' : 'Show More'}
                    <svg
                      className={`w-5 h-5 transition-transform duration-300 ${expandedIndex === index ? 'rotate-180' : ''}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Skills Section
const SkillsSection = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2 });

  const categoryColors = {
    'Programming': 'from-purple-500 to-purple-700',
    'Web': 'from-emerald-500 to-emerald-700',
    'Databases': 'from-blue-500 to-blue-700',
    'Core Subjects': 'from-indigo-500 to-indigo-700',
    'DevOps': 'from-orange-500 to-orange-700',
    'Soft Skills': 'from-pink-500 to-pink-700'
  };

  const categoryBgColors = {
    'Programming': 'bg-purple-50',
    'Web': 'bg-emerald-50',
    'Databases': 'bg-blue-50',
    'Core Subjects': 'bg-indigo-50',
    'DevOps': 'bg-orange-50',
    'Soft Skills': 'bg-pink-50'
  };

  return (
    <section id="skills" ref={ref} className="py-20 gradient-overlay">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl text-gray-800 mb-12 text-center" style={{ fontWeight: 700 }}>
            <span className="text-purple-700">Skills</span> &amp; <span className="text-emerald-700">Technologies</span>
          </h2>
          
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(portfolioData.skills).map(([category, skills], index) => (
              <div
                key={category}
                className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`inline-block px-4 py-2 rounded-lg bg-gradient-to-r ${categoryColors[category]} text-white mb-4 shadow-md`} style={{ fontWeight: 700 }}>
                  {category}
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, i) => (
                    <span
                      key={i}
                      className={`px-4 py-2 ${categoryBgColors[category]} rounded-full text-sm text-gray-800 hover:scale-110 hover:shadow-md transition-all duration-300 cursor-default`} style={{ fontWeight: 400 }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Projects Section
const ProjectsSection = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  const getStatusColor = (status) => {
    return status === 'In Progress'
      ? 'bg-orange-100 text-orange-700 border-orange-300'
      : 'bg-emerald-100 text-emerald-700 border-emerald-300';
  };

  return (
    <section id="projects" ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl text-gray-800 mb-4 text-center" style={{ fontWeight: 700 }}>
            Featured <span className="text-purple-700">Projects</span>
          </h2>
          <p className="text-lg text-gray-600 mb-12 text-center max-w-2xl mx-auto" style={{ fontWeight: 400 }}>
            Showcasing my hands-on experience in full-stack development and cloud computing
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {portfolioData.projects.map((project, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br from-gray-50 to-purple-50 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 overflow-hidden ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl text-gray-800 leading-tight" style={{ fontWeight: 700 }}>
                      {project.name}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(project.status)}`} style={{ fontWeight: 400 }}>
                      {project.status}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="mb-4">
                    <h4 className="text-sm text-gray-800 mb-2" style={{ fontWeight: 700 }}>Technologies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tools.map((tool, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-white text-purple-700 rounded-full text-xs shadow-sm" style={{ fontWeight: 400 }}
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm text-gray-800 mb-2" style={{ fontWeight: 700 }}>Key Achievements:</h4>
                    <ul className="space-y-1">
                      {project.achievements.slice(0, 2).map((achievement, i) => (
                        <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                          <svg className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <button className="w-full mt-4 px-4 py-2 bg-transparent text-gray-800 rounded-none border-b border-transparent hover:border-gray-800 transition-all duration-300" style={{ fontWeight: 400 }}>
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2 });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      alert(`Thank you, ${formData.name}! Your message has been received. I'll get back to you soon.`);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 3000);
    }, 1500);
  };

  return (
    <section id="contact" ref={ref} className="py-20 gradient-overlay">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl text-gray-800 mb-4 text-center" style={{ fontWeight: 700 }}>
            Get In <span className="text-purple-700">Touch</span>
          </h2>
          <p className="text-lg text-gray-600 mb-12 text-center max-w-2xl mx-auto" style={{ fontWeight: 400 }}>
            I'm always open to discussing new projects, opportunities, or partnerships.
          </p>
          
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-purple-700" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-gray-800 mb-1" style={{ fontWeight: 700 }}>Email</h3>
                    <a href={`mailto:${portfolioData.personalInfo.email}`} className="text-purple-700 hover:text-purple-900 transition-colors">
                      {portfolioData.personalInfo.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-emerald-700" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-gray-800 mb-1" style={{ fontWeight: 700 }}>Phone</h3>
                    <a href={`tel:${portfolioData.personalInfo.phone}`} className="text-emerald-700 hover:text-emerald-900 transition-colors">
                      {portfolioData.personalInfo.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-700" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-gray-800 mb-1" style={{ fontWeight: 700 }}>Location</h3>
                    <p className="text-gray-700">{portfolioData.personalInfo.location}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-600 to-emerald-600 rounded-xl shadow-lg p-6 text-white">
                <h3 className="mb-4 text-lg" style={{ fontWeight: 700 }}>Connect on Social Media</h3>
                <div className="flex gap-4">
                  <a
                    href="https://www.linkedin.com/in/aastha-jaiswal01/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center hover:bg-opacity-30 transition-all duration-300 hover:scale-110"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  <a
                    href="https://github.com/Aasthajaisw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center hover:bg-opacity-30 transition-all duration-300 hover:scale-110"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm text-gray-800 mb-2" style={{ fontWeight: 700 }}>
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors duration-300"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm text-gray-800 mb-2" style={{ fontWeight: 700 }}>
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm text-gray-800 mb-2" style={{ fontWeight: 700 }}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors duration-300 resize-none"
                    placeholder="Your message..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || submitted}
                  className={`w-full py-3 rounded-none bg-transparent text-gray-800 border-b-2 transition-all duration-300 ${
                    submitted
                      ? 'border-emerald-600 text-emerald-600'
                      : 'border-gray-800 hover:border-gray-600'
                  } disabled:opacity-70 disabled:cursor-not-allowed`}
                  style={{ fontWeight: 400 }}
                >
                  {isSubmitting ? 'Sending...' : submitted ? '✓ Message Sent!' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl mb-4 bg-gradient-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent" style={{ fontWeight: 700 }}>
              {portfolioData.personalInfo.name}
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Full Stack Developer passionate about creating elegant solutions to complex problems.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4" style={{ fontWeight: 700 }}>Quick Links</h4>
            <ul className="space-y-2">
              {['about', 'education', 'experience', 'skills', 'projects', 'contact'].map((section) => (
                <li key={section}>
                  <button
                    onClick={() => scrollToSection(section)}
                    className="text-gray-400 hover:text-purple-400 transition-colors capitalize"
                  >
                    {section}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4" style={{ fontWeight: 700 }}>Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href={`mailto:${portfolioData.personalInfo.email}`} className="hover:text-purple-400 transition-colors">
                  {portfolioData.personalInfo.email}
                </a>
              </li>
              <li>
                <a href={`tel:${portfolioData.personalInfo.phone}`} className="hover:text-purple-400 transition-colors">
                  {portfolioData.personalInfo.phone}
                </a>
              </li>
              <li>{portfolioData.personalInfo.location}</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} {portfolioData.personalInfo.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Back to Top Button
const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 w-12 h-12 bg-transparent border-2 border-gray-800 text-gray-800 rounded-full hover:bg-gray-800 hover:text-white transition-all duration-300 z-50 flex items-center justify-center ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
      aria-label="Back to top"
    >
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
      </svg>
    </button>
  );
};

// Main App Component
const App = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <EducationSection />
      <ExperienceSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
      <BackToTopButton />
    </div>
  );
};

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
