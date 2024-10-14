<template>
    <div id="math-game"></div>
    <h1>Matematik Spel</h1>
    <div id="games-container">
      <div id="game1-container">
        <h2>Beräkna</h2>
        <label for="difficulty">Svårighet:</label>
        <select v-model="difficulty" @change="generateProblem">
          <option value="easy">Lätt</option>
          <option value="medium">Medium</option>
          <option value="hard">Svår</option>
        </select>
  
        <div id="problem">{{ problem1 }}</div>
        <input type="number" v-model="userAnswer1" placeholder="Ange ditt svar" />
        <button @click="submitAnswer">Beräkna</button>
  
        <div id="score">Poäng: {{ scoreGame1 }}</div>
        <div id="feedback1" class="feedback" :class="feedback1.class">{{ feedback1.text }}</div>

      </div>
  
      <br />
  
      <div id="game2-container">
        <h2>Flerval</h2>
        <label for="difficulty2">Svårighet:</label>
        <select v-model="difficulty2" @change="generateMultipleChoiceProblem">
          <option value="easy">Lätt</option>
          <option value="medium">Medium</option>
          <option value="hard">Svår</option>
        </select>
  
        <div id="problem2">{{ problem2 }}</div>
        <div id="options">
          <button v-for="(option, index) in multipleChoiceOptions" :key="index" @click="submitMultipleChoiceAnswer(index)">
            {{ option }}
          </button>
        </div>
  
        <div id="score2">Poäng: {{ scoreGame2 }}</div>
        <div id="feedback2" class="feedback" :class="feedback2.class">{{ feedback2.text }}</div>
      </div>
    </div>
    <button class="back-button" @click="toggleFigures">Tillbaka till Meny</button>
  </template>
  
  <script>
  export default {

    props: ['toggleFigures'],

    data() {
      return {
        // Spel 1
        difficulty: 'easy',
        problem1: 'Laddar...',
        num1: null,
        num2: null,
        operation: '',
        correctAnswerGame1: null,
        userAnswer1: null,
        scoreGame1: 0,
        feedback1: '',
  
        // Spel 2
        difficulty2: 'easy',
        problem2: 'Laddar...',
        correctAnswerGame2: null,
        scoreGame2: 0,
        feedback2: '',
        multipleChoiceOptions: [],
      };
    },
    methods: {
      // Spel 1: Generera problem
      generateProblem() {
        this.num1 = Math.floor(Math.random() * 10) + 1;
        this.num2 = Math.floor(Math.random() * 10) + 1;
  
        if (this.difficulty === 'easy') {
          this.operation = ['+', '-'][Math.floor(Math.random() * 2)];
        } else if (this.difficulty === 'medium') {
          this.operation = ['+', '-', '*'][Math.floor(Math.random() * 3)];
        } else if (this.difficulty === 'hard') {
          this.operation = ['+', '-', '*', '/'][Math.floor(Math.random() * 4)];
          if (this.operation === '/') {
            this.num1 = this.num1 * this.num2; // För att få heltalsdivision
          }
        }
  
        this.problem1 = `${this.num1} ${this.operation} ${this.num2}`;
        this.calculateCorrectAnswerGame1();
        this.userAnswer1 = '';
      },
      // Beräkna det korrekta svaret för spel 1
      calculateCorrectAnswerGame1() {
        if (this.operation === '+') {
          this.correctAnswerGame1 = this.num1 + this.num2;
        } else if (this.operation === '-') {
          this.correctAnswerGame1 = this.num1 - this.num2;
        } else if (this.operation === '*') {
          this.correctAnswerGame1 = this.num1 * this.num2;
        } else if (this.operation === '/') {
          this.correctAnswerGame1 = Math.floor(this.num1 / this.num2);
        }
      },
      // Kontrollera användarens svar för spel 1
      submitAnswer() {
        const userAnswer = parseInt(this.userAnswer1);
        if (isNaN(userAnswer)) {
          this.feedback1 = {
            text: 'Mata in ett giltigt nummer',
            class: 'wrong-feedback' // Felmeddelande
        };
          return;
        }
  
        if (userAnswer === this.correctAnswerGame1) {
          this.scoreGame1++;
          this.feedback1 = {
            text: 'Rätt!',
            class: 'correct-feedback' // Rätt svar
        };
        } else {
          this.feedback1 = {
            text: `Fel, rätt svar är ${this.correctAnswerGame1}`,
            class: 'wrong-feedback' // Fel svar
        };
        }

        this.generateProblem(); // Generera nytt problem
      },
  
      // Spel 2: Generera flervalsproblem
      generateMultipleChoiceProblem() {
        this.num1 = Math.floor(Math.random() * 10) + 1;
        this.num2 = Math.floor(Math.random() * 10) + 1;
  
        if (this.difficulty2 === 'easy') {
          this.operation = ['+', '-'][Math.floor(Math.random() * 2)];
        } else if (this.difficulty2 === 'medium') {
          this.operation = ['+', '-', '*'][Math.floor(Math.random() * 3)];
        } else if (this.difficulty2 === 'hard') {
          this.operation = ['+', '-', '*', '/'][Math.floor(Math.random() * 4)];
          if (this.operation === '/') {
            this.num1 = this.num1 * this.num2;
          }
        }
  
        this.problem2 = `${this.num1} ${this.operation} ${this.num2}`;
        this.calculateCorrectAnswerGame2();
        this.generateMultipleChoiceOptions();
        
      },
      // Beräkna det korrekta svaret för spel 2
      calculateCorrectAnswerGame2() {
        if (this.operation === '+') {
          this.correctAnswerGame2 = this.num1 + this.num2;
        } else if (this.operation === '-') {
          this.correctAnswerGame2 = this.num1 - this.num2;
        } else if (this.operation === '*') {
          this.correctAnswerGame2 = this.num1 * this.num2;
        } else if (this.operation === '/') {
          this.correctAnswerGame2 = Math.floor(this.num1 / this.num2);
        }
      },
      // Generera flervalsalternativ
      generateMultipleChoiceOptions() {
        const wrongAnswers = [];
        while (wrongAnswers.length < 3) {
          const wrongAnswer = Math.floor(Math.random() * 20);
          if (wrongAnswer !== this.correctAnswerGame2 && !wrongAnswers.includes(wrongAnswer)) {
            wrongAnswers.push(wrongAnswer);
          }
        }
  
        this.multipleChoiceOptions = [this.correctAnswerGame2, ...wrongAnswers];
        this.multipleChoiceOptions.sort(() => Math.random() - 0.5);
      },
      // Kontrollera det valda svaret i spel 2
      submitMultipleChoiceAnswer(index) {
    const selectedAnswer = this.multipleChoiceOptions[index];
    if (selectedAnswer === this.correctAnswerGame2) {
        this.scoreGame2++;
        this.feedback2 = {
            text: 'Rätt!',
            class: 'correct-feedback' // Rätt svar
        };
    } else {
        this.feedback2 = {
            text: `Fel, rätt svar är ${this.correctAnswerGame2}`,
            class: 'wrong-feedback' // Fel svar
        };
    }

    this.generateMultipleChoiceProblem(); // Generera nytt problem
},
    },
    mounted() {
      this.generateProblem();
      this.generateMultipleChoiceProblem();
    },
  };
  </script>
  
  <style scoped>
  

