<script>
import { CountTo } from "vue3-count-to";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/autoplay";
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default {
    data() {
        return {
            Autoplay, Navigation, Pagination,
            previousTheme: null, // Store previous theme to restore later
        };
    },
    components: {
        Swiper,
        SwiperSlide,
        CountTo,
    },
    methods: {
        goToDashboard() {
            const token = localStorage.getItem('jwt_token');
            if (token) {
                // User is logged in, go directly to dashboard
                this.$router.push({ name: 'overview-dashboard' });
            } else {
                // User is not logged in, redirect to login with redirect parameter
                this.$router.push({ 
                    name: 'login',
                    query: { redirect: '/overview/dashboard' }
                });
            }
        },

        topFunction() {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        },

        monthly() {
            const highlightedItems = document.querySelectorAll(".month");

            highlightedItems.forEach(function (userItem) {
                userItem.style.display = "block";
            });
            const highlightedItems2 = document.querySelectorAll(".annual");

            highlightedItems2.forEach(function (userItem) {
                userItem.style.display = "none";
            });
        },
        anually() {
            const highlightedItems = document.querySelectorAll(".month");

            highlightedItems.forEach(function (userItem) {
                userItem.style.display = "none";
            });
            const highlightedItems2 = document.querySelectorAll(".annual");

            highlightedItems2.forEach(function (userItem) {
                userItem.style.display = "block";
            });
        },
        scrollToSection(sectionId) {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    },
    unmounted() {
        window.removeEventListener('scroll', this.setActiveSection);
        // Restore previous theme when leaving landing page
        if (this.previousTheme) {
            document.documentElement.setAttribute('data-bs-theme', this.previousTheme);
        }
    },
    mounted() {
        // Save current theme and switch to dark mode for landing page
        this.previousTheme = document.documentElement.getAttribute('data-bs-theme') || 'light';
        document.documentElement.setAttribute('data-bs-theme', 'dark');
        
        window.addEventListener('scroll', this.setActiveSection);
        let backtoTop = document.getElementById("back-to-top");

        if (backtoTop) {
            backtoTop = document.getElementById("back-to-top");
            window.onscroll = function () {
                if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                    backtoTop.style.display = "block";
                } else {
                    backtoTop.style.display = "none";
                }
            };
        }

        this.monthly();
        document.getElementById("plan-switch").addEventListener('change', () => {
            if (document.getElementById("plan-switch").checked == true) {
                this.anually();
            } else if (document.getElementById("plan-switch").checked == false) {
                this.monthly();
            }
        });
        window.addEventListener('scroll', function (ev) {
            ev.preventDefault();
            var navbar = document.getElementById("navbar");
            if (navbar) {
                if (document.body.scrollTop >= 50 || document.documentElement.scrollTop >= 50) {
                    navbar.classList.add("is-sticky");
                } else {
                    navbar.classList.remove("is-sticky");
                }
            }
        });

        document.querySelector('.currentyear').innerHTML = new Date().getFullYear() + " © ZENZERO";
    },
};
</script>

