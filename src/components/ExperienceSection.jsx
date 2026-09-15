import { motion } from 'framer-motion'
import Timeline_02 from './ui/timeline-02'
import { DisplayCards } from './ui/display-cards'

export default function ExperienceSection() {
  const experiences = [
    {
      id: '01',
      date: 'Aug 2026 – Present',
      title: 'Senior UI/UX Designer',
      company: 'Saff co',
      type: 'Internship • Remote',
      location: 'Remote',
      summary: 'As Lead UI/UX Designer, worked on a responsive web-based digital product focusing on clean, intuitive, and user-friendly interaction design.',
      highlights: [
        'Led the design process across user flows, Information Architecture, wireframes, responsive layouts, and high-fidelity UI designs in Figma.',
        'Focused on understanding user needs, simplifying complex journeys, and creating clear navigation patterns for seamless user experience.',
        'Maintained design direction and consistency across typography, spacing, components, and visual elements with a strong focus on accessibility (WCAG) and responsive behavior.'
      ],
      skills: ['UI/UX Design', 'Figma', 'Information Architecture', 'User Flows', 'Responsive Design'],
    },
    {
      id: '02',
      date: 'Jul 2026 – Sep 10 2026',
      title: 'Design Intern',
      company: 'Torkk (BLACKORIGINX)',
      type: 'Internship • Remote',
      location: 'Remote',
      summary: 'Led UI/UX design direction at Torkk (BlackOriginX Private Limited), taking ownership of design process across digital product initiatives.',
      highlights: [
        'Worked on understanding product requirements, defining user flows, developing wireframes, and translating concepts into high-fidelity responsive interfaces using Figma.',
        'Created intuitive experiences while maintaining consistency across screens, components, and interactive micro-animations.',
        'Collaborated closely with product, development, and cross-functional teams to contribute to design systems, prototyping, and UX optimizations.'
      ],
      skills: ['UI/UX Design', 'Figma', 'Wireframing', 'Prototyping', 'Design Systems'],
    },
    {
      id: '03',
      date: 'Sep 2025 – Feb 2026',
      title: 'Design Intern',
      company: 'ABIS Foods and Proteins (IB Group)',
      type: 'Internship • Hybrid',
      location: 'Remote / Hybrid',
      summary: '6-month UI/UX Design Internship designing 5 end-to-end e-commerce websites including flagship platforms Seed to Soul and Lynk Sweets.',
      highlights: [
        'Successfully designed 5 end-to-end e-commerce websites, managing full lifecycle from user research to developer handoff.',
        'Contributed to flagship platforms such as Seed to Soul and Lynk Sweets while establishing consistent design systems.',
        'Supported graphic design initiatives by creating high-impact visual assets and ensuring total brand consistency.'
      ],
      skills: ['UI/UX Design', 'E-Commerce Design', 'User Research', 'Seed to Soul', 'Lynk Sweets'],
    },
    {
      id: '04',
      date: 'Nov 2025 – Dec 2025',
      title: 'UI/UX & Brand Designer',
      company: 'Prorion',
      type: 'Freelance • Remote',
      location: 'Remote',
      summary: 'Collaborated directly with the founder to translate Prorion’s product vision into a clear visual and digital experience.',
      highlights: [
        'Developed the "Connect – Collaborate – Create" brand concept and logo direction.',
        'Contributed to website UI, visual hierarchy, user experience design, and design iterations.',
        'Refined designs through iterative founder feedback to build a cohesive, engaging brand touchpoint.'
      ],
      skills: ['UI/UX Design', 'Branding', 'Logo Design', 'Visual Hierarchy'],
    },
    {
      id: '05',
      date: 'Oct 2025 – Nov 2025',
      title: 'UI/UX Designer',
      company: 'Checklist Mobile App',
      type: 'Freelance • Remote',
      location: 'Remote',
      summary: 'Designed a checklist-based mobile experience focused on intuitive onboarding, smooth task management, and minimal UI interface.',
      highlights: [
        'Designed frictionless mobile task onboarding and task management flows.',
        'Created complete visual identity including logo mark, typography system, and color palette.',
        'Delivered high-fidelity mobile prototypes optimized for mobile touch interactions.'
      ],
      skills: ['Mobile UI/UX', 'Visual Identity', 'Typography', 'Prototyping'],
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
    <section id="experience" className="w-full bg-[#050505] text-[#F5F5F5] py-24 px-6 sm:px-12 lg:px-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Interactive Sticky Timeline Component */}
        <Timeline_02 data={experiences} />

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
