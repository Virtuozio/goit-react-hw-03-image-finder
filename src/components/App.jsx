import axios from 'axios';
import React, { Component } from 'react';

import { ImageGallery } from './ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem';
import { Searchbar } from './Searchbar';
import { Button } from './Button';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
  };
  onSubmit = searchQuery => {
    this.setState({ searchQuery });
  };
  onLoadMore = page => {
    this.setState({ page });
  };

  render() {
    const { searchQuery, page } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.onSubmit} />
        {/* {error && <p>Whoops, something went wrong: {error.message}</p>}
        {isLoading && <p>Loading...</p>}
      {articles.length > 0 && ( */}
        <ImageGallery>
          <ImageGalleryItem searchQuery={searchQuery} currentPage={page} />
        </ImageGallery>
        {searchQuery && <Button onLoadMore={this.onLoadMore} />}
      </div>
    );
  }
}
