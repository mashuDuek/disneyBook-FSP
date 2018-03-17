import React from 'react';

class EditCoverPicComponent extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      imageUrl: null, imageFile: null, displayInput: false
    };
    this.handleUpdateCover = this.handleUpdateCover.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleUpdateCover (e) {
    this.setState({ displayInput: !this.state.displayInput });
  }

  handleSubmit() {
    const file = this.state.imageFile;
    const formData = new FormData();
    formData.append("user[id]", this.props.user.id);
    if (file) formData.append("user[cover_pic]", file);
    this.props.updateCover(formData).then(() => {
      this.props.hideModal();
    });
  }

  handleInput(e) {
    const reader = new FileReader();
    const file = e.currentTarget.files[0];
    reader.onloadend = () =>
    this.setState({ imageUrl: reader.result, imageFile: file });

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({ imageUrl: "", imageFile: null });
    }
  }

  // componentDidMount() {
  //   modalBackdrop = document.getElementById('modal-backdrop');
  //   modalBackdrop.removeClass('modal-backdrop');
  //   modalBackdrop.addClass('modal-backdrop-dark');
  // }
  //
  // componentWillUnmount() {
  //   modalBackdrop = document.getElementById('modal-backdrop');
  //   modalBackdrop.addClass('modal-backdrop');
  //   modalBackdrop.removeClass('modal-backdrop-dark');
  // }

  render() {
    let input;
    if (!this.state.displayInput) {
      input = null;
    } else {
      input = (
        <form onSubmit={ this.handleSubmit }>
          <input type='file' onChange={ this.handleInput }></input>
          <button>Change Your Pic</button>
        </form>
      );
    }
    return (
      <div className="cover-pic-modal-wrapper">
        <img src={ this.props.user.coverPic }></img>
        <div className='form-and-button-edit-cover'>
          <button onClick={ this.handleUpdateCover }>Edit Cover Pic</button>
          { input }
        </div>
      </div>
    );
  }
}

export default EditCoverPicComponent;