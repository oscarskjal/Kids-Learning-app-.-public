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
    <button @click="shuffleTiles">Shuffle</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tiles: ["1", "2", "3", "4", "5", "6", "7", "8", ""],
    };
  },
  methods: {
    shuffleTiles() {
      this.tiles = this.tiles
        .map((tile) => ({ tile, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ tile }) => tile);
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
      } else {
        console.log("Invalid move");
      }
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
</style>
