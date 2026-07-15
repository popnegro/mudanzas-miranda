import React from 'react';
import { Helmet } from 'react-helmet-async';

interface PageLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ title, description, children }) => {
  return (
    <>
      <Helmet>
        <title>{`${title} - Mudanzas Miranda`}</title>
        <meta name="description" content={description} />
      </Helmet>
      {children}
    </>
  );
};

export default PageLayout;