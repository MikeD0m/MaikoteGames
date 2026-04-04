#include "raylib.h"

#define SCREEN_WIDTH 800
#define SCREEN_HEIGHT 450

typedef enum GameState {
    STATE_MENU,
    STATE_PLAYING,
    STATE_PAUSED
} GameState;

typedef struct Player {
    Vector2 position;
    float speed;
    int size;
} Player;

void UpdatePlayer(Player *player)
{
    if (IsKeyDown(KEY_RIGHT)) player->position.x += player->speed;
    if (IsKeyDown(KEY_LEFT))  player->position.x -= player->speed;
    if (IsKeyDown(KEY_UP))    player->position.y -= player->speed;
    if (IsKeyDown(KEY_DOWN))  player->position.y += player->speed;

    if (player->position.x < 0) player->position.x = 0;
    if (player->position.y < 0) player->position.y = 0;

    if (player->position.x > SCREEN_WIDTH - player->size)
        player->position.x = SCREEN_WIDTH - player->size;

    if (player->position.y > SCREEN_HEIGHT - player->size)
        player->position.y = SCREEN_HEIGHT - player->size;
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

int main(void)
{
    InitWindow(SCREEN_WIDTH, SCREEN_HEIGHT, "Simple C Game Example");

    SetTargetFPS(60);

    GameState currentState = STATE_MENU;

    Player player;
    player.position = (Vector2){400, 200};
    player.speed = 4.0f;
    player.size = 40;

    int score = 0;

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

            if (IsKeyPressed(KEY_P))
            {
                currentState = STATE_PAUSED;
            }

            score++;
        }
        else if (currentState == STATE_PAUSED)
        {
            if (IsKeyPressed(KEY_P))
            {
                currentState = STATE_PLAYING;
            }
        }

        BeginDrawing();
        ClearBackground(RAYWHITE);

        if (currentState == STATE_MENU)
        {
            DrawText("SIMPLE C GAME", 300, 150, 30, BLACK);
            DrawText("Press ENTER to Start", 280, 220, 20, DARKGRAY);
        }
        else if (currentState == STATE_PLAYING)
        {
            DrawPlayer(player);

            DrawText("Move with arrow keys", 10, 10, 20, DARKGRAY);
            DrawText("Press P to Pause", 10, 40, 20, DARKGRAY);

            DrawText(TextFormat("Score: %d", score),
                     650, 10, 20, BLACK);
        }
        else if (currentState == STATE_PAUSED)
        {
            DrawPlayer(player);

            DrawRectangle(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT,
                          Fade(BLACK, 0.5f));

            DrawText("PAUSED", 350, 200, 30, WHITE);
            DrawText("Press P to Resume", 300, 250, 20, WHITE);
        }

        EndDrawing();
    }

    CloseWindow();

    return 0;
}