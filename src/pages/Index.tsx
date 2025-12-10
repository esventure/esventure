import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Check, ArrowRight, Mail } from "lucide-react";
import Navigation from "@/components/Navigation";
import FadeInOnScroll from "@/components/FadeInOnScroll";
import ProjectPlanner from "@/components/ProjectPlanner";
import { motion, useScroll, useTransform } from "framer-motion";
import React from "react";
import { FixItIconAlt as FixItIcon, PrototypeIconAlt as PrototypeIcon, ImproveIconAlt as ImproveIcon } from "@/components/ServiceIcons";
import estherBW from "@/assets/esther-bw.jpg";
import estherYellow from "@/assets/esther-yellow.jpg";
import estherPhone from "@/assets/esther-phone.jpg";
import Autoplay from "embla-carousel-autoplay";
const Index = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  const {
    scrollYProgress
  } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);
  const [carouselApi, setCarouselApi] = React.useState<any>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [isPastHero, setIsPastHero] = React.useState(false);
  const [isAtPlanner, setIsAtPlanner] = React.useState(false);
  React.useEffect(() => {
    const handleScroll = () => {
      // Hero section is roughly the viewport height
      const heroHeight = window.innerHeight * 0.8;
      setIsPastHero(window.scrollY > heroHeight);

      // Check if at project planner section
      const plannerSection = document.getElementById('project-planner');
      if (plannerSection) {
        const rect = plannerSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.3;
        setIsAtPlanner(isVisible);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  React.useEffect(() => {
    if (!carouselApi) {
      return;
    }
    setCount(carouselApi.scrollSnapList().length);
    setCurrent(carouselApi.selectedScrollSnap());
    carouselApi.on("select", () => {
      setCurrent(carouselApi.selectedScrollSnap());
    });
  }, [carouselApi]);
  return <div className="min-h-screen bg-background">
      <Navigation />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary">
        <motion.div className="container mx-auto px-4 pt-12 pb-12 md:pt-16 md:pb-16" style={{
        y,
        opacity,
        scale
      }}>
          <div className="grid md:grid-cols-2 gap-8 md:gap-10 max-w-7xl mx-auto">
            <motion.div className="flex flex-col justify-start text-left" initial={{
            opacity: 0,
            x: -50
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.8,
            delay: 0.2
          }}>
              <div>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-primary-foreground tracking-tight leading-[0.95] font-poppins">
                  I help teams move forward,<br />
                  <span className="text-secondary">let's go.</span>
                </h1>
                <motion.div className="space-y-3 mt-8 md:mt-10" initial={{
                opacity: 0,
                y: 15
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                duration: 0.6,
                delay: 0.4
              }}>
                  <p className="text-lg md:text-xl text-primary-foreground/90 max-w-xl leading-relaxed font-medium">By diving in fast, I bring clarity, and turn chaos into action.</p>
                  <p className="text-lg md:text-xl text-primary-foreground/70 max-w-xl leading-relaxed">
                    Complex projects → simple steps.<br />
                    Messy processes → smooth workflows.<br />
                    Ideas → clickable prototypes.
                  </p>
                </motion.div>
              </div>
            </motion.div>
            <motion.div className="relative" initial={{
            opacity: 0,
            x: 50
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.8,
            delay: 0.4
          }}>
              <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
                <img src={estherYellow} alt="Esther Woerdman" className="w-full h-full object-cover" />
              </div>
              <motion.div className="absolute -bottom-6 -left-6 w-32 h-32 bg-secondary rounded-full blur-3xl opacity-50" animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.7, 0.5]
            }} transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}></motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Divider */}
      <div className="container mx-auto px-4 py-4"><div className="max-w-4xl mx-auto border-t border-border/30" /></div>
      
      {/* The Es Venture Effect */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="text-center mb-16">
            <h2 className="text-4xl md:text-7xl font-black mb-6 text-foreground font-poppins leading-none tracking-tight">
              The<br />
              Es Venture<br />
              Effect
            </h2>
            <p className="text-xl md:text-2xl text-foreground/70 max-w-2xl mx-auto">I’m your project’s personal caffeine shot.</p>
          </motion.div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12">
            {/* Bubble 1: Faster clarity */}
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} animate={{
            y: [0, -8, 0],
            rotate: [0, 2, 0, -2, 0],
            scale: [1, 1.02, 1]
          }} transition={{
            y: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            },
            rotate: {
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            },
            scale: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            },
            opacity: {
              duration: 0.5
            }
          }} whileHover={{
            scale: 1.03,
            boxShadow: ["0 20px 25px -5px rgba(139, 92, 246, 0.1), 0 0 20px rgba(139, 92, 246, 0.15)", "0 20px 25px -5px rgba(139, 92, 246, 0.2), 0 0 35px rgba(139, 92, 246, 0.25)", "0 20px 25px -5px rgba(139, 92, 246, 0.1), 0 0 20px rgba(139, 92, 246, 0.15)"],
            transition: {
              scale: {
                duration: 0.2
              },
              boxShadow: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }
          }} className="w-[220px] h-[220px] md:w-[280px] md:h-[280px] rounded-full bg-[#F0EAFF] shadow-xl shadow-primary/5 flex flex-col items-center justify-center text-center p-6 md:p-8 cursor-default">
              <span className="text-3xl mb-3">🗣️</span>
              <h3 className="text-lg md:text-xl font-bold text-foreground font-poppins mb-2">
                Simple Communication
              </h3>
              <p className="text-sm text-foreground/70 leading-tight">
                No beating around the bush, just clear updates so everyone’s on the same page.







































              </p>
            </motion.div>

            {/* Bubble 2: Cleaner workflows */}
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} animate={{
            y: [0, -8, 0],
            rotate: [0, -2, 0, 2, 0],
            scale: [1, 1.02, 1]
          }} transition={{
            y: {
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            },
            rotate: {
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3
            },
            scale: {
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.4
            },
            opacity: {
              duration: 0.5,
              delay: 0.15
            }
          }} whileHover={{
            scale: 1.03,
            boxShadow: ["0 20px 25px -5px rgba(250, 204, 21, 0.1), 0 0 20px rgba(250, 204, 21, 0.15)", "0 20px 25px -5px rgba(250, 204, 21, 0.25), 0 0 35px rgba(250, 204, 21, 0.3)", "0 20px 25px -5px rgba(250, 204, 21, 0.1), 0 0 20px rgba(250, 204, 21, 0.15)"],
            transition: {
              scale: {
                duration: 0.2
              },
              boxShadow: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }
          }} className="w-[220px] h-[220px] md:w-[280px] md:h-[280px] rounded-full bg-[#FDF9E4] shadow-xl shadow-secondary/10 flex flex-col items-center justify-center text-center p-6 md:p-8 cursor-default">
              <span className="text-3xl mb-3">👩‍✈️</span>
              <h3 className="text-lg md:text-xl font-bold text-foreground font-poppins mb-2">
                People-Friendly Leadership



              </h3>
              <p className="text-sm text-foreground/70 leading-tight">Being confident yet approachable, I make sure everyone feels they belong in the conversation.





































            </p>
            </motion.div>

            {/* Bubble 3: Projects that finally move */}
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} animate={{
            y: [0, -8, 0],
            rotate: [0, 1.5, 0, -1.5, 0],
            scale: [1, 1.02, 1]
          }} transition={{
            y: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            },
            rotate: {
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.7
            },
            scale: {
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.8
            },
            opacity: {
              duration: 0.5,
              delay: 0.3
            }
          }} whileHover={{
            scale: 1.03,
            boxShadow: ["0 20px 25px -5px rgba(139, 92, 246, 0.1), 0 0 20px rgba(139, 92, 246, 0.15)", "0 20px 25px -5px rgba(139, 92, 246, 0.2), 0 0 35px rgba(139, 92, 246, 0.25)", "0 20px 25px -5px rgba(139, 92, 246, 0.1), 0 0 20px rgba(139, 92, 246, 0.15)"],
            transition: {
              scale: {
                duration: 0.2
              },
              boxShadow: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }
          }} className="w-[220px] h-[220px] md:w-[280px] md:h-[280px] rounded-full bg-[#F0EAFF] shadow-xl shadow-primary/5 flex flex-col items-center justify-center text-center p-6 md:p-8 cursor-default">
              <span className="text-3xl mb-3">📈</span>
              <h3 className="text-lg md:text-xl font-bold text-foreground font-poppins mb-2">Pushing forward</h3>
              <p className="text-sm text-foreground/70 leading-tight">
                Keeping things moving at a comfortable pace, so progress happens smoothly and naturally.















              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto px-4 py-4"><div className="max-w-4xl mx-auto border-t border-border/30" /></div>
      
      {/* Services */}
      <section id="services" className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }}>
            <h2 className="text-5xl md:text-7xl font-black text-center mb-6 text-foreground font-poppins">What I do</h2>
            <p className="text-xl md:text-2xl text-center text-foreground/70 mb-16 max-w-3xl mx-auto">I'm here to help you out. Practical, clear and fast. With tangible results, lots of energy and a bit of fun.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Service 1: Fix It */}
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5,
            delay: 0
          }} whileHover={{
            y: -4,
            transition: {
              duration: 0.2
            }
          }}>
              <Card className="h-full p-8 border border-[#D7C4FF] bg-card shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <FixItIcon size={24} className="text-primary" />
                  </div>
                  <Badge className="mb-3 bg-primary/10 text-primary border-0 text-xs font-medium">Project management</Badge>
                  <h3 className="text-2xl md:text-3xl font-black text-foreground font-poppins">Let's fix it</h3>
                </div>
                <p className="text-base text-foreground/70 mb-6 text-center leading-relaxed flex-1">
                  Whether you're starting a new project, or an ongoing project gets stuck, I step in, take over and make sure it gets done.                                                                      
                </p>
                <div className="bg-[#F6F3C2] p-4 rounded-xl">
                  <p className="text-sm font-semibold text-foreground/90 mb-1">What you get:</p>
                  <p className="text-sm text-foreground/70">Ownership, progress and deliverables that get finished.</p>
                </div>
              </Card>
            </motion.div>

            {/* Service 2: Prototype */}
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5,
            delay: 0.15
          }} whileHover={{
            y: -4,
            transition: {
              duration: 0.2
            }
          }}>
              <Card className="h-full p-8 border border-[#D7C4FF] bg-card shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <PrototypeIcon size={24} className="text-primary" />
                  </div>
                  <Badge className="mb-3 bg-primary/10 text-primary border-0 text-xs font-medium">UX/UI Design</Badge>
                  <h3 className="text-2xl md:text-3xl font-black text-foreground font-poppins">Let's prototype</h3>
                </div>
                <p className="text-base text-foreground/70 mb-6 text-center leading-relaxed flex-1">
                  Got an idea but no shape yet? I turn rough thoughts into clear, clickable UI prototypes you can test, validate or pitch.
                </p>
                <div className="bg-[#F6F3C2] p-4 rounded-xl">
                  <p className="text-sm font-semibold text-foreground/90 mb-1">What you get:</p>
                  <p className="text-sm text-foreground/70">A working prototype that visualises your idea and that people understand.</p>
                </div>
              </Card>
            </motion.div>

            {/* Service 3: Streamline */}
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5,
            delay: 0.3
          }} whileHover={{
            y: -4,
            transition: {
              duration: 0.2
            }
          }}>
              <Card className="h-full p-8 border border-[#D7C4FF] bg-card shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <ImproveIcon size={24} className="text-primary" />
                  </div>
                  <Badge className="mb-3 bg-primary/10 text-primary border-0 text-xs font-medium">Process design</Badge>
                  <h3 className="text-2xl md:text-3xl font-black text-foreground font-poppins">Let's streamline</h3>
                </div>
                <p className="text-base text-foreground/70 mb-6 text-center leading-relaxed flex-1">
                  I clean up messy workflows, clarify who does what, and make your operations work smoothly again.
                </p>
                <div className="bg-[#F6F3C2] p-4 rounded-xl">
                  <p className="text-sm font-semibold text-foreground/90 mb-1">What you get:</p>
                  <p className="text-sm text-foreground/70">Clear processes, less back-and-forth, and a way of working that just… works.</p>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto px-4 py-4"><div className="max-w-4xl mx-auto border-t border-border/30" /></div>

      {/* Project Planner */}
      <ProjectPlanner />

      {/* Mini Cases */}
      <section id="projects" className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <motion.h2 className="text-5xl md:text-6xl font-black text-center mb-16 text-foreground font-poppins" initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6
          }}>
              Recent Projects
            </motion.h2>
            <Carousel opts={{
            align: "start",
            loop: true,
            slidesToScroll: 1
          }} plugins={[Autoplay({
            delay: 4000,
            stopOnInteraction: false,
            stopOnMouseEnter: true
          })]} setApi={setCarouselApi} className="w-full">
              <CarouselContent className="-ml-4">
                {[{
                title: "Startup",
                subtitle: "From idea to prototype",
                category: "UX/UI Design",
                description: "Took a rough idea and turned it into a full UX flow + clickable prototype so the founder could finally show something real."
              }, {
                title: "Tourism company",
                subtitle: "Project management setup",
                category: "Project management",
                description: "Set up a simple project management system from scratch, cleaned up how the team works and made sure everyone actually knew what to do."
              }, {
                title: "Photostudio",
                subtitle: "Website launch",
                category: "UX/UI Design",
                description: "Designed and launched a clear, easy-to-navigate website so clients could find them (and book them) without confusion."
              }, {
                title: "E-bike brand",
                subtitle: "Webshop launch",
                category: "Project management",
                description: "Helped set up and launch the online merchandising shop, organised the workflows and made sure everything worked as it should."
              }, {
                title: "Customer Success Team",
                subtitle: "Customer success agent",
                category: "Process design",
                description: "Built an internal AI assistant to answer repetitive questions so the team could stop putting out fires and focus on real work."
              }, {
                title: "NGO",
                subtitle: "User journey mapping across systems",
                category: "UX/UI Design",
                description: "Mapped the full user journey across several applications, finally giving everyone a clear picture of how things actually flow."
              }, {
                title: "NGO",
                subtitle: "UAT & E2E testing",
                category: "Project management",
                description: "Coordinated UAT and E2E testing for a new platform, aligned teams and brought much-needed structure to the process."
              }, {
                title: "E-bike brand",
                subtitle: "Interim PO for subscription launch",
                category: "Project management",
                description: "Stepped in as interim PO to keep the subscription service moving. Cleaned up scope, prioritised what mattered and pushed things forward."
              }, {
                title: "E-bike brand",
                subtitle: "ERP improvements",
                category: "Process design",
                description: "Found and fixed gaps in the ERP flow so operational processes stopped getting stuck."
              }].map((project, index) => <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <motion.div initial={{
                  opacity: 0,
                  y: 30
                }} whileInView={{
                  opacity: 1,
                  y: 0
                }} viewport={{
                  once: true
                }} transition={{
                  duration: 0.5,
                  delay: index * 0.05
                }} className="h-full">
                      <Card className="p-8 bg-[#F0EAFF] border border-[#D7C4FF] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 rounded-2xl h-full">
                        <Badge className="mb-3 bg-secondary text-secondary-foreground border-0 text-xs font-medium">{project.category}</Badge>
                        <h3 className="font-bold text-2xl mb-3 text-foreground font-poppins">{project.title}</h3>
                        <p className="font-bold text-lg mb-4 text-primary">{project.subtitle}</p>
                        <p className="text-foreground/70 text-base leading-relaxed">{project.description}</p>
                      </Card>
                    </motion.div>
                  </CarouselItem>)}
              </CarouselContent>
              <CarouselPrevious className="bg-primary text-primary-foreground hover:bg-primary/90 border-0 h-12 w-12 -left-4 md:-left-16" />
              <CarouselNext className="bg-primary text-primary-foreground hover:bg-primary/90 border-0 h-12 w-12 -right-4 md:-right-16" />
            </Carousel>
            
            {/* Carousel Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({
              length: count
            }).map((_, index) => <button key={index} onClick={() => carouselApi?.scrollTo(index)} className={`h-3 w-3 rounded-full transition-all ${index === current ? "bg-primary w-8" : "bg-primary/30 hover:bg-primary/50"}`} aria-label={`Go to slide ${index + 1}`} />)}
            </div>
          </div>
        </div>
      </section>

      {/* About Me */}
      <section id="about" className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <motion.h2 className="text-5xl md:text-6xl font-black mb-16 text-center font-poppins" initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }}>
            About Me
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div className="order-2 md:order-1" initial={{
            opacity: 0,
            x: -50
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.8
          }}>
              <div className="text-xl text-foreground leading-relaxed space-y-6">
                <motion.p className="font-medium" initial={{
                opacity: 0
              }} whileInView={{
                opacity: 1
              }} viewport={{
                once: true
              }} transition={{
                delay: 0.2
              }}>Hello, I'm Esther! I'm a mix of a product enthusiast, a UX thinker, and a devoted fan of structure. As a true generalist, I'm here to help!</motion.p>
                <motion.p initial={{
                opacity: 0
              }} whileInView={{
                opacity: 1
              }} viewport={{
                once: true
              }} transition={{
                delay: 0.3
              }}>
                  You can count on me to dive into any subject, grasp it quickly, and create order from chaos.
                </motion.p>
                <motion.p initial={{
                opacity: 0
              }} whileInView={{
                opacity: 1
              }} viewport={{
                once: true
              }} transition={{
                delay: 0.4
              }}>My approach focuses on speed, clarity, and ensuring that projects are executed successfully.</motion.p>
                <motion.p className="font-bold" initial={{
                opacity: 0
              }} whileInView={{
                opacity: 1
              }} viewport={{
                once: true
              }} transition={{
                delay: 0.5
              }}>I prefer straightforward solutions over lengthy reports. I promise you practical strategies that simplify life.</motion.p>
              </div>
            </motion.div>
            <motion.div className="order-1 md:order-2" initial={{
            opacity: 0,
            x: 50
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.8
          }}>
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img alt="Esther Woerdman - Creative Director" className="w-full h-full object-cover" src="/lovable-uploads/9380f87e-f93e-43ff-aa3e-87e905edd2f2.png" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="contact" className="relative overflow-hidden bg-primary min-h-[70vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 bg-cover bg-no-repeat" style={{
        backgroundImage: `url(${estherPhone})`,
        backgroundPosition: 'right 15%'
      }} />
        {/* Gradient Overlay - fades from purple left to transparent right */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/70 to-transparent" />
        
        {/* Animated background elements like hero */}
        <motion.div className="absolute -bottom-20 -right-20 w-64 h-64 bg-secondary rounded-full blur-3xl opacity-30" animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3]
      }} transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }} />
        <motion.div className="absolute top-20 left-20 w-48 h-48 bg-secondary rounded-full blur-3xl opacity-20" animate={{
        scale: [1.2, 1, 1.2],
        opacity: [0.2, 0.4, 0.2]
      }} transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut"
      }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <motion.div className="space-y-8" initial={{
            opacity: 0,
            x: -50
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.8
          }}>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-primary-foreground tracking-tight leading-[0.95] font-poppins">
                Ready for an<br />
                <span className="text-secondary">Es Venture?</span>
              </h2>
              <p className="text-xl md:text-2xl text-primary-foreground/80 max-w-lg">
                Let's talk about your project and see how I can help.
              </p>
              <motion.div className="flex flex-col sm:flex-row gap-4 pt-4" initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.6,
              delay: 0.3
            }}>
                <Button size="lg" className="text-lg px-10 py-7 font-bold bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-all rounded-full" onClick={() => window.location.href = 'mailto:esther@esventure.nl'}>
                  <Mail className="mr-2 h-5 w-5" />
                  Send email
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-10 py-7 font-bold bg-transparent text-primary-foreground border-2 border-primary-foreground/50 hover:bg-primary-foreground/10 hover:border-primary-foreground transition-all rounded-full" onClick={() => window.open('https://calendar.app.google/5GxNAzn7W3FJNMrh8', '_blank')}>
                  Book a call
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-background font-medium text-lg">© 2025 Es Venture. All rights reserved.</p>
        </div>
      </footer>

      {/* Fixed Bottom CTA */}
      <motion.div className="fixed bottom-6 right-6 z-40" initial={{
      scale: 0,
      opacity: 0
    }} animate={{
      scale: isPastHero && !isAtPlanner ? 1 : 0,
      opacity: isPastHero && !isAtPlanner ? 1 : 0
    }} transition={{
      type: "spring",
      stiffness: 300,
      damping: 25,
      mass: 0.8
    }}>
        <Button onClick={() => document.getElementById('project-planner')?.scrollIntoView({
        behavior: 'smooth'
      })} className="rounded-full font-bold py-6 px-6 text-base shadow-lg hover:scale-105 transition-all duration-300 bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-secondary/30">
          Tell me what's up
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </motion.div>
    </div>;
};
export default Index;