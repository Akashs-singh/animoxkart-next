import React, { Component } from 'react';
import './star-rating.css';

class StarRating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: this.props.rating || 0, // Initial rating value
    };
  }

  // Function to change the rating
  changeRating(newRating) {
    this.setState({ rating: newRating });
  }

  render() {
    const rating = this.state.rating;
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      let starClass = 'star-icon ';
      if (i <= rating) {
        starClass += 'fa fa-star filled';
      } else if (i - 0.5 <= rating) {
        starClass += 'fa fa-star-half-full filled';
      } else {
        starClass += 'fa fa-star not-filled';
      }
      stars.push(<i key={i} className={starClass} onClick={() => this.changeRating(i)} />);
    }

    return (
      <div className="premium-rating">
        {stars}
      </div>
    );
  }
}

export default StarRating;
