<template>
    <div :style="{ minHeight: windowHeightMinusNavbarAndFooter + 'px' }" style="display: flex; flex-flow: column wrap; justify-content: center; align-content: center;">
        <div class="login-view">
        <div class="login-box shadow-lg p-3 mb-5 bg-body rounded">

            <!-- When user is not logged in -->
            <h2 v-if="!user" class="text-center mb-4 text-dark">Log In</h2>

            <!-- When user is logged in -->
            <h2 v-else class="text-center mb-4 text-danger">Logged In</h2>


            <!-- When user is not logged in -->
            <form v-if="!user" @submit.prevent="submitForm">
                <div class="mb-3">
                    <label for="username" class="form-label text-dark">Username</label>
                    <input type="text" class="form-control text-dark" id="username" v-model="username" required>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label text-dark">Password</label>
                    <input type="password" class="form-control" id="password" v-model="password" required>
                </div>
                <button type="submit" class="btn btn-primary w-100">Log In</button>
                <p class="text-danger text-center">{{ logInErrorMessege }}</p>
            </form>


            <!-- When user is logged in -->
            <form v-else @submit.prevent="submitForm" :style="styleWhenAlreadyLoggedIn">
                <div class="mb-3">
                    <label for="username" class="form-label text-dark">Username</label>
                    <input type="text" class="form-control text-dark" id="username" v-model="username" required>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label text-dark">Password</label>
                    <input type="password" class="form-control" id="password" v-model="password" required>
                </div>
                <button type="submit" class="btn btn-primary w-100" disabled>Log In</button>
            </form>



        </div>
    </div>
    <div class="new-user-box shadow-lg p-3 mb-5 bg-body rounded d-flex flex-column align-content-center justify-content-center" style="max-width: 500px;">
        <h2 class="text-center mb-4 text-dark">Create New User</h2>
        <form @submit.prevent="submitNewUserForm">
            <div class="mb-3">
                <label for="new-username" class="form-label text-dark">Username</label>
                <input type="text" class="form-control text-dark" id="new-username" v-model="newUser.username" required>
            </div>
            <div class="mb-3">
                <label for="new-password" class="form-label text-dark">Password</label>
                <input type="password" class="form-control" id="new-password" v-model="newUser.password" required>
            </div>
            <div class="mb-3">
                <label for="new-firstname" class="form-label text-dark">First Name</label>
                <input type="text" class="form-control text-dark" id="new-firstname" v-model="newUser.realFirstName" required>
            </div>
            <div class="mb-3">
                <label for="new-lastname" class="form-label text-dark">Last Name</label>
                <input type="text" class="form-control text-dark" id="new-lastname" v-model="newUser.realLastName" required>
            </div>
            <button type="submit" class="btn btn-primary w-100">Create User</button>
            <p class="text-danger text-center">{{ newUserErrorMessege }}</p>
        </form>
    </div>
    </div>
    
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import windowHeightMixin from '@/mixins/windowHeightMixin';

export default {
    name: 'LogInView',
    data() {
        return {
            username: '',
            password: '',
            newUserErrorMessege: '',
            logInErrorMessege: '',
            styleWhenAlreadyLoggedIn: "cursor:not-allowed; pointer-events:none;opacity:0.2;",
            newUser: {
                username: '',
                password: '',
                realFirstName: '',
                realLastName: ''
            }
        };
    },
    mixins: [windowHeightMixin],
    methods: {
        ...mapActions(['logIn', 'createUser']),
        async submitForm() {
            let goodLogIn = await this.logIn({ username: this.username, password: this.password });
            if(!goodLogIn) this.logInErrorMessege = "Wrong username or password";
            else this.logInErrorMessege = "";
        },
        async submitNewUserForm() {
            let goodCreation = await this.createUser(this.newUser);
            if(!goodCreation) this.newUserErrorMessege = "Something went wrong, try again";
            else this.newUserErrorMessege = "User created";
        },
    },
    computed: {
        ...mapGetters(['user'])
    }
};
</script>

<style scoped>
.login-view {
    
}

.login-box {
    width: 300px;
    background-color: darkblue;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.login-box:hover {
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
}

.login-box input:focus {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
</style>