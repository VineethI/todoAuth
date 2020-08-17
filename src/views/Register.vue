<template>
  <div class="register">
    <div class="input-field">
      <div class="intro">
        <h1>Register.</h1>
        <h1>Your Details</h1>
      </div>
      <br />
      <br />
      <v-col class="email" cols="12" md="4" lg="4" sm="6">
        <v-text-field v-model="email" label="Email"></v-text-field>
      </v-col>
      <v-col class="password" cols="12" md="4" lg="4" sm="6">
        <v-text-field
          v-model="password"
          @click:append="show = !show"
          :type="show ? 'text' : 'password'"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          label="Password"
        ></v-text-field>
      </v-col>
      <br />
      <div class="buttons">
        <v-btn @click.prevent="register" class="btn-register" text>Register</v-btn>
        <br />
        <br />
        <v-btn to="/" dark class="btn-log" text>CREATED? LOGIN</v-btn>
      </div>

      <v-snackbar v-model="snackbar">
        {{ error }}
        <template v-slot:action="{ attrs }">
          <v-btn dark text v-bind="attrs" @click="snackbar = false">Close</v-btn>
        </template>
      </v-snackbar>
    </div>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
export default {
  data() {
    return {
      show: false,
      email: "",
      password: "",
      snackbar: false,
      error: "",
    };
  },
  methods: {
    register() {
      this.$store.commit("GET_REGEMAIL", this.email);
      this.$store.commit("GET_REGPASSWORD", this.password);
      this.email = "";
      this.password = "";

      const user = firebase
        .auth()
        .createUserWithEmailAndPassword(
          this.$store.state.regEmail,
          this.$store.state.regPassword
        )
        .then(() => {
          console.log(user);
          this.$router.push({ name: "Todo" });
        })
        .catch(err => {
          console.log(err.message);
          this.error = err.message
          this.snackbar = true
        });
    }
  }
};
</script>

<style lang="scss">
.register {
  height: 80%;
  .input-field {
    margin-top: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .intro {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    h1 {
      font-family: "Lexend Deca", sans-serif;
      text-align: left;
    }
    .btn-register {
      width: 100%;
      font-family: "Lexend Deca", sans-serif;
    }
    .btn-log {
      color: darkgray;
      font-weight: 300;
      font-family: "Lexend Deca", sans-serif;
    }
  }
}
</style>