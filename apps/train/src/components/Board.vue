<script setup>
import { computed } from 'vue'

const props = defineProps({
  size: { type: Number, default: 375 },
})

const PIECE_CDN = 'https://images.chesscomfiles.com/chess-themes/pieces/neo/150'

const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
const ranks = [8, 7, 6, 5, 4, 3, 2, 1]

const STARTING_POSITION = [
  { square: 'a8', type: 'br' }, { square: 'b8', type: 'bn' }, { square: 'c8', type: 'bb' }, { square: 'd8', type: 'bq' },
  { square: 'e8', type: 'bk' }, { square: 'f8', type: 'bb' }, { square: 'g8', type: 'bn' }, { square: 'h8', type: 'br' },
  { square: 'a7', type: 'bp' }, { square: 'b7', type: 'bp' }, { square: 'c7', type: 'bp' }, { square: 'd7', type: 'bp' },
  { square: 'e7', type: 'bp' }, { square: 'f7', type: 'bp' }, { square: 'g7', type: 'bp' }, { square: 'h7', type: 'bp' },
  { square: 'a2', type: 'wp' }, { square: 'b2', type: 'wp' }, { square: 'c2', type: 'wp' }, { square: 'd2', type: 'wp' },
  { square: 'e2', type: 'wp' }, { square: 'f2', type: 'wp' }, { square: 'g2', type: 'wp' }, { square: 'h2', type: 'wp' },
  { square: 'a1', type: 'wr' }, { square: 'b1', type: 'wn' }, { square: 'c1', type: 'wb' }, { square: 'd1', type: 'wq' },
  { square: 'e1', type: 'wk' }, { square: 'f1', type: 'wb' }, { square: 'g1', type: 'wn' }, { square: 'h1', type: 'wr' },
]

const squares = computed(() => {
  const result = []
  for (let rank of ranks) {
    for (let file of files) {
      result.push(`${file}${rank}`)
    }
  }
  return result
})

const isLightSquare = (square) => {
  const fileIndex = files.indexOf(square[0])
  const rankIndex = parseInt(square[1], 10) - 1
  return (fileIndex + rankIndex) % 2 === 1
}

const getPieceOnSquare = (square) => {
  return STARTING_POSITION.find(p => p.square === square)
}

const getPieceImage = (piece) => {
  return `${PIECE_CDN}/${piece.type}.png`
}
</script>

<template>
  <div class="board" :style="{ width: `${size}px`, height: `${size}px` }">
    <div
      v-for="square in squares"
      :key="square"
      class="square"
      :class="{ light: isLightSquare(square), dark: !isLightSquare(square) }"
    >
      <img
        v-if="getPieceOnSquare(square)"
        class="piece"
        :src="getPieceImage(getPieceOnSquare(square))"
        :alt="getPieceOnSquare(square).type"
        draggable="false"
      />
      <span v-if="square[1] === '1'" class="coord file-coord">{{ square[0] }}</span>
      <span v-if="square[0] === 'a'" class="coord rank-coord">{{ square[1] }}</span>
    </div>
  </div>
</template>

<style scoped>
.board {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  overflow: hidden;
}

.square {
  position: relative;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.square.dark {
  background: #779556;
}

.square.light {
  background: #EBECD0;
}

.piece {
  width: 100%;
  height: 100%;
  object-fit: contain;
  z-index: 1;
  user-select: none;
  pointer-events: none;
}

.coord {
  position: absolute;
  font-family: 'SF Pro Text', -apple-system, system-ui, sans-serif;
  font-size: 10px;
  font-weight: 600;
  pointer-events: none;
}

.file-coord {
  bottom: 2px;
  right: 3px;
}

.rank-coord {
  top: 2px;
  left: 3px;
}

.square.dark .coord {
  color: #EBECD0;
}

.square.light .coord {
  color: #779556;
}
</style>
