<template>
  <div class="login">
    <div class="input-field">
      <div class="intro">
        <h1>Hello.</h1>
        <h1>Welcome to Todo App</h1>
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
      <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
          <h5 v-bind="attrs" v-on="on">Forgot Password?</h5>
        </template>
        <v-card>
          <v-col class="popEmail">
            <v-text-field dark v-model="popEmail" label="Email"></v-text-field>
          </v-col>
          <v-card-actions>
            <v-btn dark color="warning" text @click="dialog = false">Cancel</v-btn>
            <v-spacer></v-spacer>
            <v-btn dark color="primary" text @click="pop">Send Reset Password Link</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <br />
      <br />
      <div class="buttons">
        <v-btn @click.prevent="login" class="btn-login" text>Login</v-btn>
        <br />
        <br />
        <v-btn to="/register" class="btn-reg" text>Create an Account</v-btn>
      </div>
      <v-snackbar v-model="snackbar">
        {{ message }}
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
      dialog: "",
      popEmail: "",
      message: "",
      snackbar: false
    };
  },
  methods: {
    login() {
      this.$store.commit("GET_LOGEMAIL", this.email);
      this.$store.commit("GET_LOGPASSWORD", this.password);
      this.email = "";
      this.password = "";
      const user = firebase
        .auth()
        .signInWithEmailAndPassword(
          this.$store.state.logEmail,
          this.$store.state.logPassword
        )
        .then(() => {
          console.log(user);
          this.$router.push({ name: "Todo" });
        })
        .catch(err => {
          console.log(err.message);
          this.message = err.message;
          this.snackbar = true;
        });
    },
    pop() {
      if (!this.popEmail) {
        return;
      } else {
        firebase
          .auth()
          .sendPasswordResetEmail(this.popEmail)
          .then(() => {
            console.log("Email Sent");
            this.message = "Email Sent";
            this.snackbar = true;
          })
          .catch(err => console.log(err));
        this.dialog = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#input-7 {
  border-bottom: 1px solid white;
}

.login {
  height: 80%;
  .into {
      text-align: center;
  }
  .input-field {
    margin-top: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h1 {
      font-family: "Lexend Deca", sans-serif;
      text-align: center;
    }
    h5 {
      margin-right: -250px;
      cursor: pointer;
    }
    .btn-login {
      width: 100%;
      font-family: "Lexend Deca", sans-serif;
    }
    .popEmail {
      width: 100%;
    }
    .btn-reg {
      color: darkgray;
      font-weight: 300;
      font-family: "Lexend Deca", sans-serif;
    }
  }
}
</style>


