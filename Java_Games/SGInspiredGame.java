import java.util.*;
public class SGInspiredGame {
	public static void main(String[] args) {
		final int MARBLES = 20;
		Scanner s = new Scanner(System.in);
		boolean continuePlaying = true;
		System.out.println("Welcome to marbles!!!");
		System.out.println("The rules are simple: Each player has 10 marbles");
		System.out.println("During each turn, the current player will grab an even or odd");
		System.out.println("amount from their marbles and the other player will guess whether");
		System.out.println("the amount is even or odd.");
		System.out.println("If the guess is correct, they take the marbles and pass turn. If the guess is incorrect, the turn is passed to the next player");
		System.out.println();
		while(continuePlaying == true) {
			startGame(MARBLES);
			System.out.println("Play again? Enter 0 to continue or anything else to exit!");
			String answer = s.next();
			if(answer.equals("0")) {
				
			}
			else {
				System.out.println("Goodbye!!!");
			}
		}
		
	}
	public static void startGame(int marbles) {
		Scanner s = new Scanner(System.in);
		int pM = marbles;
		String playersName = "You";
		String AiName = "Computer";
		int aIM = marbles;
		String currentPlayer = "";
		String otherPlayer = "";
		int wager = 0;
		System.out.println("A coin will be tossed to determine who will go first. Would you like heads or tails?");
		String answer = s.next();
		boolean valid = false;
		boolean isWinner = false;
		int count = 0;
		String result = "";
		while(valid == false) {
			if(answer.equals("heads") || answer.equals("Heads")) {
				answer = "heads";
				valid = true;
			}
			else if(answer.equals("tails")  || answer.equals("Tails")) {
				answer = "tails";
				valid = true;
			}
			else {
				System.out.println("Please enter true or false!");
			}
		}
		String resultToss = coinToss(answer);
		
		if(resultToss.equals(answer)) {
		count = 1;
		currentPlayer = AiName;
		otherPlayer = playersName;
		wager = playerOMenu(s, pM);
		result = gamePlay(wager, randomAnswer(), currentPlayer);
		System.out.println(currentPlayer + " guessed " + result);
		System.out.println(otherPlayer + " wagered " + wager);
		if(result.equals("correct")) {
				aIM += wager; 
				pM -= wager;
			
		}
		}
		else {
			count = 2;
			currentPlayer = playersName;
			otherPlayer = AiName;
			wager = randomWager(aIM);
			result = gamePlay(wager, playerDAction(s), currentPlayer);
			System.out.println(currentPlayer + " guessed " + result);
			System.out.println(otherPlayer + " wagered " + wager);
			if(result.equals("correct")) {
					aIM -= wager; 
					pM += wager;
				}
				
		}
		count++;
		if(pM == 0) {
			System.out.println(AiName + " wins!");
		}
		else if (aIM == 0){
			System.out.println(playersName + " win!");
		}
		else {
			System.out.println("Current marble amounts:");
		System.out.println(playersName + ": " + pM);
		System.out.println(AiName + ": " + aIM);
		}
		while(isWinner == false) {
			if(count%2 == 0) {
				currentPlayer = playersName;
				otherPlayer = AiName;
				wager = randomWager(aIM);
				result = gamePlay(wager, playerDAction(s), currentPlayer);
				System.out.println(currentPlayer + " guessed " + result);
				System.out.println(otherPlayer + " wagered " + wager);
				if(result.equals("correct")) {
						aIM -= wager; 
						pM += wager;
					}	
			}
			else {
				currentPlayer = AiName;
				otherPlayer = playersName;
				wager = playerOMenu(s, pM);
				result = gamePlay(wager, randomAnswer(), currentPlayer);
				System.out.println(currentPlayer + " guessed " + result);
				System.out.println(otherPlayer + " wagered " + wager);
				if(result.equals("correct")) {
						aIM += wager; 
						pM -= wager;
					
				}
			}
			count++;
			if(pM == 0) {
				System.out.println(AiName + " wins!");
				break;
			}
			else if (aIM == 0){
				System.out.println(playersName + " win!");
				break;
			}
			else {
				System.out.println("Current marble amounts:");
			System.out.println(playersName + ": " + pM);
			System.out.println(AiName + ": " + aIM);
			}
		}
	}
	public static String coinToss(String answer) {
		int val = ((int)Math.random()*100 )+1;
		String s; 
		if(val%2 == 0) {
			s = "tails";
		}
		else {
			s = "heads";
		}
		System.out.println("The coin has landed on " + s);
		if(s.equals(answer)) {
			
			System.out.println("You will go first");
		}
		else {
			System.out.println("Computer will go first");
		}
		return s;
	}
	public static int playerOMenu(Scanner s, int marbles) {
		System.out.println("Your turn to hide an amount: ");
		System.out.println("Your current amount of marbles: " + marbles);
		System.out.println("Please enter an amount:");
		
		boolean valid = false;
		int answer = 0;
		while(valid == false) {
		try {
			answer = s.nextInt();
			if(answer>marbles || answer == 0) {
				System.out.println("Please enter a value at most " + marbles);
			}
			else {
				valid = true;
			}
		}
		catch(InputMismatchException e ) {
			System.out.println("Please enter an integer value!");
			s.next();
		}
		}
		return answer;
	}
	public static String gamePlay(int wager, String guess, String player) {
		String correct = "";
		if(wager%2 == 0) {
			correct = "even";
		}
		else {
			correct = "odd";
		}
		System.out.println(player + " guessed " + guess);
		
		if(guess.equals(correct)) {
			return "correct";
		}
		return "incorrect";
	}
	public static String playerDAction(Scanner s) {
		
		System.out.println("Your turn to guess!");
		System.out.println("Would you like guess even or odd?");
		boolean valid = false;
		String answer = "";
		while(valid == false) {
			answer = s.next();
			if(answer.equals("even") || answer.equals("Even")) {
				valid = true;	
			}
			else if(answer.equals("odd") || answer.equals("Odd")) {
				valid = true;
			}
			else {
				System.out.println("Please enter even or odd");
			}
		}
		return answer;
	}
	public static String randomAnswer() {
		int rand = ((int)(Math.random()*2))+1;
		if(rand%2 == 0) {
			return "even";
		}
		else {
			return "odd";
		}
	}
	public static int randomWager(int marbles) {
		int answer = ((int)(Math.random()*marbles))+1;
		return answer;
	}
}
