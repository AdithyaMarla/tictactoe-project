//tictactoe.js


class TicTacToe {
    constructor() {
        this.board = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ];
        this.currentPlayer = "X";
        this.winner = null;
    }

    getBoard() {
        return this.board;
    }

    makeMove(row, col) {
        if (this.board[row][col] !== "" || this.winner) return false;

        this.board[row][col] = this.currentPlayer;

        if (this.checkWinner()) {
            this.winner = this.currentPlayer;
        } else {
            this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
        }

        return true;
    }

    checkWinner() {
        const b = this.board;
        // Rows, Columns, Diagonals
        for (let i = 0; i < 3; i++) {
            if (b[i][0] && b[i][0] === b[i][1] && b[i][1] === b[i][2]) return true;
            if (b[0][i] && b[0][i] === b[1][i] && b[1][i] === b[2][i]) return true;
        }
        if (b[0][0] && b[0][0] === b[1][1] && b[1][1] === b[2][2]) return true;
        if (b[0][2] && b[0][2] === b[1][1] && b[1][1] === b[2][0]) return true;
        return false;
    }

    isFull() {
        return this.board.flat().every(cell => cell !== "");
    }
}

module.exports = TicTacToe;
