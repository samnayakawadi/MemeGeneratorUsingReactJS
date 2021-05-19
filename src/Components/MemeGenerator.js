import React from "react";
import "./meme.css";

class MemeGenerator extends React.Component {
  constructor() {
    super();
    this.state = {
      top: "",
      bottom: "",
      random: false, //This stores the random image. false is not to display anything until click
      memes: []
    };

    this.change = this.change.bind(this); // binding is very important for this.method
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((content) => {
        this.setState({ memes: content.data.memes });
      }); // Here I have fetched an Array & stored into state memes
  }

  change(event) {
    let name = event.target.name;
    let value = event.target.value;

    this.setState({ [name]: value }); //This is to update state top & bottom after onChange()
  }

  submit(event) {
    event.preventDefault(); //This prevents submission of form data or in easy words it prevents browsers to reload
    let memes = this.state.memes;
    let randomNum = Math.floor(Math.random() * memes.length);
    let name = memes[randomNum].name;
    let url = memes[randomNum].url;
    this.setState({
      title: name,
      random: url
    }); //This updates random url each time after clicking Generate
  }

  render() {
    return (
      <div className="container">
        <form className="form" action="" onSubmit={this.submit}>
          <input
            className="input topInput"
            type="text"
            name="top"
            placeholder="Top Text Here"
            value={this.state.top} /**Here HTML Value is updated as per state */
            onChange={this.change}
          />
          <input
            className="input bottomInput"
            type="text"
            name="bottom"
            placeholder="bottom Text Here"
            value={
              this.state.bottom
            } /**Here HTML Value is updated as per state */
            onChange={this.change}
          />
          <button className="btn">Generate</button>
        </form>
        <div
          style={this.state.random ? { display: "block" } : { display: "none" }}
        >
          <h1 className="name">{this.state.title}</h1>

          <div className="grouped">
            <h1 className="top">{this.state.top}</h1>
            <img className="img" src={this.state.random} alt="" />
            <h1 className="bottom">{this.state.bottom}</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default MemeGenerator;
