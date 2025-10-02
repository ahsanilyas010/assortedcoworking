const About = () => {
  return <section id="about" className="py-20">
      <div className="section-container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About Us</h2>
          </div>

          <div className="bg-card rounded-2xl shadow-xl p-8 md:p-12 border border-border">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                At <span className="text-gradient font-semibold">Assorted Coworking</span>, we believe work is more than just a desk and a chair — it's about community, creativity, and growth. Located in the heart of D-12 Markaz, Islamabad, our space is designed to bring entrepreneurs, freelancers, startups, and professionals together under one roof.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                We offer flexible workspaces, private offices, and meeting rooms equipped with modern amenities to help you stay productive and inspired. Whether you're building your business, working remotely, or collaborating with a team, Assorted Coworking provides the environment you need to thrive.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                More than just a workspace, we host events, networking sessions, and opportunities that connect like-minded individuals and spark new ideas. Our mission is to create a vibrant community where people can work smarter, grow faster, and succeed together.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Join us and discover a coworking experience built around innovation, collaboration, and comfort.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-border">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">80+</div>
                <div className="text-sm text-muted-foreground">Happy Members</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">24/7</div>
                <div className="text-sm text-muted-foreground">Access Hours</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">100%</div>
                <div className="text-sm text-muted-foreground">Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">1+</div>
                <div className="text-sm text-muted-foreground">Year Experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default About;