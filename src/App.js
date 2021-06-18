import React from 'react';
import "./App.css";
import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';



export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      questions: [],
      showAnswers: false,
      numberRange: "upTo10",
      numQuestions: 20
    }
  }

  generateQuestions = () => {
    const questions = []
    while(questions.length !== this.state.numQuestions){
      questions.push(additionGenerator(this.state.numberRange));  
    }
    this.setState({questions: questions});
  }

  onClickNumberRange = async ({ key }) => {
    if(key === "1") await this.setState({numberRange: "upTo10"});   
    if(key === "2") await this.setState({numberRange: "1dp"}); 
    if(key === "3") await this.setState({numberRange: "2dp"});
    if(key === "4") await this.setState({numberRange: "negative"}); 
    this.generateQuestions();
  }

  onClickQuestions = async ({ key }) => {
    if(key === "1") await this.setState({numQuestions: 20});   
    if(key === "2") await this.setState({numQuestions: 40}); 
    if(key === "3") await this.setState({numQuestions: 60}); 
    this.generateQuestions();
  }

  componentDidMount(){
    this.generateQuestions();
  }

  render(){
    return (
      <>
        <h1 style={{textAlign: "center"}}>Addition/Subtraction Questions</h1>
        <div className="no-print" style={{textAlign: "center"}}>
          <Button type={"primary"} onClick={() => this.generateQuestions()}>Generate questions</Button>
          <Button onClick={() => this.setState({showAnswers: !this.state.showAnswers})}>Toggle answers</Button>
          <Dropdown overlay={
            <Menu onClick={this.onClickNumberRange}>
              <Menu.Item key="1">Up to 10</Menu.Item>
              <Menu.Item key="2">Up to 10 (1 dp)</Menu.Item>            
              <Menu.Item key="3">Up to 10 (2 dp)</Menu.Item>
              <Menu.Item key="4">Up to 10 (negative)</Menu.Item>
            </Menu>
          }>
            <Button onClick={e => e.preventDefault()}>
              Choose number range <DownOutlined />
            </Button>
          </Dropdown>
          <Dropdown overlay={
            <Menu onClick={this.onClickQuestions}>
              <Menu.Item key="1">20</Menu.Item>
              <Menu.Item key="2">40</Menu.Item>            
              <Menu.Item key="3">60</Menu.Item>
            </Menu>
          }>
            <Button onClick={e => e.preventDefault()}>
              Number of Questions <DownOutlined />
            </Button>
          </Dropdown>
        </div><br/><br/>
        <div className="grid-container">
          {this.state.questions.map((q, idx) => 
          <div key={idx} className="grid-item">{
            `${q[0]} ${this.state.showAnswers ? q[1] : '________'}`
          }</div>)}
        </div>
      </>
    );
  }
}

const additionGenerator = (numberRange) => {
  let num1 = 0;
  let num2 = 0;
  let res = 0;
  let answer = 0;
  let plus = Math.random() < 0.5
  if(numberRange === "upTo10"){
    num1 = Math.ceil(Math.random() * 9);
    num2 = Math.ceil(Math.random() * 9);
    res = plus ? num1 + num2 : num1 - num2;
    answer = res;
  }

  if(numberRange === "1dp"){
    num1 = parseFloat((Math.random() * 9).toFixed(1));
    num2 = parseFloat((Math.random() * 9).toFixed(1));
    res = plus ? parseFloat(num1) + parseFloat(num2) : parseFloat(num1) - parseFloat(num2);
    answer = parseFloat(res.toFixed(1));
  }

  if(numberRange === "2dp"){
    num1 = parseFloat((Math.random() * 9).toFixed(2));
    num2 = parseFloat((Math.random() * 9).toFixed(2));
    res = plus ? parseFloat(num1) + parseFloat(num2) : parseFloat(num1) - parseFloat(num2);
    answer = parseFloat(res.toFixed(2));
  }

  if(numberRange === "negative"){
    num1 = parseFloat(Math.random() < 0.5 ? -(Math.random() * 9).toFixed(2) : (Math.random() * 9).toFixed(2));
    num2 = parseFloat(Math.random() < 0.5 ? -(Math.random() * 9).toFixed(2) : (Math.random() * 9).toFixed(2));
    res = plus ? parseFloat(num1) + parseFloat(num2) : parseFloat(num1) - parseFloat(num2);
    answer = parseFloat(res.toFixed(2));
  }

  const question = `${num1} ${plus ? '+' : '-'} ${num2} = `;
  return [question, answer];
}