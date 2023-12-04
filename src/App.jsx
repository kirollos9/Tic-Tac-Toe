
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combination";
import GameOver from "./components/GameOver";
const PLAYERS={
  X:"player 1",
  O:"Player 2"
};

const INITIAL_GAME_BOARD=[
  [null,null,null],
  [null,null,null],
  [null,null,null]];

function derivedActivePlayer(gameTurns){
  let curPlayer='X';
  if(gameTurns.length>0 && gameTurns[0].player==='X'){
    curPlayer='O';
  }
  return curPlayer;
}
function driveWinner(gameBoard,players){
  let winner=null;
  for(const combination of WINNING_COMBINATIONS){
 
    const firstSquareSympol=gameBoard[combination[0].row][combination[0].column];
    const secondSquareSympol=gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSympol=gameBoard[combination[2].row][combination[2].column];
    if(firstSquareSympol&&firstSquareSympol===secondSquareSympol&&firstSquareSympol===thirdSquareSympol){
      winner=players[firstSquareSympol];
    }
  }
  return winner;
}
function driveGameBoard(gameTurns){
  
  let gameBoard=[...INITIAL_GAME_BOARD.map(item=>[...item])];
for(const turn of gameTurns){
  const {square,player}= turn;
  const {row,col}=square;
  gameBoard[row][col]=player;
 
}
return gameBoard;
}
function App() {
const[gameTurns,setGameTurns]=useState([]);
const [players,setPlayers]= useState(PLAYERS);

 
const curPlayer=derivedActivePlayer(gameTurns);
const gameBoard=driveGameBoard(gameTurns);
const winner=driveWinner(gameBoard,players);
const hasDraw=(gameTurns.length===9 &&!winner);
  function handleSelectSqaure(rowIndex,colIndex){

    setGameTurns(prevTurns=>{
      let curPlayer=derivedActivePlayer(prevTurns);
      const updatedTurns=[{square:{row:rowIndex,col:colIndex},player:curPlayer}
        ,...prevTurns];
      return updatedTurns;
    });

  }
  function handleRematch(){
    setGameTurns([]);
  }
  function handlePlayerNameChange(sympol,newName){
    setPlayers(prevPlayers=>{
      return {...prevPlayers,[sympol]:newName};
    });
    
  }

  return (
    <main>
      <div id='game-container' >
        <ol id='players' className="highlight-player">
        <Player name={PLAYERS["X"]} sympol="X" isActive={curPlayer==='X'} onChangeName={handlePlayerNameChange}/>
        <Player name={PLAYERS["O"]} sympol="O" isActive={curPlayer==='O'} onChangeName={handlePlayerNameChange}/>
        </ol>
        {(winner ||hasDraw) && <GameOver winner={winner} onRematch={handleRematch}/>}
        <GameBoard onSelectSquare={handleSelectSqaure} board={gameBoard}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  );
}

export default App
