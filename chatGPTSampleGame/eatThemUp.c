#include "raylib.h"
#include "stdlib.h"
#include "time.h"

#define SCREEN_WIDTH 800
#define SCREEN_HEIGHT 450

typedef enum GameState {
    STATE_MENU,
    STATE_PLAYING,
    STATE_PAUSED,
    STATE_GAME_OVER
} GameState;

typedef struct Player {
    Vector2 position;
    float speed;
    int size;
} Player;

typedef struct Fruit {
    Vector2 position;
    int size;
    bool isGreen;
    bool isEaten;
    float ySpeed;
    float xSpeed;
} Fruit;

void UpdatePlayer(Player *player)
{
    if (IsKeyDown(KEY_D)) player->position.x += player->speed;
    if (IsKeyDown(KEY_A))  player->position.x -= player->speed;
    if (IsKeyDown(KEY_W))    player->position.y -= player->speed;
    if (IsKeyDown(KEY_S))  player->position.y += player->speed;

    if (player->position.x < 0) player->position.x = 0;
    if (player->position.y < 0) player->position.y = 0;

    if (player->position.x > SCREEN_WIDTH - player->size)
        player->position.x = SCREEN_WIDTH - player->size;

    if (player->position.y > SCREEN_HEIGHT - player->size)
        player->position.y = SCREEN_HEIGHT - player->size;
}

void UpdateFruit(Fruit *f)
{
    f->position.x += f->xSpeed;
    f->position.y += f->ySpeed;

    if (f->position.x < 0) {
        f->position.x = 0;
        f->xSpeed *= -1;
    }
    if (f->position.y < 0) {
        f->position.y = 0;
        f->ySpeed *= -1;
    }
    if (f->position.x > SCREEN_WIDTH - f->size){
        f->position.x = SCREEN_WIDTH - f->size;
        f->xSpeed *= -1;
    }
        

    if (f->position.y > SCREEN_HEIGHT - f->size){
        f->position.y = SCREEN_HEIGHT - f->size;
        f->ySpeed *= -1;
    }
        
}


void DrawPlayer(Player player)
{
    DrawRectangle(
        (int)player.position.x,
        (int)player.position.y,
        player.size,
        player.size,
        BLUE
    );
}

void DrawFruit(Fruit f){
    if(f.isEaten) return;
    DrawRectangle(
        (int)f.position.x,
        (int)f.position.y,
        f.size,
        f.size,
        f.isGreen ? GREEN : DARKGREEN
    );
}

float random_float_range(float min, float max) {
    return min + (float)rand() / ((float)RAND_MAX / (max - min));
}

