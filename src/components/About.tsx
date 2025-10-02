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
                Founded with a vision to help businesses streamline their operations and focus on what they do best, <span className="text-gradient font-semibold">Assorted Coworking</span> has grown from a small team of dedicated professionals to a comprehensive BPO service provider.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                Our journey began with a simple understanding: businesses need reliable partners who can handle their non-core processes efficiently, allowing them to concentrate on innovation, growth, and customer satisfaction.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Today, we serve clients across various industries, from startups to enterprise-level organizations, providing them with scalable, cost-effective solutions that drive real business value.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-border">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">15+</div>
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
                <div className="text-3xl font-bold text-primary mb-1">10+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default About;