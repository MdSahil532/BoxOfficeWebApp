import React, { useCallback, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSadTear } from '@fortawesome/free-regular-svg-icons';
import ActorGrid from '../components/actor/ActorGrid';
import CustomRadio from '../components/CustomRadio';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/show/ShowGrid';
import { AboutProcess } from '../components/styled';
import { apiGet } from '../misc/config';
import { useLastQuery } from '../misc/custom-hooks';
import {
  RadioInputsWrapper,
  SearchButtonWrapper,
  SearchInput,
} from './Home.styled';

const renderResults = results => {
  if (results && results.length === 0) {
    return (
      <AboutProcess>
        <FontAwesomeIcon style={{ fontSize: '22px' }} icon={faSadTear} />
        <span style={{ marginLeft: '10px' }}>Sorry no results</span>
      </AboutProcess>
    );
  }
  if (results && results.length > 0) {
    return results[0].show ? (
      <ShowGrid data={results} />
    ) : (
      <ActorGrid data={results} />
    );
  }
  return null;
};

const Home = () => {
  const [input, setInput] = useLastQuery();
  const [results, setResults] = useState(null);
  const [searchOption, setSearchOption] = useState('shows');

  const isShowSearch = searchOption === 'shows';

  const onInputChange = useCallback(
    evt => {
      setInput(evt.target.value);
    },
    [setInput]
  );
  const onSearch = () => {
    apiGet(`/search/${searchOption}?q=${input}`).then(rest => {
      setResults(rest);
    });
  };
  const onEnterPress = evt => {
    if (evt.keyCode === 13) {
      onSearch();
    }
  };

  const onRadioChange = useCallback(evt => {
    setSearchOption(evt.target.value);
  }, []);

  return (
    <MainPageLayout>
      <SearchInput
        type="text"
        placeholder="Search for something..."
        onChange={onInputChange}
        onKeyDown={onEnterPress}
        value={input}
      />
      <RadioInputsWrapper>
        <div>
          <CustomRadio
            label="Shows"
            id="search-show"
            checked={isShowSearch}
            onChange={onRadioChange}
            value="shows"
          />
        </div>

        <div>
          <CustomRadio
            label="Actors"
            id="search-actor"
            checked={!isShowSearch}
            onChange={onRadioChange}
            value="people"
          />
        </div>
      </RadioInputsWrapper>

      <SearchButtonWrapper>
        <button type="button" onClick={onSearch}>
          Search
        </button>
      </SearchButtonWrapper>

      {renderResults(results)}
    </MainPageLayout>
  );
};

export default Home;
