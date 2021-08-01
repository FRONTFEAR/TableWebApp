import './App.css';
import { render } from '@testing-library/react';
import React from 'react';

class App extends React.Component{
  
  constructor(props) {
    super(props);
    this.state = { cells: [],
      firstNumByte: '',
      secondNumByte: '', 
      DecByteToCreate: '',
      DecByteToDelete: ''
    };
    
    this.dec2bin = this.dec2bin.bind(this)
    this.handleChangeSecond = this.handleChangeSecond.bind(this)
    this.handleChangeFirst = this.handleChangeFirst.bind(this)
    this.changeColor = this.changecolor.bind(this)
    this.deleteline = this.deleteline.bind(this)
    this.createnewline = this.createnewline.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.refreshTable = this.refreshTable.bind(this)
    this.handleByteToCreate = this.handleByteToCreate.bind(this)
    this.handleByteToDelete = this.handleByteToDelete.bind(this)
    this.cret = this.cret.bind(this)
    this.handldmultiply = this.handldmultiply.bind(this)
    this.handldsum = this.handldsum.bind(this)
  }

  createnewline(event) {
    event.preventDefault();
    console.log(this.state.DecByteToCreate)
    fetch('http://localhost:5000/api/byte', {
      method:'POST',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        ByteDecNumber: this.state.DecByteToCreate,
        ByteBinNumber: this.dec2bin(this.state.DecByteToCreate)
      })
    })
    .then(response=>response.json())
    this.setState({DecByteToCreate: ''})
  }
  
  dec2bin(dec){
    return (dec >>> 0).toString(2);
  }

  deleteline(event) {
    event.preventDefault();
    fetch('http://localhost:5000/api/byte/'+this.state.DecByteToDelete, {
      method:'DELETE',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
    })
    this.setState({DecByteToDelete: ''})
  }

  refreshTable(){
    fetch('http://localhost:5000/api/byte')
    .then(response=>response.json())
    .then(data=>{
      this.setState({cells:data})
    });
  }
  
  componentDidMount() {
    this.refreshTable();
    this.changeColor();
  }
  componentDidUpdate(){
    this.refreshTable();
    this.changeColor();
  }

  changecolor(){ 
    const x = document.getElementById('byteTable').getElementsByTagName('tr')
    const {cells} = this.state
    for (var i=0; i<cells.length; i++){
      if (cells[i].ByteDecNumber > 50){
        x[i + 1].style.backgroundColor = 'aqua'
      } else {
        x[i + 1].style.backgroundColor = 'lightgreen'
      }
    }
  }

  handleByteToDelete(event) {
    this.setState({DecByteToDelete: event.target.value}) 
  }
  handleByteToCreate(event) {
    this.setState({DecByteToCreate: event.target.value}) 
  }
  handleChangeFirst(event) {
    this.setState({firstNumByte: event.target.value});
  }
  handleChangeSecond(event) {
    this.setState({secondNumByte: event.target.value});
  }


  handldmultiply(event){
    event.preventDefault();
    var firstByte = '';
    var secondByte = '';
    const {cells} = this.state
    for (var i = 0; i < cells.length; i++){
      if (cells[i].ByteId === parseInt(this.state.firstNumByte)){
        firstByte = cells[i].ByteDecNumber
      }
    } 
    for (var i = 0; i < cells.length; i++){
      if (cells[i].ByteId === parseInt(this.state.secondNumByte)){
        secondByte = cells[i].ByteDecNumber 
      } 
    }  
    if (firstByte === '' || secondByte === ''){
      return;
    }
    fetch('http://localhost:5000/api/bytemultiply', {
      method:'POST',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        ByteDecNumber: firstByte,
        ByteBinNumber: secondByte,
      })
    })
    .then(response=>response.json())
    this.setState({firstNumByte: ''})
    this.setState({secondNumByte: ''})
  }

  handldsum(event){
    event.preventDefault();
    var firstByte = ''
    var secondByte = ''
    const {cells} = this.state
    for (var i = 0; i < cells.length; i++){
      if (cells[i].ByteId === parseInt(this.state.firstNumByte)){
        firstByte = cells[i].ByteDecNumber
      }
    } 
    for (var i = 0; i < cells.length; i++){
      if (cells[i].ByteId === parseInt(this.state.secondNumByte)){
        secondByte = cells[i].ByteDecNumber 
      } 
    }  
    if (firstByte === '' || secondByte === ''){
      return;
    }
    fetch('http://localhost:5000/api/bytesum', {
      method:'POST',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        ByteDecNumber: firstByte,
        ByteBinNumber: secondByte,
      })
    })
    .then(response=>response.json())
    this.setState({firstNumByte: ''})
    this.setState({secondNumByte: ''})
  }

  handleSubmit(event) {
    
  }

  cret(x){
    var numberTofill = ''
    if (x.length < 8){
      for(var i = 0; i < 8 - x.length; i++ ){
        numberTofill += '0'
      } 
    }
    numberTofill += x;
    let result = [];
    for (var i = 0; i < 8; i++){
      result.push(
        <td className = "column">{numberTofill[i]}</td> 
      )         
    }
    return result;
  }

  render() {
    const {cells} = this.state;
    return (
      <div className="table" >
        <div id='byteTable'>
          <tr style={{backgroundColor: 'white'}}>
            <td className = "column">Номер байта</td>
            <td className = "column">Бит 7</td>
            <td className = "column">Бит 6</td>
            <td className = "column">Бит 5</td>
            <td className = "column">Бит 4</td>
            <td className = "column">Бит 3</td>
            <td className = "column">Бит 2</td>
            <td className = "column">Бит 1</td>
            <td className = "column">Бит 0</td>
            <td className = "column">Десятичное число</td>
          </tr>
          {cells.map(cell=>
            <tr key={cell.ByteId} >
              <td className = "column">{cell.ByteId}</td>
              {this.cret(cell.ByteBinNumber, cell.ByteDecNumber)}
              <td className = "column">{cell.ByteDecNumber}</td>

            </tr>
          )}
        </div>
        <div className="buttonsContainer">
          <form onSubmit={this.createnewline}>
            <label>
            Введите байт:
            <input type="text" value={this.state.DecByteToCreate} onChange={this.handleByteToCreate} />
            </label>
            <input type="submit" value="Создать байт" />
          </form>

          <form onSubmit={this.deleteline}>
            <label>
              Номер байта для удаления:
              <input type="text" value={this.state.DecByteToDelete} onChange={this.handleByteToDelete} />
            </label>
            <input type="submit" value="Удалить байт" />
          </form>

        <form onSubmit={this.handldsum}>
          <label>
          Номер первого байта:
          <input type="text" value={this.state.firstNumByte} onChange={this.handleChangeFirst} />
          </label>
          <label>
          Номер второго байта:
            <input type="text" value={this.state.secondNumByte} onChange={this.handleChangeSecond} />
          </label>
              <input type="submit" value="Сложить байт" />
        </form>
        <form onSubmit={this.handldmultiply}>
          <input type="submit" value="Умножить байт" />
        </form>
        </div>
      </div>  
    );
  }
}

export default App;
////<button className="buttonStyle" onClick={this.createnewline}>Сложить байт</button>