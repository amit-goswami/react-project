import React from "react";
import { Styles, Theme } from "../../Utils/Constants";
import { Star } from "@mui/icons-material";
import Twitter from "@mui/icons-material/Twitter";

interface Testimonial {
  image: string;
  name: string;
  message: string;
  date: string;
  starRating: number;
  handle: string;
}

const testimonials: Testimonial[] = [
  {
    image: "images/landing-banner.png",
    name: "John Doe",
    date: "26th May 2024",
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    starRating: 5,
    handle: "@johndoe",
  },
  {
    image: "images/landing-banner.png",
    name: "John Doe",
    date: "26th May 2024",
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    starRating: 4,
    handle: "@johndoe",
  },
  {
    image: "images/landing-banner.png",
    name: "John Doe",
    date: "26th May 2024",
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    starRating: 5,
    handle: "@johndoe",
  },
  {
    image: "images/landing-banner.png",
    name: "John Doe",
    date: "26th May 2024",
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    starRating: 5,
    handle: "@johndoe",
  },
  {
    image: "images/landing-banner.png",
    name: "John Doe",
    date: "26th May 2024",
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    starRating: 5,
    handle: "@johndoe",
  },
  {
    image: "images/landing-banner.png",
    name: "John Doe",
    date: "26th May 2024",
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    starRating: 5,
    handle: "@johndoe",
  },
];

const UserTestimonials: React.FC = () => {
  const pageTitle = () => {
    return (
      <div>
        <p style={{ ...Styles.h1Text, ...styles.titles }}>
          Individual traders in india
        </p>
        <p style={{ ...Styles.h4Text, ...styles.titles }}>
          Real Reviews, Real Results
        </p>
        <div style={Styles.bottomBorderLine}></div>
      </div>
    );
  };

  const testimonialList = () => {
    return (
      <div style={styles.testContainer}>
        {testimonials.map((testimonial, index) => (
          <div key={index} style={styles.testBox}>
            <div style={styles.namePlate}>
              <img
                src={testimonial.image}
                alt="testimonial"
                style={styles.image}
              />
              <div style={styles.nameTags}>
                <p style={styles.names}>{testimonial.name}</p>
                <p style={styles.dates}>{testimonial.date}</p>
              </div>
            </div>
            <p style={styles.message}>{testimonial.message}</p>
            <div
              style={{ ...styles.namePlate, justifyContent: "space-between" }}
            >
              <div>
                {[...Array(testimonial.starRating)].map((star, index) => (
                  <Star key={index} style={styles.star} />
                ))}
              </div>
              <p style={styles.handle}>
                <Twitter style={{ width: 12, height: 12, marginRight: 8 }} />
                {testimonial.handle}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={styles.mainBox}>
      {pageTitle()}
      {testimonialList()}
    </div>
  );
};

const styles = {
  handle: {
    fontSize: Theme.fontSizes.h6,
    margin: 0,
  },
  star: {
    color: Theme.colors.orange,
    height: 12,
    width: 12,
  },
  message: {
    fontSize: Theme.fontSizes.h6,
  },
  names: {
    fontSize: Theme.fontSizes.h6,
    fontWeight: Theme.fontWeight.semiBold,
    margin: 0,
  },
  dates: {
    fontSize: Theme.fontSizes.h6,
    margin: 0,
  },
  nameTags: {
    marginLeft: 16,
  },
  namePlate: {
    display: "flex" as const,
    alignItems: "center" as const,
  },
  testContainer: {
    display: "flex" as const,
    flexWrap: "wrap" as const,
    justifyContent: "space-between" as const,
  },
  image: {
    width: 36,
    height: "auto",
    borderRadius: 50,
  },
  testBox: {
    width: "20%",
    minWidth: 120,
    backgroundColor: Theme.colors.white,
    padding: 16,
    marginTop: 16,
    borderRadius: Theme.borderRadius,
  },
  mainBox: {
    padding: 50,
  },
  titles: {
    textAlign: "center" as const,
  },
};

export default UserTestimonials;
