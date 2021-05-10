import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown, faGrinBeam } from '@fortawesome/free-regular-svg-icons';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/show/ShowGrid';
import { AboutProcess } from '../components/styled';
import { apiGet } from '../misc/config';
import { useShows } from '../misc/custom-hooks';

const Starred = () => {
  const [starreds] = useShows();

  const [shows, setShows] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (starreds && starreds.length > 0) {
      // execute multiple promis at same time using Promise.all();
      const promises = starreds.map(showId => {
        return apiGet(`/shows/${showId}`);
      });
      setTimeout(() => {
        Promise.all(promises)
          .then(fetchData => {
            return fetchData.map(show => ({ show }));
          })
          .then(results => {
            setShows(results);
            setIsLoading(false);
          })
          .catch(err => {
            setError(err.message);
            setIsLoading(false);
          });
      },500);
    } else {
      setIsLoading(false);
    }
  }, [starreds]);

  return (
    <MainPageLayout>
      {isLoading && (
        <AboutProcess>
          <FontAwesomeIcon className="iconSty" icon={faGrinBeam} />
          <span>Wait shows are still loading...</span>
        </AboutProcess>
      )}
      {error && (
        <AboutProcess>
          <FontAwesomeIcon className="iconSty" icon={faExclamationTriangle} />
          <span>Error occurred : {error}!</span>
        </AboutProcess>
      )}
      {!isLoading && !shows && !error && (
        <AboutProcess>
          <FontAwesomeIcon className="iconSty" icon={faFrown} />
          <span>No shows were added</span>
        </AboutProcess>
      )}
      {!isLoading && !error && shows && <ShowGrid data={shows} />}
    </MainPageLayout>
  );
};

export default Starred;