h1 {
  font-family: 'Oswald';
  background: -webkit-linear-gradient(#4CAF50, #ff5733);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 70px;
  margin-bottom: 0px;
}


#games-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}

#game1-container, #game2-container {
    background-color: rgba(255, 255, 255, 0.849); /* Semi-transparent bakgrund */
    border: none;
    border-radius: 15px;
    padding: 20px;
    margin: 20px;
    max-width: 400px;
    box-shadow: none;
}

h2 {
  font-family: 'Comic Sans MS', cursive, sans-serif;
    color: #4CAF50;
    font-size: 2em;
}

#problem, #problem2 {
    font-size: 1.5em;
    margin: 10px 0;
    color: #007BFF;
}

input[type="number"] {
    padding: 10px;
    font-size: 1.5em;
    width: 80%;
    border: 2px solid #007BFF; 
    border-radius: 5px;
    margin-bottom: 10px;
    background-color: white;
    color: black; 
}


button {
    background-color: #ff5733;
    color: white;
    padding: 10px 20px;
    font-size: 1.5em;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin: 10px;
}

button:hover {
    background-color: #ffcc00;
}

.back-button {
  background-color: #ff5733;
  color: white;
  padding: 10px 20px;
  font-size: 1.5em;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 10px;
}

.back-button:hover {
  background-color: #ffcc00;
}



#score, #score2 {
  font-family: 'Comic Sans MS', cursive, sans-serif;
    font-size: 1.5em;
    margin: 10px 0;
    color: #4CAF50;
}

.feedback {
    font-size: 1.5em;
    margin: 10px 0;
}

.correct-feedback {
    color: darkgreen;
}

.wrong-feedback {
    color: red; 
}

select {
    padding: 10px;
    font-size: 1.5em;
    border: 2px solid #007BFF;
    border-radius: 5px;
    background-color: white;
    color: #333;
    margin-bottom: 20px;
    width: 80%;
    appearance: none;
    cursor: pointer;
    transition: background-color 0.3s, border-color 0.3s;
}

select:hover {
    background-color: #f0f0f0;
    border-color: #4CAF50;
}

select option {
    font-size: 1.5em;
    color: #333;
}

label {
    font-size: 1.5em;
    margin-bottom: 10px;
    display: block;
    color: #007BFF;
}

/* Responsiv design för tablet */
@media (min-width: 600px) and (max-width: 800px) {
    body {
        padding: 40px;
    }

    #game1-container, #game2-container {
        max-width: 70%;
        padding: 30px;
    }

    h1 {
        font-size: 3em;
    }

    h2 {
        font-size: 2.2em;
    }

    input[type="number"], button {
        font-size: 1.5em;
    }
}

@media (max-width: 600px) {
    select {
        font-size: 1.2em;
        width: 100%;
    }

    label {
        font-size: 1.2em;
    }
}
</style>

  
  