/** @jsx jsx */
import React, { useState } from 'react';
import { css, jsx } from '@emotion/core';
import { Form, InputGroup } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import MusicGrid from '../components/MusicGrid';

const HomePage: React.FC = () => {
  const [filterText, setFilterText] = useState<string>();
  const [currentSong, setCurrentSong] = useState<string>();

  const onFilterTextChanged: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void = (event) => {
    setFilterText(event.target.value);
  };

  // Handle mobile quick filter submission
  const onFilterTextKeyPress: (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => void = (event) => {
    if (event.key === 'Enter' && document.activeElement) {
      const activeElement = document.activeElement as HTMLElement;
      activeElement.blur();
    }
  };

  const onSongChange: (song: string) => void = (song) => {
    setCurrentSong(song);
  };

  return (
    <div>
      {currentSong === undefined && (
        <div>
          <img
            css={css`
              display: block;
              margin-left: auto;
              margin-right: auto;
              margin-bottom: 10px;
            `}
            id='header-logo'
            src='assets/pink-bean.png'
            alt='header logo'
          />
        </div>
      )}
      {currentSong !== undefined && (
        <div>
          <ReactPlayer
            css={css`
              display: block;
              margin-left: auto;
              margin-right: auto;
              max-width: 100vw;
            `}
            url={currentSong}
            playing
            loop
            controls
          />
        </div>
      )}
      <Form.Group
        css={css`
          margin: 2vh 14vw;
        `}
        className='filter-text'
      >
        <InputGroup size='lg'>
          <InputGroup.Prepend>
            <InputGroup.Text>
              <i className='fa fa-search'></i>
            </InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            type='text'
            placeholder='Song title or keyword'
            onChange={onFilterTextChanged}
            onKeyPress={onFilterTextKeyPress}
          />
        </InputGroup>
      </Form.Group>
      <MusicGrid query={filterText} onSongChange={onSongChange} />
    </div>
  );
};

export default HomePage;
