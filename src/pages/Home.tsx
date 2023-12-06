import { useLayoutEffect, useState } from 'react';
import { keyframes, styled } from 'styled-components';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Search from '../Components/Search';
import backgrounds from '../assets/backgroundsData/backgrounds';

const Home = () => {
  const [background, setBackground] = useState<string>(backgrounds[0]);

  const animate = keyframes`
  0%  {
    opacity: 0
  }
  20%  {
    opacity: 1
  }
  50% {
    opacity: 1
  }
  80% {
    opacity: 1
  }
  100% {
    opacity: 0
  }

  `;

  const Wrapper = styled.div`
    animation: ${animate} 10s ease-in-out infinite;
  `;

  const changeBackground = () => {
    let counter = 1;
    setInterval(() => {
      if (backgrounds.length === counter) {
        counter = 1;
        setBackground(backgrounds[0]);
      } else {
        setBackground(backgrounds[counter]);
        counter++;
      }
    }, 10000);
  };

  useLayoutEffect(() => {
    changeBackground();
  }, []);

  return (
    <Wrapper
      style={{
        // animation: `${animate} 10s ease-in-out infinite`,
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${background})`,
      }}
      className='home'>
      <Header />
      <Search />
      <Footer />
    </Wrapper>
  );
};

export default Home;
