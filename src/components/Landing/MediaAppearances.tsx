import React from 'react';
import { Styles, Theme } from '../../Utils/Constants';

const articles = [
  {
    title: 'Entrepreneur',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    title: 'Entrepreneur',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    title: 'Entrepreneur',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    title: 'Entrepreneur',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    title: 'Entrepreneur',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    title: 'Entrepreneur',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
];

const MediaAppearances: React.FC = () => {
  const pageTitle = () => {
    return (
      <div>
        <p style={{ ...Styles.h1Text, ...styles.titles }}>Media Appearances</p>
        <p style={{ ...Styles.h4Text, ...styles.titles }}>
          Where We Shine in the Media
        </p>
        <div
          style={{
            ...Styles.bottomBorderLine,
            backgroundColor: Theme.colors.yellow,
          }}
        ></div>
      </div>
    );
  };

  const articlesSection = () => {
    return (
      <div style={styles.articleContainer}>
        {articles.map((article, index) => {
          return (
            <div key={index} style={styles.articleBox}>
              <div style={styles.articleImage}>{article.title}</div>
              <p style={{ fontSize: Theme.fontSizes.h2 }}>{article.title}</p>
              <p style={{ fontSize: Theme.fontSizes.h6 }}>{article.content}</p>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div style={styles.mainBox}>
      {pageTitle()}
      {articlesSection()}
    </div>
  );
};

const styles = {
  articleImage: {
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.borderRadius,
    paddingTop: 24,
    fontSize: Theme.fontSizes.h1,
    paddingBottom: 24,
    color: Theme.colors.black,
    textAlign: 'center' as const,
  },
  articleContainer: {
    display: 'flex' as const,
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    justifyContent: 'space-evenly' as const,
  },
  articleBox: {
    borderRadius: Theme.borderRadius,
    border: `1px solid ${Theme.colors.white}`,
    textAlign: 'center' as const,
    maxWidth: '20%',
    padding: 16,
    margin: 10,
  },
  titles: {
    color: Theme.colors.white,
    textAlign: 'center' as const,
  },
  mainBox: {
    backgroundImage: Theme.colors.blueWhiteGradient,
    color: Theme.colors.white,
    padding: '56px 24px',
  },
};

export default MediaAppearances;
