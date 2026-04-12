import Image from "next/image";
import Link from "next/link";
import {
  Award,
  BarChart3,
  BadgeCheck,
  CircleDollarSign,
  Clock3,
  Facebook,
  Instagram,
  Leaf,
  Linkedin,
  ShieldCheck,
  Sun,
  Users,
  Wrench,
} from "lucide-react";
import ContactForm from "@/components/ContactForm";
import FAQAccordion from "@/components/FAQAccordion";
import HeroBanner from "@/components/HeroBanner";

import ProjectsCarousel from "@/components/ProjectsCarousel";
import ScrollReveal from "@/components/ScrollReveal";
import SolarCalculator from "@/components/SolarCalculator";
import StatsHighlights from "@/components/StatsHighlights";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import {
  faqsQuery,
  projectsQuery,
  siteSettingsQuery,
  testimonialsQuery,
} from "@/lib/queries";
import { sanityClient } from "@/lib/sanity";

export const revalidate = 120;

const whyChooseCards = [
  {
    icon: ShieldCheck,
    title: "Trusted Installation",
    text: "Certified teams and proven engineering standards.",
  },
  {
    icon: CircleDollarSign,
    title: "Cost Savings",
    text: "Reduce utility bills with measurable ROI planning.",
  },
  {
    icon: Leaf,
    title: "Clean Energy",
    text: "Lower carbon footprint through efficient solar adoption.",
  },
  {
    icon: Award,
    title: "Long Warranty",
    text: "Reliable systems backed by strong product warranties.",
  },
  {
    icon: Users,
    title: "Expert Team",
    text: "Dedicated consultants and installers for smooth delivery.",
  },
];

const processSteps = [
  {
    icon: Sun,
    title: "Site Assessment",
    text: "Roof and load analysis to design the right system.",
  },
  {
    icon: BarChart3,
    title: "Custom Proposal",
    text: "Detailed cost-benefit report and installation timeline.",
  },
  {
    icon: Wrench,
    title: "Professional Install",
    text: "Fast commissioning with quality and safety checks.",
  },
  {
    icon: BadgeCheck,
    title: "Support & Monitoring",
    text: "Post-install assistance and performance tracking.",
  },
];

const stats = [
  { target: 1200, suffix: "+", label: "Installations Completed" },
  { target: 95, suffix: " MW+", label: "Solar Capacity Delivered" },
  { target: 30, suffix: "%", label: "Avg. Bill Reduction" },
  { target: 10, suffix: "+", label: "Years of Expertise" },
];

async function getCmsData() {
  try {
    const [projects, faqs, testimonials, siteSettings] = await Promise.all([
      sanityClient.fetch(projectsQuery),
      sanityClient.fetch(faqsQuery),
      sanityClient.fetch(testimonialsQuery),
      sanityClient.fetch(siteSettingsQuery),
    ]);

    return { projects, faqs, testimonials, siteSettings };
  } catch {
    return { projects: [], faqs: [], testimonials: [], siteSettings: null };
  }
}

export default async function Home() {
  const { projects, faqs, testimonials, siteSettings } = await getCmsData();

  const companyName = siteSettings?.companyName || "Grow Energy";
  const whatsappNumber = "918445280220";
  const whatsappMessage =
    siteSettings?.whatsappMessage ||
    "Hello I am interested in solar installation";

  return (
    <>

      <main>
        <HeroBanner />
        <StatsHighlights stats={stats} />

        <ScrollReveal>
          <section id="why-solar" className="section">
            <div className="container grid-2">
              <div className="image-panel">
                <Image
                  src="/solerWithBrand.png"
                  alt="Solar panels installed on rooftop"
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  priority
                />
              </div>
              <div>
                <h2>Why Solar Energy</h2>
                <p>
                  Solar power is a practical investment that improves energy
                  independence and reduces long-term operating costs.
                </p>
                <ul className="icon-list">
                  <li>
                    <Clock3 size={18} /> Long-term savings on monthly
                    electricity bills
                  </li>
                  <li>
                    <Leaf size={18} /> Cleaner energy with reduced environmental
                    impact
                  </li>
                  <li>
                    <ShieldCheck size={18} /> Durable systems with reliable
                    output and low maintenance
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="calculator" className="section light-bg">
            <div className="container">
              <h2>Solar Calculator</h2>
              <p className="section-intro">
                Estimate your yearly savings and ideal system size in seconds.
              </p>
              <SolarCalculator />
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="projects" className="section">
            <div className="container">
              <h2>Our Work</h2>
              <p className="section-intro">
                Real installations delivered for homes, businesses, and
                industries.
              </p>
              <ProjectsCarousel projects={projects} />
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="section light-bg">
            <div className="container">
              <h2>Why Choose {companyName}</h2>
              <div className="cards-grid">
                {whyChooseCards.map(({ icon: Icon, title, text }) => (
                  <article className="card-soft hover-lift" key={title}>
                    <Icon size={24} />
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="section">
            <div className="container">
              <h2>Our Solar Installation Process</h2>
              <div className="cards-grid process-grid">
                {processSteps.map(({ icon: Icon, title, text }) => (
                  <article className="card-soft" key={title}>
                    <Icon size={24} />
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal>

        {testimonials?.length ? (
          <ScrollReveal>
            <section className="section">
              <div className="container">
                <h2>Customer Testimonials</h2>
                <div className="cards-grid">
                  {testimonials.map((item) => (
                    <article key={item._id} className="card-soft">
                      <p>&quot;{item.quote}&quot;</p>
                      <h3>{item.name}</h3>
                      <span>{item.location}</span>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          </ScrollReveal>
        ) : null}

        <section className="section cta-section">
          <div className="container cta-box">
            <h2>Ready to switch to solar?</h2>
            <p>
              Start with a free consultation and a personalized savings report.
            </p>
            <Link href="#contact" className="btn">
              Get Free Consultation
            </Link>
          </div>
        </section>

        <ScrollReveal>
          <section id="faq" className="section">
            <div className="container">
              <h2>Frequently Asked Questions</h2>
              <FAQAccordion faqs={faqs} />
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="contact" className="section light-bg">
            <div className="container">
              <h2>Contact Us</h2>
              <p className="section-intro">
                Tell us about your property and we will get back with a
                practical solar plan.
              </p>
              <ContactForm />
            </div>
          </section>
        </ScrollReveal>
      </main>

      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <Image
              src="/grow-energy-logo-svg.png"
              alt={`${companyName} logo`}
              width={170}
              height={52}
              className="footer-logo"
            />
            <p>
              Professional solar energy solutions for reliable and affordable
              power.
            </p>
            <p>
              {siteSettings?.address ||
                "Address can be managed from Sanity CMS."}
            </p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <li>
                <Link href="#why-solar">Why Solar</Link>
              </li>
              <li>
                <Link href="#projects">Our Work</Link>
              </li>
              <li>
                <Link href="#faq">FAQ</Link>
              </li>
              <li>
                <Link href="#contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <p>{siteSettings?.phone || "+91 00000 00000"}</p>
            <p>{siteSettings?.email || "hello@growenergy.in"}</p>
            <div className="socials" aria-label="Social media links">
              <a href="#" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="#" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>
        <p className="copyright">
          Â© {new Date().getFullYear()} {companyName}. All rights reserved.
        </p>
      </footer>

      <WhatsAppFloat phone={whatsappNumber} message={whatsappMessage} />
    </>
  );
}
