document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements - define all elements at the top
    const elements = {
        searchBtn: document.getElementById('find-jobs'),
        roleInput: document.getElementById('search-role'),
        locationInput: document.getElementById('search-place'),
        resultsContainer: document.getElementById('opportunities-container'),
        resultsCount: document.getElementById('total-results'),
        loadingIndicator: document.getElementById('loading'),
        filterToggle: document.getElementById('show-filters'),
        filterSection: document.getElementById('filter-section'),
        modal: document.getElementById('opportunity-modal'),
        modalContent: document.getElementById('popup-content'),
        closeBtn: document.querySelector('.close-popup')
    };

    // Initialize app
    function init() {
        // Event listeners
        elements.searchBtn.addEventListener('click', findOpportunities);
        elements.roleInput.addEventListener('keypress', e => {
            if (e.key === 'Enter') findOpportunities();
        });
        elements.locationInput.addEventListener('keypress', e => {
            if (e.key === 'Enter') findOpportunities();
        });
        elements.filterToggle.addEventListener('click', () => {
            elements.filterSection.classList.toggle('show');
        });
        elements.closeBtn.addEventListener('click', () => {
            elements.modal.style.display = 'none';
        });
        window.addEventListener('click', e => {
            if (e.target === elements.modal) {
                elements.modal.style.display = 'none';
            }
        });

        // Initial empty state
        showEmptyState();
    }

    // Main search function
    function findOpportunities() {
        const role = elements.roleInput.value.trim();
        const location = elements.locationInput.value.trim();

        // Get filter values
        const minPay = document.getElementById('pay-min').value;
        const maxPay = document.getElementById('pay-max').value;
        const perm = document.getElementById('perm').checked;
        const temp = document.getElementById('temp').checked;
        const freelance = document.getElementById('freelance').checked;
        const anywhere = document.getElementById('anywhere').checked;
        const sortMethod = document.getElementById('sort-method').value;

        // Validate inputs
        if (!role && !location) {
            showMessage('Please enter a job role or location');
            return;
        }

        // Show loading state
        elements.loadingIndicator.style.display = 'flex';
        elements.resultsContainer.innerHTML = '';
        elements.resultsCount.textContent = 'Searching...';

        // Build query params
        const params = new URLSearchParams();
        if (role) params.append('title', role);
        if (location) params.append('location', location);
        if (minPay) params.append('salary_min', minPay);
        if (maxPay) params.append('salary_max', maxPay);
        if (perm) params.append('full_time', true);
        if (temp) params.append('part_time', true);
        if (freelance) params.append('contract', true);
        if (anywhere) params.append('remote', true);
        if (sortMethod) params.append('sort_by', sortMethod);

        // Fetch jobs from API
        fetch(`http://localhost:3000/api/jobs?${params.toString()}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const validJobs = Array.isArray(data) ? data.filter(job => job?.job_title) : [];
                if (validJobs.length === 0) {
                    showNoResults(role, location);
                } else {
                    displayOpportunities(validJobs);
                    elements.resultsCount.textContent = `${validJobs.length} Opportunities Found`;
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showMessage(error.message || 'Failed to load opportunities');
                elements.resultsCount.textContent = '0 Opportunities Found';
            })
            .finally(() => {
                elements.loadingIndicator.style.display = 'none';
            });
    }

    // Define displayOpportunities function (previously displayJobs)
    function displayOpportunities(jobs) {
        elements.resultsContainer.innerHTML = '';
        jobs.forEach(job => {
            const opportunityCard = createOpportunityCard(job);
            elements.resultsContainer.appendChild(opportunityCard);
        });
    }

    // Define createOpportunityCard function
    function createOpportunityCard(job) {
        const card = document.createElement('div');
        card.className = 'opportunity-card';

        // Extract job details with fallbacks
        const title = job.job_title || 'Opportunity';
        const company = job.employer_name || 'Company not specified';
        const location = [
            job.job_city,
            job.job_state,
            job.job_country
        ].filter(Boolean).join(', ') || 'Location not specified';
        
        const salary = job.job_max_salary ? 
            `$${job.job_max_salary.toLocaleString()}/year` : 'Salary not specified';
        
        const postedDate = job.job_posted_at_datetime_utc ?
            new Date(job.job_posted_at_datetime_utc).toLocaleDateString() : 'Recently';

        card.innerHTML = `
            <h3>${title}</h3>
            <p class="company">${company}</p>
            <p class="location"><i class="fas fa-map-marker-alt"></i> ${location}</p>
            <p class="salary">${salary}</p>
            <p class="posted-date">Posted ${postedDate}</p>
        `;

        // Make clickable if we have job details
        if (job.job_id || job.job_apply_link) {
            card.addEventListener('click', () => {
                if (job.job_id) {
                    showOpportunityDetails(job.job_id);
                } else if (job.job_apply_link) {
                    window.open(job.job_apply_link, '_blank');
                }
            });
            card.style.cursor = 'pointer';
        }

        return card;
    }

    // Define showOpportunityDetails function
    function showOpportunityDetails(jobId) {
        elements.loadingIndicator.style.display = 'flex';
        elements.modalContent.innerHTML = '';

        fetch(`http://localhost:3000/api/job/${jobId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(job => {
                elements.modalContent.innerHTML = createOpportunityDetailsHTML(job);
                elements.modal.style.display = 'block';
            })
            .catch(error => {
                console.error('Error:', error);
                elements.modalContent.innerHTML = `
                    <div class="error-message">
                        <i class="fas fa-exclamation-triangle"></i>
                        <p>Failed to load opportunity details</p>
                        <small>${error.message}</small>
                    </div>
                `;
                elements.modal.style.display = 'block';
            })
            .finally(() => {
                elements.loadingIndicator.style.display = 'none';
            });
    }

    // Define createOpportunityDetailsHTML function
    function createOpportunityDetailsHTML(job) {
        const title = job.job_title || 'Opportunity';
        const company = job.employer_name || 'Company not specified';
        const location = [
            job.job_city,
            job.job_state,
            job.job_country
        ].filter(Boolean).join(', ') || 'Location not specified';
        
        const salary = job.job_max_salary ? 
            `$${job.job_max_salary.toLocaleString()}/year` : 'Salary not specified';
        
        const description = job.job_description || 
            'No detailed description available for this opportunity.';

        return `
            <h2>${title}</h2>
            <p class="company">${company}</p>
            
            <div class="meta-info">
                <p><i class="fas fa-map-marker-alt"></i> ${location}</p>
                <p><i class="fas fa-dollar-sign"></i> ${salary}</p>
            </div>
            
            <div class="description">
                <h3>Description</h3>
                <p>${description}</p>
            </div>
            
            ${job.job_apply_link ? `
                <a href="${job.job_apply_link}" target="_blank" class="apply-btn">
                    Apply Now <i class="fas fa-external-link-alt"></i>
                </a>
            ` : ''}
        `;
    }

    // UI Helper functions
    function showMessage(message) {
        elements.resultsContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-exclamation-triangle"></i>
                <p>${message}</p>
            </div>
        `;
    }

    function showNoResults(role, location) {
        let message = 'No opportunities found';
        if (role && location) {
            message = `No "${role}" opportunities in ${location}`;
        } else if (role) {
            message = `No "${role}" opportunities found`;
        } else if (location) {
            message = `No opportunities in ${location}`;
        }
        
        elements.resultsContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <p>${message}</p>
                <small>Try different search terms or filters</small>
            </div>
        `;
    }

    function showEmptyState() {
        elements.resultsContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-briefcase"></i>
                <p>Begin your search to discover opportunities</p>
            </div>
        `;
    }

    // Initialize the application
    init();
});