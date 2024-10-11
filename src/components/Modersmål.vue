<template>
  <div class="game-container">
    <h2 class="game-title">{{ difficultySelected ? "Välj rätt alternativ för det tomma fältet" : "Välj svårighetsgrad" }}</h2>

    <div v-if="!difficultySelected" class="difficulty-selection">
      <button id="lätt" @click="selectDifficulty('easy')">Lätt</button>
      <button id="svår" @click="selectDifficulty('hard')">Svår</button>
    </div>

    <div v-if="difficultySelected && currentSentenceIndex < sentences.length" class="sentence">
      <span v-if="!currentSentence.completed && !currentSentence.isWrong">
        {{ currentSentence.text.replace('___', '______') }}
      </span>
      <span v-else-if="currentSentence.completed" class="correct">
        {{ currentSentence.text.replace('___', currentSentence.correctWord) }}
      </span>
      <span v-else class="wrong">Fel!</span>

      <div class="options">
        <div
          v-for="(option, optionIndex) in currentSentence.options"
          :key="optionIndex"
          class="word-option"
          @click="selectWord(option, currentSentence)"
        >
          {{ option }}
        </div>
      </div>
    </div>

    <div class="feedback" v-if="feedbackMessage">{{ feedbackMessage }}</div>
    <div v-if="difficultySelected" class="score">Poäng: {{ score }} / {{ sentences.length }}</div>
    <SpaceShip v-if="difficultySelected" :score="score" :total="sentences.length" />

    <div v-if="currentSentenceIndex >= sentences.length">
      <button class="restart-button" @click="restartGame">Starta om spelet</button>
      <button class="back-button" @click="toggleFigures">Tillbaka till Meny</button>
    </div>
  </div>
</template>

<script>
import SpaceShip from './SpaceShip.vue';
export default {
  components: {
    SpaceShip,
  },
  props: {
    toggleFigures: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      sentences: [],
      easySentences: [
      { text: "Jag har ___ hund", correctWord: "en", options: ["en", "ett"], completed: false, isWrong: false },
      { text: "Det är ___ fint väder idag", correctWord: "mycket", options: ["mycke", "mycket"], completed: false, isWrong: false },
      { text: "Han äter ___ frukost", correctWord: "sin", options: ["sin", "sina"], completed: false, isWrong: false },
      { text: "Vi ser ___ film ikväll", correctWord: "en", options: ["en", "ett"], completed: false, isWrong: false },
      { text: "Jag vill ha ___ glass", correctWord: "en", options: ["en", "ett"], completed: false, isWrong: false },
    ],

      hardSentences: [
        { text: "Jag har ___ bok", correctWord: "en", options: ["en", "ett"], completed: false, isWrong: false },
        { text: "Hon springer ___ snabbt", correctWord: "väldigt", options: ["väldigt", "väldig"], completed: false, isWrong: false },
        { text: "Vi går till ___ butiken", correctWord: "den", options: ["den", "det"], completed: false, isWrong: false },
        { text: "Jag såg ___ igår", correctWord: "honom", options: ["honom", "han"], completed: false, isWrong: false },     
        { text: "De bor i ___ stort hus", correctWord: "ett", options: ["ett", "en"], completed: false, isWrong: false },
        { text: "Vi har inte läst ___ bok än", correctWord: "vår", options: ["vår", "vårt"], completed: false, isWrong: false },
        { text: "Jag åker till ___ hemstad imorgon", correctWord: "min", options: ["mitt", "min"], completed: false, isWrong: false }, 
        { text: "Vi har ___ bil", correctWord: "en", options: ["en", "ett"], completed: false, isWrong: false },
        { text: "De visste inte om de ___ glömt nycklarna hemma", correctWord: "hade", options: ["hade", "har"], completed: false, isWrong: false },    
        { text: "Hon har alltid ___ med sig", correctWord: "dem", options: ["dem", "de"], completed: false, isWrong: false }
      ],
      currentSentenceIndex: 0,
      score: 0,
      feedbackMessage: '',
      difficultySelected: false,
    };
  },
  computed: {
    currentSentence() {
      return this.sentences[this.currentSentenceIndex];
    },
  },
  methods: {
    selectDifficulty(difficulty) {
      this.difficultySelected = true;
      if (difficulty === 'easy') {
        this.sentences = [...this.easySentences];
      } else if (difficulty === 'hard') {
        this.sentences = [...this.hardSentences];
      }
    },
    selectWord(selectedWord, sentence) {
      if (!sentence.completed && !sentence.isWrong) {
        if (selectedWord === sentence.correctWord) {
          sentence.completed = true;
          this.score++;
          setTimeout(this.nextSentence, 2000);
        } else {
          sentence.isWrong = true;
          setTimeout(this.nextSentence, 2000);
        }
      }
    },
    nextSentence() {
      this.feedbackMessage = '';
      this.currentSentenceIndex++;
    },
    restartGame() {
      this.sentences.forEach(sentence => {
        sentence.completed = false;
        sentence.isWrong = false;
      });
      this.currentSentenceIndex = 0;
      this.score = 0;
      this.feedbackMessage = '';
      this.difficultySelected = false;
    },
    toggleFigures() {
      this.toggleFigures();
    },
  },
};
</script>

<style scoped>
.game-container {
  border-radius: 10px;
  padding: 20px;
  background-color: #0f0520db;
  width: 400px;
  max-width: 550px;
  margin: 20px auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  color: white;
  text-align: center;
}
.game-title {
  font-family: 'Orbitron', sans-serif;
  padding: 1vh;
  font-weight: 600;
  font-size: 20px;
  background: linear-gradient(to right, #14eef5, #952bff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
}
.sentence {
  font-size: 22px;
  margin-bottom: 15px;
}
.options {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
.word-option {
  padding: 10px 15px;
  border-radius: 5px;
  background-color: #7b55b8;
  margin: 0 10px;
  cursor: pointer;
  color: white;
}
.word-option:hover {
  background-color: #6e24e3;
}
.correct {
  color: #40df45;
  font-weight: bold;
}
.wrong {
  color: #de3838;
  font-weight: bold;
}
.feedback {
  margin-top: 10px;
  font-size: 16px;
}
.score {
  background: linear-gradient(to right, #14eef5, #952bff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  font-weight: 600;
  margin-top: 10px;
  font-size: 18px;
}
.restart-button {
  margin: 10px;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.restart-button:hover {
  background-color: #45a049;
}
.back-button {
  margin: 10px;
  padding: 10px;
  background-color: #2196F3;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.back-button:hover {
  background-color: #1E88E5;
}
.difficulty-selection {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
.difficulty-selection button {
  padding: 10px 20px;
  margin: 0 10px;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
}

#lätt {
  background-color: #4CAF50;
}
#svår {
  background-color: #2196F3;
}
.difficulty-selection button:hover {
  background-color: #6e24e3;
}
</style>
