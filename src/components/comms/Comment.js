import React, { Component } from 'react';

class Comment extends Component {
    render() {
        return (
            <article className="media">
                <figure className="media-left">
                    <p className="image is-64x64">
                        <img src="./assets/img/f1_helmet.svg" alt="Avatar" />
                    </p>
                </figure>
                <div className="media-content">
                    <div className="content">
                        <p>
                            <strong>{this.props.comment.name}</strong>
                            <br />
                            {this.props.comment.comment}
                        </p>
                    </div>
                </div>
            </article>
        );
    }
}

export default Comment;
