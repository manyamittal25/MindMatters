import React from 'react';
import styled from 'styled-components';

const ResourcesSection = styled.section`
  padding: 20px;
`;

const ResourceItem = styled.div`
  margin: 10px 0;
`;

const Resources = () => {
  return (
    <ResourcesSection>
      <h2>Resources</h2>
      <ResourceItem>Article 1: Managing Stress</ResourceItem>
      <ResourceItem>Article 2: Mindfulness Techniques</ResourceItem>
      <ResourceItem>Article 3: Seeking Professional Help</ResourceItem>
    </ResourcesSection>
  );
};

export default Resources;
