import {useState} from "react";

const initialBoard = () => Array(9).fill(null);

const useTicTacToe = () => {
    const [board, setBoard] = useState(initialBoard());
      const [isXNext, setIsXNext] = useState(true);

      const WINNING_PATTERNS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];

      const calculateWinner = (currentBoard) => {
        for (let i = 0; i < WINNING_PATTERNS.length; i++){
            const [a,b,c] = WINNING_PATTERNS[i];
            if(
                currentBoard[a] &&
                currentBoard[a] ===currentBoard[b] &&
                currentBoard[a] === currentBoard[c]
            ) {
                return currentBoard[a];
            }
        }
         return null;
      };

        const handleClick = (index) => {
            const winner = calculateWinner(board);
            if(winner || board[index]) return 

            const newBoard = [...board]
            newBoard[index] = isXNext?   <img 
    src="https://i.pinimg.com/736x/04/7e/f4/047ef4595d9e2968739e904b47d81e6c.jpg" 
    alt="X" 
    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
  /> :<img 
    src="https://www.shutterstock.com/image-vector/illustration-cute-baby-golden-retrieve-600nw-2488093199.jpg" 
    alt="X" 
    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
  />;
            setBoard(newBoard);
            setIsXNext(!isXNext);
        };

      const getStatusMessage = () => {
        const winner = calculateWinner(board);
        if (winner) return `Player ${winner} wins!`;
        if (!board.includes(null)) return 'It is a draw!';
        return (
          <span>
            Player{' '}
            {isXNext ? (
              <img
                src="https://i.pinimg.com/736x/04/7e/f4/047ef4595d9e2968739e904b47d81e6c.jpg"
                alt="X"
                style={{ width: 24, height: 24, objectFit: 'cover', verticalAlign: 'middle' }}
              />
            ) : (
              <img
                src="https://www.shutterstock.com/image-vector/illustration-cute-baby-golden-retrieve-600nw-2488093199.jpg"
                alt="O"
                style={{ width: 24, height: 24, objectFit: 'cover', verticalAlign: 'middle' }}
              />
            )}{' '}
            turn
          </span>
        );
      };

      const resetGame = () => {
        setBoard(initialBoard());
        setIsXNext(true);
      };

      return {board, isXNext, handleClick, getStatusMessage, resetGame, calculateWinner};
}

export default useTicTacToe;