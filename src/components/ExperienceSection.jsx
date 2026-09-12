import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { DisplayCards } from './ui/display-cards'

function ScrollWord({ word, progress, range }) {
  const opacity = useTransform(progress, range, [0.25, 1])
  const color = useTransform(progress, range, ['#4a4a4a', '#ffffff'])

  return (
    <motion.span 
      style={{ opacity, color }} 
      className="inline-block mr-[0.25em] transition-colors duration-150"
    >
      {word}
    </motion.span>
  )
}

function AnimatedParagraph({ text }) {
  const paragraphRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: paragraphRef,
    offset: ['start 0.9', 'center 0.45'],
  })

  const words = text.split(' ')

  return (
    <p 
      ref={paragraphRef}
      className="text-sm sm:text-base font-light leading-relaxed max-w-3xl flex flex-wrap"
    >
      {words.map((word, i) => {
        const start = i / words.length
        const end = start + 1 / words.length
        return (
          <ScrollWord 
            key={i} 
            word={word} 
            progress={scrollYProgress} 
            range={[start, end]} 
          />
        )
      })}
    </p>
  )
}

function ExperienceRow({ exp, index }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
      className="group relative border-b border-white/10 py-12 sm:py-16 transition-colors duration-500 hover:border-white/30"
    >
      {/* Fine Bottom Accent Line on Hover */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
        
        {/* Left Column: Dates & Company Info */}
        <div className="lg:col-span-4 space-y-3 font-mono">
          <div className="text-xs text-neutral-400 tracking-wider flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white/60 group-hover:bg-white transition-colors" />
            <span>{exp.period}</span>
          </div>

          <div className="space-y-1">
            <h4 className="text-base sm:text-lg font-medium text-white tracking-wide">{exp.company}</h4>
            <div className="flex items-center gap-2 text-xs text-neutral-500">
              <span>{exp.type}</span>
              <span>•</span>
              <span>{exp.location}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Role Title, Description & Skills */}
        <div className="lg:col-span-8 space-y-5">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white font-sans tracking-tight group-hover:text-white transition-colors duration-300 flex items-center gap-3">
              <span>{exp.role}</span>
              <span className="text-lg opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:-translate-y-0.5 transition-all duration-300 text-neutral-400 font-mono">↗</span>
            </h3>
          </div>

          <AnimatedParagraph text={exp.description} />

          {/* Skill List */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 pt-2 text-xs font-mono text-neutral-400">
            <span className="text-neutral-500 uppercase tracking-widest text-[10px]">Skills:</span>
            {exp.skills.map((skill, idx) => (
              <span key={skill} className="flex items-center gap-3">
                <span className="text-neutral-300 group-hover:text-white transition-colors">{skill}</span>
                {idx < exp.skills.length - 1 && <span className="text-neutral-600">•</span>}
              </span>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  )
}

function CertificationCard({ cert, index }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.06 }}
      className="group p-6 sm:p-8 rounded-2xl border border-white/10 bg-white/[0.015] hover:bg-white/[0.035] hover:border-white/25 transition-all duration-300 flex flex-col justify-between space-y-6"
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between font-mono text-xs text-neutral-400">
          <span className="tracking-widest uppercase text-[10px]">CERTIFICATION</span>
          <span className="text-neutral-300 text-[11px] font-mono">{cert.year}</span>
        </div>
        <h4 className="text-lg font-normal text-white leading-snug group-hover:text-white transition-colors duration-300">
          {cert.title}
        </h4>
        <p className="text-xs font-mono text-neutral-400">{cert.issuer}</p>
      </div>

      <a 
        href={cert.credentialUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-white pt-4 border-t border-white/10 uppercase tracking-wider group/link transition-colors"
      >
        <span>Verify Credential</span>
        <span className="group-hover/link:translate-x-1 group-hover/link:-translate-y-0.5 transition-transform duration-200">↗</span>
      </a>
    </motion.div>
  )
}

export default function ExperienceSection() {
  const experiences = [
    {
      id: '01',
      role: 'Senior UI/UX Designer',
      company: 'Saff co',
      period: 'Aug 2026 – Present',
      type: 'Internship',
      location: 'Remote',
      description: 'As the Lead UI/UX Designer, worked on a responsive web-based digital product, focusing on creating a clean, intuitive, and user-friendly experience. Led the design process across user flows, Information Architecture, wireframes, responsive layouts, and high-fidelity UI designs in Figma. Focused on understanding user needs, simplifying complex journeys, and creating clear navigation patterns for a seamless experience. Led the UI/UX design direction while maintaining consistency across typography, spacing, components, and visual elements. Iterated on designs based on feedback and usability considerations, with a strong focus on accessibility, responsive design, visual hierarchy, and interaction patterns.',
      skills: ['Teamwork', 'Team Leadership', 'UI/UX Design', 'Figma', 'Information Architecture', 'User Flows', 'Responsive Design'],
    },
    {
      id: '02',
      role: 'Design Intern',
      company: 'Torkk (BLACKORIGINX)',
      period: 'Jul 2026 – Present',
      type: 'Internship',
      location: 'Remote',
      description: 'Led the UI/UX design direction at Torkk (BlackOriginX Private Limited), taking ownership of the design process across digital product initiatives. Worked on understanding product requirements, defining user flows, developing wireframes, and translating concepts into high-fidelity, responsive interfaces using Figma. Focused on creating intuitive experiences while maintaining consistency across screens and interactions. Collaborated with product, development, and other team members to turn requirements into practical design solutions. Contributed to design systems, prototyping, visual design, and UX improvements.',
      skills: ['Web Design', 'Teamwork', 'UI/UX Design', 'Figma', 'Wireframing', 'Prototyping', 'Design Systems'],
    },
    {
      id: '03',
      role: 'Design Intern',
      company: 'ABIS Foods and Proteins Private Limited',
      period: 'Sep 2025 – Feb 2026',
      type: 'Internship / Hybrid',
      location: 'Remote / Hybrid',
      description: 'Completed a 6-month UI/UX Design Internship at ABIS Exports India Pvt. Ltd. (IB Group), designing intuitive and user-centric digital experiences across multiple projects. Successfully designed five end-to-end e-commerce websites, managing the entire design process from user research and wireframing to high-fidelity interfaces and developer handoff. Contributed to flagship platforms such as Seed to Soul and Lynk Sweets, while establishing consistent design systems, improving user journeys, and creating responsive layouts. Supported graphic design initiatives by creating visual assets and ensuring brand consistency.',
      skills: ['UI/UX', 'Web Design', 'E-Commerce Design', 'User Research', 'Graphic Design'],
    },
    {
      id: '04',
      role: 'UI/UX & Brand Designer',
      company: 'Prorion',
      period: 'Nov 2025 – Dec 2025',
      type: 'Freelance',
      location: 'Remote',
      description: 'Collaborated directly with the founder to translate Prorion’s product vision into a clear visual and digital experience. Developed the "Connect – Collaborate – Create" brand concept and logo direction, while contributing to the website UI, visual hierarchy, and overall user experience. Iterated on the designs through founder feedback to create a more cohesive and engaging product experience.',
      skills: ['UI/UX Designer', 'User Experience Design (UED)', 'Branding', 'Logo Design', 'Visual Hierarchy'],
    },
    {
      id: '05',
      role: 'UI/UX Designer',
      company: 'Freelance',
      period: 'Oct 2025 – Nov 2025',
      type: 'Freelance',
      location: 'Remote',
      description: 'Designed a checklist-based mobile experience focused on intuitive onboarding, smooth task management, and a clean, minimal interface, while developing the complete visual identity including logo, typography, and color system.',
      skills: ['User Interface Design', 'UI & UX', 'Mobile Design', 'Visual Identity', 'Typography'],
    }
  ]

  const certifications = [
    {
      title: 'Google UX Design Professional Certificate',
      issuer: 'Coursera / Google (LinkedIn Verified)',
      year: '2025',
      credentialUrl: 'https://www.linkedin.com/in/humanshu-araspure/details/certifications/'
    },
    {
      title: 'Foundations of User Experience (UX) Design',
      issuer: 'Google (LinkedIn Verified)',
      year: '2025',
      credentialUrl: 'https://www.linkedin.com/in/humanshu-araspure/details/certifications/'
    },
    {
      title: 'Start the UX Design Process: Empathize, Define, and Ideate',
      issuer: 'Google / Coursera',
      year: '2025',
      credentialUrl: 'https://www.linkedin.com/in/humanshu-araspure/details/certifications/'
    },
    {
      title: 'Build Wireframes and Low-Fidelity Prototypes',
      issuer: 'Google / Coursera',
      year: '2025',
      credentialUrl: 'https://www.linkedin.com/in/humanshu-araspure/details/certifications/'
    },
    {
      title: 'Figma Advanced UI/UX & Motion Design Systems',
      issuer: 'Design Academy (LinkedIn Verified)',
      year: '2025',
      credentialUrl: 'https://www.linkedin.com/in/humanshu-araspure/details/certifications/'
    },
    {
      title: 'Conduct UX Research and Test Early Concepts',
      issuer: 'Google / Coursera',
      year: '2025',
      credentialUrl: 'https://www.linkedin.com/in/humanshu-araspure/details/certifications/'
    }
  ]

  return (
    <section id="experience" className="w-full bg-[#050505] text-[#F5F5F5] py-28 px-6 sm:px-12 lg:px-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between pb-10 border-b border-white/10 gap-4"
        >
          <div>
            <div className="flex items-center gap-2.5 font-mono text-[11px] text-neutral-400 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-white/80"></span>
              <span>04 / WORK EXPERIENCE</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-light text-white tracking-tight mt-3 font-sans">
              Work experience
            </h2>
          </div>
          <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
            2025 – PRESENT TIMELINE
          </span>
        </motion.div>

        {/* Timeline List */}
        <div className="divide-y-0">
          {experiences.map((exp, index) => (
            <ExperienceRow key={exp.id} exp={exp} index={index} />
          ))}
        </div>

        {/* Certifications Block */}
        <div className="pt-20 border-t border-white/10 space-y-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div>
              <h3 className="text-2xl font-light text-white font-sans tracking-tight">
                Verified Certifications
              </h3>
              <p className="text-xs font-mono text-neutral-400 mt-1">Credentials in Google UX, Research & Figma Systems</p>
            </div>
            <a 
              href="https://www.linkedin.com/in/humanshu-araspure/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs font-mono tracking-widest uppercase text-neutral-300 hover:text-white transition-colors flex items-center gap-1.5 group self-start sm:self-auto"
            >
              <span>View LinkedIn Profile</span>
              <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
            </a>
          </motion.div>

          <DisplayCards cards={certifications} />
        </div>

      </div>
    </section>
  )
}
