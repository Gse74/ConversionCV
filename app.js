        document.addEventListener('DOMContentLoaded', function() {
            const dropZone = document.getElementById('dropZone');
            const fileInput = document.getElementById('fileInput');
            const cancelBtn = document.getElementById('cancelBtn');
            const processBtn = document.getElementById('processBtn');
            const downloadBtn = document.getElementById('downloadBtn');
            const newCvBtn = document.getElementById('newCvBtn');
            const uploadSection = document.getElementById('upload-section');
            const progressSection = document.getElementById('progress-section');
            const resultsSection = document.getElementById('results-section');
            const progressBar = document.getElementById('progress-bar');
            const progressPercent = document.getElementById('progress-percent');
            const processingSteps = document.querySelectorAll('.processing-step');
            
            let currentFile = null;
            
            // Handle drag over
            ['dragenter', 'dragover'].forEach(eventName => {
                dropZone.addEventListener(eventName, highlight, false);
            });
            
            // Handle drag leave
            ['dragleave', 'drop'].forEach(eventName => {
                dropZone.addEventListener(eventName, unhighlight, false);
            });
            
            // Handle drop
            dropZone.addEventListener('drop', handleDrop, false);
            
            // Handle file selection via click
            fileInput.addEventListener('change', function(e) {
                if (this.files.length) {
                    handleFiles(this.files);
                }
            });
            
            // Process button click
            processBtn.addEventListener('click', processCv);
            
            // Cancel button click
            cancelBtn.addEventListener('click', resetForm);
            
            // Download button click
            downloadBtn.addEventListener('click', function() {
                alert('In a real implementation, this would download the processed PDF file.');
                // In a real app, this would trigger a download of the processed PDF
            });
            
            // New CV button click
            newCvBtn.addEventListener('click', resetForm);
            
            function highlight(e) {
                e.preventDefault();
                e.stopPropagation();
                dropZone.classList.add('active');
            }
            
            function unhighlight(e) {
                e.preventDefault();
                e.stopPropagation();
                dropZone.classList.remove('active');
            }
            
            function handleDrop(e) {
                const dt = e.dataTransfer;
                const files = dt.files;
                handleFiles(files);
            }
            
            function handleFiles(files) {
                if (files.length > 1) {
                    alert('Please upload only one file at a time.');
                    return;
                }
                
                const file = files[0];
                const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
                
                if (!validTypes.includes(file.type) && !file.name.match(/\.(pdf|doc|docx)$/i)) {
                    alert('Please upload a valid file type (.pdf, .doc, .docx)');
                    return;
                }
                
                currentFile = file;
                cancelBtn.disabled = false;
                processBtn.disabled = false;
                
                // Update UI to show selected file
                const fileNameElement = document.createElement('p');
                fileNameElement.className = 'mt-4 font-medium text-green-700';
                fileNameElement.innerHTML = `<i class="fas fa-check-circle mr-2"></i> ${file.name} (${formatFileSize(file.size)})`;
                
                // Remove any existing file name displays
                const existingFileDisplay = dropZone.querySelector('.file-selected');
                if (existingFileDisplay) {
                    dropZone.removeChild(existingFileDisplay);
                }
                
                fileNameElement.classList.add('file-selected');
                dropZone.appendChild(fileNameElement);
            }
            
            function formatFileSize(bytes) {
                if (bytes === 0) return '0 Bytes';
                const k = 1024;
                const sizes = ['Bytes', 'KB', 'MB', 'GB'];
                const i = Math.floor(Math.log(bytes) / Math.log(k));
                return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
            }
            
            function processCv() {
                if (!currentFile) return;
                
                // UI changes
                uploadSection.style.display = 'none';
                progressSection.style.display = 'block';
                resultsSection.style.display = 'none';
                
                // Simulate processing with progress updates
                let progress = 0;
                const interval = setInterval(() => {
                    progress += Math.random() * 10;
                    if (progress > 100) progress = 100;
                    
                    progressBar.style.width = `${progress}%`;
                    progressPercent.textContent = `${Math.round(progress)}%`;
                    
                    // Update processing steps
                    if (progress > 30) {
                        processingSteps[0].classList.add('text-green-600');
                        processingSteps[0].querySelector('div').className = 'w-8 h-8 rounded-full flex items-center justify-center bg-green-100 text-green-600 mr-4';
                        processingSteps[0].querySelector('i').className = 'fas fa-check';
                    }
                    
                    if (progress > 60) {
                        processingSteps[1].classList.add('text-green-600');
                        processingSteps[1].querySelector('div').className = 'w-8 h-8 rounded-full flex items-center justify-center bg-green-100 text-green-600 mr-4';
                        processingSteps[1].querySelector('i').className = 'fas fa-check';
                    }
                    
                    if (progress > 85) {
                        processingSteps[2].classList.add('text-green-600');
                        processingSteps[2].querySelector('div').className = 'w-8 h-8 rounded-full flex items-center justify-center bg-green-100 text-green-600 mr-4';
                        processingSteps[2].querySelector('i').className = 'fas fa-check';
                    }
                    
                    if (progress === 100) {
                        clearInterval(interval);
                        setTimeout(showResults, 500);
                    }
                }, 300);
            }
            
            function showResults() {
                progressSection.style.display = 'none';
                resultsSection.style.display = 'block';
                
                // In a real app, this would be populated with data extracted from the CV
                // For this demo, we're using placeholder data
                document.getElementById('preview-position').textContent = 'SENIOR SOFTWARE ENGINEER';
                document.getElementById('preview-name').textContent = 'JOHN DOE';
                document.getElementById('preview-summary').textContent = 'Experienced software engineer with 8+ years in full-stack development. Specialized in JavaScript frameworks and cloud architectures. Passionate about building scalable solutions that drive business growth.';
                
                const skillsContainer = document.getElementById('preview-skills');
                skillsContainer.innerHTML = '';
                ['JavaScript', 'TypeScript', 'React', 'Node.js', 'AWS', 'Docker', 'Python', 'SQL'].forEach(skill => {
                    const skillEl = document.createElement('span');
                    skillEl.className = 'bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm';
                    skillEl.textContent = skill;
                    skillsContainer.appendChild(skillEl);
                });
                
                const experienceContainer = document.getElementById('preview-experience');
                experienceContainer.innerHTML = `
                    <div class="mb-4">
                        <h5 class="font-medium text-gray-800">Senior Software Engineer - TechCorp Inc.</h5>
                        <p class="text-sm text-gray-600">Jan 2020 - Present</p>
                        <ul class="list-disc pl-5 text-gray-700 mt-2 space-y-1">
                            <li>Led a team of 8 developers in redesigning the core customer platform</li>
                            <li>Implemented CI/CD pipelines reducing deployment time by 70%</li>
                            <li>Architected microservices solution improving system reliability by 40%</li>
                        </ul>
                    </div>
                    <div class="mb-4">
                        <h5 class="font-medium text-gray-800">Software Engineer - DevSolutions</h5>
                        <p class="text-sm text-gray-600">Jun 2016 - Dec 2019</p>
                        <ul class="list-disc pl-5 text-gray-700 mt-2 space-y-1">
                            <li>Developed new features for the flagship product using React and Node.js</li>
                            <li>Optimized database queries improving response times by 35%</li>
                            <li>Mentored 3 junior developers</li>
                        </ul>
                    </div>
                `;
                
                document.getElementById('preview-education').innerHTML = `
                    <h5 class="font-medium text-gray-800">Master of Computer Science - State University</h5>
                    <p class="text-sm text-gray-600">2012 - 2014</p>
                    <h5 class="font-medium text-gray-800 mt-2">Bachelor of Science in Computer Engineering - State University</h5>
                    <p class="text-sm text-gray-600">2008 - 2012</p>
                `;
                
                document.getElementById('preview-certifications').innerHTML = `
                    <p>AWS Certified Solutions Architect</p>
                    <p>Google Cloud Professional Engineer</p>
                    <p>Oracle Certified Professional</p>
                `;
                
                document.getElementById('preview-languages').innerHTML = `
                    <p>English (Native)</p>
                    <p>Spanish (Fluent)</p>
                    <p>French (Intermediate)</p>
                `;
            }
            
            function resetForm() {
                currentFile = null;
                fileInput.value = '';
                cancelBtn.disabled = true;
                processBtn.disabled = true;
                
                // Reset progress
                progressBar.style.width = '0%';
                progressPercent.textContent = '0%';
                processingSteps.forEach(step => {
                    step.classList.remove('text-green-600');
                    step.querySelector('div').className = 'w-8 h-8 rounded-full flex items-center justify-center bg-blue-100 text-blue-600 mr-4';
                    step.querySelector('i').className = step.querySelector('i').className.replace('fa-check', 'fa-search');
                });
                
                // Remove file name display
                const fileDisplay = dropZone.querySelector('.file-selected');
                if (fileDisplay) {
                    dropZone.removeChild(fileDisplay);
                }
                
                // Show upload section
                uploadSection.style.display = 'block';
                progressSection.style.display = 'none';
                resultsSection.style.display = 'none';
            }
        });