int main(void)
{

    //add timer
    float gfTimer = 0.0f;
    float gfSpawnDelay = 6.5f;

    float dgfTimer = 0.0f;
    float dgfSpawnDelay = 6.5f;

    InitWindow(SCREEN_WIDTH, SCREEN_HEIGHT, "Eat Them Up!");

    srand(time(NULL));
    //Random speed values
    float min_val = 2.0f;
    float max_val = 10.0f;
    float rX1 = random_float_range(min_val, max_val);
    int rY1 = random_float_range(min_val, max_val);
    int rX2 = random_float_range(min_val, max_val);
    int rY2 = random_float_range(min_val, max_val);

    SetTargetFPS(60);

    GameState currentState = STATE_MENU;

    //Backend for objects on screen
    Player player;
    player.position = (Vector2){400, 200};
    player.speed = 4.0f;
    player.size = 40;

    Fruit gf, dgf;
    gf.position = (Vector2){100, 100};
    gf.xSpeed = rX1;
    gf.ySpeed = rY1;
    gf.size = 40;
    gf.isGreen = true;

    dgf.position = (Vector2){600, 100};
    dgf.xSpeed = rX2;
    dgf.ySpeed = rY2;
    dgf.size = 40;
    dgf.isGreen = false;

    //Lives and Score
    int lives = 3;
    int score = 0;

    //Front end for objects on screen
    Rectangle playerRec = {player.position.x, player.position.y, player.size, player.size};
    Rectangle gfRec = {gf.position.x, gf.position.y, gf.size, gf.size};
    Rectangle dgfRec = {dgf.position.x, dgf.position.y, dgf.size, dgf.size};

    while (!WindowShouldClose())
    {
        if (currentState == STATE_MENU)
        {
            if (IsKeyPressed(KEY_ENTER))
            {
                currentState = STATE_PLAYING;
            }
        }
        else if (currentState == STATE_PLAYING)
        {
            UpdatePlayer(&player);
            if(!gf.isEaten) UpdateFruit(&gf);
            if(!dgf.isEaten) UpdateFruit(&dgf);
            
            gfTimer += GetFrameTime();
            dgfTimer += GetFrameTime();

            playerRec = (Rectangle){player.position.x, player.position.y, player.size, player.size};
            gfRec = (Rectangle){gf.position.x, gf.position.y, gf.size, gf.size};
            dgfRec = (Rectangle){dgf.position.x, dgf.position.y, dgf.size, dgf.size};

            if (gf.isEaten && gfTimer >= gfSpawnDelay)
            {
                gf.position.x = GetRandomValue(0, SCREEN_WIDTH - gf.size);
                gf.position.y = GetRandomValue(0, SCREEN_HEIGHT - gf.size);

                gf.isEaten = false;

                gfTimer = 0.0f;
            }
            if (dgf.isEaten && dgfTimer >= dgfSpawnDelay)
            {
                dgf.position.x = GetRandomValue(0, SCREEN_WIDTH - dgf.size);
                dgf.position.y = GetRandomValue(0, SCREEN_HEIGHT - dgf.size);

                dgf.isEaten = false;

                dgfTimer = 0.0f;
            }

            if (IsKeyPressed(KEY_P))
            {
                currentState = STATE_PAUSED;
            }

            //score++;
            if(CheckCollisionRecs(playerRec,gfRec) && !gf.isEaten)
            {
                score += 100;
                //player.position = (Vector2){400,200};
                gf.isEaten = true;
            }
            if(CheckCollisionRecs(playerRec, dgfRec) && !dgf.isEaten){
                lives -= 1;
                //player.position = (Vector2){400,200};
                dgf.isEaten = true;
            }

            if(lives == 0){
                currentState = STATE_GAME_OVER;
            }
        }
        else if (currentState == STATE_PAUSED)
        {
            if (IsKeyPressed(KEY_P))
            {
                currentState = STATE_PLAYING;
            }
        }
        else if (currentState == STATE_GAME_OVER){
            if (IsKeyPressed(KEY_R))
            {
                currentState = STATE_MENU;
                score = 0;
                lives = 3;
                player.position = (Vector2){400, 200};
            }
        }

        BeginDrawing();
        ClearBackground(RAYWHITE);

        if (currentState == STATE_MENU)
        {
            DrawText("EAT THEM UP!", 150, 150, 75, BLACK);
            DrawText("EAT THE GREEN FRUIT!", 250, 220, 25, GREEN);
            DrawText("AVOID THE DARK GREEN FRUIT!", 250, 240, 25, DARKGREEN);
            DrawText("Press ENTER to Start", 300, 260, 20, DARKGRAY);
            DrawText("Press ESC to Exit", 300, 280, 20, DARKGRAY);
        }
        else if (currentState == STATE_PLAYING)
        {
            //Draw objects in world
            DrawPlayer(player);
            DrawFruit(gf);
            DrawFruit(dgf);

            //Draw instructions to top left of screen
            DrawText("Move with WASD", 10, 10, 20, DARKGRAY);
            DrawText("Press P to Pause", 10, 30, 20, DARKGRAY);
            DrawText("Press ESC to Exit", 10, 55, 20, DARKGRAY);

            //Draw score and lives to top right of screen
            DrawText(TextFormat("Lives:"),
                     575, 10, 20, BLACK);
            for(int i = 0; i < lives; i++){
                DrawCircle(650 + i*40,15,15,RED);
            }
            DrawText(TextFormat("Score: %d", score),
                     650, 40, 20, BLACK);
        }
        else if (currentState == STATE_PAUSED)
        {
            DrawPlayer(player);

            DrawRectangle(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT,
                          Fade(BLACK, 0.5f));

            DrawText("PAUSED", 350, 200, 30, WHITE);
            DrawText("Press P to Resume", 300, 250, 20, WHITE);
        }

        else if (currentState == STATE_GAME_OVER){
            DrawPlayer(player);

            DrawRectangle(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT,
                          BLACK);

            DrawText("GAME OVER!!!", 50, 100, 100, WHITE);
            DrawText(TextFormat("Final Score: %d", score), 300, 200, 25, WHITE);
            DrawText("Press R to Reset", 300, 300, 20, WHITE);
        }

        EndDrawing();
    }

    CloseWindow();

    return 0;
}