import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

type FeatureItem = {
  title: string;
  link: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Campaigns',
    link: '/docs/category/campaigns',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        A campaign is a predefined set of actions designed to achieve a specific goal. These actions
        are executed against contacts.
      </>
    ),
  },
  {
    title: 'Contacts',
    link: '/docs/category/contacts',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Import contacts from search, profile URLs, or CSV files and keep lists organized
        for each campaign.
      </>
    ),
  },
  {
    title: 'Integration',
    link: '/docs/category/integration',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Sonity allows you to integrate with different platforms and tools. This guide 
        teaches you how to accomplish that.
      </>
    ),
  },
  {
    title: 'Account Management',
    link: '/docs/category/managing-your-account',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Besides managing campaigns, knowing how to manage your account(s) can go a long
        way.  This section will guide you through that...      
      </>
    ),
  },
  {
    title: 'Using Sonity',
    link: '/docs/category/using-sonity',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Of course whilst using Sonity you will have many questions or encounter some roadblocks. 
        Questions  may revolve around automation, campaigns,  contacts....
      </>
    ),
  },
];

function Feature({title, Svg, description, link}: FeatureItem) {
  return (
      <div className={clsx('col col--4')}>
      <div className="text--center">
        {/* <Svg className={styles.featureSvg} role="img" /> */}
      </div>
      <div className="padding-horiz--md">
      <Link href={link}><Heading as="h3">{title}</Heading></Link>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
