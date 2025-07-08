import React from "react";

const CoreBrandSection = ({
  currentIndex,
  testimonials,
  prevSlide,
  nextSlide,
  goToSlide,
}) => {
  return (
    <section
      id="core-brand"
      className="section section-cream core-brand-section"
    >
      <div className="section-container-narrow core-brand-container">
        <h2 className="section-title core-brand-title fade-in">
          Forex Derivative Trading Level II
        </h2>

        {/* Flex container for core brand and testimonials */}
        <div className="core-brand-content-wrapper">
          {/* Left Side - Core Brand List */}
          <div className="core-brand-left">
            <ul className="core-brand-list fade-in">
              <p className="core-brand-description fade-in">
                An <span className="text-red-highlight">Advanced Course</span>{" "}
                designed to equip students with comprehensive knowledge and
                hands-on skills in{" "}
                <span className="text-red-highlight">Forex Trading</span> to
                become profitable traders.
              </p>
              <li>
                In-depth curriculum covering market analysis, strategies, and
                risk management.
              </li>
              <li>Hands-on training with real-time market simulations.</li>
              <li>Access to proprietary Forex tools and trading platforms.</li>
              <li>
                Enrollment to Employment program ensuring job placement
                assistance.
              </li>
              <div className="enroll-button-container fade-in">
                <a href="#core-brand" className="intapply-btn">
                  Enroll Now!
                </a>
              </div>
            </ul>
          </div>

          {/* Right Side - Testimonials */}
          <div className="core-brand-right fade-in">
            <div id="core-testimonials" className="testimonials-section">
              <div className="testimonials-container">
                <div className="testimonials-carousel-wrapper">
                  <div className="testimonials-track">
                    <div
                      className="testimonials-slider"
                      style={{
                        transform: `translateX(-${currentIndex * 100}%)`,
                      }}
                    >
                      {testimonials.map((testimonial, index) => (
                        <div key={index} className="testimonial-slide">
                          <div className="testimonial-card">
                            <div className="testimonial-inner">
                              <div className="testimonial-text-container">
                                <div className="testimonial-footer">
                                  <strong className="testimonial-author">
                                    {testimonial.author}
                                  </strong>
                                </div>
                              </div>
                              <div className="testimonial-image-container">
                                <img
                                  src={testimonial.backgroundImage}
                                  alt={testimonial.author}
                                  className="testimonial-image"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ✅ Wrap indicators and arrows together */}
                  <div className="carousel-controls-wrapper">
                    <button
                      className="carousel-button carousel-button-prev"
                      onClick={prevSlide}
                      aria-label="Previous testimonial"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M15 18L9 12L15 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    <div className="carousel-indicators">
                      {testimonials.map((_, index) => (
                        <button
                          key={index}
                          className={`indicator ${
                            index === currentIndex ? "active" : ""
                          }`}
                          onClick={() => goToSlide(index)}
                          aria-label={`Go to testimonial ${index + 1}`}
                        />
                      ))}
                    </div>

                    <button
                      className="carousel-button carousel-button-next"
                      onClick={nextSlide}
                      aria-label="Next testimonial"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M9 18L15 12L9 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreBrandSection;
