<template>
  <Layout>
    <div class="page-content">
      <div class="container-fluid">
        <!-- start page title -->
        <div class="row">
          <div class="col-12">
            <div class="page-title-box d-sm-flex align-items-center justify-content-between">
              <h4 class="mb-sm-0">Dashboard</h4>
              <div class="page-title-right">
                <ol class="breadcrumb m-0">
                  <li class="breadcrumb-item"><a href="javascript: void(0);">Overview</a></li>
                  <li class="breadcrumb-item active">Dashboard</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <!-- end page title -->

        <!-- Welcome Card -->
        <div class="row">
          <div class="col-12">
            <div class="card bg-primary text-white">
              <div class="card-body">
                <div class="d-flex align-items-center">
                  <div class="flex-grow-1">
                    <h4 class="text-white mb-2">Welcome to CSK-INNOVATE IoT Platform</h4>
                    <p class="text-white-75 mb-0">Industrial Wastewater Treatment Monitoring System</p>
                  </div>
                  <div class="flex-shrink-0">
                    <i class="ri-dashboard-2-line display-4"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- System Status Cards -->
        <div class="row">
          <div class="col-xl-3 col-md-6">
            <div class="card card-animate">
              <div class="card-body">
                <div class="d-flex align-items-center">
                  <div class="flex-grow-1 overflow-hidden">
                    <p class="text-uppercase fw-medium text-muted text-truncate mb-0">Active Projects</p>
                  </div>
                </div>
                <div class="d-flex align-items-end justify-content-between mt-4">
                  <div>
                    <h4 class="fs-22 fw-semibold ff-secondary mb-4">
                      <span class="counter-value" data-target="1">1</span>
                    </h4>
                    <span class="badge bg-success-subtle text-success mb-0">
                      <i class="ri-arrow-up-line align-middle"></i> Online
                    </span>
                  </div>
                  <div class="avatar-sm flex-shrink-0">
                    <span class="avatar-title bg-success-subtle rounded fs-3">
                      <i class="ri-folder-line text-success"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-3 col-md-6">
            <div class="card card-animate">
              <div class="card-body">
                <div class="d-flex align-items-center">
                  <div class="flex-grow-1 overflow-hidden">
                    <p class="text-uppercase fw-medium text-muted text-truncate mb-0">Total Sensors</p>
                  </div>
                </div>
                <div class="d-flex align-items-end justify-content-between mt-4">
                  <div>
                    <h4 class="fs-22 fw-semibold ff-secondary mb-4">
                      <span class="counter-value" data-target="54">54</span>
                    </h4>
                    <span class="badge bg-info-subtle text-info mb-0">
                      <i class="ri-pulse-line align-middle"></i> Monitoring
                    </span>
                  </div>
                  <div class="avatar-sm flex-shrink-0">
                    <span class="avatar-title bg-info-subtle rounded fs-3">
                      <i class="ri-sensor-line text-info"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-3 col-md-6">
            <div class="card card-animate">
              <div class="card-body">
                <div class="d-flex align-items-center">
                  <div class="flex-grow-1 overflow-hidden">
                    <p class="text-uppercase fw-medium text-muted text-truncate mb-0">System Status</p>
                  </div>
                </div>
                <div class="d-flex align-items-end justify-content-between mt-4">
                  <div>
                    <h4 class="fs-22 fw-semibold ff-secondary mb-4">
                      <span class="text-success">Operational</span>
                    </h4>
                    <span class="badge bg-success-subtle text-success mb-0">
                      <i class="ri-checkbox-circle-line align-middle"></i> All Systems Go
                    </span>
                  </div>
                  <div class="avatar-sm flex-shrink-0">
                    <span class="avatar-title bg-success-subtle rounded fs-3">
                      <i class="ri-shield-check-line text-success"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-3 col-md-6">
            <div class="card card-animate">
              <div class="card-body">
                <div class="d-flex align-items-center">
                  <div class="flex-grow-1 overflow-hidden">
                    <p class="text-uppercase fw-medium text-muted text-truncate mb-0">Data Points</p>
                  </div>
                </div>
                <div class="d-flex align-items-end justify-content-between mt-4">
                  <div>
                    <h4 class="fs-22 fw-semibold ff-secondary mb-4">
                      <span class="counter-value" data-target="1440">1440</span>/day
                    </h4>
                    <span class="badge bg-warning-subtle text-warning mb-0">
                      <i class="ri-database-2-line align-middle"></i> Real-time
                    </span>
                  </div>
                  <div class="avatar-sm flex-shrink-0">
                    <span class="avatar-title bg-warning-subtle rounded fs-3">
                      <i class="ri-bar-chart-box-line text-warning"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Projects Section -->
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-header align-items-center d-flex">
                <h4 class="card-title mb-0 flex-grow-1">Active Projects</h4>
                <div class="flex-shrink-0">
                  <span class="badge bg-success-subtle text-success">1 Active</span>
                </div>
              </div>
              <div class="card-body">
                <div class="row">
                  <!-- KM30 Project Card -->
                  <div class="col-xl-6">
                    <div class="card border card-border-primary">
                      <div class="card-header">
                        <div class="d-flex align-items-center">
                          <div class="flex-grow-1">
                            <h5 class="card-title mb-0">KM30 - Wastewater Treatment Plant</h5>
                          </div>
                          <div class="flex-shrink-0">
                            <span class="badge bg-success">Online</span>
                          </div>
                        </div>
                      </div>
                      <div class="card-body">
                        <p class="text-muted mb-3">Industrial wastewater treatment monitoring with 54 sensors across 3 treatment stages (AT-01, AT-02, AT-03)</p>
                        
                        <div class="row g-2">
                          <div class="col-6">
                            <div class="p-3 bg-success-subtle rounded">
                              <div class="d-flex align-items-center">
                                <div class="flex-shrink-0">
                                  <i class="ri-water-flash-line fs-4 text-success"></i>
                                </div>
                                <div class="flex-grow-1 ms-3">
                                  <p class="text-muted mb-0">Sensors</p>
                                  <h5 class="mb-0">54</h5>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-6">
                            <div class="p-3 bg-info-subtle rounded">
                              <div class="d-flex align-items-center">
                                <div class="flex-shrink-0">
                                  <i class="ri-time-line fs-4 text-info"></i>
                                </div>
                                <div class="flex-grow-1 ms-3">
                                  <p class="text-muted mb-0">Update Rate</p>
                                  <h5 class="mb-0">1 min</h5>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="mt-3">
                          <h6 class="fs-14 mb-3">Quick Access:</h6>
                          <div class="d-flex flex-wrap gap-2">
                            <router-link 
                              class="btn btn-sm btn-primary">
                              <i class="ri-dashboard-line align-middle me-1"></i> AT-01 Monitor
                            </router-link>
                            <router-link 
                              class="btn btn-sm btn-success">
                              <i class="ri-dashboard-line align-middle me-1"></i> AT-02 Monitor
                            </router-link>
                            <router-link 
                              class="btn btn-sm btn-info">
                              <i class="ri-dashboard-line align-middle me-1"></i> AT-03 Monitor
                            </router-link>
                          </div>
                          <div class="d-flex flex-wrap gap-2 mt-2">
                            <router-link 
                              class="btn btn-sm btn-outline-secondary">
                              <i class="ri-file-chart-line align-middle me-1"></i> Daily Reports
                            </router-link>
                            <router-link 
                              class="btn btn-sm btn-outline-secondary">
                              <i class="ri-history-line align-middle me-1"></i> Historical Data
                            </router-link>
                            <router-link 
                              class="btn btn-sm btn-outline-secondary">
                              <i class="ri-line-chart-line align-middle me-1"></i> Data Analysis
                            </router-link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Placeholder for Future Projects -->
                  <div class="col-xl-6">
                    <div class="card border card-border-secondary border-dashed">
                      <div class="card-body text-center p-5">
                        <div class="avatar-md mx-auto mb-4">
                          <div class="avatar-title bg-secondary-subtle text-secondary rounded-circle fs-2">
                            <i class="ri-add-line"></i>
                          </div>
                        </div>
                        <h5 class="mb-3">Add New Project</h5>
                        <p class="text-muted mb-4">Expand your monitoring capabilities by adding new industrial IoT projects</p>
                        <button type="button" class="btn btn-secondary" disabled>
                          <i class="ri-add-circle-line align-middle me-1"></i> Coming Soon
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- System Information -->
        <div class="row">
          <div class="col-xl-6">
            <div class="card">
              <div class="card-header">
                <h5 class="card-title mb-0">
                  <i class="ri-information-line align-middle text-primary me-1"></i> System Information
                </h5>
              </div>
              <div class="card-body">
                <div class="table-responsive">
                  <table class="table table-borderless mb-0">
                    <tbody>
                      <tr>
                        <td class="fw-medium">Platform Version</td>
                        <td>CSK-INNOVATE IoT v2.0</td>
                      </tr>
                      <tr>
                        <td class="fw-medium">Database</td>
                        <td>
                          <span class="badge bg-success-subtle text-success">TimescaleDB Connected</span>
                        </td>
                      </tr>
                      <tr>
                        <td class="fw-medium">MQTT Broker</td>
                        <td>
                          <span class="badge bg-success-subtle text-success">Aedes Online</span>
                        </td>
                      </tr>
                      <tr>
                        <td class="fw-medium">WebSocket</td>
                        <td>
                          <span class="badge bg-success-subtle text-success">Connected</span>
                        </td>
                      </tr>
                      <tr>
                        <td class="fw-medium">Last Update</td>
                        <td>{{ currentTime }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-6">
            <div class="card">
              <div class="card-header">
                <h5 class="card-title mb-0">
                  <i class="ri-links-line align-middle text-primary me-1"></i> Quick Links
                </h5>
              </div>
              <div class="card-body">
                <div class="list-group list-group-flush">
                  <router-link 
                    class="list-group-item list-group-item-action">
                    <div class="d-flex align-items-center">
                      <div class="flex-shrink-0">
                        <i class="ri-dashboard-2-fill text-primary fs-5"></i>
                      </div>
                      <div class="flex-grow-1 ms-3">
                        <h6 class="mb-0">Real-time Monitoring</h6>
                        <p class="text-muted mb-0 fs-12">View live sensor data from all stations</p>
                      </div>
                      <div class="flex-shrink-0">
                        <i class="ri-arrow-right-s-line"></i>
                      </div>
                    </div>
                  </router-link>
                  
                  <router-link 
                    class="list-group-item list-group-item-action">
                    <div class="d-flex align-items-center">
                      <div class="flex-shrink-0">
                        <i class="ri-file-chart-fill text-success fs-5"></i>
                      </div>
                      <div class="flex-grow-1 ms-3">
                        <h6 class="mb-0">Daily Reports</h6>
                        <p class="text-muted mb-0 fs-12">Access daily operational reports</p>
                      </div>
                      <div class="flex-shrink-0">
                        <i class="ri-arrow-right-s-line"></i>
                      </div>
                    </div>
                  </router-link>
                  
                  <router-link 
                    class="list-group-item list-group-item-action">
                    <div class="d-flex align-items-center">
                      <div class="flex-shrink-0">
                        <i class="ri-history-fill text-info fs-5"></i>
                      </div>
                      <div class="flex-grow-1 ms-3">
                        <h6 class="mb-0">Historical Data</h6>
                        <p class="text-muted mb-0 fs-12">Explore past data and trends</p>
                      </div>
                      <div class="flex-shrink-0">
                        <i class="ri-arrow-right-s-line"></i>
                      </div>
                    </div>
                  </router-link>
                  
                  <router-link 
                    class="list-group-item list-group-item-action">
                    <div class="d-flex align-items-center">
                      <div class="flex-shrink-0">
                        <i class="ri-line-chart-fill text-warning fs-5"></i>
                      </div>
                      <div class="flex-grow-1 ms-3">
                        <h6 class="mb-0">Data Analysis</h6>
                        <p class="text-muted mb-0 fs-12">AI/ML insights and predictions</p>
                      </div>
                      <div class="flex-shrink-0">
                        <i class="ri-arrow-right-s-line"></i>
                      </div>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/layouts/main.vue";

export default {
  name: "OverviewDashboard",
  components: {
    Layout
  },
  data() {
    return {
      currentTime: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    };
  },
  mounted() {
    // Update time every second
    this.timeInterval = setInterval(() => {
      this.currentTime = new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    }, 1000);
  },
  beforeUnmount() {
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
  }
};
</script>

<style scoped>
.card-animate {
  transition: all 0.3s ease-in-out;
}

.card-animate:hover {
  transform: translateY(-5px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

.list-group-item {
  border-left: none;
  border-right: none;
  transition: all 0.2s ease-in-out;
}

.list-group-item:hover {
  background-color: rgba(var(--vz-primary-rgb), 0.05);
  border-left: 3px solid var(--vz-primary);
  padding-left: calc(1rem - 3px);
}
</style>
