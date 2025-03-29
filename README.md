# JobConnect - Job Search Application

A simple and intuitive job search application that helps users find their next career opportunity. Built with vanilla JavaScript, HTML, and CSS, this application uses the JSearch API to provide real-time job search results.

## Features

- Search jobs by title/keywords and location
- Filter results by:
  - Salary range
  - Employment type (Full Time, Part Time, Contract, Remote)
- Sort results by:
  - Best match
  - Highest salary
  - Most recent
- Detailed job view with full description
- Direct application links to job postings
- Responsive design for mobile and desktop
- Real-time search results
- Error handling and loading states

## Technologies Used

- **Frontend:**
  - HTML5
  - CSS3 (Vanilla)
  - JavaScript (ES6+)
- **Backend:**
  - Node.js
  - Express.js
- **API:**
  - JSearch API (via RapidAPI)

## Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)
- PM2 for process management
- JSearch API key from RapidAPI

## Installation

1. **Clone the repository:**

```bash
   git clone https://github.com/benigne811/Job_Connect.git
   cd job-connect
```

2. **Install dependencies:**

```bash
   npm install
```

3. **Create a ****************************************************************`.env`**************************************************************** file** in the root directory and add your JSearch API key:

```
   JSEARCH_API_KEY=your_api_key_here
```

4. **Start the server:**

```bash
   npm start
```

5. **Open your browser and navigate to** `http://localhost:3000`

## Deployment Instructions

### **Deploying on Ubuntu Servers**

1. **SSH into your web server:**

```bash
   ssh ubuntu@3.82.202.21
```

2. **Update package lists and install dependencies:**

```bash
   sudo apt update && sudo apt upgrade -y
   sudo apt install -y nodejs npm git
```

3. **Clone the repository:**

```bash
   git clone https://github.com/benigne811/Job_Connect.git
   cd Job_Connect
```

4. **Install dependencies:**

```bash
   npm install
```

5. **Set up environment variables:**

```bash
   echo "JSEARCH_API_KEY=your_api_key_here" > .env
```

6. **Start the application with PM2:**

```bash
   npm install -g pm2
   pm2 start server.js --name JobConnect
   pm2 save
   pm2 startup
```

### **Configuring the Load Balancer**

1. **Install Nginx on the load balancer server:**

```bash
   sudo apt update
   sudo apt install -y nginx
```

2. **Edit the Nginx configuration file:**

```bash
   sudo nano /etc/nginx/sites-available/default
```

3. **Modify the file to include the following load balancing configuration:**

```
   upstream jobconnect_servers {
       server 3.82.202.21:3000;
       server 54.147.162.140:3000;
   }

   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://jobconnect_servers;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
       }
   }
```

4. **Save the file and restart Nginx:**

```bash
   sudo systemctl restart nginx
   sudo systemctl enable nginx
```

### **Testing the Deployment**

1. **Verify that your application is running on both servers:**

```bash
   pm2 status
```

2. **Check if the load balancer is distributing traffic correctly:**

```bash
   curl -I http://yourdomain.com
```

3. **Monitor server logs:**

```bash
   sudo tail -f /var/log/nginx/access.log
```

## API Documentation

This application uses the JSearch API from RapidAPI. For detailed API documentation, visit:
[JSearch API Documentation](https://rapidapi.com/restyler/api/jsearch)

## Error Handling

The application includes comprehensive error handling for:

- API request failures
- Invalid user inputs
- Network issues
- Server errors

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- JSearch API for providing job search data
- Font Awesome for icons
- All contributors and maintainers
## Demo Video
- [https://youtu.be/Bo9NqZbOmcI]