<template>
    <div class="layout-wrapper landing">
        <nav class="navbar navbar-expand-lg navbar-landing fixed-top" id="navbar">
            <BContainer>
                <router-link class="navbar-brand" to="/">
                    <span class="card-logo card-logo-dark logo-text" style="--logo-text-size: 20px;">ZENZERO</span>
                    <span class="card-logo card-logo-light logo-text" style="--logo-text-size: 20px;">ZENZERO</span>
                </router-link>
                <BButton variant="link" class="navbar-toggler py-0 fs-20 text-body" v-b-toggle.navbarSupportedContent>
                    <i class="mdi mdi-menu"></i>
                </BButton>

                <BCollapse class="navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mx-auto mt-2 mt-lg-0" id="navbar-example">
                        <li class="nav-item">
                            <BLink class="nav-link" href="#hero" @click.prevent="scrollToSection('hero')">Home</BLink>
                        </li>
                        <li class="nav-item">
                            <BLink class="nav-link" href="#services" @click.prevent="scrollToSection('services')">Services</BLink>
                        </li>
                        <li class="nav-item">
                            <BLink class="nav-link" href="#features" @click.prevent="scrollToSection('features')">Features</BLink>
                        </li>
                        <li class="nav-item">
                            <BLink class="nav-link" href="#plans" @click.prevent="scrollToSection('plans')">Plans</BLink>
                        </li>
                        <li class="nav-item">
                            <BLink class="nav-link" href="#reviews" @click.prevent="scrollToSection('reviews')">Reviews</BLink>
                        </li>
                        <li class="nav-item">
                            <BLink class="nav-link" href="#team" @click.prevent="scrollToSection('team')">Team</BLink>
                        </li>
                        <li class="nav-item">
                            <BLink class="nav-link" href="#contact" @click.prevent="scrollToSection('contact')">Contact</BLink>
                        </li>
                    </ul>

                    <div class="">
                        <router-link to="/login"
                            class="btn btn-link fw-medium text-decoration-none text-light">Sign
                            in</router-link>
                        <router-link to="/register" class="btn btn-success">Sign Up</router-link>
                    </div>
                </BCollapse>
            </BContainer>
        </nav>
        <div class="vertical-overlay" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent.show"></div>
        <section class="section pb-0 hero-section hero-section-custom" id="hero">
            <div class="hero-bg-image"></div>
            <div class="bg-overlay bg-overlay-pattern"></div>
            <BContainer>
                <BRow class="justify-content-center">
                    <BCol lg="10" sm="12">
                        <div class="text-center mt-lg-5 pt-5">
                            <h1 class="display-3 fw-bold mb-4 lh-base hero-title">
                                Transforming <span class="text-success">Waste</span><br>
                                into <span class="text-success">Clean Energy</span>
                            </h1>
                            <p class="lead hero-subtitle mb-5">Innovative wastewater treatment solutions that convert organic waste into sustainable biogas energy,<br class="d-none d-md-block"> reducing environmental impact while generating clean power for communities.</p>

                            <div class="d-flex gap-3 justify-content-center mt-4 flex-wrap">
                                <router-link to="#contact" @click.prevent="scrollToSection('contact')" class="btn btn-danger btn-lg px-4 py-3">
                                    <i class="ri-mail-line align-middle me-2"></i>Contact
                                </router-link>
                                <router-link to="#services" @click.prevent="scrollToSection('services')" class="btn btn-outline-light btn-lg px-4 py-3">
                                    <i class="ri-book-open-line align-middle me-2"></i>Our Story
                                </router-link>
                                <button @click="goToDashboard" class="btn btn-success btn-lg px-4 py-3">
                                    <i class="ri-dashboard-line align-middle me-2"></i>Digital Transformation
                                </button>
                            </div>
                        </div>
                    </BCol>
                </BRow>
            </BContainer>
            <div class="position-absolute start-0 end-0 bottom-0 hero-shape-svg">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 1440 120">
                    <g mask="url(&quot;#SvgjsMask1003&quot;)" fill="none">
                        <path d="M 0,118 C 288,98.6 1152,40.4 1440,21L1440 140L0 140z">
                        </path>
                    </g>
                </svg>
            </div>
        </section>

        <section class="section" id="services">
            <BContainer>
                <BRow class="justify-content-center">
                    <BCol lg="8">
                        <div class="text-center mb-5">
                            <h1 class="mb-3 ff-secondary fw-semibold lh-base">Comprehensive Wastewater Treatment Solutions
                                for a Sustainable Future</h1>
                            <p class="text-muted">Transform organic waste into clean energy with our innovative biogas technology and real-time monitoring systems. 
                                We provide end-to-end solutions for industrial and agricultural wastewater management.</p>
                        </div>
                    </BCol>
                </BRow>

                <BRow class="g-3">
                    <BCol lg="4">
                        <div class="d-flex p-3">
                            <div class="flex-shrink-0 me-3">
                                <div class="avatar-sm icon-effect">
                                    <div class="avatar-title bg-transparent text-success rounded-circle">
                                        <i class="ri-drop-line fs-36"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="flex-grow-1">
                                <h5 class="fs-18">Wastewater Treatment</h5>
                                <p class="text-muted my-3 ff-secondary">Advanced biological treatment systems that efficiently process industrial and agricultural wastewater.</p>
                                <div>
                                    <router-link to="#" class="fs-13 fw-medium">Learn More <i
                                            class="ri-arrow-right-s-line align-bottom"></i></router-link>
                                </div>
                            </div>
                        </div>
                    </BCol>
                    <BCol lg="4">
                        <div class="d-flex p-3">
                            <div class="flex-shrink-0 me-3">
                                <div class="avatar-sm icon-effect">
                                    <div class="avatar-title bg-transparent text-success rounded-circle">
                                        <i class="ri-flashlight-line fs-36"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="flex-grow-1">
                                <h5 class="fs-18">Biogas Production</h5>
                                <p class="text-muted my-3 ff-secondary">Convert organic waste into renewable biogas energy through anaerobic digestion technology.</p>
                                <div>
                                    <router-link to="#" class="fs-13 fw-medium">Learn More <i
                                            class="ri-arrow-right-s-line align-bottom"></i></router-link>
                                </div>
                            </div>
                        </div>
                    </BCol>
                    <BCol lg="4">
                        <div class="d-flex p-3">
                            <div class="flex-shrink-0 me-3">
                                <div class="avatar-sm icon-effect">
                                    <div class="avatar-title bg-transparent text-success rounded-circle">
                                        <i class="ri-leaf-line fs-36"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="flex-grow-1">
                                <h5 class="fs-18">Environmental Solutions</h5>
                                <p class="text-muted my-3 ff-secondary">Sustainable waste management solutions that reduce environmental impact and carbon footprint.</p>
                                <div>
                                    <router-link to="#" class="fs-13 fw-medium">Learn More <i
                                            class="ri-arrow-right-s-line align-bottom"></i></router-link>
                                </div>
                            </div>
                        </div>
                    </BCol>
                    <BCol lg="4">
                        <div class="d-flex p-3">
                            <div class="flex-shrink-0 me-3">
                                <div class="avatar-sm icon-effect">
                                    <div class="avatar-title bg-transparent text-success rounded-circle">
                                        <i class="ri-dashboard-3-line fs-36"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="flex-grow-1">
                                <h5 class="fs-18">Real-time Monitoring</h5>
                                <p class="text-muted my-3 ff-secondary">24/7 IoT-based monitoring system with live data visualization and instant alerts.</p>
                                <div>
                                    <router-link to="#" class="fs-13 fw-medium">Learn More <i
                                            class="ri-arrow-right-s-line align-bottom"></i></router-link>
                                </div>
                            </div>
                        </div>
                    </BCol>
                    <BCol lg="4">
                        <div class="d-flex p-3">
                            <div class="flex-shrink-0 me-3">
                                <div class="avatar-sm icon-effect">
                                    <div class="avatar-title bg-transparent text-success rounded-circle">
                                        <i class="ri-line-chart-line fs-36"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="flex-grow-1">
                                <h5 class="fs-18">Data Analytics</h5>
                                <p class="text-muted my-3 ff-secondary">Comprehensive data analysis and reporting for performance optimization and decision making.</p>
                                <div>
                                    <router-link to="#" class="fs-13 fw-medium">Learn More <i
                                            class="ri-arrow-right-s-line align-bottom"></i></router-link>
                                </div>
                            </div>
                        </div>
                    </BCol>
                    <BCol lg="4">
                        <div class="d-flex p-3">
                            <div class="flex-shrink-0 me-3">
                                <div class="avatar-sm icon-effect">
                                    <div class="avatar-title bg-transparent text-success rounded-circle">
                                        <i class="ri-settings-2-line fs-36"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="flex-grow-1">
                                <h5 class="fs-18">Process Optimization</h5>
                                <p class="text-muted my-3 ff-secondary">Advanced automation and control systems to maximize treatment efficiency and energy output.</p>
                                <div>
                                    <router-link to="#" class="fs-13 fw-medium">Learn More <i
                                            class="ri-arrow-right-s-line align-bottom"></i></router-link>
                                </div>
                            </div>
                        </div>
                    </BCol>

                    <BCol lg="4">
                        <div class="d-flex p-3">
                            <div class="flex-shrink-0 me-3">
                                <div class="avatar-sm icon-effect">
                                    <div class="avatar-title bg-transparent text-success rounded-circle">
                                        <i class="ri-test-tube-line fs-36"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="flex-grow-1">
                                <h5 class="fs-18">Water Quality Testing</h5>
                                <p class="text-muted my-3 ff-secondary">Comprehensive water quality analysis including BOD, COD, pH, ORP, and nutrient measurements.</p>
                                <div>
                                    <router-link to="#" class="fs-13 fw-medium">Learn More <i
                                            class="ri-arrow-right-s-line align-bottom"></i></router-link>
                                </div>
                            </div>
                        </div>
                    </BCol>
                    <BCol lg="4">
                        <div class="d-flex p-3">
                            <div class="flex-shrink-0 me-3">
                                <div class="avatar-sm icon-effect">
                                    <div class="avatar-title bg-transparent text-success rounded-circle">
                                        <i class="ri-recycle-line fs-36"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="flex-grow-1">
                                <h5 class="fs-18">Circular Economy</h5>
                                <p class="text-muted my-3 ff-secondary">Transform waste into valuable resources, creating a sustainable circular economy model.</p>
                                <div>
                                    <router-link to="#" class="fs-13 fw-medium">Learn More <i
                                            class="ri-arrow-right-s-line align-bottom"></i></router-link>
                                </div>
                            </div>
                        </div>
                    </BCol>
                    <BCol lg="4">
                        <div class="d-flex p-3">
                            <div class="flex-shrink-0 me-3">
                                <div class="avatar-sm icon-effect">
                                    <div class="avatar-title bg-transparent text-success rounded-circle">
                                        <i class="ri-customer-service-line fs-36"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="flex-grow-1">
                                <h5 class="fs-18">Expert Technical Support</h5>
                                <p class="text-muted my-3 ff-secondary">Dedicated engineering team providing 24/7 technical support and maintenance services.</p>
                                <div>
                                    <router-link to="#" class="fs-13 fw-medium">Learn More <i
                                            class="ri-arrow-right-s-line align-bottom"></i></router-link>
                                </div>
                            </div>
                        </div>
                    </BCol>
                </BRow>
            </BContainer>
        </section>



        <section class="section bg-light py-5" id="features">
            <BContainer>
                <BRow class="align-items-center gy-4">
                    <BCol lg="6" sm="7" class="mx-auto">
                        <div>
                            <img src="@/assets/images/landing/features/img-1.png" alt="" class="img-fluid mx-auto">
                        </div>
                    </BCol>
                    <BCol lg="6">
                        <div class="text-muted">
                            <div class="avatar-sm icon-effect mb-4">
                                <div class="avatar-title bg-transparent rounded-circle text-success h1">
                                    <i class="ri-collage-line fs-36"></i>
                                </div>
                            </div>
                            <h3 class="mb-3 fs-20">Comprehensive IoT Dashboard</h3>
                            <p class="mb-4 ff-secondary fs-16">Monitor and control your wastewater treatment system with our advanced IoT platform. 
                                Real-time data visualization, automated alerts, and comprehensive reporting tools 
                                for optimal system performance and decision making.</p>

                            <BRow class="pt-3">
                                <BCol cols="3">
                                    <div class="text-center">
                                        <h4>54+</h4>
                                        <p>Sensors</p>
                                    </div>
                                </BCol>
                                <BCol cols="3">
                                    <div class="text-center">
                                        <h4>24/7</h4>
                                        <p>Monitoring</p>
                                    </div>
                                </BCol>
                                <BCol cols="4">
                                    <div class="text-center">
                                        <h4>100%</h4>
                                        <p>Data Accuracy</p>
                                    </div>
                                </BCol>
                            </BRow>
                        </div>
                    </BCol>
                </BRow>
            </BContainer>
        </section>



        <section class="py-5 bg-primary position-relative">
            <div class="bg-overlay bg-overlay-pattern opacity-75"></div>
            <BContainer>
                <BRow class="align-items-center gy-4">
                    <BCol sm>
                        <div>
                            <h4 class="text-white mb-0 fw-semibold">Transform Your Waste into Sustainable Energy with CSK-INNOVATE</h4>
                        </div>
                    </BCol>
                    <BCol sm="auto">
                        <div>
                            <button @click="goToDashboard" class="btn bg-gradient btn-success">
                                <i class="ri-dashboard-line align-middle me-1"></i>
                                View Dashboard
                            </button>
                        </div>
                    </BCol>
                </BRow>
            </BContainer>
        </section>


        <section class="section">
            <BContainer>
                <BRow class="align-items-center gy-4">
                    <BCol lg="6" order="2" order-lg="1">
                        <div class="text-muted">
                            <h5 class="fs-12 text-uppercase text-success">Technology</h5>
                            <h4 class="mb-3">Advanced Monitoring Systems</h4>
                            <p class="mb-4 ff-secondary">Our IoT-powered platform provides real-time monitoring and control 
                                of wastewater treatment processes. Track critical parameters, optimize performance, 
                                and ensure compliance with environmental regulations.</p>

                            <BRow>
                                <BCol sm="5">
                                    <div class="vstack gap-2">
                                        <div class="d-flex align-items-center">
                                            <div class="flex-shrink-0 me-2">
                                                <div class="avatar-xs icon-effect">
                                                    <div class="avatar-title bg-transparent text-success rounded-circle h2">
                                                        <i class="ri-check-fill"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="flex-grow-1">
                                                <h5 class="fs-14 mb-0">Real-time Data</h5>
                                            </div>
                                        </div>
                                        <div class="d-flex align-items-center">
                                            <div class="flex-shrink-0 me-2">
                                                <div class="avatar-xs icon-effect">
                                                    <div class="avatar-title bg-transparent text-success rounded-circle h2">
                                                        <i class="ri-check-fill"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="flex-grow-1">
                                                <h5 class="fs-14 mb-0">Analytics</h5>
                                            </div>
                                        </div>
                                        <div class="d-flex align-items-center">
                                            <div class="flex-shrink-0 me-2">
                                                <div class="avatar-xs icon-effect">
                                                    <div class="avatar-title bg-transparent text-success rounded-circle h2">
                                                        <i class="ri-check-fill"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="flex-grow-1">
                                                <h5 class="fs-14 mb-0">Alerts</h5>
                                            </div>
                                        </div>
                                    </div>
                                </BCol>
                                <BCol sm="5">
                                    <div class="vstack gap-2">
                                        <div class="d-flex align-items-center">
                                            <div class="flex-shrink-0 me-2">
                                                <div class="avatar-xs icon-effect">
                                                    <div class="avatar-title bg-transparent text-success rounded-circle h2">
                                                        <i class="ri-check-fill"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="flex-grow-1">
                                                <h5 class="fs-14 mb-0">Reports</h5>
                                            </div>
                                        </div>
                                        <div class="d-flex align-items-center">
                                            <div class="flex-shrink-0 me-2">
                                                <div class="avatar-xs icon-effect">
                                                    <div class="avatar-title bg-transparent text-success rounded-circle h2">
                                                        <i class="ri-check-fill"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="flex-grow-1">
                                                <h5 class="fs-14 mb-0">Remote Control</h5>
                                            </div>
                                        </div>
                                    </div>
                                </BCol>
                            </BRow>

                            <div class="mt-4">
                                <button @click="goToDashboard" class="btn btn-success">View Dashboard <i
                                        class="ri-arrow-right-line align-middle ms-1"></i></button>
                            </div>
                        </div>
                    </BCol>
                    <BCol lg="6" sm="7" cols="10" order="1" order-lg="2" class="ms-auto">
                        <div>
                            <img src="@/assets/images/landing/features/img-2.png" alt="" class="img-fluid">
                        </div>
                    </BCol>
                </BRow>

                <BRow class="align-items-center mt-5 pt-lg-5 gy-4">
                    <BCol lg="6" sm="7" cols="10" class="mx-auto">
                        <div>
                            <img src="@/assets/images/landing/features/img-3.png" alt="" class="img-fluid">
                        </div>
                    </BCol>
                    <BCol lg="6">
                        <div class="text-muted ps-lg-5">
                            <h5 class="fs-12 text-uppercase text-success">Process</h5>
                            <h4 class="mb-3">Proven Technology</h4>
                            <p class="mb-4">Our anaerobic digestion technology has been proven in multiple industrial applications. 
                                We provide complete documentation and training for system operation and maintenance.</p>

                            <div class="vstack gap-2">
                                <div class="d-flex align-items-center">
                                    <div class="flex-shrink-0 me-2">
                                        <div class="avatar-xs icon-effect">
                                            <div class="avatar-title bg-transparent text-success rounded-circle h2">
                                                <i class="ri-check-fill"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex-grow-1">
                                        <p class="mb-0">Complete system integration</p>
                                    </div>
                                </div>
                                <div class="d-flex align-items-center">
                                    <div class="flex-shrink-0 me-2">
                                        <div class="avatar-xs icon-effect">
                                            <div class="avatar-title bg-transparent text-success rounded-circle h2">
                                                <i class="ri-check-fill"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex-grow-1">
                                        <p class="mb-0">Staff training and support</p>
                                    </div>
                                </div>
                                <div class="d-flex align-items-center">
                                    <div class="flex-shrink-0 me-2">
                                        <div class="avatar-xs icon-effect">
                                            <div class="avatar-title bg-transparent text-success rounded-circle h2">
                                                <i class="ri-check-fill"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex-grow-1">
                                        <p class="mb-0">Comprehensive documentation</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </BCol>
                </BRow>
            </BContainer>
        </section>



        <section class="section bg-light" id="plans">
            <div class="bg-overlay bg-overlay-pattern"></div>
            <BContainer>
                <BRow class="justify-content-center">
                    <BCol lg="8">
                        <div class="text-center mb-5">
                            <h3 class="mb-3 fw-semibold">Scalable Solutions for Every Operation</h3>
                            <p class="text-muted mb-4">From small facilities to large industrial operations, we provide customized 
                                wastewater treatment solutions tailored to your needs.</p>

                            <div class="d-flex justify-content-center align-items-center">
                                <div>
                                    <h5 class="fs-14 mb-0">Month</h5>
                                </div>
                                <div class="form-check form-switch fs-20 ms-3 ">
                                    <input class="form-check-input" type="checkbox" id="plan-switch">
                                    <label class="form-check-label" for="plan-switch"></label>
                                </div>
                                <div>
                                    <h5 class="fs-14 mb-0">Annual <BBadge variant="success-subtle"
                                            class="bg-success-subtle text-success">Save 20%</BBadge>
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </BCol>
                </BRow>

                <BRow class="gy-4">
                    <BCol lg="4">
                        <BCard no-body class="plan-box mb-0">
                            <BCardBody class="p-4 m-2">
                                <div class="d-flex align-items-center">
                                    <div class="flex-grow-1">
                                        <h5 class="mb-1 fw-semibold">Basic Plan</h5>
                                        <p class="text-muted mb-0">For Startup</p>
                                    </div>
                                    <div class="avatar-sm">
                                        <div class="avatar-title bg-light rounded-circle text-primary">
                                            <i class="ri-book-mark-line fs-20"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="py-4 text-center">
                                    <h1 class="month"><sup><small>$</small></sup><span
                                            class="ff-secondary fw-bold">19</span> <span
                                            class="fs-13 text-muted">/Month</span></h1>
                                    <h1 class="annual"><sup><small>$</small></sup><span
                                            class="ff-secondary fw-bold ">171</span>
                                        <span class="fs-13 text-muted">/Year</span>
                                    </h1>
                                </div>

                                <div>
                                    <ul class="list-unstyled text-muted vstack gap-3 ff-secondary">
                                        <li>
                                            <div class="d-flex">
                                                <div class="flex-shrink-0 text-success me-1">
                                                    <i class="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                                </div>
                                                <div class="flex-grow-1">
                                                    Upto <b>3</b> Projects
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="d-flex">
                                                <div class="flex-shrink-0 text-success me-1">
                                                    <i class="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                                </div>
                                                <div class="flex-grow-1">
                                                    Upto <b>299</b> Customers
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="d-flex">
                                                <div class="flex-shrink-0 text-success me-1">
                                                    <i class="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                                </div>
                                                <div class="flex-grow-1">
                                                    Scalable Bandwidth
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="d-flex">
                                                <div class="flex-shrink-0 text-success me-1">
                                                    <i class="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                                </div>
                                                <div class="flex-grow-1">
                                                    <b>5</b> FTP Login
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="d-flex">
                                                <div class="flex-shrink-0 text-danger me-1">
                                                    <i class="ri-close-circle-fill fs-15 align-middle"></i>
                                                </div>
                                                <div class="flex-grow-1">
                                                    <b>24/7</b> Support
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="d-flex">
                                                <div class="flex-shrink-0 text-danger me-1">
                                                    <i class="ri-close-circle-fill fs-15 align-middle"></i>
                                                </div>
                                                <div class="flex-grow-1">
                                                    <b>Unlimited</b> Storage
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="d-flex">
                                                <div class="flex-shrink-0 text-danger me-1">
                                                    <i class="ri-close-circle-fill fs-15 align-middle"></i>
                                                </div>
                                                <div class="flex-grow-1">
                                                    Domain
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="mt-4">
                                        <router-link to="javascript:void(0);" class="btn btn-soft-success w-100">Get
                                            Started</router-link>
                                    </div>
                                </div>
                            </BCardBody>
                        </BCard>
                    </BCol>
                    <BCol lg="4">
                        <BCard no-body class="plan-box mb-0 ribbon-box right">
                            <BCardBody class="p-4 m-2">
                                <div class="ribbon-two ribbon-two-danger"><span>Popular</span></div>
                                <div class="d-flex align-items-center">
                                    <div class="flex-grow-1">
                                        <h5 class="mb-1 fw-semibold">Pro Business</h5>
                                        <p class="text-muted mb-0">Professional plans</p>
                                    </div>
                                    <div class="avatar-sm">
                                        <div class="avatar-title bg-light rounded-circle text-primary">
                                            <i class="ri-medal-fill fs-20"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="py-4 text-center">
                                    <h1 class="month"><sup><small>$</small></sup><span
                                            class="ff-secondary fw-bold">29</span> <span
                                            class="fs-13 text-muted">/Month</span></h1>
                                    <h1 class="annual"><sup><small>$</small></sup><span
                                            class="ff-secondary fw-bold">261</span>
                                        <span class="fs-13 text-muted">/Year</span>
                                    </h1>
                                </div>

                                <div>
                                    <ul class="list-unstyled text-muted vstack gap-3 ff-secondary">
                                        <li>
                                            <div class="d-flex">
                                                <div class="flex-shrink-0 text-success me-1">
                                                    <i class="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                                </div>
                                                <div class="flex-grow-1">
                                                    Upto <b>15</b> Projects
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="d-flex">
                                                <div class="flex-shrink-0 text-success me-1">
                                                    <i class="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                                </div>
                                                <div class="flex-grow-1">
                                                    <b>Unlimited</b> Customers
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="d-flex">
                                                <div class="flex-shrink-0 text-success me-1">
                                                    <i class="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                                </div>
                                                <div class="flex-grow-1">
                                                    Scalable Bandwidth
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="d-flex">
                                                <div class="flex-shrink-0 text-success me-1">
                                                    <i class="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                                </div>
                                                <div class="flex-grow-1">
                                                    <b>12</b> FTP Login
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="d-flex">
                                                <div class="flex-shrink-0 text-success me-1">
                                                    <i class="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                                </div>
                                                <div class="flex-grow-1">
                                                    <b>24/7</b> Support
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="d-flex">
                                                <div class="flex-shrink-0 text-danger me-1">
                                                    <i class="ri-close-circle-fill fs-15 align-middle"></i>
                                                </div>
                                                <div class="flex-grow-1">
                                                    <b>Unlimited</b> Storage
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="d-flex">
                                                <div class="flex-shrink-0 text-danger me-1">
                                                    <i class="ri-close-circle-fill fs-15 align-middle"></i>
                                                </div>
                                                <div class="flex-grow-1">
                                                    Domain
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="mt-4">
                                        <router-link to="javascript:void(0);" class="btn btn-soft-success w-100">Get
                                            Started</router-link>
                                    </div>
                                </div>
                            </BCardBody>
                        </BCard>
                    </BCol>
                    <BCol lg="4">
                        <BCard no-body class="plan-box mb-0">
                            <BCardBody class="p-4 m-2">
                                <div class="d-flex align-items-center">
                                    <div class="flex-grow-1">
                                        <h5 class="mb-1 fw-semibold">Platinum Plan</h5>
                                        <p class="text-muted mb-0">Enterprise Businesses</p>
                                    </div>
                                    <div class="avatar-sm">
                                        <div class="avatar-title bg-light rounded-circle text-primary">
                                            <i class="ri-stack-fill fs-20"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="py-4 text-center">
                                    <h1 class="month"><sup><small>$</small></sup><span
                                            class="ff-secondary fw-bold">39</span> <span
                                            class="fs-13 text-muted">/Month</span></h1>
                                    <h1 class="annual"><sup><small>$</small></sup><span
                                            class="ff-secondary fw-bold">351</span>
                                        <span class="fs-13 text-muted">/Year</span>
                                    </h1>
                                </div>

                                <div>
                                    <ul class="list-unstyled text-muted vstack gap-3 ff-secondary">
                                        <li>
                                            <div class="d-flex">
                                                <div class="flex-shrink-0 text-success me-1">
                                                    <i class="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                                </div>
                                                <div class="flex-grow-1">
                                                    <b>Unlimited</b> Projects
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="d-flex">
                                                <div class="flex-shrink-0 text-success me-1">
                                                    <i class="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                                </div>
                                                <div class="flex-grow-1">
                                                    <b>Unlimited</b> Customers
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="d-flex">
                                                <div class="flex-shrink-0 text-success me-1">
                                                    <i class="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                                </div>
                                                <div class="flex-grow-1">
                                                    Scalable Bandwidth
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="d-flex">
                                                <div class="flex-shrink-0 text-success me-1">
                                                    <i class="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                                </div>
                                                <div class="flex-grow-1">
                                                    <b>Unlimited</b> FTP Login
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="d-flex">
                                                <div class="flex-shrink-0 text-success me-1">
                                                    <i class="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                                </div>
                                                <div class="flex-grow-1">
                                                    <b>24/7</b> Support
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="d-flex">
                                                <div class="flex-shrink-0 text-success me-1">
                                                    <i class="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                                </div>
                                                <div class="flex-grow-1">
                                                    <b>Unlimited</b> Storage
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="d-flex">
                                                <div class="flex-shrink-0 text-success me-1">
                                                    <i class="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                                </div>
                                                <div class="flex-grow-1">
                                                    Domain
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="mt-4">
                                        <router-link to="javascript:void(0);" class="btn btn-soft-success w-100">Get
                                            Started</router-link>
                                    </div>
                                </div>
                            </BCardBody>
                        </BCard>
                    </BCol>
                </BRow>

            </BContainer>
        </section>

        <section class="section">
            <BContainer>
                <BRow class="justify-content-center">
                    <BCol lg="8">
                        <div class="text-center mb-5">
                            <h3 class="mb-3 fw-semibold">Frequently Asked Questions</h3>
                            <p class="text-muted mb-4 ff-secondary">Have questions about our wastewater treatment solutions? 
                                Find answers to common queries here, or contact our expert team for personalized assistance.</p>

                            <div class="hstack gap-2 justify-content-center">
                                <BButton type="button" pill variant="success" class="btn-label" @click="scrollToSection('contact')"><i
                                        class="ri-mail-line label-icon align-middle rounded-pill fs-16 me-2"></i> Contact
                                    Us</BButton>
                                <button @click="goToDashboard" class="btn btn-primary btn-label rounded-pill">
                                    <i class="ri-dashboard-line label-icon align-middle rounded-pill fs-16 me-2"></i>
                                    View Dashboard
                                </button>
                            </div>
                        </div>
                    </BCol>
                </BRow>

                <BRow class="g-lg-5 g-4">
                    <BCol lg="6">
                        <div class="d-flex align-items-center mb-2">
                            <div class="flex-shrink-0 me-1">
                                <i class="ri-question-line fs-24 align-middle text-success me-1"></i>
                            </div>
                            <div class="flex-grow-1">
                                <h5 class="mb-0 fw-semibold">General Questions</h5>
                            </div>
                        </div>
                        <BAccordion class="custom-accordionwithicon custom-accordion-border accordion-border-box"
                            id="genques-accordion">
                            <BAccordionItem title="What is the purpose of using themes ?" visible>
                                <div class="ff-secondary">
                                    A theme is a set of colors, fonts, effects, and more that can be applied to your
                                    entire presentation to give it a
                                    consistent, professional look. You've already been using a theme, even if you
                                    didn't know it: the default Office theme,
                                    which consists.
                                </div>
                            </BAccordionItem>
                            <BAccordionItem title="Can a theme have more than one theme?">
                                <div class="ff-secondary">
                                    A story can have as many themes as the reader can identify based on recurring
                                    patterns and parallels within the story
                                    itself. In looking at ways to separate themes into a hierarchy, we might find it
                                    useful to follow the example of a
                                    single book.
                                </div>
                            </BAccordionItem>
                            <BAccordionItem title="What are theme features?">
                                <div class="ff-secondary">
                                    Theme features is a set of specific functionality that may be enabled by theme
                                    authors. Themes must register each
                                    individual Theme Feature that the author wishes to support. Theme support
                                    functions should be called in the theme's
                                    functions.
                                </div>
                            </BAccordionItem>
                            <BAccordionItem title="What is simple theme?">
                                <div class="ff-secondary">
                                    Simple is a free WordPress theme, by Themify, built exactly what it is named
                                    for: simplicity. Immediately upgrade the
                                    quality of your WordPress site with the simple theme To use the built-in Chrome
                                    theme editor.
                                </div>
                            </BAccordionItem>
                        </BAccordion>


                    </BCol>
                    <BCol lg="6">
                        <div class="d-flex align-items-center mb-2">
                            <div class="flex-shrink-0 me-1">
                                <i class="ri-shield-keyhole-line fs-24 align-middle text-success me-1"></i>
                            </div>
                            <div class="flex-grow-1">
                                <h5 class="mb-0 fw-semibold">Privacy &amp; Security</h5>
                            </div>
                        </div>

                        <BAccordion class="custom-accordionwithicon custom-accordion-border accordion-border-box"
                            id="privacy-accordion">
                            <BAccordionItem title="Does Word have night mode?">
                                <div class="ff-secondary">
                                    You can run Microsoft Word in dark mode, which uses a dark color palette to help
                                    reduce eye strain in low light
                                    settings. You can choose to make the document white or black using the Switch
                                    Modes button in the ribbon's View tab.
                                </div>
                            </BAccordionItem>
                            <BAccordionItem title="Is theme an opinion?" visible>
                                <div class="ff-secondary">
                                    A theme is an opinion the author expresses on the subject, for instance, the
                                    author's dissatisfaction with the narrow
                                    confines of French bourgeois marriage during that period theme is an idea that a
                                    writer repeats.
                                </div>
                            </BAccordionItem>
                            <BAccordionItem title="How do you develop a theme?">
                                <div class="ff-secondary">
                                    A short story, novella, or novel presents a narrative to its reader. Perhaps
                                    that narrative involves mystery, terror,
                                    romance, comedy, or all of the above. These works of fiction may also contain
                                    memorable characters, vivid
                                    world-building, literary devices.
                                </div>
                            </BAccordionItem>
                            <BAccordionItem title="Do stories need themes?">
                                <div class="ff-secondary">
                                    A story can have as many themes as the reader can identify based on recurring
                                    patterns and parallels within the story
                                    itself. In looking at ways to separate themes into a hierarchy, we might find it
                                    useful to follow the example of a
                                    single book.
                                </div>
                            </BAccordionItem>
                        </BAccordion>
                    </BCol>
                </BRow>
            </BContainer>
        </section>

        <section class="section bg-primary" id="reviews">
            <div class="bg-overlay bg-overlay-pattern"></div>
            <BContainer>
                <BRow class="justify-content-center">
                    <BCol lg="10">
                        <div class="text-center">
                            <div>
                                <i class="ri-double-quotes-l text-success display-3"></i>
                            </div>
                            <h4 class="text-white mb-5"><span class="text-success">Trusted</span> by Leading Industries</h4>

                            <div class="client-review-swiper rounded">
                                <swiper class="navigation-swiper rounded" :loop="true"
                                    :modules="[Autoplay, Navigation, Pagination]"
                                    :autoplay="{ delay: 2500, disableOnInteraction: false }"
                                    :navigation="{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }"
                                    :pagination="{ clickable: true, el: '.swiper-pagination' }">
                                    <swiper-slide>
                                        <div class="swiper-slide">
                                            <BRow class="justify-content-center">
                                                <BCol cols="10">
                                                    <div class="text-white-50">
                                                        <p class="fs-20 ff-secondary mb-4">" I am givng 5 stars. Theme
                                                            is great and everyone one stuff everything in theme. Future
                                                            request should not affect current
                                                            state of theme. "</p>

                                                        <div>
                                                            <h5 class="text-white">gregoriusus</h5>
                                                            <p>- Skote User</p>
                                                        </div>
                                                    </div>
                                                </BCol>
                                            </BRow>
                                        </div>
                                    </swiper-slide>

                                    <swiper-slide>
                                        <div class="swiper-slide">
                                            <BRow class="justify-content-center">
                                                <BCol cols="10">
                                                    <div class="text-white-50">
                                                        <p class="fs-20 ff-secondary mb-4">" Awesome support. Had few
                                                            issues while setting up because of my device, the support
                                                            team helped me fix them up in a day.
                                                            Everything looks clean and good. Highly recommended! "</p>

                                                        <div>
                                                            <h5 class="text-white">GeekyGreenOwl</h5>
                                                            <p>- Skote User</p>
                                                        </div>
                                                    </div>
                                                </BCol>
                                            </BRow>
                                        </div>
                                    </swiper-slide>

                                    <swiper-slide>
                                        <div class="swiper-slide">
                                            <BRow class="justify-content-center">
                                                <BCol cols="10">
                                                    <div class="text-white-50">
                                                        <p class="fs-20 ff-secondary mb-4">" Amazing template, Redux
                                                            store and components is nicely designed.
                                                            It's a great start point for an admin based project. Clean
                                                            Code and good documentation. Template is
                                                            completely in React and absolutely no usage of jQuery "</p>

                                                        <div>
                                                            <h5 class="text-white">sreeks456</h5>
                                                            <p>- Veltrix User</p>
                                                        </div>
                                                    </div>
                                                </BCol>
                                            </BRow>
                                        </div>
                                    </swiper-slide>
                                    <div class="swiper-button-next bg-white rounded-circle"></div>
                                    <div class="swiper-button-prev bg-white rounded-circle"></div>
                                    <div class="swiper-pagination position-relative mt-2"></div>

                                </swiper>
                            </div>



                        </div>
                    </BCol>
                </BRow>
            </BContainer>
        </section>



        <section class="py-5 position-relative bg-light">
            <BContainer>
                <BRow class="text-center gy-4">
                    <BCol lg="3" cols="6">
                        <div>
                            <h2 class="mb-2">
                                <count-to :startVal='0' :endVal='100' :duration='5000'>0</count-to>+
                            </h2>
                            <div class="text-muted">Projects Completed</div>
                        </div>
                    </BCol>

                    <BCol lg="3" cols="6">
                        <div>
                            <h2 class="mb-2">
                                <count-to :startVal='0' :endVal='24' :duration='5000'>0</count-to>
                            </h2>
                            <div class="text-muted">Win Awards</div>
                        </div>
                    </BCol>

                    <BCol lg="3" cols="6">
                        <div>
                            <h2 class="mb-2">
                                <count-to :startVal='0' :endVal='20' :duration='5000'>0</count-to>k
                            </h2>
                            <div class="text-muted">Satisfied Clients</div>
                        </div>
                    </BCol>
                    <BCol lg="3" cols="6">
                        <div>
                            <h2 class="mb-2">
                                <count-to :startVal='0' :endVal='50' :duration='5000'>0</count-to>
                            </h2>
                            <div class="text-muted">Employees</div>
                        </div>
                    </BCol>
                </BRow>
            </BContainer>
        </section>



        <section class="section">
            <BContainer>
                <BRow class="justify-content-center">
                    <BCol lg="8">
                        <div class="text-center mb-5">
                            <h3 class="mb-3 fw-semibold">Our Work Process</h3>
                            <p class="text-muted mb-4 ff-secondary">In an ideal world this website wouldn’t exist, a
                                client would
                                acknowledge the importance of having web copy before the Proin vitae ipsum vel ex
                                finibus semper design starts.</p>
                        </div>
                    </BCol>
                </BRow>

                <BRow class="text-center">
                    <BCol lg="4">
                        <div class="process-card mt-4">
                            <div class="process-arrow-img d-none d-lg-block">
                                <img src="@/assets/images/landing/process-arrow-img.png" alt="" class="img-fluid">
                            </div>
                            <div class="avatar-sm icon-effect mx-auto mb-4">
                                <div class="avatar-title bg-transparent text-success rounded-circle h1">
                                    <i class="ri-quill-pen-line"></i>
                                </div>
                            </div>

                            <h5>Tell us what you need</h5>
                            <p class="text-muted ff-secondary">The profession and the employer and your desire to make
                                your mark.</p>
                        </div>
                    </BCol>
                    <BCol lg="4">
                        <div class="process-card mt-4">
                            <div class="process-arrow-img d-none d-lg-block">
                                <img src="@/assets/images/landing/process-arrow-img.png" alt="" class="img-fluid">
                            </div>
                            <div class="avatar-sm icon-effect mx-auto mb-4">
                                <div class="avatar-title bg-transparent text-success rounded-circle h1">
                                    <i class="ri-user-follow-line"></i>
                                </div>
                            </div>

                            <h5>Get free quotes</h5>
                            <p class="text-muted ff-secondary">The most important aspect of beauty was, therefore, an
                                inherent part.</p>
                        </div>
                    </BCol>
                    <BCol lg="4">
                        <div class="process-card mt-4">
                            <div class="avatar-sm icon-effect mx-auto mb-4">
                                <div class="avatar-title bg-transparent text-success rounded-circle h1">
                                    <i class="ri-book-mark-line"></i>
                                </div>
                            </div>

                            <h5>Deliver high quality product</h5>
                            <p class="text-muted ff-secondary">We quickly learn to fear and thus automatically avoid
                                potentially.</p>
                        </div>
                    </BCol>
                </BRow>
            </BContainer>
        </section>

        <section class="section bg-light" id="team">
            <BContainer>
                <BRow class="justify-content-center">
                    <BCol lg="8">
                        <div class="text-center mb-5">
                            <h3 class="mb-3 fw-semibold">Our <span class="text-success">Expert Team</span></h3>
                            <p class="text-muted mb-4 ff-secondary">Our team of experienced engineers and environmental specialists 
                                are dedicated to providing innovative wastewater treatment solutions and exceptional support for your operations.</p>
                        </div>
                    </BCol>
                </BRow>
                <BRow>
                    <BCol lg="3" sm="6">
                        <BCard n-body>
                            <BCardBody class="text-center p-4">
                                <div class="avatar-xl mx-auto mb-4 position-relative">
                                    <img src="@/assets/images/users/avatar-2.jpg" alt="" class="img-fluid rounded-circle">
                                    <router-link to="/mailbox"
                                        class="btn btn-success btn-sm position-absolute bottom-0 end-0 rounded-circle avatar-xs">
                                        <div class="avatar-title bg-transparent">
                                            <i class="ri-mail-fill align-bottom"></i>
                                        </div>
                                    </router-link>
                                </div>
                                <h5 class="mb-1">
                                    <router-link to="/pages/profile" class="text-body">Nancy Martino</router-link>
                                </h5>
                                <p class="text-muted mb-0 ff-secondary">Team Leader</p>
                            </BCardBody>
                        </BCard>
                    </BCol>
                    <BCol lg="3" sm="6">
                        <BCard n-body>
                            <BCardBody class="text-center p-4">
                                <div class="avatar-xl mx-auto mb-4 position-relative">
                                    <img src="@/assets/images/users/avatar-10.jpg" alt="" class="img-fluid rounded-circle">
                                    <router-link to="/mailbox"
                                        class="btn btn-success btn-sm position-absolute bottom-0 end-0 rounded-circle avatar-xs">
                                        <div class="avatar-title bg-transparent">
                                            <i class="ri-mail-fill align-bottom"></i>
                                        </div>
                                    </router-link>
                                </div>
                                <h5 class="mb-1">
                                    <router-link to="/pages/profile" class="text-body">Henry Baird</router-link>
                                </h5>
                                <p class="text-muted mb-0 ff-secondary">Full Stack Developer</p>
                            </BCardBody>
                        </BCard>
                    </BCol>
                    <BCol lg="3" sm="6">
                        <BCard n-body>
                            <BCardBody class="text-center p-4">
                                <div class="avatar-xl mx-auto mb-4 position-relative">
                                    <img src="@/assets/images/users/avatar-3.jpg" alt="" class="img-fluid rounded-circle">
                                    <router-link to="/mailbox"
                                        class="btn btn-success btn-sm position-absolute bottom-0 end-0 rounded-circle avatar-xs">
                                        <div class="avatar-title bg-transparent">
                                            <i class="ri-mail-fill align-bottom"></i>
                                        </div>
                                    </router-link>
                                </div>
                                <h5 class="mb-1">
                                    <router-link to="/pages/profile" class="text-body">Frank Hook</router-link>
                                </h5>
                                <p class="text-muted mb-0 ff-secondary">Project Manager</p>
                            </BCardBody>
                        </BCard>
                    </BCol>
                    <BCol lg="3" sm="6">
                        <BCard n-body>
                            <BCardBody class="text-center p-4">
                                <div class="avatar-xl mx-auto mb-4 position-relative">
                                    <img src="@/assets/images/users/avatar-8.jpg" alt="" class="img-fluid rounded-circle">
                                    <router-link to="/mailbox"
                                        class="btn btn-success btn-sm position-absolute bottom-0 end-0 rounded-circle avatar-xs">
                                        <div class="avatar-title bg-transparent">
                                            <i class="ri-mail-fill align-bottom"></i>
                                        </div>
                                    </router-link>
                                </div>
                                <h5 class="mb-1">
                                    <router-link to="/pages/profile" class="text-body">Donald Palmer</router-link>
                                </h5>
                                <p class="text-muted mb-0 ff-secondary">UI/UX Designer</p>
                            </BCardBody>
                        </BCard>
                    </BCol>
                </BRow>
                <BRow>
                    <BCol lg="3" sm="6">
                        <BCard n-body>
                            <BCardBody class="text-center p-4">
                                <div class="avatar-xl mx-auto mb-4 position-relative">
                                    <img src="@/assets/images/users/avatar-5.jpg" alt="" class="img-fluid rounded-circle">
                                    <router-link to="/mailbox"
                                        class="btn btn-success btn-sm position-absolute bottom-0 end-0 rounded-circle avatar-xs">
                                        <div class="avatar-title bg-transparent">
                                            <i class="ri-mail-fill align-bottom"></i>
                                        </div>
                                    </router-link>
                                </div>
                                <h5 class="mb-1">
                                    <router-link to="/pages/profile" class="text-body">Erica Kernan</router-link>
                                </h5>
                                <p class="text-muted mb-0 ff-secondary">Web Designer</p>
                            </BCardBody>
                        </BCard>
                    </BCol>
                    <BCol lg="3" sm="6">
                        <BCard n-body>
                            <BCardBody class="text-center p-4">
                                <div class="avatar-xl mx-auto mb-4 position-relative">
                                    <img src="@/assets/images/users/avatar-4.jpg" alt="" class="img-fluid rounded-circle">
                                    <router-link to="/mailbox"
                                        class="btn btn-success btn-sm position-absolute bottom-0 end-0 rounded-circle avatar-xs">
                                        <div class="avatar-title bg-transparent">
                                            <i class="ri-mail-fill align-bottom"></i>
                                        </div>
                                    </router-link>
                                </div>
                                <h5 class="mb-1">
                                    <router-link to="/pages/profile" class="text-body">Alexis Clarke</router-link>
                                </h5>
                                <p class="text-muted mb-0 ff-secondary">Backend Developer</p>
                            </BCardBody>
                        </BCard>
                    </BCol>
                    <BCol lg="3" sm="6">
                        <BCard n-body>
                            <BCardBody class="text-center p-4">
                                <div class="avatar-xl mx-auto mb-4 position-relative">
                                    <img src="@/assets/images/users/avatar-6.jpg" alt="" class="img-fluid rounded-circle">
                                    <router-link to="/mailbox"
                                        class="btn btn-success btn-sm position-absolute bottom-0 end-0 rounded-circle avatar-xs">
                                        <div class="avatar-title bg-transparent">
                                            <i class="ri-mail-fill align-bottom"></i>
                                        </div>
                                    </router-link>
                                </div>
                                <h5 class="mb-1">
                                    <router-link to="/pages/profile" class="text-body">Marie Ward</router-link>
                                </h5>
                                <p class="text-muted mb-0 ff-secondary">Full Stack Developer</p>
                            </BCardBody>
                        </BCard>
                    </BCol>

                    <BCol lg="3" sm="6">
                        <BCard n-body>
                            <BCardBody class="text-center p-4">
                                <div class="avatar-xl mx-auto mb-4 position-relative">
                                    <img src="@/assets/images/users/avatar-7.jpg" alt="" class="img-fluid rounded-circle">
                                    <router-link to="/mailbox"
                                        class="btn btn-success btn-sm position-absolute bottom-0 end-0 rounded-circle avatar-xs">
                                        <div class="avatar-title bg-transparent">
                                            <i class="ri-mail-fill align-bottom"></i>
                                        </div>
                                    </router-link>
                                </div>
                                <h5 class="mb-1">
                                    <router-link to="/pages/profile" class="text-body">Jack Gough</router-link>
                                </h5>
                                <p class="text-muted mb-0 ff-secondary">React Js Developer</p>
                            </BCardBody>
                        </BCard>
                    </BCol>
                </BRow>
                <BRow>
                    <BCol lg="12">
                        <div class="text-center mt-2">
                            <router-link to="/pages/team" class="btn btn-primary">View All Members <i
                                    class="ri-arrow-right-line ms-1 align-bottom"></i></router-link>
                        </div>
                    </BCol>
                </BRow>
            </BContainer>
        </section>

        <section class="section" id="contact">
            <BContainer>
                <BRow class="justify-content-center">
                    <BCol lg="8">
                        <div class="text-center mb-5">
                            <h3 class="mb-3 fw-semibold">Get In Touch</h3>
                            <p class="text-muted mb-4 ff-secondary">We thrive when coming up with innovative ideas but
                                also
                                understand that a smart concept should be supported with faucibus sapien odio measurable
                                results.</p>
                        </div>
                    </BCol>
                </BRow>

                <BRow class="gy-4">
                    <BCol lg="4">
                        <div>
                            <div class="mt-4">
                                <h5 class="fs-13 text-muted text-uppercase">Office Address 1:</h5>
                                <div class="ff-secondary fw-semibold">4461 Cedar Street Moro, <br />AR 72368</div>
                            </div>
                            <div class="mt-4">
                                <h5 class="fs-13 text-muted text-uppercase">Office Address 2:</h5>
                                <div class="ff-secondary fw-semibold">2467 Swick Hill Street <br />New Orleans, LA</div>
                            </div>
                            <div class="mt-4">
                                <h5 class="fs-13 text-muted text-uppercase">Working Hours:</h5>
                                <div class="ff-secondary fw-semibold">9:00am to 6:00pm</div>
                            </div>
                        </div>
                    </BCol>
                    <BCol lg="8">
                        <div>
                            <form>
                                <BRow>
                                    <BCol lg="6">
                                        <div class="mb-4">
                                            <label for="name" class="form-label fs-13">Name</label>
                                            <input name="name" id="name" type="text"
                                                class="form-control bg-light border-light" placeholder="Your name*">
                                        </div>
                                    </BCol>
                                    <BCol lg="6">
                                        <div class="mb-4">
                                            <label for="email" class="form-label fs-13">Email</label>
                                            <input name="email" id="email" type="email"
                                                class="form-control bg-light border-light" placeholder="Your email*">
                                        </div>
                                    </BCol>
                                </BRow>
                                <BRow>
                                    <BCol lg="12">
                                        <div class="mb-4">
                                            <label for="subject" class="form-label fs-13">Subject</label>
                                            <input type="text" class="form-control bg-light border-light" id="subject"
                                                name="subject" placeholder="Your Subject.." />
                                        </div>
                                    </BCol>
                                </BRow>
                                <BRow>
                                    <BCol lg="12">
                                        <div class="mb-3">
                                            <label for="comments" class="form-label fs-13">Message</label>
                                            <textarea name="comments" id="comments" rows="3"
                                                class="form-control bg-light border-light"
                                                placeholder="Your message..."></textarea>
                                        </div>
                                    </BCol>
                                </BRow>
                                <BRow>
                                    <BCol lg="12" class="text-end">
                                        <input type="submit" id="submit" name="send" class="submitBnt btn btn-primary"
                                            value="Send Message">
                                    </BCol>
                                </BRow>
                            </form>
                        </div>
                    </BCol>
                </BRow>
            </BContainer>
        </section>

        <section class="py-5 bg-primary position-relative">
            <div class="bg-overlay bg-overlay-pattern opacity-75"></div>
            <BContainer>
                <BRow class="align-items-center gy-4">
                    <BCol sm>
                        <div>
                            <h4 class="text-white mb-0 fw-semibold">Transform Your Waste into Sustainable Energy with CSK-INNOVATE</h4>
                        </div>
                    </BCol>
                    <BCol sm="auto">
                        <div>
                            <button @click="goToDashboard" class="btn bg-gradient btn-success">
                                <i class="ri-dashboard-line align-middle me-1"></i>
                                View Dashboard
                            </button>
                        </div>
                    </BCol>
                </BRow>
            </BContainer>
        </section>

        <footer class="custom-footer bg-dark py-5 position-relative">
            <BContainer>
                <BRow>
                    <BCol lg="4" class="mt-4">
                        <div>
                            <div>
                                <span class="card-logo card-logo-light logo-text" style="--logo-text-size: 20px;">ZENZERO</span>
                            </div>
                            <div class="mt-4 fs-13">
                                <p>Premium Multipurpose Admin & Dashboard Template</p>
                                <p class="ff-secondary">You can build any type of web application like eCommerce, CRM,
                                    CMS, Project
                                    management apps, Admin Panels, etc using ZENZERO.</p>
                            </div>
                        </div>
                    </BCol>

                    <BCol lg="7" class="ms-lg-auto">
                        <BRow>
                            <BCol sm="4" class="mt-4">
                                <h5 class="text-white mb-0">Company</h5>
                                <div class="text-muted mt-3">
                                    <ul class="list-unstyled ff-secondary footer-list">
                                        <li>
                                            <router-link to="/pages/profile">About US</router-link>
                                        </li>
                                        <li>
                                            <router-link to="">Gallery</router-link>
                                        </li>
                                        <li>
                                            <router-link to="/apps/projects-list">Projects</router-link>
                                        </li>
                                        <li>
                                            <router-link to="/pages/timeline">Timeline</router-link>
                                        </li>
                                    </ul>
                                </div>
                            </BCol>
                            <BCol sm="4" class="mt-4">
                                <h5 class="text-white mb-0">Apps Pages</h5>
                                <div class="text-muted mt-3">
                                    <ul class="list-unstyled ff-secondary footer-list">
                                        <li>
                                            <router-link to="/calendar">Calendar</router-link>
                                        </li>
                                        <li>
                                            <router-link to="/mailbox">Mailbox</router-link>
                                        </li>
                                        <li>
                                            <router-link to="/chat">Chat</router-link>
                                        </li>
                                        <li>
                                            <router-link to="/apps/crm-deals">Deals</router-link>
                                        </li>
                                        <li>
                                            <router-link to="/apps/tasks-kanban">kanban board</router-link>
                                        </li>
                                    </ul>
                                </div>
                            </BCol>
                            <BCol sm="4" class="mt-4">
                                <h5 class="text-white mb-0">Support</h5>
                                <div class="text-muted mt-3">
                                    <ul class="list-unstyled ff-secondary footer-list">
                                        <li>
                                            <router-link to="/pages/faqs">FAQ's</router-link>
                                        </li>
                                        <li>
                                            <router-link to="/pages/faqs">Contacts</router-link>
                                        </li>
                                    </ul>
                                </div>
                            </BCol>
                        </BRow>
                    </BCol>
                </BRow>

                <BRow class="text-center text-sm-start align-items-center mt-5">
                    <BCol sm="6">

                        <div>
                            <p class="copy-rights mb-0 currentyear">{{ new Date().getFullYear() }} © ZENZERO
                            </p>
                        </div>
                    </BCol>
                    <BCol sm="6">
                        <div class="text-sm-end mt-3 mt-sm-0">
                            <ul class="list-inline mb-0 footer-social-link">
                                <li class="list-inline-item">
                                    <router-link to="javascript: void(0);" class="avatar-xs d-block">
                                        <div class="avatar-title rounded-circle">
                                            <i class="ri-facebook-fill"></i>
                                        </div>
                                    </router-link>
                                </li>
                                <li class="list-inline-item">
                                    <router-link to="javascript: void(0);" class="avatar-xs d-block">
                                        <div class="avatar-title rounded-circle">
                                            <i class="ri-github-fill"></i>
                                        </div>
                                    </router-link>
                                </li>
                                <li class="list-inline-item">
                                    <router-link to="javascript: void(0);" class="avatar-xs d-block">
                                        <div class="avatar-title rounded-circle">
                                            <i class="ri-linkedin-fill"></i>
                                        </div>
                                    </router-link>
                                </li>
                                <li class="list-inline-item">
                                    <router-link to="javascript: void(0);" class="avatar-xs d-block">
                                        <div class="avatar-title rounded-circle">
                                            <i class="ri-google-fill"></i>
                                        </div>
                                    </router-link>
                                </li>
                                <li class="list-inline-item">
                                    <router-link to="javascript: void(0);" class="avatar-xs d-block">
                                        <div class="avatar-title rounded-circle">
                                            <i class="ri-dribbble-line"></i>
                                        </div>
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                    </BCol>
                </BRow>
            </BContainer>
        </footer>
        <BButton variant="danger" @click="topFunction" class="btn-icon" id="back-to-top">
            <i class="ri-arrow-up-line"></i>
        </BButton>
    </div>
