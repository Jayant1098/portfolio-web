import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const StyledScrollIndicator = styled.div`
  position: absolute;
  bottom: 0;
  color:blue;
  left:0;
  right:0;

  #mouse-scroll {
    style: block;
    opacity: 0.4;
  }
  #mouse-scroll {
    margin:  auto;
    width:min-content;
    z-index: 9999;
  }
  #mouse-scroll span{
    display: block;
    width: 5px; 
    height: 5px;
    -ms-transform: rotate(45deg);
      -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
        transform: rotate(45deg);
    border-right: 2px solid #fff; 
    border-bottom: 2px solid #fff;
    margin: 0 0 3px 5px;
  }
  #mouse-scroll .mouse {
    height: 21px;
    width: 14px;
    border-radius: 10px;
    -webkit-transform: none;
    -ms-transform: none;
    transform: none;
    border: 2px solid #ffffff;
    top: 170px;
  }
  #mouse-scroll .down-arrow-1 {
    margin-top: 6px;
  }
  #mouse-scroll .down-arrow-1, #mouse-scroll .down-arrow-2, #mouse-scroll .down-arrow-3 {
    -webkit-animation: mouse-scroll 1s infinite; 
      -moz-animation: mouse-scroll 1s infinite:
  }
  #mouse-croll .down-arrow-1 {
    -webkit-animation-delay: .1s; 
    -moz-animation-delay: .1s;
    -webkit-animation-direction: alternate;
  }
  #mouse-scroll .down-arrow-2 {
    -webkit-animation-delay: .2s; 
    -moz-animation-delay: .2s;
    -webkit-animation-direction: alternate;
  }
  #mouse-scroll .down-arrow-3 {
    -webkit-animation-delay: .3s;
    -moz-animation-dekay: .3s;
    -webkit-animation-direction: alternate;
  }
  #mouse-scroll .mouse-in {
    height: 5px;
    width: 2px;
    display: block; 
    margin: 5px auto;
    background: #ffffff;
    position: relative;
  }
  #mouse-scroll .mouse-in {
  -webkit-animation: animated-mouse 1.2s ease infinite;
    moz-animation: mouse-animated 1.2s ease infinite;
  }

  @-webkit-keyframes animated-mouse {
    0% {
      opacity: 1;
      -webkit-transform: translateY(0);
      -ms-transform: translateY(0);
      transform: translateY(0);
    }
    100% {
      opacity: 0;
      -webkit-transform: translateY(6px);
      -ms-transform: translateY(6px);
      transform: translateY(6px);
    }
  }
  @-webkit-keyframes mouse-scroll {
    0% {
      opacity: 1;
    }
    50% {
      opacity: .5;
    }
    100% {
      opacity: 1;
    } 
  }
  @keyframes mouse-scroll {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>Hi, my name is</h1>;
  const two = <h2 className="big-heading">Jayant Pahuja.</h2>;
  const three = <h3 className="big-heading">I build things for mobile and web.</h3>;
  const four = (
    <>
      <p>
        I’m a full stack software engineer with 5 years of experience specializing in building using
        React, React Native, NextJS, Node, TypeScript.
      </p>
      <p>
        In past I have worked with a wide variety of startups including{' '}
        <a href="https://www.ycombinator.com/companies/fable" target="_blank" rel="noreferrer">
          YC backend company
        </a>{' '}
        as well as an established{' '}
        <a href="https://montserrat-nyc.com" target="_blank" rel="noreferrer">
          fashion brand
        </a>{' '}
        based out in New York. I have also led 3-5 people teams with a focus on architecture and
        development.
      </p>
    </>
  );

  const items = [one, two, three, four];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
          <StyledScrollIndicator>
            <div id="mouse-scroll">
              <div className="mouse">
                <div className="mouse-in"></div>
              </div>
              <div>
                <span className="down-arrow-1"></span>
                <span className="down-arrow-2"></span>
                <span className="down-arrow-3"></span>
              </div>
            </div>
          </StyledScrollIndicator>
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
