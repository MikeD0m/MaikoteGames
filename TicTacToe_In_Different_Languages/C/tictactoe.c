#include <stdio.h>
void displayBoard(char x[]);
int checkWin(char x[]);
int playerTurn(char x[], int turn);
char p1 = 'X';
char p2 = 'O';
int main(){
    printf("Welcome to Tic Tac Toe on C!!!\n Player 1 is X\n Player 2 is O\n");
    int turn = 0;
    char x[9] = {'1','2','3','4','5','6','7','8','9'};
    for(int i = 0; i<9; i++){
        displayBoard(x);
        turn += 1;
        playerTurn(x,turn);
        if(playerTurn == -1)
        displayBoard(x);
        checkWin(x);
    }
     printf("Draw!!!\n");
}
void displayBoard(char x[]){
    int count = 0;
    
    for(int i = 0; i<9; i++){
        count+= 1;
        printf("|");
        printf("%c", x[i]);
        if(count == 3){
            count = 0;
            printf("|");
            printf("\n");
        }
    }
}
int checkWin(char x[]){
        if((x[0] == p1 &&  x[1] == p1 && x[2] == p1) || 
        (x[0] == p1 &&  x[4] == p1 && x[8] == p1)
        || (x[3] == p1 &&  x[4] == p1 && x[5] == p1)
        || (x[6] == p1 &&  x[7] == p1 && x[8] == p1) || 
        (x[0] == p1 &&  x[3] == p1 && x[6] == p1) || 
        (x[1] == p1 &&  x[4] == p1 && x[7] == p1)
        || (x[2] == p1 &&  x[5] == p1 && x[8] == p1)
        || (x[6] == p1 &&  x[4] == p1 && x[2] == p1)){
            printf("Player 1 Wins!!!");
            return 1;
        }
        if((x[0] == p2 &&  x[1] == p2 && x[2] == p2) || 
        (x[0] == p2 &&  x[4] == p2 && x[8] == p2)
        || (x[3] == p2 &&  x[4] == p2 && x[5] == p2)
        || (x[6] == p2 &&  x[7] == p2 && x[8] == p2) || 
        (x[0] == p2 &&  x[3] == p2 && x[6] == p2) || 
        (x[1] == p2 &&  x[4] == p2 && x[7] == p2)
        || (x[2] == p2 &&  x[5] == p2 && x[8] == p2)
        || (x[6] == p2 &&  x[4] == p2 && x[2] == p2)){
            printf("Player 2 Wins!!!");
            return 1;
        }
        else{
            return 0;
        }
    
}
int playerTurn(char x[], int turn){
    int player = 2;
    char playerChoice;
    if(turn %2 != 0){
        player = 1;
    }
    printf("Turn %d: Player %d goes! Choose an open space!\n", turn, player);
    scanf("%c", &playerChoice);
    for(int i = 0; i < 9; i++){
        if(playerChoice == x[i]){
            if(player == 1){
                x[i] = p1;
                return 1;
            }
            else{
                x[i] = p2;
                return 2;
            }
        }
    }
    printf("Space %c is occupied! Choose another space!!!\n", playerChoice);
    return -1;
}
