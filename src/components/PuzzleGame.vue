<template>
  <div class="puzzle-game">
    <h2>Sliding Puzzle</h2>
    <div class="grid">
      <div
        v-for="(tile, index) in tiles"
        :key="index"
        :class="['tile', { empty: tile === '' }]"
        @click="moveTile(index)"
      >
        {{ tile }}
      </div>
    </div>

    <Button
      label="Shuffle"
      @click="shuffleTiles"
      class="p-button-raised p-button-info"
    />

    <Button
      label="Back to Figures"
      @click="toggleFigures"
      class="p-button-raised p-button-secondary"
    />

    <div v-if="isGameWon" class="winning-message">
      <span v-if="winningMessage === 'Fantastiskt!!'" class="fantastiskt">{{
        winningMessage
      }}</span>
      <span v-else>{{ winningMessage }}</span>
    </div>
  </div>
</template>

<script>
import Button from "primevue/button";

export default {
  components: {
    Button,
  },
  props: {
    toggleFigures: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      tiles: ["1", "2", "3", "4", "5", "6", "7", "8", ""],
      moveCount: 0,
      isGameWon: false,
      winningMessage: "",
    };
  },
  methods: {
    shuffleTiles() {
      this.tiles = this.tiles
        .map((tile) => ({ tile, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ tile }) => tile);
      this.moveCount = 0;
      this.isGameWon = false;
      this.winningMessage = "";
    },
    moveTile(index) {
      const emptyIndex = this.tiles.indexOf("");
      const rowSize = 3;

      const validMoves = [
        emptyIndex - rowSize,
        emptyIndex + rowSize,
        emptyIndex - 1,
        emptyIndex + 1,
      ];

      const sameRow =
        Math.floor(index / rowSize) === Math.floor(emptyIndex / rowSize);

      if (!sameRow && (index === emptyIndex - 1 || index === emptyIndex + 1)) {
        return;
      }

      if (validMoves.includes(index)) {
        console.log(
          `Moving tile at index ${index} to empty space at index ${emptyIndex}`
        );

        [this.tiles[emptyIndex], this.tiles[index]] = [
          this.tiles[index],
          this.tiles[emptyIndex],
        ];

        this.moveCount++;

        this.checkWin();
      } else {
        console.log("Invalid move");
      }
    },
    checkWin() {
      const winningTiles = ["1", "2", "3", "4", "5", "6", "7", "8", ""];
      if (this.tiles.toString() === winningTiles.toString()) {
        if (this.moveCount < 50) {
          this.winningMessage = "Fantastiskt!!";
        } else {
          this.winningMessage = "Bra gjort!";
        }
        this.isGameWon = true;
      }
    },
    toggleFigures() {
      this.toggleFigures();
    },
  },
};
</script>

<style scoped>
.puzzle-game {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: repeat(3, 100px);
  gap: 5px;
  margin-bottom: 20px;
}

.tile {
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  user-select: none;
}

.tile.empty {
  background-color: #fff;
  cursor: default;
}

.winning-message {
  font-size: 24px;
  font-weight: bold;
  margin-top: 20px;
  color: green;
}

.fantastiskt {
  font-size: 28px;
  font-weight: bold;
  background: linear-gradient(
    90deg,
    red,
    orange,
    yellow,
    green,
    blue,
    indigo,
    violet
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: glowing 1.5s infinite alternate;
}

@keyframes glowing {
  0% {
    text-shadow: 0 0 5px rgba(255, 0, 0, 0.7), 0 0 10px rgba(255, 0, 0, 0.5),
      0 0 15px rgba(255, 0, 0, 0.3);
  }
  100% {
    text-shadow: 0 0 10px rgba(255, 0, 255, 1), 0 0 20px rgba(255, 0, 255, 0.8),
      0 0 30px rgba(255, 0, 255, 0.5);
  }
}
</style>
