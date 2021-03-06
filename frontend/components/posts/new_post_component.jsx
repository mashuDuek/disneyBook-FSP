import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createPost } from '../../actions/posts_actions';

class NewPostComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: '',
      receiverId: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { props } = this;
    const receiver = props.user ? props.currentUser : props.user;
    this.setState({ receiverId: receiver.id });
  }

  componentDidUpdate(newProps) {
    const receiverId = parseInt(newProps.match.params.userId);
    // the check for greater than zero is in case receiverId may be NaN
    if (this.state.receiverId !== receiverId && receiverId > 0) {
      this.setState({ receiverId });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.create(this.state).then(() => (
      this.setState({ body: '' })
    ));
  }

  handleChange(e) {
    e.preventDefault();
    this.setState(
      Object.assign({}, this.state, { body: e.target.value })
    );
  }

  render() {
    if (!this.props.currentUser) return <p>Loading...</p>;

    return (
      <form onSubmit={this.handleSubmit} className="create-post">
        <textarea
          placeholder={`What's on your mind, ${this.props.currentUser.name}?`}
        height="100"
        width="500"
          value={this.state.body}
          onChange={this.handleChange}
          >
        </textarea>
        <button>
          Post
        </button>
      </form>
    );
  }
}

const mapStatetoProps = (state, ownProps) => {
  return {
    currentUser: state.session.currentUser || {},
    user: state.entities.users[ownProps.match.params.userId] || state.session.currentUser
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    create: (post) => dispatch(createPost(post))
  };
};

export default withRouter(connect(
  mapStatetoProps,
  mapDispatchToProps
)(NewPostComponent));


