<script>
import useVuelidate from '@vuelidate/core';
import {
  required,
  helpers
} from "@vuelidate/validators";
import apiService from '@/services/api';

import {
  authMethods,
  authFackMethods,
  notificationMethods,
} from "@/state/helpers";


export default {
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      username: "admin",
      password: "admin123",
      submitted: false,
      authError: null,
      tryingToLogIn: false,
      isAuthError: false,
      processing: false,
    };
  },
  validations: {
    username: {
      required: helpers.withMessage("Username is required", required),
    },
    password: {
      required: helpers.withMessage("Password is required", required),
    },
  },
  computed: {

  },
  methods: {
    ...authMethods,
    ...authFackMethods,
    ...notificationMethods,

    // Try to log the user in with the username and password
    async tryToLogIn() {
      console.log('🚀 Starting login process...');
      this.processing = true;
      this.submitted = true;
      
      // Validate form
      this.v$.$touch();
      if (this.v$.$invalid) {
        console.log('❌ Form validation failed');
        this.processing = false;
        return;
      }

      try {
        this.tryingToLogIn = true;
        this.authError = null;
        this.isAuthError = false;

        console.log('📡 Calling API with:', { username: this.username });
        
        // Call our API service
        const result = await apiService.login(this.username, this.password);
        
        console.log('📥 API Response:', result);
        
        if (result.token && result.user) {
          console.log('✅ Login successful! Redirecting...');
          
          // Store user data
          localStorage.setItem('user', JSON.stringify(result.user));
          localStorage.setItem('username', result.user.username);
          localStorage.setItem('role', result.user.role);
          
          this.tryingToLogIn = false;
          this.processing = false;
          
          // Check for redirect parameter
          const redirectPath = this.$route.query.redirect || '/overview/dashboard';
          console.log('🔄 Redirecting to:', redirectPath);
          
          // Use router push if possible, otherwise hard navigation
          if (redirectPath.startsWith('http')) {
            window.location.href = redirectPath;
          } else {
            this.$router.push(redirectPath);
          }
        } else {
          throw new Error('Login failed - no token received');
        }
      } catch (error) {
        console.error('❌ Login error:', error);
        this.tryingToLogIn = false;
        this.processing = false;
        this.authError = error.message || 'Login failed. Please check your credentials.';
        this.isAuthError = true;
      }
    },
  },
};
</script>

<template>
  <div class="auth-page-wrapper pt-5">
    <div class="auth-one-bg-position auth-one-bg" id="auth-particles">
      <div class="bg-overlay"></div>

      <div class="shape">

        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 1440 120">
          <path d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"></path>
        </svg>
      </div>
    </div>

    <div class="auth-page-content">
      <BContainer>
        <BRow>
          <BCol lg="12">
            <div class="text-center mt-sm-5 mb-4 text-white-50">
              <div>
                <router-link to="/" class="d-inline-block auth-logo">
                  <span class="logo-text" style="--logo-text-size: 24px;">ZENZERO</span>
                </router-link>
              </div>
              <p class="mt-3 fs-15 fw-medium">
                CSK-INNOVATE IoT Platform - Wastewater Treatment Monitoring
              </p>
            </div>
          </BCol>
        </BRow>

        <BRow class="justify-content-center">
          <BCol md="8" lg="6" xl="5">
            <BCard no-body class="mt-4">
              <BCardBody class="p-4">
                <div class="text-center mt-2">
                  <h5 class="text-primary">Welcome Back !</h5>
                  <p class="text-muted">Sign in to continue to CSK-INNOVATE IoT.</p>
                </div>
                <div class="p-2 mt-4">
                  <BAlert v-if="isAuthError && authError" variant="danger" class="mt-3" dismissible @close="authError = null; isAuthError = false">
                    {{ authError }}
                  </BAlert>

                  <form @submit.prevent="tryToLogIn">
                    <div class="mb-3">
                      <label for="username" class="form-label">Username</label>
                      <input 
                        type="text" 
                        class="form-control" 
                        :class="{ 'is-invalid': submitted && v$.username.$error }"
                        id="username" 
                        placeholder="Enter username" 
                        v-model="username" 
                      />
                      <div class="invalid-feedback" v-if="submitted && v$.username.$error">
                        <span v-for="error in v$.username.$errors" :key="error.$uid">{{ error.$message }}</span>
                      </div>
                    </div>

                    <div class="mb-3">
                      <div class="float-end">
                        <router-link to="/forgot-password" class="text-muted">Forgot
                          password?</router-link>
                      </div>
                      <label class="form-label" for="password-input">Password</label>
                      <div class="position-relative auth-pass-inputgroup mb-3">
                        <input 
                          type="password" 
                          v-model="password" 
                          class="form-control pe-5" 
                          :class="{ 'is-invalid': submitted && v$.password.$error }"
                          placeholder="Enter password"
                          id="password-input" 
                        />
                        <BButton variant="link" class="position-absolute end-0 top-0 text-decoration-none text-muted"
                          type="button" id="password-addon">
                          <i class="ri-eye-fill align-middle"></i>
                        </BButton>
                        <div class="invalid-feedback d-block" v-if="submitted && v$.password.$error">
                          <span v-for="error in v$.password.$errors" :key="error.$uid">{{ error.$message }}</span>
                        </div>
                      </div>
                    </div>

                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="" id="auth-remember-check" />
                      <label class="form-check-label" for="auth-remember-check">Remember
                        me</label>
                    </div>

                    <div class="mt-4">
                      <BButton variant="success" class="w-100" type="submit" :disabled="processing">
                        {{ processing ? "Please wait..." : "Sign In" }}
                      </BButton>
                    </div>
                  </form>
                </div>
              </BCardBody>
            </BCard>

            <div class="mt-4 text-center">
              <p class="mb-0 text-muted">
                Default login: <strong>admin / admin123</strong> or <strong>operator / operator123</strong>
              </p>
            </div>
          </BCol>
        </BRow>
      </BContainer>
    </div>

    <footer class="footer">
      <BContainer>
        <BRow>
          <BCol lg="12">
            <div class="text-center">
              <p class="mb-0 text-muted">
                &copy; {{ new Date().getFullYear() }} CSK-INNOVATE Biogas. IoT Monitoring Platform
              </p>
            </div>
          </BCol>
        </BRow>
      </BContainer>
    </footer>
  </div>
</template>