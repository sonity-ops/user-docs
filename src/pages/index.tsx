import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';
import React from 'react';

function HomepageHeader(): React.JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header
      className={clsx('hero hero--primary', styles.heroBanner)}
      style={{
        background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url("/images/wild-dogs.jpeg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        // height: "800px"
        paddingBottom: "15%",
        paddingTop: "10%"
      }}>
      <div className="container">
        <Heading as="h1" className="hero__title" style={{
          color: "#fff"
        }}>
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle" style={{
          color: "#fff"
        }}>{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            style={{
              color: '#ebedef',
              background: '#28347e',
              borderColor: 'transparent',
              borderRadius: '2rem',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease',
              animation: 'pulse 1s ease-in-out infinite',
              boxShadow: '0 0 0 0 rgba(40, 52, 126, 0.8), 0 0 24px rgba(40, 52, 126, 0.9)',
              transform: 'scale(1.08)',
            }}
            className="button button--secondary button--lg"
            to="/docs/intro">
            Get Started!
          </Link>
        </div>
      </div>
    </header>
  );
}


export default function Home(): React.JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} Docs`}
      description="Practical guides for building and running LinkedIn automation campaigns with Sonity.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
