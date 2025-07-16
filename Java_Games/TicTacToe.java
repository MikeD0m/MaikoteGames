import java.util.*;
public class TicTacToe {
public static void main(String[] args) {
	final int FINAL_SIZE = 9;
	final String p1 = "#";
	final String p2 = "O";
	String [] board = new String[FINAL_SIZE];
	Scanner s = new Scanner(System.in);
	boolean continuePlaying = true; 
	while(continuePlaying == true) {
		newGame(board, p1, p2);
		System.out.println("Would you like to continue playing? Enter yes to continue or anything else to quit: ");
		String answer = s.next();
		if(answer.equals("Yes") || answer.equals("yes")) {
			continuePlaying = true;
		}
		else {
			continuePlaying = false;
			System.out.println("Goodbye!!!");
		}
	}
	
}
public static String[] resetBoard() {
	String[] temp = {"1","2","3","4","5","6","7","8","9"};
	return temp;
}
public static void newGame(String[] board, String p1, String p2) {
	Scanner s = new Scanner(System.in);
	String currentPlayer;
	board = resetBoard();
	int count = 0;
	boolean p1Turn = true;
	for(int i = 0; i<board.length; i++ ) {
		count++;
		displayBoard(board);
		if(p1Turn == true) {
			System.out.println("Player one's turn");
			currentPlayer = p1;
			p1Turn = false;
		}
		else{
			System.out.println("Player two's turn");
			currentPlayer= p2; 
			p1Turn = true;
		}
		displayBoard(board);
			System.out.println("Please enter the value where you would like to place your value: ");
			addValue(currentPlayer, board, s);
			if(confirmWinner(board, currentPlayer, p1, p2) == true) {
				break;
			}
	}
	if(count >= 8) {
		displayBoard(board);
		System.out.println("Draw! ");
	}
	
}
public static void displayBoard(String[] board) {
	for(int i = 0; i< board.length; i++) {
		System.out.print("|" + board[i]);
		if(((i+1)%3) == 0) {
			System.out.print("| \n");
		}
	}
}
public static boolean confirmWinner(String[] board, String c, String p1, String p2) {
	if((board[0] == c && board[4] == c && board[8] == c) || (board[2] == c && board[4] == c && board[6] == c)) {
		if(c.equals(p1)) {
			displayBoard(board);
			System.out.println("Player 1 wins!");
			return true;
		}
		else {
			displayBoard(board);
			System.out.println("Player 2 wins!");
			return false;
		}
	}
	if((board[0] == c && board[1] == c && board[2] == c) || (board[3] == c && board[4] == c && board[5] == c) || (board[6] == c && board[7] == c && board[8] == c)) {
		if(c.equals(p1)) {
			displayBoard(board);
			System.out.println("Player 1 wins!");
			
		}
		else {
			displayBoard(board);
			System.out.println("Player 2 wins!");
			
		}
		return true;
	}
	if((board[0] == c && board[3] == c && board[6] == c) || (board[1] == c && board[4] == c && board[7] == c) || (board[2] == c && board[5] == c && board[8] == c)) {
		if(c.equals(p1)) {
			displayBoard(board);
			System.out.println("Player 1 wins!");
			
		}
		else {
			displayBoard(board);
			System.out.println("Player 2 wins!");
		
		}
		return true;
	}
	return false;
}
public static void addValue(String c, String[] board, Scanner s) {
	boolean valid = false;
	int value = 0;
		while(valid == false) {
			try {
			value = s.nextInt();
			switch(value) {
			case(1):
				valid = true;
				break;
			case(2):
				valid = true;
				break;
			case(3):
				valid = true;
				break;
			case(4):
				valid = true;
				break;
			case(5):
				valid = true;
				break;
			case(6):
				valid = true;
				break;
			case(7):
				valid = true;
				break;
			case(8):
				valid = true;
				break;
			case(9):
				valid = true;
				break;
				default:
					System.out.println("Please enter a value from 1-9!!!");
					break;
			}
			
			}
			catch(InputMismatchException e) {
		System.out.println("Please enter a value from 1-9!!!");
			}
		}
		Integer v = value;
		String va = v.toString();
		int index = value-1;
		if(board[index].equals(va)) {
			board[index] = c;
		}
		else {
			System.out.println("Spot already taken! Enter another!");
			addValue(c, board, s);
		}
	
	
	
}
}
