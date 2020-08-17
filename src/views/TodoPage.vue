<template>
  <div class="todo">
    <div class="todoIntro">
      <h1>Enter Your Tasks.</h1>
    </div>
    <br />
    <div class="input">
      <v-text-field v-model="msg" class="task" label="Enter the Task"></v-text-field>
      <v-btn @click.prevent="addTodo" text>Add</v-btn>
    </div>
    <br />
    <br />
    <br />
    <v-card class="card ma-auto mb-5" v-for="(todoList, todoIndex) in todos" :key="todoIndex">
      <v-card-text>
        <div class="cardText">
          <p>{{todoList.todo}}</p>
          <v-spacer></v-spacer>
          <v-btn @click="deleteTodo(todoIndex)" icon>
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
export default {
  data() {
    return {
      msg: "",
      todos: ""
    };
  },
  methods: {
    addTodo() {
      var userId = firebase.auth().currentUser.uid;
      console.log(userId);
      this.$store.commit("GET_TODO", this.msg);
      firebase
        .database()
        .ref(userId)
        .push({
          todo: this.$store.state.todo
        })
        .then(data => console.log(data))
        .catch(err => console.log(err));
      this.msg = "";
    },
    deleteTodo(index) {
      firebase
        .database()
        .ref(firebase.auth().currentUser.uid + "/" + index)
        .remove();
    }
  },
  created() {
    firebase
      .database()
      .ref(firebase.auth().currentUser.uid)
      .on("value", snapshot => {
        this.todos = snapshot.val();
      });
  }
};
</script>

<style lang="scss" scoped>
.todo {
  .todoIntro {
    width: 50%;
    margin: auto;
    h1 {
      font-family: "Lexend Deca", sans-serif;
      text-align: center;
    }
  }
  .input {
    width: 50%;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    .task {
      width: 40%;
    }
  }
  .card {
    width: 50%;
    .cardText {
      display: flex;
      p {
        margin: auto;
        margin-bottom: none;
      }
    }
  }
}
</style>