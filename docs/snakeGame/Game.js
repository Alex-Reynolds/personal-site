import { Snake } from './Snake.js';

export function Game() {
    this.gameState = 0;
    this.score = 0;
    this.snake = new Snake();

    this.render = function() {
        switch (this.gameState) {
            case 0:
            this.renderMenu();
            break;
            case 1:
            this.renderGame();
            break;
            case 2:
            this.renderGameOver();
            break;
        }
    };

    this.renderMenu = function() {
        this.snake = new Snake();
        background(0, 0, 0);
        fill(40, 200, 40);
        textSize(30);
        text("SNAKE GAME", 100, 100, 300, 100);
        textSize(15);
        text("click box to start", 150, 150);
        color(255, 255, 255);
        rect(180, 180, 40, 40);

        if (mouseIsPressed && mouseX > 180 && mouseX < 220 && mouseY > 180 && mouseY < 220) {
            this.gameState = 1;
            this.snake.addLength(5);
            this.snake.spawnFood();
        }
    };

    this.renderGame = function() {
        background(200, 200, 200);
        fill(60, 60, 60);
        this.snake.updateSnake(mouseX, mouseY);
        this.snake.printBody();
        this.snake.renderFood();
        this.snake.attemptEat();
        if(this.snake.checkSelfEat()){
            this.gameState = 2;
            this.renderGameOver();
        }
    };

    this.renderGameOver = function() {
        background(0, 0, 0);
        fill(40, 200, 40);
        textSize(30);
        text(("Game Over!! Score: " + this.snake.queue.length), 100, 100, 300, 100);
        textSize(15);
        text("back to menu", 150, 150);
        color(255, 255, 255);
        rect(180, 250, 40, 40);

        if (mouseIsPressed && mouseX > 180 && mouseX < 220 && mouseY > 250 && mouseY < 290) {
            this.gameState = 0;
        }
    };
}
