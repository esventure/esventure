import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Check, ArrowRight, Mail } from "lucide-react";
import Navigation from "@/components/Navigation";
import FadeInOnScroll from "@/components/FadeInOnScroll";
import { motion, useScroll, useTransform } from "framer-motion";
import React from "react";
import estherBW from "@/assets/esther-bw.jpg";
import estherYellow from "@/assets/esther-yellow.jpg";
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
        <motion.div className="container mx-auto px-4 pt-20 pb-20 md:pt-32 md:pb-32" style={{
        y,
        opacity,
        scale
      }}>
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            <motion.div className="space-y-8 text-left" initial={{
            opacity: 0,
            x: -50
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.8,
            delay: 0.2
          }}>
              <h1 className="text-6xl md:text-8xl font-black text-primary-foreground tracking-tight leading-[0.9] font-poppins">
                I help teams move forward — <span className="text-secondary">fast.</span>
              </h1>
              <p className="text-2xl md:text-3xl font-medium text-primary-foreground/90">
                
                
Let's break through roadblocks, speed up projects, and work smarter.                                                                                                  
              
              </p>
              <p className="text-xl md:text-2xl text-primary-foreground/70 font-light italic">
                Are you ready to go on an Es Venture?
              </p>
              <motion.div className="pt-6" initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.6,
              delay: 0.6
            }}>
                <Button size="lg" className="text-lg px-10 py-7 font-bold bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-all rounded-full" onClick={scrollToContact}>
                  Send email
                </Button>
              </motion.div>
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

      {/* Why Es Venture */}
      <section className="bg-background py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12">
              {[{
              text: "Less noise"
            }, {
              text: "More direction"
            }, {
              text: "Things actually get done"
            }].map((item, index) => <motion.div key={index} className="flex flex-col items-center text-center gap-4" initial={{
              opacity: 0,
              y: 30
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true,
              margin: "-100px"
            }} transition={{
              duration: 0.5,
              delay: index * 0.15
            }}>
                  <motion.div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center" whileHover={{
                scale: 1.1,
                rotate: 360
              }} transition={{
                duration: 0.5
              }}>
                    <Check className="w-8 h-8 text-secondary-foreground" strokeWidth={3} />
                  </motion.div>
                  <span className="text-2xl font-bold text-foreground">{item.text}</span>
                </motion.div>)}
            </div>
          </div>
        </div>
      </section>



      {/* Services */}
      <section id="services" className="container mx-auto px-4 pb-24">
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
            <h2 className="text-5xl md:text-7xl font-black text-center mb-8 text-foreground font-poppins">My Services</h2>
            <p className="text-xl md:text-2xl text-center text-foreground/70 mb-20 max-w-3xl mx-auto">
              Short-term, high-impact projects. <span className="text-primary font-bold">Practical, clear and fast</span> — always with a tangible result.
            </p>
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
            y: -8,
            transition: {
              duration: 0.2
            }
          }}>
              <Card className="h-full p-8 border-4 border-primary bg-card shadow-xl hover:shadow-2xl transition-all hover:border-secondary group flex flex-col">
                <div className="flex flex-col items-center text-center mb-6">
                  <motion.div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center flex-shrink-0 mb-4" whileHover={{
                  rotate: 360,
                  scale: 1.1
                }} transition={{
                  duration: 0.5
                }}>
                    <span className="text-3xl font-black text-primary-foreground">01</span>
                  </motion.div>
                  <Badge className="mb-6 bg-primary/10 text-primary border-primary hover:bg-primary/20">Project management</Badge>
                  <h3 className="text-3xl md:text-4xl font-black text-foreground group-hover:text-primary transition-colors font-poppins min-h-[5rem] flex items-end justify-center">Let me fix it</h3>
                </div>
                <p className="text-lg text-foreground/70 mb-8 font-medium text-justify min-h-[8rem]">When a project gets stuck, I take it over and finish it. Slipping deadlines, half-done deliverables, messy ownership, I bring order, clarity, and results. No chaos, just progress.

              </p>
                
                <div className="space-y-8 flex-1 flex flex-col">
                  <div className="min-h-[10rem]">
                    <h4 className="font-bold text-lg mb-4 text-foreground font-poppins">When you need this:</h4>
                    <ul className="space-y-2 text-foreground/70 text-sm">
                      <li>• A deadline is approaching and nothing is moving</li>
                      <li>• A project has been “almost done” for weeks</li>
                      <li>• Tasks keep bouncing around with no progress</li>
                    </ul>
                  </div>

                  <div className="bg-secondary/20 p-6 rounded-2xl border-2 border-secondary mt-auto min-h-[8rem] justify-start flex flex-col">
                    <h4 className="font-bold text-lg mb-3 text-foreground font-poppins">What you get:</h4>
                    <p className="text-foreground text-sm font-medium leading-relaxed">Finally, ownership / A project wrapped up nicely / Progress you can actually see                        



                  </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Service 2: From Idea to Prototype */}
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
            y: -8,
            transition: {
              duration: 0.2
            }
          }}>
              <Card className="h-full p-8 border-4 border-primary bg-card shadow-xl hover:shadow-2xl transition-all hover:border-secondary group flex flex-col">
                <div className="flex flex-col items-center text-center mb-6">
                  <motion.div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center flex-shrink-0 mb-4" whileHover={{
                  rotate: 360,
                  scale: 1.1
                }} transition={{
                  duration: 0.5
                }}>
                    <span className="text-3xl font-black text-primary-foreground">02</span>
                  </motion.div>
                  <Badge className="mb-6 bg-primary/10 text-primary border-primary hover:bg-primary/20">UX/UI Design</Badge>
                  <h3 className="text-3xl md:text-4xl font-black text-foreground group-hover:text-primary transition-colors font-poppins min-h-[5rem] flex items-end justify-center">From Idea to Prototype</h3>
                </div>
                <p className="text-lg text-foreground/70 mb-8 font-medium text-justify min-h-[8rem]">Got an idea but no shape yet? I turn rough thoughts into clean, clickable prototypes you can test, validate, or pitch. Fast, simple, and user-focused.



              </p>
                
                <div className="space-y-8 flex-1 flex flex-col">
                  <div className="min-h-[10rem]">
                    <h4 className="font-bold text-lg mb-4 text-foreground font-poppins">When you need this:</h4>
                    <ul className="space-y-2 text-foreground/70 text-sm">
                      <li>• Your idea only exists in your head</li>
                      <li>• You want to validate your prototype</li>
                      <li>• You’re pitching but you have nothing to show</li>
                    </ul>
                  </div>

                  <div className="bg-secondary/20 p-6 rounded-2xl border-2 border-secondary mt-auto min-h-[8rem] justify-start flex flex-col">
                    <h4 className="font-bold text-lg mb-3 text-foreground font-poppins">What you get:</h4>
                    <p className="text-foreground text-sm font-medium leading-relaxed">A prototype that explains your idea better than words / Insights into what works and what doesn't         

                  </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Service 3: Process, Structure, Overview */}
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
            y: -8,
            transition: {
              duration: 0.2
            }
          }}>
              <Card className="h-full p-8 border-4 border-primary bg-card shadow-xl hover:shadow-2xl transition-all hover:border-secondary group flex flex-col">
                <div className="flex flex-col items-center text-center mb-6">
                  <motion.div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center flex-shrink-0 mb-4" whileHover={{
                  rotate: 360,
                  scale: 1.1
                }} transition={{
                  duration: 0.5
                }}>
                    <span className="text-3xl font-black text-primary-foreground">03</span>
                  </motion.div>
                  <Badge className="mb-6 bg-primary/10 text-primary border-primary hover:bg-primary/20">Process</Badge>
                  <h3 className="text-3xl md:text-4xl font-black text-foreground group-hover:text-primary transition-colors font-poppins min-h-[5rem] flex items-end justify-center">Process Improvement</h3>
                </div>
                <p className="text-lg text-foreground/70 mb-8 font-medium text-justify min-h-[8rem]">I dive into your day-to-day operations, spot what's slowing you down, and redesign your workflows so things work smoothly again. And you can focus on what you do best: running your company.</p>
                
                <div className="space-y-8 flex-1 flex flex-col">
                  <div className="min-h-[10rem]">
                    <h4 className="font-bold text-lg mb-4 text-foreground font-poppins">When you need this:</h4>
                    <ul className="space-y-2 text-foreground/70 text-sm">
                      <li>• Things run… but not smoothly</li>
                      <li>• Your team keeps asking the same questions</li>
                      <li>• Processes live “in someone’s head” instead of a system</li>
                    </ul>
                  </div>

                  <div className="bg-secondary/20 p-6 rounded-2xl border-2 border-secondary mt-auto min-h-[8rem] flex flex-col justify-start">
                    <h4 className="font-bold text-lg mb-3 text-foreground font-poppins">What you get:</h4>
                    <p className="text-foreground text-sm font-medium leading-relaxed">A cleaner, smoother way of working / Processes that reduce friction, not add to it / Clear workflows that everyone understands

                  </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-background py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.h2 className="text-5xl md:text-6xl font-black text-center mb-20 text-foreground font-poppins" initial={{
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
              How It Works
            </motion.h2>

            <div className="space-y-16 relative">
              {/* Vertical line */}
              <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-primary/20 hidden md:block" />

              {[{
              week: "Week 0",
              title: "First Contact",
              description: "A short call to understand what's stuck or unclear.\nYou explain the situation; I start mapping the real problem immediately."
            }, {
              week: "Week 1",
              title: "Kickoff & Discovery",
              description: "I get access to the right tools, documents and people.\nI untangle the situation, identify gaps and clarify what's really going on.\nOutput: a brief diagnosis + an early direction."
            }, {
              week: "Week 2",
              title: "Structure & Direction",
              description: "I turn chaos into clarity.\nThis includes process mapping, UX flows, priorities and identifying missing pieces.\nOutput: a clear overview, draft structure and prioritised next steps."
            }, {
              week: "Week 3",
              title: "Action Plan",
              description: "I finalise the structure and translate everything into a concrete, actionable plan.\nThis includes templates, flows, dashboards, responsibilities and next steps.\nWalkthrough + handover included.\nOutput: a complete action plan your team (or I) can execute."
            }, {
              week: "Optional Week 4",
              title: "Support",
              description: "If you want help implementing the plan or driving the first steps, I'm there."
            }].map((step, index) => <motion.div key={index} className="relative flex gap-8 items-start" initial={{
              opacity: 0,
              x: -30
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.5,
              delay: index * 0.1
            }}>
                  {/* Circle marker */}
                  <div className="flex-shrink-0">
                    <motion.div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center relative z-10" whileHover={{
                  scale: 1.1
                }} transition={{
                  duration: 0.3
                }}>
                      <span className="text-primary-foreground font-black text-lg">{index + 1}</span>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-2">
                    <Badge className="mb-3 bg-secondary/20 text-foreground border-secondary font-bold">
                      {step.week}
                    </Badge>
                    <h3 className="text-2xl md:text-3xl font-black text-foreground mb-4 font-poppins">
                      {step.title}
                    </h3>
                    <div className="text-foreground/70 text-lg leading-relaxed space-y-2">
                      {step.description.split('\n').map((line, i) => <p key={i}>{line}</p>)}
                    </div>
                  </div>
                </motion.div>)}
            </div>
          </div>
        </div>
      </section>

      {/* Mini Cases */}
      <section id="projects" className="bg-muted py-24">
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
                description: "Took a rough idea and turned it into a full UX flow + clickable prototype so the founder could finally show something real."
              }, {
                title: "Tourism company",
                subtitle: "Project management setup",
                description: "Set up a simple project management system from scratch, cleaned up how the team works and made sure everyone actually knew what to do."
              }, {
                title: "Photostudio",
                subtitle: "Website launch",
                description: "Designed and launched a clear, easy-to-navigate website so clients could find them (and book them) without confusion."
              }, {
                title: "E-bike brand",
                subtitle: "Webshop launch",
                description: "Helped set up and launch the online merchandising shop, organised the workflows and made sure everything worked as it should."
              }, {
                title: "Internal teams",
                subtitle: "Customer success agent",
                description: "Built an internal AI assistant to answer repetitive questions so the team could stop putting out fires and focus on real work."
              }, {
                title: "NGO",
                subtitle: "User journey mapping across systems",
                description: "Mapped the full user journey across several applications — finally giving everyone a clear picture of how things actually flow."
              }, {
                title: "NGO",
                subtitle: "UAT & E2E testing",
                description: "Coordinated UAT and E2E testing for a new platform, aligned teams and brought much-needed structure to the process."
              }, {
                title: "E-bike brand",
                subtitle: "Interim PO for subscription launch",
                description: "Stepped in as interim PO to keep the subscription service moving. Cleaned up scope, prioritised what mattered and pushed things forward."
              }, {
                title: "E-bike brand",
                subtitle: "ERP improvements",
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
                      <Card className="p-8 bg-background border-4 border-primary/30 shadow-lg hover:shadow-xl transition-all hover:border-secondary rounded-2xl h-full">
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
      <section id="about" className="container mx-auto px-4 py-24">
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
              }}>
                  Hi, I'm Esther — product/implementation nerd, UX lover and structure enthusiast.
                </motion.p>
                <motion.p initial={{
                opacity: 0
              }} whileInView={{
                opacity: 1
              }} viewport={{
                once: true
              }} transition={{
                delay: 0.3
              }}>
                  I keep things simple. I move fast. And I make sure projects actually get finished.
                </motion.p>
                <motion.p initial={{
                opacity: 0
              }} whileInView={{
                opacity: 1
              }} viewport={{
                once: true
              }} transition={{
                delay: 0.4
              }}>
                  Teams bring me in when they're stuck, overwhelmed or unsure where to start.
                </motion.p>
                <motion.p className="font-bold" initial={{
                opacity: 0
              }} whileInView={{
                opacity: 1
              }} viewport={{
                once: true
              }} transition={{
                delay: 0.5
              }}>
                  I'm practical, direct and no-nonsense — no 70-page documents, just solutions that work.
                </motion.p>
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
      <section id="contact" className="bg-primary py-24">
        <div className="container mx-auto px-4">
          <motion.div className="max-w-4xl mx-auto text-center space-y-10" initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.8
        }}>
            <h2 className="text-5xl md:text-7xl font-black text-primary-foreground font-poppins">Ready to go on an Es Venture?</h2>
            <motion.div className="flex flex-col sm:flex-row gap-6 justify-center items-center" initial={{
            opacity: 0
          }} whileInView={{
            opacity: 1
          }} viewport={{
            once: true
          }} transition={{
            delay: 0.3
          }}>
              <Button size="lg" className="text-xl px-12 py-8 font-bold bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:text-primary transition-all shadow-2xl rounded-full" onClick={() => window.location.href = 'mailto:hello@esventure.com'}>
                Send email
              </Button>
              <Button size="lg" className="text-xl px-12 py-8 font-bold bg-primary/90 text-primary-foreground border-4 border-primary-foreground/50 hover:bg-secondary hover:text-primary hover:border-secondary transition-all rounded-full shadow-2xl" onClick={() => window.open('https://calendly.com/esventure', '_blank')}>
                Book a call
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-background font-medium text-lg">© 2025 Es Venture. All rights reserved.</p>
        </div>
      </footer>
    </div>;
};
export default Index;