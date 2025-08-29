# DRM

## Overview
DRM is a Django-based project designed to process and visualize marine and weather data.  
The system reads **CSV files**, extracts the required parameters, and passes them to the frontend for visualization.  
The frontend renders:
- A **data table** showing the processed results.  
- Two **professional charts** (wind and wave) using **Chart.js**.  

Additionally, the generated HTML page (table + charts) is served under a unique link and the link is sent to the user’s email.  

## Current Status
The **base functionality** is completed, but the project is still **under development** and not fully finished.  

## Features
- CSV file ingestion and parameter extraction.  
- Dynamic table generation.  
- Two interactive and responsive charts (wind & wave).  
- HTML page generation and email delivery with the page link.  

## Preview
Below is a preview of the table and charts rendered by the system:

![Table Preview](#)  
![Charts Preview](#)  

*(These previews are examples for demonstration and may not represent final design.)*