</template>

<style scoped>
/* Custom hero section with background image */
.hero-section-custom {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.hero-bg-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('@/assets/images/hero-bg.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    z-index: 1;
    opacity: 1;
}

.hero-section-custom .bg-overlay {
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.6) 100%);
    opacity: 0.85;
    z-index: 2;
}

.hero-section-custom .text-center {
    position: relative;
    z-index: 10;
}

.hero-section-custom .container {
    position: relative;
    z-index: 10;
}

.hero-title {
    color: #ffffff !important;
    font-weight: 800 !important;
    font-size: 4rem !important;
    letter-spacing: -1px;
    text-shadow: 0 3px 8px rgba(0, 0, 0, 0.5);
    line-height: 1.2 !important;
}

.hero-title .text-success {
    color: #4ade80 !important;
}

.hero-subtitle {
    color: #e5e7eb !important;
    font-size: 1.15rem !important;
    font-weight: 400;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
    line-height: 1.6;
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
}

.hero-section-custom .btn-lg {
    padding: 1rem 2rem;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;
    border: none;
}

.hero-section-custom .btn-danger {
    background-color: #ef4444;
}

.hero-section-custom .btn-danger:hover {
    background-color: #dc2626;
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(239, 68, 68, 0.5);
}

.hero-section-custom .btn-outline-light {
    border: 2px solid rgba(255, 255, 255, 0.8);
    background-color: rgba(255, 255, 255, 0.1);
    color: #ffffff;
    backdrop-filter: blur(4px);
}

.hero-section-custom .btn-outline-light:hover {
    background-color: rgba(255, 255, 255, 0.95);
    border-color: #ffffff;
    color: #1f2937;
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(255, 255, 255, 0.4);
}

.hero-section-custom .btn-success {
    background-color: #22c55e;
}

.hero-section-custom .btn-success:hover {
    background-color: #16a34a;
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(34, 197, 94, 0.5);
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .hero-title {
        font-size: 2.5rem !important;
    }
    
    .hero-subtitle {
        font-size: 1rem !important;
    }
    
    .hero-section-custom .btn-lg {
        padding: 0.75rem 1.5rem;
        font-size: 0.9rem;
    }
}

/* Dark theme adjustments */
[data-bs-theme="dark"] .hero-bg-image {
    opacity: 1;
}

[data-bs-theme="dark"] .hero-section-custom .bg-overlay {
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.7) 100%);
    opacity: 0.85;
}
</style>