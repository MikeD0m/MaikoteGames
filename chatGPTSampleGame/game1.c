#include "raylib.h"

typedef struct Player {
    Vector2 position;
    int size;
    float speed;
} Player;

typedef struct Enemy {
    Vector2 position;
    int size;
    float speed;
} Enemy;

void UpdatePlayer(Player *p)
{
    if(IsKeyDown(KEY_RIGHT)) p->position.x += p->speed;
    if(IsKeyDown(KEY_LEFT)) p->position.x -= p->speed;
    if(IsKeyDown(KEY_UP)) p->position.y -= p->speed;
    if(IsKeyDown(KEY_DOWN)) p->position.y += p->speed;
}

void UpdateEnemy(Enemy *e)
{
    e->position.x += e->speed;
    e->position.y += e->speed;
    if(e->position.x > 760 || e->position.x < 0)
        e->speed *= -1;
    if(e->position.y > 760 || e-> position.y <0)
        e->speed *= -1;
}

int main()
{
    InitWindow(800,450,"Avoid the Enemy");

    Player player = {{400,200},40,4};
    Enemy enemy = {{100,100},40,3};

    int lives = 3;

    SetTargetFPS(60);

    while(!WindowShouldClose())
    {
        UpdatePlayer(&player);
        UpdateEnemy(&enemy);

        Rectangle playerRect = {player.position.x,player.position.y,player.size,player.size};
        Rectangle enemyRect = {enemy.position.x,enemy.position.y,enemy.size,enemy.size};

        if(CheckCollisionRecs(playerRect,enemyRect))
        {
            lives--;
            player.position = (Vector2){400,200};
        }

        BeginDrawing();
        ClearBackground(RAYWHITE);

        DrawRectangle(player.position.x,player.position.y,player.size,player.size,BLUE);
        DrawRectangle(enemy.position.x,enemy.position.y,enemy.size,enemy.size,RED);

        for(int i=0;i<lives;i++)
        {
            DrawCircle(30 + i*40,30,10,RED);
            DrawCircle(40 + i*40,30,10,RED);
            DrawTriangle(
                (Vector2){20 + i*40,30},
                (Vector2){50 + i*40,30},
                (Vector2){35 + i*40,50},
                RED
            );
        }

        if(lives <= 0)
        {
            DrawText("GAME OVER",300,200,40,BLACK);
        }

        EndDrawing();
    }

    CloseWindow();
}