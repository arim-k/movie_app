import React, { Component } from 'react';
import './App.css';
import Movie from './Movie';

// 메인 컴포넌트가 전체 정보를 가지고 있고 각기 칠드런에게 전달 해줌, 한 개의 데이터 소스를 가지고 각 컴포넌트별로 출력만 하면 됨, UI구축에 좋음~
// const movieTitles = ['Matrix', 'Full Metal Jacket', 'Oldboy', 'Star Wars'];

// const movieImages = [
//   'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SY1000_CR0,0,665,1000_AL_.jpg',
//   'https://pics.filmaffinity.com/Nacido_para_matar-577943737-large.jpg',
//   'https://upload.wikimedia.org/wikipedia/en/thumb/6/67/Oldboykoreanposter.jpg/220px-Oldboykoreanposter.jpg',
//   'https://imgix.ranker.com/user_node_img/50076/1001511915/original/the-very-first-_star-war_-poster-photo-u1?w=650&q=50&fm=jpg&fit=crop&crop=faces'
// ];

// 정렬하고 싶으니까
// const movies = [
//   {
//     title: 'Matrix',
//     poster:
//       'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SY1000_CR0,0,665,1000_AL_.jpg'
//   },
//   {
//     title: 'Full Metal Jacket',
//     poster:
//       'https://pics.filmaffinity.com/Nacido_para_matar-577943737-large.jpg'
//   },
//   {
//     title: 'Oldboy',
//     poster:
//       'https://upload.wikimedia.org/wikipedia/en/thumb/6/67/Oldboykoreanposter.jpg/220px-Oldboykoreanposter.jpg'
//   },
//   {
//     title: 'Star Wars',
//     poster:
//       'https://imgix.ranker.com/user_node_img/50076/1001511915/original/the-very-first-_star-war_-poster-photo-u1?w=650&q=50&fm=jpg&fit=crop&crop=faces'
//   }
// ];

class App extends Component {
  // component livecycle is Order
  // Render: componentWillMount() -> render() -> componentDidMount()
  // Update: componentWillReceiveProps() -> shouldComponentUpdate() == true -> componentWillUpdate() -> render() -> componentDidUpdate()

  // state: 컴포넌트 안에 있는 오브젝트, state가 바뀔 때마다, 렌더 발생
  // state = {
  //   greeting: 'Hello!',
  //   movies: [
  //     {
  //       title: 'Matrix',
  //       poster:
  //         'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SY1000_CR0,0,665,1000_AL_.jpg'
  //     },
  //     {
  //       title: 'Full Metal Jacket',
  //       poster:
  //         'https://pics.filmaffinity.com/Nacido_para_matar-577943737-large.jpg'
  //     },
  //     {
  //       title: 'Oldboy',
  //       poster:
  //         'https://upload.wikimedia.org/wikipedia/en/thumb/6/67/Oldboykoreanposter.jpg/220px-Oldboykoreanposter.jpg'
  //     },
  //     {
  //       title: 'Star Wars',
  //       poster:
  //         'https://imgix.ranker.com/user_node_img/50076/1001511915/original/the-very-first-_star-war_-poster-photo-u1?w=650&q=50&fm=jpg&fit=crop&crop=faces'
  //     },
  //     {
  //       title: 'Transpotting',
  //       poster: 'http://media.tumblr.com/tumblr_ln4tv7uzKx1qhqg0d.jpg'
  //     }
  //   ]
  // };

  // 컴포넌트가 마운트될때마다 직접 state 변경하면 설정한 render 설정들 작동 안함
  // componentDidMount() {
  //   setTimeout(() => {
  //     this.setState({
  //       greeting: 'Hello again!'
  //     });
  //   }, 3000);
  //   console.log('did mount');
  // }
  // componentDidMount() {
  //   setTimeout(() => {
  //     this.setState({
  //       movies: [
  //         {
  //           title: 'Transpotting',
  //           poster: 'http://media.tumblr.com/tumblr_ln4tv7uzKx1qhqg0d.jpg'
  //         },
  //         ...this.state.movies
  //       ]
  //     });
  //     console.log('asdf');
  //   }, 2000);
  // }

  state = {};

  componentDidMount() {
    this._getMovies();
  }

  _renderMovies = () => {
    // 변수 movies에 데이터 저장
    const movies = this.state.movies.map(movie => {
      //console.log(movie);
      return (
        <Movie
          title={movie.title_english}
          poster={movie.medium_cover_image}
          key={movie.id}
          genres={movie.genres}
          synopsis={movie.synopsis}
        />
      );
    });
    return movies;
  };

  _getMovies = async () => {
    const movies = await this._callApi();
    this.setState({
      movies
    });
  };

  _callApi = () => {
    return fetch(
      'https://yts.am/api/v2/list_movies.json?sort_by=download_count'
    )
      .then(response => response.json()) // json으로 변환
      .then(json => json.data.movies)
      .catch(err => console.log(err));
  };

  render() {
    const { movies } = this.state;
    return (
      <div className={movies ? 'App' : 'App--loading'}>
        {movies ? this._renderMovies() : 'Loading'}
        {/* {this.state.greeting} */}
        {/* Movie 컴포넌트는 title 가지고 있음 */}
        {/* <Movie title={movieTitles[0]} poster={movieImages[0]} />
        <Movie title={movieTitles[1]} poster={movieImages[1]} />
        <Movie title={movieTitles[2]} poster={movieImages[2]} />
				<Movie title={movieTitles[3]} poster={movieImages[3]} /> */}
        {/* index는 현재 재공하는 리스트의 숫자,  엘리먼트가 많을 경우 고유 key를 줘야함 */}
        {/* {this.state.movies.map((movie, index) => {
          return (
            <Movie title={movie.title} poster={movie.poster} key={index} />
          );
				})} */}
      </div>
    );
  }
}

export default App;
