import React, { Component } from 'react';
import './App.css';
import JeopardyCategory from './JeopardyCategory.js';
import NameForm from './NameForm';
import UserInputForm from './UserInputForm';

let jeopardyData = require('./jeopardyData.json')


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playerName: 'Please enter your name',
            boardData: jeopardyData,
            userResponse: 'Enter your response here',
            selectedPoints: 0,
            currentQuestionText: '',
            compareResponse: 'Lets Play!',
            playerScore: 0,
        };
        this.nameCallBack = this.nameCallBack.bind(this);
        this.userInputCall = this.userInputCall.bind(this);
        this.pointsCall = this.pointsCall.bind(this);
        this.questionTextCall = this.questionTextCall.bind(this);
        this.compareResult = this.compareResult.bind(this)

    }

    compareResult(wordValue){
        if (wordValue === this.state.currentQuestionText){
            this.setState({ compareResponse: 'Well done!'});
            this.setState({ playerScore: this.state.playerScore + parseInt(this.state.selectedPoints)});
            
        }else {
            this.setState({ compareResponse: 'Sorry that is not the Question we needed.' });
            this.setState({ playerScore: this.state.playerScore - parseInt(this.state.selectedPoints)});
        }
    }

    questionTextCall(correctQuestion){
        this.setState({currentQuestionText: correctQuestion});
    }

    pointsCall(pointsChoice){
        this.setState({selectedPoints: pointsChoice});
    }

    userInputCall (userInput) {
        this.setState({userResponse: userInput });
    }

    nameCallBack (enteredName) {
        this.setState({ playerName: enteredName });
    }
  render() {
    



    return (
      <div className="App">
        <div id="header">
        <p id="title">JEOPARDY</p>
        </div>
        <div id="content">
            <div id="scoreArea" className="column edge">
                <div className="playerNameTextBox">
                    <p>{this.state.playerName}</p>
                </div>
                <div className="playersScore">
                    <p>Current point value Chosen</p>
                    <p>{this.state.selectedPoints}</p>
                    <p>Current point Total</p>
                    <p>{this.state.playerScore}</p>
                </div>
                <div className="answerBox">
                    
                </div>
                <div className="SubmitButton">
                    <NameForm onNameInput = {this.nameCallBack}/>
                </div>
            </div>
            <div id="boardArea" className="column">
                {this.state.boardData.Categories.Category.map(x => 
                {return <JeopardyCategory  onPointsCall={this.pointsCall} onQuestionTextCall={this.questionTextCall} 
                categoryName={x.name} questionData={x}/>})}
                <p>{this.state.compareResponse}</p>
                <UserInputForm onUserInput = {this.userInputCall} onCompare = {this.compareResult} 
                currentQuestionText = {this.currentQuestionText}/>
            </div>
            <div id="TribecArea" className="column edge">
            
            </div>

        </div>

      </div>
    );
  }
}

export default App;
