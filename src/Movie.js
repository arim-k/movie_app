// eslint-disable-next-line
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LinesEllipsis from 'react-lines-ellipsis';
import './Movie.css';

// 부모 컴포넌트가 자식 컴포넌트에게 정보를 줌
// class Movie extends Component {
//   // 받는 정보의 type 체크 무엇을 받는지, isRequried는 필수 조건
//   static propTypes = {
//     title: PropTypes.string.isRequired,
//     poster: PropTypes.string.isRequired
//   };

//   render() {
//     console.log(this.props); // Movie.js에서 title을 props로 불러옴! 왜냐고 movie컴포넌트는 title이라는 요소가 있음
//     return (
//       <div>
//         <MoviePoster poster={this.props.poster} />
//         <h1>{this.props.title}</h1>
//         {/* 요소들을 액세스하는 방법은 this.props.title */}
//       </div>
//     );
//   }
// }

// class MoviePoster extends Component {
//   static propTypes = {
//     poster: PropTypes.string.isRequired
//   };
//   render() {
//     console.log(this.props);
//     return <img src={this.props.poster} alt="Movie Poster" />;
//   }
// }

// 그냥 return을 하기 위해 존재하기도 하는 어떤 컴포넌트 - Functional Component
// class component는 state 존재, functional은 state 없음
function Movie({ title, poster, genres, synopsis }) {
  return (
    <div className="Movie">
      <div className="Movie__Column">
        <MoviePoster poster={poster} alt={title} />
      </div>
      <div className="Movie__Column">
        <h1>{title}</h1>
        <div className="Movie__Genres">
          {genres.map((genre, index) => (
            <MovieGenre genre={genre} key={index} />
          ))}
        </div>
        <div className="Movie__Synopsis">
          <LinesEllipsis
            text={synopsis}
            maxLine="3"
            ellipsis="..."
            trimRight
            basedOn="letters"
          />
        </div>
      </div>
    </div>
  );
}

function MoviePoster({ poster, alt }) {
  return <img src={poster} alt={alt} title={alt} className="Movie__Poster" />;
}

function MovieGenre({ genre }) {
  return <span className="Movie__Genre">{genre}</span>;
}

Movie.propTypes = {
  title: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  gernes: PropTypes.array,
  synopsis: PropTypes.string.isRequired
};

MoviePoster.propTypes = {
  poster: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
};

MovieGenre.propTypes = {
  genre: PropTypes.string.isRequired
};

export default Movie;
