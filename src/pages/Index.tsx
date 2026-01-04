import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ShieldCheck, Zap, Bug, CheckCircle } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden scanline">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.08)_0%,transparent_70%)]" />
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-20 w-72 h-72 bg-danger/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-success/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container max-w-5xl px-6 py-12 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-muted-foreground mb-8"
        >
          <Zap className="w-4 h-4 text-primary" />
          <span>Interactive QA Portfolio Experience</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6"
        >
          <span className="text-foreground">Hiring a Developer builds the features.</span>
          <br />
          <span className="text-gradient">Hiring Me ensures they actually work.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12"
        >
          Choose your path. Experience the difference quality assurance makes 
          in real-world applications.
        </motion.p>

        {/* Choice Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto"
        >
          {/* Untested Card */}
          <Link to="/untested" className="group">
            <div className="relative p-8 rounded-2xl glass border border-danger/20 hover:border-danger/50 transition-all duration-300 hover:shadow-danger/20 hover:shadow-2xl h-full">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--danger)/0.1)_0%,transparent_70%)] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-danger/10 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Bug className="w-8 h-8 text-danger" />
                </div>
                
                <div className="flex items-center justify-center gap-2 mb-4">
                  <AlertTriangle className="w-5 h-5 text-danger" />
                  <h2 className="text-2xl font-bold text-danger">The Untested Version</h2>
                </div>
                
                <p className="text-muted-foreground mb-8">
                  Experience the product without QA intervention. 
                  See what happens when bugs slip through to production.
                </p>
                
                <Button variant="dangerOutline" size="xl" className="w-full group-hover:variant-danger">
                  <AlertTriangle className="w-5 h-5" />
                  Launch Untested
                </Button>
              </div>
            </div>
          </Link>

          {/* Tested Card */}
          <Link to="/tested" className="group">
            <div className="relative p-8 rounded-2xl glass border border-success/20 hover:border-success/50 transition-all duration-300 hover:shadow-success/20 hover:shadow-2xl h-full">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--success)/0.1)_0%,transparent_70%)] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-success/10 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <ShieldCheck className="w-8 h-8 text-success" />
                </div>
                
                <div className="flex items-center justify-center gap-2 mb-4">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <h2 className="text-2xl font-bold text-success">QA Verified Version</h2>
                </div>
                
                <p className="text-muted-foreground mb-8">
                  See the stable product after my quality assurance process. 
                  Every feature tested and verified.
                </p>
                
                <Button variant="successOutline" size="xl" className="w-full">
                  <ShieldCheck className="w-5 h-5" />
                  Launch Verified
                </Button>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 flex flex-wrap justify-center gap-8 text-center"
        >
          <div className="px-6">
            <div className="text-3xl font-bold text-foreground">500+</div>
            <div className="text-sm text-muted-foreground">Bugs Caught</div>
          </div>
          <div className="px-6">
            <div className="text-3xl font-bold text-foreground">99.9%</div>
            <div className="text-sm text-muted-foreground">Test Coverage</div>
          </div>
          <div className="px-6">
            <div className="text-3xl font-bold text-foreground">24</div>
            <div className="text-sm text-muted-foreground">Projects Delivered</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
