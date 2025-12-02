import React from 'react';
import { Hero } from '../components/home/Hero';
import { WritingsSection } from '../components/home/WritingsSection';

export const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <WritingsSection />
    </>
  );
};
