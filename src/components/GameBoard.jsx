
export default function GameBoard({onSelectSquare,board}){
   
    return(
        <ol id="game-board">
            {
                board.map(
                    (row,rowIndex)=>(<li key={rowIndex}>
                        <ol>
                            {
                                row.map(
                                    (playerSympol,colIndex)=>(<li key={colIndex}>
                                        <button onClick={()=>onSelectSquare(rowIndex,colIndex)} disabled={playerSympol !==null}>{playerSympol}</button>
                                    </li>)
                                )
                            }
                        </ol>
                    </li>)
                )
            }
            
        </ol>

    
    );
}