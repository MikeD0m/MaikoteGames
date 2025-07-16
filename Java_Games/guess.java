import java.util.Scanner;

public class guess {
	public static void main(String[] args) {
		System.out.println("Hello please enter an endpoint for the range (0-?)");
		Scanner scan = new Scanner(System.in);
		boolean c = false;
		int tries = 0;
		int x = scan.nextInt();
		int z = ranNumb(x);
		//System.out.println(z);
		System.out.println("Guess the number between 1-" + x);
		int y = scan.nextInt();
		while(c != true) {
			if(y == z) {
			System.out.println("You guessed correctly!");
			System.out.println("You win!");
			break;
		}
		else if(y != z && tries <3){
			tries++;
			System.out.println("You guessed incorrectly!");
			if(tries == 3) {
					System.out.println("The number was " + z);
					System.out.println("No more tries left! You Lose!");
					break;
				}
			else {
				System.out.println("Try again! Tries: " + tries);
			}
			System.out.println("Guess the number between 1-" + x);
			y = scan.nextInt();
			
			
		}
		
		}
		
	}
	public static int ranNumb(int x) {
		return (int)(Math.random()*x)+1;
	}
	
}
