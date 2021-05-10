/* eslint-disable no-underscore-dangle */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Cast from '../components/show/Cast';
import Details from '../components/show/Details';
import Seasons from '../components/show/Seasons';
import ShowMainData from '../components/show/ShowMainData';
import { useShowEffect } from '../misc/custom-hooks';
import { InfoBlock, ShowPageWrapper } from './Show.styled';

const InfoDiv = styled.div`
  padding: 10px;
  width: 100%;
  margin-top: 150px;
  text-align: center;
  .ficon {
    font-size: 22px;
    margin-right: 12px;
  }
`;

const Show = () => {
  const { id } = useParams();
  // const [show, setShow] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);

  const { show, isLoading, error } = useShowEffect(id);

  if (isLoading) {
    return (
      <InfoDiv>
        <FontAwesomeIcon className="ficon" icon={faSpinner} />
        <span>Data is being loaded.</span>
      </InfoDiv>
    );
  }
  if (error) {
    return (
      <InfoDiv>
        <FontAwesomeIcon className="ficon" icon={faExclamationTriangle} />
        <span>Error occurred : {error}</span>
      </InfoDiv>
    );
  }
  return (
    <ShowPageWrapper>
      <ShowMainData
        image={show.image}
        name={show.name}
        rating={show.rating}
        summary={show.summary}
        tags={show.genres}
      />

      <InfoBlock>
        <h2>Details</h2>
        <Details
          status={show.status}
          network={show.network}
          premiered={show.premiered}
        />
      </InfoBlock>

      <InfoBlock>
        <h2>Seasons</h2>
        <Seasons seasons={show._embedded.seasons} />
      </InfoBlock>

      <InfoBlock>
        <h2>Cast</h2>
        <Cast cast={show._embedded.cast} />
      </InfoBlock>
    </ShowPageWrapper>
  );
};

export default Show;
