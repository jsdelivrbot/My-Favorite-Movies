
import React, { Component } from 'react';
import StarRatings          from 'react-star-ratings';


export default class CommentAndRating extends Component {
    render() {
        return (
            <div className='form-group comment'>
                <div>
                    <label>Rating:</label>&nbsp;
                    <StarRatings
                        isSelectable      ={ true }
                        rating            ={ this.props.rating }
                        starSpacing       ='0'
                        starWidthAndHeight='25px'

                        changeRating      ={ this.props.onRatingChange }
                        />
                </div>
                <label>Comment:</label>
                <textarea
                    className  ="form-control"
                    placeholder='Enter your commentary here'
                    rows       ="5"
                    value      ={ this.props.comment }

                    onChange={ e => this.props.onCommentChange( e.target.value ) }
                    >
                </textarea>
            </div>
        );
    }
}
