import React, { useState } from 'react';
import Video from '../../videos/video.mp4';
import { Button } from '../ButtonElement';
import {
  HomeContainer,
  HomeBg,
  VideoBg,
  HomeContent,
  HomeH1,
  HomeP,
  HomeBtnWrapper,
  ArrowForward,
  ArrowRight,
} from './HomeSectionElements';

const HomeSection = () => {
  const [hover, setHover] = useState(false);

  const onHover = () => {
    setHover(!hover);
  };

  return (
    <>
      <HomeContainer id='home'>
        <HomeBg>
          <VideoBg autoPlay loop muted src={Video} type='video/mp4'></VideoBg>
        </HomeBg>
        <HomeContent>
          <HomeH1>Putni nalozi pojednostavljeni</HomeH1>
          <HomeP>
            Samo u par klikova do podnesenog zahtjeva za vasim putnim nalogom,
            odgovor o odobrenju dobivate u roku 24h osim neradim danima.
          </HomeP>
          <HomeBtnWrapper>
            <Button
              to='createPutniNalog'
              onMouseEnter={onHover}
              onMouseLeave={onHover}
              primary='true'
              dark='false'
            >
              Novi putni nalog {hover ? <ArrowForward /> : <ArrowRight />}
            </Button>
          </HomeBtnWrapper>
        </HomeContent>
      </HomeContainer>
    </>
  );
};

export default HomeSection;
