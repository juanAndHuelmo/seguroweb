import { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const Frame = styled.span`
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #edf2ef;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent);
    transform: translateX(-100%);
    animation: ${shimmer} 1.25s ease-in-out infinite;
    opacity: ${props => (props.$loaded ? 0 : 1)};
    transition: opacity 0.25s ease;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: ${props => props.$fit || 'cover'};
  opacity: ${props => (props.$loaded ? 1 : 0)};
  filter: ${props => (props.$loaded ? 'none' : 'blur(10px)')};
  transform: ${props => (props.$loaded ? 'scale(1)' : 'scale(1.02)')};
  transition: opacity 0.35s ease, filter 0.35s ease, transform 0.35s ease;
`;

export default function SmartImage({ src, alt = '', fit = 'cover', className, ...props }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Frame className={className} $loaded={loaded}>
      <Image
        {...props}
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        $fit={fit}
        $loaded={loaded}
        onLoad={() => setLoaded(true)}
      />
    </Frame>
  );
}
