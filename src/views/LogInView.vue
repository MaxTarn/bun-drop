<template>
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
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'LogInView',
    data() {
        return {
            username: '',
            password: '',
            styleWhenAlreadyLoggedIn: "cursor:not-allowed; pointer-events:none;opacity:0.2;"
        };
    },
    methods: {
        ...mapActions(['logIn']),
        async submitForm() {
            await this.logIn({ username: this.username, password: this.password });
        }
    },
    computed: {
        ...mapGetters(['user'])
    }
};
</script>

<style scoped>
.login-view {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.05);
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