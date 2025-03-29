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

- Frontend:
  - HTML5
  - CSS3 (Vanilla)
  - JavaScript (ES6+)
- Backend:
  - Node.js
  - Express.js
- API:
  - JSearch API (via RapidAPI)

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- JSearch API key from RapidAPI

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd job-connect
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your JSearch API key:
```
JSEARCH_API_KEY=your_api_key_here
```

4. Start the server:
```bash
npm start
```

5. Open your browser and navigate to `http://localhost:3000`

## Deployment Instructions

### Local Development
1. Ensure all dependencies are installed
2. Set up your environment variables
3. Run the application locally using `npm start`

### Server Deployment
1. SSH into your web servers (Web01 and Web02)
2. Clone the repository
3. Install dependencies
4. Set up environment variables
5. Start the application using PM2 or similar process manager

### Load Balancer Configuration
1. Configure the load balancer (Lb01) to distribute traffic between Web01 and Web02
2. Set up health checks to ensure proper server status
3. Configure SSL certificates if needed

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
